"use client";
import { themes } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";

    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      document.body.classList.add("light");
    }
  }, []);

  const toggleTheme = (themeName: "light" | "dark") => {
    setTheme(themeName);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(themeName);
    localStorage.setItem("theme", themeName);
  };

  return (
    <div className="border rounded-full flex w-[80px] justify-between px-1 h-full items-center">
      {themes.map((themeItem) => {
        const IconComponent = themeItem.icon;
        return (
          <button
            key={themeItem.name}
            onClick={() => toggleTheme(themeItem.name)}
            className={`p-1 rounded-full h-7 w-7 text-secondary-text hover:bg-primary-text  flex items-center justify-center focus:outline-none ${
              theme === themeItem.name ? "bg-border  text-secondary-text" : ""
            }`}
          >
            <IconComponent />
          </button>
        );
      })}
    </div>
  );
}
