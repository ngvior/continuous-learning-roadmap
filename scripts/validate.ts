import { loadRoadmap } from "../src/content/load";
import { validateRoadmap } from "../src/content/validate";

async function main(): Promise<void> {
  const roadmap = await loadRoadmap();
  const issues = validateRoadmap(roadmap);

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(`${issue.file} [${issue.rule}] ${issue.message}`);
    }
    console.error(
      `\n${issues.length} content validation error${issues.length === 1 ? "" : "s"}.`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `content ok: ${roadmap.lanes.length} Lanes, ${roadmap.nodes.length} Nodes, Next is ${roadmap.next?.id ?? "none"}`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
