
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
      <nav className="relative z-10 flex justify-between items-center px-6 py-8 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="text-white font-bold text-3xl tracking-tight font-premium">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Momentum
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg font-sans">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg font-sans">Pricing</a>
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

          <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light text-white mb-12 leading-[0.9] tracking-tight font-mooxy max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent block">
              Work deeper,
            </span>
            <span className="bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent block">
              sleep better
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light font-sans">
            Transform your productivity with our gamified platform. Built for founders, entrepreneurs, and anyone ready to achieve their most ambitious goals.
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

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-light text-white mb-8 leading-tight font-premium max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-sans">
              Choose the plan that fits your ambition. Start free, upgrade when you're ready to level up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="mb-10">
                <h3 className="text-3xl font-semibold text-white mb-3 font-premium">Starter</h3>
                <div className="text-5xl font-bold text-white mb-6 font-premium">
                  $0<span className="text-xl font-normal text-gray-400 font-sans">/month</span>
                </div>
                <p className="text-gray-400 text-lg font-sans">Perfect for getting started</p>
              </div>
              <ul className="space-y-5 mb-10">
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Up to 3 active goals</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Basic progress tracking</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Mobile app access</span>
                </li>
              </ul>
              <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40 text-lg py-4 font-sans">
                Get Started Free
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 relative hover:bg-white/15 hover:border-white/30 transition-all duration-300 scale-105">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-semibold font-sans">Most Popular</span>
              </div>
              <div className="mb-10">
                <h3 className="text-3xl font-semibold text-white mb-3 font-premium">Pro</h3>
                <div className="text-5xl font-bold text-white mb-6 font-premium">
                  $15<span className="text-xl font-normal text-gray-400 font-sans">/month</span>
                </div>
                <p className="text-gray-400 text-lg font-sans">For serious goal achievers</p>
              </div>
              <ul className="space-y-5 mb-10">
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Unlimited goals & projects</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Advanced analytics</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Team collaboration</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Priority support</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 text-lg py-4 font-sans">
                Start Pro Trial
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="mb-10">
                <h3 className="text-3xl font-semibold text-white mb-3 font-premium">Enterprise</h3>
                <div className="text-5xl font-bold text-white mb-6 font-premium">
                  $49<span className="text-xl font-normal text-gray-400 font-sans">/month</span>
                </div>
                <p className="text-gray-400 text-lg font-sans">For teams and organizations</p>
              </div>
              <ul className="space-y-5 mb-10">
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Everything in Pro</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Advanced security</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Custom integrations</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-6 h-6 text-green-400 mr-4" />
                  <span className="font-sans text-lg">Dedicated support</span>
                </li>
              </ul>
              <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40 text-lg py-4 font-sans">
                Contact Sales
              </Button>
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
