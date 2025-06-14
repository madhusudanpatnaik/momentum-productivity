
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Star className="h-1 w-1 text-white opacity-70 fill-current" />
          </div>
        ))}
      </div>

      {/* Gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white/80">Goal Quest</h3>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Work deeper,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              achieve better
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Gamify your MVP journey. Built for founders, entrepreneurs, builders, and anyone who wants to get things done.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-purple-400 rounded-sm"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Gamified Progress</h3>
              <p className="text-white/60">Turn your goals into an engaging game with rewards and achievements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-pink-400 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Track Everything</h3>
              <p className="text-white/60">Monitor revenue, projects, and personal goals in one place</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-indigo-400 rounded-lg"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Stay Motivated</h3>
              <p className="text-white/60">Daily streaks, quotes, and reminders keep you on track</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
