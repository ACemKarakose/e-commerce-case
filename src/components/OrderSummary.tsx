import { useState } from "react";
import type { CartSummary } from "@/store/cartStore";
import { TagIcon, ArrowRightIcon } from "./icons";

interface OrderSummaryProps {
  summary: CartSummary;
  deliveryFee?: number;
  discountPercent?: number;
}

export function OrderSummary({
  summary,
  deliveryFee = 15,
  discountPercent = 20,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");

  const discountAmount = (summary.subtotal * discountPercent) / 100;
  const total = summary.subtotal - discountAmount + deliveryFee;

  return (
    <div className="rounded-3xl border border-border p-5 md:p-6">
      <h2 className="text-xl font-bold text-text-primary md:text-2xl">
        Order Summary
      </h2>

      {/* Summary Lines */}
      <div className="mt-5 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-base text-text-muted md:text-lg">Subtotal</span>
          <span className="text-base font-bold text-text-primary md:text-lg">
            ${summary.subtotal.toFixed(0)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base text-text-muted md:text-lg">
            Discount (-{discountPercent}%)
          </span>
          <span className="text-base font-bold text-discount md:text-lg">
            -${discountAmount.toFixed(0)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base text-text-muted md:text-lg">
            Delivery Fee
          </span>
          <span className="text-base font-bold text-text-primary md:text-lg">
            ${deliveryFee}
          </span>
        </div>

        <div className="border-t border-border pt-5">
          <div className="flex items-center justify-between">
            <span className="text-base text-text-primary md:text-lg">
              Total
            </span>
            <span className="text-xl font-bold text-text-primary md:text-2xl">
              ${total.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            <TagIcon />
          </span>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Add promo code"
            className="w-full rounded-full bg-bg-secondary py-3 pl-12 pr-4 text-sm text-text-secondary placeholder-text-muted focus:outline-none"
          />
        </div>
        <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover">
          Apply
        </button>
      </div>

      {/* Checkout Button */}
      <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-primary py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover">
        Go to Checkout
        <ArrowRightIcon />
      </button>
    </div>
  );
}
