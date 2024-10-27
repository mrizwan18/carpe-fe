import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import HomepageHero from "./HomepageHero";
import HomepagePools from "./HomepagePools";
import Navbar from "./UI/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPools } from "../store/poolSlice"; 
import { useNavigate } from "react-router-dom"; // Import hooks for navigation

function Homepage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken"); 

    // If token exists, make an authenticated request to fetch data
    if (token) {
      const apiClient = axios.create({
        baseURL: "http://api.ridecarpe.com",
        timeout: 1000,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      apiClient
        .get("/pools/all")
        .then((response) => {
          dispatch(setPools(response.data.content));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      // Redirect to login if the user is not authenticated
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primaryOrange-light"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <HomepageHero />
      <HomepagePools />
      <Footer />
    </>
  );
}

export default Homepage;
