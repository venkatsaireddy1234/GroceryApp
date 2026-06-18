import { create } from "zustand";
import { User } from "../types";

interface AuthState {
  user: User | null;
  otp: string;
  hasSeenOnboarding: boolean;
  setOnboarded: () => void;
  login: (phone: string) => void;
  signup: (user: User) => void;
  verifyOtp: (otp: string) => boolean;
  setLocation: (location: string) => void;
  logout: () => void;
}

const demoUser: User = {
  name: "Ocean Shopper",
  email: "shopper@example.com",
  phone: "+91 98765 43210",
  location: "Select location",
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  otp: "1234",
  hasSeenOnboarding: false,
  setOnboarded: () => set({ hasSeenOnboarding: true }),
  login: (phone) => set({ user: { ...demoUser, phone } }),
  signup: (user) => set({ user }),
  verifyOtp: (otp) => otp === get().otp,
  setLocation: (location) =>
    set((state) => ({
      user: state.user ? { ...state.user, location } : { ...demoUser, location },
    })),
  logout: () => set({ user: null }),
}));
