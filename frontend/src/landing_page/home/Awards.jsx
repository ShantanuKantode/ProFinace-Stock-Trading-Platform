import { Box, Container, Typography } from "@mui/material";

function Awards() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6 p-md-4">
            <Box component="img" src="/media/images/StockGraph.png" alt="Stock Graph" sx={{ width: "100%", display: "block" }} />
          </div>
          <div className="col-12 col-md-6 p-md-4">
            <Typography component="h2" sx={{ fontSize: { xs: 34, md: 42 }, fontWeight: 700, color: "#111", letterSpacing: "-1.5px" }}>
              Trade in Real Time
            </Typography>
            <Typography sx={{ mt: 3, color: "#777", fontSize: 15, lineHeight: 1.8 }}>
              No more waiting. Your orders are executed immediately. The price
              of your securities is updated every second and ProFinance always
              has the most relevant information.
            </Typography>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default Awards;
