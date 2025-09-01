import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RevenueTransaction {
  id: string;
  user_id: string;
  project_id?: string;
  client_id?: string;
  amount: number;
  type: string;
  category?: string;
  description?: string;
  date: string;
  created_at: string;
  clients?: {
    name: string;
    company?: string;
  };
  projects?: {
    title: string;
  };
}

export const useRevenue = () => {
  const [transactions, setTransactions] = useState<RevenueTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('revenue_transactions')
        .select(`
          *,
          clients (
            name,
            company
          ),
          projects (
            title
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching revenue transactions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transaction: Omit<RevenueTransaction, 'id' | 'user_id' | 'created_at' | 'clients' | 'projects'>) => {
    try {
      const { data, error } = await supabase
        .from('revenue_transactions')
        .insert([{ ...transaction, user_id: 'anonymous' } as any])
        .select()
        .single();

      if (error) throw error;
      
      await fetchTransactions();
      toast({
        title: "Success",
        description: "Transaction created successfully",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating transaction",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Omit<RevenueTransaction, 'clients' | 'projects' | 'id' | 'user_id' | 'created_at'>>) => {
    try {
      const { error } = await supabase
        .from('revenue_transactions')
        .update(updates as any)
        .eq('id', id);

      if (error) throw error;
      
      await fetchTransactions();
      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating transaction",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('revenue_transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchTransactions();
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting transaction",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  };
};