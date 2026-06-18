import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { useProductStore } from "../../stores/productStore";
import { Product } from "../../types";
import { formatMoney } from "../../utils/money";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const favorites = useProductStore((state) => state.favorites);
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);

  return (
    <article className="group rounded-[2rem] bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft sm:p-4">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="h-32 w-full rounded-3xl object-cover sm:h-40" />
        </Link>
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-rose-500"
          aria-label={`Favorite ${product.name}`}
        >
          <Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="mt-4 min-h-11 text-sm font-bold leading-snug sm:text-base">{product.name}</h3>
      </Link>
      <p className="mt-1 text-xs font-medium text-muted">{product.unit}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-base font-bold">{formatMoney(product.price)}</span>
        <button
          onClick={() => addItem(product.id)}
          disabled={!product.inStock}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf-500 text-white transition hover:bg-leaf-600 disabled:bg-zinc-300"
          aria-label={`Add ${product.name}`}
        >
          <Plus size={20} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
