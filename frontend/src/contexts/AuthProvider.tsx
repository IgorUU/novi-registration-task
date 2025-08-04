import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import config from "../config/api";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkIsAuthenticated = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/auth/me`, {
        withCredentials: true
      });
      console.log(response);
      if (response.status != 200) {
        setIsAuthenticated(false);
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  checkIsAuthenticated();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  }

  const logout = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}
