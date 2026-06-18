import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { CartScreen } from "./pages/app/CartScreen";
import { CategoryScreen } from "./pages/app/CategoryScreen";
import { FavoritesScreen } from "./pages/app/FavoritesScreen";
import { HomeScreen } from "./pages/app/HomeScreen";
import { ProductDetailsScreen } from "./pages/app/ProductDetailsScreen";
import { SearchScreen } from "./pages/app/SearchScreen";
import { LocationScreen } from "./pages/auth/LocationScreen";
import { LoginScreen } from "./pages/auth/LoginScreen";
import { OtpScreen } from "./pages/auth/OtpScreen";
import { SignupScreen } from "./pages/auth/SignupScreen";
import { SplashScreen } from "./pages/auth/SplashScreen";
import { WelcomeScreen } from "./pages/auth/WelcomeScreen";
import { OrderResultScreen } from "./pages/checkout/OrderResultScreen";
import { useProductStore } from "./stores/productStore";
import { OrderStatus } from "./types";

function App() {
  const loadProducts = useProductStore((state) => state.loadProducts);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/verify" element={<OtpScreen />} />
      <Route path="/location" element={<LocationScreen />} />
      <Route element={<AppShell />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/category/:categoryId" element={<CategoryScreen />} />
        <Route path="/product/:productId" element={<ProductDetailsScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/checkout/success" element={<OrderResultScreen status={OrderStatus.Success} />} />
        <Route path="/checkout/failure" element={<OrderResultScreen status={OrderStatus.Failed} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
