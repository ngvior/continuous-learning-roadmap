import { HeartbeatTrace } from "./heartbeat-trace";

export function Masthead({ daysAgo }: { daysAgo: number | null }) {
  return (
    <header className="grid grid-cols-[1fr_auto] items-end gap-8 border-b border-rule pt-14 pb-7 max-[720px]:grid-cols-1 max-[720px]:items-start">
      <div>
        <h1 className="text-[clamp(28px,3.4vw,40px)] leading-[1.05] font-semibold tracking-[-0.02em] text-ink">
          Continuous Learning Roadmap
        </h1>
        <p className="mt-3 max-w-[46ch] text-ink-2">
          One backend engineer moving toward AI engineering. Read top to bottom:
          that is the Suggested Order. Lines are Prerequisites, the only hard
          rule. No deadlines: the Heartbeat is the only clock.
        </p>
      </div>
      <HeartbeatTrace daysAgo={daysAgo} />
    </header>
  );
}
