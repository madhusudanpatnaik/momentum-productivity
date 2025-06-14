import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Trophy, Zap, Star, Calendar, Flag, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  xpReward: number;
  category: 'health' | 'career' | 'personal' | 'learning';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completed: boolean;
}

const GoalQuest: React.FC = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Morning Workout',
      description: 'Exercise for 30 minutes every morning',
      progress: 75,
      xpReward: 50,
      category: 'health',
      priority: 'high',
      dueDate: '2024-06-20',
      completed: false
    },
    {
      id: '2',
      title: 'Learn React Advanced Patterns',
      description: 'Study and implement advanced React patterns',
      progress: 40,
      xpReward: 100,
      category: 'learning',
      priority: 'medium',
      dueDate: '2024-06-25',
      completed: false
    },
    {
      id: '3',
      title: 'Meditate Daily',
      description: '10 minutes of meditation each day',
      progress: 100,
      xpReward: 30,
      category: 'personal',
      priority: 'medium',
      completed: true
    }
  ]);

  const [userStats, setUserStats] = useState({
    level: 7,
    xp: 1250,
    xpToNextLevel: 1500,
    totalGoalsCompleted: 23,
    streakDays: 12
  });

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal' as const,
    priority: 'medium' as const,
    dueDate: ''
  });

  const addGoal = () => {
    if (newGoal.title && newGoal.description) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        progress: 0,
        xpReward: Math.floor(Math.random() * 80) + 20,
        category: newGoal.category,
        priority: newGoal.priority,
        dueDate: newGoal.dueDate || undefined,
        completed: false
      };

      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        dueDate: ''
      });
      setShowAddGoal(false);
    }
  };

  const updateProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const wasCompleted = goal.completed;
        const isNowCompleted = newProgress >= 100;
        
        if (!wasCompleted && isNowCompleted) {
          setUserStats(prev => ({
            ...prev,
            xp: prev.xp + goal.xpReward,
            totalGoalsCompleted: prev.totalGoalsCompleted + 1
          }));
        }
        
        return {
          ...goal,
          progress: Math.min(newProgress, 100),
          completed: newProgress >= 100
        };
      }
      return goal;
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return <Target className="w-4 h-4" />;
      case 'career': case 'learning': return <Zap className="w-4 h-4" />;
      case 'personal': return <Star className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'career': case 'learning': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'personal': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
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

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-full">
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Level</p>
                <p className="text-3xl font-bold text-white">{userStats.level}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="mt-4">
              <Progress value={(userStats.xp / userStats.xpToNextLevel) * 100} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">
                {userStats.xpToNextLevel - userStats.xp} XP to next level
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total XP</p>
                <p className="text-3xl font-bold text-white">{userStats.xp}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Goals Completed</p>
                <p className="text-3xl font-bold text-white">{userStats.totalGoalsCompleted}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Streak</p>
                <p className="text-3xl font-bold text-white">{userStats.streakDays}</p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals section */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Your Goals</h2>
        <Button 
          onClick={() => setShowAddGoal(true)}
          className="bg-white text-gray-900 hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      {/* Add goal form */}
      {showAddGoal && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Create New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <textarea
                placeholder="Goal description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none resize-none"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-gray-600 focus:outline-none"
              >
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="career">Career</option>
                <option value="learning">Learning</option>
              </select>
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as any})}
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-gray-600 focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={newGoal.dueDate}
                onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div className="flex space-x-3">
              <Button onClick={addGoal} className="bg-white text-gray-900 hover:bg-gray-100">
                Create Goal
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddGoal(false)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card 
            key={goal.id} 
            className={`bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 ${
              goal.completed ? 'bg-green-500/10' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`text-lg ${goal.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {goal.title}
                  </CardTitle>
                  <p className="text-gray-400 text-sm mt-1">{goal.description}</p>
                </div>
                {goal.completed && (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                )}
              </div>
              
              <div className="flex items-center space-x-2 mt-3">
                <Badge className={getCategoryColor(goal.category)}>
                  {getCategoryIcon(goal.category)}
                  <span className="ml-1 capitalize">{goal.category}</span>
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
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-semibold">{goal.xpReward} XP</span>
                  </div>
                  
                  {!goal.completed && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(goal.id, goal.progress + 25)}
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        +25%
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateProgress(goal.id, 100)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Complete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalQuest;
