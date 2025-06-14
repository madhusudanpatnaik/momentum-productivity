
import { create } from 'zustand';

interface Customer {
  id: string;
  name: string;
  address: string;
  time: string;
  price: string;
  payment: string;
  date: string;
  status: 'Pending' | 'On Delivery' | 'Delivered';
  priority: 'Low' | 'Medium' | 'High';
  workflowStage: 'Order Received' | 'Processing' | 'In Transit' | 'Completed';
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  workflowStatus: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  dueDate: string;
  assignee?: string;
}

interface WorkflowStage {
  id: string;
  name: string;
  count: number;
  color: string;
  nextStage?: string;
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
  workflowEfficiency: number;
  avgCompletionTime: number;
}

interface DashboardState {
  stats: DashboardStats;
  customers: Customer[];
  goals: Goal[];
  workflowStages: WorkflowStage[];
  revenueData: Array<{ month: string; revenue: number; target: number }>;
  taskData: Array<{ day: string; completed: number; total: number }>;
  goalProgress: Array<{ name: string; value: number; color: string }>;
  workflowData: Array<{ stage: string; count: number; efficiency: number }>;
  updateCustomerStatus: (id: string, status: Customer['status']) => void;
  updateCustomerWorkflow: (id: string, stage: Customer['workflowStage']) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  updateGoalWorkflow: (id: string, workflowStatus: Goal['workflowStatus']) => void;
  completeTask: () => void;
  exportData: () => void;
  calculateWorkflowMetrics: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: {
    activeGoals: 8,
    completedToday: 3,
    streakDays: 12,
    totalXP: 2450,
    totalCustomers: 2847,
    orders: 1429,
    revenue: 24780,
    growth: 18.2,
    workflowEfficiency: 87.5,
    avgCompletionTime: 2.3
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
      status: "Pending",
      priority: "High",
      workflowStage: "Order Received"
    },
    {
      id: "1248",
      name: "John Doe",
      address: "102 Suite, West Cliff Blvd. 512",
      time: "11:00 AM",
      price: "$13.50",
      payment: "Cash",
      date: "24/10/04",
      status: "On Delivery",
      priority: "Medium",
      workflowStage: "In Transit"
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
      workflowStage: "Completed"
    }
  ],

  goals: [
    { 
      id: '1', 
      title: 'Monthly Revenue Goal', 
      progress: 78, 
      target: 100, 
      workflowStatus: 'In Progress',
      dueDate: '2024-10-31',
      assignee: 'Sales Team'
    },
    { 
      id: '2', 
      title: 'Product Development', 
      progress: 65, 
      target: 100, 
      workflowStatus: 'Review',
      dueDate: '2024-11-15',
      assignee: 'Dev Team'
    },
    { 
      id: '3', 
      title: 'Marketing Campaign', 
      progress: 92, 
      target: 100, 
      workflowStatus: 'In Progress',
      dueDate: '2024-10-25',
      assignee: 'Marketing Team'
    }
  ],

  workflowStages: [
    { id: '1', name: 'Order Received', count: 15, color: '#3b82f6', nextStage: 'Processing' },
    { id: '2', name: 'Processing', count: 8, color: '#f59e0b', nextStage: 'In Transit' },
    { id: '3', name: 'In Transit', count: 12, color: '#8b5cf6', nextStage: 'Completed' },
    { id: '4', name: 'Completed', count: 23, color: '#10b981' }
  ],

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

  workflowData: [
    { stage: 'Planning', count: 5, efficiency: 95 },
    { stage: 'In Progress', count: 12, efficiency: 87 },
    { stage: 'Review', count: 8, efficiency: 92 },
    { stage: 'Completed', count: 23, efficiency: 98 }
  ],

  updateCustomerStatus: (id: string, status: Customer['status']) => {
    set((state) => ({
      customers: state.customers.map(customer =>
        customer.id === id ? { ...customer, status } : customer
      )
    }));
    get().calculateWorkflowMetrics();
  },

  updateCustomerWorkflow: (id: string, stage: Customer['workflowStage']) => {
    set((state) => ({
      customers: state.customers.map(customer =>
        customer.id === id ? { ...customer, workflowStage: stage } : customer
      )
    }));
    get().calculateWorkflowMetrics();
  },

  addCustomer: (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: (Date.now()).toString(),
      priority: 'Medium',
      workflowStage: 'Order Received'
    };
    set((state) => ({
      customers: [newCustomer, ...state.customers],
      stats: {
        ...state.stats,
        totalCustomers: state.stats.totalCustomers + 1,
        orders: state.stats.orders + 1
      }
    }));
    get().calculateWorkflowMetrics();
  },

  updateGoalProgress: (id: string, progress: number) => {
    set((state) => ({
      goals: state.goals.map(goal =>
        goal.id === id ? { ...goal, progress: Math.min(progress, 100) } : goal
      )
    }));
    get().calculateWorkflowMetrics();
  },

  updateGoalWorkflow: (id: string, workflowStatus: Goal['workflowStatus']) => {
    set((state) => ({
      goals: state.goals.map(goal =>
        goal.id === id ? { ...goal, workflowStatus } : goal
      )
    }));
    get().calculateWorkflowMetrics();
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

  calculateWorkflowMetrics: () => {
    const state = get();
    const totalCustomers = state.customers.length;
    const completedCustomers = state.customers.filter(c => c.workflowStage === 'Completed').length;
    const workflowEfficiency = totalCustomers > 0 ? (completedCustomers / totalCustomers) * 100 : 0;
    
    // Update workflow stages count
    const updatedStages = state.workflowStages.map(stage => ({
      ...stage,
      count: state.customers.filter(c => c.workflowStage === stage.name).length
    }));

    set((state) => ({
      stats: {
        ...state.stats,
        workflowEfficiency: Math.round(workflowEfficiency * 10) / 10
      },
      workflowStages: updatedStages
    }));
  },

  exportData: () => {
    const data = get();
    const exportData = {
      customers: data.customers,
      stats: data.stats,
      goals: data.goals,
      workflowStages: data.workflowStages,
      workflowData: data.workflowData,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-workflow-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}));
