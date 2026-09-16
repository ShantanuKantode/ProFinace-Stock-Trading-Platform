import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  SearchOutlined,
  ConfirmationNumberOutlined,
  ArrowForwardOutlined,
  TrendingUpOutlined,
  MenuBookOutlined,
  AccountBalanceOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

function Hero() {
  const quickLinks = [
    {
      title: "Track account opening",
      icon: AccountBalanceOutlined,
      link: "/support/account-opening",
    },
    {
      title: "Track segment activation",
      icon: ConfirmationNumberOutlined,
      link: "/support/segment-activation",
    },
    {
      title: "Intraday margins",
      icon: TrendingUpOutlined,
      link: "/support/intraday-margins",
    },
    {
      title: "Trading platform manual",
      icon: MenuBookOutlined,
      link: "/support/user-manual",
    },
  ];

  const featuredArticles = [
    {
      title: "Current Takeovers and Delisting",
      date: "Market Updates",
      link: "/support/takeovers-delisting",
    },
    {
      title: "Latest Intraday Leverages",
      date: "Trading Updates",
      link: "/support/intraday-leverages",
    },
    {
      title: "Understanding Your Trading Account",
      date: "Account Guide",
      link: "/support/trading-account",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        minHeight: "70vh",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="lg">

        {/* SUPPORT HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            px: { xs: 2, md: 3 },
            py: 2,

            borderBottom: "1px solid #eeeeee",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#c4ff00",
              }}
            />

            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 600,
                color: "#111111",
              }}
            >
              Pro Finance Support
            </Typography>
          </Box>

          <Box
            component={Link}
            to="/support/tickets"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,

              textDecoration: "none",
              color: "#555555",

              fontSize: 14,

              "&:hover": {
                color: "#111111",
              },
            }}
          >
            <ConfirmationNumberOutlined
              sx={{
                fontSize: 18,
              }}
            />

            Track Tickets
          </Box>
        </Box>

        {/* HERO */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            p: { xs: 3, md: 6 },

            borderRadius: "24px",

            bgcolor: "#111111",

            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* LIME DECORATION */}
          <Box
            sx={{
              position: "absolute",

              width: { xs: 180, md: 300 },
              height: { xs: 180, md: 300 },

              right: { xs: -80, md: -70 },
              top: { xs: -70, md: -100 },

              borderRadius: "50%",

              bgcolor: "#c4ff00",

              opacity: 0.9,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: 780,
              mx: "auto",
              textAlign: "center",
            }}
          >
            {/* LABEL */}
            <Typography
              sx={{
                color: "#c4ff00",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Help Center
            </Typography>

            {/* TITLE */}
            <Typography
              component="h1"
              sx={{
                color: "#ffffff",

                fontSize: {
                  xs: 32,
                  sm: 42,
                  md: 52,
                },

                fontWeight: 700,

                lineHeight: 1.1,

                letterSpacing: "-1.5px",

                mb: 2,
              }}
            >
              How can we help you?
            </Typography>

            <Typography
              sx={{
                color: "#aaaaaa",

                fontSize: {
                  xs: 14,
                  md: 16,
                },

                lineHeight: 1.7,

                maxWidth: 600,

                mx: "auto",

                mb: 4,
              }}
            >
              Search our help center to find answers about trading,
              investments, accounts, payments and more.
            </Typography>

            {/* SEARCH */}
            <TextField
              fullWidth
              placeholder="Eg. How do I activate F&O?"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined
                      sx={{
                        color: "#777777",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: 650,

                "& .MuiOutlinedInput-root": {
                  height: 60,

                  bgcolor: "#ffffff",

                  borderRadius: "14px",

                  "& fieldset": {
                    border: "none",
                  },

                  "&:hover fieldset": {
                    border: "none",
                  },

                  "&.Mui-focused fieldset": {
                    border: "2px solid #c4ff00",
                  },
                },

                "& input": {
                  fontSize: 14,
                },
              }}
            />
          </Box>
        </Box>

        {/* QUICK LINKS + FEATURED */}
        <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          sx={{
            mt: { xs: 3, md: 5 },
          }}
        >

          {/* QUICK LINKS */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: {
                    xs: 22,
                    md: 28,
                  },

                  fontWeight: 600,

                  color: "#111111",

                  mb: 1,
                }}
              >
                Popular topics
              </Typography>

              <Box
                sx={{
                  width: 45,
                  height: 5,
                  bgcolor: "#c4ff00",
                  borderRadius: 10,
                  mb: 3,
                }}
              />

              <Grid
                container
                spacing={2}
              >
                {quickLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Grid
                      key={item.title}
                      size={{ xs: 12, sm: 6 }}
                    >
                      <Box
                        component={Link}
                        to={item.link}
                        sx={{
                          textDecoration: "none",

                          display: "flex",
                          alignItems: "center",
                          gap: 2,

                          p: 2,

                          border: "1px solid #e8e8e8",
                          borderRadius: "14px",

                          color: "#111111",

                          transition:
                            "all 0.25s ease",

                          "&:hover": {
                            transform:
                              "translateY(-3px)",
                            borderColor:
                              "#c4ff00",
                            boxShadow:
                              "0 10px 25px rgba(0,0,0,0.06)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            minWidth: 42,
                            width: 42,
                            height: 42,

                            borderRadius: "11px",

                            bgcolor: "#efffc2",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            sx={{
                              fontSize: 21,
                              color: "#111111",
                            }}
                          />
                        </Box>

                        <Typography
                          sx={{
                            flex: 1,
                            fontSize: 13.5,
                            fontWeight: 500,
                          }}
                        >
                          {item.title}
                        </Typography>

                        <ArrowForwardOutlined
                          sx={{
                            fontSize: 18,
                            color: "#999999",
                          }}
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>

          {/* FEATURED */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: "100%",

                p: {
                  xs: 3,
                  md: 3.5,
                },

                bgcolor: "#f8f8f8",

                borderRadius: "18px",

                border: "1px solid #eeeeee",
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#111111",
                  mb: 1,
                }}
              >
                Featured
              </Typography>

              <Box
                sx={{
                  width: 40,
                  height: 5,
                  bgcolor: "#c4ff00",
                  borderRadius: 10,
                  mb: 2.5,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {featuredArticles.map((article, index) => (
                  <Box
                    key={article.title}
                    component={Link}
                    to={article.link}
                    sx={{
                      textDecoration: "none",

                      display: "flex",
                      alignItems: "center",

                      gap: 1.5,

                      py: 1.5,

                      borderBottom:
                        index !==
                        featuredArticles.length - 1
                          ? "1px solid #e5e5e5"
                          : "none",

                      "&:hover .article-title": {
                        color: "#111111",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,

                        flexShrink: 0,

                        borderRadius: "8px",

                        bgcolor: "#111111",

                        color: "#c4ff00",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {index + 1}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        className="article-title"
                        sx={{
                          fontSize: 13.5,
                          fontWeight: 500,
                          color: "#444444",
                          lineHeight: 1.4,
                        }}
                      >
                        {article.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "#999999",
                          mt: 0.4,
                        }}
                      >
                        {article.date}
                      </Typography>
                    </Box>

                    <ArrowForwardOutlined
                      sx={{
                        fontSize: 17,
                        color: "#999999",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;