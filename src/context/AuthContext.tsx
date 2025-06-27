import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data); // ✅ sets global user
    } catch (err) {
      console.error("Auth error:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // fetch on page load
  }, []);

  const login = async () => {
    await fetchUser(); // called after login in AuthModal
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
