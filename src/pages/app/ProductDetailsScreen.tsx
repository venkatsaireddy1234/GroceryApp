import { CircleAlert, Heart, Plus, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { BackLink } from "../../components/BackLink";
import { EmptyState } from "../../components/EmptyState";
import { categoryNames } from "../../constants/categoryNames";
import { useCartStore } from "../../stores/cartStore";
import { useProductStore } from "../../stores/productStore";
import { formatMoney } from "../../utils/money";

export function ProductDetailsScreen() {
  const { productId } = useParams();
  const product = useProductStore((state) => state.products.find((item) => item.id === productId));
  const favorites = useProductStore((state) => state.favorites);
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return <EmptyState icon={<CircleAlert />} title="Product not found" body="This item is no longer available." actionTo="/home" actionLabel="Back Home" />;
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
      <div>
        <BackLink />
        <div className="mt-4 overflow-hidden rounded-[2rem] bg-white shadow-soft">
          <img src={product.image} alt={product.name} className="h-80 w-full object-cover lg:h-[520px]" />
        </div>
      </div>
      <div className="rounded-[2rem] bg-white p-5 shadow-soft lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-leaf-600">{categoryNames.get(product.category)}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal lg:text-5xl">{product.name}</h1>
            <p className="mt-2 text-muted">{product.unit}</p>
          </div>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-rose-500"
            aria-label="Toggle favorite"
          >
            <Heart size={22} fill={favorites.includes(product.id) ? "currentColor" : "none"} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-500">
          <Star size={18} fill="currentColor" aria-hidden="true" />
          {product.rating}
          <span className="font-medium text-muted">from {product.origin}</span>
        </div>
        <p className="mt-6 text-base leading-7 text-muted">{product.description}</p>
        <div className="mt-6 border-t border-zinc-100 pt-6">
          <h2 className="text-lg font-semibold">Nutrition</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.nutrition.map((item) => (
              <span key={item} className="rounded-full bg-leaf-50 px-3 py-2 text-sm font-semibold text-leaf-700">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-3xl font-bold">{formatMoney(product.price)}</span>
          <button
            onClick={() => addItem(product.id)}
            disabled={!product.inStock}
            className="inline-flex h-14 items-center gap-2 rounded-2xl bg-leaf-500 px-6 font-bold text-white transition hover:bg-leaf-600 disabled:bg-zinc-300"
          >
            <Plus size={19} aria-hidden="true" />
            {product.inStock ? "Add To Basket" : "Out of Stock"}
          </button>
        </div>
      </div>
    </section>
  );
}
