import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";


const AuthContext = createContext(null);


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3002";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);


  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);


  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } finally {
      setUser(null);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthContext;