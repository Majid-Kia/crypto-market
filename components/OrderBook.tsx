import { calculateAmount } from "@/lib/decimalUtils";
import { Order } from "@/types/order";

type PropTypes = {
  orders: Order[];
  type: "buy" | "sell";
  percentage: number;
  isLoading: boolean;
};

export default function OrderBook({
  orders,
  type,
  percentage,
  isLoading,
}: PropTypes) {
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!orders.length) return <p>هیچ سفارشی وجود ندارد.</p>;

  // Calculate the results based on the input percentage.
  const result = calculateAmount(orders, percentage);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">
        سفارشات {type === "buy" ? "خرید" : "فروش"}
      </h2>
      {/* Calculated result based on the percentage */}
      <div className="mt-6 mb-6 p-4 bg-border flex-col rounded-lg shadow text-primary-text flex ">
        <p className="mb-2">
          حجم قابل دریافت:
          <span className="font-semibold">{result.amount}</span>
        </p>
        <p className="mb-2">
          میانگین قیمت:
          <span className="font-semibold">{result.averagePrice}</span>
        </p>
        <p className="mb-2">
          مجموع مبلغ قابل پرداخت:
          <span className="font-semibold">{result.totalPayable}</span>
        </p>
      </div>

      <ul className="space-y-2">
        {orders.map((order, index) => (
          <li
            key={index}
            className="border border-border p-3 rounded-lg shadow-sm text-primary-text flex justify-between"
          >
            <div className="flex w-full flex-wrap">
              <p className="w-full sm:w-1/3 mb-1 sm:mb-0">
                قیمت: {order.price}
              </p>
              <p className="w-full sm:w-1/3 mb-1 sm:mb-0">
                حجم باقی‌مانده: {order.remain}
              </p>
              <p className="font-bold text-right w-full sm:w-1/3">
                ارزش: {(order.remain * order.price).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
