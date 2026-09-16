import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";

export default function LeftSection() {
  return (
    <Box
      sx={{
        py: { xs: 7, md: 10 },
        bgcolor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 5, md: 8 }}
          alignItems="center"
        >
          {/* IMAGE */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: { xs: 2, md: 4 },
              }}
            >
              <Box
                component="img"
                src="/media/images/candlestick-chart.svg"
                alt="Trading platform"
                sx={{
                  width: "100%",
                  maxWidth: 480,
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>

          {/* CONTENT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                sx={{
                  color: "#82a900",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  mb: 1.5,
                }}
              >
                TRADING PLATFORM
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 32, md: 42 },
                  lineHeight: 1.15,
                  fontWeight: 600,
                  color: "#222",
                  mb: 2,
                }}
              >
                Trade with confidence.
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  fontSize: 16,
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                Access the markets with a simple and powerful trading
                experience. Track stocks, monitor price movements, and manage
                your investments from one place.
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  fontSize: 16,
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                Get real-time market information, explore stock performance,
                and make informed decisions with tools designed for modern
                investors.
              </Typography>

              <Button
                component={Link}
                to="/signup"
                endIcon={<ArrowOutwardIcon />}
                sx={{
                  color: "#387ed1",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 0,

                  "&:hover": {
                    bgcolor: "transparent",
                    color: "#245f9e",
                  },
                }}
              >
                Start Trading
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}