"use client";

import { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  category?: string;
  subject?: string;
}

export default function ContactModal({ open, onClose, category = "General", subject }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const validate = useCallback(() => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim() || name.trim().length < 2) errors.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Valid email required.";
    if (!message.trim() || message.trim().length < 5) errors.message = "Message too short.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, message]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), category }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }, [name, email, message, category, validate]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "#00E5FF" }}>
          {category}
        </p>
        <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
          Send a message
        </h2>

        {status === "sent" ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-white mb-2">Message sent.</p>
            <p className="text-sm" style={{ color: "#888" }}>Am reads everything. You&apos;ll hear back within 24 hours.</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg px-5 py-2 text-sm font-semibold"
              style={{ background: "#00E5FF", color: "#000" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            className="space-y-4"
            toolname="contact_helloam"
            tooldescription="Send a contact message to the helloam team. Provide your name, email, and message."
          >
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#666" }}>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => { setName(e.target.value); setFieldErrors((f) => ({ ...f, name: undefined })); }}
                className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:ring-1"
                style={{ background: "rgba(255,255,255,0.05)", border: fieldErrors.name ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)" }}
                placeholder="Your name"
              />
              {fieldErrors.name && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#666" }}>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((f) => ({ ...f, email: undefined })); }}
                className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:ring-1"
                style={{ background: "rgba(255,255,255,0.05)", border: fieldErrors.email ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)" }}
                placeholder="you@example.com"
              />
              {fieldErrors.email && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{fieldErrors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#666" }}>Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => { setMessage(e.target.value); setFieldErrors((f) => ({ ...f, message: undefined })); }}
                rows={4}
                className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:ring-1 resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: fieldErrors.message ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)" }}
                placeholder="What's on your mind?"
              />
              {fieldErrors.message && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{fieldErrors.message}</p>}
            </div>

            {errorMsg && (
              <p className="text-sm" style={{ color: "#ff4444" }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity disabled:opacity-50"
              style={{ background: "#00E5FF", color: "#000" }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Convenience hook for triggering the modal from anywhere
export function useContactModal() {
  const [state, setState] = useState<{ open: boolean; category: string; subject?: string }>({
    open: false, category: "General",
  });

  const openContact = useCallback((category = "General", subject?: string) => {
    setState({ open: true, category, subject });
  }, []);

  const closeContact = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  return { ...state, openContact, closeContact };
}
