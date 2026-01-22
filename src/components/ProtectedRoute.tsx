import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

// Demo mode: No auth protection - all routes accessible without login
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return <>{children}</>;
};

export default ProtectedRoute;
