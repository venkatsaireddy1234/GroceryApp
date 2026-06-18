import { Link } from "react-router-dom";
import { Product } from "../../types";
import { formatMoney } from "../../utils/money";

interface ProductMiniProps {
  product: Product;
}

export function ProductMini({ product }: ProductMiniProps) {
  return (
    <Link to={`/product/${product.id}`} className="rounded-3xl bg-cream p-3 transition hover:bg-leaf-50">
      <img src={product.image} alt="" className="h-20 w-full rounded-2xl object-cover" />
      <h3 className="mt-2 truncate text-sm font-bold">{product.name}</h3>
      <p className="text-xs font-semibold text-leaf-600">{formatMoney(product.price)}</p>
    </Link>
  );
}
