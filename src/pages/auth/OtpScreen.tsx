import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFrame } from "../../components/AuthFrame";
import { LabelledInput } from "../../components/LabelledInput";
import { useAuthStore } from "../../stores/authStore";

export function OtpScreen() {
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
