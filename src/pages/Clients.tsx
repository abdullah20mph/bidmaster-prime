import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  DollarSign,
  Clock,
  Building,
  User
} from 'lucide-react';

const clientsData = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    location: 'San Francisco, CA',
    industry: 'Technology',
    rating: 4.9,
    totalSpent: '$45,800',
    activeProjects: 3,
    completedProjects: 12,
    averageProject: '$3,817',
    lastProject: '2 days ago',
    clientSince: 'Jan 2023',
    paymentMethod: 'Verified',
    responseTime: '2 hours',
    repeatRate: '85%',
    status: 'active',
    notes: 'Excellent client, always pays on time. Prefers detailed communication.'
  },
  {
    id: 2,
    name: 'StartupXYZ',
    contactPerson: 'Mike Chen',
    email: 'mike@startupxyz.com',
    location: 'Austin, TX',
    industry: 'Fintech',
    rating: 4.7,
    totalSpent: '$28,400',
    activeProjects: 1,
    completedProjects: 8,
    averageProject: '$3,550',
    lastProject: '1 week ago',
    clientSince: 'Mar 2023',
    paymentMethod: 'Verified',
    responseTime: '4 hours',
    repeatRate: '70%',
    status: 'active',
    notes: 'Fast-growing startup, flexible with timelines but budget-conscious.'
  },
  {
    id: 3,
    name: 'DataSolutions Ltd.',
    contactPerson: 'Emily Rodriguez',
    email: 'emily@datasolutions.com',
    location: 'New York, NY',
    industry: 'Data Analytics',
    rating: 4.2,
    totalSpent: '$15,600',
    activeProjects: 0,
    completedProjects: 5,
    averageProject: '$3,120',
    lastProject: '2 months ago',
    clientSince: 'Aug 2023',
    paymentMethod: 'Verified',
    responseTime: '1 day',
    repeatRate: '40%',
    status: 'inactive',
    notes: 'Detailed requirements but can be slow to make decisions.'
  },
  {
    id: 4,
    name: 'CloudFirst Solutions',
    contactPerson: 'David Park',
    email: 'david@cloudfirst.com',
    location: 'Seattle, WA',
    industry: 'Cloud Services',
    rating: 5.0,
    totalSpent: '$52,300',
    activeProjects: 2,
    completedProjects: 15,
    averageProject: '$3,488',
    lastProject: '3 days ago',
    clientSince: 'Nov 2022',
    paymentMethod: 'Verified',
    responseTime: '1 hour',
    repeatRate: '95%',
    status: 'vip',
    notes: 'Premium client, excellent communication and generous budgets.'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-success text-success-foreground';
    case 'vip':
      return 'bg-primary text-primary-foreground';
    case 'inactive':
      return 'bg-muted text-muted-foreground';
    case 'potential':
      return 'bg-warning text-warning-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'vip':
      return 'VIP Client';
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'potential':
      return 'Potential';
    default:
      return status;
  }
}

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground">Manage your client relationships and project history</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold text-foreground">67</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold text-success">32</p>
              </div>
              <Building className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">VIP Clients</p>
                <p className="text-2xl font-bold text-primary">8</p>
              </div>
              <Star className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Project Value</p>
                <p className="text-2xl font-bold text-foreground">$3,468</p>
              </div>
              <DollarSign className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="data-grid">
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">{client.contactPerson}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{client.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(client.status)}>
                    {getStatusLabel(client.status)}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{client.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Building className="w-4 h-4" />
                    <span>{client.industry}</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{client.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{client.activeProjects}</p>
                    <p className="text-xs text-muted-foreground">Active Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{client.completedProjects}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{client.repeatRate}</p>
                    <p className="text-xs text-muted-foreground">Repeat Rate</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Client Since</p>
                    <p className="font-medium text-foreground">{client.clientSince}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="font-medium text-foreground">{client.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Project</p>
                    <p className="font-medium text-foreground">{client.lastProject}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg. Project</p>
                    <p className="font-medium text-foreground">{client.averageProject}</p>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>Notes:</strong> {client.notes}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    View Projects
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}