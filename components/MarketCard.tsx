import { Market } from "@/types/markets";
import Link from "next/link";
import Image from "next/image";

type MarketCardProps = {
  market: Market;
};

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <div className="flex w-full">
      <Link
        href={`/${market.id}`}
        className="flex mb-4 border border-border rounded p-2 w-full items-center"
      >
        <div className="">
          <Image
            src={market.currency1.image}
            alt={`${market.currency1.title} icon`}
            width={45}
            height={45}
          />
        </div>
        <div className="flex mr-4 grow text-primary-text max-sm:flex-col">
          <h3 className="w-full sm:w-1/4 mb-2 sm:mb-0">{market.title}</h3>
          <p className="w-full sm:w-1/4 mb-2 sm:mb-0">قیمت: {market.price}</p>
          <p className="w-full sm:w-1/4">
            کد: {market.currency1.code}/{market.currency2.code}
          </p>
        </div>
      </Link>
    </div>
  );
}
