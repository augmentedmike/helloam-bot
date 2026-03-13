export type ColorId = "am-red" | "blue" | "pink" | "purple" | "black" | "white";

export interface AMColor {
  id: ColorId;
  label: string;
  hex: string;
  available: boolean;
  signature?: boolean;
  img: string;
}

export const COLORS: AMColor[] = [
  { id: "am-red", label: "Am Red",  hex: "#CC2200", available: true,  signature: true, img: "/am/am-desk.webp" },
  { id: "blue",   label: "Blue",    hex: "#1B3254", available: true,                   img: "/am/am-desk-blue.webp" },
  { id: "pink",   label: "Pink",    hex: "#E8006A", available: true,                   img: "/am/am-desk-pink.webp" },
  { id: "purple", label: "Purple",  hex: "#7C3099", available: true,                   img: "/am/am-desk-purple.webp" },
  { id: "black",  label: "Black",   hex: "#141414", available: true,                   img: "/am/am-desk-black.webp" },
  { id: "white",  label: "White",   hex: "#F0EFEB", available: true,                   img: "/am/am-desk-white.webp" },
];
