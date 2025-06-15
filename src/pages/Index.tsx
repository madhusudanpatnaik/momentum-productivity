
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, Folder, Calendar } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/app');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Personal Management Hub
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Track your goals, manage investments, organize projects, and achieve your dreams all in one place.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="border-gray-700 text-white hover:bg-gray-800 text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">Goal Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Set, track, and achieve your personal and professional goals with milestone tracking and XP rewards.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Investment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Monitor your portfolio, track performance, and manage investment goals with real-time updates.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Folder className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Project Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Organize projects with task management, team collaboration, and progress tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
              <CardTitle className="text-white">Schedule Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Plan your time effectively with integrated calendar and task scheduling features.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
