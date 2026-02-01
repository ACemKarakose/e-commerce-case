import { Link } from "react-router-dom";
import type { CartItem as CartItemType } from "@/store/cartStore";
import { TrashIcon, MinusIcon, PlusIcon } from "./icons";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-3 py-4 sm:gap-4 sm:py-5">
      {/* Product Image */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-bg-tertiary sm:h-24 sm:w-24">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-contain object-center"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        {/* Top Row - Name & Delete */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-text-primary sm:text-base">
              <Link to={`/products/${item.id}`} className="hover:underline">
                {item.name}
              </Link>
            </h3>
            <p className="mt-1 text-xs sm:text-sm">
              <span className="text-text-primary">Size:</span>{" "}
              <span className="text-text-muted">{item.size}</span>
            </p>
            <p className="text-xs sm:text-sm">
              <span className="text-text-primary">Color:</span>{" "}
              <span className="text-text-muted">{item.color}</span>
            </p>
          </div>
          {/* Delete Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="-mr-1 p-1 text-discount transition-colors hover:bg-discount/10 hover:opacity-80 rounded-md sm:mr-0 sm:p-0 sm:hover:bg-transparent"
            aria-label="Remove item"
          >
            <TrashIcon />
          </button>
        </div>

        {/* Bottom Row - Price & Quantity */}
        <div className="mt-2 flex items-center justify-between gap-2 sm:mt-auto sm:items-end sm:pt-2">
          <span className="text-lg font-bold text-text-primary sm:text-xl">
            ${item.price.toFixed(0)}
          </span>

          {/* Quantity Controls */}
          <div className="flex h-8 items-center gap-3 rounded-full bg-bg-secondary px-3 sm:h-auto sm:gap-4 sm:px-4 sm:py-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="text-text-primary transition-colors hover:opacity-60 disabled:opacity-40"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <MinusIcon />
            </button>
            <span className="min-w-[12px] text-center text-xs font-medium text-text-primary sm:min-w-[16px] sm:text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="text-text-primary transition-colors hover:opacity-60"
              aria-label="Increase quantity"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
