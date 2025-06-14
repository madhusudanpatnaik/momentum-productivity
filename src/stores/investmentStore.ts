
import { create } from 'zustand';
import { useDashboardStore } from './dashboardStore';

interface Investment {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  currentValue: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto' | 'bond' | 'etf';
  purchaseDate: string;
}

interface InvestmentGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

interface InvestmentStats {
  totalPortfolioValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

interface InvestmentState {
  investments: Investment[];
  goals: InvestmentGoal[];
  stats: InvestmentStats;
  portfolioHistory: Array<{ date: string; value: number }>;
  
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, updates: Partial<Investment>) => void;
  removeInvestment: (id: string) => void;
  addGoal: (goal: Omit<InvestmentGoal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<InvestmentGoal>) => void;
  removeGoal: (id: string) => void;
  calculateStats: () => void;
  formatCurrency: (amount: number) => string;
}

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  investments: [
    {
      id: '1',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      amount: 1000,
      currentValue: 1150,
      change: 150,
      changePercent: 15,
      type: 'stock',
      purchaseDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 2000,
      currentValue: 2300,
      change: 300,
      changePercent: 15,
      type: 'crypto',
      purchaseDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'S&P 500 ETF',
      symbol: 'SPY',
      amount: 1500,
      currentValue: 1425,
      change: -75,
      changePercent: -5,
      type: 'etf',
      purchaseDate: '2024-03-10'
    }
  ],

  goals: [
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: '2024-12-31',
      category: 'Savings'
    },
    {
      id: '2',
      title: 'Retirement Portfolio',
      targetAmount: 50000,
      currentAmount: 25000,
      deadline: '2025-12-31',
      category: 'Retirement'
    }
  ],

  stats: {
    totalPortfolioValue: 4875,
    totalGainLoss: 375,
    totalGainLossPercent: 8.33,
    dayChange: 45,
    dayChangePercent: 0.93
  },

  portfolioHistory: [
    { date: '2024-01-01', value: 4500 },
    { date: '2024-02-01', value: 4650 },
    { date: '2024-03-01', value: 4800 },
    { date: '2024-04-01', value: 4875 },
    { date: '2024-05-01', value: 4950 },
    { date: '2024-06-01', value: 4875 }
  ],

  formatCurrency: (amount: number) => {
    // Get the currency formatting function from dashboard store
    const dashboardStore = useDashboardStore.getState();
    return dashboardStore.formatCurrency(amount);
  },

  addInvestment: (investmentData: Omit<Investment, 'id'>) => {
    const newInvestment: Investment = {
      ...investmentData,
      id: Date.now().toString()
    };

    set((state) => ({
      investments: [...state.investments, newInvestment]
    }));

    get().calculateStats();
  },

  updateInvestment: (id: string, updates: Partial<Investment>) => {
    set((state) => ({
      investments: state.investments.map(investment =>
        investment.id === id ? { ...investment, ...updates } : investment
      )
    }));

    get().calculateStats();
  },

  removeInvestment: (id: string) => {
    set((state) => ({
      investments: state.investments.filter(investment => investment.id !== id)
    }));

    get().calculateStats();
  },

  addGoal: (goalData: Omit<InvestmentGoal, 'id'>) => {
    const newGoal: InvestmentGoal = {
      ...goalData,
      id: Date.now().toString()
    };

    set((state) => ({
      goals: [...state.goals, newGoal]
    }));
  },

  updateGoal: (id: string, updates: Partial<InvestmentGoal>) => {
    set((state) => ({
      goals: state.goals.map(goal =>
        goal.id === id ? { ...goal, ...updates } : goal
      )
    }));
  },

  removeGoal: (id: string) => {
    set((state) => ({
      goals: state.goals.filter(goal => goal.id !== id)
    }));
  },

  calculateStats: () => {
    const { investments } = get();
    
    const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalGainLoss = investments.reduce((sum, inv) => sum + inv.change, 0);
    const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalGainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;
    
    // Simulate day change (in real app, this would come from API)
    const dayChange = totalPortfolioValue * 0.01; // 1% change
    const dayChangePercent = 1.0;

    set({
      stats: {
        totalPortfolioValue,
        totalGainLoss,
        totalGainLossPercent,
        dayChange,
        dayChangePercent
      }
    });
  }
}));

// Initialize stats
useInvestmentStore.getState().calculateStats();
