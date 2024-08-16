import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MarketListApi } from "@/types/markets";
import { Order } from "@/types/order";
import { Trade } from "@/types/trades";

const apiClient = axios.create({
  baseURL: "https://api.bitpin.org",
  timeout: 5000,
});

// Centralized error handling for API requests
const handleApiError = (error: any) => {
  console.error("API request failed", error);
  throw new Error(
    "An error occurred while fetching data. Please try again later."
  );
};

// Fetch market data
export const fetchMarkets = async () => {
  try {
    const { data } = await apiClient.get<MarketListApi>("/v1/mkt/markets/");
    return data.results;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

// Fetch buy/sell orders for a specific market
const fetchMarketOrders = async (marketId: string, type: "buy" | "sell") => {
  try {
    const { data } = await apiClient.get<{ orders: Order[] }>(
      `/v2/mth/actives/${marketId}/`,
      {
        params: { type },
      }
    );
    return data.orders.slice(0, 10); // Limit to 10 orders
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch trades for a specific market
const fetchMarketTrades = async (marketId: string) => {
  try {
    const { data } = await apiClient.get<Trade[]>(
      `/v1/mth/matches/${marketId}/`
    );
    return data.slice(0, 10); // Limit to 10 trades
  } catch (error) {
    handleApiError(error);
  }
};

// Custom hooks to fetch data using react-query
export const useMarkets = () => {
  return useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};

export const useMarketOrders = (marketId: string, type: "buy" | "sell") => {
  return useQuery({
    queryKey: ["marketOrders", marketId, type],
    queryFn: () => fetchMarketOrders(marketId, type),
    refetchInterval: 3000, // Refetch every 3 seconds
    enabled: !!marketId && !!type, // Only refetch if marketId and type are defined
  });
};

export const useMarketTrades = (marketId: string) => {
  return useQuery({
    queryKey: ["marketTrades", marketId],
    queryFn: () => fetchMarketTrades(marketId),
    refetchInterval: 3000, // Refetch every 3 seconds
    enabled: !!marketId, // Only refetch if marketId is defined
  });
};
