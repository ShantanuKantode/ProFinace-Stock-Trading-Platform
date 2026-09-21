require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const authRoutes = require("./routes/authRoutes");
const { authenticateToken } = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3002;

const uri = process.env.MONGO_URI;

const app = express();



const BHARATSTOCK_BASE_URL = "https://bharatstockapi.com";

const bharatStockHeaders = {
  "X-API-Key": process.env.BHARATSTOCK_API_KEY,
};



const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,

  // Local development
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

console.log("Allowed CORS Origins:");
console.log(allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // Example: Postman, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked origin:", origin);

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ProFinance Backend API is running",
    environment: process.env.NODE_ENV || "development",
  });
});



app.use("/auth", authRoutes);



app.get("/api/stocks/quotes", async (req, res) => {
  try {
    const { symbols } = req.query;

    if (!symbols) {
      return res.status(400).json({
        success: false,
        message: "Stock symbols are required",
      });
    }

    if (!process.env.BHARATSTOCK_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "BharatStock API key is missing",
      });
    }

    const cleanedSymbols = symbols
      .split(",")
      .map((symbol) => symbol.trim().toUpperCase())
      .filter(Boolean)
      .join(",");

    if (!cleanedSymbols) {
      return res.status(400).json({
        success: false,
        message: "Valid stock symbols are required",
      });
    }

    const response = await axios.get(
      `${BHARATSTOCK_BASE_URL}/v1/stocks/quotes`,
      {
        params: {
          symbols: cleanedSymbols,
        },

        headers: bharatStockHeaders,

        timeout: 10000,
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "BharatStock Error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,

        message:
          error.response.data?.message ||
          "BharatStock API request failed",

        error: error.response.data,
      });
    }

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message: "BharatStock API request timed out",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stock data",
      error: error.message,
    });
  }
});


app.get("/api/indices", async (req, res) => {
  try {
    if (!process.env.BHARATSTOCK_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "BharatStock API key is missing",
      });
    }

   

    const niftyResponse = await axios.get(
      `${BHARATSTOCK_BASE_URL}/v1/indices/NIFTY 50/prices`,
      {
        headers: bharatStockHeaders,

        params: {
          page: 1,
          page_size: 2,
        },

        timeout: 10000,
      }
    );



    const bankResponse = await axios.get(
      `${BHARATSTOCK_BASE_URL}/v1/indices/NIFTY BANK/prices`,
      {
        headers: bharatStockHeaders,

        params: {
          page: 1,
          page_size: 2,
        },

        timeout: 10000,
      }
    );

    const niftyData =
      niftyResponse.data?.data || [];

    const bankData =
      bankResponse.data?.data || [];

    if (!niftyData.length) {
      return res.status(404).json({
        success: false,
        message: "NIFTY 50 data not found",
      });
    }

    if (!bankData.length) {
      return res.status(404).json({
        success: false,
        message: "NIFTY BANK data not found",
      });
    }

    const niftyLatest = niftyData[0];
    const niftyPrevious = niftyData[1];

    const bankLatest = bankData[0];
    const bankPrevious = bankData[1];

   

    const calculateChange = (
      latest,
      previous
    ) => {
      if (
        !latest?.close ||
        !previous?.close
      ) {
        return {
          change: 0,
          changePercent: 0,
        };
      }

      const change =
        Number(latest.close) -
        Number(previous.close);

      const changePercent =
        (change / Number(previous.close)) *
        100;

      return {
        change,
        changePercent,
      };
    };

    const niftyChange =
      calculateChange(
        niftyLatest,
        niftyPrevious
      );

    const bankChange =
      calculateChange(
        bankLatest,
        bankPrevious
      );

   

    return res.status(200).json({
      success: true,

      data: {
        nifty50: {
          name: "NIFTY 50",

          value:
            Number(niftyLatest.close),

          change:
            niftyChange.change,

          changePercent:
            niftyChange.changePercent,

          tradeDate:
            niftyLatest.trade_date,
        },

        niftyBank: {
          name: "NIFTY BANK",

          value:
            Number(bankLatest.close),

          change:
            bankChange.change,

          changePercent:
            bankChange.changePercent,

          tradeDate:
            bankLatest.trade_date,
        },
      },
    });
  } catch (error) {
    console.error(
      "BharatStock Index Error:",
      error.response?.data ||
        error.message
    );

    if (error.response) {
      return res.status(
        error.response.status
      ).json({
        success: false,

        message:
          error.response.data?.message ||
          "BharatStock index API request failed",

        error:
          error.response.data,
      });
    }

    if (
      error.code === "ECONNABORTED"
    ) {
      return res.status(504).json({
        success: false,

        message:
          "BharatStock index API request timed out",
      });
    }

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch index data",

      error:
        error.message,
    });
  }
});



