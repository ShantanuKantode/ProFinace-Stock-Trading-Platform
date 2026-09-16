import { useState } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";

const links = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Pricing", "/pricing"],
  ["Support", "/support"],
  ["About", "/about"],
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,.96)",
          color: "#111",
          borderBottom: "1px solid #eeeeea",
          backdropFilter: "blur(14px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: 72, md: 90 } }}
          >

            {/* LOGO */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                mr: { xs: 0, md: 5 },
              }}
            >
              <Box
                component="img"
                src="/media/images/logo.svg"
                alt="Pro Finance"
                sx={{
                  width: { xs: 135, md: 155 },
                  display: "block",
                }}
              />
            </Box>

            {/* DESKTOP NAVIGATION */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                display: { xs: "none", md: "flex" },
                ml: "auto",
              }}
            >
              {links.map(([label, path], index) => (
                <Button
                  key={label}
                  component={Link}
                  to={path}
                  sx={{
                    px: 2,
                    py: 1.5,
                    color: index === 0 ? "#111" : "#555",
                    fontWeight: index === 0 ? 700 : 500,
                    textTransform: "none",
                    borderRadius: 1,

                    "&:hover": {
                      color: "#111",
                      bgcolor: "#f7f7f5",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>

            {/* RIGHT SIDE */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                ml: 3,
                display: { xs: "none", md: "flex" },
              }}
            >

              {/* MARKET STATUS */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  bgcolor: "#f5f5f2",
                  borderRadius: 10,
                  color: "#666",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#82b000",
                    boxShadow:
                      "0 0 0 4px rgba(196,255,0,.2)",
                  }}
                />

                Market Open
              </Box>

              {/* LOGIN */}
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#333",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Login
              </Button>

              {/* GET STARTED */}
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                endIcon={<TrendingUpIcon />}
                sx={{
                  bgcolor: "#c4ff00",
                  color: "#111",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2.5,
                  py: 1.4,
                  boxShadow: "none",

                  "&:hover": {
                    bgcolor: "#b5ee00",
                    boxShadow:
                      "0 10px 25px rgba(150,190,0,.22)",
                  },
                }}
              >
                Get Started
              </Button>
            </Stack>

            {/* MOBILE MENU */}
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                ml: "auto",
                border: "1px solid #e5e5e2",
                borderRadius: 2,
              }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            width: { xs: "82vw", sm: 360 },
            p: 3,
          }}
          role="presentation"
        >

          {/* DRAWER HEADER */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography fontWeight={800}>
              Pro Finance
            </Typography>

            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* MOBILE LINKS */}
          <Stack spacing={1}>
            {links.map(([label, path]) => (
              <Button
                key={label}
                component={Link}
                to={path}
                onClick={() => setOpen(false)}
                sx={{
                  justifyContent: "flex-start",
                  color: "#222",
                  py: 1.5,
                  textTransform: "none",
                  fontSize: 16,
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>

          {/* MOBILE LOGIN / SIGNUP */}
          <Stack
            direction="row"
            spacing={1.5}
            mt={3}
          >
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to="/login"
              onClick={() => setOpen(false)}
              sx={{
                textTransform: "none",
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/signup"
              onClick={() => setOpen(false)}
              sx={{
                bgcolor: "#c4ff00",
                color: "#111",
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Get Started
            </Button>
          </Stack>

        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;