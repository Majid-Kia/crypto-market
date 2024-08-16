import React from "react";
import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
  return (
    <div className="px-6 py-1 h-11 flex justify-end sticky top-0">
      <ThemeToggle />
    </div>
  );
};
