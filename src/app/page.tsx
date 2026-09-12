import { Suspense } from "react";
import { Masthead } from "@/components/masthead";
import { NodeSheet } from "@/components/node-sheet";
import { RoadmapGraph } from "@/components/roadmap-graph";
import { toGraphModel } from "@/content/graph";
import { loadRoadmap } from "@/content/load";
import { toSheetModel } from "@/content/sheet";

export default async function Home() {
  const roadmap = await loadRoadmap();

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-[clamp(16px,4vw,48px)] pb-24">
      <Masthead />
      <p className="max-w-[60ch] pt-[18px] text-ink-2">
        Click a Node for its detail. Hover or focus one to see what it needs and what it unlocks.
      </p>
      <RoadmapGraph {...toGraphModel(roadmap)} />
      {/* The sheet reads `?node=` on the client, so the graph above stays prerendered. */}
      <Suspense fallback={null}>
        <NodeSheet nodes={toSheetModel(roadmap)} />
      </Suspense>
    </main>
  );
}
