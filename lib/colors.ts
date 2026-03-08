export type ColorId = "red" | "pink" | "purple" | "orange" | "blue" | "white" | "black";

export interface AMColor {
  id: ColorId;
  label: string;
  hex: string;
  available: boolean;
  signature?: boolean;
  img: string;
}

export const COLORS: AMColor[] = [
  { id: "red",    label: "Red",    hex: "#CC2200", available: true,  signature: true, img: "/am/am-desk.jpg" },
  { id: "pink",   label: "Pink",   hex: "#E8006A", available: true,                   img: "/am/am-desk-pink.png" },
  { id: "purple", label: "Purple", hex: "#7C3099", available: true,                   img: "/am/am-desk-purple.png" },
  { id: "orange", label: "Orange", hex: "#E86010", available: true,                   img: "/am/am-desk-orange.png" },
  { id: "blue",   label: "Blue",   hex: "#1B3254", available: true,                   img: "/am/am-desk-blue.png" },
  { id: "white",  label: "White",  hex: "#f0efeb", available: true,                   img: "/am/am-desk-white.png" },
  { id: "black",  label: "Black",  hex: "#1a1a1a", available: true,                   img: "/am/am-desk-black.png" },
];
