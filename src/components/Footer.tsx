export default function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-[var(--text-muted)]">
          built by harshil patel · {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] status-dot" />
          all systems operational
        </p>
      </div>
    </footer>
  );
}
