const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account has been disabled",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Authentication error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired authentication token",
    });
  }
};


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }

    next();
  };
};


module.exports = {
  authenticateToken,
  authorizeRoles,
};