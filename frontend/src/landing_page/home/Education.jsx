import { Box, Container, Paper, Stack, Typography, Button } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const lessons = [
  ["01", "Master the basics", "Learn stocks, ETFs, mutual funds, risk management, portfolio diversification, and other essential concepts through simple, beginner-friendly lessons.", "Start learning"],
  ["02", "Understand the market", "Follow market trends, understand company fundamentals, read charts, and discover how professional investors evaluate opportunities.", "Explore market insights"],
  ["03", "Practice before you invest", "Explore real-time market data and use our intelligent insights to understand potential opportunities without feeling overwhelmed.", "Explore learning hub"],
];

function Education() {
  return (
    <Box id="education" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ maxWidth: 750, mb: { xs: 6, md: 8 } }}>
          <Typography sx={{ display: "inline-flex", width: "fit-content", px: 1.75, py: .9, borderRadius: 10, bgcolor: "#c4ff00", color: "#111", fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>LEARN & GROW</Typography>
          <Typography component="h2" sx={{ fontSize: { xs: 44, md: 68 }, lineHeight: 1, letterSpacing: "-3px", fontWeight: 700, color: "#111" }}>
            Become a <Box component="span" sx={{ color: "#baff00", WebkitTextStroke: "1px #111" }}>smarter investor.</Box>
          </Typography>
          <Typography sx={{ maxWidth: 650, color: "#777", fontSize: 17, lineHeight: 1.7 }}>
            Understand the market before you invest. Learn the fundamentals, explore real market examples, and build the confidence to make better investment decisions.
          </Typography>
        </Stack>

        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <Box sx={{ position: "relative", minHeight: { xs: 380, md: 500 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ position: "absolute", width: { xs: 270, md: 370 }, height: { xs: 270, md: 370 }, borderRadius: "50%", bgcolor: "#c4ff00" }} />
              <Box component="img" src="/media/images/learningDash.svg" alt="Learn about investing" sx={{ position: "relative", width: "82%", maxWidth: 470, zIndex: 2, filter: "drop-shadow(0 25px 35px rgba(0,0,0,.12))", transition: "transform .4s ease", "&:hover": { transform: "translateY(-8px) rotate(-1deg)" } }} />
              <Paper elevation={8} sx={{ position: "absolute", right: { xs: 0, md: "4%" }, bottom: "8%", zIndex: 5, p: 2, borderRadius: 2, bgcolor: "#111", color: "#fff" }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: "#c4ff00", color: "#111", fontWeight: 800 }}>✓</Box>
                  <Box><Typography fontSize={10} color="#999">Your progress</Typography><Typography fontSize={13} fontWeight={700} color="#c4ff00">72% Complete</Typography></Box>
                </Stack>
              </Paper>
            </Box>
          </div>

          <div className="col-12 col-lg-6">
            <Stack spacing={1.5}>
              {lessons.map(([num, title, text, link]) => (
                <Paper key={num} elevation={0} sx={{ p: 3, borderRadius: 2.25, border: "1px solid transparent", transition: "all .3s ease", "&:hover": { bgcolor: "#f7f7f5", borderColor: "#eeeeea", transform: "translateX(5px)" } }}>
                  <Stack direction="row" spacing={2.5}>
                    <Typography sx={{ minWidth: 38, color: "#777", fontSize: 13, fontWeight: 800 }}>{num}</Typography>
                    <Box>
                      <Typography fontSize={21} fontWeight={700} color="#111">{title}</Typography>
                      <Typography sx={{ mt: 1, color: "#777", fontSize: 14, lineHeight: 1.7 }}>{text}</Typography>
                      <Button href="#" endIcon={<ArrowOutwardIcon />} sx={{ mt: 1, p: 0, color: "#111", textTransform: "none", fontSize: 13, fontWeight: 700, "&:hover": { bgcolor: "transparent", color: "#7ba900" } }}>{link}</Button>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </div>
        </div>

        <Paper elevation={0} sx={{ mt: 7, p: { xs: 3, md: 4.5 }, borderRadius: 2.5, bgcolor: "#111", color: "#fff" }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={3}>
            <Box><Typography fontSize={10} fontWeight={800} letterSpacing={1.5} color="#c4ff00">PRO FINANCE LEARNING HUB</Typography><Typography sx={{ mt: 1, fontSize: { xs: 25, md: 32 }, fontWeight: 600 }}>Knowledge is your <Box component="strong" sx={{ color: "#c4ff00" }}>best investment.</Box></Typography></Box>
            <Button href="#" sx={{ color: "#c4ff00", fontWeight: 700, textTransform: "none" }}>Explore all resources →</Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Education;
