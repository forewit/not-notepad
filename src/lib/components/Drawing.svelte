<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import * as gestures from "$lib/modules/gestures.js";
  import { tabsStore } from "$lib/stores/tabsStore";
  import { base } from "$app/paths";

  // reduces storage needed to render a path
  const DECIMAL_PRECISION = 2;

  // public variables
  export let radius = 4; // radius should usually be at least 2x smoothness
  export let smoothness = 0; // higher smoothness means less points are generated
  export let stroke = 5;
  export let color = "#000000";
  export let tool: "pen" | "eraser" | undefined = undefined;
  export let tabID = "";
  export const clear = () => {
    ctx.clearRect(0, 0, width / dpi, height / dpi);
    savedPaths = [];
  };
  export const undo = () => {
    if (savedPaths.length == 0) return;

    // remove most recent path and clear the canvas
    savedPaths.pop();
    backgroundCtx.clearRect(0, 0, width / dpi, height / dpi);

    // render all saved paths
    for (let i = 0; i < savedPaths.length; i++) {
      renderPath(savedPaths[i], backgroundCtx);
    }

    savePathsToTab();
  };

  type Path = {
    points: { x: number; y: number }[];
    lineWidth: number;
    color: string;
  };

  // internal variables
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let backgroundCanvas: HTMLCanvasElement;
  let backgroundCtx: CanvasRenderingContext2D;
  let lastPoint = { x: 0, y: 0 };
  let height = 0;
  let width = 0;
  let dpi: number;
  let drawing = false;
  let currentPath: Path;
  let resizeObserver: ResizeObserver;
  let savedPaths: Path[] = []; // used to re-draw the paths if needed
  let cursorCSS = "";

  $: tool, setupTool();

  function setupTool() {
    if (!canvas) return;

    if (!tool) {
      cursorCSS = "";
      canvas.removeEventListener("gesture", eraserGestureHandler);
      canvas.removeEventListener("gesture", defaultGestureHandler);
      gestures.disable(canvas);
      return;
    }

    if (tool === "pen") {
      canvas.removeEventListener("gesture", eraserGestureHandler);
      canvas.addEventListener("gesture", defaultGestureHandler);
    } else if (tool === "eraser") {
      canvas.removeEventListener("gesture", defaultGestureHandler);
      canvas.addEventListener("gesture", eraserGestureHandler);
    }

    gestures.enable(canvas);
  }

  const dist = (x1: number, y1: number, x2: number, y2: number) => {
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  };

  function angle(
    A: { x: number; y: number },
    B: { x: number; y: number },
    C: { x: number; y: number }
  ) {
    var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
    var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
    var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
    var rad = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
    return rad * (180 / Math.PI);
  }

  // TODO: update so that resizing isn't jittery?
  const debounce = (func: Function, timeout = 300) => {
    // @ts-ignore
    let timer;
    // @ts-ignore
    return (...args) => {
      // @ts-ignore
      clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        func.apply(this, args);
      }, timeout);
    };
  };

  const ANGLE_THRESHOLD = 178;

  function reducePoints(path: Path) {
    if (path.points.length < 4) return path;
    for (let i = 1; i < path.points.length - 2; i++) {
      const A = path.points[i - 1];
      const B = path.points[i];
      const C = path.points[i + 1];
      const deg = angle(A, B, C);

      if (deg > ANGLE_THRESHOLD) {
        path.points.splice(i, 1);
        i--;
      }
    }
    return path;
  }

  // helper function for translating screen to canvas coordinates
  function screenToCanvas(x: number, y: number) {
    // adjust for DPI & offset
    let rect = canvas.getBoundingClientRect();
    return {
      x: x - rect.left,
      y: y - rect.top,
    };
  }

  // handle resizing
  function resize() {
    if (!canvas || !backgroundCanvas) return;

    // stop drawing if you already are
    dragEndHandler();

    // step 1: resize the onScreenCanvas
    dpi = window.devicePixelRatio;
    let rect = canvas.getBoundingClientRect();
    height = rect.height * dpi;
    width = rect.width * dpi;

    canvas.width = width;
    canvas.height = height;
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;

    ctx.scale(dpi, dpi);
    backgroundCtx.scale(dpi, dpi);

    // render all saved paths
    for (let i = 0; i < savedPaths.length; i++) {
      renderPath(savedPaths[i], backgroundCtx);
    }
  }

  async function renderPath(path: Path, context: CanvasRenderingContext2D) {
    // set canvas properties
    context.lineWidth = path.lineWidth;
    context.lineCap = "round";
    context.strokeStyle = path.color;

    if (path.points.length < 2) {
      context.beginPath();
      context.moveTo(path.points[0].x, path.points[0].y);
      context.lineTo(path.points[0].x, path.points[0].y);
      context.stroke();
      return;
    }

    context.beginPath();
    let xc = path.points[0].x;
    let yc = path.points[0].y;

    for (let i = 0; i < path.points.length - 1; i++) {
      context.moveTo(xc, yc);
      xc = (path.points[i].x + path.points[i + 1].x) / 2;
      yc = (path.points[i].y + path.points[i + 1].y) / 2;
      context.quadraticCurveTo(path.points[i].x, path.points[i].y, xc, yc);
    }
    context.stroke();
  }

  function savePathsToTab() {
    if (!$tabsStore[tabID]) return;
    $tabsStore[tabID].paths = savedPaths.filter((path) => reducePoints(path));
  }
  function loadPathsFromTab() {
    if (!$tabsStore[tabID]) return;
    savedPaths = $tabsStore[tabID].paths;
    resize();
  }

  function truncatePoint(point: { x: number; y: number }) {
    return {
      x: truncateNumber(point.x),
      y: truncateNumber(point.y),
    };
  }
  function truncateNumber(num: number) {
    const fixed = num.toFixed(DECIMAL_PRECISION);
    return Number(fixed);
  }

  // custom event handlers
  function startHandle(x: number, y: number) {
    drawing = true;
    lastPoint = screenToCanvas(x, y);

    // save new path
    currentPath = {
      points: [],
      lineWidth: stroke,
      color: color,
    };
  }

  function dragHandle(x: number, y: number) {
    if (!drawing) return;

    let newPoint = screenToCanvas(x, y);

    // if using a drawing circle
    if (radius > 0) {
      // do nothing if point is inside the drawing circle
      if (dist(newPoint.x, newPoint.y, lastPoint.x, lastPoint.y) <= radius) {
        if (currentPath.points.length === 0) {
          currentPath.points.push(newPoint);
          renderPath(currentPath, ctx);
        }
        return;
      }
      // draw if the point is outside the drawing circle
      // see: https://math.stackexchange.com/questions/127613/closest-point-on-circle-edge-from-point-outside-inside-the-circle
      // A = point
      // B = lastPoint
      // r = drawRadius
      let denominator = Math.sqrt(
        newPoint.x * newPoint.x +
          newPoint.y * newPoint.y -
          2 * newPoint.x * lastPoint.x +
          lastPoint.x * lastPoint.x -
          2 * newPoint.y * lastPoint.y +
          lastPoint.y * lastPoint.y
      );
      let temp = {
        x: newPoint.x + radius * ((lastPoint.x - newPoint.x) / denominator),
        y: newPoint.y + radius * ((lastPoint.y - newPoint.y) / denominator),
      };
      newPoint = temp;

      // prevent jagged lines by making sure new points aren't too close together
      if (dist(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) <= smoothness)
        return;
    }

    // add new point to the current path
    currentPath.points.push(truncatePoint(newPoint));

    ctx.clearRect(0, 0, width / dpi, height / dpi);
    renderPath(currentPath, ctx);

    lastPoint = newPoint;
  }

  function dragEndHandler() {
    if (drawing) {
      savedPaths.push(reducePoints(currentPath));
      renderPath(currentPath, backgroundCtx);
      ctx.clearRect(0, 0, width / dpi, height / dpi);
      savePathsToTab();
    }
    drawing = false;
  }

  function eraserStartHandler(x: number, y: number) {
    drawing = true;
    currentPath = {
      points: [],
      lineWidth: 10,
      color: "rgba(0,0,0,0.2)",
    };
  }
  function eraserDragHandler(x: number, y: number) {
    if (!drawing) return;

    const newPoint = screenToCanvas(x, y);
    currentPath.points.push(truncatePoint(newPoint));

    setTimeout(() => {
      ctx.clearRect(0, 0, width / dpi, height / dpi);
      renderPath(currentPath, ctx);
      currentPath.points.shift();

      if (currentPath.points.length <= 1 && !drawing) {
        ctx.clearRect(0, 0, width / dpi, height / dpi);
      }
    }, 100);

    // check if point is on any path
    savedPaths.forEach((path, j) => {
      for (let i = 0; i < path.points.length - 1; i++) {
        if (
          dist(path.points[i].x, path.points[i].y, newPoint.x, newPoint.y) <=
          path.lineWidth
        ) {
          savedPaths.splice(j, 1);
          backgroundCtx.clearRect(0, 0, width / dpi, height / dpi);
          for (let i = 0; i < savedPaths.length; i++) {
            renderPath(savedPaths[i], backgroundCtx);
          }
          savePathsToTab();
          break;
        }
      }
    });
  }
  function eraserEndHandler() {
    if (currentPath.points.length <= 1) {
      ctx.clearRect(0, 0, width / dpi, height / dpi);
    }
    drawing = false;
  }

  const eraserGestureHandler = function (e: CustomEvent) {
    switch (e.detail.name) {
      case "left-click-drag-start":
      case "touch-drag-start":
        eraserStartHandler(e.detail.x, e.detail.y);
        break;
      case "left-click-dragging":
      case "touch-dragging":
        eraserDragHandler(e.detail.x, e.detail.y);
        break;
      case "left-click-drag-end":
      case "touch-drag-end":
        eraserEndHandler();
        break;
      default:
        break;
    }
  } as EventListener;

  const defaultGestureHandler = function (e: CustomEvent) {
    switch (e.detail.name) {
      case "left-click-drag-start":
      case "touch-drag-start":
        startHandle(e.detail.x, e.detail.y);
        break;
      case "left-click-dragging":
      case "touch-dragging":
        dragHandle(e.detail.x, e.detail.y);
        break;
      case "left-click-drag-end":
      case "touch-drag-end":
        dragEndHandler();
        break;
      default:
        break;
    }
  } as EventListener;

  onMount(() => {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    backgroundCtx = backgroundCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    backgroundCtx.imageSmoothingEnabled = false;

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    loadPathsFromTab();
    setupTool();
  });

  onDestroy(() => {
    if (resizeObserver) resizeObserver.disconnect();
    tool = undefined;
    setupTool();
  });
</script>

<!-- current path -->
<div class="drawing-container" class:disabled={tool === undefined}>
  <canvas id="currentPath" bind:this={backgroundCanvas}></canvas>
  <canvas id="canvas" bind:this={canvas} />
</div>

<style>
  .drawing-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;

    /* fix ghost margin below html5 canvas: https://stackoverflow.com/questions/9878090/eliminate-ghost-margin-below-html5-canvas-element */
    vertical-align: bottom;
  }
  .disabled {
    pointer-events: none;
  }
</style>
