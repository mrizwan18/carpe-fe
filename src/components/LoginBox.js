import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./UI/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleButton from "./UI/GoogleButton"; // Import GoogleButton component
import { useAuth } from "./AuthContext"; // Import Auth context

function LoginBox() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userIdError, setUserIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth(); // Use the login function from the context
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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
    setUserIdError(false);
    setPasswordError(false);
    let formErrors = [];

    if (!userId) {
      formErrors.push("Valid User ID is required");
      setUserIdError(true);
    }

    if (!password) {
      formErrors.push("Valid Password is required");
      setPasswordError(true);
    }

    if (formErrors.length > 0) {
      setErrors(formErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", {
        email: userId,
        password: password,
      });

      if (response.status === 200) {
        // Login using context method to ensure state is updated
        login(response.data.jwt); // This will update the isAuthenticated state in AuthContext
      } else {
        setErrors([response.data.message]);
        toast.error(response.data.message);
      }
    } catch (error) {
      setErrors([error.response?.data?.message || "Login failed"]);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-full max-w-full mx-auto mt-20 md:mb-20 p-6 lg:w-5/12">
        <div className="relative z-0 flex flex-col justify-center bg-white border-0 shadow-soft-xl rounded-2xl lg:p-12">
          {errors.length > 0 && (
            <div className="flex p-4 m-4 text-red-500 border-2 rounded-md border-red-500 justify-center">
              <div className="flex flex-col">
                {errors.map((err, id) => (
                  <div className="ml-3 text-sm font-medium" key={id}>
                    {err}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="ml-auto text-red-500 rounded-lg inline-flex h-8 w-8 justify-center"
                aria-label="Close"
                onClick={() => setErrors([])}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl text-gray-800 font-bold">
            <h5>Login with</h5>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center mt-4 mb-8">
            <GoogleButton
              onSuccess={(credentialResponse) =>
                handleGoogleOAuth(credentialResponse, navigate)
              }
              onError={() => toast.error("Google login failed")}
            />
          </div>

          {/* Login Form */}
          <div className="flex-auto p-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <input
                  type="email"
                  className={`text-sm block w-full rounded-lg border border-solid border-gray-300 py-2 px-3 font-normal text-gray-700 transition-all focus:outline-none ${
                    userIdError ? "border-red-500" : ""
                  }`}
                  placeholder="Email"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className={`text-sm block w-full rounded-lg border border-solid border-gray-300 py-2 px-3 font-normal text-gray-700 transition-all focus:outline-none ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
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
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 mb-0 leading-normal text-sm text-center">
              Don't have an account?{" "}
              <NavLink to="/register" className="font-bold text-slate-700">
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginBox;
