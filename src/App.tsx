import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Filter,
  Heart,
  Home,
  LayoutGrid,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  UserRound,
  X,
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Navigate, Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { categories, products as seedProducts } from "./data/catalog";
import { useAuthStore } from "./stores/authStore";
import { useCartStore } from "./stores/cartStore";
import { useProductStore } from "./stores/productStore";
import { OrderStatus, Product, ProductCategory, User } from "./types";
import { formatMoney } from "./utils/money";
import { useDebouncedValue } from "./utils/useDebouncedValue";

const categoryNames = new Map(categories.map((category) => [category.id, category.label]));

function App() {
  const loadProducts = useProductStore((state) => state.loadProducts);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/verify" element={<OtpScreen />} />
      <Route path="/location" element={<LocationScreen />} />
      <Route element={<AppShell />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/category/:categoryId" element={<CategoryScreen />} />
        <Route path="/product/:productId" element={<ProductDetailsScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/checkout/success" element={<OrderResultScreen status={OrderStatus.Success} />} />
        <Route path="/checkout/failure" element={<OrderResultScreen status={OrderStatus.Failed} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => navigate("/welcome"), 900);
    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <main className="grid min-h-screen place-items-center bg-leaf-500 px-6 text-white">
      <section className="text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-white/15 shadow-soft">
          <ShoppingBag size={46} aria-hidden="true" />
        </div>
        <h1 className="mt-7 text-4xl font-bold tracking-normal">Grocer</h1>
        <p className="mt-2 text-sm font-medium text-white/80">Fresh groceries at your door</p>
      </section>
    </main>
  );
}

function WelcomeScreen() {
  const setOnboarded = useAuthStore((state) => state.setOnboarded);

  return (
    <main className="min-h-screen bg-ink text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-end bg-[linear-gradient(180deg,rgba(24,23,37,0.10),rgba(24,23,37,0.92)),url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center px-6 pb-10 md:px-10 lg:min-h-[760px] lg:justify-center lg:rounded-none">
        <div className="max-w-md">
          <div className="mb-8 inline-grid h-20 w-20 place-items-center rounded-[1.75rem] bg-white/15">
            <ShoppingBag size={38} aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal md:text-6xl">Welcome to our store</h1>
          <p className="mt-4 text-base text-white/78">Get fresh groceries and everyday essentials delivered quickly.</p>
          <Link
            to="/login"
            onClick={setOnboarded}
            className="mt-9 flex h-14 w-full items-center justify-center rounded-2xl bg-leaf-500 text-base font-semibold text-white transition hover:bg-leaf-600 md:w-72"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}

function LoginScreen() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [phone, setPhone] = useState("+91 98765 43210");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(phone);
    navigate("/verify");
  }

  return (
    <AuthFrame title="Login" subtitle="Enter your phone number to continue">
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <LabelledInput label="Phone number" value={phone} onChange={setPhone} autoComplete="tel" />
        <button className="h-14 w-full rounded-2xl bg-leaf-500 font-semibold text-white transition hover:bg-leaf-600">
          Continue
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-muted">
        New here?{" "}
        <Link className="font-semibold text-leaf-600" to="/signup">
          Create an account
        </Link>
      </p>
    </AuthFrame>
  );
}

function SignupScreen() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const [form, setForm] = useState<User>({
    name: "Ocean Shopper",
    email: "shopper@example.com",
    phone: "+91 98765 43210",
    location: "Select location",
  });

  function updateField(key: keyof User, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signup(form);
    navigate("/verify");
  }

  return (
    <AuthFrame title="Sign Up" subtitle="Create your grocery delivery profile">
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <LabelledInput label="Name" value={form.name} onChange={(value) => updateField("name", value)} />
        <LabelledInput label="Email" value={form.email} onChange={(value) => updateField("email", value)} autoComplete="email" />
        <LabelledInput label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} autoComplete="tel" />
        <button className="h-14 w-full rounded-2xl bg-leaf-500 font-semibold text-white transition hover:bg-leaf-600">
          Create Account
        </button>
      </form>
    </AuthFrame>
  );
}

function OtpScreen() {
  const navigate = useNavigate();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const [otp, setOtp] = useState("1234");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (verifyOtp(otp)) {
      navigate("/location");
      return;
    }

    setError("The verification code is incorrect.");
  }

  return (
    <AuthFrame title="Enter your 4-digit code" subtitle="Use 1234 for this demo verification flow">
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <LabelledInput label="Code" value={otp} onChange={setOtp} inputMode="numeric" maxLength={4} />
        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        <button className="h-14 w-full rounded-2xl bg-leaf-500 font-semibold text-white transition hover:bg-leaf-600">
          Verify
        </button>
      </form>
    </AuthFrame>
  );
}

