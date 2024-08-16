import { Trade } from "@/types/trades";
import React from "react";

type PropTypes = {
  trades: Trade[];
};
const Trades = ({ trades }: PropTypes) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">معاملات</h2>
      <ul className="space-y-2">
        {trades.slice(0, 10).map((trade, index) => (
          <li
            key={index}
            className="border border-border text-primary-text p-3 rounded-lg shadow-sm "
          >
            <div className="flex w-full flex-wrap">
              <p className="w-full sm:w-1/3 mb-1 sm:mb-0">
                قیمت: {trade.price}
              </p>
              <p className="w-full sm:w-1/3 mb-1 sm:mb-0">
                مقدار: {trade.match_amount}
              </p>
              <p className="w-full sm:w-1/3">
                زمان: {new Date(trade.time).toLocaleTimeString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trades;
