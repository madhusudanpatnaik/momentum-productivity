
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Gauge, FileText, Filter, Calendar } from 'lucide-react';

const MetricsDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('month');

  const revenueData = [
    { month: 'Jan', revenue: 12000, recurring: 8000, oneTime: 4000 },
    { month: 'Feb', revenue: 15000, recurring: 10000, oneTime: 5000 },
    { month: 'Mar', revenue: 18000, recurring: 12000, oneTime: 6000 },
    { month: 'Apr', revenue: 22000, recurring: 15000, oneTime: 7000 },
    { month: 'May', revenue: 28000, recurring: 18000, oneTime: 10000 },
    { month: 'Jun', revenue: 24500, recurring: 16500, oneTime: 8000 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 1200, activeUsers: 800, newUsers: 200 },
    { month: 'Feb', users: 1800, activeUsers: 1200, newUsers: 600 },
    { month: 'Mar', users: 2500, activeUsers: 1700, newUsers: 700 },
    { month: 'Apr', users: 3400, activeUsers: 2300, newUsers: 900 },
    { month: 'May', users: 4800, activeUsers: 3200, newUsers: 1400 },
    { month: 'Jun', users: 6200, activeUsers: 4100, newUsers: 1400 },
  ];

  const projectMetrics = [
    { project: 'MVP Launch', completion: 85, tasks: 34, completed: 29 },
    { project: 'Mobile App', completion: 60, tasks: 28, completed: 17 },
    { project: 'Marketing Campaign', completion: 90, tasks: 20, completed: 18 },
    { project: 'API Development', completion: 45, tasks: 25, completed: 11 },
  ];

  const keyMetrics = [
    { label: 'Monthly Revenue', value: '$24,500', change: '+12%', trend: 'up' },
    { label: 'Active Users', value: '4,100', change: '+28%', trend: 'up' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.5%', trend: 'up' },
    { label: 'Churn Rate', value: '2.1%', change: '-0.3%', trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Metrics Dashboard</h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 glass-morphism border-white/20 rounded-lg p-1">
            <Button
              size="sm"
              variant={timeFilter === 'week' ? 'default' : 'ghost'}
              onClick={() => setTimeFilter('week')}
              className="text-white"
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={timeFilter === 'month' ? 'default' : 'ghost'}
              onClick={() => setTimeFilter('month')}
              className="text-white"
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={timeFilter === 'quarter' ? 'default' : 'ghost'}
              onClick={() => setTimeFilter('quarter')}
              className="text-white"
            >
              Quarter
            </Button>
          </div>
          
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            <Filter className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                <div className="flex items-center space-x-2">
                  <Badge className={
                    metric.trend === 'up' 
                      ? 'bg-green-500/20 text-green-300 border-green-500/40'
                      : 'bg-red-500/20 text-red-300 border-red-500/40'
                  }>
                    {metric.change}
                  </Badge>
                  <span className="text-gray-400 text-xs">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="glass-morphism border-white/20">
          <TabsTrigger value="revenue" className="text-white data-[state=active]:bg-white/20">
            Revenue Analytics
          </TabsTrigger>
          <TabsTrigger value="users" className="text-white data-[state=active]:bg-white/20">
            User Growth
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-white data-[state=active]:bg-white/20">
            Project Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card className="glass-morphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="recurring" 
                      stackId="1" 
                      stroke="#10b981" 
                      fill="rgba(16, 185, 129, 0.3)" 
                      name="Recurring Revenue"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="oneTime" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="rgba(59, 130, 246, 0.3)" 
                      name="One-time Revenue"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="glass-morphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white">User Growth Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      name="Total Users"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activeUsers" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Active Users"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="newUsers" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="New Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card className="glass-morphism border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Project Completion Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectMetrics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
                    <YAxis dataKey="project" type="category" stroke="rgba(255,255,255,0.7)" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Bar 
                      dataKey="completion" 
                      fill="rgba(59, 130, 246, 0.7)"
                      name="Completion %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsDashboard;
