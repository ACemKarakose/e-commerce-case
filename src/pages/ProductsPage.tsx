import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllProducts, useGetProductsByCategory } from "@/api";
import {
  ProductCard,
  FilterSidebar,
  MobileFilterDrawer,
  FilterIcon,
  Breadcrumb,
  SortDropdown,
} from "@/components";
import { useFilterStore } from "@/store";

const SORT_OPTIONS = [
  { label: "Most Popular", value: "" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const {
    data: allProducts,
    isLoading: allLoading,
    error: allError,
  } = useGetAllProducts(
    { sort: sortOrder || undefined },
    { enabled: !selectedCategory },
  );

  const {
    data: categoryProducts,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetProductsByCategory(selectedCategory, {
    enabled: !!selectedCategory,
  });

  const { priceRange } = useFilterStore();

  const rawProducts = selectedCategory ? categoryProducts : allProducts;

  // Filter by price range
  const filteredProducts = rawProducts?.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1],
  );

  // Sort by price (client-side since API sort is by ID)
  const sortedProducts = filteredProducts?.slice().sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const products = sortedProducts;
  const isLoading = selectedCategory ? categoryLoading : allLoading;
  const error = (selectedCategory ? categoryError : allError) as Error | null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: selectedCategory || "All Products" },
        ]}
      />

      <div className="flex gap-6 items-start">
        {/* Desktop Sidebar (Hidden on Mobile) */}
        <div className="hidden w-[295px] shrink-0 lg:block">
          <FilterSidebar />
        </div>

        {/* Products Grid Area */}
        <div className="flex-1">
          {/* Grid Header: Title, Sort, Stats */}
          <div className="flex items-center justify-between mb-6 gap-4">
            {/* Title */}
            <h1 className="text-2xl font-bold text-text-primary capitalize truncate flex-1 min-w-0">
              {selectedCategory || "All Products"}
            </h1>

            {/* Right Side: Stats, Sort, Filter Trigger */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Stats (Desktop Only) */}
              <p className="text-text-secondary text-sm hidden sm:block">
                Showing 1-10 of {products?.length || 100} Products
              </p>

              {/* Sort (Desktop Only) */}
              <div className="hidden sm:flex items-center gap-2">
                <SortDropdown
                  options={SORT_OPTIONS}
                  value={sortOrder}
                  onChange={(value) =>
                    setSortOrder(value as "asc" | "desc" | "")
                  }
                  variant="minimal"
                />
              </div>

              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-secondary text-text-primary lg:hidden"
              >
                <FilterIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="rounded-lg bg-discount/10 p-4 text-discount mb-6">
              <p>Error loading products: {error.message}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-[20px] bg-bg-tertiary"
                />
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && products?.length === 0 && (
            <div className="py-12 text-center text-text-muted">
              <p>No products found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
      />
    </div>
  );
}
