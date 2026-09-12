export function Masthead() {
  return (
    <header className="grid grid-cols-[1fr_auto] items-end gap-8 border-b border-rule pt-14 pb-7">
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
      {/* Heartbeat slot, filled in slice 5. */}
      <div className="min-w-[320px]" aria-hidden="true" />
    </header>
  );
}
