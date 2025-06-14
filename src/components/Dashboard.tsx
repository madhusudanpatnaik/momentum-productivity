
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Trophy, Check, Users, BarChart3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="landing-page min-h-screen relative overflow-hidden">
      {/* Dynamic flowing curved lines pattern - follows cursor */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M ${200 + i * 40} 800 Q ${400 + i * 30 + mousePosition.x * 2} ${400 - i * 20 + mousePosition.y} ${600 + i * 50} 0`}
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity={0.05 + (i * 0.04)}
              transform={`rotate(${-6 * i + mousePosition.x * 0.1} ${400 + i * 20} 400)`}
              className="transition-all duration-500 ease-out"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4 + i * 0.3}s`
              }}
            />
          ))}
          
          {[...Array(15)].map((_, i) => (
            <path
              key={`curve-${i}`}
              d={`M ${100 + i * 60} 800 Q ${300 + i * 40 + mousePosition.x} ${500 - i * 25 + mousePosition.y * 0.5} ${700 + i * 30} 100`}
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity={0.03 + (i * 0.02)}
              transform={`rotate(${-3 * i + mousePosition.y * 0.05} ${350 + i * 25} 450)`}
              className="transition-all duration-700 ease-out"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${6 + i * 0.2}s`
              }}
            />
          ))}

          {/* Additional dynamic flow lines */}
          {[...Array(10)].map((_, i) => (
            <path
              key={`flow-${i}`}
              d={`M ${mousePosition.x * 10 + i * 80} 0 Q ${mousePosition.x * 8 + 400} ${mousePosition.y * 6 + 300} ${mousePosition.x * 12 + 800} 800`}
              stroke="white"
              strokeWidth="1"
              fill="none"
              opacity={0.02 + (i * 0.01)}
              className="transition-all duration-1000 ease-out"
            />
          ))}
        </svg>
      </div>

      {/* Enhanced stars background with cursor interaction */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse transition-all duration-1000"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
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
            className="absolute animate-pulse transition-all duration-1500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
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

      {/* Modern gradient overlay with cursor influence */}
      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Premium top navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-8 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="text-white font-bold text-3xl tracking-tight font-premium">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Momentum
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg font-sans">Features</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg font-sans">About</a>
        </div>
        <div className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 text-lg px-6 py-3 font-sans"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-400/60 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/40 font-medium transition-all duration-300 backdrop-blur-sm text-lg px-6 py-3 font-sans"
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Enhanced main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Premium badge with modern styling */}
          <div className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-12 hover:bg-white/10 transition-all duration-300">
            <Zap className="w-5 h-5 text-white mr-3" />
            <span className="text-base text-gray-200 font-medium font-sans">Gamified Productivity Platform</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-12 leading-[0.9] tracking-tight font-mooxy max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent block">
              Work deeper,
            </span>
            <span className="bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent block">
              sleep better
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light font-sans">
            Built for action, built for success. For founders, entrepreneurs, and anyone ready to achieve their most ambitious goals.
          </p>

          <div className="flex justify-center mb-20">
            <Button 
              size="lg" 
              onClick={() => navigate('/app')}
              className="bg-white text-gray-900 hover:bg-gray-100 px-16 py-8 text-2xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-sm font-sans"
            >
              Start Your Quest
              <ArrowRight className="ml-4 h-7 w-7" />
            </Button>
          </div>

          {/* Premium feature highlights with modern design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-white/10 mb-8 group-hover:bg-white/20 transition-all duration-300">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 font-premium">Goal Tracking</h3>
              <p className="text-gray-400 text-center text-lg leading-relaxed font-sans">Set, track, and achieve your most important objectives with precision</p>
            </div>
            <div className="flex flex-col items-center p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-white/10 mb-8 group-hover:bg-white/20 transition-all duration-300">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 font-premium">Achievements</h3>
              <p className="text-gray-400 text-center text-lg leading-relaxed font-sans">Unlock rewards and celebrate milestones in your journey</p>
            </div>
            <div className="flex flex-col items-center p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-white/10 mb-8 group-hover:bg-white/20 transition-all duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 font-premium">Progress Boost</h3>
              <p className="text-gray-400 text-center text-lg leading-relaxed font-sans">Accelerate your progress with smart insights and motivation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-light text-white mb-8 leading-tight font-premium max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-sans">
              Everything you need to transform your productivity and achieve your biggest goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-white/10 mb-8 w-fit group-hover:bg-white/20 transition-all duration-300">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 font-premium">Analytics Dashboard</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-sans">Get deep insights into your productivity patterns and progress with beautiful visualizations and detailed reports.</p>
            </div>
            
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-white/10 mb-8 w-fit group-hover:bg-white/20 transition-all duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 font-premium">Team Collaboration</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-sans">Work together with your team, share goals, and celebrate achievements collectively in a gamified environment.</p>
            </div>
            
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-white/10 mb-8 w-fit group-hover:bg-white/20 transition-all duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 font-premium">Data Security</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-sans">Your data is protected with enterprise-grade security, encrypted at rest and in transit with regular backups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-6xl md:text-7xl font-light text-white mb-10 leading-tight font-premium">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  About Momentum
                </span>
              </h2>
              <div className="space-y-8 text-gray-300 text-xl leading-relaxed font-sans">
                <p>
                  We believe that achieving ambitious goals shouldn't feel like a grind. That's why we created Momentum - a platform that transforms your biggest challenges into an engaging, game-like experience.
                </p>
                <p>
                  Founded by entrepreneurs who understand the struggle of staying motivated, Momentum combines proven productivity principles with gamification mechanics that actually work.
                </p>
                <p>
                  Whether you're building a startup, learning a new skill, or pursuing personal growth, our platform helps you stay focused, track progress, and celebrate wins along the way.
                </p>
              </div>
              <div className="mt-12">
                <Button 
                  size="lg"
                  onClick={() => navigate('/app')}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 font-sans"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-16 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Trophy className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-4xl font-semibold text-white mb-6 font-premium">10,000+</h3>
                  <p className="text-gray-400 text-xl font-sans">Goals achieved by our community</p>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-10 -left-10 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white font-premium">98%</div>
                  <div className="text-lg text-gray-400 font-sans">User Satisfaction</div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white font-premium">5,000+</div>
                  <div className="text-lg text-gray-400 font-sans">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white font-bold text-4xl mb-6 font-premium">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Momentum
            </span>
          </div>
          <p className="text-gray-400 mb-10 text-xl font-sans">Transform your productivity. Achieve your dreams.</p>
          <div className="flex justify-center space-x-12 text-lg text-gray-400">
            <a href="#" className="hover:text-white transition-colors font-sans">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors font-sans">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors font-sans">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
