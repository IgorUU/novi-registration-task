import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import config from "../config/api";
import type { Credentials } from "../types/auth";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkIsAuthenticated = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/auth/me`, {
        withCredentials: true
      });

      if (response.status != 200) {
        setUser(null);
      }
      setUser(response.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  checkIsAuthenticated();
  }, []);

  const login = async (credentials: Credentials) => {
    try {
      const response = await axios.post(`${config.apiUrl}/api/auth/login`, credentials, {
        withCredentials: true
      });
      if (response.status == 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${config.apiUrl}/api/auth/logout`, {}, {
        withCredentials: true
      })
      setUser(null);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}
