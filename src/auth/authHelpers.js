import axios from "axios";
import { toast } from "react-toastify";

export async function handleGoogleOAuth(credentialResponse, navigate) {
  try {
    const token = credentialResponse.credential;

    // Send token to backend for verification and user creation/login
    const response = await axios.post("http://api.ridecarpe.com/auth/google-login", {
      token,
    });

    // If the backend returns a JWT, store it in localStorage
    const jwtToken = response.data.token;
    localStorage.setItem('authToken', jwtToken);
    navigate('/dashboard');
  } catch (error) {
    toast.error("Google login failed.");
  }
}
