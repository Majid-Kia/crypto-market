import { Moon, Sun } from "../icons";

export const themes: { name: "light" | "dark"; icon: React.ComponentType }[] = [
  {
    name: "light",
    icon: Sun,
  },
  {
    name: "dark",
    icon: Moon,
  },
];
