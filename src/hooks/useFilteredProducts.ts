import { useMemo } from "react";
import { useProductStore } from "../stores/productStore";
import { ProductCategory } from "../types";

export function useFilteredProducts(forcedCategory?: ProductCategory) {
  const productStore = useProductStore();
  const activeCategory = forcedCategory ?? productStore.selectedCategory;

  const visibleProducts = useMemo(() => {
    return productStore.products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesPrice = product.price <= productStore.maxPrice;
      const matchesStock = !productStore.inStockOnly || product.inStock;
      const searchValue = productStore.searchTerm.toLowerCase().trim();
      const matchesSearch =
        !searchValue ||
        product.name.toLowerCase().includes(searchValue) ||
        product.tags.some((tag) => tag.includes(searchValue));

      return matchesCategory && matchesPrice && matchesStock && matchesSearch;
    });
  }, [activeCategory, productStore.inStockOnly, productStore.maxPrice, productStore.products, productStore.searchTerm]);

  return {
    visibleProducts,
    isLoading: productStore.isLoading,
  };
}
