import { Box, Container, Paper, Stack, Typography } from "@mui/material";

const features = [
  ["01", "Customer-first always", "Built around investors. Get simple, transparent and powerful tools designed to help you make better financial decisions."],
  ["02", "No spam or gimmicks", "No unnecessary notifications or confusing experiences. Just clean technology that helps you invest at your own pace."],
  ["03", "Your complete investment universe", "Stocks, ETFs, mutual funds and more — everything you need to build and manage a diversified portfolio."],
  ["04", "Do better with your money", "Powerful analytics and intelligent insights help you understand your investments and improve your strategy."],
];

function Stats() {
  return (
    <Box id="products" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ maxWidth: 720, mb: { xs: 6, md: 9 } }}>
          <Box sx={{ display: "inline-flex", width: "fit-content", px: 1.75, py: .9, borderRadius: 10, bgcolor: "#efffc4", fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>
            WHY PRO FINANCE
          </Box>
          <Typography component="h2" sx={{ fontSize: { xs: 44, md: 68 }, lineHeight: 1, letterSpacing: "-3px", fontWeight: 700, color: "#111" }}>
            Trust with <Box component="span" sx={{ color: "#baff00", WebkitTextStroke: "1px #111" }}>confidence.</Box>
          </Typography>
          <Typography sx={{ maxWidth: 620, color: "#777", fontSize: 17, lineHeight: 1.7 }}>
            Everything you need to invest smarter, manage your portfolio,
            and grow your wealth — all in one powerful platform.
          </Typography>
        </Stack>

        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-5">
            <Stack spacing={1}>
              {features.map(([number, title, text], i) => (
                <Paper
                  key={number}
                  elevation={0}
                  sx={{
                    p: 2.5, borderRadius: 2, bgcolor: i === 0 ? "#f7f7f5" : "transparent",
                    transition: "all .25s ease",
                    "&:hover": { bgcolor: "#f7f7f5", transform: "translateX(5px)" },
                  }}
                >
                  <Stack direction="row" spacing={2.5}>
                    <Box sx={{ minWidth: 38, width: 38, height: 38, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: i === 0 ? "#c4ff00" : "#f1f1f1", fontSize: 12, fontWeight: 700 }}>
                      {number}
                    </Box>
                    <Box>
                      <Typography fontWeight={700} fontSize={20} color="#111">{title}</Typography>
                      <Typography sx={{ mt: 1, maxWidth: 410, color: "#777", fontSize: 14, lineHeight: 1.7 }}>{text}</Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </div>

          <div className="col-12 col-lg-7">
            <Box sx={{ position: "relative", minHeight: { xs: 360, md: 570 }, display: "flex", alignItems: "center", justifyContent: "center", mt: { xs: 3, lg: 0 } }}>
              <Box sx={{ position: "absolute", width: "65%", height: "70%", right: "5%", top: "15%", bgcolor: "#c4ff00", borderRadius: "45% 20% 45% 20%", transform: "rotate(-8deg)" }} />
              <Box component="img" src="/media/images/ecosystem.png" alt="Pro Finance investment ecosystem" sx={{ position: "relative", width: "90%", maxWidth: 600, zIndex: 2, borderRadius: 3, filter: "drop-shadow(0 30px 50px rgba(0,0,0,.14))", transition: "transform .4s ease", "&:hover": { transform: "translateY(-8px)" } }} />
              <Paper elevation={8} sx={{ position: "absolute", right: { xs: 0, md: "2%" }, bottom: { xs: 0, md: "8%" }, zIndex: 5, width: { xs: 155, md: 190 }, p: { xs: 1.5, md: 2.25 }, borderRadius: 2, bgcolor: "#111", color: "#fff" }}>
                <Stack direction="row" justifyContent="space-between"><Typography fontSize={11} color="#999">Portfolio Value</Typography><Typography fontSize={11} color="#c4ff00">●</Typography></Stack>
                <Typography sx={{ mt: 1.5, fontSize: { xs: 17, md: 22 }, fontWeight: 600 }}>₹8,42,560</Typography>
                <Typography fontSize={12} fontWeight={600} color="#baff00">+₹24,860&nbsp;&nbsp; +3.04%</Typography>
              </Paper>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="center" mt={2}>
              {["Explore our products", "Explore trading"].map(text => (
                <Typography key={text} component="a" href="#" sx={{ color: "#111", textDecoration: "none", fontSize: 14, fontWeight: 700, "&:hover": { color: "#7ba900" } }}>
                  {text} <Box component="span" sx={{ color: "#7db500", ml: 1 }}>↗</Box>
                </Typography>
              ))}
            </Stack>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default Stats;
