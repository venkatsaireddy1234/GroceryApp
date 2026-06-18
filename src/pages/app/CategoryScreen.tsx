import { CircleAlert } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BackLink } from "../../components/BackLink";
import { EmptyState } from "../../components/EmptyState";
import { DesktopFilterLayout } from "../../components/filters/DesktopFilterLayout";
import { ProductGrid } from "../../components/product/ProductGrid";
import { categories } from "../../data/catalog";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { useProductStore } from "../../stores/productStore";

export function CategoryScreen() {
  const { categoryId } = useParams();
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);
  const category = categories.find((item) => item.id === categoryId);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.id);
    }
  }, [category, setSelectedCategory]);

  const { visibleProducts, isLoading } = useFilteredProducts(category?.id);

  if (!category) {
    return <EmptyState icon={<CircleAlert />} title="Category not found" body="Try another grocery aisle." actionTo="/home" actionLabel="Go Home" />;
  }

  return (
    <DesktopFilterLayout>
      <div>
        <BackLink />
        <div className={`mt-4 rounded-[2rem] border p-5 ${category.color}`}>
          <img src={category.image} alt="" className="h-36 w-full rounded-3xl object-cover md:h-52" />
          <h1 className="mt-5 text-3xl font-semibold tracking-normal">{category.label}</h1>
          <p className="mt-2 text-muted">{visibleProducts.length} curated items for quick delivery.</p>
        </div>
        <ProductGrid products={visibleProducts} isLoading={isLoading} />
      </div>
    </DesktopFilterLayout>
  );
}
