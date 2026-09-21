const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");


// =====================================================
// Generate JWT Token
// =====================================================

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// =====================================================
// Cookie Options
// =====================================================

const getCookieOptions = (req) => {
  const isHttps =
    req.secure ||
    req.headers["x-forwarded-proto"] === "https";

  return {
    httpOnly: true,

    secure: isHttps,

    sameSite: isHttps
      ? "none"
      : "lax",

    maxAge:
      7 * 24 * 60 * 60 * 1000,

    path: "/",
  };
};


// =====================================================
// SIGNUP
// =====================================================

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;


    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Name, email and password are required",
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must contain at least 6 characters",
      });
    }


    const normalizedEmail =
      email.trim().toLowerCase();


    // Check existing user
    const existingUser =
      await UserModel.findOne({
        email: normalizedEmail,
      });


    if (existingUser) {
      return res.status(409).json({
        message:
          "An account with this email already exists",
      });
    }


    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );


    // Create user
    const newUser =
      new UserModel({
        name: name.trim(),

        email: normalizedEmail,

        password: hashedPassword,

        role: "user",
      });


    await newUser.save();


    // Generate JWT
    const token =
      generateToken(newUser);


    // Store JWT in HTTP-only cookie
    res.cookie(
      "token",
      token,
      getCookieOptions(req)
    );


    console.log(
      "Signup successful:",
      newUser.email
    );


    return res.status(201).json({
      message:
        "Account created successfully",

      user: {
        id: newUser._id,

        name: newUser.name,

        email: newUser.email,

        role: newUser.role,
      },
    });

  } catch (error) {

    console.error(
      "Signup error:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong while creating the account",
    });
  }
};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;


    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }


    const normalizedEmail =
      email.trim().toLowerCase();


    // Find user
    const user =
      await UserModel.findOne({
        email: normalizedEmail,
      });


    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }


    // Check active account
    if (!user.isActive) {
      return res.status(403).json({
        message:
          "Your account has been disabled",
      });
    }


    // Check password
    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }


    // Generate JWT
    const token =
      generateToken(user);


    // Store JWT cookie
    res.cookie(
      "token",
      token,
      getCookieOptions(req)
    );


    console.log(
      "Login successful:",
      user.email
    );


    return res.status(200).json({
      message:
        "Login successful",

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong while logging in",
    });
  }
};


// =====================================================
// LOGOUT
// =====================================================

const logout = async (req, res) => {
  try {

    res.clearCookie(
      "token",
      getCookieOptions(req)
    );


    return res.status(200).json({
      message:
        "Logout successful",
    });

  } catch (error) {

    console.error(
      "Logout error:",
      error
    );

    return res.status(500).json({
      message:
        "Logout failed",
    });
  }
};


// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = async (req, res) => {

  return res.status(200).json({

    user: {

      id: req.user._id,

      name: req.user.name,

      email: req.user.email,

      role: req.user.role,

    },

  });
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};