import { Button } from '@/components/ui/button';
import { Plus, Send, TrendingUp, Users, FileText, Target } from 'lucide-react';

const actions = [
  {
    name: 'New Proposal',
    description: 'Create a new proposal',
    icon: Plus,
    variant: 'default' as const,
    action: () => console.log('New proposal')
  },
  {
    name: 'Send Follow-up',
    description: 'Follow up on proposals',
    icon: Send,
    variant: 'outline' as const,
    action: () => console.log('Send follow-up')
  },
  {
    name: 'Add Client',
    description: 'Add new client',
    icon: Users,
    variant: 'outline' as const,
    action: () => console.log('Add client')
  },
  {
    name: 'Update Pipeline',
    description: 'Manage pipeline stages',
    icon: Target,
    variant: 'outline' as const,
    action: () => console.log('Update pipeline')
  }
];

export function QuickActions() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
        </div>
        <TrendingUp className="w-5 h-5 text-primary" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.name}
            variant={action.variant}
            className="h-auto p-4 flex flex-col items-start space-y-2 text-left"
            onClick={action.action}
          >
            <div className="flex items-center space-x-2">
              <action.icon className="w-4 h-4" />
              <span className="font-medium">{action.name}</span>
            </div>
            <span className="text-xs opacity-75">{action.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}