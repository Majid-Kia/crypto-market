import React from "react";
import MarketDetail from "@/modules/MarketDetail";

export default function MarketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <MarketDetail id={params.id} />
    </div>
  );
}
