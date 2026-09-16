import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const stats = [["₹0", "Account opening"], ["₹0", "Equity delivery"], ["₹20", "Intraday & F&O"]];

function OpenAccount() {
  return (
    <Box sx={{ py: { xs: 7, md: 12 }, bgcolor: "#fff" }}>
      <Container maxWidth="xl">
        <Paper elevation={10} sx={{ position: "relative", overflow: "hidden", borderRadius: { xs: 3, md: 4 }, p: { xs: 4, md: 7 }, minHeight: 440, bgcolor: "#111", color: "#fff" }}>
          <Box sx={{ position: "absolute", width: 430, height: 430, right: -150, bottom: -190, borderRadius: "50%", bgcolor: "#c4ff00", opacity: .95 }} />
          <div className="row align-items-center g-5 position-relative">
            <div className="col-12 col-lg-8">
              <Stack spacing={2.5} sx={{ position: "relative", zIndex: 2, maxWidth: 650 }}>
                <Typography sx={{ display: "inline-flex", width: "fit-content", px: 1.75, py: .9, borderRadius: 10, bgcolor: "#c4ff00", color: "#111", fontSize: 10, fontWeight: 800, letterSpacing: 1.5 }}>START INVESTING TODAY</Typography>
                <Typography component="h2" sx={{ fontSize: { xs: 43, md: 62 }, lineHeight: 1.02, letterSpacing: "-3px", fontWeight: 700, color: "#fff" }}>
                  Your financial<br />journey starts <Box component="span" sx={{ color: "#c4ff00" }}>here.</Box>
                </Typography>
                <Typography sx={{ maxWidth: 570, color: "#999", fontSize: 15, lineHeight: 1.8 }}>
                  Join Pro Finance and get access to powerful trading tools, real-time market data, smart insights, and everything you need to build your investment portfolio.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}>
                  <Button variant="contained" href="/signup" endIcon={<ArrowOutwardIcon />} sx={{ bgcolor: "#c4ff00", color: "#111", px: 2.5, py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: "#b5ee00", transform: "translateY(-3px)" } }}>Open your account</Button>
                  <Typography fontSize={11} color="#777">Free to get started</Typography>
                </Stack>
              </Stack>
            </div>
            <div className="col-12 col-lg-4">
              <Paper elevation={0} sx={{ position: "relative", zIndex: 3, p: 2.5, border: "1px solid rgba(255,255,255,.1)", borderRadius: 2.25, bgcolor: "rgba(255,255,255,.05)", backdropFilter: "blur(10px)" }}>
                {stats.map(([value, label], i) => (
                  <Box key={label} sx={{ py: 2, borderBottom: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
                    <Typography fontSize={25} fontWeight={600} color="#c4ff00">{value}</Typography>
                    <Typography fontSize={11} color="#999">{label}</Typography>
                  </Box>
                ))}
              </Paper>
            </div>
          </div>
        </Paper>
      </Container>
    </Box>
  );
}

export default OpenAccount;
