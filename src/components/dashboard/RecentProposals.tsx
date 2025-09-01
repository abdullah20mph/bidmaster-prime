import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ExternalLink } from 'lucide-react';

const proposals = [
  {
    id: 1,
    title: 'E-commerce Website Development',
    client: 'TechCorp Inc.',
    status: 'pending',
    amount: '$2,500',
    submittedAt: '2 hours ago',
    connects: 4
  },
  {
    id: 2,
    title: 'Mobile App UI/UX Design',
    client: 'StartupXYZ',
    status: 'active',
    amount: '$1,800',
    submittedAt: '1 day ago',
    connects: 6
  },
  {
    id: 3,
    title: 'Database Optimization',
    client: 'DataSolutions',
    status: 'rejected',
    amount: '$950',
    submittedAt: '3 days ago',
    connects: 2
  },
  {
    id: 4,
    title: 'React Dashboard Development',
    client: 'FinTech Pro',
    status: 'active',
    amount: '$3,200',
    submittedAt: '5 days ago',
    connects: 8
  },
  {
    id: 5,
    title: 'API Integration Project',
    client: 'CloudFirst',
    status: 'pending',
    amount: '$1,400',
    submittedAt: '1 week ago',
    connects: 3
  }
];

function getStatusVariant(status: string) {
  switch (status) {
    case 'active':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'rejected':
      return 'destructive';
    default:
      return 'secondary';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'pending':
      return 'Pending';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
}

export function RecentProposals() {
  return (
    <div className="data-grid">
      <div className="data-grid-header flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Recent Proposals</h3>
        <Button variant="outline" size="sm">
          View All
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <div className="divide-y divide-border">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="data-grid-row flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {proposal.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {proposal.client} • {proposal.submittedAt}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={getStatusVariant(proposal.status)}>
                    {getStatusLabel(proposal.status)}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{proposal.amount}</p>
                    <p className="text-xs text-muted-foreground">{proposal.connects} connects</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}