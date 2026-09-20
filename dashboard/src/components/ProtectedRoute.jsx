
import React from "react";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait until authentication check is completed
  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  // If authentication failed
  if (!user) {
    const frontendURL =
      import.meta.env.VITE_FRONTEND_URL ||
      "http://localhost:5173";

    const currentURL = window.location.href;

    window.location.replace(
      `${frontendURL}/login?redirect=${encodeURIComponent(
        currentURL
      )}`
    );

    return null;
  }

  // Authentication successful
  return children;
}

export default ProtectedRoute;

