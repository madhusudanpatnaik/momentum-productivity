
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  // Redirect authenticated users to app
  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  return (
    <div className="relative">
      {/* Auth buttons in top right */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">
              Welcome, {user.email}
            </span>
            <Button
              onClick={() => navigate('/app')}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/auth')}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              className="btn-gradient text-black font-semibold"
              size="sm"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
      
      <Dashboard />
    </div>
  );
};

export default Index;
