-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS idx_proposals_user_id ON public.proposals(user_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON public.proposals(status);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_pipeline_deals_user_id ON public.pipeline_deals(user_id);
CREATE INDEX IF NOT EXISTS idx_pipeline_deals_stage ON public.pipeline_deals(stage);
CREATE INDEX IF NOT EXISTS idx_revenue_transactions_user_id ON public.revenue_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_revenue_transactions_date ON public.revenue_transactions(date);