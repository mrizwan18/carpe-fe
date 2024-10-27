import React, { useState, useEffect } from "react";
import Pool from "../components/UI/Pool";
import Pagination from "./UI/Pagination";
import { useSelector } from "react-redux";
import { selectFilteredPools } from "../store/poolSlice";
import noDataIcon from "../assets/no-data.jpg";
import Spinner from "../components/UI/Spinner"; // Add a loading spinner component

function HomepagePools() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const pools = useSelector(selectFilteredPools); // Use filtered pools

  const recordsPerPage = Number(process.env.REACT_APP_RECORDS_PER_PAGE) || 6;
  const startIdx = (currentPage - 1) * recordsPerPage;
  const selectedPools = pools.slice(startIdx, startIdx + recordsPerPage);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Simulate a loading state (e.g., fetching data)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Replace with actual fetch delay if needed
    return () => clearTimeout(timer);
  }, [pools]);

  return (
    <div className="flex flex-col w-11/12 max-w-6xl mx-auto mt-20 pb-8 items-center">
      {loading ? (
        <Spinner /> // Show a spinner while loading
      ) : pools.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 gap-y-16">
            {selectedPools.map((pool) => (
              <Pool
                key={pool.id}
                image={pool.image}
                altImageText={pool.altImageText}
                tag={pool.tag}
                tagColor={pool.tagColor}
                headerText={pool.headerText}
                title={pool.title}
                mapLink={pool.mapLink}
                address={pool.address}
                timein={pool.timein}
                timeout={pool.timeout}
                poolId={pool.poolId}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            recordsPerPage={recordsPerPage}
            setCurrentPage={setCurrentPage}
            totalRecords={pools.length}
            pagesPernav={Number(process.env.REACT_APP_PAGES_PER_NAV) || 5}
          />
        </>
      ) : (
        <div className="flex flex-col items-center text-center text-gray-600 mt-10">
          <img src={noDataIcon} alt="No data available" className="w-1/3 h-1/3 mb-4" />
        </div>
      )}
    </div>
  );
}

export default HomepagePools;
