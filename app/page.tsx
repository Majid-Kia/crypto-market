import MarketList from "@/modules/MarketList";
import { fetchMarkets } from "@/lib/api";

export default async function Home() {
  const marekts = await fetchMarkets();

  return (
    <div className="container m-auto">
      {marekts?.length && <MarketList markets={marekts} />}
    </div>
  );
}
