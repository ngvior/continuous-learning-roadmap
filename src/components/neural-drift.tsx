"use client";

import { useEffect, useRef } from "react";
import { fitPoints, linksOf, stepPoints, type DriftPoint } from "./drift-field";
import styles from "./neural-drift.module.css";

const LINK_ALPHA = 0.22;
const POINT_ALPHA = 0.55;
/** Past 2x the extra pixels cost fill rate on phones without looking any sharper. */
const MAX_PIXEL_RATIO = 2;

function draw(context: CanvasRenderingContext2D, points: DriftPoint[], width: number, height: number) {
  context.clearRect(0, 0, width, height);
  context.lineWidth = 0.8;
  for (const { a, b, strength } of linksOf(points)) {
    context.globalAlpha = strength * LINK_ALPHA;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();
  }
  context.globalAlpha = POINT_ALPHA;
  for (const point of points) {
    context.beginPath();
    context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    context.fill();
  }
}

/**
 * The indigo neural-network drift behind the page. Opaque Node boxes cover it,
 * so it only shows between them. Static under reduced motion, paused while the tab is hidden.
 */
export function NeuralDrift() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let points: DriftPoint[] = [];
    let width = 0;
    let height = 0;
    let frameId: number | null = null;
    let lastTime: number | null = null;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      // Resizing the canvas resets its state.
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const indigo = getComputedStyle(canvas).color;
      context.strokeStyle = indigo;
      context.fillStyle = indigo;
      points = fitPoints(points, width, height);
      draw(context, points, width, height);
    };

    const frame = (time: number) => {
      stepPoints(points, width, height, lastTime === null ? 0 : time - lastTime);
      lastTime = time;
      draw(context, points, width, height);
      frameId = requestAnimationFrame(frame);
    };

    const sync = () => {
      const moving = !reducedMotion.matches && !document.hidden;
      if (moving && frameId === null) {
        lastTime = null;
        frameId = requestAnimationFrame(frame);
      } else if (!moving && frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    sync();
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.drift} aria-hidden="true" />;
}
