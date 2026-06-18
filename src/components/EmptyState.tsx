import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  body: string;
  actionTo: string;
  actionLabel: string;
}

export function EmptyState({ icon, title, body, actionTo, actionLabel }: EmptyStateProps) {
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
