import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-24">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
  );
}

export default Spinner;
