import Decimal from "decimal.js";
import { Order } from "@/types/order";

// Utility to safely convert a string to a Decimal and default to 0 if invalid
const safeDecimal = (value: string) => {
  try {
    const decimalValue = new Decimal(value);
    return decimalValue.isFinite() ? decimalValue : new Decimal(0);
  } catch {
    return new Decimal(0);
  }
};

export const calculateAmount = (orders: Order[], percentage: number) => {
  // Calculate the total remaining amount from the orders
  const totalRemainingAmount = orders.reduce((sum, order) => {
    return sum.plus(safeDecimal(order.remain));
  }, new Decimal(0));

  // Calculate the selected amount based on the input percentage
  const selectedAmount = totalRemainingAmount.times(percentage / 100);

  // Early exit if the selected amount is zero
  if (selectedAmount.isZero()) {
    return {
      amount: "0.00",
      averagePrice: "0.00",
      totalPayable: "0.00",
    };
  }

  let accumulatedRemain = new Decimal(0);
  let weightedPriceSum = new Decimal(0);
  let totalPayable = new Decimal(0);

  for (const order of orders) {
    const remain = safeDecimal(order.remain);
    const price = safeDecimal(order.price);

    const newAccumulatedRemain = accumulatedRemain.plus(remain);

    if (newAccumulatedRemain.greaterThanOrEqualTo(selectedAmount)) {
      // If the current order satisfies the selected amount, take only the remaining portion
      const remainingPart = selectedAmount.minus(accumulatedRemain);
      weightedPriceSum = weightedPriceSum.plus(price.times(remainingPart));
      totalPayable = totalPayable.plus(price.times(remainingPart));
      break;
    }

    // Accumulate the full order amount
    accumulatedRemain = newAccumulatedRemain;
    weightedPriceSum = weightedPriceSum.plus(price.times(remain));
    totalPayable = totalPayable.plus(price.times(remain));
  }

  // Calculate the weighted average price
  const averagePrice = weightedPriceSum.div(selectedAmount);

  // Format the amount value based on its magnitude
  const formattedAmount = selectedAmount.greaterThanOrEqualTo(1)
    ? selectedAmount.toFixed(2) // Use 2 decimal places for values >= 1
    : selectedAmount.toFixed(8); // Use 8 decimal places for smaller values

  return {
    amount: formattedAmount, // Total currency amount
    averagePrice: averagePrice.isFinite() // Check for valid division result
      ? averagePrice.toFixed(2)
      : "0.00", // Handle division by zero
    totalPayable: totalPayable.toFixed(2), // Total payable amount
  };
};
