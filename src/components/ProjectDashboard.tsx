
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Target, Calendar, List, Columns3, FileText, Filter, 
  Gauge, Goal, Star, Clock, Check, Flag, Milestone 
} from 'lucide-react';
import KanbanBoard from './boards/KanbanBoard';
import GoalTracker from './goals/GoalTracker';
import MetricsDashboard from './metrics/MetricsDashboard';
import InvestmentDashboard from './investment/InvestmentDashboard';
import DailyReminders from './reminders/DailyReminders';

const ProjectDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('overview');
  
  return (
    <div className="landing-page min-h-screen relative overflow-hidden">
      {/* Same background effects as landing page */}
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

      {/* Enhanced stars background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
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

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="text-white font-bold text-2xl tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Project Hub
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('reminders')}
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <Clock className="w-4 h-4 mr-2" />
            Daily Check-in
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-full grid-cols-5 glass-morphism border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              <Gauge className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="boards" className="text-white data-[state=active]:bg-white/20">
              <Columns3 className="w-4 h-4 mr-2" />
              Boards
            </TabsTrigger>
            <TabsTrigger value="goals" className="text-white data-[state=active]:bg-white/20">
              <Target className="w-4 h-4 mr-2" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="metrics" className="text-white data-[state=active]:bg-white/20">
              <FileText className="w-4 h-4 mr-2" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="investment" className="text-white data-[state=active]:bg-white/20">
              <Star className="w-4 h-4 mr-2" />
              Investment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Active Projects</p>
                      <p className="text-3xl font-bold text-white">12</p>
                    </div>
                    <Columns3 className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Goals This Month</p>
                      <p className="text-3xl font-bold text-white">8</p>
                    </div>
                    <Target className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Revenue MTD</p>
                      <p className="text-3xl font-bold text-white">$24.5K</p>
                    </div>
                    <Gauge className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Streak Days</p>
                      <p className="text-3xl font-bold text-white">28</p>
                    </div>
                    <Star className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick actions and recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveView('boards')}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
                    variant="outline"
                  >
                    <Columns3 className="w-4 h-4 mr-2" />
                    Create New Board
                  </Button>
                  <Button 
                    onClick={() => setActiveView('goals')}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
                    variant="outline"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Add New Goal
                  </Button>
                  <Button 
                    onClick={() => setActiveView('metrics')}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Update Metrics
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Goal "Launch MVP" completed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">New task added to "Development" board</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Monthly revenue updated</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="boards" className="mt-6">
            <KanbanBoard />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GoalTracker />
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <MetricsDashboard />
          </TabsContent>

          <TabsContent value="investment" className="mt-6">
            <InvestmentDashboard />
          </TabsContent>

          <TabsContent value="reminders" className="mt-6">
            <DailyReminders />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDashboard;
