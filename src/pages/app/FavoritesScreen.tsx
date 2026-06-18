import { Heart } from "lucide-react";
import { EmptyState } from "../../components/EmptyState";
import { ProductGrid } from "../../components/product/ProductGrid";
import { useProductStore } from "../../stores/productStore";

export function FavoritesScreen() {
  const favorites = useProductStore((state) => state.favorites);
  const allProducts = useProductStore((state) => state.products);
  const favoriteProducts = allProducts.filter((product) => favorites.includes(product.id));

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-normal">Favorites</h1>
      {favoriteProducts.length ? (
        <ProductGrid products={favoriteProducts} isLoading={false} />
      ) : (
        <EmptyState icon={<Heart />} title="No favorites yet" body="Save products you buy often for faster shopping." actionTo="/search" actionLabel="Browse Products" />
      )}
    </section>
  );
}
