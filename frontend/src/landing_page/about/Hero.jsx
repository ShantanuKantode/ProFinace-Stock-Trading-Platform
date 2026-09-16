import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";

function Hero() {
  return (
    <Container maxWidth="lg">

      {/* Heading */}
      <Box
        sx={{
          py: { xs: 5, md: 7 },
          mt: { xs: 3, md: 5 },
          mb: { xs: 3, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.7rem", md: "2rem" },
            fontWeight: 500,
            lineHeight: 1.4,
            color: "#222",
          }}
        >
          We are building a smarter way to understand and invest in the market
          <br />
          Powered by technology, data, and intelligent insights.
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          mt: { xs: 3, md: 5 },
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
        >

          {/* LEFT COLUMN */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ px: { xs: 0, md: 3 } }}>

              <Typography
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                Pro Finance is a modern stock trading and investment platform
                designed to make financial markets easier to understand and
                more accessible. Our goal is to bring powerful market data,
                portfolio tools, and intelligent insights together in one
                simple platform.
              </Typography>

              <Typography
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                We believe investing should not require complicated tools or
                endless research. Pro Finance provides real-time market
                information, stock tracking, portfolio insights, and an
                intuitive experience that helps investors make more informed
                decisions.
              </Typography>

              <Typography
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  color: "text.secondary",
                }}
              >
                From tracking your investments to discovering market
                opportunities, our platform is built to give traders and
                investors the information they need to understand the market
                and manage their portfolios with confidence.
              </Typography>

            </Box>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ px: { xs: 0, md: 3 } }}>

              <Typography
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                Pro Finance also brings intelligent features to the investing
                experience. Our AI-powered insights can analyze market
                information and portfolio data to help users discover stocks,
                understand opportunities, and make better-informed investment
                decisions.
              </Typography>

              <Typography
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                Explore our{" "}
                <Box
                  component={Link}
                  to="/products"
                  sx={{
                    textDecoration: "none",
                    color: "#387ed1",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  products and tools
                </Box>
                , designed to bring market tracking, portfolio management,
                intelligent recommendations, and trading insights into a
                single ecosystem.
              </Typography>

              <Typography
                sx={{
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  color: "text.secondary",
                }}
              >
                We are continuously improving Pro Finance with new technology,
                financial insights, and features that help users stay informed
                about the market. Our vision is to create a reliable,
                intelligent, and user-friendly platform for the next generation
                of investors.
              </Typography>

            </Box>
          </Grid>

        </Grid>
      </Box>

    </Container>
  );
}

export default Hero;