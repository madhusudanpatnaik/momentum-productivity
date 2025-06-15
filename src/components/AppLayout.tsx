
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="h-16 bg-white/10 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200" />
              
              {/* App Logo/Name */}
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-white font-semibold text-lg tracking-wide hidden md:block">Momentum</span>
              </button>
              
              <div className="relative ml-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search goals, projects..." 
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 w-80 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm backdrop-blur-sm focus:outline-none focus:border-white/40">
                <option className="bg-slate-800 text-white">English</option>
                <option className="bg-slate-800 text-white">Spanish</option>
                <option className="bg-slate-800 text-white">French</option>
              </select>
              
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 relative group">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </Button>
              
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                <Settings className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
