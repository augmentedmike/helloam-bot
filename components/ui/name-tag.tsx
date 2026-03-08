"use client";

import { useState, useRef, useEffect } from "react";
import { usePersonalization } from "@/context/personalization-context";
import { useWebHaptics } from "web-haptics/react";

interface NameTagProps {
  className?: string;
  style?: React.CSSProperties;
}

export function NameTag({ className, style }: NameTagProps) {
  const { name, setName } = usePersonalization();
  const { trigger } = useWebHaptics();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  // keep draft in sync when name changes externally
  useEffect(() => {
    if (!editing) setDraft(name);
  }, [name, editing]);

  function commit() {
    const trimmed = draft.trim();
    if (trimmed) { trigger("success"); setName(trimmed); }
    else setDraft(name);
    setEditing(false);
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); commit(); }
          if (e.key === "Escape") { setDraft(name); setEditing(false); }
        }}
        className={className}
        style={{
          background: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.5)",
          borderRadius: "6px",
          color: "#00E5FF",
          font: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          padding: "0 6px",
          width: `${Math.max((draft.length || 1) + 1, 3)}ch`,
          outline: "none",
          ...style,
        }}
        maxLength={24}
        aria-label="Rename AM"
      />
    );
  }

  return (
    <button
      onClick={() => { trigger("nudge"); setDraft(name); setEditing(true); }}
      title="Click to rename"
      className={className}
      style={{
        font: "inherit",
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        color: "inherit",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        borderBottom: "1px dashed rgba(0,229,255,0.45)",
        transition: "border-color 0.15s",
        ...style,
      }}
    >
      {name}
    </button>
  );
}
