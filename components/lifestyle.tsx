"use client";

import Image from "next/image";
import { usePersonalization } from "@/context/personalization-context";

export default function Lifestyle() {
  const { pronouns, name } = usePersonalization();
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const scenes = [
    {
      src: "/am/am-desk.jpg",
      alt: `${name} on a professional night desk setup — red Mac Mini glowing beside the laptop`,
      label: "The Professional",
      caption: "Always prepped. Never behind.",
    },
    {
      src: "/am/am-student.jpg",
      alt: `${name} in a student dorm — red Mac Mini running beside notes and textbooks`,
      label: "The Student",
      caption: `${cap(pronouns.subject)} reads what you don't have time to.`,
    },
    {
      src: "/am/am-room-wide.jpg",
      alt: `${name} in a cozy bedroom — red Mac Mini always on, city lights outside`,
      label: "At Home",
      caption: `${cap(pronouns.subject)}'s there when life gets quiet.`,
    },
  ];

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: "#00E5FF" }}
        >
          {cap(pronouns.subject)} lives where you live
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Whatever your world looks like,
          <br />
          <span style={{ color: "#00E5FF" }}>{pronouns.subject} fits in it.</span>
        </h2>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenes.map((scene) => (
          <div
            key={scene.label}
            className="group relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={scene.src}
              alt={scene.alt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)",
              }}
            />
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ color: "#00E5FF" }}
              >
                {scene.label}
              </p>
              <p className="text-white font-semibold text-lg leading-tight">
                {scene.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
