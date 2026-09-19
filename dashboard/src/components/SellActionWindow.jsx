import React, {
  useContext,
  useState,
} from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


const SellActionWindow = ({
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


  const {
    closeSellWindow,
  } = useContext(
    GeneralContext
  );


  const handleSellClick =
    async () => {

      try {

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

            mode: "SELL",
          },

          {
            withCredentials:
              true,
          }
        );


        closeSellWindow();


      } catch (error) {

        console.log(
          "Sell order failed:",

          error.response
            ?.data ||
            error.message
        );

      }
    };


  const handleCancelClick =
    () => {
      closeSellWindow();
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
              onChange={(e) =>
                setStockPrice(
                  e.target.value
                )
              }
            />

          </fieldset>

        </div>

      </div>


      <div className="buttons">

        <span>
          Sell order for {uid}
        </span>


        <div>

          <Link
            className="btn btn-blue"
            onClick={
              handleSellClick
            }
          >
            Sell
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


export default SellActionWindow;