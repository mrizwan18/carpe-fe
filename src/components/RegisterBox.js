import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./UI/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleButton from "./UI/GoogleButton"; // Import GoogleButton component
import { useAuth } from "./AuthContext"; // Import Auth context


function RegisterBox() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); // Use the login function from the context

  const apiClient = axios.create({
    baseURL: "http://api.ridecarpe.com",
    headers: { "Content-Type": "application/json" },
  });

  const handleGoogleOAuth = async (credentialResponse, navigate) => {
    try {
      setLoading(true);

      const token = credentialResponse.credential;
  
      const response = await apiClient.post("/auth/google-login", {
        token,
      });
  
      const jwtToken = response.data.jwt;
      login(jwtToken);
  
    } catch (error) {
      setErrors([error.response?.data?.message || "Login failed"]);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const submitForm = async () => {
    setErrors([]);
    setLoading(true);

    try {
      const response = await apiClient.post("/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        navigate("/dashboard");
      } else {
        setErrors([response.data.message]);
      }
    } catch (error) {
      setErrors([error.response?.data?.message || "Registration failed"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-full max-w-full mx-auto mt-20 md:mb-20 p-6 lg:w-5/12">
        <div className="relative z-0 flex flex-col justify-center bg-white border-0 shadow-soft-xl rounded-2xl lg:p-12">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl text-gray-800 font-bold">
            <h5>Register with</h5>
          </div>

          <div className="flex justify-center mt-4 mb-8">
            <GoogleButton
              onSuccess={(credentialResponse) =>
                handleGoogleOAuth(credentialResponse, navigate)
              }
              onError={() => toast.error("Google registration failed")}
            />
          </div>

          {/* Registration Form */}
          <div className="flex-auto p-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="text-sm block w-full rounded-lg border border-solid border-gray-300 py-2 px-3 font-normal text-gray-700 transition-all focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="text-sm block w-full rounded-lg border border-solid border-gray-300 py-2 px-3 font-normal text-gray-700 transition-all focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="text-sm block w-full rounded-lg border border-solid border-gray-300 py-2 px-3 font-normal text-gray-700 transition-all focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {loading && (
                <div className="text-center mb-4">
                  <span>Loading...</span>
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={submitForm}
                  disabled={loading}
                  className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase transition-all bg-primaryOrange-light border-0 rounded-lg cursor-pointer hover:bg-primaryOrange-dark disabled:opacity-50"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-4 mb-0 leading-normal text-sm text-center">
              Already have an account?{" "}
              <NavLink to="/login" className="font-bold text-slate-700">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterBox;
