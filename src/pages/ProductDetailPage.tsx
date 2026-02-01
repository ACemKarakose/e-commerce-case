import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetProductById,
  useGetProductsByCategory,
  type Product,
} from "@/api";
import { useCartStore } from "@/store";
import {
  MOCK_REVIEWS,
  getColorsForCategory,
  getSizesForCategory,
} from "@/data";
import {
  ImageGallery,
  StarRating,
  ProductTabs,
  ReviewSection,
  RelatedProducts,
} from "@/components";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0", 10);

  const { data: product, isLoading, error } = useGetProductById(productId);

  const { data: relatedProducts = [] } = useGetProductsByCategory(
    product?.category || "",
    { enabled: !!product?.category },
  );

  const colors = useMemo(
    () => getColorsForCategory(product?.category || ""),
    [product?.category],
  );
  const sizes = useMemo(
    () => getSizesForCategory(product?.category || ""),
    [product?.category],
  );

  const filteredRelated = useMemo(
    () => relatedProducts.filter((p: Product) => p.id !== product?.id),
    [relatedProducts, product?.id],
  );

  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      // eslint-disable-next-line
      setSelectedColor(colors[0].name);
    }
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0].label);
    }
  }, [colors, sizes, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product.id,
      img: product.image,
      name: product.title,
      size: selectedSize || "One Size",
      color: selectedColor || "Default",
      price: product.price,
      discount: 0,
      quantity,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex gap-8">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 w-20 animate-pulse rounded-xl bg-bg-secondary"
                />
              ))}
            </div>
            <div className="h-[450px] w-[400px] animate-pulse rounded-2xl bg-bg-secondary" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-bg-secondary" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-bg-secondary" />
            <div className="h-32 animate-pulse rounded bg-bg-secondary" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-16 text-center">
        <p className="text-discount">
          {(error as Error)?.message || "Product not found"}
        </p>
        <Link
          to="/products"
          className="mt-4 inline-block text-text-primary underline hover:no-underline"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  const originalPrice = product.price * 1.3;
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100,
  );

  return (
    <div className="space-y-4">
      <nav className="text-sm text-text-muted">
        <Link to="/" className="hover:text-text-primary">
          Home
        </Link>
        {" › "}
        <Link to="/products" className="hover:text-text-primary">
          Shop
        </Link>
        {" › "}
        <span className="capitalize text-text-muted">{product.category}</span>
        {" › "}
        <span className="text-text-primary">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ImageGallery
          images={[product.image, product.image, product.image]}
          alt={product.title}
        />

        <div className="flex h-full flex-col">
          <div className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tight text-text-primary">
              {product.title}
            </h1>

            {product.rating && (
              <StarRating
                rating={product.rating.rate}
                count={product.rating.count}
                size="md"
              />
            )}

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-text-primary">
                ${product.price.toFixed(0)}
              </span>
              <span className="text-2xl text-text-muted line-through">
                ${originalPrice.toFixed(0)}
              </span>
              <span className="rounded-full bg-discount/10 px-3 py-1 text-sm font-medium text-discount">
                -{discountPercent}%
              </span>
            </div>

            <p className="text-text-secondary leading-relaxed">
              {product.description}
            </p>

            <hr className="border-border" />

            {colors.length > 0 && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm text-text-muted">Select Colors</h3>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`relative h-9 w-9 rounded-full transition-all ${
                          selectedColor === color.name
                            ? "ring-2 ring-primary ring-offset-2"
                            : ""
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <svg
                            className="absolute inset-0 m-auto h-4 w-4 text-text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <hr className="border-border" />
              </>
            )}

            {sizes.length > 0 && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm text-text-muted">Choose Size</h3>
                  <div className="flex flex-nowrap gap-3 overflow-x-auto scrollbar-hide md:flex-wrap">
                    {sizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setSelectedSize(size.label)}
                        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all md:px-6 md:py-3 ${
                          selectedSize === size.label
                            ? "bg-primary text-text-white"
                            : "bg-bg-secondary text-text-secondary hover:bg-bg-tertiary"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
                <hr className="border-border" />
              </>
            )}
          </div>

          <div className="mt-auto flex gap-4 pt-6">
            <div className="flex items-center rounded-full bg-bg-secondary px-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="py-4 pr-4 text-xl font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="py-4 pl-4 text-xl font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 rounded-full py-4 text-lg font-medium transition-all ${
                addedToCart
                  ? "bg-success text-text-white"
                  : "bg-primary text-text-white hover:bg-primary-hover"
              }`}
            >
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <ProductTabs
        defaultTab="reviews"
        tabs={[
          {
            id: "details",
            label: "Product Details",
            content: (
              <div className="prose max-w-none">
                <p className="text-text-secondary leading-relaxed">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-2 text-text-secondary">
                  <li>
                    Category:{" "}
                    <span className="capitalize">{product.category}</span>
                  </li>
                  <li>Material: Premium Cotton Blend</li>
                  <li>Care: Machine wash cold</li>
                </ul>
              </div>
            ),
          },
          {
            id: "reviews",
            label: "Rating & Reviews",
            content: (
              <ReviewSection reviews={MOCK_REVIEWS} totalReviews={451} />
            ),
          },
          {
            id: "faqs",
            label: "FAQs",
            content: (
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-text-primary">
                    What is the return policy?
                  </h4>
                  <p className="mt-2 text-sm text-text-secondary">
                    We offer a 30-day return policy for all unworn items with
                    original tags.
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-text-primary">
                    How long does shipping take?
                  </h4>
                  <p className="mt-2 text-sm text-text-secondary">
                    Standard shipping takes 5-7 business days. Express shipping
                    is 2-3 days.
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-text-primary">
                    Is this product true to size?
                  </h4>
                  <p className="mt-2 text-sm text-text-secondary">
                    Yes! Our sizing follows standard measurements. Check the
                    size guide for details.
                  </p>
                </div>
              </div>
            ),
          },
        ]}
      />

      <RelatedProducts products={filteredRelated} />
    </div>
  );
}
