
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Plus,
  Award,
  BarChart3,
  Users,
  Clock,
  Star,
  ArrowRight,
  Zap
} from 'lucide-react';

export function ModernDashboard() {
  const quickStats = [
    { title: "Active Goals", value: "12", change: "+2", trend: "up", icon: Target },
    { title: "Completed This Week", value: "8", change: "+3", trend: "up", icon: CheckCircle },
    { title: "Team Projects", value: "4", change: "0", trend: "neutral", icon: Users },
    { title: "Streak Days", value: "23", change: "+1", trend: "up", icon: Award }
  ];

  const recentGoals = [
    { title: "Launch Marketing Campaign", progress: 85, due: "2 days", priority: "high" },
    { title: "Complete React Dashboard", progress: 60, due: "1 week", priority: "medium" },
    { title: "Team Meeting Prep", progress: 40, due: "Tomorrow", priority: "high" },
    { title: "Update Documentation", progress: 75, due: "3 days", priority: "low" }
  ];

  const achievements = [
    { title: "Goal Crusher", description: "Completed 50 goals", icon: Trophy, earned: true },
    { title: "Consistency King", description: "30-day streak", icon: Star, earned: true },
    { title: "Team Player", description: "5 collaborative goals", icon: Users, earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Welcome back, Achiever! 👋
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Ready to crush your goals today?
            </p>
          </div>
          <div className="flex gap-3">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              New Goal
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                      {stat.change !== "0" && (
                        <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="text-xs">
                          {stat.change}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Goals */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Active Goals</CardTitle>
                    <CardDescription className="text-slate-600">Track your current objectives</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentGoals.map((goal, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-all duration-300 group cursor-pointer border border-slate-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">{goal.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={goal.priority === "high" ? "destructive" : goal.priority === "medium" ? "default" : "secondary"} className="text-xs">
                          {goal.priority}
                        </Badge>
                        <span className="text-sm text-slate-600 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {goal.due}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium text-slate-900">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover:bg-blue-50 hover:border-blue-200">
                  <Target className="w-4 h-4 mr-3" />
                  Create Goal
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-green-50 hover:border-green-200">
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Task
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-purple-50 hover:border-purple-200">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-xl border transition-all duration-300 ${
                    achievement.earned 
                      ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm" 
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned ? "bg-yellow-100" : "bg-slate-100"
                      }`}>
                        <achievement.icon className={`w-5 h-5 ${
                          achievement.earned ? "text-yellow-600" : "text-slate-400"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{achievement.title}</h4>
                        <p className="text-sm text-slate-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Overview */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">This Week's Overview</CardTitle>
            <CardDescription className="text-slate-600">Your productivity at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">8</div>
                <div className="text-sm text-slate-600">Completed</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">12</div>
                <div className="text-sm text-slate-600">In Progress</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">85%</div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">23</div>
                <div className="text-sm text-slate-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
