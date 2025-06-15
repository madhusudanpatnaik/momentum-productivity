import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Trophy, Check, Users, BarChart3, Shield, Linkedin, Twitter, ExternalLink } from 'lucide-react';
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
      {/* Enhanced flowing curved lines pattern with smoother curves */}
      <div className="absolute inset-0 opacity-8">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {[...Array(25)].map((_, i) => (
            <path
              key={i}
              d={`M ${100 + i * 35} 800 
                  C ${250 + i * 40 + mousePosition.x * 1.5} ${600 - i * 15 + mousePosition.y * 0.8}, 
                    ${400 + i * 25 + mousePosition.x * 1.2} ${300 - i * 12 + mousePosition.y * 0.6}, 
                    ${650 + i * 45} 0 
                  S ${800 + i * 30} ${200 + i * 8}, 
                    ${1000 + i * 20} ${100 + i * 5}`}
              stroke="url(#gradient1)"
              strokeWidth={`${1.5 + i * 0.1}`}
              fill="none"
              opacity={0.06 + (i * 0.02)}
              transform={`rotate(${-4 * i + mousePosition.x * 0.08} ${400 + i * 20} 400)`}
              className="transition-all duration-700 ease-out"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${5 + i * 0.2}s`
              }}
            />
          ))}
          
          {/* Smooth bezier curves */}
          {[...Array(18)].map((_, i) => (
            <path
              key={`bezier-${i}`}
              d={`M ${50 + i * 50} 800 
                  C ${200 + i * 35 + mousePosition.x * 2} ${650 - i * 20 + mousePosition.y * 0.5}, 
                    ${350 + i * 30 + mousePosition.x * 1.8} ${450 - i * 18 + mousePosition.y * 0.7}, 
                    ${500 + i * 40} 200
                  C ${650 + i * 20} ${100 + i * 10}, 
                    ${800 + i * 25} ${50 + i * 8}, 
                    ${950 + i * 15} 0`}
              stroke="url(#gradient2)"
              strokeWidth="1.2"
              fill="none"
              opacity={0.04 + (i * 0.015)}
              transform={`rotate(${-2 * i + mousePosition.y * 0.04} ${400 + i * 30} 400)`}
              className="transition-all duration-900 ease-out"
              style={{
                animationDelay: `${i * 0.25}s`,
                animationDuration: `${7 + i * 0.15}s`
              }}
            />
          ))}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(147,51,234,0.2)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(147,51,234,0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Enhanced stars background */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse transition-all duration-1000"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2.5 + Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
            }}
          >
            <div 
              className="w-0.5 h-0.5 bg-white rounded-full opacity-60"
              style={{
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(147, 51, 234, 0.3)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Enhanced gradient overlay */}
      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(147, 51, 234, 0.12) 0%, 
            rgba(59, 130, 246, 0.08) 35%, 
            transparent 70%), 
            linear-gradient(135deg, 
              rgba(59, 130, 246, 0.08) 0%, 
              rgba(147, 51, 234, 0.06) 50%, 
              transparent 100%)`
        }}
      />

      {/* Perfect navigation alignment - FIXED: Remove duplicate auth buttons */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        {/* Left side - App name */}
        <div className="flex-shrink-0">
          <div className="text-white font-bold text-4xl tracking-tight font-premium">
            <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              Momentum
            </span>
          </div>
        </div>

        {/* Center - Navigation links */}
        <div className="hidden md:flex items-center space-x-12 flex-1 justify-center">
          <a href="#features" className="text-gray-200 hover:text-white transition-all duration-300 font-medium text-lg font-sans relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="text-gray-200 hover:text-white transition-all duration-300 font-medium text-lg font-sans relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#connect" className="text-gray-200 hover:text-white transition-all duration-300 font-medium text-lg font-sans relative group">
            Developer
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Right side - Single Auth button */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-xl backdrop-blur-sm font-sans border-2 border-white/20 hover:border-white/40"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Enhanced main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Premium badge */}
          <div className="inline-flex items-center px-10 py-5 rounded-full border-2 border-white/25 bg-white/8 backdrop-blur-lg mb-16 hover:bg-white/12 transition-all duration-500 shadow-2xl">
            <Zap className="w-6 h-6 text-white mr-4 animate-pulse" />
            <span className="text-lg text-gray-100 font-medium font-sans tracking-wide">Gamified Productivity Platform</span>
          </div>

          {/* Enhanced typography with aesthetic fonts - improved readability and elegance */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-12 leading-[0.9] tracking-tight font-premium max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent block drop-shadow-2xl font-extrabold">
              Transform Your
            </span>
            <span className="bg-gradient-to-r from-blue-100 via-white to-purple-100 bg-clip-text text-transparent block drop-shadow-2xl font-light italic">
              Productivity Journey
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed font-light font-sans opacity-90">
            Built for <span className="font-semibold text-white">action</span>, built for <span className="font-semibold text-white">success</span>. For founders, entrepreneurs, and anyone ready to achieve their most ambitious goals.
          </p>

          <div className="flex justify-center mb-20">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white px-16 py-8 text-xl font-semibold rounded-full transition-all duration-500 hover:scale-110 shadow-2xl backdrop-blur-sm font-sans border-2 border-white/20 hover:border-white/40 hover:shadow-3xl"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              Start Your Quest
              <ArrowRight className="ml-4 h-6 w-6" />
            </Button>
          </div>

          {/* Enhanced feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { icon: Target, title: "Goal Tracking", desc: "Set, track, and achieve your most important objectives with precision" },
              { icon: Trophy, title: "Achievements", desc: "Unlock rewards and celebrate milestones in your journey" },
              { icon: Zap, title: "Progress Boost", desc: "Accelerate your progress with smart insights and motivation" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-12 rounded-3xl bg-white/6 backdrop-blur-lg border-2 border-white/15 hover:bg-white/12 hover:border-white/25 transition-all duration-500 group hover:scale-105 shadow-xl hover:shadow-2xl">
                <div className="p-6 rounded-full bg-gradient-to-br from-white/15 to-white/5 mb-10 group-hover:from-white/25 group-hover:to-white/10 transition-all duration-500 shadow-lg">
                  <feature.icon className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-6 font-premium tracking-wide">{feature.title}</h3>
                <p className="text-gray-300 text-center text-lg leading-relaxed font-sans opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight font-premium max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-bold">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-sans">
              Everything you need to transform your productivity and achieve your biggest goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="p-4 rounded-full bg-white/10 mb-8 w-fit group-hover:bg-white/20 transition-all duration-300">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-6 font-premium">Investment Dashboard</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-sans">Track your financial goals with multi-currency support and beautiful visualizations across USD, EUR, and INR.</p>
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
              <h2 className="text-5xl md:text-6xl font-light text-white mb-10 leading-tight font-premium">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-bold">
                  About Momentum
                </span>
              </h2>
              <div className="space-y-8 text-gray-300 text-xl leading-relaxed font-sans">
                <p className="font-light">
                  We believe that achieving ambitious goals shouldn't feel like a grind. That's why we created <span className="font-semibold text-white">Momentum</span> - a platform that transforms your biggest challenges into an engaging, game-like experience.
                </p>
                <p className="font-light">
                  Founded by entrepreneurs who understand the struggle of staying motivated, Momentum combines proven productivity principles with gamification mechanics that actually work.
                </p>
                <p className="font-light">
                  Whether you're building a startup, learning a new skill, or pursuing personal growth, our platform helps you stay focused, track progress, and celebrate wins along the way.
                </p>
              </div>
              <div className="mt-12">
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
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
                  <h3 className="text-4xl font-bold text-white mb-6 font-premium">10,000+</h3>
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

      {/* Connect with Developer Section */}
      <section id="connect" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight font-premium">
              <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent font-bold">
                Connect with Developer
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-sans font-light">
              Let's build something amazing together. Connect with me for collaborations, feedback, or just to say hello!
            </p>
          </div>

          <div className="flex justify-center items-center space-x-8 mb-16">
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/madhusudanpatnaik/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-4 p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="p-4 rounded-full bg-blue-600/20 group-hover:bg-blue-600/40 transition-all duration-300">
                <Linkedin className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white font-premium">LinkedIn</h3>
                <p className="text-gray-400 font-sans">Professional Network</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>

            {/* X (Twitter) */}
            <a 
              href="https://x.com/madhusudan91263" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-4 p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-gray-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="p-4 rounded-full bg-gray-600/20 group-hover:bg-gray-600/40 transition-all duration-300">
                <Twitter className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white font-premium">X (Twitter)</h3>
                <p className="text-gray-400 font-sans">Latest Updates</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-lg text-gray-300 font-sans font-light">
                Made with ❤️ by <span className="font-semibold text-white">Madhusudan Patnaik</span>
              </span>
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
          <p className="text-gray-400 mb-10 text-xl font-sans font-light">Transform your productivity. Achieve your dreams.</p>
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