function LocationScreen() {
  const navigate = useNavigate();
  const setLocation = useAuthStore((state) => state.setLocation);
  const [location, setLocationInput] = useState("Bengaluru, Karnataka");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocation(location);
    navigate("/home");
  }

  return (
    <AuthFrame title="Select your location" subtitle="Choose a delivery area for faster grocery drops">
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="rounded-3xl bg-leaf-50 p-6 text-center">
          <MapPin className="mx-auto text-leaf-600" size={46} aria-hidden="true" />
          <p className="mt-4 text-sm text-muted">Delivery estimate updates after location selection.</p>
        </div>
        <LabelledInput label="Delivery location" value={location} onChange={setLocationInput} />
        <button className="h-14 w-full rounded-2xl bg-leaf-500 font-semibold text-white transition hover:bg-leaf-600">
          Confirm Location
        </button>
      </form>
    </AuthFrame>
  );
}

function AuthFrame({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[1fr_1.05fr]">
      <section className="hidden bg-[linear-gradient(180deg,rgba(83,177,117,0.10),rgba(24,23,37,0.40)),url('https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center lg:block" />
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
        <Link to="/welcome" aria-label="Back" className="mb-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream">
          <ArrowLeft size={20} aria-hidden="true" />
        </Link>
        <ShoppingBag className="mb-10 text-leaf-500" size={40} aria-hidden="true" />
        <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
        <p className="mt-3 text-base text-muted">{subtitle}</p>
        {children}
      </section>
    </main>
  );
}

function LabelledInput({
  label,
  value,
  onChange,
  autoComplete,
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <input
        className="mt-2 h-14 w-full border-b border-zinc-200 bg-transparent text-base font-medium text-ink"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
      />
    </label>
  );
}

function AppShell() {
  return (
    <main className="min-h-screen bg-cream pb-24 lg:pb-0">
      <TopBar />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <BottomNav />
    </main>
  );
}

