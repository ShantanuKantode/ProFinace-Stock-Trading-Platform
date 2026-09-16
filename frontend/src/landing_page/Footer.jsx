import { Box, Button, Container, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const columns = {
  Company: [["About us", "/about"], ["Products", "/product"], ["Pricing", "/pricing"], ["Careers", "#"], ["Press & Media", "#"]],
  Products: [["Stocks", "#"], ["ETFs", "#"], ["Mutual Funds", "#"], ["Trading", "#"], ["Portfolio", "#"]],
  Resources: [["Support Center", "/support"], ["Learning Hub", "/education"], ["Market Insights", "#"], ["API Documentation", "#"], ["Help Center", "#"]],
  Account: [["Open an account", "/signup"], ["Login", "/login"], ["Fund transfer", "#"], ["Account settings", "#"], ["Contact us", "#"]],
};

function Footer() {
  return (
    <Box component="footer" sx={{ pt: { xs: 7, md: 10 }, pb: 3, bgcolor: "#101010", color: "#fff" }}>
      <Container maxWidth="xl">
        <Paper elevation={0} sx={{ position: "relative", overflow: "hidden", p: { xs: 3, md: 5 }, mb: { xs: 6, md: 8 }, borderRadius: 3, bgcolor: "#c4ff00", color: "#111" }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={3} sx={{ position: "relative", zIndex: 2 }}>
            <Box><Typography fontSize={10} fontWeight={800} letterSpacing={1.5}>PRO FINANCE</Typography><Typography sx={{ mt: 1, fontSize: { xs: 28, md: 35 }, lineHeight: 1.1, fontWeight: 600 }}>Build your future.<br /><strong>Invest smarter.</strong></Typography></Box>
            <Button variant="contained" href="/signup" endIcon={<ArrowOutwardIcon />} sx={{ bgcolor: "#111", color: "#fff", textTransform: "none", fontWeight: 700, px: 2.5, py: 1.5, borderRadius: 2, boxShadow: "none", "&:hover": { bgcolor: "#222" } }}>Open an account</Button>
          </Stack>
        </Paper>

        <div className="row g-5 pb-5">
          <div className="col-12 col-lg-4">
            <Box sx={{ maxWidth: 310 }}>
              <Box sx={{ display: "inline-block", p: 1, borderRadius: 1, bgcolor: "#fff", mb: 2 }}>
                <Box component="img" src="/media/images/logo.svg" alt="Pro Finance" sx={{ width: 115, display: "block" }} />
              </Box>
              <Typography color="#858585" fontSize={13} lineHeight={1.8}>A smarter way to invest, trade, and manage your financial future. Powerful tools and insights built for modern investors.</Typography>
              <Stack direction="row" spacing={1} mt={2.5}>
                {["𝕏", "in", "◎", "◉"].map(icon => <Button key={icon} href="#" sx={{ minWidth: 34, width: 34, height: 34, p: 0, border: "1px solid #303030", borderRadius: "50%", color: "#999", "&:hover": { color: "#c4ff00", borderColor: "#c4ff00" } }}>{icon}</Button>)}
              </Stack>
            </Box>
          </div>
          {Object.entries(columns).map(([title, items]) => (
            <div className="col-6 col-md-3 col-lg-2" key={title}>
              <Typography fontSize={14} fontWeight={700} mb={2}>{title}</Typography>
              <Stack spacing={1.4}>{items.map(([label, href]) => <Typography key={label} component="a" href={href} sx={{ color: "#858585", textDecoration: "none", fontSize: 13, "&:hover": { color: "#c4ff00" } }}>{label}</Typography>)}</Stack>
            </div>
          ))}
        </div>

        <Divider sx={{ borderColor: "#292929" }} />

        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={3} py={5}>
          <Box><Typography fontSize={18} fontWeight={700}>Stay ahead of the market.</Typography><Typography color="#858585" fontSize={13} mt={1}>Get market insights, investing tips, and product updates delivered to your inbox.</Typography></Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ minWidth: { md: 420 } }}>
            <TextField fullWidth type="email" placeholder="Enter your email" size="small" sx={{ bgcolor: "#fff", borderRadius: 1, "& .MuiOutlinedInput-root": { borderRadius: 1 } }} />
            <Button variant="contained" sx={{ bgcolor: "#c4ff00", color: "#111", fontWeight: 700, textTransform: "none", px: 2.5, boxShadow: "none", "&:hover": { bgcolor: "#b5ee00" } }}>Subscribe →</Button>
          </Stack>
        </Stack>

        <Box sx={{ borderTop: "1px solid #292929", pt: 4 }}>
          <Stack spacing={1.5}>
            <Typography color="#666" fontSize={11}><strong>Risk Disclosure:</strong> Investments in securities markets are subject to market risks. Read all related documents carefully before investing. Past performance does not guarantee future returns.</Typography>
            <Typography color="#666" fontSize={11}>Pro Finance provides technology and investment tools to help users make informed decisions. We do not provide guaranteed returns or personalized investment advice unless explicitly stated.</Typography>
            <Typography color="#666" fontSize={11}>Before investing, carefully review the applicable terms, disclosures, fees, and regulatory information. Never share your account credentials, OTPs, or passwords with anyone.</Typography>
          </Stack>
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={2} mt={4} pt={3} borderTop="1px solid #292929">
          <Typography color="#666" fontSize={11}>© 2026 Pro Finance. All rights reserved.</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {["Privacy Policy", "Terms & Conditions", "Risk Disclosure"].map(x => <Typography key={x} component="a" href="#" sx={{ color: "#666", textDecoration: "none", fontSize: 11, "&:hover": { color: "#c4ff00" } }}>{x}</Typography>)}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
