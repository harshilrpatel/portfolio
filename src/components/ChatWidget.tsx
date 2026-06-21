"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
type Stage = "RUNNING" | "SLEEPING" | "BUILDING" | "STOPPED" | "UNKNOWN" | "ERROR";

const POLL_MS = 5_000;
const TOOLTIP_DELAY_MS = 3_000;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("UNKNOWN");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const tooltipShownRef = useRef(false);

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/space-status");
      const { stage: s } = await res.json();
      setStage(s as Stage);
      return s as Stage;
    } catch {
      setStage("ERROR");
      return "ERROR" as Stage;
    }
  }, []);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => {
    checkStatus().then((s) => {
      if (s !== "RUNNING") {
        pollRef.current = setInterval(async () => {
          const current = await checkStatus();
          if (current === "RUNNING") stopPolling();
        }, POLL_MS);
      }
    });
    return stopPolling;
  }, [checkStatus]);

  // Show tooltip after delay, once per session
  useEffect(() => {
    if (tooltipShownRef.current) return;
    const t = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
        tooltipShownRef.current = true;
      }
    }, TOOLTIP_DELAY_MS);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || stage !== "RUNNING") return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: [] }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.error
            ? "Something went wrong — try again."
            : data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isReady = stage === "RUNNING";
  const dotColor =
    isReady
      ? "var(--accent)"
      : stage === "ERROR" || stage === "STOPPED"
        ? "var(--accent-rose)"
        : "var(--accent-amber)";

  const statusLabel = isReady
    ? "online"
    : stage === "SLEEPING"
      ? "waking up..."
      : stage === "ERROR" || stage === "STOPPED"
        ? "unavailable"
        : "starting...";

  const emptyHint = isReady
    ? "Ask me anything about my experience, skills, or projects."
    : stage === "SLEEPING"
      ? "Waking up the AI — usually takes ~30s."
      : "Starting up — hang tight.";

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] flex flex-col rounded-lg border border-[var(--hairline)] bg-[var(--bg-panel)] shadow-2xl overflow-hidden animate-fade-up"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--hairline)] bg-[var(--bg-elevated)]">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full status-dot"
                style={{ background: dotColor }}
              />
              <span className="font-mono text-xs text-[var(--text-primary)]">
                chat.harshil.dev
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                {statusLabel}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[260px]">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2 py-10">
                <span
                  className="inline-block w-2 h-2 rounded-full status-dot"
                  style={{ background: dotColor }}
                />
                <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed max-w-[220px]">
                  {emptyHint}
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] px-3 py-2 rounded text-[13px] leading-relaxed font-mono ${
                    msg.role === "user"
                      ? "bg-[var(--accent)] text-[var(--bg)]"
                      : "bg-[var(--bg-elevated)] border border-[var(--hairline)] text-[var(--text-secondary)]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[var(--bg-elevated)] border border-[var(--hairline)] px-3 py-2 rounded font-mono text-xs text-[var(--text-muted)]">
                  thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 px-4 py-3 border-t border-[var(--hairline)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={isReady ? "ask me anything..." : statusLabel}
              disabled={!isReady || loading}
              className="flex-1 bg-[var(--bg-elevated)] border border-[var(--hairline)] rounded px-3 py-2 font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] disabled:opacity-40 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!isReady || loading || !input.trim()}
              className="px-3 py-2 rounded bg-[var(--accent)] text-[var(--bg)] font-mono text-xs font-medium hover:bg-[var(--accent-dim)] disabled:opacity-40 transition-colors"
              aria-label="Send"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Tooltip bubble */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-up">
          <div className="relative bg-[var(--bg-elevated)] border border-[var(--accent)]/40 rounded-lg px-4 py-3 shadow-xl max-w-[220px]">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-xs leading-none"
              aria-label="Dismiss"
            >
              ✕
            </button>
            <p className="font-mono text-xs text-[var(--text-primary)] leading-relaxed pr-4">
              Ask me anything about my experience or projects.
            </p>
            <p className="font-mono text-[11px] text-[var(--accent)] mt-1">
              I&apos;m an AI trained on Harshil&apos;s background →
            </p>
            {/* Arrow pointing down */}
            <span className="absolute -bottom-[7px] right-7 w-3 h-3 bg-[var(--bg-elevated)] border-r border-b border-[var(--accent)]/40 rotate-45" />
          </div>
        </div>
      )}

      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Ping ring — only when not open */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-60"
            style={{ background: "var(--accent)" }}
          />
        )}
        <button
          onClick={() => { setShowTooltip(false); setIsOpen((o) => !o); }}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
          style={{
            background: isOpen ? "var(--bg-elevated)" : "var(--accent)",
            border: isOpen ? "1px solid var(--hairline)" : "none",
          }}
        >
          {isOpen ? (
            <span className="font-mono text-[var(--text-primary)] text-base leading-none">✕</span>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--bg)]"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
