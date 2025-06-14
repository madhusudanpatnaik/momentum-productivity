import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Bike, Home, Car, Plane, Wallet, TrendingUp } from 'lucide-react';
import AddItemModal from './AddItemModal';

interface PersonalGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: 'purchase' | 'savings' | 'travel' | 'education';
  icon: string;
  dueDate?: string;
}

interface Transaction {
  id: string;
  goalId: string;
  amount: number;
  description: string;
  date: string;
}

const PersonalGoals: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [goals, setGoals] = useState<PersonalGoal[]>([
    {
      id: '1',
      title: 'Buy a Mountain Bike',
      description: 'Save for a high-quality mountain bike',
      targetAmount: 2500,
      currentAmount: 1800,
      category: 'purchase',
      icon: 'bike',
      dueDate: '2024-08-01'
    },
    {
      id: '2',
      title: 'Emergency Fund',
      description: '6 months of living expenses',
      targetAmount: 30000,
      currentAmount: 18500,
      category: 'savings',
      icon: 'wallet'
    },
    {
      id: '3',
      title: 'Japan Trip',
      description: 'Two-week vacation in Japan',
      targetAmount: 5000,
      currentAmount: 2200,
      category: 'travel',
      icon: 'plane',
      dueDate: '2024-12-01'
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: '1', goalId: '1', amount: 300, description: 'Monthly bike savings', date: '2024-06-01' },
    { id: '2', goalId: '2', amount: 1000, description: 'Bonus allocation', date: '2024-06-15' },
    { id: '3', goalId: '3', amount: 400, description: 'Travel fund deposit', date: '2024-06-10' }
  ]);

  const handleAddGoal = (newGoal: any) => {
    setGoals(prev => [...prev, {
      ...newGoal,
      currentAmount: 0,
      category: 'savings' as const,
      icon: 'target'
    }]);
  };

  const goalFields = [
    { name: 'title', label: 'Goal Title', type: 'text', required: true, placeholder: 'Enter goal title...' },
    { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter goal description...' },
    { name: 'targetAmount', label: 'Target Amount', type: 'number', required: true, placeholder: 'Enter target amount...' },
    { name: 'dueDate', label: 'Target Date', type: 'date' }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bike': return <Bike className="w-6 h-6" />;
      case 'wallet': return <Wallet className="w-6 h-6" />;
      case 'plane': return <Plane className="w-6 h-6" />;
      case 'home': return <Home className="w-6 h-6" />;
      case 'car': return <Car className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'purchase': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'savings': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'travel': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'education': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Personal Goals</h1>
        <Button 
          className="bg-white text-gray-900 hover:bg-gray-100"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Saved</p>
                <p className="text-2xl font-bold text-green-400">${totalSaved.toLocaleString()}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Target Amount</p>
                <p className="text-2xl font-bold text-blue-400">${totalTarget.toLocaleString()}</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Overall Progress</p>
                <p className="text-2xl font-bold text-purple-400">{overallProgress.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.currentAmount;
          
          return (
            <Card key={goal.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-800 rounded-lg text-white">
                      {getIcon(goal.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{goal.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{goal.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Badge className={getCategoryColor(goal.category)}>
                    {goal.category}
                  </Badge>
                  {goal.dueDate && (
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/40">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Current</p>
                      <p className="text-white font-semibold">${goal.currentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Target</p>
                      <p className="text-white font-semibold">${goal.targetAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Remaining</p>
                        <p className="text-lg font-bold text-white">${remaining.toLocaleString()}</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Add Funds
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const goal = goals.find(g => g.id === transaction.goalId);
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg text-white">
                      {goal && getIcon(goal.icon)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-gray-400 text-sm">{goal?.title} • {transaction.date}</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-semibold">
                    +${transaction.amount.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Goal"
        onAdd={handleAddGoal}
        fields={goalFields}
      />
    </div>
  );
};

export default PersonalGoals;
