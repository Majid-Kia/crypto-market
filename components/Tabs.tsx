"use client";

import { useState, ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className="flex border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 transition-colors duration-300 border-b-2 border-transparent ${
              activeTab === index
                ? "!border-accent-color text-accent-color"
                : "text-secondary-text hover:text-accent-color"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-4 text-primary-text">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
