
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Trophy, Zap, Star, Calendar, Flag, CheckCircle2, ArrowLeft } from 'lucide-react';
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
      case 'health': return 'bg-gradient-to-r from-green-400/20 to-blue-500/20 text-green-300 border-green-400/30';
      case 'career': case 'learning': return 'bg-gradient-to-r from-purple-400/20 to-pink-500/20 text-blue-300 border-blue-400/30';
      case 'personal': return 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-400/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-300 border-gray-400/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 border-red-400/40';
      case 'medium': return 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-300 border-yellow-400/40';
      case 'low': return 'bg-gradient-to-r from-green-400/20 to-teal-400/20 text-green-300 border-green-400/40';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-300 border-gray-400/40';
    }
  };

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
          
          {[...Array(15)].map((_, i) => (
            <path
              key={`curve-${i}`}
              d={`M ${100 + i * 60} 800 Q ${300 + i * 40} ${500 - i * 25} ${700 + i * 30} 100`}
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity={0.03 + (i * 0.02)}
              transform={`rotate(${-3 * i} ${350 + i * 25} 450)`}
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${6 + i * 0.2}s`
              }}
            />
          ))}
        </svg>
      </div>

      {/* Enhanced stars background */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => (
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
        
        {[...Array(25)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          >
            <div 
              className="w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Premium navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-white font-bold text-2xl tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Goal Quest
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold">Level {userStats.level}</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-400/20">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="font-semibold">{userStats.xp} XP</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-400/20">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="font-semibold">{userStats.streakDays} day streak</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
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

          <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
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

          <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300 bg-gradient-to-br from-green-500/5 to-teal-500/5">
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

          <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Your Goals</h2>
          <Button 
            onClick={() => setShowAddGoal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Goal
          </Button>
        </div>

        {/* Add goal form */}
        {showAddGoal && (
          <Card className="glass-morphism border-white/20 mb-6 animate-fade-in bg-gradient-to-br from-white/5 to-white/10">
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
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <div>
                <textarea
                  placeholder="Goal description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                  className="p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="personal">Personal</option>
                  <option value="health">Health</option>
                  <option value="career">Career</option>
                  <option value="learning">Learning</option>
                </select>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as any})}
                  className="p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                  className="p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <div className="flex space-x-3">
                <Button onClick={addGoal} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300">
                  Create Goal
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddGoal(false)}
                  className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
              className={`glass-morphism border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 ${
                goal.completed 
                  ? 'bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-400/30' 
                  : 'bg-gradient-to-br from-white/5 to-white/10'
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
                    <CheckCircle2 className="w-6 h-6 text-green-400 animate-badge-bounce" />
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
                    <Badge className="bg-gradient-to-r from-orange-400/20 to-red-400/20 text-orange-300 border-orange-400/40">
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
                    <Progress 
                      value={goal.progress} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-300">{goal.xpReward} XP</span>
                    </div>
                    
                    {!goal.completed && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProgress(goal.id, goal.progress + 25)}
                          className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                          +25%
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateProgress(goal.id, 100)}
                          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all duration-300"
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
    </div>
  );
};

export default GoalQuest;
