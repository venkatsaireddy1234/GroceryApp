import { ArrowLeft, ShoppingBag } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthFrameProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthFrame({ title, subtitle, children }: AuthFrameProps) {
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
