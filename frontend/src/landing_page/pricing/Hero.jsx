import { Box, Container, Grid } from "@mui/material";

function Hero() {
  const pricingPlans = [
    {
      image: "/media/images/first_image.svg",
      title: "Equity Investing",
    },
    {
      image: "/media/images/second_image.svg",
      title: "Intraday Trading",
    },
    {
      image: "/media/images/third.svg",
      title: "Mutual Funds",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
        >
          {pricingPlans.map((plan) => (
            <Grid
              key={plan.title}
              size={{ xs: 12, md: 4 }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",

                  height: {
                    xs: 350,
                    sm: 400,
                    md: 430,
                  },

                  border: "1px solid #e8e8e8",
                  borderRadius: "22px",

                  bgcolor: "#ffffff",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  transition:
                    "transform 0.35s ease, box-shadow 0.35s ease",

                  "&:hover": {
                    transform: "translateY(-7px)",
                    boxShadow:
                      "0 20px 45px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                {/* LIME BACKGROUND SHAPE */}
                <Box
                  sx={{
                    position: "absolute",

                    width: {
                      xs: 250,
                      sm: 280,
                      md: 310,
                    },

                    height: {
                      xs: 250,
                      sm: 280,
                      md: 310,
                    },

                    right: {
                      xs: -70,
                      md: -65,
                    },

                    top: {
                      xs: 80,
                      md: 60,
                    },

                    borderRadius: "45% 55% 50% 50%",

                    bgcolor: "#c4ff00",

                    opacity: 0.9,

                    transform: "rotate(-12deg)",

                    zIndex: 0,
                  }}
                />

                {/* IMAGE ONLY */}
                <Box
                  component="img"
                  src={plan.image}
                  alt={plan.title}
                  sx={{
                    position: "relative",
                    zIndex: 1,

                    width: {
                      xs: "90%",
                      sm: "85%",
                      md: "90%",
                    },

                    height: {
                      xs: "90%",
                      sm: "90%",
                      md: "92%",
                    },

                    objectFit: "contain",

                    display: "block",

                    transform: "rotate(-2deg)",

                    transition:
                      "transform 0.4s ease",

                    "&:hover": {
                      transform:
                        "rotate(0deg) scale(1.04)",
                    },
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;