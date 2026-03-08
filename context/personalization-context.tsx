"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type PronounSet = {
  label: string;
  subject: string;   // she / he / they / ze
  object: string;    // her / him / them / zem
  possessive: string;// her / his / their / zer
  reflexive: string; // herself / himself / themselves / zerself
  verbIs: string;    // "is" for she/he/ze, "are" for they
};

export const PRONOUN_SETS: PronounSet[] = [
  { label: "She/Her",   subject: "she",  object: "her",  possessive: "her",   reflexive: "herself",    verbIs: "is"  },
  { label: "He/Him",    subject: "he",   object: "him",  possessive: "his",   reflexive: "himself",    verbIs: "is"  },
  { label: "They/Them", subject: "they", object: "them", possessive: "their", reflexive: "themselves",  verbIs: "are" },
  { label: "Ze/Zem",    subject: "ze",   object: "zem",  possessive: "zer",   reflexive: "zerself",    verbIs: "is"  },
];

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Replace {she}/{She}, {her}/{Her}, {his}/{His}, {they}/{They}, {name} etc in a template string */
export function subText(template: string, p: PronounSet, name: string): string {
  return template
    .replaceAll("{She}",  cap(p.subject))
    .replaceAll("{she}",  p.subject)
    .replaceAll("{Her}",  cap(p.object))
    .replaceAll("{her}",  p.object)
    .replaceAll("{His}",  cap(p.possessive))
    .replaceAll("{his}",  p.possessive)
    .replaceAll("{Herself}", cap(p.reflexive))
    .replaceAll("{herself}", p.reflexive)
    .replaceAll("{is}",   p.verbIs)
    .replaceAll("{name}", name)
    .replaceAll("{Name}", cap(name));
}

interface PersonalizationContextValue {
  name: string;
  setName: (n: string) => void;
  pronouns: PronounSet;
  setPronouns: (p: PronounSet) => void;
}

const PersonalizationContext = createContext<PersonalizationContextValue>({
  name: "AM",
  setName: () => {},
  pronouns: PRONOUN_SETS[0],
  setPronouns: () => {},
});

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("AM");
  const [pronouns, setPronouns] = useState<PronounSet>(PRONOUN_SETS[0]);
  return (
    <PersonalizationContext.Provider value={{ name, setName, pronouns, setPronouns }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  return useContext(PersonalizationContext);
}
