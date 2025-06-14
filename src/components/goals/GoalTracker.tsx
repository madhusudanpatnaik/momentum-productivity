
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Star, Calendar, Flag, Check, Milestone } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  xpReward: number;
  category: 'revenue' | 'product' | 'growth' | 'personal';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completed: boolean;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
}

const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Reach $100K ARR',
      description: 'Achieve annual recurring revenue of $100,000',
      progress: 65,
      xpReward: 500,
      category: 'revenue',
      priority: 'high',
      dueDate: '2024-12-31',
      completed: false,
      milestones: [
        { id: '1a', title: 'Reach $25K ARR', completed: true, xp: 100 },
        { id: '1b', title: 'Reach $50K ARR', completed: true, xp: 150 },
        { id: '1c', title: 'Reach $75K ARR', completed: false, xp: 200 },
        { id: '1d', title: 'Reach $100K ARR', completed: false, xp: 250 }
      ]
    },
    {
      id: '2',
      title: 'Launch Mobile App',
      description: 'Develop and launch iOS and Android applications',
      progress: 40,
      xpReward: 300,
      category: 'product',
      priority: 'high',
      dueDate: '2024-08-15',
      completed: false,
      milestones: [
        { id: '2a', title: 'Complete wireframes', completed: true, xp: 50 },
        { id: '2b', title: 'Develop MVP', completed: false, xp: 100 },
        { id: '2c', title: 'Beta testing', completed: false, xp: 75 },
        { id: '2d', title: 'App store launch', completed: false, xp: 75 }
      ]
    },
    {
      id: '3',
      title: 'Grow to 10K Users',
      description: 'Reach 10,000 active monthly users',
      progress: 80,
      xpReward: 400,
      category: 'growth',
      priority: 'medium',
      dueDate: '2024-09-30',
      completed: false,
      milestones: [
        { id: '3a', title: '1K users', completed: true, xp: 50 },
        { id: '3b', title: '5K users', completed: true, xp: 100 },
        { id: '3c', title: '8K users', completed: true, xp: 125 },
        { id: '3d', title: '10K users', completed: false, xp: 125 }
      ]
    }
  ]);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'revenue': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'product': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'growth': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'personal': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const filteredGoals = filterCategory === 'all' 
    ? goals 
    : goals.filter(goal => goal.category === filterCategory);

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          progress: Math.min(newProgress, 100),
          completed: newProgress >= 100
        };
      }
      return goal;
    }));
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        const completedMilestones = updatedMilestones.filter(m => m.completed).length;
        const newProgress = (completedMilestones / updatedMilestones.length) * 100;
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress,
          completed: newProgress >= 100
        };
      }
      return goal;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Goal Tracker</h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={filterCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterCategory('all')}
              className="text-white border-white/30"
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filterCategory === 'revenue' ? 'default' : 'outline'}
              onClick={() => setFilterCategory('revenue')}
              className="text-white border-white/30"
            >
              Revenue
            </Button>
            <Button
              size="sm"
              variant={filterCategory === 'product' ? 'default' : 'outline'}
              onClick={() => setFilterCategory('product')}
              className="text-white border-white/30"
            >
              Product
            </Button>
            <Button
              size="sm"
              variant={filterCategory === 'growth' ? 'default' : 'outline'}
              onClick={() => setFilterCategory('growth')}
              className="text-white border-white/30"
            >
              Growth
            </Button>
          </div>
          
          <Button 
            onClick={() => setShowAddGoal(true)}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Goals grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => (
          <Card 
            key={goal.id} 
            className={`glass-morphism border-white/20 hover:border-white/40 transition-all duration-300 ${
              goal.completed ? 'bg-green-500/10' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`text-lg ${goal.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {goal.title}
                  </CardTitle>
                  <p className="text-gray-400 text-sm mt-1">{goal.description}</p>
                </div>
                {goal.completed && (
                  <Check className="w-6 h-6 text-green-400" />
                )}
              </div>
              
              <div className="flex items-center space-x-2 mt-3">
                <Badge className={getCategoryColor(goal.category)}>
                  <Target className="w-3 h-3 mr-1" />
                  {goal.category}
                </Badge>
                <Badge className={getPriorityColor(goal.priority)}>
                  <Flag className="w-3 h-3 mr-1" />
                  {goal.priority}
                </Badge>
                {goal.dueDate && (
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/40">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(goal.dueDate).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              {/* Milestones */}
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Milestone className="w-4 h-4 mr-2" />
                  Milestones
                </h4>
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <div 
                      key={milestone.id}
                      className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => toggleMilestone(goal.id, milestone.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          milestone.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-400'
                        }`}>
                          {milestone.completed && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          milestone.completed 
                            ? 'line-through text-gray-400' 
                            : 'text-white'
                        }`}>
                          {milestone.title}
                        </span>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                        {milestone.xp} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* XP Reward */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-semibold">Total: {goal.xpReward} XP</span>
                </div>
                
                {!goal.completed && (
                  <Button
                    size="sm"
                    onClick={() => updateGoalProgress(goal.id, 100)}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-300"
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
