const ROLES = [
  {
    period: "2021 — Present",
    title: "Software Engineer",
    org: "Tata Consultancy Services — client: Citibank, N.A.",
    location: "Irving, TX",
    points: [
      "Operate and maintain production Kubernetes/OpenShift workloads supporting Citibank-scale traffic, owning reliability end to end.",
      "Led migration of API gateway traffic from IBM API Connect to Google Apigee, including routing, policy, and rollback planning.",
      "Built observability practice around Splunk and AppDynamics — dashboards, alerting, and incident triage workflows.",
      "Worked PCI-DSS-scoped database migrations with strict compliance and zero-downtime constraints.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 py-24 border-t border-[var(--hairline)]"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm text-[var(--accent)] mb-3">
          // experience
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--text-primary)] mb-12">
          Production-tested, not just shipped.
        </h2>

        <div className="space-y-10">
          {ROLES.map((role, i) => (
            <div
              key={role.title + role.period}
              className="grid sm:grid-cols-[140px_1fr] gap-4 sm:gap-8"
            >
              <div className="font-mono text-xs text-[var(--text-muted)] pt-1 flex sm:flex-col gap-2 sm:gap-0">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="sm:mt-1">{role.period}</span>
              </div>
              <div className="relative pl-6 border-l border-[var(--hairline)] pb-2">
                <span className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-[var(--accent)]" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text-primary)]">
                  {role.title}
                </h3>
                <p className="font-mono text-sm text-[var(--text-secondary)] mt-1">
                  {role.org}
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)] mt-0.5">
                  {role.location}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="text-[var(--text-secondary)] text-[15px] leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-[var(--accent)] before:text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
