import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function Hero() {
  return (
    <Box
      sx={{
        py: { xs: 7, md: 12 },
        bgcolor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 5, md: 8 }}
          alignItems="center"
        >
          {/* LEFT CONTENT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.8,
                mb: 2,
                borderRadius: 10,
                bgcolor: "#c4ff00",
                color: "#111",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              SMART INVESTING
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 42, md: 58 },
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-2px",
                color: "#111",
                mb: 2.5,
              }}
            >
              Everything you need
              <br />
              to invest{" "}
              <Box component="span" sx={{ color: "#82a900" }}>
                smarter.
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 520,
                color: "#666",
                fontSize: 17,
                lineHeight: 1.7,
                mb: 3.5,
              }}
            >
              Track stocks, manage your portfolio, understand market trends,
              and discover intelligent investment insights — all from one
              powerful platform.
            </Typography>

            <Button
              component={Link}
              to="/signup"
              variant="contained"
              endIcon={<ArrowOutwardIcon />}
              sx={{
                bgcolor: "#c4ff00",
                color: "#111",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#b5ee00",
                  boxShadow: "none",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Start Investing
            </Button>
          </Grid>

          {/* RIGHT IMAGE */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: { xs: 2, md: 4 },
              }}
            >
              <Box
                component="img"
                src="/media/images/StockGraph.png"
                alt="Stock market graph"
                sx={{
                  width: "100%",
                  maxWidth: 550,
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}