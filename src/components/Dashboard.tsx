import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page min-h-screen relative overflow-hidden">
      {/* Enhanced stars background with multiple layers */}
      <div className="absolute inset-0">
        {/* Primary stars */}
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          >
            <div 
              className="w-0.5 h-0.5 bg-white rounded-full opacity-80"
              style={{
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.9)'
              }}
            />
          </div>
        ))}
        
        {/* Larger accent stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          >
            <div 
              className="w-1 h-1 bg-neon-blue rounded-full opacity-60"
              style={{
                boxShadow: '0 0 8px rgba(0, 212, 255, 0.7)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      {/* Premium top navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-white font-bold text-2xl tracking-tight">
          <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Goal Quest
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">Pricing</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">About</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-400/60 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/40 font-medium transition-all duration-300"
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Enhanced main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Premium badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
            <Zap className="w-4 h-4 text-neon-blue mr-2" />
            <span className="text-sm text-gray-200 font-medium">Gamified Productivity Platform</span>
          </div>

          {/* Enhanced headline with premium typography */}
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
              Work deeper,
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent">
              sleep better
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Transform your productivity with our gamified platform. Built for founders, entrepreneurs, and anyone ready to achieve their most ambitious goals.
          </p>

          {/* Premium CTA section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/app')}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Start Your Quest
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Premium feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Target className="w-8 h-8 text-neon-blue mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Goal Tracking</h3>
              <p className="text-gray-400 text-center text-sm">Set, track, and achieve your most important objectives with precision</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Trophy className="w-8 h-8 text-neon-yellow mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
              <p className="text-gray-400 text-center text-sm">Unlock rewards and celebrate milestones in your journey</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Zap className="w-8 h-8 text-neon-purple mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Progress Boost</h3>
              <p className="text-gray-400 text-center text-sm">Accelerate your progress with smart insights and motivation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
