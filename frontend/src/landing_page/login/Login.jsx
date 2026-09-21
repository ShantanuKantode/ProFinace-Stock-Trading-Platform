import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Link,
} from "react-router-dom";

import axios from "axios";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL ||
  "http://localhost:5174";


const Login = () => {

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const [error, setError] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  // =====================================================
  // Handle Input
  // =====================================================

  const handleChange = (event) => {

    setFormData({
      ...formData,

      [event.target.name]:
        event.target.value,
    });

  };


  // =====================================================
  // Login
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);


    try {

      console.log(
        "Login request started..."
      );


      const response =
        await axios.post(

          `${API_URL}/auth/login`,

          {
            email:
              formData.email.trim(),

            password:
              formData.password,
          },

          {
            withCredentials: true,
          }

        );


      console.log(
        "Login successful:",
        response.data
      );


      console.log(
        "Redirecting to dashboard:",
        DASHBOARD_URL
      );


      // IMPORTANT
      // Move to the separate dashboard application
      window.location.replace(
        DASHBOARD_URL
      );


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Login failed. Please check your email and password."
      );


    } finally {

      setLoading(false);

    }
  };


  return (

    <Box
      sx={{
        minHeight: "75vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        py: 8,

        bgcolor: "#f8f8f5",
      }}
    >

      <Container maxWidth="sm">

        <Paper
          elevation={4}

          sx={{
            p: {
              xs: 3,
              md: 5,
            },

            borderRadius: 3,
          }}
        >

          <Stack spacing={3}>

            <Box>

              <Typography
                variant="h4"
                fontWeight={800}
              >
                Welcome back
              </Typography>


              <Typography
                color="text.secondary"
                mt={1}
              >
                Login to access your
                Pro Finance dashboard.
              </Typography>

            </Box>


            {error && (

              <Alert severity="error">
                {error}
              </Alert>

            )}


            <Box
              component="form"
              onSubmit={handleSubmit}
            >

              <Stack spacing={2.2}>

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />


                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                />


                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth

                  sx={{
                    bgcolor: "#c4ff00",

                    color: "#111",

                    py: 1.5,

                    fontWeight: 700,

                    boxShadow: "none",

                    "&:hover": {
                      bgcolor: "#b5ee00",

                      boxShadow: "none",
                    },
                  }}
                >

                  {loading
                    ? "Logging in..."
                    : "Login"}

                </Button>

              </Stack>

            </Box>


            <Typography
              textAlign="center"
              color="text.secondary"
            >

              Don't have an account?{" "}

              <Box
                component={Link}
                to="/signup"

                sx={{
                  color: "#111",

                  fontWeight: 700,

                  textDecoration: "none",

                  "&:hover": {
                    textDecoration:
                      "underline",
                  },
                }}
              >
                Create account
              </Box>

            </Typography>

          </Stack>

        </Paper>

      </Container>

    </Box>

  );
};


export default Login;