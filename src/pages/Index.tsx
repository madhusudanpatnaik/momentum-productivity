
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to app
  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  return <Dashboard />;
};

export default Index;
