import type { ActionReturn } from "svelte/action";
interface Attributes {
  "on:longpress"?: (e: CustomEvent<void>) => void;
}

export function longpress(node: HTMLElement, threshold = 500) {
    const handle_touchstart = () => {
        let start = Date.now();

        const timeout = setTimeout(() => {
            node.dispatchEvent(new CustomEvent('longpress'));
        }, threshold);

        const cancel = () => {
            clearTimeout(timeout);
            node.removeEventListener('touchmove', cancel);
            node.removeEventListener('touchend', cancel);
        };

        node.addEventListener('touchstart', cancel);
        node.addEventListener('touchend', cancel);
    }

    node.addEventListener('touchstart', handle_touchstart);

    return {
        destroy() {
            node.removeEventListener('touchstart', handle_touchstart);
        }
    };
}