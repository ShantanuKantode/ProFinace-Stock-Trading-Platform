import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#fff",
      }}
    >
      <Container>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "36px", md: "52px" },
            fontWeight: 500,
            lineHeight: 1.2,
            color: "#222",
            mb: 1,
          }}
        >
          404 Not Found
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#555",
            mb: 3,
          }}
        >
          Sorry, the page you are looking for does not exist.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            bgcolor: "#c4ff00",
            color: "#111",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#b5ee00",
              boxShadow: "none",
            },
          }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}

export default NotFound;