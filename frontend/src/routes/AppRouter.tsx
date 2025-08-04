import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../hooks/useAuth";


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
        {/* TODO: Do we need this? */}
        <Route
          path="*"
          element={<Navigate to={!user ? "/login" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
