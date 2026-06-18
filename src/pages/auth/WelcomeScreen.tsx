import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export function WelcomeScreen() {
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
