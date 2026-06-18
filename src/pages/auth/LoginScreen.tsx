import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthFrame } from "../../components/AuthFrame";
import { LabelledInput } from "../../components/LabelledInput";
import { useAuthStore } from "../../stores/authStore";

export function LoginScreen() {
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
