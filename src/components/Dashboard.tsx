
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
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
              className="w-0.5 h-0.5 bg-white rounded-full opacity-70"
              style={{
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Top navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-white font-semibold text-lg">
          Goal Quest
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-400 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight tracking-tight">
            Work deeper,
            <br />
            sleep better
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Gamify your productivity journey. Built for founders, entrepreneurs, and anyone who wants to achieve their goals.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-gray-200 text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
