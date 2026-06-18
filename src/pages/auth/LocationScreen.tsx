import { MapPin } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFrame } from "../../components/AuthFrame";
import { LabelledInput } from "../../components/LabelledInput";
import { useAuthStore } from "../../stores/authStore";

export function LocationScreen() {
  const navigate = useNavigate();
  const setLocation = useAuthStore((state) => state.setLocation);
  const [location, setLocationInput] = useState("Bengaluru, Karnataka");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocation(location);
    navigate("/home");
  }

  return (
    <AuthFrame title="Select your location" subtitle="Choose a delivery area for faster grocery drops">
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="rounded-3xl bg-leaf-50 p-6 text-center">
          <MapPin className="mx-auto text-leaf-600" size={46} aria-hidden="true" />
          <p className="mt-4 text-sm text-muted">Delivery estimate updates after location selection.</p>
        </div>
        <LabelledInput label="Delivery location" value={location} onChange={setLocationInput} />
        <button className="h-14 w-full rounded-2xl bg-leaf-500 font-semibold text-white transition hover:bg-leaf-600">
          Confirm Location
        </button>
      </form>
    </AuthFrame>
  );
}
