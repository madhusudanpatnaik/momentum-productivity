
import { create } from 'zustand';

export interface Investment {
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

export interface InvestmentGoal {
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
  totalInvested: number;
}

interface InvestmentState {
  stats: InvestmentStats;
  investments: Investment[];
  goals: InvestmentGoal[];
  portfolioHistory: Array<{ date: string; value: number }>;
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, updates: Partial<Investment>) => void;
  removeInvestment: (id: string) => void;
  addGoal: (goal: Omit<InvestmentGoal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<InvestmentGoal>) => void;
  removeGoal: (id: string) => void;
  updateStats: () => void;
}

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  stats: {
    totalPortfolioValue: 125420.50,
    totalGainLoss: 8420.50,
    totalGainLossPercent: 7.2,
    dayChange: 320.15,
    dayChangePercent: 0.26,
    totalInvested: 117000
  },

  investments: [
    {
      id: '1',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      amount: 50000,
      currentValue: 54200,
      change: 4200,
      changePercent: 8.4,
      type: 'stock',
      purchaseDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 30000,
      currentValue: 32500,
      change: 2500,
      changePercent: 8.33,
      type: 'crypto',
      purchaseDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'S&P 500 ETF',
      symbol: 'SPY',
      amount: 25000,
      currentValue: 26200,
      change: 1200,
      changePercent: 4.8,
      type: 'etf',
      purchaseDate: '2024-01-20'
    },
    {
      id: '4',
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      amount: 12000,
      currentValue: 12520,
      change: 520,
      changePercent: 4.33,
      type: 'stock',
      purchaseDate: '2024-03-10'
    }
  ],

  goals: [
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 50000,
      currentAmount: 32000,
      deadline: '2024-12-31',
      category: 'Safety'
    },
    {
      id: '2',
      title: 'House Down Payment',
      targetAmount: 100000,
      currentAmount: 45000,
      deadline: '2025-06-30',
      category: 'Real Estate'
    },
    {
      id: '3',
      title: 'Retirement Fund',
      targetAmount: 500000,
      currentAmount: 125000,
      deadline: '2035-12-31',
      category: 'Retirement'
    }
  ],

  portfolioHistory: [
    { date: '2024-01', value: 110000 },
    { date: '2024-02', value: 115000 },
    { date: '2024-03', value: 118000 },
    { date: '2024-04', value: 122000 },
    { date: '2024-05', value: 120000 },
    { date: '2024-06', value: 125420 }
  ],

  addInvestment: (investmentData) => {
    const newInvestment: Investment = {
      ...investmentData,
      id: Date.now().toString()
    };
    set((state) => ({
      investments: [...state.investments, newInvestment]
    }));
    get().updateStats();
  },

  updateInvestment: (id, updates) => {
    set((state) => ({
      investments: state.investments.map(investment =>
        investment.id === id ? { ...investment, ...updates } : investment
      )
    }));
    get().updateStats();
  },

  removeInvestment: (id) => {
    set((state) => ({
      investments: state.investments.filter(investment => investment.id !== id)
    }));
    get().updateStats();
  },

  addGoal: (goalData) => {
    const newGoal: InvestmentGoal = {
      ...goalData,
      id: Date.now().toString()
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
      goals: state.goals.filter(goal => goal.id !== id)
    }));
  },

  updateStats: () => {
    const { investments } = get();
    const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalGainLoss = totalPortfolioValue - totalInvested;
    const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    set((state) => ({
      stats: {
        ...state.stats,
        totalPortfolioValue,
        totalInvested,
        totalGainLoss,
        totalGainLossPercent
      }
    }));
  }
}));
