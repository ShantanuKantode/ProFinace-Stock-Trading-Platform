import { Box, Button, Card, CardContent, Container, Divider, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const plans = [
  { tag: "EQUITY", price: "₹0", title: "Equity Delivery", text: "Free equity delivery and direct mutual fund investments.", items: ["Zero delivery charges", "Direct mutual funds", "No hidden fees"] },
  { tag: "TRADING", price: "₹20", small: " / order", title: "Intraday & F&O", text: "Flat ₹20 or 0.03% per executed order, whichever is lower.", items: ["Flat pricing", "Intraday trading", "Futures & Options"], featured: true },
];

function Pricing() {
  return (
    <Box id="pricing" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={4} mb={8}>
          <Box>
            <Typography sx={{ display: "inline-block", px: 1.75, py: .9, borderRadius: 10, bgcolor: "#efffc4", fontSize: 11, fontWeight: 800, letterSpacing: 1.5 }}>SIMPLE & TRANSPARENT</Typography>
            <Typography component="h2" sx={{ mt: 2, fontSize: { xs: 44, md: 68 }, lineHeight: 1, letterSpacing: "-3px", fontWeight: 700, color: "#111" }}>
              Unbeatable <Box component="span" sx={{ color: "#baff00", WebkitTextStroke: "1px #111" }}>pricing.</Box>
            </Typography>
          </Box>
          <Typography sx={{ maxWidth: 500, color: "#777", fontSize: 16, lineHeight: 1.8, alignSelf: "end" }}>
            Invest more, pay less. No hidden charges, no complicated plans — just simple and transparent pricing designed for every investor.
          </Typography>
        </Stack>

        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-5">
            <Stack spacing={2.5} sx={{ pr: { lg: 5 } }}>
              <Box sx={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: "#efffc4", fontWeight: 800 }}>₹</Box>
              <Typography component="h3" sx={{ fontSize: { xs: 34, md: 40 }, lineHeight: 1.15, fontWeight: 700, color: "#111" }}>Invest without<br />unnecessary fees.</Typography>
              <Typography sx={{ color: "#777", fontSize: 15, lineHeight: 1.8 }}>We believe investing should be accessible to everyone. That's why we keep our pricing simple, transparent, and easy to understand.</Typography>
              <Button href="#" endIcon={<ArrowOutwardIcon />} sx={{ width: "fit-content", p: 0, color: "#111", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "transparent", color: "#7ba900" } }}>View complete pricing</Button>
            </Stack>
          </div>
          <div className="col-12 col-lg-7">
            <div className="row g-4">
              {plans.map(plan => (
                <div className="col-12 col-md-6" key={plan.tag}>
                  <Card
                    sx={{
                      position: "relative", height: "100%", minHeight: 430, borderRadius: 3, border: "1px solid #e7e7e4",
                      bgcolor: plan.featured ? "#c4ff00" : "#fff",
                      transform: { md: plan.featured ? "translateY(-12px)" : "none" },
                      transition: "all .3s ease",
                      "&:hover": { transform: plan.featured ? "translateY(-18px)" : "translateY(-7px)", boxShadow: "0 20px 45px rgba(0,0,0,.08)" },
                    }}
                  >
                    {plan.featured && <Box sx={{ position: "absolute", top: -14, right: 25, px: 1.5, py: .75, borderRadius: 10, bgcolor: "#111", color: "#c4ff00", fontSize: 9, fontWeight: 800, letterSpacing: 1 }}>MOST POPULAR</Box>}
                    <CardContent sx={{ p: 4, "&:last-child": { pb: 4 } }}>
                      <Stack direction="row" justifyContent="space-between" mb={5}>
                        <Typography fontSize={11} fontWeight={800} letterSpacing={1.5} color={plan.featured ? "#333" : "#777"}>{plan.tag}</Typography>
                        <Box sx={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: plan.featured ? "#111" : "#efffc4", color: plan.featured ? "#c4ff00" : "#111", fontWeight: 800 }}>₹</Box>
                      </Stack>
                      <Typography fontSize={48} fontWeight={700} lineHeight={1} color="#111">{plan.price}<Box component="small" sx={{ fontSize: 13, color: "#888", fontWeight: 400 }}>{plan.small}</Box></Typography>
                      <Typography fontSize={18} fontWeight={700} color="#111" mt={1}>{plan.title}</Typography>
                      <Typography sx={{ minHeight: 65, mt: 1.5, color: plan.featured ? "#222" : "#777", fontSize: 13, lineHeight: 1.7 }}>{plan.text}</Typography>
                      <Divider sx={{ my: 3, borderColor: plan.featured ? "rgba(0,0,0,.15)" : "#eeeeeb" }} />
                      <Stack spacing={1.5}>{plan.items.map(item => <Typography key={item} fontSize={13} color={plan.featured ? "#222" : "#555"}><Box component="span" sx={{ mr: 1, fontWeight: 800 }}>✓</Box>{item}</Typography>)}</Stack>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Box sx={{ mt: 5, p: { xs: 3, md: 4 }, borderRadius: 2.5, bgcolor: "#111", color: "#fff" }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={2}>
            <Box><Typography fontWeight={700} fontSize={17}>Transparent pricing. Always.</Typography><Typography color="#999" fontSize={12} mt={.5}>No surprises. No hidden charges.</Typography></Box>
            <Button href="#" sx={{ color: "#c4ff00", fontWeight: 700, textTransform: "none" }}>See all charges →</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Pricing;
