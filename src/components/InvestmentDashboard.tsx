import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, TrendingDown, PieChart, Plus, Download } from 'lucide-react';
import AddItemModal from './AddItemModal';

interface Investment {
  id: string;
  name: string;
  amount: number;
  type: 'funding' | 'expense' | 'revenue';
  date: string;
  category: string;
}

const InvestmentDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [showAddModal, setShowAddModal] = useState(false);

  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', name: 'Seed Funding Round A', amount: 250000, type: 'funding', date: '2024-06-01', category: 'Investment' },
    { id: '2', name: 'AWS Infrastructure', amount: -2500, type: 'expense', date: '2024-06-15', category: 'Technology' },
    { id: '3', name: 'Marketing Campaign', amount: -15000, type: 'expense', date: '2024-06-10', category: 'Marketing' },
    { id: '4', name: 'First Customer Payment', amount: 5000, type: 'revenue', date: '2024-06-20', category: 'Revenue' }
  ]);

  const handleAddTransaction = (newTransaction: any) => {
    setInvestments(prev => [...prev, {
      ...newTransaction,
      type: newTransaction.amount > 0 ? 'revenue' : 'expense'
    }]);
  };

  const transactionFields = [
    { name: 'name', label: 'Description', type: 'text', required: true, placeholder: 'Enter transaction description...' },
    { name: 'amount', label: 'Amount', type: 'number', required: true, placeholder: 'Enter amount (negative for expenses)...' },
    { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'Enter category...' }
  ];

  const totalFunding = investments.filter(i => i.type === 'funding').reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = Math.abs(investments.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.amount, 0));
  const totalRevenue = investments.filter(i => i.type === 'revenue').reduce((sum, i) => sum + i.amount, 0);
  const burnRate = totalExpenses / 1; // Monthly burn rate
  const runway = totalFunding / burnRate; // Months of runway

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'funding': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'expense': return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'revenue': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Investment Dashboard</h1>
        <div className="flex items-center space-x-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button 
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Funding</p>
                <p className="text-2xl font-bold text-green-400">${totalFunding.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Monthly Burn</p>
                <p className="text-2xl font-bold text-red-400">${burnRate.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Revenue</p>
                <p className="text-2xl font-bold text-blue-400">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Runway</p>
                <p className="text-2xl font-bold text-purple-400">{runway.toFixed(1)} months</p>
              </div>
              <PieChart className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Runway Progress */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Cash Runway</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current runway</span>
              <span className="text-white">{runway.toFixed(1)} months remaining</span>
            </div>
            <Progress value={(runway / 24) * 100} className="h-3" />
            <p className="text-gray-400 text-sm">
              At current burn rate of ${burnRate.toLocaleString()}/month
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Transactions</CardTitle>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-white font-medium">{investment.name}</h3>
                  <p className="text-gray-400 text-sm">{investment.category} • {investment.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getTypeColor(investment.type)}>
                    {investment.type}
                  </Badge>
                  <span className={`text-lg font-semibold ${
                    investment.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ${Math.abs(investment.amount).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Transaction"
        onAdd={handleAddTransaction}
        fields={transactionFields}
      />
    </div>
  );
};

export default InvestmentDashboard;
