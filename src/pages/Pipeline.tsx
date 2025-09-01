import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Clock, 
  DollarSign,
  User,
  Calendar,
  Target,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';

const pipelineData = [
  {
    id: 1,
    stage: 'prospecting',
    title: 'Prospecting',
    color: 'bg-blue-500',
    deals: [
      {
        id: 1,
        title: 'E-commerce Platform Redesign',
        client: 'RetailCorp',
        value: '$15,000',
        probability: 70,
        expectedClose: '2024-02-15',
        daysInStage: 3,
        lastActivity: 'Sent proposal'
      },
      {
        id: 2,
        title: 'Mobile App Development',
        client: 'HealthTech',
        value: '$25,000',
        probability: 45,
        expectedClose: '2024-02-28',
        daysInStage: 7,
        lastActivity: 'Initial call scheduled'
      }
    ]
  },
  {
    id: 2,
    stage: 'proposal',
    title: 'Proposal Sent',
    color: 'bg-yellow-500',
    deals: [
      {
        id: 3,
        title: 'API Integration Project',
        client: 'FinanceApp',
        value: '$8,500',
        probability: 60,
        expectedClose: '2024-02-10',
        daysInStage: 5,
        lastActivity: 'Proposal submitted'
      },
      {
        id: 4,
        title: 'Database Optimization',
        client: 'DataCorp',
        value: '$12,000',
        probability: 75,
        expectedClose: '2024-02-12',
        daysInStage: 2,
        lastActivity: 'Client questions answered'
      },
      {
        id: 5,
        title: 'React Dashboard',
        client: 'Analytics Pro',
        value: '$18,000',
        probability: 55,
        expectedClose: '2024-02-20',
        daysInStage: 8,
        lastActivity: 'Waiting for feedback'
      }
    ]
  },
  {
    id: 3,
    stage: 'negotiation',
    title: 'Negotiation',
    color: 'bg-orange-500',
    deals: [
      {
        id: 6,
        title: 'Cloud Migration',
        client: 'TechStartup',
        value: '$22,000',
        probability: 85,
        expectedClose: '2024-02-08',
        daysInStage: 4,
        lastActivity: 'Price negotiation'
      },
      {
        id: 7,
        title: 'Security Audit',
        client: 'SecureCorp',
        value: '$9,500',
        probability: 90,
        expectedClose: '2024-02-07',
        daysInStage: 2,
        lastActivity: 'Contract review'
      }
    ]
  },
  {
    id: 4,
    stage: 'contract',
    title: 'Contract Review',
    color: 'bg-purple-500',
    deals: [
      {
        id: 8,
        title: 'ML Model Development',
        client: 'AI Solutions',
        value: '$35,000',
        probability: 95,
        expectedClose: '2024-02-05',
        daysInStage: 1,
        lastActivity: 'Contract sent'
      }
    ]
  },
  {
    id: 5,
    stage: 'won',
    title: 'Won',
    color: 'bg-green-500',
    deals: [
      {
        id: 9,
        title: 'Website Development',
        client: 'LocalBiz',
        value: '$7,500',
        probability: 100,
        expectedClose: '2024-02-01',
        daysInStage: 0,
        lastActivity: 'Contract signed'
      },
      {
        id: 10,
        title: 'Mobile UI Redesign',
        client: 'AppCorp',
        value: '$12,500',
        probability: 100,
        expectedClose: '2024-01-30',
        daysInStage: 0,
        lastActivity: 'Project started'
      }
    ]
  }
];

function getProbabilityColor(probability: number) {
  if (probability >= 80) return 'text-green-600';
  if (probability >= 60) return 'text-yellow-600';
  if (probability >= 40) return 'text-orange-600';
  return 'text-red-600';
}

export default function Pipeline() {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  const totalValue = pipelineData.reduce((total, stage) => 
    total + stage.deals.reduce((stageTotal, deal) => 
      stageTotal + parseInt(deal.value.replace('$', '').replace(',', '')), 0), 0
  );

  const weightedValue = pipelineData.reduce((total, stage) => 
    total + stage.deals.reduce((stageTotal, deal) => 
      stageTotal + (parseInt(deal.value.replace('$', '').replace(',', '')) * deal.probability / 100), 0), 0
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Pipeline</h1>
            <p className="text-muted-foreground">Track deals through your sales process</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark">
            <Target className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pipeline</p>
                <p className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weighted Value</p>
                <p className="text-2xl font-bold text-success">${Math.round(weightedValue).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                <p className="text-2xl font-bold text-foreground">
                  {pipelineData.reduce((total, stage) => total + stage.deals.length, 0)}
                </p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Deal Size</p>
                <p className="text-2xl font-bold text-foreground">
                  ${Math.round(totalValue / pipelineData.reduce((total, stage) => total + stage.deals.length, 0)).toLocaleString()}
                </p>
              </div>
              <User className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>

        {/* Pipeline Board */}
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-x-auto">
            {pipelineData.map((stage, stageIndex) => (
              <div key={stage.id} className="min-w-[300px] lg:min-w-0">
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-semibold text-foreground">{stage.title}</h3>
                    <Badge variant="secondary">{stage.deals.length}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${stage.deals.reduce((total, deal) => 
                      total + parseInt(deal.value.replace('$', '').replace(',', '')), 0
                    ).toLocaleString()}
                  </div>
                </div>

                {/* Deals */}
                <div className="space-y-3">
                  {stage.deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedDeal(deal)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm line-clamp-2">
                          {deal.title}
                        </h4>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{deal.client}</span>
                          <span className="font-semibold text-foreground">{deal.value}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Probability</span>
                          <span className={`font-medium ${getProbabilityColor(deal.probability)}`}>
                            {deal.probability}%
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{deal.expectedClose}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{deal.daysInStage} days in stage</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                          {deal.lastActivity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Deal Button */}
                <Button
                  variant="ghost"
                  className="w-full mt-3 border-2 border-dashed border-border"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Add Deal
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Flow Indicators */}
        <div className="flex items-center justify-center space-x-4 py-4">
          {pipelineData.slice(0, -1).map((stage, index) => (
            <div key={stage.id} className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
          <div className={`w-4 h-4 rounded-full ${pipelineData[pipelineData.length - 1].color}`}></div>
        </div>
      </div>
    </Layout>
  );
}