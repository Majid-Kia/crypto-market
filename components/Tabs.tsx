import React, { useState, ReactNode } from "react";
import { useSwipeable } from "react-swipeable";

interface Tab {
  label: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const handleSwipeLeft = () => {
    if (activeTab < tabs.length - 1) {
      onTabChange(activeTab + 1);
    }
  };

  const handleSwipeRight = () => {
    if (activeTab > 0) {
      onTabChange(activeTab - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  return (
    <div {...swipeHandlers} className="w-full" style={{ touchAction: "pan-y" }}>
      <div className="flex border-b border-border">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className={`cursor-pointer px-2 sm:px-4 py-2 transition-colors duration-300 border-b-2 border-transparent ${
              activeTab === index
                ? "!border-accent-color text-accent-color"
                : "text-secondary-text hover:text-accent-color"
            }`}
            onClick={() => onTabChange(index)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div key={activeTab} className="py-4 text-primary-text w-full">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
