const SKILL_GROUPS = [
  {
    label: "infrastructure",
    items: ["Kubernetes", "OpenShift", "API Gateways", "Apigee", "Distributed Systems"],
  },
  {
    label: "observability",
    items: ["Splunk", "AppDynamics", "SLOs/SLIs", "Incident Response"],
  },
  {
    label: "agentic ai",
    items: ["LangGraph", "MCP", "CrewAI", "OpenAI Agents SDK", "Anthropic SDK"],
  },
  {
    label: "languages",
    items: ["Python", "Java", "TypeScript"],
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm text-[var(--accent)] mb-3">// about</p>
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--text-primary)] mb-5">
              From keeping Citibank-scale systems up, to building the agents that might one day help.
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                I&apos;m a Software Engineer at TCS, embedded with Citibank,
                where I work production and reliability engineering for
                systems that don&apos;t get to go down. That means Kubernetes
                and OpenShift in production, leading the migration of API
                traffic from IBM API Connect to Google Apigee, and living
                inside Splunk and AppDynamics dashboards when things page me
                at 2am.
              </p>
              <p>
                Outside of work, I&apos;ve been going deep on agentic AI —
                building multi-agent systems, retrieval pipelines, and a
                conversational digital twin of myself (the project this site
                will eventually let you talk to). The throughline for me is
                reliability: whether it&apos;s a Kubernetes cluster or an LLM
                agent, I care about systems that behave predictably under
                real-world load.
              </p>
              <p>
                I hold an M.S. in Computer Science from UT Arlington and I&apos;m
                currently looking for Software Engineer, Agentic AI/LLM
                Engineer, or SRE roles.
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-lg border border-[var(--hairline)] bg-[var(--bg-panel)]/40 p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-5">
                stack.json
              </p>
              <div className="space-y-5">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="font-mono text-xs text-[var(--accent)] mb-2">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[12px] px-2.5 py-1 rounded border border-[var(--hairline)] text-[var(--text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
