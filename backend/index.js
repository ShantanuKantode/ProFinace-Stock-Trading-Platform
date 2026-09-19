require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const authRoutes = require("./routes/authRoutes");

const { authenticateToken } = require("./middleware/authMiddleware");


const PORT = process.env.PORT || 3002;

const uri = process.env.MONGO_URI;

const app = express();


/* -----------------------------
   MIDDLEWARE
----------------------------- */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],

    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());


/* -----------------------------
   AUTH ROUTES
----------------------------- */

app.use("/auth", authRoutes);


/* -----------------------------
   HOLDINGS
----------------------------- */

app.get(
  "/allHoldings",
  authenticateToken,
  async (req, res) => {
    try {
      const allHoldings = await HoldingsModel.find({
        userId: req.user._id,
      }).sort({ name: 1 });

      res.status(200).json(allHoldings);
    } catch (error) {
      console.log("Holdings error:", error);

      res.status(500).json({
        message: "Failed to fetch holdings",
      });
    }
  }
);


/* -----------------------------
   POSITIONS
----------------------------- */

app.get(
  "/allPositions",
  authenticateToken,
  async (req, res) => {
    try {
      const allPositions = await PositionsModel.find({
        userId: req.user._id,
      }).sort({ name: 1 });

      res.status(200).json(allPositions);
    } catch (error) {
      console.log("Positions error:", error);

      res.status(500).json({
        message: "Failed to fetch positions",
      });
    }
  }
);


/* -----------------------------
   ORDERS
----------------------------- */

app.get(
  "/allOrders",
  authenticateToken,
  async (req, res) => {
    try {
      const allOrders = await OrdersModel.find({
        userId: req.user._id,
      }).sort({ createdAt: -1 });

      res.status(200).json(allOrders);
    } catch (error) {
      console.log("Orders error:", error);

      res.status(500).json({
        message: "Failed to fetch orders",
      });
    }
  }
);


/* -----------------------------
   NEW ORDER
----------------------------- */

app.post(
  "/newOrder",
  authenticateToken,
  async (req, res) => {
    try {
      const { name, qty, price, mode } = req.body;

      const quantity = Number(qty);
      const orderPrice = Number(price);

      if (!name || !mode) {
        return res.status(400).json({
          message: "Stock name and order mode are required",
        });
      }

      if (!["BUY", "SELL"].includes(mode)) {
        return res.status(400).json({
          message: "Invalid order mode",
        });
      }

      if (!Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be greater than zero",
        });
      }

      if (!Number.isFinite(orderPrice) || orderPrice < 0) {
        return res.status(400).json({
          message: "Invalid stock price",
        });
      }


      /* -----------------------------
         SELL VALIDATION FIRST
      ----------------------------- */

      if (mode === "SELL") {
        const existingHolding =
          await HoldingsModel.findOne({
            userId: req.user._id,
            name: name,
          });

        if (!existingHolding) {
          return res.status(400).json({
            message: "You don't own this stock!",
          });
        }

        if (existingHolding.qty < quantity) {
          return res.status(400).json({
            message: "Insufficient stock quantity!",
          });
        }
      }


      /* -----------------------------
         SAVE ORDER
      ----------------------------- */

      const newOrder = new OrdersModel({
        userId: req.user._id,
        name: name,
        qty: quantity,
        price: orderPrice,
        mode: mode,
      });

      await newOrder.save();


      /* -----------------------------
         BUY
      ----------------------------- */

      if (mode === "BUY") {
        const existingHolding =
          await HoldingsModel.findOne({
            userId: req.user._id,
            name: name,
          });


        if (existingHolding) {
          const totalQty =
            existingHolding.qty + quantity;

          const totalInvestment =
            existingHolding.avg *
              existingHolding.qty +
            orderPrice * quantity;

          existingHolding.qty = totalQty;

          existingHolding.avg =
            totalInvestment / totalQty;

          existingHolding.price =
            orderPrice;

          await existingHolding.save();
        } else {
          const newHolding =
            new HoldingsModel({
              userId: req.user._id,

              name: name,

              qty: quantity,

              avg: orderPrice,

              price: orderPrice,

              net: "0.00%",

              day: "0.00%",

              isLoss: false,
            });

          await newHolding.save();
        }
      }


      /* -----------------------------
         SELL
      ----------------------------- */

      if (mode === "SELL") {
        const existingHolding =
          await HoldingsModel.findOne({
            userId: req.user._id,
            name: name,
          });


        existingHolding.qty -= quantity;

        existingHolding.price =
          orderPrice;


        if (existingHolding.qty === 0) {
          await HoldingsModel.deleteOne({
            _id: existingHolding._id,
          });
        } else {
          await existingHolding.save();
        }
      }


      res.status(201).json({
        message: "Order saved successfully",

        order: {
          id: newOrder._id,
          name: newOrder.name,
          qty: newOrder.qty,
          price: newOrder.price,
          mode: newOrder.mode,
        },
      });

    } catch (error) {
      console.log("New order error:", error);

      res.status(500).json({
        message: "Error saving order",
      });
    }
  }
);


/* -----------------------------
   DATABASE + SERVER
----------------------------- */

const startServer = async () => {
  try {
    await mongoose.connect(uri);

    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error
    );

    process.exit(1);
  }
};


startServer();