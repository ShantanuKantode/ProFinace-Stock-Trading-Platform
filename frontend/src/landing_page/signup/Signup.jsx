import React, { useState } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
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


const Signup = () => {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
  // Signup
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;
    }


    if (
      formData.password.length < 6
    ) {

      setError(
        "Password must contain at least 6 characters"
      );

      return;
    }


    setLoading(true);


    try {

      console.log(
        "Signup request started..."
      );


      const response =
        await axios.post(

          `${API_URL}/auth/signup`,

          {
            name:
              formData.name.trim(),

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
        "Signup successful:",
        response.data
      );


      console.log(
        "Redirecting to dashboard:",
        DASHBOARD_URL
      );


      // IMPORTANT
      window.location.replace(
        DASHBOARD_URL
      );


    } catch (error) {

      console.error(
        "Signup error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Signup failed"
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

        backgroundColor: "#f8f8f5",
      }}
    >

      <Container maxWidth="sm">

        <Paper
          elevation={4}

          sx={{
            padding: {
              xs: 3,
              sm: 5,
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
                Create your account
              </Typography>


              <Typography
                color="text.secondary"

                sx={{
                  mt: 1,
                }}
              >
                Start your investing
                journey with Pro Finance.
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
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />


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


                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={
                    formData.confirmPassword
                  }
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
                    backgroundColor:
                      "#c4ff00",

                    color: "#111",

                    paddingY: 1.5,

                    fontWeight: 700,

                    boxShadow: "none",

                    "&:hover": {
                      backgroundColor:
                        "#b5ee00",

                      boxShadow: "none",
                    },
                  }}
                >

                  {loading
                    ? "Creating account..."
                    : "Create Account"}

                </Button>

              </Stack>

            </Box>


            <Typography
              textAlign="center"
              color="text.secondary"
            >

              Already have an account?{" "}

              <Box
                component={Link}
                to="/login"

                sx={{
                  color: "#111",

                  fontWeight: 700,

                  textDecoration: "none",
                }}
              >
                Login
              </Box>

            </Typography>

          </Stack>

        </Paper>

      </Container>

    </Box>

  );
};


export default Signup;