
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Investment {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  current_value: number;
  change_amount: number;
  change_percent: number;
  investment_type: 'stock' | 'crypto' | 'bond' | 'etf';
  purchase_date: string;
  created_at: string;
  updated_at: string;
}

export interface InvestmentGoal {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [investmentGoals, setInvestmentGoals] = useState<InvestmentGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchInvestments = async () => {
    if (!user) return;

    try {
      const [investmentsResult, goalsResult] = await Promise.all([
        supabase
          .from('investments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('investment_goals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      if (investmentsResult.error) throw investmentsResult.error;
      if (goalsResult.error) throw goalsResult.error;

      setInvestments(investmentsResult.data || []);
      setInvestmentGoals(goalsResult.data || []);
    } catch (error) {
      console.error('Error fetching investments:', error);
      toast({
        title: "Error fetching investments",
        description: "Failed to load your investment data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investmentData: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('investments')
        .insert([{ ...investmentData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setInvestments(prev => [data, ...prev]);
      toast({
        title: "Investment added",
        description: "Your investment has been recorded successfully"
      });
    } catch (error) {
      console.error('Error adding investment:', error);
      toast({
        title: "Error adding investment",
        description: "Failed to add your investment",
        variant: "destructive"
      });
    }
  };

  const updateInvestment = async (id: string, updates: Partial<Investment>) => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setInvestments(prev => prev.map(inv => inv.id === id ? data : inv));
      toast({
        title: "Investment updated",
        description: "Your investment has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating investment:', error);
      toast({
        title: "Error updating investment",
        description: "Failed to update your investment",
        variant: "destructive"
      });
    }
  };

  const deleteInvestment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setInvestments(prev => prev.filter(inv => inv.id !== id));
      toast({
        title: "Investment deleted",
        description: "Your investment has been removed"
      });
    } catch (error) {
      console.error('Error deleting investment:', error);
      toast({
        title: "Error deleting investment",
        description: "Failed to delete your investment",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [user]);

  return {
    investments,
    investmentGoals,
    loading,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    refetch: fetchInvestments
  };
};
