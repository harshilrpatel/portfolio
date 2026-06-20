const PROJECTS = [
  {
    name: "ChatWithMyAI",
    description:
      "A recruiter-facing AI digital twin — talk to an AI version of me about my background, skills, and projects. MCP-based tool routing with anti-hallucination guardrails and relevance filtering for multi-turn conversations.",
    stack: ["LangGraph", "FastMCP", "Anthropic SDK", "Gradio"],
    href: "https://huggingface.co/spaces/harshilrpatel96/ChatWithMyAI",
    featured: true,
  },
  {
    name: "The Office Simulator",
    description:
      "RAG chatbot trained on ~80k lines of The Office dialogue. Vectorized transcripts, semantic search, and GPT-4 responses with character-aware prompting and stage-direction handling.",
    stack: ["Python", "ChromaDB", "OpenAI Embeddings", "GPT-4"],
    href: "https://github.com/harshilrpatel",
  },
  {
    name: "LLM Provider Framework",
    description:
      "A unified Python interface abstracting OpenAI, Gemini, and Claude behind one API. Factory pattern, abstract base classes, and a model comparison tool — built to explore clean multi-LLM architecture.",
    stack: ["Python", "ABC Pattern", "Factory Pattern"],
    href: "https://github.com/harshilrpatel",
  },
  {
    name: "Multi-Agent Research Orchestrator",
    description:
      "Parallel multi-agent research system built on the OpenAI Agents SDK, with guardrails and async task decomposition for production-grade agent coordination.",
    stack: ["OpenAI Agents SDK", "Async Python", "Guardrails"],
    href: "https://github.com/harshilrpatel",
  },
  {
    name: "Multi-Agent Debate System",
    description:
      "An agent-orchestration system built on CrewAI exploring role-based agents and inter-agent communication patterns through structured debate.",
    stack: ["CrewAI", "Python", "Async"],
    href: "https://github.com/harshilrpatel",
  },
  {
    name: "Flash Sale App",
    description:
      "An e-commerce flash-sale application focused on backend correctness under contention — built to sharpen Java fundamentals.",
    stack: ["Java"],
    href: "https://github.com/harshilrpatel/flash-sale-app",
  },
];

export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-6 py-24 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm text-[var(--accent)] mb-3">// projects</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--text-primary)] mb-12">
          Things I&apos;ve built to learn, then kept building because they got useful.
        </h2>

        {featured && (
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--bg-panel)] to-[var(--bg-elevated)] p-8 mb-6 hover:border-[var(--accent)] transition-colors duration-300"
          >
            <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] status-dot" />
                live demo
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                huggingface.co ↗
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--text-primary)] mb-2">
              {featured.name}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-4">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[12px] px-2.5 py-1 rounded border border-[var(--hairline)] text-[var(--text-secondary)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </a>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-[var(--hairline)] bg-[var(--bg-panel)]/40 p-6 hover:border-[var(--accent)]/50 hover:bg-[var(--bg-panel)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--text-primary)]">
                  {project.name}
                </h3>
                <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                  ↗
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--hairline)] text-[var(--text-muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
