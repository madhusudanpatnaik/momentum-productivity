import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useInvestmentStore } from "@/stores/investmentStore";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useNotifications } from "@/hooks/useNotifications";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Plus, 
  Edit, 
  Trash2,
  PieChart,
  BarChart3,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const InvestmentDashboard = () => {
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    symbol: '',
    amount: '',
    currentValue: '',
    type: 'stock' as 'stock' | 'crypto' | 'bond' | 'etf'
  });
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: ''
  });

  const {
    stats,
    investments,
    goals,
    portfolioHistory,
    addInvestment,
    updateInvestment,
    removeInvestment,
    addGoal,
    updateGoal,
    removeGoal,
    formatCurrency
  } = useInvestmentStore();

  const { userSettings } = useDashboardStore();
  const { showSuccess, showError } = useNotifications();

  // Re-render when currency changes
  useEffect(() => {
    // Force re-render when currency changes
  }, [userSettings.currency]);

  const handleAddInvestment = () => {
    if (!newInvestment.name || !newInvestment.symbol || !newInvestment.amount || !newInvestment.currentValue) {
      showError('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(newInvestment.amount);
    const currentValue = parseFloat(newInvestment.currentValue);
    const change = currentValue - amount;
    const changePercent = amount > 0 ? (change / amount) * 100 : 0;

    addInvestment({
      name: newInvestment.name,
      symbol: newInvestment.symbol.toUpperCase(),
      amount,
      currentValue,
      change,
      changePercent,
      type: newInvestment.type,
      purchaseDate: new Date().toISOString().split('T')[0]
    });

    setNewInvestment({ name: '', symbol: '', amount: '', currentValue: '', type: 'stock' });
    setShowAddInvestment(false);
    showSuccess('Investment added successfully!');
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.currentAmount || !newGoal.deadline) {
      showError('Please fill in all required fields');
      return;
    }

    addGoal({
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount),
      deadline: newGoal.deadline,
      category: newGoal.category || 'General'
    });

    setNewGoal({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '' });
    setShowAddGoal(false);
    showSuccess('Investment goal added successfully!');
  };

  const handleRemoveInvestment = (id: string) => {
    removeInvestment(id);
    showSuccess('Investment removed successfully!');
  };

  const handleRemoveGoal = (id: string) => {
    removeGoal(id);
    showSuccess('Goal removed successfully!');
  };

  const portfolioData = investments.map(inv => ({
    name: inv.symbol,
    value: inv.currentValue,
    color: inv.change >= 0 ? '#10b981' : '#ef4444'
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Investment Dashboard</h1>
          <p className="text-gray-400">Track your portfolio and investment goals</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalPortfolioValue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${stats.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(stats.totalGainLoss)}
                </p>
                <p className={`text-sm ${stats.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.totalGainLossPercent >= 0 ? '+' : ''}{stats.totalGainLossPercent.toFixed(2)}%
                </p>
              </div>
              {stats.totalGainLoss >= 0 ? 
                <TrendingUp className="w-8 h-8 text-green-400" /> : 
                <TrendingDown className="w-8 h-8 text-red-400" />
              }
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Day Change</p>
                <p className={`text-2xl font-bold ${stats.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(stats.dayChange)}
                </p>
                <p className={`text-sm ${stats.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.dayChangePercent >= 0 ? '+' : ''}{stats.dayChangePercent.toFixed(2)}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Goals</p>
                <p className="text-2xl font-bold text-white">{goals.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Allocation */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investments & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investments */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Investments</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddInvestment(true)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Investment
              </Button>
            </div>
          </CardHeader>
          
          {showAddInvestment && (
            <CardContent className="border-b border-gray-800">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Investment name"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    placeholder="Symbol (e.g., AAPL)"
                    value={newInvestment.symbol}
                    onChange={(e) => setNewInvestment({...newInvestment, symbol: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Amount invested"
                    type="number"
                    value={newInvestment.amount}
                    onChange={(e) => setNewInvestment({...newInvestment, amount: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    placeholder="Current value"
                    type="number"
                    value={newInvestment.currentValue}
                    onChange={(e) => setNewInvestment({...newInvestment, currentValue: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Select value={newInvestment.type} onValueChange={(value: any) => setNewInvestment({...newInvestment, type: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="stock">Stock</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="etf">ETF</SelectItem>
                      <SelectItem value="bond">Bond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddInvestment} className="bg-white text-gray-900 hover:bg-gray-100">
                    Add Investment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddInvestment(false)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          )}

          <CardContent>
            <div className="space-y-4">
              {investments.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-medium">{investment.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {investment.symbol}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {investment.type}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {formatCurrency(investment.currentValue)}
                      <span className={`ml-2 ${investment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ({investment.change >= 0 ? '+' : ''}{formatCurrency(investment.change)})
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${investment.change >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {investment.changePercent >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInvestment(investment.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Goals */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Investment Goals</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddGoal(true)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>
          </CardHeader>

          {showAddGoal && (
            <CardContent className="border-b border-gray-800">
              <div className="space-y-4">
                <Input
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Target amount"
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    placeholder="Current amount"
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    placeholder="Category"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddGoal} className="bg-white text-gray-900 hover:bg-gray-100">
                    Add Goal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddGoal(false)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          )}

          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <div key={goal.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{goal.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {goal.category}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveGoal(goal.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                        </span>
                        <span className="text-white">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-gray-400 text-xs flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentDashboard;
