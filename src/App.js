import React from 'react';
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Contact from "./components/Contact";
import PNF from "./components/PNF";
import RegisterBox from "./components/RegisterBox";
import LoginBox from "./components/LoginBox";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ProtectedRoute component to guard restricted routes like /dashboard
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth status
  }

  return isAuthenticated ? children : <Navigate to="/" />;
}

// RedirectToDashboard for when users are logged in and access the root ("/")
function RedirectToDashboard() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth status
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <ToastContainer />
          <div className="App bg-gray-800">
            <Routes>
              <Route path="/" element={<RedirectToDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<RegisterBox />} />
              <Route path="/login" element={<LoginBox />} />
              {/* Protect dashboard route */}
              <Route path="/dashboard" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
              <Route path="*" element={<PNF />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;
