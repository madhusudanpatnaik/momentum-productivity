
import { create } from 'zustand';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'personal' | 'professional' | 'health' | 'financial' | 'learning';
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  targetDate: string;
  createdDate: string;
  xpReward: number;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  description: string;
  completed: boolean;
  completedDate?: string;
  xpReward: number;
}

interface GoalsState {
  goals: Goal[];
  milestones: Milestone[];
  totalXP: number;
  completedGoals: number;
  streak: number;
  addGoal: (goal: Omit<Goal, 'id' | 'createdDate'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  completeGoal: (id: string) => void;
  addMilestone: (milestone: Omit<Milestone, 'id'>) => void;
  toggleMilestone: (milestoneId: string) => void;
  removeMilestone: (id: string) => void;
}

export const useGoalsStore = create<GoalsState>((set, get) => ({
  goals: [
    {
      id: '1',
      title: 'Learn React Advanced Patterns',
      description: 'Master advanced React patterns including render props, compound components, and custom hooks',
      category: 'learning',
      priority: 'high',
      status: 'in-progress',
      progress: 65,
      targetDate: '2024-08-15',
      createdDate: '2024-06-01',
      xpReward: 500
    },
    {
      id: '2',
      title: 'Complete Marathon Training',
      description: 'Train for and complete a full marathon in under 4 hours',
      category: 'health',
      priority: 'medium',
      status: 'in-progress',
      progress: 45,
      targetDate: '2024-10-20',
      createdDate: '2024-05-15',
      xpReward: 750
    },
    {
      id: '3',
      title: 'Build Investment Portfolio',
      description: 'Create a diversified investment portfolio with $50k target',
      category: 'financial',
      priority: 'high',
      status: 'in-progress',
      progress: 78,
      targetDate: '2024-12-31',
      createdDate: '2024-01-01',
      xpReward: 1000
    }
  ],

  milestones: [
    {
      id: '1',
      goalId: '1',
      title: 'Complete React Hooks Course',
      description: 'Finish the advanced React hooks online course',
      completed: true,
      completedDate: '2024-06-10',
      xpReward: 100
    },
    {
      id: '2',
      goalId: '1',
      title: 'Build Practice Project',
      description: 'Create a project using compound components pattern',
      completed: false,
      xpReward: 150
    },
    {
      id: '3',
      goalId: '2',
      title: 'Run 10K without stopping',
      description: 'Complete a 10K run without walking breaks',
      completed: true,
      completedDate: '2024-06-05',
      xpReward: 200
    }
  ],

  totalXP: 2450,
  completedGoals: 8,
  streak: 12,

  addGoal: (goalData) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    set((state) => ({
      goals: [...state.goals, newGoal]
    }));
  },

  updateGoal: (id, updates) => {
    set((state) => ({
      goals: state.goals.map(goal =>
        goal.id === id ? { ...goal, ...updates } : goal
      )
    }));
  },

  removeGoal: (id) => {
    set((state) => ({
      goals: state.goals.filter(goal => goal.id !== id),
      milestones: state.milestones.filter(milestone => milestone.goalId !== id)
    }));
  },

  completeGoal: (id) => {
    const goal = get().goals.find(g => g.id === id);
    if (goal && goal.status !== 'completed') {
      set((state) => ({
        goals: state.goals.map(g =>
          g.id === id ? { ...g, status: 'completed', progress: 100 } : g
        ),
        totalXP: state.totalXP + goal.xpReward,
        completedGoals: state.completedGoals + 1
      }));
    }
  },

  addMilestone: (milestoneData) => {
    const newMilestone: Milestone = {
      ...milestoneData,
      id: Date.now().toString()
    };
    set((state) => ({
      milestones: [...state.milestones, newMilestone]
    }));
  },

  toggleMilestone: (milestoneId) => {
    const milestone = get().milestones.find(m => m.id === milestoneId);
    if (milestone) {
      const isCompleting = !milestone.completed;
      set((state) => ({
        milestones: state.milestones.map(m =>
          m.id === milestoneId
            ? {
                ...m,
                completed: isCompleting,
                completedDate: isCompleting ? new Date().toISOString().split('T')[0] : undefined
              }
            : m
        ),
        totalXP: isCompleting
          ? state.totalXP + milestone.xpReward
          : state.totalXP - milestone.xpReward
      }));
    }
  },

  removeMilestone: (id) => {
    set((state) => ({
      milestones: state.milestones.filter(milestone => milestone.id !== id)
    }));
  }
}));
