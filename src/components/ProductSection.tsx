import { Link } from "react-router-dom";
import { useGetAllProducts, useGetProductsByCategory } from "@/api";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
  title: string;
  category?: string;
  limit?: number;
}

export function ProductSection({
  title,
  category,
  limit = 4,
  useBreakout = false,
}: ProductSectionProps & { useBreakout?: boolean }) {
  const categoryQuery = useGetProductsByCategory(category || "", {
    staleTime: 5 * 60 * 1000,
    enabled: !!category,
  });

  const allQuery = useGetAllProducts(
    {
      // If we are sorting, we fetch all to ensure we get the correct top items
      // because fakestoreapi applies limit BEFORE sort.
      limit: undefined,
      sort: "desc", // Default to desc for now if "New Arrivals", or we can make it a prop
    },
    { staleTime: 5 * 60 * 1000, enabled: !category },
  );

  const isLoading = category ? categoryQuery.isLoading : allQuery.isLoading;
  const sourceData = category ? categoryQuery.data : allQuery.data;

  // Slice locally to ensure we respect limit after potential sorting
  const products = sourceData?.slice(0, limit);

  const content = (
    <>
      {/* Title */}
      <h2 className="font-integral-cf text-[32px] md:text-[48px] font-black text-center text-black mb-8 md:mb-12">
        {title}
      </h2>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 animate-pulse rounded-2xl bg-bg-secondary"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products?.map((product, index) => (
            <div
              key={product.id}
              className={index >= 2 ? "hidden lg:block" : ""}
            >
              <ProductCard
                product={product}
                showDiscount={index % 2 === 1}
                originalPrice={
                  index % 2 === 1 ? Math.round(product.price * 1.2) : undefined
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="flex justify-center mt-8 md:mt-10">
        <Link
          to={
            category
              ? `/products?category=${encodeURIComponent(category)}`
              : "/products"
          }
          className="w-full lg:w-auto text-center px-16 py-3 border border-black/10 rounded-full font-medium text-sm text-black hover:bg-black hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-black/10" />
    </>
  );

  if (useBreakout) {
    return (
      <section className="py-10 w-screen relative left-[50%] -translate-x-[50%]">
        <div className="max-w-[1640px] mx-auto px-4 lg:px-8">{content}</div>
      </section>
    );
  }

  return <section className="py-10">{content}</section>;
}
