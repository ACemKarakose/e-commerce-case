import { ProductCard } from "./ProductCard";
import type { Product } from "@/api";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "You Might Also Like",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="space-y-8 mt-20">
      <h2 className="text-center text-3xl font-black uppercase tracking-tight text-text-primary">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={product.id % 2 === 0}
            originalPrice={product.price * 1.2}
          />
        ))}
      </div>
    </section>
  );
}
