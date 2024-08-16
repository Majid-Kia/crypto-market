"use client";

import { useMarketOrders, useMarketTrades } from "@/lib/api";
import { useState } from "react";
import OrderBook from "@/components/OrderBook";
import Tabs from "@/components/Tabs";
import Trades from "@/components/Trades";

export default function MarketDetail({ id }: { id: string }) {
  const [percentage, setPercentage] = useState(0);
  const [tab, setTab] = useState<"buy" | "sell" | "trades">("buy"); // Manage active tab

  const { data: buyOrders = [], isLoading: isLoadingBuyOrders } =
    useMarketOrders(id, "buy");
  const { data: sellOrders = [], isLoading: isLoadingSellOrders } =
    useMarketOrders(id, "sell");
  const { data: trades = [] } = useMarketTrades(id);

  const handleTabChange = (newTab: "buy" | "sell" | "trades") => {
    setTab(newTab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input or numbers only
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setPercentage(Number(value));
    }
  };

  const tabs = [
    {
      label: (
        <button
          onClick={() => handleTabChange("buy")}
          disabled={tab === "buy"}
          className={`sm:px-4 py-2 rounded-lg font-semibold "
          }`}
        >
          سفارشات خرید
        </button>
      ),
      content: (
        <OrderBook
          type="buy"
          orders={buyOrders}
          percentage={percentage}
          isLoading={isLoadingBuyOrders}
        />
      ),
    },
    {
      label: (
        <button
          onClick={() => handleTabChange("sell")}
          disabled={tab === "sell"}
          className={`sm:px-4 py-2 rounded-lg font-semibold`}
        >
          سفارشات فروش
        </button>
      ),
      content: (
        <OrderBook
          type="sell"
          orders={sellOrders}
          percentage={percentage}
          isLoading={isLoadingSellOrders}
        />
      ),
    },
    {
      label: (
        <button
          onClick={() => handleTabChange("trades")}
          disabled={tab === "trades"}
          className={`sm:px-4 py-2 rounded-lg font-semibold `}
        >
          معاملات
        </button>
      ),
      content: <Trades trades={trades} />,
    },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Percentage Input */}
      <div className="flex justify-center items-center mb-6">
        <label className="text-lg font-semibold ml-2 text-primary-text">
          درصد:
        </label>
        <input
          type="text"
          value={percentage}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-lg text-center"
        />
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
