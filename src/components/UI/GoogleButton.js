// src/components/GoogleButton.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { BsGoogle } from "react-icons/bs";

const GoogleButton = ({ onSuccess, onError }) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      useOneTap
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="flex font-bold text-center justify-evenly p-6 lg:gap-x-4 text-gray-800 align-middle transition-all bg-transparent border border-gray-300 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft hover:bg-primaryOrange-light hover:text-white duration-200"
        >
          <BsGoogle size={24} />
          <h2 className="ml-2">Continue with Google</h2>
        </button>
      )}
    />
  );
};

export default GoogleButton;
