import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";


const AuthContext =
  createContext(null);


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  // =====================================================
  // Check Logged In User
  // =====================================================

  const fetchUser = async () => {

    try {

      console.log(
        "Checking authentication..."
      );


      const response =
        await axios.get(

          `${API_URL}/auth/me`,

          {
            withCredentials: true,
          }

        );


      console.log(
        "Authenticated user:",
        response.data.user
      );


      setUser(
        response.data.user
      );


    } catch (error) {

      console.error(
        "Authentication check failed:",

        error.response?.data ||
        error.message
      );


      setUser(null);


    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // Run Auth Check When Dashboard Opens
  // =====================================================

  useEffect(() => {

    fetchUser();

  }, []);


  // =====================================================
  // Logout
  // =====================================================

  const logout = async () => {

    try {

      await axios.post(

        `${API_URL}/auth/logout`,

        {},

        {
          withCredentials: true,
        }

      );


    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    } finally {

      setUser(null);


      const frontendURL =
        import.meta.env.VITE_FRONTEND_URL ||
        "http://localhost:5173";


      window.location.replace(
        `${frontendURL}/login`
      );

    }
  };


  return (

    <AuthContext.Provider
      value={{
        user,

        loading,

        logout,

        refreshUser:
          fetchUser,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};


// =====================================================
// Hook
// =====================================================

export const useAuth = () => {

  return useContext(
    AuthContext
  );

};