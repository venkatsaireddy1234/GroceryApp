import { Search } from "lucide-react";
import { EmptyState } from "../EmptyState";
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-[2rem] bg-white p-4 shadow-sm">
            <div className="h-32 rounded-3xl bg-zinc-100" />
            <div className="mt-5 h-4 rounded bg-zinc-100" />
            <div className="mt-3 h-4 w-2/3 rounded bg-zinc-100" />
            <div className="mt-8 h-12 rounded-2xl bg-zinc-100" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return <EmptyState icon={<Search />} title="No products found" body="Adjust search or filters to see more groceries." actionTo="/search" actionLabel="Reset Search" />;
  }

  return (
    <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
