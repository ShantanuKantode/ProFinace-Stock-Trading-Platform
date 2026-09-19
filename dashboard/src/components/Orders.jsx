import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


const Positions = () => {
  const [
    allPositions,
    setAllPositions,
  ] = useState([]);


  useEffect(() => {

    axios
      .get(
        `${API_URL}/allPositions`,
        {
          withCredentials: true,
        }
      )

      .then((res) => {
        setAllPositions(
          res.data
        );
      })

      .catch((err) => {
        console.log(
          "Positions error:",
          err.response?.data ||
            err.message
        );
      });

  }, []);


  return (
    <>
      <h3 className="title">
        Positions (
        {allPositions.length}
        )
      </h3>


      <div className="order-table">

        <table>

          <thead>

            <tr>

              <th>Product</th>

              <th>
                Instrument
              </th>

              <th>Qty.</th>

              <th>Avg.</th>

              <th>LTP</th>

              <th>P&L</th>

              <th>Chg.</th>

            </tr>

          </thead>


          <tbody>

            {allPositions.map(
              (stock) => {

                const curValue =
                  stock.price *
                  stock.qty;


                const isProfit =
                  curValue -
                    stock.avg *
                      stock.qty >=
                  0;


                const profClass =
                  isProfit
                    ? "profit"
                    : "loss";


                const dayClass =
                  stock.isLoss
                    ? "loss"
                    : "profit";


                return (
                  <tr
                    key={
                      stock._id
                    }
                  >

                    <td>
                      {stock.product}
                    </td>

                    <td>
                      {stock.name}
                    </td>

                    <td>
                      {stock.qty}
                    </td>

                    <td>
                      {Number(
                        stock.avg
                      ).toFixed(2)}
                    </td>

                    <td>
                      {Number(
                        stock.price
                      ).toFixed(2)}
                    </td>

                    <td
                      className={
                        profClass
                      }
                    >
                      {(
                        curValue -
                        stock.avg *
                          stock.qty
                      ).toFixed(2)}
                    </td>

                    <td
                      className={
                        dayClass
                      }
                    >
                      {stock.day}
                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>
    </>
  );
};


export default Positions;