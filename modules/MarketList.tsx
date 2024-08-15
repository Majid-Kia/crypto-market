"use client";
import React from "react";
import Tabs from "@/components/Tabs";

const MarketList = () => {
  const tabs = [
    {
      label: "تومان",
      content: <div>تومان</div>,
    },
    {
      label: "تتر",
      content: <div>تتر</div>,
    },
  ];
  return (
    <div className="flex">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default MarketList;
