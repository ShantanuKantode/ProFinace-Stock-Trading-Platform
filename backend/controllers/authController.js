const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");


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


const cookieOptions = {
  httpOnly: true,

  secure: process.env.NODE_ENV === "production",

  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",

  maxAge: 7 * 24 * 60 * 60 * 1000,

  path: "/",
};


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "Account created successfully",

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log("Signup error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating the account",
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account has been disabled",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong while logging in",
    });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",

      path: "/",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout error:", error);

    return res.status(500).json({
      message: "Logout failed",
    });
  }
};


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


module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
};