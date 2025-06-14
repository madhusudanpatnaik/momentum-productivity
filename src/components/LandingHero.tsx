
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Trophy, Zap, Star, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M ${200 + i * 40} 800 Q ${400 + i * 30} ${400 - i * 20} ${600 + i * 50} 0`}
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity={0.05 + (i * 0.04)}
              transform={`rotate(${-6 * i} ${400 + i * 20} 400)`}
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4 + i * 0.3}s`
              }}
            />
          ))}
        </svg>
      </div>

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
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-white font-bold text-2xl tracking-tight">
          <span className="gradient-text">GoalQuest</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300">How It Works</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</a>
          <Button 
            onClick={() => navigate('/app')}
            className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          {/* Trust badge */}
          <Badge className="mb-8 bg-white/10 text-white border-white/20 backdrop-blur-md px-4 py-2 text-sm">
            <Users className="w-4 h-4 mr-2" />
            Trusted by 10,000+ goal achievers
          </Badge>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your Goals into
            <br />
            <span className="gradient-text">Gamified Achievements</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Turn goal-setting into an engaging game. Track progress, earn XP, unlock achievements, 
            and build lasting habits with our comprehensive goal management platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button 
              onClick={() => navigate('/app')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-md transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-morphism border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Goal Tracking</h3>
              <p className="text-gray-400">Break down complex goals into actionable steps with intelligent progress tracking.</p>
            </div>

            <div className="glass-morphism border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Gamified Experience</h3>
              <p className="text-gray-400">Earn XP, unlock achievements, and level up as you complete your goals.</p>
            </div>

            <div className="glass-morphism border-white/20 p-6 rounded-2xl hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Habit Building</h3>
              <p className="text-gray-400">Build lasting habits with streak tracking and daily motivation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="glass-morphism border-white/20 rounded-3xl p-8 hover:border-white/40 transition-all duration-500">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Mock app interface */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold text-lg">Your Goals Dashboard</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Level 7</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">1,250 XP</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Complete Morning Workout</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/40">High</Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">75% complete</span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Zap className="w-3 h-3" />
                      <span>50 XP</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Learn React Patterns</span>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">Medium</Badge>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">40% complete</span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Zap className="w-3 h-3" />
                      <span>100 XP</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Daily Meditation</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="w-full bg-green-700/30 rounded-full h-2 mb-2">
                    <div className="bg-green-400 h-2 rounded-full w-full"></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400">Completed!</span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Zap className="w-3 h-3" />
                      <span>30 XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
