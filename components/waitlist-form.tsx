"use client";

import { useState, FormEvent } from "react";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), type: "list" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setName(""); setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.20)" }}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4" style={{ background: "rgba(0,229,255,0.15)", border: "1px solid rgba(0,229,255,0.3)" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 11L9 16L18 6" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: "#00E5FF" }}>You&apos;re on the list.</h3>
        <p style={{ color: "#aaaaaa" }}>We&apos;ll keep you posted as Am gets closer to launch.</p>
      </div>
    );
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontFamily: "var(--font-dm-sans), sans-serif",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["name", "email"].map((field) => (
          <div key={field}>
            <label htmlFor={`waitlist-${field}`} className="sr-only">{field === "name" ? "Your name" : "Your email"}</label>
            <input
              id={`waitlist-${field}`}
              type={field === "email" ? "email" : "text"}
              placeholder={field === "name" ? "Your name" : "Your email"}
              value={field === "name" ? name : email}
              onChange={(e) => field === "name" ? setName(e.target.value) : setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-200 disabled:opacity-50"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = "rgba(0,229,255,0.40)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,0.10)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.10)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        ))}
      </div>

      {status === "error" && (
        <p className="text-sm px-4 py-3 rounded-lg" style={{ color: "#ff6b6b", background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.20)" }}>
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !name.trim() || !email.trim()}
        className="w-full py-4 px-8 rounded-xl text-base font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
        style={{ background: status === "loading" ? "rgba(0,229,255,0.6)" : "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 40px rgba(0,229,255,0.20)" }}
      >
        {status === "loading" ? "Registering…" : "Join the Mailing List"}
      </button>

      <p className="text-center text-xs" style={{ color: "#555555" }}>
        No spam. Just launch updates and early access news.
      </p>
    </form>
  );
}
