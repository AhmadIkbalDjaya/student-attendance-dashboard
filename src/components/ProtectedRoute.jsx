import { isAuthenticated } from "../services/authService";
import { Navigate } from "react-router-dom";
import { showMessage } from "../utils/messageUtils";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  useEffect(() => {
    if (!isAuthenticated()) {
      showMessage({ type: "error", content: "You are not logged in" });
    }
  }, []);
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}
