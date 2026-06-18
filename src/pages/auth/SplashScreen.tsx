import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SplashScreen() {
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
