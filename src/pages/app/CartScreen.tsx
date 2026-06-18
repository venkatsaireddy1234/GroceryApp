import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState";
import { QuantityStepper } from "../../components/QuantityStepper";
import { SummaryRow } from "../../components/SummaryRow";
import { useCartStore } from "../../stores/cartStore";
import { useProductStore } from "../../stores/productStore";
import { OrderStatus, Product } from "../../types";
import { formatMoney } from "../../utils/money";

export function CartScreen() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const checkout = useCartStore((state) => state.checkout);
  const allProducts = useProductStore((state) => state.products);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const rows = cartItems
    .map((item) => {
      const product = allProducts.find((entry) => entry.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((row): row is { product: Product; quantity: number } => Boolean(row));
  const subtotal = rows.reduce((total, row) => total + row.product.price * row.quantity, 0);
  const delivery = rows.length ? 2.99 : 0;
  const total = subtotal + delivery;

  async function handleCheckout(shouldFail = false) {
    setIsCheckingOut(true);
    const status = await checkout(shouldFail);
    setIsCheckingOut(false);
    navigate(status === OrderStatus.Success ? "/checkout/success" : "/checkout/failure");
  }

  if (!rows.length) {
    return <EmptyState icon={<ShoppingCart />} title="Your cart is empty" body="Add fresh products to build your basket." actionTo="/search" actionLabel="Shop Now" />;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">My Cart</h1>
        <div className="mt-5 divide-y divide-zinc-100 overflow-hidden rounded-[2rem] bg-white shadow-soft">
          {rows.map(({ product, quantity }) => (
            <article key={product.id} className="flex gap-4 p-4 sm:p-5">
              <img src={product.image} alt="" className="h-24 w-24 rounded-3xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold">{product.name}</h2>
                    <p className="mt-1 text-sm text-muted">{product.unit}</p>
                  </div>
                  <button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`} className="text-muted">
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <QuantityStepper quantity={quantity} onMinus={() => decrementItem(product.id)} onPlus={() => addItem(product.id)} />
                  <span className="font-bold">{formatMoney(product.price * quantity)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <aside className="rounded-[2rem] bg-white p-5 shadow-soft lg:sticky lg:top-24">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
        <SummaryRow label="Delivery" value={formatMoney(delivery)} />
        <SummaryRow label="Total" value={formatMoney(total)} strong />
        <button
          onClick={() => void handleCheckout(false)}
          disabled={isCheckingOut}
          className="mt-6 h-14 w-full rounded-2xl bg-leaf-500 font-bold text-white transition hover:bg-leaf-600 disabled:bg-zinc-300"
        >
          {isCheckingOut ? "Processing..." : "Place Order"}
        </button>
        <button
          onClick={() => void handleCheckout(true)}
          disabled={isCheckingOut}
          className="mt-3 h-12 w-full rounded-2xl border border-zinc-200 font-semibold text-muted transition hover:border-rose-200 hover:text-rose-600"
        >
          Simulate Failure
        </button>
      </aside>
    </section>
  );
}
