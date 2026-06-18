import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeadingProps {
  title: string;
  to: string;
}

export function SectionHeading({ title, to }: SectionHeadingProps) {
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
