import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFrame } from "../../components/AuthFrame";
import { LabelledInput } from "../../components/LabelledInput";
import { useAuthStore } from "../../stores/authStore";
import { User } from "../../types";

export function SignupScreen() {
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
