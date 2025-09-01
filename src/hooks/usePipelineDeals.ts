import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PipelineDeal {
  id: string;
  user_id: string;
  client_id?: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expected_close?: string;
  days_in_stage: number;
  last_activity?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  clients?: {
    name: string;
    company?: string;
  };
}

export const usePipelineDeals = () => {
  const [deals, setDeals] = useState<PipelineDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pipeline_deals')
        .select(`
          *,
          clients (
            name,
            company
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching pipeline deals",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDeal = async (deal: Omit<PipelineDeal, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'clients'>) => {
    try {
      const { data, error } = await supabase
        .from('pipeline_deals')
        .insert([{ ...deal, user_id: 'anonymous' } as any])
        .select()
        .single();

      if (error) throw error;
      
      await fetchDeals();
      toast({
        title: "Success",
        description: "Deal created successfully",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating deal",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateDeal = async (id: string, updates: Partial<Omit<PipelineDeal, 'clients' | 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('pipeline_deals')
        .update(updates as any)
        .eq('id', id);

      if (error) throw error;
      
      await fetchDeals();
      toast({
        title: "Success",
        description: "Deal updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating deal",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteDeal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pipeline_deals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchDeals();
      toast({
        title: "Success",
        description: "Deal deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting deal",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return {
    deals,
    loading,
    createDeal,
    updateDeal,
    deleteDeal,
    refetch: fetchDeals,
  };
};