<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import * as gestures from "$lib/modules/gestures.js";
  import { tabsStore } from "$lib/stores/tabsStore";
  import {
    checkCurveIntersection,
    checkLineIntersection,
  } from "$lib/modules/curves";

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

  type Point = {
    x: number;
    y: number;
  };
  type Path = {
    points: Point[];
    lineWidth: number;
    color: string;
  };

  // internal variables
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let backgroundCanvas: HTMLCanvasElement;
  let backgroundCtx: CanvasRenderingContext2D;
  let lastPoint: Point = { x: 0, y: 0 };
  let height = 0;
  let width = 0;
  let dpi: number;
  let drawing = false;
  let currentPath: Path;
  let resizeObserver: ResizeObserver;
  let savedPaths: Path[] = []; // used to re-draw the paths if needed

  $: tool, setupTool();

  function setupTool() {
    if (!canvas) return;

    if (!tool) {
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

  const dist = (p1: Point, p2: Point) => {
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);
  };

  function angle(A: Point, B: Point, C: Point) {
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

  function midpoint(p1: Point, p2: Point) {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  }

  const ANGLE_THRESHOLD = 178;

  function reducePoints(path: Path) {
    if (path.points.length < 5) return path;

    let p0 = midpoint(path.points[1], path.points[2]);
    for (let j = 2; j < path.points.length - 3; j++) {
      let p1 = path.points[j];
      let p2 = midpoint(path.points[j], path.points[j + 1]);

      let deg = angle(p0, p1, p2);
      if (deg > ANGLE_THRESHOLD) {
        path.points.splice(j, 1);
        j--;
      }
      p0 = p2;
    }

    return path;
  }

  // helper function for translating screen to canvas coordinates
  function screenToCanvas(p: Point): Point {
    // adjust for DPI & offset
    let rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(p.x - rect.left),
      y: Math.round(p.y - rect.top),
    };
  }

  // handle resizing
  function resize() {
    if (!canvas || !backgroundCanvas) return;

    ctx.resetTransform();
    backgroundCtx.resetTransform();

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

    renderSavedPaths();
  }

  function renderSavedPaths() {
    backgroundCtx.clearRect(0, 0, width / dpi, height / dpi);
    for (let i = 0; i < savedPaths.length; i++) {
      renderPath(savedPaths[i], backgroundCtx);
    }
  }

  function renderPath(path: Path, context: CanvasRenderingContext2D) {
    const length = path.points.length;
    if (length < 1) return;

    // set canvas properties
    context.lineWidth = path.lineWidth;
    context.lineCap = "round";
    context.strokeStyle = path.color;
    context.fillStyle = path.color;

    if (length === 1) {
      context.beginPath();
      context.moveTo(path.points[0].x, path.points[0].y);
      context.lineTo(path.points[0].x, path.points[0].y);
      context.stroke();
      return;
    }

    if (length === 2) {
      context.beginPath();
      context.moveTo(path.points[0].x, path.points[0].y);
      context.lineTo(path.points[1].x, path.points[1].y);
      context.stroke();
      return;
    }

    context.beginPath();
    context.moveTo(path.points[0].x, path.points[0].y);
    let mid = midpoint(path.points[0], path.points[1]);
    context.lineTo(mid.x, mid.y);
    for (let i = 1; i < length - 2; i++) {
      mid = midpoint(path.points[i], path.points[i + 1]);
      context.quadraticCurveTo(
        path.points[i].x,
        path.points[i].y,
        mid.x,
        mid.y
      );
    }
    context.stroke();
  }

  function savePathsToTab() {
    if (!$tabsStore[tabID]) return;

    tabsStore.update((curr) => {
      curr[tabID].paths = [];
      savedPaths.forEach((path) => {
        curr[tabID].paths.push(reducePoints(path));
      });
      return curr;
    });
  }

  function loadPathsFromTab() {
    if (!$tabsStore[tabID]) return;
    savedPaths = $tabsStore[tabID].paths;
    renderSavedPaths();
  }

  // custom event handlers
  function startHandle(x: number, y: number) {
    drawing = true;
    lastPoint = screenToCanvas({ x, y });
    currentPath = {
      points: [],
      lineWidth: stroke,
      color: color,
    };
  }

  function dragHandle(x: number, y: number) {
    if (!drawing) return;

    let newPoint = screenToCanvas({ x, y });

    // if using a drawing circle
    if (radius > 0) {
      // do nothing if point is inside the drawing circle
      if (dist(newPoint, lastPoint) <= radius) {
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
      if (dist(lastPoint, newPoint) <= smoothness) return;
    }

    // add new point to the current path
    currentPath.points.push(newPoint);

    ctx.clearRect(0, 0, width / dpi, height / dpi);
    renderPath(currentPath, ctx);

    lastPoint = newPoint;
  }

  function dragEndHandler() {
    if (drawing) {
      savedPaths.push(currentPath);
      ctx.clearRect(0, 0, width / dpi, height / dpi);
      savePathsToTab();
      renderSavedPaths();
    }
    drawing = false;
  }

  function eraserStartHandler(x: number, y: number) {
    drawing = true;
    lastPoint = screenToCanvas({ x, y });
    currentPath = {
      points: [],
      lineWidth: 10,
      color: "rgba(0,0,0,0.2)",
    };
  }
  function eraserDragHandler(x: number, y: number) {
    if (!drawing) return;

    const newPoint = screenToCanvas({ x, y });
    currentPath.points.push(newPoint);

    setTimeout(() => {
      ctx.clearRect(0, 0, width / dpi, height / dpi);
      renderPath(currentPath, ctx);
      currentPath.points.shift();

      if (currentPath.points.length <= 1 && !drawing) {
        ctx.clearRect(0, 0, width / dpi, height / dpi);
      }
    }, 100);

    // check if point is on any path
    for (let i = 0; i < savedPaths.length; i++) {
      const path = savedPaths[i];
      const length = path.points.length;

      if (length < 1) return;

      let intersection = false;
      if (length === 1) {
        intersection =
          dist(path.points[0], newPoint) <
          (path.lineWidth + currentPath.lineWidth) / 2;
      } else {
        intersection = checkLineIntersection(
          lastPoint,
          newPoint,
          path.points[0],
          path.points[1]
        );
        if (intersection) break;

        let p0 = midpoint(path.points[0], path.points[1]);
        for (let j = 1; j < length - 2; j++) {
          let p1 = path.points[j];
          let p2 = midpoint(path.points[j], path.points[j + 1]);

          let l0 = lastPoint;
          let l1 = newPoint;

          if (checkCurveIntersection(p0, p1, p2, l0, l1)) {
            intersection = true;
            break;
          }
          p0 = p2;
        }
      }

      if (intersection) {
        savedPaths.splice(i, 1);
        savePathsToTab();
        renderSavedPaths();
      }
    }

    lastPoint = newPoint;
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
