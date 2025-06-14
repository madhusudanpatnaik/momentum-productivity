
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGoalsStore } from "@/stores/goalsStore";
import { useNotifications } from "@/hooks/useNotifications";
import { 
  Target, 
  Plus, 
  Calendar, 
  Star, 
  Trophy,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Flag
} from 'lucide-react';

const GoalsComponent = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal' as any,
    priority: 'medium' as any,
    targetDate: '',
    xpReward: 100
  });
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    xpReward: 50
  });

  const {
    goals,
    milestones,
    totalXP,
    completedGoals,
    streak,
    addGoal,
    updateGoal,
    removeGoal,
    completeGoal,
    addMilestone,
    toggleMilestone,
    removeMilestone
  } = useGoalsStore();

  const { showSuccess, showError } = useNotifications();

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.targetDate) {
      showError('Please fill in all required fields');
      return;
    }

    addGoal({
      ...newGoal,
      status: 'not-started',
      progress: 0
    });

    setNewGoal({
      title: '',
      description: '',
      category: 'personal',
      priority: 'medium',
      targetDate: '',
      xpReward: 100
    });
    setShowAddGoal(false);
    showSuccess('Goal added successfully!');
  };

  const handleAddMilestone = (goalId: string) => {
    if (!newMilestone.title || !newMilestone.description) {
      showError('Please fill in all milestone fields');
      return;
    }

    addMilestone({
      ...newMilestone,
      goalId,
      completed: false
    });

    setNewMilestone({
      title: '',
      description: '',
      xpReward: 50
    });
    setShowAddMilestone(null);
    showSuccess('Milestone added successfully!');
  };

  const handleCompleteGoal = (goalId: string) => {
    completeGoal(goalId);
    showSuccess('Congratulations! Goal completed! 🎉');
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'completed') return goal.status === 'completed';
    if (filter === 'in-progress') return goal.status === 'in-progress';
    if (filter === 'not-started') return goal.status === 'not-started';
    return goal.category === filter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-purple-500/20 text-purple-300';
      case 'professional': return 'bg-blue-500/20 text-blue-300';
      case 'health': return 'bg-green-500/20 text-green-300';
      case 'financial': return 'bg-yellow-500/20 text-yellow-300';
      case 'learning': return 'bg-indigo-500/20 text-indigo-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'not-started': return <Target className="w-4 h-4 text-gray-400" />;
      default: return <Target className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Goals & Achievements</h1>
          <p className="text-gray-400">Track your progress and achieve your dreams</p>
        </div>
        <Button
          onClick={() => setShowAddGoal(true)}
          className="bg-white text-gray-900 hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total XP</p>
                <p className="text-2xl font-bold text-white">{totalXP.toLocaleString()}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Completed Goals</p>
                <p className="text-2xl font-bold text-white">{completedGoals}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Streak</p>
                <p className="text-2xl font-bold text-white">{streak} days</p>
              </div>
              <Flag className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Goals</p>
                <p className="text-2xl font-bold text-white">{goals.filter(g => g.status !== 'completed').length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'in-progress', 'completed', 'personal', 'professional', 'health', 'financial', 'learning'].map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterType)}
            className={filter === filterType ? "bg-white text-gray-900" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Button>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Add New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Textarea
              placeholder="Goal description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <Select value={newGoal.category} onValueChange={(value: any) => setNewGoal({...newGoal, category: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={newGoal.priority} onValueChange={(value: any) => setNewGoal({...newGoal, priority: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="number"
                placeholder="XP Reward"
                value={newGoal.xpReward}
                onChange={(e) => setNewGoal({...newGoal, xpReward: parseInt(e.target.value)})}
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
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => {
          const goalMilestones = milestones.filter(m => m.goalId === goal.id);
          return (
            <Card key={goal.id} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(goal.status)}
                    <CardTitle className="text-white text-lg">{goal.title}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                    <Badge className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeGoal(goal.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm">{goal.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {new Date(goal.targetDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    {goal.xpReward} XP
                  </div>
                </div>

                {goal.status !== 'completed' && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleCompleteGoal(goal.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Goal
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddMilestone(goal.id)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Milestone
                    </Button>
                  </div>
                )}

                {/* Milestones */}
                {goalMilestones.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Milestones</h4>
                    {goalMilestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={milestone.completed}
                            onChange={() => toggleMilestone(milestone.id)}
                            className="rounded"
                          />
                          <span className={`text-sm ${milestone.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                            {milestone.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-yellow-400">{milestone.xpReward} XP</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMilestone(milestone.id)}
                            className="text-gray-400 hover:text-red-400 h-6 w-6"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Milestone Form */}
                {showAddMilestone === goal.id && (
                  <div className="space-y-2 p-3 bg-gray-800 rounded">
                    <Input
                      placeholder="Milestone title"
                      value={newMilestone.title}
                      onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Textarea
                      placeholder="Milestone description"
                      value={newMilestone.description}
                      onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="XP Reward"
                        value={newMilestone.xpReward}
                        onChange={(e) => setNewMilestone({...newMilestone, xpReward: parseInt(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Button
                        onClick={() => handleAddMilestone(goal.id)}
                        className="bg-white text-gray-900 hover:bg-gray-100"
                      >
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddMilestone(null)}
                        className="border-gray-600 text-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsComponent;
