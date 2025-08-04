import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../hooks/useAuth";
import NotFoundPage from "../pages/NotFoundPage";


const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <LoginPage /> : <HomePage />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
