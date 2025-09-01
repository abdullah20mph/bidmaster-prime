import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText, Users, TrendingUp, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';
import { useProposals } from '@/hooks/useProposals';
import { ProposalForm } from '@/components/forms/ProposalForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

// Utility functions
function getStatusColor(status: string) {
  switch (status) {
    case 'won':
      return 'bg-success text-success-foreground';
    case 'active':
      return 'bg-primary text-primary-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'lost':
      return 'bg-destructive text-destructive-foreground';
    case 'cancelled':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'won':
      return 'Won';
    case 'active':
      return 'Active';
    case 'pending':
      return 'Pending';
    case 'lost':
      return 'Lost';
    case 'cancelled':
      return 'Cancelled';
    case 'draft':
      return 'Draft';
    default:
      return status;
  }
}

export default function Proposals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProposal, setEditingProposal] = useState<any>(null);
  
  const { proposals, loading, createProposal, updateProposal, deleteProposal } = useProposals();

  // Filter proposals based on search and filter
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (proposal.clients?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || proposal.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const totalProposals = proposals.length;
  const activeProposals = proposals.filter(p => p.status === 'active').length;
  const wonProposals = proposals.filter(p => p.status === 'won').length;
  const winRate = totalProposals > 0 ? ((wonProposals / totalProposals) * 100).toFixed(1) : '0';
  
  // Calculate total value (simplified - using average of min/max budget)
  const totalValue = proposals.reduce((sum, proposal) => {
    const min = proposal.budget_min || 0;
    const max = proposal.budget_max || 0;
    return sum + ((min + max) / 2);
  }, 0);

  const handleCreateProposal = async (data: any) => {
    await createProposal(data);
  };

  const handleEditProposal = async (data: any) => {
    if (editingProposal) {
      await updateProposal(editingProposal.id, data);
      setEditingProposal(null);
    }
  };

  const handleDeleteProposal = async (id: string) => {
    await deleteProposal(id);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading proposals...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your project proposals
            </p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" />
            New Proposal
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProposals}</div>
              <p className="text-xs text-muted-foreground">
                All time proposals
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProposals}</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{winRate}%</div>
              <p className="text-xs text-muted-foreground">
                Success rate
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Combined budget value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search proposals by title, client, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'active' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={selectedFilter === 'pending' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('pending')}
            >
              Pending
            </Button>
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProposals.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No proposals found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search criteria' : 'Get started by creating your first proposal'}
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Proposal
              </Button>
            </div>
          ) : (
            filteredProposals.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-semibold">
                        {proposal.clients?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{proposal.title}</h3>
                        <p className="text-sm text-muted-foreground">{proposal.clients?.name || 'No client'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        proposal.status === 'won' ? 'default' :
                        proposal.status === 'active' ? 'secondary' :
                        proposal.status === 'pending' ? 'outline' :
                        proposal.status === 'lost' ? 'destructive' : 'outline'
                      }>
                        {getStatusLabel(proposal.status)}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => setEditingProposal(proposal)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Proposal</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this proposal? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteProposal(proposal.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {proposal.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {proposal.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {proposal.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{proposal.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">
                        ${proposal.budget_min?.toLocaleString()} - ${proposal.budget_max?.toLocaleString()}
                      </p>
                      {proposal.submitted_at && (
                        <p className="text-xs text-muted-foreground">
                          Submitted: {new Date(proposal.submitted_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Win Rate: {proposal.win_probability}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <ProposalForm
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleCreateProposal}
        />
        
        <ProposalForm
          open={!!editingProposal}
          onOpenChange={(open) => !open && setEditingProposal(null)}
          onSubmit={handleEditProposal}
          initialData={editingProposal}
          isEditing={true}
        />
      </div>
    </Layout>
  );
}