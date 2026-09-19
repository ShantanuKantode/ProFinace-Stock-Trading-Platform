import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


const Holdings = () => {
  const [
    allHoldings,
    setAllHoldings,
  ] = useState([]);


  const fetchHoldings =
    async () => {
      try {
        const response =
          await axios.get(
            `${API_URL}/allHoldings`,
            {
              withCredentials: true,
            }
          );

        setAllHoldings(
          response.data
        );
      } catch (error) {
        console.log(
          "Holdings error:",
          error.response?.data ||
            error.message
        );
      }
    };


  useEffect(() => {
    fetchHoldings();
  }, []);


  return (
    <>
      <h3 className="title">
        Holdings (
        {allHoldings.length}
        )
      </h3>


      <div className="order-table">

        <table>

          <thead>

            <tr>

              <th>
                Instrument
              </th>

              <th>Qty.</th>

              <th>
                Avg. cost
              </th>

              <th>LTP</th>

              <th>Cur. val</th>

              <th>P&L</th>

              <th>
                Net chg.
              </th>

              <th>
                Day chg.
              </th>

            </tr>

          </thead>


          <tbody>

            {allHoldings.map(
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

                    <td>
                      {curValue.toFixed(
                        2
                      )}
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
                        profClass
                      }
                    >
                      {stock.net}
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


      <div className="row">

        <div className="col">

          <h5>
            29,875.
            <span>55</span>
          </h5>

          <p>
            Total investment
          </p>

        </div>


        <div className="col">

          <h5>
            31,428.
            <span>95</span>
          </h5>

          <p>
            Current value
          </p>

        </div>


        <div className="col">

          <h5>
            1,553.40
            (+5.20%)
          </h5>

          <p>P&L</p>

        </div>

      </div>

    </>
  );
};


export default Holdings;