"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import ContactButton from "@/components/contact-button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const SESSION_PRICE = Number(process.env.NEXT_PUBLIC_SESSION_PRICE) || 75;

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <path d="M2 7L5.5 10.5L12 4" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FREE_FEATURES = [
  "Email support — we respond",
  "Documentation & setup guides",
  "Community updates as Am evolves",
];

const LIVE_FEATURES = [
  "Screenshare session with the founder",
  "Troubleshooting & live fixes",
  "Training on Am's capabilities",
  "Workflow design & custom setup",
  "Book as many sessions as you need",
];

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#555] outline-none focus:ring-1 focus:ring-[#00E5FF]";

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message || "Payment failed. Please try again.");
      setLoading(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" toolname="book_helloam_session" tooldescription="Book a 30-minute live session with the founder via Stripe payment.">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      {error && <p className="text-sm" style={{ color: "#ff4444" }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="flex items-center justify-center w-full px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100 disabled:opacity-50 cursor-pointer"
        style={{ background: "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 48px rgba(0,229,255,0.25)" }}
      >
        {loading ? "Processing…" : `Pay $${SESSION_PRICE}`}
      </button>
    </form>
  );
}

function SessionCheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep("info");
      setClientSecret("");
      setApiError("");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  async function handleContinue() {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/session-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error || "Something went wrong."); setLoading(false); return; }
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch {
      setApiError("Network error. Please try again.");
    }
    setLoading(false);
  }

  const inputStyle = (field: string) => ({
    background: "rgba(255,255,255,0.06)",
    border: errors[field] ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 space-y-4"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white">
            {step === "success" ? "Session Booked" : "Book a Live Session"}
          </h3>
          <button onClick={onClose} className="text-[#555] hover:text-white text-xl leading-none cursor-pointer">×</button>
        </div>

        {step === "info" && (
          <>
            <p className="text-sm" style={{ color: "#888" }}>
              30-minute screenshare with the founder — <strong className="text-white">${SESSION_PRICE}</strong>.
            </p>
            <div>
              <input type="text" placeholder="Full name" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} className={inputClass} style={inputStyle("name")} />
              {errors.name && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.name}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} className={inputClass} style={inputStyle("email")} />
              {errors.email && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.email}</p>}
            </div>
            {apiError && <p className="text-sm" style={{ color: "#ff4444" }}>{apiError}</p>}
            <button
              onClick={handleContinue}
              disabled={loading}
              className="flex items-center justify-center w-full px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100 disabled:opacity-50 cursor-pointer"
              style={{ background: "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 48px rgba(0,229,255,0.25)" }}
            >
              {loading ? "Loading…" : "Continue to Payment"}
            </button>
          </>
        )}

        {step === "payment" && clientSecret && (
          <>
            <p className="text-sm" style={{ color: "#888" }}>
              Paying as <strong className="text-white">{name}</strong> ({email})
            </p>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "night",
                  variables: {
                    colorPrimary: "#00E5FF",
                    colorBackground: "#1a1a1a",
                    colorText: "#ffffff",
                    colorTextSecondary: "#888888",
                    borderRadius: "12px",
                    fontFamily: "inherit",
                  },
                },
              }}
            >
              <PaymentForm onSuccess={() => setStep("success")} />
            </Elements>
            <button
              onClick={() => setStep("info")}
              className="text-xs text-center w-full cursor-pointer"
              style={{ color: "#555" }}
            >
              ← Back
            </button>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-4">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
              style={{ background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12L10 17L19 8" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-white mb-2">Payment received.</p>
            <p className="text-sm mb-1" style={{ color: "#888" }}>
              We&apos;ll email you at <strong className="text-white">{email}</strong> within 24 hours to schedule your Zoom session with Michael.
            </p>
            <p className="text-xs mb-6" style={{ color: "#555" }}>Check your email for your receipt.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
              style={{ background: "#00E5FF", color: "#0a0a0a" }}
            >
              Done
            </button>
          </div>
        )}

        {step !== "success" && (
          <p className="text-center text-[10px]" style={{ color: "#444" }}>Secure payment via Stripe.</p>
        )}
      </div>
    </div>
  );
}

export default function Plans() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <section
      id="support"
      className="px-6 py-24"
      style={{
        background: "rgba(0,229,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00E5FF" }}
          >
            Support
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            We&apos;re here when you need us.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#666666" }}>
            Am runs on your device — no subscriptions, no monthly fees.
            Support is available free by email, or live with the founder when you need hands-on help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Free email */}
          <div
            className="flex flex-col rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3 className="text-lg font-bold text-white mb-1">Email Support</h3>
            <p className="text-sm mb-6" style={{ color: "#666666" }}>
              Included with every Am. Always free.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-white">Free</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-sm" style={{ color: "#888888" }}>{f}</span>
                </li>
              ))}
            </ul>

            <ContactButton
              category="Support"
              className="block w-full text-center px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#cccccc",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Contact Us
            </ContactButton>
          </div>

          {/* Live session */}
          <div
            className="relative flex flex-col rounded-2xl p-8"
            style={{
              background: "rgba(0,229,255,0.06)",
              border: "1px solid rgba(0,229,255,0.3)",
              boxShadow: "0 0 40px rgba(0,229,255,0.08)",
            }}
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap"
              style={{ background: "#00E5FF", color: "#0a0a0a" }}
            >
              With the Founder
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Live Session</h3>
            <p className="text-sm mb-6" style={{ color: "#666666" }}>
              Screenshare directly with Michael. Book as needed.
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-white">${SESSION_PRICE}</span>
              <span style={{ color: "#555555" }}>/ 30 min</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {LIVE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-sm" style={{ color: "#888888" }}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowCheckout(true)}
              className="block w-full text-center px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ background: "#00E5FF", color: "#0a0a0a" }}
            >
              {`Book a Session — $${SESSION_PRICE}`}
            </button>
            <SessionCheckoutModal open={showCheckout} onClose={() => setShowCheckout(false)} />
          </div>
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: "#444444" }}>
          No subscriptions. No recurring fees. Pay only when you want live help.
          <br />
          Need something beyond that?{" "}
          <ContactButton
            category="General"
            className="transition-colors hover:text-white cursor-pointer"
            style={{ color: "#666666", textDecoration: "underline" }}
          >
            Get in touch
          </ContactButton>{" "}
          — let&apos;s talk.
        </p>
      </div>
    </section>
  );
}
