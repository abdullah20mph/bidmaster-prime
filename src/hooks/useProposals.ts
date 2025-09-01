import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Proposal {
  id: string;
  user_id: string;
  client_id?: string;
  title: string;
  description?: string;
  budget_min?: number;
  budget_max?: number;
  status: string;
  skills: string[];
  submitted_at?: string;
  response_deadline?: string;
  win_probability?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  clients?: {
    name: string;
    company?: string;
  };
}

export const useProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('proposals')
        .select(`
          *,
          clients (
            name,
            company
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProposals(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching proposals",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProposal = async (proposal: Omit<Proposal, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'clients'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('proposals')
        .insert([{ ...proposal, user_id: user.id } as any])
        .select()
        .single();

      if (error) throw error;
      
      await fetchProposals();
      toast({
        title: "Success",
        description: "Proposal created successfully",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating proposal",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProposal = async (id: string, updates: Partial<Omit<Proposal, 'clients' | 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('proposals')
        .update(updates as any)
        .eq('id', id);

      if (error) throw error;
      
      await fetchProposals();
      toast({
        title: "Success",
        description: "Proposal updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating proposal",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProposal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchProposals();
      toast({
        title: "Success",
        description: "Proposal deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting proposal",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return {
    proposals,
    loading,
    createProposal,
    updateProposal,
    deleteProposal,
    refetch: fetchProposals,
  };
};