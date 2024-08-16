"use client";
import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import MarketCard from "@/components/MarketCard";
import Pagination from "@/components/Pagination";
import { Market } from "@/types/markets";

type PropTypes = {
  markets: Market[];
};
const MarketList = ({ markets }: PropTypes) => {
  const [tab, setTab] = useState<"IRT" | "USDT">("IRT");
  const [irtPage, setIrtPage] = useState(1); // Pagination for IRT tab
  const [usdtPage, setUsdtPage] = useState(1); // Pagination for USDT tab

  const itemsPerPage = 10;
  const tabIndex = tab === "IRT" ? 0 : 1;

  // Filter markets based on the selected tab
  const filteredMarkets = markets.filter(
    (market) => market.currency2.code === tab
  );

  // Get the correct current page based on the selected tab
  const currentPage = tab === "IRT" ? irtPage : usdtPage;

  // Paginate the markets for the selected tab
  const paginatedMarkets = filteredMarkets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle tab change
  const handleTabChange = (newTabIndex: number) => {
    const newTab = newTabIndex === 0 ? "IRT" : "USDT";
    setTab(newTab);
  };
  // Function to handle page changes, updating the correct page state based on the current tab
  const handlePageChange = (page: number) => {
    if (tab === "IRT") {
      setIrtPage(page);
    } else {
      setUsdtPage(page);
    }
  };

  const tabs = [
    {
      label: <span onClick={() => handleTabChange(0)}>تومان</span>,
      content: (
        <ul className=" w-full">
          {paginatedMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </ul>
      ),
    },
    {
      label: <span onClick={() => handleTabChange(1)}>تتر</span>,
      content: (
        <ul className=" w-full">
          {paginatedMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Tabs tabs={tabs} onTabChange={handleTabChange} activeTab={tabIndex} />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredMarkets.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MarketList;
