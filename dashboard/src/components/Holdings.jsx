import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import VerticalGraph from "./VerticalGraph";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";

const Holdings = () => {
  const [
    allHoldings,
    setAllHoldings,
  ] = useState([]);

  const fetchHoldings = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/allHoldings`,
        {
          withCredentials: true,
        }
      );

      setAllHoldings(response.data);
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

 

  const totalInvestment =
    allHoldings.reduce(
      (total, stock) =>
        total +
        Number(stock.avg || 0) *
          Number(stock.qty || 0),
      0
    );

  const currentValue =
    allHoldings.reduce(
      (total, stock) =>
        total +
        Number(stock.price || 0) *
          Number(stock.qty || 0),
      0
    );

  const totalPnL =
    currentValue - totalInvestment;

  const pnlPercentage =
    totalInvestment > 0
      ? (totalPnL / totalInvestment) *
        100
      : 0;


  const verticalGraphData = {
    labels: allHoldings.map(
      (stock) => stock.name
    ),

    datasets: [
      {
        label: "Current Value",
        data: allHoldings.map(
          (stock) =>
            Number(stock.price || 0) *
            Number(stock.qty || 0)
        ),
      },
    ],
  };

  



  return (
    <>
      <h3 className="title">
        Holdings ({allHoldings.length})
      </h3>

      {/* Holdings Table */}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const curValue =
                Number(stock.price || 0) *
                Number(stock.qty || 0);

              const investment =
                Number(stock.avg || 0) *
                Number(stock.qty || 0);

              const pnl =
                curValue - investment;

              const isProfit = pnl >= 0;

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
                  key={stock._id}
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
                    {curValue.toFixed(2)}
                  </td>

                  <td
                    className={profClass}
                  >
                    {pnl.toFixed(2)}
                  </td>

                  <td
                    className={profClass}
                  >
                    {stock.net}
                  </td>

                  <td
                    className={dayClass}
                  >
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      

      <div className="row">
        <div className="col">
          <h5>
            ₹
            {totalInvestment.toFixed(
              2
            )}
          </h5>

          <p>
            Total investment
          </p>
        </div>

        <div className="col">
          <h5>
            ₹
            {currentValue.toFixed(2)}
          </h5>

          <p>
            Current value
          </p>
        </div>

        <div className="col">
          <h5
            className={
              totalPnL >= 0
                ? "profit"
                : "loss"
            }
          >
            ₹
            {totalPnL.toFixed(2)}{" "}
            (
            {pnlPercentage.toFixed(
              2
            )}
            %)
          </h5>

          <p>P&L</p>
        </div>
      </div>


      {allHoldings.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "40px",
            paddingBottom: "40px",
          }}
        >
        

          <div
            style={{
              width: "60%",
              height: "350px",
            }}
          >
            <VerticalGraph
              data={verticalGraphData}
            />
          </div>

          
        </div>
      )}
    </>
  );
};

export default Holdings;