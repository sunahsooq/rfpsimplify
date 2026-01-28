import { Navigate } from "react-router-dom";

// Redirect root to login page
const Index = () => {
  return <Navigate to="/login" replace />;
};

export default Index;
