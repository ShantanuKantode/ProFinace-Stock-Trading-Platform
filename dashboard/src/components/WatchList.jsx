import React, { useState, useContext } from "react";

import { Tooltip } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Search,
} from "@mui/icons-material";

import DoughnutChart from "./DoughnutChart";

import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";

const WatchList = () => {
  const [search, setSearch] = useState("");

  const filteredStocks = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
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
          Number(
            String(stock.price).replace(/,/g, "")
          ) || 0
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
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="counts">
          {filteredStocks.length} / 50
        </span>

      </div>

      <ul className="list">

        {filteredStocks.length > 0 ? (

          filteredStocks.map((stock, index) => (
            <WatchListItem
              stock={stock}
              key={index}
            />
          ))

        ) : (

          <li className="no-results">
            No stocks found
          </li>

        )}

      </ul>

      {filteredStocks.length > 0 && (
        <div
          style={{
            width: "90%",
            height: "280px",
            margin: "20px auto",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <DoughnutChart data={doughnutData} />
        </div>
      )}

    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] =
    useState(false);

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

        <p className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </p>

        <div className="itemInfo">

          <span className="percent">
            {stock.percent}
          </span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">
            {stock.price}
          </span>

        </div>

      </div>

      {showWatchlistActions && (
        <WatchListActions uid={stock.name} />
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
    console.log("Analytics:", uid);
  };

  const handleMore = () => {
    console.log("More:", uid);
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
            <BarChartOutlined className="icon" />
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
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>

      </span>

    </span>
  );
};