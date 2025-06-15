
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Investment = Tables<'investments'>;
type InvestmentInsert = TablesInsert<'investments'>;
type InvestmentUpdate = TablesUpdate<'investments'>;

export const useInvestments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: investments = [], isLoading } = useQuery({
    queryKey: ['investments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Investment[];
    },
    enabled: !!user
  });

  const addInvestmentMutation = useMutation({
    mutationFn: async (investment: Omit<InvestmentInsert, 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('investments')
        .insert({ ...investment, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      toast({
        title: 'Success',
        description: 'Investment added successfully!'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add investment. Please try again.',
        variant: 'destructive'
      });
      console.error('Error adding investment:', error);
    }
  });

  const updateInvestmentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: InvestmentUpdate }) => {
      const { data, error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update investment. Please try again.',
        variant: 'destructive'
      });
      console.error('Error updating investment:', error);
    }
  });

  const deleteInvestmentMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      toast({
        title: 'Success',
        description: 'Investment deleted successfully!'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete investment. Please try again.',
        variant: 'destructive'
      });
      console.error('Error deleting investment:', error);
    }
  });

  // Calculate portfolio stats
  const portfolioStats = React.useMemo(() => {
    const totalPortfolioValue = investments.reduce((sum, inv) => sum + Number(inv.current_value), 0);
    const totalInvestment = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    const totalGainLoss = totalPortfolioValue - totalInvestment;
    const totalGainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;
    
    return {
      totalPortfolioValue,
      totalGainLoss,
      totalGainLossPercent,
      dayChange: totalPortfolioValue * 0.01, // Mock day change
      dayChangePercent: 1.0
    };
  }, [investments]);

  return {
    investments,
    isLoading,
    portfolioStats,
    addInvestment: addInvestmentMutation.mutate,
    updateInvestment: updateInvestmentMutation.mutate,
    deleteInvestment: deleteInvestmentMutation.mutate,
    isAddingInvestment: addInvestmentMutation.isPending,
    isUpdatingInvestment: updateInvestmentMutation.isPending,
    isDeletingInvestment: deleteInvestmentMutation.isPending
  };
};
