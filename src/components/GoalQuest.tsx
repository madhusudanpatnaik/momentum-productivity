
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Trophy, Calendar, CheckCircle, Star } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  category: 'personal' | 'professional' | 'fitness' | 'learning';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  xpReward: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  xpValue: number;
}

const GoalQuest: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete MVP',
      description: 'Build and launch the minimum viable product',
      progress: 75,
      target: 100,
      category: 'professional',
      priority: 'high',
      dueDate: '2024-07-01',
      completed: false,
      xpReward: 500
    },
    {
      id: '2',
      title: 'Learn TypeScript',
      description: 'Master TypeScript fundamentals and advanced concepts',
      progress: 60,
      target: 100,
      category: 'learning',
      priority: 'medium',
      dueDate: '2024-06-30',
      completed: false,
      xpReward: 300
    }
  ]);

  const [userStats, setUserStats] = useState({
    level: 12,
    xp: 2840,
    xpToNext: 160,
    totalGoals: 15,
    completedGoals: 8,
    streakDays: 7
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Goal',
      description: 'Complete your first goal',
      icon: '🎯',
      unlocked: true,
      xpValue: 100
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: true,
      xpValue: 200
    },
    {
      id: '3',
      title: 'Level Up',
      description: 'Reach level 10',
      icon: '⚡',
      unlocked: true,
      xpValue: 300
    }
  ]);

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const addGoal = () => {
    if (newGoalTitle.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: newGoalTitle,
        description: 'New goal description',
        progress: 0,
        target: 100,
        category: 'personal',
        priority: 'medium',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        xpReward: 250
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setShowAddGoal(false);
    }
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const completed = newProgress >= goal.target;
        if (completed && !goal.completed) {
          setUserStats(prev => ({
            ...prev,
            xp: prev.xp + goal.xpReward,
            completedGoals: prev.completedGoals + 1
          }));
        }
        return { ...goal, progress: newProgress, completed };
      }
      return goal;
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'professional': return 'bg-blue-500';
      case 'personal': return 'bg-green-500';
      case 'fitness': return 'bg-red-500';
      case 'learning': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header with user stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-6 h-6" />
              Level {userStats.level} Quester
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>XP Progress</span>
                  <span>{userStats.xp} / {userStats.xp + userStats.xpToNext}</span>
                </div>
                <Progress value={(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100} className="h-3" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{userStats.completedGoals}</div>
                  <div className="text-sm opacity-90">Goals Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.streakDays}</div>
                  <div className="text-sm opacity-90">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.totalGoals}</div>
                  <div className="text-sm opacity-90">Total Goals</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:w-80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.filter(a => a.unlocked).slice(0, 3).map(achievement => (
                <div key={achievement.id} className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{achievement.title}</div>
                    <div className="text-xs text-gray-500">{achievement.description}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">+{achievement.xpValue} XP</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Quests
            </CardTitle>
            <Button onClick={() => setShowAddGoal(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Quest
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddGoal && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your new goal..."
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                />
                <Button onClick={addGoal}>Add</Button>
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {goals.map(goal => (
              <div key={goal.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{goal.title}</h3>
                      <Badge className={getCategoryColor(goal.category)} variant="secondary">
                        {goal.category}
                      </Badge>
                      <Badge className={getPriorityColor(goal.priority)} variant="outline">
                        {goal.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {goal.dueDate}
                      </span>
                      <span>Reward: {goal.xpReward} XP</span>
                    </div>
                  </div>
                  {goal.completed && (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}% / {goal.target}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 10, goal.target))}
                      disabled={goal.completed}
                    >
                      +10%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 25, goal.target))}
                      disabled={goal.completed}
                    >
                      +25%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateGoalProgress(goal.id, goal.target)}
                      disabled={goal.completed}
                    >
                      Complete
                    </Button>
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

export default GoalQuest;
