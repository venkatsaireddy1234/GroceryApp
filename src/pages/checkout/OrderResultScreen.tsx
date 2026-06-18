import { CheckCircle2, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { OrderStatus } from "../../types";

interface OrderResultScreenProps {
  status: OrderStatus.Success | OrderStatus.Failed;
}

export function OrderResultScreen({ status }: OrderResultScreenProps) {
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
