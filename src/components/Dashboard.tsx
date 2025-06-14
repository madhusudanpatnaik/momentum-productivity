
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Circle, 
  Plus, 
  Calendar,
  Settings,
  Clock
} from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  type: 'revenue' | 'personal' | 'project';
  deadline: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const Dashboard: React.FC = () => {
  const keyMetrics: Metric[] = [
    { label: 'Monthly Revenue', value: '$12,450', change: '+15%', isPositive: true },
    { label: 'Active Projects', value: '8', change: '+2', isPositive: true },
    { label: 'Goals Completed', value: '23', change: '+5', isPositive: true },
    { label: 'Daily Streak', value: '12 days', change: '+1', isPositive: true }
  ];

  const goals: Goal[] = [
    { id: '1', title: 'Launch MVP Beta', progress: 75, target: 100, type: 'project', deadline: '2025-01-15' },
    { id: '2', title: 'Reach $50K Revenue', progress: 24900, target: 50000, type: 'revenue', deadline: '2025-03-01' },
    { id: '3', title: 'Save for New Laptop', progress: 850, target: 2000, type: 'personal', deadline: '2025-02-01' },
    { id: '4', title: 'Complete User Research', progress: 60, target: 100, type: 'project', deadline: '2025-01-10' }
  ];

  const achievements: Achievement[] = [
    { id: '1', title: 'First Goal!', description: 'Complete your first goal', earned: true, rarity: 'common' },
    { id: '2', title: 'Streak Master', description: '10 day streak', earned: true, rarity: 'rare' },
    { id: '3', title: 'Revenue Rocket', description: 'Reach $10K revenue', earned: true, rarity: 'epic' },
    { id: '4', title: 'MVP Legend', description: 'Launch 3 MVPs', earned: false, rarity: 'legendary' }
  ];

  const getGoalTypeColor = (type: string) => {
    switch (type) {
      case 'revenue': return 'text-neon-yellow border-neon-yellow';
      case 'personal': return 'text-neon-pink border-neon-pink';
      case 'project': return 'text-neon-blue border-neon-blue';
      default: return 'text-neon-green border-neon-green';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-neon-blue text-pixel-dark';
      case 'epic': return 'bg-neon-purple text-white';
      case 'legendary': return 'bg-gradient-to-r from-neon-yellow to-arcade-orange text-pixel-dark';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-pixel-dark bg-pixel-grid p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-6xl font-retro font-black text-neon-green neon-text mb-2">
            GOAL QUEST
          </h1>
          <p className="text-neon-blue font-pixel text-sm md:text-base">
            Gamify your MVP – For founders, entrepreneurs, builders
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Button className="pixel-button">
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
          <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-pixel-dark">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-pixel-dark">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics - Top Left Priority */}
      <div className="mb-8">
        <h2 className="text-2xl font-retro font-bold text-neon-green mb-4 flex items-center">
          <Circle className="mr-2 h-6 w-6 text-neon-yellow animate-pixel-glow" />
          Mission Control
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="pixel-card">
              <div className="space-y-2">
                <p className="text-xs font-pixel text-retro-cyan uppercase tracking-wider">
                  {metric.label}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-retro font-bold text-neon-green">
                    {metric.value}
                  </span>
                  <Badge className={`${metric.isPositive ? 'bg-neon-green text-pixel-dark' : 'bg-arcade-orange text-pixel-dark'} font-bold`}>
                    {metric.change}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Goals */}
      <div className="mb-8">
        <h2 className="text-2xl font-retro font-bold text-neon-green mb-4 flex items-center">
          <Star className="mr-2 h-6 w-6 text-neon-yellow animate-pulse" />
          Active Quests
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="pixel-card">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-retro font-bold text-neon-green mb-1">
                      {goal.title}
                    </h3>
                    <Badge className={`text-xs ${getGoalTypeColor(goal.type)} bg-transparent`}>
                      {goal.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-pixel text-retro-cyan">
                      {goal.type === 'revenue' 
                        ? `$${goal.progress.toLocaleString()}`
                        : `${Math.round((goal.progress / goal.target) * 100)}%`
                      }
                    </div>
                    <div className="text-xs text-neon-pink flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {goal.deadline}
                    </div>
                  </div>
                </div>
                
                <div className="progress-bar-pixel">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                  />
                </div>
                
                <div className="text-xs font-pixel text-retro-cyan">
                  {goal.type === 'revenue' 
                    ? `$${goal.progress.toLocaleString()} / $${goal.target.toLocaleString()}`
                    : `${goal.progress} / ${goal.target}`
                  }
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-2xl font-retro font-bold text-neon-green mb-4 flex items-center">
          <Star className="mr-2 h-6 w-6 text-neon-yellow" />
          Achievement Vault
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`pixel-card ${achievement.earned ? 'animate-badge-bounce' : 'opacity-50'}`}
            >
              <div className="text-center space-y-2">
                <Badge className={`${getRarityColor(achievement.rarity)} font-bold text-xs`}>
                  {achievement.rarity.toUpperCase()}
                </Badge>
                <h3 className="font-retro font-bold text-neon-green text-sm">
                  {achievement.title}
                </h3>
                <p className="text-xs font-pixel text-retro-cyan">
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <div className="text-neon-yellow animate-pulse">
                    <Star className="h-6 w-6 mx-auto" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="text-center">
        <Card className="pixel-card max-w-2xl mx-auto">
          <div className="space-y-2">
            <p className="font-retro text-neon-green text-lg md:text-xl">
              "Every expert was once a beginner."
            </p>
            <p className="text-xs font-pixel text-retro-cyan">
              Daily Motivation • Level up your mindset
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
