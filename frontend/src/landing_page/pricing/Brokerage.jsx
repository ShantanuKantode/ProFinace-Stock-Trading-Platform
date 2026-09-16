import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Brokerage() {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        py: { xs: 6, md: 8 },
        borderTop: "1px solid #e5e5e5",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          alignItems="flex-start"
        >
          {/* Brokerage Calculator */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography
                component={Link}
                to="/brokerage-calculator"
                sx={{
                  display: "inline-block",
                  textDecoration: "none",
                  color: "#111111",
                  fontSize: { xs: "18px", md: "20px" },
                  fontWeight: 600,
                  mb: 2,

                  "&:hover": {
                    color: "#111111",
                    textDecoration: "underline",
                    textDecorationColor: "#c4ff00",
                    textDecorationThickness: "3px",
                    textUnderlineOffset: "5px",
                  },
                }}
              >
                Brokerage calculator
              </Typography>

              <Box
                component="ul"
                sx={{
                  m: 0,
                  pl: 3,
                  color: "#777777",
                  fontSize: "13px",
                  lineHeight: 2,
                  "& li": {
                    mb: 0.8,
                  },
                }}
              >
                <li>
                  Call & Trade and RMS auto-squareoff: Additional charges of
                  ₹50 + GST per order.
                </li>

                <li>
                  Digital contract notes will be sent via e-mail.
                </li>

                <li>
                  Physical copies of contract notes, if required, shall be
                  charged ₹20 per contract note. Courier charges apply.
                </li>

                <li>
                  For NRI account (non-PIS), 0.5% or ₹100 per executed order
                  for equity (whichever is lower).
                </li>

                <li>
                  For NRI account (PIS), 0.5% or ₹200 per executed order
                  for equity (whichever is lower).
                </li>

                <li>
                  If the account is in debit balance, any order placed will
                  be charged ₹40 per executed order instead of ₹20 per
                  executed order.
                </li>
              </Box>
            </Box>
          </Grid>

          {/* List of Charges */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography
                component={Link}
                to="/charges"
                sx={{
                  display: "inline-block",
                  textDecoration: "none",
                  color: "#111111",
                  fontSize: { xs: "18px", md: "20px" },
                  fontWeight: 600,

                  "&:hover": {
                    color: "#111111",
                    textDecoration: "underline",
                    textDecorationColor: "#c4ff00",
                    textDecorationThickness: "3px",
                    textUnderlineOffset: "5px",
                  },
                }}
              >
                List of charges
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "#777777",
                  fontSize: "13px",
                  lineHeight: 1.8,
                }}
              >
                View a complete breakdown of brokerage, taxes, and other
                applicable trading charges.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Brokerage;