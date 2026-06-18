import { SlidersHorizontal } from "lucide-react";
import { categories } from "../../data/catalog";
import { useProductStore } from "../../stores/productStore";
import { ProductCategory } from "../../types";
import { formatMoney } from "../../utils/money";

export function FilterPanel() {
  const productStore = useProductStore();

  return (
    <section className="sticky top-24 rounded-[2rem] bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <SlidersHorizontal size={20} className="text-leaf-600" aria-hidden="true" />
      </div>
      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-muted">Category</span>
          <select
            value={productStore.selectedCategory}
            onChange={(event) => productStore.setSelectedCategory(event.target.value as ProductCategory | "all")}
            className="mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm font-semibold"
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-muted">Max price: {formatMoney(productStore.maxPrice)}</span>
          <input
            type="range"
            min="2"
            max="15"
            step="1"
            value={productStore.maxPrice}
            onChange={(event) => productStore.setMaxPrice(Number(event.target.value))}
            className="mt-3 w-full accent-leaf-500"
          />
        </label>
        <label className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3 text-sm font-semibold">
          In stock only
          <input
            type="checkbox"
            checked={productStore.inStockOnly}
            onChange={(event) => productStore.setInStockOnly(event.target.checked)}
            className="h-5 w-5 accent-leaf-500"
          />
        </label>
        <button onClick={productStore.clearFilters} className="h-12 w-full rounded-2xl border border-zinc-200 font-semibold text-muted">
          Clear Filters
        </button>
      </div>
    </section>
  );
}
