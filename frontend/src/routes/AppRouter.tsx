import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../hooks/useAuth";


const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <LoginPage /> : <HomePage />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to={"/"} />}
        />
        {/* TODO: Do we need this? */}
        <Route
          path="*"
          element={<Navigate to={!isAuthenticated ? "/login" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
