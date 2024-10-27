import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state for auth check
  const navigate = useNavigate();

  useEffect(() => {
    // Check token in localStorage to determine if user is logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      const isTokenValid = handleTokenExpiration(token);
      setIsAuthenticated(isTokenValid);
    }
    setLoading(false); // Mark auth check as completed
  }, []);

  const handleTokenExpiration = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        const expirationTime = (decodedToken.exp * 1000) - Date.now();

        // Schedule auto-logout based on token expiration
        setTimeout(() => {
          logout();
          toast.info("Session expired. You've been logged out.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, expirationTime);
        return true;
      } else {
        logout(); // Log out if token is already expired
        return false;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
      return false;
    }
  };

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    handleTokenExpiration(token); // Schedule auto-logout on login
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to landing page after logout
  };

  if (loading) return null; // Wait until auth check is completed

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
