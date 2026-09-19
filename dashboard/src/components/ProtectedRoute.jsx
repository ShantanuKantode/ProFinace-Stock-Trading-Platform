import React from "react";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    const frontendURL =
      import.meta.env.VITE_FRONTEND_URL ||
      "http://localhost:5173";

    const currentURL = window.location.href;

    window.location.href =
      `${frontendURL}/login?redirect=${encodeURIComponent(currentURL)}`;

    return null;
  }

  return children;
}

export default ProtectedRoute;