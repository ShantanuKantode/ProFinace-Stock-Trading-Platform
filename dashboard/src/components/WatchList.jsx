import React, {
  useState,
  useEffect,
  useContext,
} from "react";

import { Tooltip } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Search,
} from "@mui/icons-material";

import DoughnutChart from "./DoughnutChart";

import GeneralContext from "./GeneralContext";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


const stockSymbols = [
  "INFY",
  "TCS",
  "RELIANCE",
  "HDFCBANK",
  "ICICIBANK",
  "SBIN",
  "WIPRO",
  "ONGC",
  "KPITTECH",
];


const WatchList = () => {


  const [search, setSearch] = useState("");

  const [stocks, setStocks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  const fetchStocks = async () => {

    try {

      setLoading(true);

      setError("");


      const symbols = stockSymbols.join(",");


      const response = await fetch(
        `${API_URL}/api/stocks/quotes?symbols=${symbols}`
      );


      const result = await response.json();


      console.log(
        "BharatStock Response:",
        result
      );


      if (!response.ok || !result.success) {

        throw new Error(
          result.message ||
          "Failed to fetch stock data"
        );

      }


      let stockData = result.data;


      if (
        stockData &&
        Array.isArray(stockData)
      ) {

        setStocks(
          stockData.map(formatStock)
        );

      }

      else if (
        stockData &&
        Array.isArray(stockData.data)
      ) {

        setStocks(
          stockData.data.map(formatStock)
        );

      }

      else {

        console.error(
          "Unexpected BharatStock response:",
          result
        );

        setError(
          "Unexpected stock API response"
        );

      }

    } catch (error) {

      console.error(
        "Stock API Error:",
        error
      );

      setError(
        error.message ||
        "Unable to fetch stock data"
      );

    } finally {

      setLoading(false);

    }

  };

const formatStock = (stock) => {
  const price = Number(stock.close || 0);
  const change = Number(stock.change_pct || 0);

  return {
    name: stock.symbol,

    companyName: stock.company_name,

    tradeDate: stock.trade_date,

    price:
      price > 0
        ? `₹${price.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "₹0.00",

    numericPrice: price,

    percent:
      `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,

    isDown: change < 0,

    open: stock.open,

    high: stock.high,

    low: stock.low,

    previousClose: stock.prev_close,

    volume: stock.volume,
  };
};

  useEffect(() => {

    fetchStocks();

  }, []);


  const filteredStocks =
    stocks.filter((stock) =>
      stock.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  const doughnutData = {

    labels: filteredStocks.map(
      (stock) => stock.name
    ),

    datasets: [

      {

        label: "Stock Price",

        data: filteredStocks.map(
          (stock) =>
            stock.numericPrice || 0
        ),

        backgroundColor: [

          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#66BB6A",
          "#EC407A",
          "#26C6DA",
          "#7E57C2",
          "#AB47BC",
          "#42A5F5",
          "#FFA726",
          "#26A69A",
          "#EF5350",

        ],

        borderColor: "#ffffff",

        borderWidth: 2,

      },

    ],

  };


  return (

    <div className="watchlist-container">

      <div className="search-container">

        <Search className="search-icon" />

        <input

          type="text"

          name="search"

          id="search"

          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"

          className="search"

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

        <span className="counts">

          {filteredStocks.length} / 50

        </span>

      </div>

      {loading && (

        <div
          style={{
            padding: "20px",
            textAlign: "center",
          }}
        >

          Loading stock prices...

        </div>

      )}


      {!loading && error && (

        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#ff4444",
          }}
        >

          {error}

          <br />

          <button
            onClick={fetchStocks}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>

        </div>

      )}

      {!loading &&
        !error && (

          <ul className="list">

            {filteredStocks.length > 0 ? (

              filteredStocks.map(
                (stock, index) => (

                  <WatchListItem
                    stock={stock}
                    key={stock.name || index}
                  />

                )
              )

            ) : (

              <li className="no-results">

                No stocks found

              </li>

            )}

          </ul>

        )}


      {!loading &&
        !error &&
        filteredStocks.length > 0 && (

          <div
            style={{
              width: "90%",
              height: "280px",
              margin: "20px auto",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >

            <DoughnutChart
              data={doughnutData}
            />

          </div>

        )}

    </div>

  );

};


export default WatchList;


const WatchListItem = ({ stock }) => {

  const [
    showWatchlistActions,
    setShowWatchlistActions,
  ] = useState(false);


  return (

    <li

      onMouseEnter={() =>
        setShowWatchlistActions(true)
      }

      onMouseLeave={() =>
        setShowWatchlistActions(false)
      }

    >

      <div className="item">

        <p
          className={
            stock.isDown
              ? "down"
              : "up"
          }
        >

          {stock.name}

        </p>

        <div className="itemInfo">


          <span className="percent">

            {stock.percent}

          </span>


          {stock.isDown ? (

            <KeyboardArrowDown
              className="down"
            />

          ) : (

            <KeyboardArrowUp
              className="up"
            />

          )}


          <span className="price">

            {stock.price}

          </span>


        </div>

      </div>

      {showWatchlistActions && (

        <WatchListActions
          uid={stock.name}
        />

      )}

    </li>

  );

};

const WatchListActions = ({ uid }) => {

  const {
    openBuyWindow,
    openSellWindow,
  } = useContext(GeneralContext);


  const handleBuy = () => {

    openBuyWindow(uid);

  };

  const handleSell = () => {

    openSellWindow(uid);

  };

  const handleAnalytics = () => {

    console.log(
      "Analytics:",
      uid
    );

  };

  const handleMore = () => {

    console.log(
      "More:",
      uid
    );

  };


  return (

    <span className="actions">

      <span>


        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
        >

          <button
            className="buy"
            onClick={handleBuy}
          >

            Buy

          </button>

        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
        >

          <button
            className="sell"
            onClick={handleSell}
          >

            Sell

          </button>

        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
        >

          <button
            className="action"
            onClick={handleAnalytics}
          >

            <BarChartOutlined
              className="icon"
            />

          </button>

        </Tooltip>

        <Tooltip
          title="More"
          placement="top"
          arrow
        >

          <button
            className="action"
            onClick={handleMore}
          >

            <MoreHoriz
              className="icon"
            />

          </button>

        </Tooltip>


      </span>

    </span>

  );

};