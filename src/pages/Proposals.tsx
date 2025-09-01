import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  FileText,
  Clock,
  DollarSign,
  ExternalLink
} from 'lucide-react';

const proposalsData = [
  {
    id: 1,
    title: 'E-commerce Website Development with React & Node.js',
    client: 'TechCorp Inc.',
    clientRating: 4.9,
    budget: '$2,500',
    connects: 4,
    status: 'pending',
    submittedAt: '2 hours ago',
    description: 'Looking for an experienced developer to build a modern e-commerce platform...',
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    responseRate: '85%',
    category: 'Web Development'
  },
  {
    id: 2,
    title: 'Mobile App UI/UX Design for Fintech Startup',
    client: 'StartupXYZ',
    clientRating: 4.7,
    budget: '$1,800',
    connects: 6,
    status: 'active',
    submittedAt: '1 day ago',
    description: 'Need a talented designer to create intuitive mobile app interfaces...',
    skillsRequired: ['Figma', 'UI/UX', 'Mobile Design', 'Prototyping'],
    responseRate: '92%',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Database Optimization & Performance Tuning',
    client: 'DataSolutions',
    clientRating: 4.2,
    budget: '$950',
    connects: 2,
    status: 'rejected',
    submittedAt: '3 days ago',
    description: 'Database running slow, need expert to optimize queries and performance...',
    skillsRequired: ['PostgreSQL', 'Database Optimization', 'SQL'],
    responseRate: '78%',
    category: 'Database'
  },
  {
    id: 4,
    title: 'React Dashboard Development with Real-time Analytics',
    client: 'FinTech Pro',
    clientRating: 5.0,
    budget: '$3,200',
    connects: 8,
    status: 'interview',
    submittedAt: '5 days ago',
    description: 'Build comprehensive dashboard with charts, real-time data, and analytics...',
    skillsRequired: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
    responseRate: '96%',
    category: 'Web Development'
  },
  {
    id: 5,
    title: 'API Integration & Third-party Services',
    client: 'CloudFirst',
    clientRating: 4.6,
    budget: '$1,400',
    connects: 3,
    status: 'declined',
    submittedAt: '1 week ago',
    description: 'Integrate multiple APIs including payment gateways and notification services...',
    skillsRequired: ['REST API', 'Python', 'Integration', 'AWS'],
    responseRate: '88%',
    category: 'Backend Development'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-success text-success-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'interview':
      return 'bg-primary text-primary-foreground';
    case 'rejected':
      return 'bg-destructive text-destructive-foreground';
    case 'declined':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'pending':
      return 'Pending';
    case 'interview':
      return 'Interview';
    case 'rejected':
      return 'Rejected';
    case 'declined':
      return 'Declined';
    default:
      return status;
  }
}

export default function Proposals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProposals = proposalsData.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || proposal.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Proposals</h1>
            <p className="text-muted-foreground">Manage and track all your Upwork proposals</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Proposals</p>
                <p className="text-2xl font-bold text-foreground">248</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">32</p>
              </div>
              <Clock className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold text-primary">32.4%</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">$89,450</p>
              </div>
              <DollarSign className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search proposals..."
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Proposals List */}
        <div className="data-grid">
          <div className="space-y-0 divide-y divide-border">
            {filteredProposals.map((proposal) => (
              <div key={proposal.id} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {proposal.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{proposal.client}</span>
                          <span>⭐ {proposal.clientRating}</span>
                          <span>{proposal.category}</span>
                          <span>{proposal.submittedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(proposal.status)}>
                          {getStatusLabel(proposal.status)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {proposal.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {proposal.skillsRequired.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {proposal.skillsRequired.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{proposal.skillsRequired.length - 4} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{proposal.budget}</p>
                          <p className="text-muted-foreground">{proposal.connects} connects</p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Response Rate</p>
                          <p className="font-semibold text-foreground">{proposal.responseRate}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}