"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { ColorId } from "@/lib/colors";

interface ColorContextValue {
  selectedColor: ColorId;
  setSelectedColor: (id: ColorId) => void;
}

const ColorContext = createContext<ColorContextValue>({
  selectedColor: "red",
  setSelectedColor: () => {},
});

export function ColorProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<ColorId>("red");
  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  return useContext(ColorContext);
}
