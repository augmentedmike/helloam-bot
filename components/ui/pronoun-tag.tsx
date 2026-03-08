"use client";

import { useState, useRef, useEffect } from "react";
import { usePersonalization, PRONOUN_SETS } from "@/context/personalization-context";
import { useWebHaptics } from "web-haptics/react";

type PronounCase = "subject" | "object" | "possessive" | "reflexive";

export function PronounTag({ case: pronounCase }: { case: PronounCase }) {
  const { pronouns, setPronouns } = usePersonalization();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const { trigger } = useWebHaptics();

  // Current display word — capitalized when it comes from context (e.g. "She")
  const word = pronouns[pronounCase];
  const display = word.charAt(0).toUpperCase() + word.slice(1);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        onClick={() => { trigger("nudge"); setOpen((o) => !o); }}
        title="Click to change pronouns"
        style={{
          font: "inherit",
          color: "inherit",
          lineHeight: "inherit",
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
          borderBottom: open ? "1px solid rgba(0,229,255,0.8)" : "1px dashed rgba(0,229,255,0.45)",
          transition: "border-color 0.15s",
        }}
      >
        {display}
      </button>

      {open && (
        <div
          className="absolute z-50 top-[calc(100%+6px)] left-0 rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: "#111111",
            border: "1px solid rgba(0,229,255,0.25)",
            minWidth: "130px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.1)",
          }}
        >
          <p
            className="px-3 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "#444" }}
          >
            Pronouns
          </p>
          {PRONOUN_SETS.map((set) => {
            const active = pronouns.label === set.label;
            return (
              <button
                key={set.label}
                onClick={() => { trigger("success"); setPronouns(set); setOpen(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left transition-colors"
                style={{
                  color: active ? "#00E5FF" : "#888888",
                  background: active ? "rgba(0,229,255,0.06)" : "transparent",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: active ? "#00E5FF" : "transparent", border: active ? "none" : "1px solid #444" }}
                />
                {set.label}
              </button>
            );
          })}
          <div className="px-3 pb-2 pt-1">
            <p className="text-[9px]" style={{ color: "#333" }}>
              Changes everywhere on the page
            </p>
          </div>
        </div>
      )}
    </span>
  );
}
