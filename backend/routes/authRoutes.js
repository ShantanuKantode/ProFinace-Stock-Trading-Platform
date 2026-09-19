const express = require("express");

const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const { UserModel } = require("../model/UserModel");

const router = express.Router();


// SIGNUP
router.post("/signup", signup);


// LOGIN
router.post("/login", login);


// LOGOUT
router.post("/logout", logout);


// CURRENT USER
router.get("/me", authenticateToken, getCurrentUser);


// ADMIN TEST ROUTE
router.get(
  "/admin",
  authenticateToken,
  authorizeRoles("admin"),
  async (req, res) => {
    const users = await UserModel.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      message: "Admin authorization successful",
      users,
    });
  }
);


module.exports = router;