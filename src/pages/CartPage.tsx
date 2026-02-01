import { useCartStore, selectCartItems } from "@/store";
import { Breadcrumb, CartItemCard, OrderSummary } from "@/components";
import { Link } from "react-router-dom";

const CART_BREADCRUMBS = [{ label: "Home", to: "/" }, { label: "Cart" }];

export function CartPage() {
  const items = useCartStore(selectCartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getSummary = useCartStore((state) => state.getSummary);

  const summary = getSummary();

  return (
    <div className="max-w-full overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumb items={CART_BREADCRUMBS} />

      {/* Page Title */}
      <h1 className="mt-5 text-3xl font-black uppercase tracking-tight text-text-primary md:text-4xl">
        Your Cart
      </h1>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="mt-12 flex flex-col items-center justify-center gap-6 py-16">
          <div className="text-6xl">🛒</div>
          <p className="text-xl text-text-secondary">Your cart is empty</p>
          <Link
            to="/"
            className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-text-white transition-colors hover:bg-primary-hover"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        /* Cart Content */
        <div className="mt-6 flex flex-col gap-5 lg:grid lg:grid-cols-5 lg:gap-6 lg:items-start">
          {/* Cart Items Container - Left Column */}
          <div className="rounded-[20px] border border-border px-4 py-2 sm:rounded-3xl sm:px-5 lg:col-span-3">
            {items.map((item, index) => (
              <div key={item.id}>
                <CartItemCard
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
                {/* Divider between items */}
                {index < items.length - 1 && (
                  <div className="border-t border-border" />
                )}
              </div>
            ))}
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-2">
            <OrderSummary summary={summary} />
          </div>
        </div>
      )}
    </div>
  );
}
