<script lang="ts">
  import { onMount } from "svelte";
  import * as gestures from "$lib/modules/gestures.js";
  import { tabsStore } from "$lib/stores/tabsStore";

  // reduces storage needed to render a path
  const DECIMAL_PRECISION = 2;

  // public variables
  export let radius = 3; // radius should usually be at least 2x smoothness
  export let smoothness = 2; // higher smoothness means less points are generated
  export let stroke = 5;
  export let pressureScaler = 5;
  export let color = "#000000";
  export let disabled = false;
  export let hide = false;
  export let tabID = "";
  export function clear() {
    ctx.clearRect(0, 0, width, height);
    savedPaths = [];
  }
  export function undo() {
    if (savedPaths.length == 0) return;
    log.innerHTML = "Undo";

    // remove most recent path and clear the canvas
    savedPaths.pop();
    ctx.clearRect(0, 0, width, height);

    // render all saved paths
    for (let i = 0; i < savedPaths.length; i++) {
      renderPath(savedPaths[i]);
    }
  }

  type Path = {
    points: { x: number; y: number }[];
    lineWidths: number[];
    ctrlPoints: { x: number; y: number }[];
    color: string;
  }

  // internal variables
  $: strokeWidth = Math.max(stroke, 1);
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let lastPoint = { x: 0, y: 0 };
  let lastLineWidth = 0;
  let height = 0;
  let width = 0;
  let dpi: number;
  let drawing = false;
  let log: HTMLDivElement;
  let currentPath: Path;
  let resizeObserver: ResizeObserver;
  let savedPaths: Path[] = []; // used to re-draw the paths if needed


  $: if (disabled) {
    disableDrawing();
  } else {
    enableDrawing();
  }

  function enableDrawing() {
    if (!canvas) return;
    gestures.enable(canvas);
    window.addEventListener("keydown", keydownHandler);
    resizeObserver.observe(canvas);
    console.log("drawing enabled");
  }
  function disableDrawing() {
    if (!canvas) return;
    gestures.disable(canvas);
    window.removeEventListener("keydown", keydownHandler);
    resizeObserver.disconnect();
    console.log("drawing disabled");
  }

  const dist = (x1: number, y1: number, x2: number, y2: number) => {
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  };

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

  // helper function for translating screen to canvas coordinates
  function screenToCanvas(x: number, y: number) {
    // adjust for DPI & offset
    let rect = canvas.getBoundingClientRect();
    return {
      x: (x - rect.left) * dpi,
      y: (y - rect.top) * dpi,
    };
  }

  // handle resizing
  function resize() {
    console.log("resizing");

    // stop drawing if you already are
    dragEndHandler();

    // step 1: resize the onScreenCanvas
    dpi = window.devicePixelRatio;
    let rect = canvas.getBoundingClientRect();
    height = rect.height * dpi;
    width = rect.width * dpi;
    canvas.width = width;
    canvas.height = height;

    // render all saved paths
    for (let i = 0; i < savedPaths.length; i++) {
      renderPath(savedPaths[i]);
    }
  }

  function renderPath(path: Path) {
    // set canvas properties
    ctx.lineWidth = path.lineWidths[0];
    ctx.lineCap = "round";
    ctx.strokeStyle = path.color;

    // draw first point
    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);
    ctx.stroke();

    // curve to each other point
    for (let i = 0; i < path.points.length; i++) {
      ctx.lineWidth = path.lineWidths[i];
      ctx.quadraticCurveTo(
        path.points[i].x,
        path.points[i].y,
        path.ctrlPoints[i].x,
        path.ctrlPoints[i].y
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(path.ctrlPoints[i].x, path.ctrlPoints[i].y);
    }
  }

  function savePathsToTab() {
    if (!$tabsStore[tabID]) return;
    $tabsStore[tabID].paths = savedPaths;
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
    }
  }
  function truncateNumber(num: number) {
    return Number(num.toFixed(DECIMAL_PRECISION));
  }

  // custom event handlers
  function startHandle(x: number, y: number, pressure: number) {
    drawing = true;
    lastPoint = screenToCanvas(x, y);

    if (pressure !== undefined && pressure > 0) {
      lastLineWidth = Math.log(pressure + 1) * pressureScaler * strokeWidth;
    } else {
      lastLineWidth = strokeWidth;
    }

    // set canvas properties
    ctx.lineWidth = lastLineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    // draw path
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.stroke();

    // save new path
    currentPath = {
      points: [],
      ctrlPoints: [],
      lineWidths: [],
      color: color,
    };
  }

  function dragHandle(x: number, y: number, pressure: number) {
    if (!drawing) return;

    let newPoint = screenToCanvas(x, y);

    // if using a drawing circle
    if (radius > 0) {
      // do nothing if point is inside the drawing circle
      if (dist(newPoint.x, newPoint.y, lastPoint.x, lastPoint.y) <= radius)
        return;

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

    // set control points
    let xc = (lastPoint.x + newPoint.x) / 2;
    let yc = (lastPoint.y + newPoint.y) / 2;

    // update line width
    if (pressure !== undefined && pressure > 0) {
      lastLineWidth =
        Math.log(pressure + 1) * pressureScaler * strokeWidth * 0.2 +
        lastLineWidth * 0.8;
    }

    // draw path
    ctx.lineWidth = lastLineWidth;
    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, xc, yc);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xc, yc);

    // add control point and new point to the current path
    currentPath.points.push(truncatePoint(lastPoint));
    currentPath.ctrlPoints.push(truncatePoint({ x: xc, y: yc }));
    currentPath.lineWidths.push(truncateNumber(lastLineWidth));

    // update last point
    lastPoint = newPoint;
  }

  function dragEndHandler() {
    if (drawing) {
      savedPaths.push(currentPath);
      savePathsToTab();
    }
    drawing = false;
  }

  function keydownHandler(e: KeyboardEvent) {
    // listen to Ctrl + Z to undo
    if (e.ctrlKey && e.key == "z") {
      undo();
      savePathsToTab();
    }
    e.preventDefault();
  }

  onMount(() => {
    // setup onscreen canvas context
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;

    // setup gesture event listeners
    canvas.addEventListener("gesture", ((e: CustomEvent) => {
      switch (e.detail.name) {
        case "left-click-drag-start":
        case "touch-drag-start":
          startHandle(e.detail.x, e.detail.y, e.detail.force);
          break;
        case "left-click-dragging":
        case "touch-dragging":
          if (e.detail.force > 0) log.innerHTML = e.detail.force;
          dragHandle(e.detail.x, e.detail.y, e.detail.force);
          break;
        case "left-click-drag-end":
        case "touch-drag-end":
          dragEndHandler();
          break;
        default:
          break;
      }
    }) as EventListener);

    // setup resize observer
    resizeObserver = new ResizeObserver(debounce(resize, 0));
    loadPathsFromTab();

    disabled = disabled; // trigger reactivity
  });
</script>

<!-- current path -->
<canvas id="canvas" class:disabled class:hide bind:this={canvas} />
<div class="log" class:hide bind:this={log}>LOG</div>

<style>
  canvas {
    position: absolute;
    height: 100%;
    width: 100%;

    /* fix ghost margin below html5 canvas: https://stackoverflow.com/questions/9878090/eliminate-ghost-margin-below-html5-canvas-element */
    vertical-align: bottom;
  }
  .log {
    font-family: var(--font);
    font-size: var(--font-size);
    color: var(--text);

    pointer-events: none;
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  .disabled {
    pointer-events: none;
  }
  .hide {
    display: none;
  }
</style>
