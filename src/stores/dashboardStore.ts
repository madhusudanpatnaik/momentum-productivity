import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface Customer {
  id: string;
  name: string;
  address: string;
  time: string;
  price: string;
  payment: string;
  date: string;
  status: 'Delivered';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo?: string;
  notes?: string;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  category: 'Revenue' | 'Customer' | 'Operational' | 'Personal';
  deadline: string;
  status: 'Active' | 'Completed' | 'Paused';
  linkedCustomers?: string[];
}

interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'customer_added' | 'customer_updated' | 'goal_updated' | 'goal_completed';
  description: string;
  entityId: string;
  entityType: 'customer' | 'goal';
  oldValue?: any;
  newValue?: any;
}

interface DashboardStats {
  activeGoals: number;
  completedToday: number;
  streakDays: number;
  totalXP: number;
  totalCustomers: number;
  orders: number;
  revenue: number;
  growth: number;
  deliveredOrders: number;
  averageOrderValue: number;
  completionRate: number;
  dailyTarget: number;
  monthlyTarget: number;
}

interface WorkflowMetrics {
  totalTasks: number;
  completedTasks: number;
  efficiency: number;
  avgCompletionTime: number;
}

interface DashboardState {
  stats: DashboardStats;
  customers: Customer[];
  goals: Goal[];
  activityLog: ActivityLog[];
  workflowMetrics: WorkflowMetrics;
  revenueData: Array<{ month: string; revenue: number; target: number }>;
  taskData: Array<{ day: string; completed: number; total: number }>;
  goalProgress: Array<{ name: string; value: number; color: string }>;
  performanceData: Array<{ date: string; efficiency: number; completed: number; target: number }>;
  
  // Core Actions
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  completeGoal: (id: string) => void;
  completeTask: () => void;
  exportData: () => void;
  
