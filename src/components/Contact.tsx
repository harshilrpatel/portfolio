const CONTACTS = [
  { label: "email", value: "harshilrpatel96@gmail.com", href: "mailto:harshilrpatel96@gmail.com" },
  { label: "linkedin", value: "linkedin.com/in/hrp96", href: "https://linkedin.com/in/hrp96" },
  { label: "github", value: "github.com/harshilrpatel", href: "https://github.com/harshilrpatel" },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm text-[var(--accent)] mb-3">// contact</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mb-4 max-w-2xl">
          Open to Software Engineer, Agentic AI, and SRE roles.
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl mb-10 leading-relaxed">
          If a role needs someone who treats AI systems with the same rigor
          as production infrastructure, let&apos;s talk.
        </p>

        <div className="rounded-lg border border-[var(--hairline)] bg-[var(--bg-panel)]/40 divide-y divide-[var(--hairline)]">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label !== "email" ? "_blank" : undefined}
              rel={c.label !== "email" ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                {c.label}
              </span>
              <span className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
