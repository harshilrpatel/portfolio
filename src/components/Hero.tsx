const STATS = [
  { label: "yrs_production", value: "4+" },
  { label: "uptime_owned", value: "99.95%" },
  { label: "status", value: "open_to_work", isStatus: true },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-40 pb-28 px-6 overflow-hidden"
    >
      {/* faint grid texture, fades toward bottom */}
      <div
        className="absolute inset-0 bg-grid opacity-[0.4] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="animate-fade-up">
          <p className="font-mono text-sm text-[var(--accent)] mb-5 tracking-wide">
            // software engineer — production systems & agentic ai
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--text-primary)] max-w-3xl">
            I keep systems running at scale, then I teach AI to run them too.
          </h1>
          <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Harshil Patel — Software Engineer building reliable infrastructure
            on Kubernetes &amp; OpenShift, and shipping agentic AI systems on
            top of it. Currently in Irving, TX.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="font-mono text-sm px-5 py-3 rounded bg-[var(--accent)] text-[var(--bg)] font-medium hover:bg-[var(--accent-dim)] transition-colors duration-200"
            >
              view projects
            </a>
            <a
              href="#contact"
              className="font-mono text-sm px-5 py-3 rounded border border-[var(--hairline)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              get in touch
            </a>
          </div>
        </div>

        {/* Signature element: status-dashboard readout, framed like a monitoring panel */}
        <div
          className="mt-20 animate-fade-up rounded-lg border border-[var(--hairline)] bg-[var(--bg-panel)]/60 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--hairline)] bg-[var(--bg-elevated)]/60">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-rose)]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-amber)]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]/70" />
            <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
              status.harshil.dev
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y sm:divide-y-0 divide-[var(--hairline)]">
            {STATS.map((s) => (
              <div key={s.label} className="px-5 py-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  {s.label}
                </p>
                <p
                  className={`font-mono text-base sm:text-lg font-medium flex items-center gap-2 ${
                    s.isStatus ? "text-[var(--accent)]" : "text-[var(--text-primary)]"
                  }`}
                >
                  {s.isStatus && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] status-dot" />
                  )}
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
