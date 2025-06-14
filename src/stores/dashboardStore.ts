
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
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
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
}

interface DashboardState {
  stats: DashboardStats;
  customers: Customer[];
  goals: Goal[];
  revenueData: Array<{ month: string; revenue: number; target: number }>;
  taskData: Array<{ day: string; completed: number; total: number }>;
  goalProgress: Array<{ name: string; value: number; color: string }>;
  updateCustomerStatus: (id: string, status: Customer['status']) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  completeTask: () => void;
  exportData: () => void;
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
    growth: 18.2
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
      status: "Pending"
    },
    {
      id: "1248",
      name: "John Doe",
      address: "102 Suite, West Cliff Blvd. 512",
      time: "11:00 AM",
      price: "$13.50",
      payment: "Cash",
      date: "24/10/04",
      status: "On Delivery"
    },
    {
      id: "1249",
      name: "Maria Garcia",
      address: "302 Unit, Oceanview Dr.",
      time: "11:12 AM",
      price: "$17.00",
      payment: "Online",
      date: "24/10/04",
      status: "Delivered"
    }
  ],

  goals: [
    { id: '1', title: 'Monthly Revenue Goal', progress: 78, target: 100 },
    { id: '2', title: 'Product Development', progress: 65, target: 100 },
    { id: '3', title: 'Marketing Campaign', progress: 92, target: 100 }
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

  updateCustomerStatus: (id: string, status: Customer['status']) => {
    set((state) => ({
      customers: state.customers.map(customer =>
        customer.id === id ? { ...customer, status } : customer
      )
    }));
  },

  addCustomer: (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: (Date.now()).toString()
    };
    set((state) => ({
      customers: [newCustomer, ...state.customers],
      stats: {
        ...state.stats,
        totalCustomers: state.stats.totalCustomers + 1,
        orders: state.stats.orders + 1
      }
    }));
  },

  updateGoalProgress: (id: string, progress: number) => {
    set((state) => ({
      goals: state.goals.map(goal =>
        goal.id === id ? { ...goal, progress: Math.min(progress, 100) } : goal
      )
    }));
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
  }
}));
