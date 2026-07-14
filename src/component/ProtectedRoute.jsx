import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkUser } from "../redux/Api";

const normalizeRole = (role = "") => role.toString().toLowerCase().replace(/\s+/g, "");

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let mounted = true;

    const verifySession = async () => {
      try {
        const response = await checkUser();
        const role = normalizeRole(response?.data?.user?.role);
        const allowed = allowedRoles.length === 0 || allowedRoles.includes(role);

        if (mounted) {
          setStatus(allowed ? "allowed" : "denied");
        }
      } catch {
        if (mounted) {
          setStatus("denied");
        }
      }
    };

    const handleAuthExpired = () => {
      if (mounted) {
        setStatus("denied");
      }
    };

    verifySession();
    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      mounted = false;
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, [allowedRoles]);

  if (status === "checking") {
    return null;
  }

  if (status !== "allowed") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
