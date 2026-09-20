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

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", authenticateToken, getCurrentUser);

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