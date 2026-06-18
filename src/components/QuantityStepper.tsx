import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onMinus: () => void;
  onPlus: () => void;
}

export function QuantityStepper({ quantity, onMinus, onPlus }: QuantityStepperProps) {
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
