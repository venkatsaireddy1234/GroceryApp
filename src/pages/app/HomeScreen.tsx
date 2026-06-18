import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "../../components/SectionHeading";
import { ProductGrid } from "../../components/product/ProductGrid";
import { ProductMini } from "../../components/product/ProductMini";
import { categories, products as seedProducts } from "../../data/catalog";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";

export function HomeScreen() {
  const { visibleProducts, isLoading } = useFilteredProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(83,177,117,0.95),rgba(47,117,73,0.95)),url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center p-6 text-white shadow-soft lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/75">Delivery in 20 minutes</p>
          <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl lg:text-5xl">
            Fresh groceries for every table
          </h1>
          <Link
            to="/search"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-bold text-leaf-700 transition hover:bg-leaf-50"
          >
            <Search size={18} aria-hidden="true" />
            Start Shopping
          </Link>
        </div>
        <div className="rounded-[2rem] bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold">Today Specials</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {seedProducts.slice(0, 4).map((product) => (
              <ProductMini key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="mt-8">
        <SectionHeading title="Shop by Category" to="/search" />
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className={`min-h-40 rounded-3xl border p-4 transition hover:-translate-y-0.5 hover:shadow-soft ${category.color}`}
            >
              <img src={category.image} alt="" className="h-20 w-full rounded-2xl object-cover" />
              <h3 className="mt-4 text-sm font-bold leading-tight">{category.label}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-8">
        <SectionHeading title="Best Selling" to="/search" />
        <ProductGrid products={visibleProducts.slice(0, 8)} isLoading={isLoading} />
      </section>
    </div>
  );
}
