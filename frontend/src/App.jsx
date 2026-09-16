
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./landing_page/Navbar";
import HomePage from "./landing_page/home/HomePage";
import Footer from "./landing_page/Footer";

import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import Signup from "./landing_page/signup/Signup";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound from "./NotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c4ff00",
      contrastText: "#111111",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#111111",
      secondary: "#777777",
    },
  },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',

    button: {
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/products" element={<ProductsPage />} />

          <Route path="/pricing" element={<PricingPage />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/support" element={<SupportPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
