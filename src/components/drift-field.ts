/** Canvas pixels per point: sparse enough that Node boxes stay the foreground. */
const AREA_PER_POINT = 20_000;
/** Two points closer than this are linked by a line. */
export const REACH = 150;
/** Top speed along each axis, in CSS pixels per 60 Hz frame. */
const MAX_SPEED = 0.08;
/** Longest step integrated at once, so a stalled frame never teleports the field. */
const MAX_STEP_MS = 50;
const FRAME_MS = 1000 / 60;

export type DriftPoint = { x: number; y: number; vx: number; vy: number; r: number };
export type DriftLink = { a: DriftPoint; b: DriftPoint; strength: number };

export function pointCount(width: number, height: number): number {
  return Math.round((width * height) / AREA_PER_POINT);
}

function spawn(width: number, height: number, random: () => number): DriftPoint {
  return {
    x: random() * width,
    y: random() * height,
    vx: (random() * 2 - 1) * MAX_SPEED,
    vy: (random() * 2 - 1) * MAX_SPEED,
    r: 0.9 + random() * 1.3,
  };
}

/**
 * Sizes the field to a new viewport. Existing points keep their place, so the
 * mobile address bar resizing the viewport does not reshuffle the network.
 */
export function fitPoints(
  points: DriftPoint[],
  width: number,
  height: number,
  random: () => number = Math.random,
): DriftPoint[] {
  const count = pointCount(width, height);
  const kept = points.slice(0, count);
  while (kept.length < count) {
    kept.push(spawn(width, height, random));
  }
  return kept;
}

function wrap(value: number, size: number): number {
  if (value < -REACH) return size + REACH;
  if (value > size + REACH) return -REACH;
  return value;
}

/** Moves every point in place; points leaving past the reach re-enter on the far side. */
export function stepPoints(points: DriftPoint[], width: number, height: number, elapsedMs: number): void {
  const frames = Math.min(Math.max(elapsedMs, 0), MAX_STEP_MS) / FRAME_MS;
  for (const point of points) {
    point.x = wrap(point.x + point.vx * frames, width);
    point.y = wrap(point.y + point.vy * frames, height);
  }
}

/** Pairs within reach; strength falls from 1 to 0 as the distance grows to the reach. */
export function linksOf(points: DriftPoint[]): DriftLink[] {
  const links: DriftLink[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      if (distance <= REACH) {
        links.push({ a: points[i], b: points[j], strength: 1 - distance / REACH });
      }
    }
  }
  return links;
}
