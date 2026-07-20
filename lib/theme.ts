import type { Status } from "./types";

export const THEME: Record<Status, { name: string; sub: string; hue: string; glow: string }> = {
  backlog: { name: "The Abyss", sub: "the forgotten", hue: "#8a5a48", glow: "rgba(120,60,40,.5)" },
  todo: { name: "The Damned", sub: "awaiting torment", hue: "#c86a3a", glow: "rgba(230,110,50,.45)" },
  in_progress: { name: "In The Flames", sub: "burning now", hue: "#ff6a2a", glow: "rgba(255,90,20,.6)" },
  done: { name: "Consumed", sub: "ashes remain", hue: "#d64530", glow: "rgba(210,50,30,.5)" },
};
