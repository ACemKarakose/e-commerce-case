import { Link } from "react-router-dom";
import { StarRating } from "./StarRating";
import type { Product } from "@/api";

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
  originalPrice?: number;
}

export function ProductCard({
  product,
  showDiscount = false,
  originalPrice,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block overflow-hidden rounded-2xl bg-bg-tertiary transition-all hover:shadow-lg cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="space-y-2 bg-bg-primary p-4">
        <h3 className="line-clamp-1 font-medium text-text-primary group-hover:text-text-secondary">
          {product.title}
        </h3>

        {product.rating && (
          <StarRating
            rating={product.rating.rate}
            count={product.rating.count}
            size="sm"
            countClassName="hidden sm:inline-block"
          />
        )}

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-text-primary">
            ${product.price.toFixed(0)}
          </span>
          {showDiscount && originalPrice && (
            <>
              <span className="text-sm text-text-muted line-through">
                ${originalPrice.toFixed(0)}
              </span>
              <span className="rounded-full bg-discount/10 px-2 py-0.5 text-xs font-medium text-discount">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
