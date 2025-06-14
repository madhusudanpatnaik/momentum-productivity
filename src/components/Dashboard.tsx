
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Trophy, Check, Users, BarChart3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page min-h-screen relative overflow-hidden">
      {/* Flowing curved lines pattern - inspired by uploaded images */}
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
          
          {[...Array(15)].map((_, i) => (
            <path
              key={`curve-${i}`}
              d={`M ${100 + i * 60} 800 Q ${300 + i * 40} ${500 - i * 25} ${700 + i * 30} 100`}
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity={0.03 + (i * 0.02)}
              transform={`rotate(${-3 * i} ${350 + i * 25} 450)`}
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${6 + i * 0.2}s`
              }}
            />
          ))}
        </svg>
      </div>

      {/* Enhanced stars background with multiple layers */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => (
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
        
        {[...Array(25)].map((_, i) => (
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
              className="w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Modern gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Premium top navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="text-white font-bold text-2xl tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
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
            className="border-gray-400/60 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/40 font-medium transition-all duration-300 backdrop-blur-sm"
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Enhanced main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Premium badge with modern styling */}
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-all duration-300">
            <Zap className="w-4 h-4 text-white mr-2" />
            <span className="text-sm text-gray-200 font-medium">Gamified Productivity Platform</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Work deeper,
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent">
              sleep better
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Transform your productivity with our gamified platform. Built for founders, entrepreneurs, and anyone ready to achieve their most ambitious goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/app')}
              className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-sm"
            >
              Start Your Quest
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-10 py-5 text-lg font-medium rounded-2xl transition-all duration-300 backdrop-blur-md hover:backdrop-blur-lg hover:border-white/50"
            >
              Watch Demo
            </Button>
          </div>

          {/* Premium feature highlights with modern design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-3 rounded-full bg-white/10 mb-6 group-hover:bg-white/20 transition-all duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Goal Tracking</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">Set, track, and achieve your most important objectives with precision</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-3 rounded-full bg-white/10 mb-6 group-hover:bg-white/20 transition-all duration-300">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Achievements</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">Unlock rewards and celebrate milestones in your journey</p>
            </div>
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-3 rounded-full bg-white/10 mb-6 group-hover:bg-white/20 transition-all duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Progress Boost</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">Accelerate your progress with smart insights and motivation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to transform your productivity and achieve your biggest goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-3 rounded-full bg-white/10 mb-6 w-fit group-hover:bg-white/20 transition-all duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Analytics Dashboard</h3>
              <p className="text-gray-400 leading-relaxed">Get deep insights into your productivity patterns and progress with beautiful visualizations and detailed reports.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-3 rounded-full bg-white/10 mb-6 w-fit group-hover:bg-white/20 transition-all duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Team Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">Work together with your team, share goals, and celebrate achievements collectively in a gamified environment.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-3 rounded-full bg-white/10 mb-6 w-fit group-hover:bg-white/20 transition-all duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Data Security</h3>
              <p className="text-gray-400 leading-relaxed">Your data is protected with enterprise-grade security, encrypted at rest and in transit with regular backups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your ambition. Start free, upgrade when you're ready to level up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Starter</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  $0<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
                <p className="text-gray-400">Perfect for getting started</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Up to 3 active goals
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Basic progress tracking
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Mobile app access
                </li>
              </ul>
              <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40">
                Get Started Free
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 relative hover:bg-white/15 hover:border-white/30 transition-all duration-300 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  $15<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
                <p className="text-gray-400">For serious goal achievers</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Unlimited goals & projects
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Team collaboration
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Priority support
                </li>
              </ul>
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                Start Pro Trial
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  $49<span className="text-lg font-normal text-gray-400">/month</span>
                </div>
                <p className="text-gray-400">For teams and organizations</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Advanced security
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Dedicated support
                </li>
              </ul>
              <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  About Goal Quest
                </span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  We believe that achieving ambitious goals shouldn't feel like a grind. That's why we created Goal Quest - a platform that transforms your biggest challenges into an engaging, game-like experience.
                </p>
                <p>
                  Founded by entrepreneurs who understand the struggle of staying motivated, Goal Quest combines proven productivity principles with gamification mechanics that actually work.
                </p>
                <p>
                  Whether you're building a startup, learning a new skill, or pursuing personal growth, our platform helps you stay focused, track progress, and celebrate wins along the way.
                </p>
              </div>
              <div className="mt-10">
                <Button 
                  size="lg"
                  onClick={() => navigate('/app')}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">10,000+</h3>
                  <p className="text-gray-400">Goals achieved by our community</p>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-8 -left-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-400">User Satisfaction</div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5,000+</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white font-bold text-2xl mb-4">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Goal Quest
            </span>
          </div>
          <p className="text-gray-400 mb-8">Transform your productivity. Achieve your dreams.</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