function TopBar() {
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/home" className="flex items-center gap-3 font-bold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-leaf-500 text-white">
            <ShoppingBag size={21} aria-hidden="true" />
          </span>
          <span className="hidden text-lg sm:block">Grocer</span>
        </Link>
        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-muted">
          <MapPin size={17} className="shrink-0 text-leaf-600" aria-hidden="true" />
          <span className="truncate">{user?.location ?? "Bengaluru, Karnataka"}</span>
        </div>
        <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-cream" aria-label="Cart">
          <ShoppingCart size={20} aria-hidden="true" />
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf-500 px-1 text-xs font-bold text-white">
              {count}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

function HomeScreen() {
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

function CategoryScreen() {
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

function ProductDetailsScreen() {
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

function SearchScreen() {
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

function FavoritesScreen() {
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

function CartScreen() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const checkout = useCartStore((state) => state.checkout);
  const allProducts = useProductStore((state) => state.products);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const rows = cartItems
    .map((item) => {
      const product = allProducts.find((entry) => entry.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((row): row is { product: Product; quantity: number } => Boolean(row));
  const subtotal = rows.reduce((total, row) => total + row.product.price * row.quantity, 0);
  const delivery = rows.length ? 2.99 : 0;
  const total = subtotal + delivery;

  async function handleCheckout(shouldFail = false) {
    setIsCheckingOut(true);
    const status = await checkout(shouldFail);
    setIsCheckingOut(false);
    navigate(status === OrderStatus.Success ? "/checkout/success" : "/checkout/failure");
  }

  if (!rows.length) {
    return <EmptyState icon={<ShoppingCart />} title="Your cart is empty" body="Add fresh products to build your basket." actionTo="/search" actionLabel="Shop Now" />;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">My Cart</h1>
        <div className="mt-5 divide-y divide-zinc-100 overflow-hidden rounded-[2rem] bg-white shadow-soft">
          {rows.map(({ product, quantity }) => (
            <article key={product.id} className="flex gap-4 p-4 sm:p-5">
              <img src={product.image} alt="" className="h-24 w-24 rounded-3xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold">{product.name}</h2>
                    <p className="mt-1 text-sm text-muted">{product.unit}</p>
                  </div>
                  <button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`} className="text-muted">
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <QuantityStepper quantity={quantity} onMinus={() => decrementItem(product.id)} onPlus={() => addItem(product.id)} />
                  <span className="font-bold">{formatMoney(product.price * quantity)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <aside className="rounded-[2rem] bg-white p-5 shadow-soft lg:sticky lg:top-24">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
        <SummaryRow label="Delivery" value={formatMoney(delivery)} />
        <SummaryRow label="Total" value={formatMoney(total)} strong />
        <button
          onClick={() => void handleCheckout(false)}
          disabled={isCheckingOut}
          className="mt-6 h-14 w-full rounded-2xl bg-leaf-500 font-bold text-white transition hover:bg-leaf-600 disabled:bg-zinc-300"
        >
          {isCheckingOut ? "Processing..." : "Place Order"}
        </button>
        <button
          onClick={() => void handleCheckout(true)}
          disabled={isCheckingOut}
          className="mt-3 h-12 w-full rounded-2xl border border-zinc-200 font-semibold text-muted transition hover:border-rose-200 hover:text-rose-600"
        >
          Simulate Failure
        </button>
      </aside>
    </section>
  );
}

function OrderResultScreen({ status }: { status: OrderStatus.Success | OrderStatus.Failed }) {
  const isSuccess = status === OrderStatus.Success;
  const resetOrderStatus = useCartStore((state) => state.resetOrderStatus);

  return (
    <section className="mx-auto max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-soft">
      <div className={`mx-auto grid h-24 w-24 place-items-center rounded-full ${isSuccess ? "bg-leaf-50 text-leaf-600" : "bg-rose-50 text-rose-600"}`}>
        {isSuccess ? <CheckCircle2 size={54} aria-hidden="true" /> : <CircleAlert size={54} aria-hidden="true" />}
      </div>
      <h1 className="mt-7 text-3xl font-semibold tracking-normal">{isSuccess ? "Your order has been accepted" : "Oops, order failed"}</h1>
      <p className="mt-3 text-muted">
        {isSuccess ? "Your groceries are being packed and will arrive soon." : "Something went wrong while processing checkout. Please try again."}
      </p>
      <Link
        to={isSuccess ? "/home" : "/cart"}
        onClick={resetOrderStatus}
        className="mt-8 flex h-14 items-center justify-center rounded-2xl bg-leaf-500 font-bold text-white transition hover:bg-leaf-600"
      >
        {isSuccess ? "Back To Home" : "Try Again"}
      </Link>
    </section>
  );
}

function DesktopFilterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <FilterPanel />
      </aside>
      {children}
    </div>
  );
}

function FilterPanel() {
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

function FilterSheetButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-leaf-50 text-leaf-600 lg:hidden" aria-label="Open filters">
        <Filter size={19} aria-hidden="true" />
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-ink/40 p-4 lg:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto mt-20 max-w-sm">
            <div className="mb-3 flex justify-end">
              <button onClick={() => setIsOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Close filters">
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      ) : null}
    </>
  );
}

function ProductGrid({ products, isLoading }: { products: Product[]; isLoading: boolean }) {
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

function ProductCard({ product }: { product: Product }) {
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

function ProductMini({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="rounded-3xl bg-cream p-3 transition hover:bg-leaf-50">
      <img src={product.image} alt="" className="h-20 w-full rounded-2xl object-cover" />
      <h3 className="mt-2 truncate text-sm font-bold">{product.name}</h3>
      <p className="text-xs font-semibold text-leaf-600">{formatMoney(product.price)}</p>
    </Link>
  );
}

function QuantityStepper({ quantity, onMinus, onPlus }: { quantity: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="flex h-11 items-center rounded-2xl border border-zinc-200">
      <button onClick={onMinus} className="grid h-11 w-11 place-items-center text-muted" aria-label="Decrease quantity">
        <Minus size={17} aria-hidden="true" />
      </button>
      <span className="grid h-11 min-w-8 place-items-center text-sm font-bold">{quantity}</span>
      <button onClick={onPlus} className="grid h-11 w-11 place-items-center text-leaf-600" aria-label="Increase quantity">
        <Plus size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

function BottomNav() {
  const links = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/search", label: "Search", icon: Search },
    { to: "/favorites", label: "Fav", icon: Heart },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
    { to: "/location", label: "Account", icon: UserRound },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white px-3 py-2 lg:hidden" aria-label="Primary">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold ${isActive ? "text-leaf-600" : "text-muted"}`
            }
          >
            <Icon size={21} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function SectionHeading({ title, to }: { title: string; to: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-normal">{title}</h2>
      <Link to={to} className="flex items-center gap-1 text-sm font-bold text-leaf-600">
        See all
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

function BackLink() {
  return (
    <button onClick={() => window.history.back()} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold shadow-sm">
      <ArrowLeft size={17} aria-hidden="true" />
      Back
    </button>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`mt-5 flex items-center justify-between border-t border-zinc-100 pt-5 ${strong ? "text-lg font-bold" : "text-sm font-semibold text-muted"}`}>
      <span>{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  body,
  actionTo,
  actionLabel,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  actionTo: string;
  actionLabel: string;
}) {
  return (
    <section className="mx-auto mt-8 max-w-md rounded-[2rem] bg-white p-8 text-center shadow-soft">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-leaf-50 text-leaf-600">{icon}</div>
      <h1 className="mt-6 text-2xl font-semibold tracking-normal">{title}</h1>
      <p className="mt-3 text-muted">{body}</p>
      <Link to={actionTo} className="mt-7 flex h-14 items-center justify-center rounded-2xl bg-leaf-500 px-5 py-4 font-bold text-white transition hover:bg-leaf-600">
        {actionLabel}
      </Link>
    </section>
  );
}

function useFilteredProducts(forcedCategory?: ProductCategory) {
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

export default App;
