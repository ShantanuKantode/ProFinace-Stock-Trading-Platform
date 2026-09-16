import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

function Hero() {
  return (
    <Box id="home" sx={{ py: { xs: 4, md: 6, lg: 9 }, overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 5, md: 8 }, display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src="/media/images/heroHome.png"
            alt="Pro Finance"
            sx={{
              width: "100%",
              maxWidth: 1150,
              height: "auto",
              borderRadius: { xs: 2, md: 3 },
              boxShadow: "0 15px 45px rgba(0,0,0,.08)",
              transition: "transform .3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          />
        </Box>

        <Stack spacing={2.5} sx={{ maxWidth: 820, px: { xs: 1, md: 2 } }}>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: 38, sm: 46, md: 58 }, lineHeight: 1.08, fontWeight: 700, letterSpacing: "-2px", color: "#1f2937" }}
          >
            Invest in Everything
          </Typography>
          <Typography sx={{ maxWidth: 680, fontSize: { xs: 17, md: 19 }, lineHeight: 1.7, color: "#6b7280" }}>
            Online platform to invest in stocks, ETFs, mutual funds, and more.
            Build your portfolio and grow your wealth with Pro Finance.
          </Typography>
          <Box>
            <Button
              variant="contained"
              endIcon={<ArrowOutwardIcon />}
              href="/signup"
              sx={{
                bgcolor: "#141514", color: "#fff", px: 4, py: 1.6, borderRadius: 2,
                fontSize: 16, fontWeight: 600, textTransform: "none", boxShadow: "0 8px 20px rgba(34,197,94,.22)",
                "&:hover": { bgcolor: "#c4ff00", color: "#111", transform: "translateY(-3px)" },
              }}
            >
              Signup Now
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Hero;
