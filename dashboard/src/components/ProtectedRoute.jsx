import React from "react";

import {
  useAuth,
} from "../context/AuthContext";


function ProtectedRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useAuth();


  // =====================================================
  // Checking Authentication
  // =====================================================

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


  // =====================================================
  // Not Logged In
  // =====================================================

  if (!user) {

    const frontendURL =
      import.meta.env.VITE_FRONTEND_URL ||
      "http://localhost:5173";


    window.location.replace(
      `${frontendURL}/login`
    );


    return null;
  }


  // =====================================================
  // Logged In
  // =====================================================

  return children;
}


export default ProtectedRoute;