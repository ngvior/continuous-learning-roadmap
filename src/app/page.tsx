import { Masthead } from "@/components/masthead";
import { RoadmapGraph } from "@/components/roadmap-graph";
import { toGraphModel } from "@/content/graph";
import { loadRoadmap } from "@/content/load";

export default async function Home() {
  const graph = toGraphModel(await loadRoadmap());

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 px-[clamp(16px,4vw,48px)] pb-24">
      <Masthead />
      <p className="max-w-[60ch] pt-[18px] text-ink-2">
        Hover or focus a Node to see what it needs and what it unlocks.
      </p>
      <RoadmapGraph {...graph} />
    </main>
  );
}
