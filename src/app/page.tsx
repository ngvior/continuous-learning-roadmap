import { loadRoadmap, type RoadmapNode } from "@/content/load";

const STATUS_LABEL: Record<RoadmapNode["status"], string> = {
  pending: "pending",
  "in-progress": "in progress",
  done: "done",
};

export default async function Home() {
  const { lanes, nodes, next } = await loadRoadmap();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-sm uppercase tracking-widest text-accent-2">
          Roadmap Site
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Continuous Learning Roadmap
        </h1>
        <p className="font-mono text-sm text-accent">
          {nodes.length} Nodes across {lanes.length} Lanes
          {next ? ` · next: ${next.title}` : ""}
        </p>
      </header>

      {lanes.map((lane) => (
        <section key={lane.id} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {lane.title}
          </h2>
          <p className="max-w-2xl leading-7 text-ink/70">{lane.description}</p>
          <ol className="flex flex-col gap-2 border-t border-rule pt-4">
            {nodes
              .filter((node) => node.lane === lane.id)
              .map((node) => (
                <li
                  key={node.id}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="font-mono text-sm text-ink/50">
                    {node.order}
                  </span>
                  <span className="text-ink">{node.title}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent-2">
                    {node.type} · {STATUS_LABEL[node.status]}
                  </span>
                </li>
              ))}
          </ol>
        </section>
      ))}
    </main>
  );
}
