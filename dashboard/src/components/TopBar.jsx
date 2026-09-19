import React, { useEffect, useState } from "react";

import Menu from "./Menu";

import { useAuth } from "../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

const TopBar = () => {
  const { user } = useAuth();

  const [indices, setIndices] = useState({
    nifty50: null,
    niftyBank: null,
  });

  const [loading, setLoading] = useState(true);

  const fetchIndices = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/indices`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch index data");
      }

      const result = await response.json();

      if (result.success) {
        setIndices(result.data);
      }
    } catch (error) {
      console.error("Index Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndices();

   
    const interval = setInterval(() => {
      fetchIndices();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "--";
    }

    return Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const formatPercent = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    const number = Number(value);

    return `${
      number >= 0 ? "+" : ""
    }${number.toFixed(2)}%`;
  };

  return (
    <div className="topbar-container">

      <div className="indices-container">

       

        <div className="nifty">

          <p className="index">
            NIFTY 50
          </p>

          <p className="index-points">
            {loading
              ? "Loading..."
              : formatValue(
                  indices.nifty50?.value
                )}
          </p>

          <p
            className="percent"
            style={{
              color:
                Number(
                  indices.nifty50
                    ?.changePercent
                ) >= 0
                  ? "green"
                  : "red",
            }}
          >
            {formatPercent(
              indices.nifty50
                ?.changePercent
            )}
          </p>

        </div>


       
        <div className="sensex">

          <p className="index">
            NIFTY BANK
          </p>

          <p className="index-points">
            {loading
              ? "Loading..."
              : formatValue(
                  indices.niftyBank?.value
                )}
          </p>

          <p
            className="percent"
            style={{
              color:
                Number(
                  indices.niftyBank
                    ?.changePercent
                ) >= 0
                  ? "green"
                  : "red",
            }}
          >
            {formatPercent(
              indices.niftyBank
                ?.changePercent
            )}
          </p>

        </div>

      </div>


     

      <div
        style={{
          marginRight: "20px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        {user?.name}
      </div>


    
      <Menu />

    </div>
  );
};

export default TopBar;