app.get(
  "/allHoldings",
  authenticateToken,
  async (req, res) => {
    try {
      const allHoldings =
        await HoldingsModel.find({
          userId: req.user._id,
        }).sort({
          name: 1,
        });

      return res.status(200).json(
        allHoldings
      );
    } catch (error) {
      console.log(
        "Holdings error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch holdings",
      });
    }
  }
);



app.get(
  "/allPositions",
  authenticateToken,
  async (req, res) => {
    try {
      const allPositions =
        await PositionsModel.find({
          userId: req.user._id,
        }).sort({
          name: 1,
        });

      return res.status(200).json(
        allPositions
      );
    } catch (error) {
      console.log(
        "Positions error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch positions",
      });
    }
  }
);



app.get(
  "/allOrders",
  authenticateToken,
  async (req, res) => {
    try {
      const allOrders =
        await OrdersModel.find({
          userId: req.user._id,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json(
        allOrders
      );
    } catch (error) {
      console.log(
        "Orders error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to fetch orders",
      });
    }
  }
);


app.post(
  "/newOrder",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        name,
        qty,
        price,
        mode,
      } = req.body;

      const quantity = Number(qty);

      const orderPrice = Number(price);

     

      if (!name || !mode) {
        return res.status(400).json({
          message:
            "Stock name and order mode are required",
        });
      }

      if (
        !["BUY", "SELL"].includes(mode)
      ) {
        return res.status(400).json({
          message:
            "Invalid order mode",
        });
      }

      if (
        !Number.isFinite(quantity) ||
        quantity <= 0
      ) {
        return res.status(400).json({
          message:
            "Quantity must be greater than zero",
        });
      }

      if (
        !Number.isFinite(orderPrice) ||
        orderPrice < 0
      ) {
        return res.status(400).json({
          message:
            "Invalid stock price",
        });
      }

      

      if (mode === "SELL") {
        const existingHolding =
          await HoldingsModel.findOne({
            userId:
              req.user._id,

            name:
              name,
          });

        if (!existingHolding) {
          return res.status(400).json({
            message:
              "You don't own this stock!",
          });
        }

        if (
          existingHolding.qty <
          quantity
        ) {
          return res.status(400).json({
            message:
              "Insufficient stock quantity!",
          });
        }
      }

      

      const newOrder =
        new OrdersModel({
          userId:
            req.user._id,

          name:
            name,

          qty:
            quantity,

          price:
            orderPrice,

          mode:
            mode,
        });

      await newOrder.save();

    

      if (mode === "BUY") {
        const existingHolding =
          await HoldingsModel.findOne({
            userId:
              req.user._id,

            name:
              name,
          });

        if (existingHolding) {
          const totalQty =
            existingHolding.qty +
            quantity;

          const totalInvestment =
            existingHolding.avg *
              existingHolding.qty +
            orderPrice *
              quantity;

          existingHolding.qty =
            totalQty;

          existingHolding.avg =
            totalInvestment /
            totalQty;

          existingHolding.price =
            orderPrice;

          await existingHolding.save();
        } else {
          const newHolding =
            new HoldingsModel({
              userId:
                req.user._id,

              name:
                name,

              qty:
                quantity,

              avg:
                orderPrice,

              price:
                orderPrice,

              net:
                "0.00%",

              day:
                "0.00%",

              isLoss:
                false,
            });

          await newHolding.save();
        }
      }

    
      if (mode === "SELL") {
        const existingHolding =
          await HoldingsModel.findOne({
            userId:
              req.user._id,

            name:
              name,
          });

        existingHolding.qty -=
          quantity;

        existingHolding.price =
          orderPrice;

        if (
          existingHolding.qty === 0
        ) {
          await HoldingsModel.deleteOne({
            _id:
              existingHolding._id,
          });
        } else {
          await existingHolding.save();
        }
      }

     

      return res.status(201).json({
        message:
          "Order saved successfully",

        order: {
          id:
            newOrder._id,

          name:
            newOrder.name,

          qty:
            newOrder.qty,

          price:
            newOrder.price,

          mode:
            newOrder.mode,
        },
      });
    } catch (error) {
      console.log(
        "New order error:",
        error
      );

      return res.status(500).json({
        message:
          "Error saving order",
      });
    }
  }
);



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});



app.use(
  (error, req, res, next) => {
    console.error(
      "Server Error:",
      error.message
    );

    if (
      error.message?.startsWith(
        "CORS blocked"
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "CORS blocked this request",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
);



const startServer = async () => {
  try {
    if (!uri) {
      console.error(
        "MONGO_URI is missing from environment variables."
      );

      process.exit(1);
    }

    await mongoose.connect(uri);

    console.log(
      "Database Connected"
    );

    app.listen(
      PORT,
      () => {
        console.log(
          `App started on port ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Database connection failed:",
      error
    );

    process.exit(1);
  }
};

startServer();