import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/" replace />;
};
