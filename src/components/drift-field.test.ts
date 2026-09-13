import { describe, expect, it } from "vitest";
import { REACH, fitPoints, linksOf, pointCount, stepPoints, type DriftPoint } from "./drift-field";

const still = (x: number, y: number): DriftPoint => ({ x, y, vx: 0, vy: 0, r: 1 });

describe("pointCount", () => {
  it("scales with the viewport area", () => {
    expect(pointCount(1440, 900)).toBe(65);
    expect(pointCount(400, 800)).toBe(16);
    expect(pointCount(0, 0)).toBe(0);
  });
});

describe("fitPoints", () => {
  it("fills an empty field inside the viewport", () => {
    const points = fitPoints([], 400, 800);
    expect(points).toHaveLength(16);
    for (const point of points) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(400);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThanOrEqual(800);
    }
  });

  it("keeps existing points when the viewport grows", () => {
    const before = fitPoints([], 400, 800);
    const after = fitPoints(before, 400, 1000);
    expect(after).toHaveLength(20);
    expect(after.slice(0, before.length)).toEqual(before);
  });

  it("drops points when the viewport shrinks", () => {
    const before = fitPoints([], 1440, 900);
    const after = fitPoints(before, 400, 800);
    expect(after).toEqual(before.slice(0, 16));
  });
});

describe("stepPoints", () => {
  it("moves by velocity scaled to 60 Hz frames", () => {
    const point = { ...still(100, 100), vx: 0.08, vy: -0.08 };
    stepPoints([point], 400, 800, 1000 / 30);
    expect(point.x).toBeCloseTo(100.16);
    expect(point.y).toBeCloseTo(99.84);
  });

  it("caps a long pause so the field never jumps", () => {
    const point = { ...still(100, 100), vx: 0.08, vy: 0 };
    stepPoints([point], 400, 800, 10_000);
    expect(point.x).toBeCloseTo(100 + 0.08 * 3);
  });

  it("wraps a point that leaves past the reach to the far side", () => {
    const left = { ...still(-REACH - 0.01, 10), vx: -0.08 };
    const bottom = { ...still(10, 800 + REACH - 0.01), vy: 0.08 };
    stepPoints([left, bottom], 400, 800, 1000 / 60);
    expect(left.x).toBe(400 + REACH);
    expect(bottom.y).toBe(-REACH);
  });
});

describe("linksOf", () => {
  it("links pairs within reach, stronger when closer", () => {
    const a = still(0, 0);
    const near = still(30, 0);
    const edge = still(0, REACH);
    const far = still(400, 400);
    const links = linksOf([a, near, edge, far]);

    expect(links.map((link) => [link.a, link.b])).toEqual([
      [a, near],
      [a, edge],
    ]);
    expect(links[0].strength).toBeCloseTo(0.8);
    expect(links[1].strength).toBe(0);
  });
});
