import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


const BuyActionWindow = ({
  uid,
}) => {

  const [
    stockQuantity,
    setStockQuantity,
  ] = useState(1);


  const [
    stockPrice,
    setStockPrice,
  ] = useState(0);


  const [
    loadingPrice,
    setLoadingPrice,
  ] = useState(true);


  const [
    priceError,
    setPriceError,
  ] = useState("");


  const {
    closeBuyWindow,
  } = useContext(
    GeneralContext
  );


  const fetchStockPrice = async () => {

    try {

      setLoadingPrice(true);

      setPriceError("");


      const response = await axios.get(
        `${API_URL}/api/stocks/quotes`,
        {
          params: {
            symbols: uid,
          },
        }
      );


      console.log(
        "Buy Window Stock Response:",
        response.data
      );


      if (
        !response.data ||
        !response.data.success
      ) {

        throw new Error(
          response.data?.message ||
          "Failed to fetch stock price"
        );

      }


      const stockData =
        response.data.data;




      let stock = null;


      if (
        Array.isArray(stockData)
      ) {

        stock =
          stockData.find(
            (item) =>
              item.symbol?.toUpperCase() ===
              uid?.toUpperCase()
          );

      }


      else if (
        stockData &&
        Array.isArray(stockData.data)
      ) {

        stock =
          stockData.data.find(
            (item) =>
              item.symbol?.toUpperCase() ===
              uid?.toUpperCase()
          );

      }


      if (!stock) {

        throw new Error(
          `Price not found for ${uid}`
        );

      }


      const price =
        Number(stock.close);


      if (
        !Number.isFinite(price) ||
        price <= 0
      ) {

        throw new Error(
          `Invalid price received for ${uid}`
        );

      }


      setStockPrice(price);


    } catch (error) {

      console.error(
        "Stock price fetch failed:",
        error.response?.data ||
        error.message
      );


      setPriceError(
        error.response?.data?.message ||
        error.message ||
        "Unable to fetch stock price"
      );


    } finally {

      setLoadingPrice(false);

    }

  };


  useEffect(() => {

    if (uid) {

      fetchStockPrice();

    }

  }, [uid]);

  const handleBuyClick =
    async () => {

      try {

        if (
          !stockQuantity ||
          Number(stockQuantity) <= 0
        ) {

          alert(
            "Please enter a valid quantity."
          );

          return;

        }


        if (
          !stockPrice ||
          Number(stockPrice) <= 0
        ) {

          alert(
            "Stock price is not available."
          );

          return;

        }


        await axios.post(
          `${API_URL}/newOrder`,

          {
            name: uid,

            qty: Number(
              stockQuantity
            ),

            price: Number(
              stockPrice
            ),

            mode: "BUY",
          },

          {
            withCredentials:
              true,
          }
        );


        closeBuyWindow();


      } catch (error) {

        console.log(
          "Buy order failed:",
          error.response
            ?.data ||
            error.message
        );

        alert(
          error.response?.data?.message ||
          "Buy order failed"
        );

      }

    };


  const handleCancelClick =
    () => {

      closeBuyWindow();

    };



  return (

    <div
      className="container"
      id="buy-window"
      draggable="true"
    >

      <div className="regular-order">

        <div className="inputs">

          <fieldset>

            <legend>
              Qty.
            </legend>

            <input
              type="number"
              min="1"
              value={
                stockQuantity
              }
              onChange={(e) =>
                setStockQuantity(
                  e.target.value
                )
              }
            />

          </fieldset>

          <fieldset>

            <legend>
              Price
            </legend>

            <input
              type="number"
              min="0"
              step="0.05"
              value={
                stockPrice
              }
              disabled={
                loadingPrice
              }
              onChange={(e) =>
                setStockPrice(
                  e.target.value
                )
              }
            />

          </fieldset>

        </div>


        {loadingPrice && (

          <p
            style={{
              fontSize: "12px",
              marginTop: "8px",
            }}
          >
            Fetching latest available price...
          </p>

        )}


        {!loadingPrice &&
          priceError && (

            <div
              style={{
                color: "#e53935",
                fontSize: "12px",
                marginTop: "8px",
              }}
            >

              {priceError}

              <button
                onClick={
                  fetchStockPrice
                }
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              >
                Retry
              </button>

            </div>

          )}


      </div>



      <div className="buttons">

        <span>
          Buy order for {uid}
        </span>


        <div>

          <Link
            className="btn btn-blue"
            onClick={
              handleBuyClick
            }
            style={{
              pointerEvents:
                loadingPrice ||
                !!priceError
                  ? "none"
                  : "auto",

              opacity:
                loadingPrice ||
                !!priceError
                  ? 0.6
                  : 1,
            }}
          >

            {loadingPrice
              ? "Loading..."
              : "Buy"}

          </Link>


          <Link
            to=""
            className="btn btn-grey"
            onClick={
              handleCancelClick
            }
          >

            Cancel

          </Link>

        </div>

      </div>

    </div>

  );

};


export default BuyActionWindow;