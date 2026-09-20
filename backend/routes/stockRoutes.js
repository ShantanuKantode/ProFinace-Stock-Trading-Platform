const express = require("express");

const router = express.Router();

const FINNHUB_API_KEY =
  process.env.FINNHUB_API_KEY;

const FINNHUB_URL =
  "https://finnhub.io/api/v1/quote";


router.get("/stock/:symbol", async (req, res) => {
  try {
    const symbol =
      req.params.symbol.toUpperCase();

    if (!FINNHUB_API_KEY) {
      return res.status(500).json({
        message:
          "FINNHUB_API_KEY is missing in .env",
      });
    }

    const finnhubSymbol =
      symbol.endsWith(".NS")
        ? symbol
        : `${symbol}.NS`;


    const url =
      `${FINNHUB_URL}` +
      `?symbol=${encodeURIComponent(
        finnhubSymbol
      )}` +
      `&token=${FINNHUB_API_KEY}`;


    const response =
      await fetch(url);


    if (!response.ok) {
      return res.status(
        response.status
      ).json({
        message:
          "Finnhub API request failed",
      });
    }


    const data =
      await response.json();


    if (
      data.c === 0 &&
      data.d === null &&
      data.dp === null
    ) {
      return res.status(404).json({
        message:
          `No market data found for ${symbol}`,
      });
    }


    res.status(200).json({
      symbol: symbol,

      price: data.c,

      change: data.d,

      percent: data.dp,

      high: data.h,

      low: data.l,

      open: data.o,

      previousClose: data.pc,

      timestamp: data.t,
    });

  } catch (error) {

    console.error(
      "Finnhub error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch stock data",
    });
  }
});


module.exports = router;