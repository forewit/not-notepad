import { cubicInOut } from "svelte/easing";

interface AnimateCSSOptions {
  duration?: number;
  easing?: (t: number) => number;
  onEnd?: () => void;
  onStep?: (t: number, u: number) => void;
  css: (t: number, u: number) => string;
}

// TODO: maybe stop this from blowing away the initial inline css?
export const animateCSS = (element: HTMLElement, options: AnimateCSSOptions) => {
  const { duration = 300, easing = cubicInOut, onEnd = () => { }, onStep = () => { }, css } = options;

  let start: number;
  function step(timeStamp: number) {
    if (start === undefined) start = timeStamp;
    const t = easing((timeStamp - start) / duration);
    const u = 1 - t;

    if (t < 1) {
      element.style.cssText = css(t, u);
      onStep(t, u);
      requestAnimationFrame(step);
    } else {
      element.style.cssText = "";
      onEnd();
    }
  }
  requestAnimationFrame(step);
}


interface AnimateSimpleOptions {
  duration?: number;
  easing?: (t: number) => number;
  onEnd?: () => void;
  onStep?: (t: number, u: number) => void;
}


export const animateSimple =(options: AnimateSimpleOptions) =>{
  const { duration = 300, easing = cubicInOut, onEnd = () => { }, onStep = () => { } } = options;
  let start: number;
  function step(timeStamp: number) {
    if (start === undefined) start = timeStamp;
    const t = easing((timeStamp - start) / duration);
    const u = 1 - t;
    if (t < 1) {
      onStep(t, u);
      requestAnimationFrame(step);
    } else {
      onEnd();
    }
  }
  requestAnimationFrame(step);
}