  // Workflow Actions
  calculateStats: () => void;
  updateWorkflowMetrics: () => void;
  addActivityLog: (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  getRecentActivity: () => ActivityLog[];
  getGoalsByCategory: (category: Goal['category']) => Goal[];
  updateDashboardMetrics: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  subscribeWithSelector((set, get) => ({
    stats: {
      activeGoals: 8,
      completedToday: 3,
      streakDays: 12,
      totalXP: 2450,
      totalCustomers: 2847,
      orders: 1429,
      revenue: 24780,
      growth: 18.2,
      deliveredOrders: 1429,
      averageOrderValue: 17.35,
      completionRate: 100,
      dailyTarget: 50,
      monthlyTarget: 1500
    },
    
    customers: [
      {
        id: "1247",
        name: "Alice Smith",
        address: "448 Kutch Green Apt. 089",
        time: "10:15 AM",
        price: "$15.50",
        payment: "Online",
        date: "24/10/04",
        status: "Delivered",
        priority: "High",
        assignedTo: "Team A",
        notes: "Rush order - customer event"
      },
      {
        id: "1248",
        name: "John Doe",
        address: "102 Suite, West Cliff Blvd. 512",
        time: "11:00 AM",
        price: "$13.50",
        payment: "Cash",
        date: "24/10/04",
        status: "Delivered",
        priority: "Medium",
        assignedTo: "Team B"
      },
      {
        id: "1249",
        name: "Maria Garcia",
        address: "302 Unit, Oceanview Dr.",
        time: "11:12 AM",
        price: "$17.00",
        payment: "Online",
        date: "24/10/04",
        status: "Delivered",
        priority: "Low",
        assignedTo: "Team A"
      }
    ],

    goals: [
      { 
        id: '1', 
        title: 'Monthly Revenue Goal', 
        progress: 78, 
        target: 100, 
        category: 'Revenue',
        deadline: '2024-10-31',
        status: 'Active',
        linkedCustomers: ['1247', '1248']
      },
      { 
        id: '2', 
        title: 'Customer Satisfaction', 
        progress: 65, 
        target: 100, 
        category: 'Customer',
        deadline: '2024-10-15',
        status: 'Active'
      },
      { 
        id: '3', 
        title: 'Delivery Efficiency', 
        progress: 92, 
        target: 100, 
        category: 'Operational',
        deadline: '2024-10-20',
        status: 'Active'
      }
    ],

    activityLog: [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'customer_added',
        description: 'New customer Alice Smith added',
        entityId: '1247',
        entityType: 'customer'
      }
    ],

    workflowMetrics: {
      totalTasks: 45,
      completedTasks: 38,
      pendingTasks: 7,
      overdueTasks: 2,
      efficiency: 84.4,
      avgCompletionTime: 2.5
    },

    revenueData: [
      { month: 'Jan', revenue: 12000, target: 15000 },
      { month: 'Feb', revenue: 18000, target: 15000 },
      { month: 'Mar', revenue: 14000, target: 15000 },
      { month: 'Apr', revenue: 22000, target: 15000 },
      { month: 'May', revenue: 24000, target: 15000 },
      { month: 'Jun', revenue: 28000, target: 15000 }
    ],

    taskData: [
      { day: 'Mon', completed: 8, total: 12 },
      { day: 'Tue', completed: 6, total: 10 },
      { day: 'Wed', completed: 9, total: 11 },
      { day: 'Thu', completed: 12, total: 15 },
      { day: 'Fri', completed: 7, total: 9 },
      { day: 'Sat', completed: 5, total: 6 },
      { day: 'Sun', completed: 3, total: 4 }
    ],

    goalProgress: [
      { name: 'Completed', value: 65, color: '#10b981' },
      { name: 'In Progress', value: 25, color: '#3b82f6' },
      { name: 'Remaining', value: 10, color: '#6b7280' }
    ],

    performanceData: [
      { date: '2024-10-01', efficiency: 85, completed: 12, target: 15 },
      { date: '2024-10-02', efficiency: 90, completed: 14, target: 15 },
      { date: '2024-10-03', efficiency: 82, completed: 11, target: 15 },
      { date: '2024-10-04', efficiency: 88, completed: 13, target: 15 }
    ],

    addCustomer: (customerData: Omit<Customer, 'id'>) => {
      const { addActivityLog, updateDashboardMetrics } = get();
      const newCustomer: Customer = {
        ...customerData,
        id: (Date.now()).toString(),
        priority: customerData.priority || 'Medium',
        status: 'Delivered'
      };

      set((state) => ({
        customers: [newCustomer, ...state.customers]
      }));

      addActivityLog({
        type: 'customer_added',
        description: `New customer ${newCustomer.name} added`,
        entityId: newCustomer.id,
        entityType: 'customer'
      });

      updateDashboardMetrics();
    },

    updateCustomer: (id: string, updates: Partial<Customer>) => {
      const { customers, addActivityLog } = get();
      const customer = customers.find(c => c.id === id);

      set((state) => ({
        customers: state.customers.map(customer =>
          customer.id === id ? { ...customer, ...updates } : customer
        )
      }));

      if (customer) {
        addActivityLog({
          type: 'customer_updated',
          description: `Customer ${customer.name} updated`,
          entityId: id,
          entityType: 'customer'
        });
      }
    },

    updateGoalProgress: (id: string, progress: number) => {
      const { goals, addActivityLog, updateDashboardMetrics } = get();
      const goal = goals.find(g => g.id === id);
      const oldProgress = goal?.progress || 0;

      set((state) => ({
        goals: state.goals.map(goal =>
          goal.id === id ? { ...goal, progress: Math.min(progress, 100) } : goal
        )
      }));

      if (goal) {
        addActivityLog({
          type: 'goal_updated',
          description: `Goal "${goal.title}" progress updated to ${progress}%`,
          entityId: id,
          entityType: 'goal',
          oldValue: oldProgress,
          newValue: progress
        });

        if (progress === 100 && oldProgress < 100) {
          get().completeGoal(id);
        }
      }

      updateDashboardMetrics();
    },

    addGoal: (goalData: Omit<Goal, 'id'>) => {
      const { addActivityLog, updateDashboardMetrics } = get();
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        status: 'Active'
      };

      set((state) => ({
        goals: [...state.goals, newGoal]
      }));

      addActivityLog({
        type: 'goal_updated',
        description: `New goal "${newGoal.title}" created`,
        entityId: newGoal.id,
        entityType: 'goal'
      });

      updateDashboardMetrics();
    },

    updateGoal: (id: string, updates: Partial<Goal>) => {
      const { goals, addActivityLog } = get();
      const goal = goals.find(g => g.id === id);

      set((state) => ({
        goals: state.goals.map(goal =>
          goal.id === id ? { ...goal, ...updates } : goal
        )
      }));

      if (goal) {
        addActivityLog({
          type: 'goal_updated',
          description: `Goal "${goal.title}" updated`,
          entityId: id,
          entityType: 'goal'
        });
      }
    },

    completeGoal: (id: string) => {
      const { goals, addActivityLog, completeTask } = get();
      const goal = goals.find(g => g.id === id);

      if (goal && goal.status !== 'Completed') {
        set((state) => ({
          goals: state.goals.map(g =>
            g.id === id ? { ...g, status: 'Completed', progress: 100 } : g
          )
        }));

        addActivityLog({
          type: 'goal_completed',
          description: `Goal "${goal.title}" completed! 🎉`,
          entityId: id,
          entityType: 'goal'
        });

        completeTask();
      }
    },

    completeTask: () => {
      set((state) => ({
        stats: {
          ...state.stats,
          completedToday: state.stats.completedToday + 1,
          totalXP: state.stats.totalXP + 50
        }
      }));
    },

    exportData: () => {
      const data = get();
      const exportData = {
        customers: data.customers,
        stats: data.stats,
        goals: data.goals,
        activityLog: data.activityLog,
        workflowMetrics: data.workflowMetrics,
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    },

    calculateStats: () => {
      const { customers, goals } = get();
      
      const deliveredOrders = customers.length;
      const totalOrders = customers.length;
      
      const totalRevenue = customers.reduce((sum, customer) => {
        const price = parseFloat(customer.price.replace('$', ''));
        return sum + (isNaN(price) ? 0 : price);
      }, 0);
      
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const completionRate = 100; // All orders are delivered
      const activeGoals = goals.filter(g => g.status === 'Active').length;

      set((state) => ({
        stats: {
          ...state.stats,
          totalCustomers: totalOrders,
          orders: totalOrders,
          revenue: totalRevenue,
          deliveredOrders,
          averageOrderValue,
          completionRate,
          activeGoals
        }
      }));
    },

    updateWorkflowMetrics: () => {
      const { customers, goals } = get();
      
      const totalTasks = customers.length + goals.length;
      const completedTasks = customers.length + goals.filter(g => g.status === 'Completed').length;
      const efficiency = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      set((state) => ({
        workflowMetrics: {
          ...state.workflowMetrics,
          totalTasks,
          completedTasks,
          efficiency
        }
      }));
    },

    updateDashboardMetrics: () => {
      get().calculateStats();
      get().updateWorkflowMetrics();
    },

    addActivityLog: (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => {
      const newActivity: ActivityLog = {
        ...activity,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };

      set((state) => ({
        activityLog: [newActivity, ...state.activityLog.slice(0, 49)] // Keep last 50 activities
      }));
    },

    getRecentActivity: () => {
      const { activityLog } = get();
      return activityLog.slice(0, 10);
    },

    getGoalsByCategory: (category: Goal['category']) => {
      const { goals } = get();
      return goals.filter(goal => goal.category === category);
    }
  }))
);

// Subscribe to store changes to automatically update metrics
useDashboardStore.subscribe(
  (state) => state.customers,
  () => {
    useDashboardStore.getState().updateDashboardMetrics();
  }
);

useDashboardStore.subscribe(
  (state) => state.goals,
  () => {
    useDashboardStore.getState().updateDashboardMetrics();
  }
);
