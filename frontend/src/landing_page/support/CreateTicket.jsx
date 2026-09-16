import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  PersonAddAltOutlined,
  AccountBalanceOutlined,
  TrendingUpOutlined,
  PaymentsOutlined,
  SecurityOutlined,
  SupportAgentOutlined,
  SearchOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

function CreateTicket() {
  const supportCategories = [
    {
      icon: PersonAddAltOutlined,
      title: "Account Opening",
      description: "Get help with creating and setting up your trading account.",
      links: [
        "Online Account Opening",
        "KYC & Verification",
        "Account Activation",
        "Profile Setup",
        "NRI Account",
      ],
    },

    {
      icon: AccountBalanceOutlined,
      title: "Funds & Payments",
      description: "Manage deposits, withdrawals and your trading balance.",
      links: [
        "Add Funds",
        "Withdraw Funds",
        "Payment Issues",
        "Bank Account",
        "Transaction History",
      ],
    },

    {
      icon: TrendingUpOutlined,
      title: "Trading & Orders",
      description: "Learn about placing orders and managing your trades.",
      links: [
        "Place an Order",
        "Order Types",
        "Order Status",
        "Intraday Trading",
        "Portfolio Management",
      ],
    },

    {
      icon: PaymentsOutlined,
      title: "Charges & Pricing",
      description: "Understand brokerage, taxes and applicable trading charges.",
      links: [
        "Brokerage Charges",
        "Transaction Charges",
        "Intraday Charges",
        "Delivery Charges",
        "Pricing Details",
      ],
    },

    {
      icon: SecurityOutlined,
      title: "Security & Account",
      description: "Protect your account and manage your security settings.",
      links: [
        "Login Issues",
        "Password Reset",
        "Two-Factor Authentication",
        "Account Security",
        "Privacy Settings",
      ],
    },

    {
      icon: SupportAgentOutlined,
      title: "General Support",
      description: "Can't find what you're looking for? We're here to help.",
      links: [
        "Technical Support",
        "App Related Issues",
        "Report a Problem",
        "Contact Support",
        "Frequently Asked Questions",
      ],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        minHeight: "100vh",
        py: { xs: 5, md: 9 },
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 750,
            mx: "auto",
            mb: { xs: 5, md: 7 },
          }}
        >
          {/* SMALL LABEL */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              bgcolor: "#efffc2",
              borderRadius: "50px",
              px: 2,
              py: 0.8,
              mb: 2,
            }}
          >
            <SupportAgentOutlined
              sx={{
                fontSize: 18,
                color: "#111111",
                mr: 0.8,
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#111111",
              }}
            >
              PRO FINANCE SUPPORT
            </Typography>
          </Box>

          {/* TITLE */}
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: 34,
                sm: 42,
                md: 52,
              },
              fontWeight: 700,
              color: "#111111",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            How can we help you?
          </Typography>

          <Typography
            sx={{
              color: "#777777",
              fontSize: {
                xs: 15,
                md: 17,
              },
              lineHeight: 1.7,
              maxWidth: 620,
              mx: "auto",
              mb: 4,
            }}
          >
            Find answers to your questions about trading, investments,
            account management, payments and more.
          </Typography>

          {/* SEARCH */}
          <TextField
            fullWidth
            placeholder="Search for a topic or question..."
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
              maxWidth: 620,

              "& .MuiOutlinedInput-root": {
                height: 58,
                borderRadius: "14px",
                bgcolor: "#ffffff",

                "& fieldset": {
                  borderColor: "#e4e4e4",
                },

                "&:hover fieldset": {
                  borderColor: "#c4ff00",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#c4ff00",
                  borderWidth: 2,
                },
              },

              "& input": {
                fontSize: 14,
              },
            }}
          />
        </Box>

        {/* SECTION TITLE */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 600,
              color: "#111111",
              letterSpacing: "-0.5px",
            }}
          >
            Select a relevant topic
          </Typography>

          <Box
            sx={{
              width: 45,
              height: 5,
              bgcolor: "#c4ff00",
              borderRadius: 10,
              mt: 1.5,
            }}
          />
        </Box>

        {/* SUPPORT CARDS */}
        <Grid
          container
          spacing={{ xs: 2.5, md: 3 }}
        >
          {supportCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Grid
                key={category.title}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    minHeight: 370,

                    p: {
                      xs: 3,
                      md: 3.5,
                    },

                    border: "1px solid #e8e8e8",
                    borderRadius: "18px",

                    bgcolor: "#ffffff",

                    display: "flex",
                    flexDirection: "column",

                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "#d8e99a",
                      boxShadow:
                        "0 18px 40px rgba(0,0,0,0.07)",
                    },
                  }}
                >
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",

                      bgcolor: "#efffc2",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      mb: 2.5,

                      transition:
                        "transform 0.3s ease",

                      "&:hover": {
                        transform: "rotate(-5deg) scale(1.05)",
                      },
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 27,
                        color: "#111111",
                      }}
                    />
                  </Box>

                  {/* TITLE */}
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#111111",
                      mb: 1,
                    }}
                  >
                    {category.title}
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography
                    sx={{
                      color: "#777777",
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      mb: 2.5,
                    }}
                  >
                    {category.description}
                  </Typography>

                  {/* LINKS */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {category.links.map((item) => (
                      <Box
                        key={item}
                        component={Link}
                        to={`/support/${item
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")}`}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",

                          textDecoration: "none",

                          color: "#555555",

                          fontSize: 13,

                          py: 0.5,

                          transition:
                            "color 0.2s ease, padding 0.2s ease",

                          "&:hover": {
                            color: "#111111",
                            pl: 0.5,
                          },
                        }}
                      >
                        <span>{item}</span>

                        <ArrowForwardIosOutlined
                          sx={{
                            fontSize: 12,
                            color: "#999999",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* BOTTOM SUPPORT BANNER */}
        <Box
          sx={{
            mt: { xs: 5, md: 7 },

            p: {
              xs: 3,
              md: 4,
            },

            borderRadius: "18px",

            bgcolor: "#111111",

            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },

            alignItems: {
              xs: "flex-start",
              md: "center",
            },

            justifyContent: "space-between",

            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: {
                  xs: 20,
                  md: 23,
                },
                fontWeight: 600,
                mb: 0.7,
              }}
            >
              Still need help?
            </Typography>

            <Typography
              sx={{
                color: "#aaaaaa",
                fontSize: 13.5,
              }}
            >
              Our support team is ready to help you.
            </Typography>
          </Box>

          <Box
            component={Link}
            to="/contact"
            sx={{
              textDecoration: "none",

              display: "inline-flex",
              alignItems: "center",
              gap: 1,

              bgcolor: "#c4ff00",
              color: "#111111",

              px: 2.5,
              py: 1.3,

              borderRadius: "10px",

              fontSize: 14,
              fontWeight: 600,

              transition:
                "transform 0.2s ease",

              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Contact Support

            <ArrowForwardIosOutlined
              sx={{
                fontSize: 14,
              }}
            />
          </Box>
        </Box>

      </Container>
    </Box>
  );
}

export default CreateTicket;