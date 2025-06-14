
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Star, Plus, FileText, Calendar } from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  amount: number;
  type: 'equipment' | 'software' | 'marketing' | 'development' | 'operations';
  date: string;
  status: 'planned' | 'invested' | 'returned';
  roi?: number;
}

const InvestmentDashboard: React.FC = () => {
  const [investments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Development Tools',
      amount: 2500,
      type: 'software',
      date: '2024-01-15',
      status: 'invested',
      roi: 15
    },
    {
      id: '2',
      name: 'Marketing Campaign Q2',
      amount: 8000,
      type: 'marketing',
      date: '2024-04-01',
      status: 'invested',
      roi: 25
    },
    {
      id: '3',
      name: 'Server Infrastructure',
      amount: 3500,
      type: 'operations',
      date: '2024-02-10',
      status: 'invested',
      roi: 12
    },
    {
      id: '4',
      name: 'Mobile Development',
      amount: 15000,
      type: 'development',
      date: '2024-03-20',
      status: 'invested',
      roi: 30
    },
    {
      id: '5',
      name: 'Design Software Licenses',
      amount: 1200,
      type: 'software',
      date: '2024-05-01',
      status: 'planned'
    }
  ]);

  const monthlySpending = [
    { month: 'Jan', spending: 5500, budget: 8000 },
    { month: 'Feb', spending: 7200, budget: 8000 },
    { month: 'Mar', spending: 9800, budget: 10000 },
    { month: 'Apr', spending: 12500, budget: 15000 },
    { month: 'May', spending: 8900, budget: 12000 },
    { month: 'Jun', spending: 6700, budget: 10000 },
  ];

  const investmentByType = [
    { name: 'Development', value: 15000, color: '#3b82f6' },
    { name: 'Marketing', value: 8000, color: '#10b981' },
    { name: 'Operations', value: 3500, color: '#f59e0b' },
    { name: 'Software', value: 3700, color: '#8b5cf6' },
    { name: 'Equipment', value: 2800, color: '#ef4444' },
  ];

  const totalInvested = investments
    .filter(inv => inv.status === 'invested')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const averageROI = investments
    .filter(inv => inv.roi)
    .reduce((sum, inv, _, arr) => sum + (inv.roi || 0) / arr.length, 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'development': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'marketing': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'operations': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'software': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'equipment': return 'bg-red-500/20 text-red-300 border-red-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'invested': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'planned': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'returned': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Investment Dashboard</h2>
        
        <Button className="bg-white text-gray-900 hover:bg-gray-100">
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </Button>
      </div>

      {/* Key Investment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Total Invested</p>
              <p className="text-3xl font-bold text-white">${totalInvested.toLocaleString()}</p>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                YTD
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Average ROI</p>
              <p className="text-3xl font-bold text-white">{averageROI.toFixed(1)}%</p>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40">
                +2.5% vs Q1
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Active Investments</p>
              <p className="text-3xl font-bold text-white">{investments.filter(inv => inv.status === 'invested').length}</p>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40">
                4 active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Monthly Budget</p>
              <p className="text-3xl font-bold text-white">$10K</p>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                67% used
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Distribution */}
        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Investment by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {investmentByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {investmentByType.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white text-sm">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Spending */}
        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Monthly Spending vs Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySpending}>
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
                  <Bar dataKey="budget" fill="rgba(107, 114, 142, 0.5)" name="Budget" />
                  <Bar dataKey="spending" fill="rgba(59, 130, 246, 0.8)" name="Actual Spending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment List */}
      <Card className="glass-morphism border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Investment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div 
                key={investment.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-white font-medium">{investment.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {new Date(investment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge className={getTypeColor(investment.type)}>
                    {investment.type}
                  </Badge>
                  
                  <Badge className={getStatusColor(investment.status)}>
                    {investment.status}
                  </Badge>
                  
                  {investment.roi && (
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                      {investment.roi}% ROI
                    </Badge>
                  )}
                  
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      ${investment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentDashboard;
