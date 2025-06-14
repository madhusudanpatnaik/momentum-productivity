
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, Star, Target, Gauge } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'goal' | 'task' | 'metric' | 'health';
  completed: boolean;
  xp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  badge: string;
  unlocked: boolean;
  xp: number;
}

const DailyReminders: React.FC = () => {
  const [dailyReminders, setDailyReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Review Daily Metrics',
      description: 'Check revenue, user growth, and project progress',
      type: 'metric',
      completed: false,
      xp: 25
    },
    {
      id: '2',
      title: 'Update Goal Progress',
      description: 'Mark progress on your active goals',
      type: 'goal',
      completed: true,
      xp: 30
    },
    {
      id: '3',
      title: 'Plan Tomorrow',
      description: 'Set 3 priority tasks for tomorrow',
      type: 'task',
      completed: false,
      xp: 20
    },
    {
      id: '4',
      title: 'Take a Break',
      description: 'Step away from work for 15 minutes',
      type: 'health',
      completed: false,
      xp: 15
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Streak Master',
      description: 'Complete daily check-ins for 7 days',
      badge: '🔥',
      unlocked: true,
      xp: 100
    },
    {
      id: '2',
      title: 'Goal Crusher',
      description: 'Complete 5 goals in a month',
      badge: '🎯',
      unlocked: false,
      xp: 200
    },
    {
      id: '3',
      title: 'Revenue Rockstar',
      description: 'Reach $50K monthly revenue',
      badge: '💰',
      unlocked: true,
      xp: 500
    },
    {
      id: '4',
      title: 'Task Terminator',
      description: 'Complete 100 tasks',
      badge: '⚡',
      unlocked: false,
      xp: 150
    }
  ]);

  const [userLevel] = useState({
    level: 12,
    xp: 2840,
    xpToNext: 3200,
    streak: 28
  });

  const completedToday = dailyReminders.filter(r => r.completed).length;
  const totalToday = dailyReminders.length;
  const dailyProgress = (completedToday / totalToday) * 100;

  const toggleReminder = (id: string) => {
    setDailyReminders(reminders =>
      reminders.map(reminder =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'goal': return <Target className="w-4 h-4" />;
      case 'task': return <Check className="w-4 h-4" />;
      case 'metric': return <Gauge className="w-4 h-4" />;
      case 'health': return <Star className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'goal': return 'bg-green-500/20 text-green-300 border-green-500/40';
      case 'task': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'metric': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'health': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-6xl">🌟</div>
        <h2 className="text-3xl font-bold text-white">Daily Quest Hub</h2>
        <p className="text-gray-400">Complete your daily tasks and level up your entrepreneur journey!</p>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-gray-400 text-sm mb-1">Current Level</p>
            <p className="text-3xl font-bold text-white">{userLevel.level}</p>
            <div className="mt-4">
              <Progress value={(userLevel.xp / userLevel.xpToNext) * 100} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">
                {userLevel.xp} / {userLevel.xpToNext} XP
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-gray-400 text-sm mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-white">{userLevel.streak}</p>
            <p className="text-xs text-gray-400 mt-2">days in a row</p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover:border-white/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-gray-400 text-sm mb-1">Today's Progress</p>
            <p className="text-3xl font-bold text-white">{completedToday}/{totalToday}</p>
            <div className="mt-4">
              <Progress value={dailyProgress} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">
                {Math.round(dailyProgress)}% complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Reminders */}
        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Today's Quests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dailyReminders.map((reminder) => (
              <div 
                key={reminder.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  reminder.completed 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-white/5 border-white/20 hover:border-white/40'
                }`}
                onClick={() => toggleReminder(reminder.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    reminder.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-400 hover:border-white'
                  }`}>
                    {reminder.completed && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      reminder.completed ? 'line-through text-gray-400' : 'text-white'
                    }`}>
                      {reminder.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{reminder.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(reminder.type)}>
                    {getTypeIcon(reminder.type)}
                    <span className="ml-1 capitalize">{reminder.type}</span>
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                    {reminder.xp} XP
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-yellow-500/10 border-yellow-500/30' 
                    : 'bg-white/5 border-white/20'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{achievement.badge}</div>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.unlocked ? 'text-yellow-300' : 'text-white'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={
                    achievement.unlocked 
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                      : 'bg-gray-500/20 text-gray-300 border-gray-500/40'
                  }>
                    {achievement.unlocked ? 'Unlocked' : 'Locked'}
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/40">
                    {achievement.xp} XP
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Motivational Section */}
      <Card className="glass-morphism border-white/20 text-center">
        <CardContent className="p-8">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-2">Keep Going, Entrepreneur!</h3>
          <p className="text-gray-400 mb-6">
            Every small step today brings you closer to your big dreams tomorrow.
          </p>
          <div className="text-lg text-white">
            "Success is the sum of small efforts repeated day in and day out."
          </div>
          <div className="text-gray-400 text-sm mt-2">- Robert Collier</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyReminders;
