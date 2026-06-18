import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterSheetButton } from "../../components/filters/FilterSheetButton";
import { DesktopFilterLayout } from "../../components/filters/DesktopFilterLayout";
import { ProductGrid } from "../../components/product/ProductGrid";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { useProductStore } from "../../stores/productStore";
import { useDebouncedValue } from "../../utils/useDebouncedValue";

export function SearchScreen() {
  const searchTerm = useProductStore((state) => state.searchTerm);
  const setSearchTerm = useProductStore((state) => state.setSearchTerm);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const debouncedSearch = useDebouncedValue(localSearch);
  const { visibleProducts, isLoading } = useFilteredProducts();

  useEffect(() => {
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm]);

  return (
    <DesktopFilterLayout>
      <section>
        <h1 className="text-3xl font-semibold tracking-normal">Find groceries</h1>
        <div className="mt-5 flex h-14 items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
          <Search size={20} className="text-muted" aria-hidden="true" />
          <input
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
            placeholder="Search store"
            className="h-full min-w-0 flex-1 bg-transparent text-base font-medium"
          />
          <FilterSheetButton />
        </div>
        <ProductGrid products={visibleProducts} isLoading={isLoading} />
      </section>
    </DesktopFilterLayout>
  );
}
