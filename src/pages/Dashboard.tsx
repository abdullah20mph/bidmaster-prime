import { MetricCard } from '@/components/dashboard/MetricCard';
import { ProposalChart } from '@/components/dashboard/ProposalChart';
import { RecentProposals } from '@/components/dashboard/RecentProposals';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Award, 
  Clock 
} from 'lucide-react';
import dashboardHero from '@/assets/dashboard-hero.jpg';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-light p-8 text-primary-foreground">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to BidMaster Pro</h1>
          <p className="text-lg opacity-90">
            Your comprehensive Upwork bidding management system
          </p>
          <div className="mt-6 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>32% Win Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>24h Response Time</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <img 
            src={dashboardHero} 
            alt="Dashboard Analytics" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Proposals"
          value="248"
          change={12.5}
          changeLabel="this month"
          icon={<FileText className="w-6 h-6" />}
          variant="primary"
        />
        <MetricCard
          title="Active Clients"
          value="67"
          change={8.2}
          changeLabel="this month"
          icon={<Users className="w-6 h-6" />}
          variant="success"
        />
        <MetricCard
          title="Monthly Revenue"
          value="$24,650"
          change={15.8}
          changeLabel="vs last month"
          icon={<DollarSign className="w-6 h-6" />}
          variant="success"
        />
        <MetricCard
          title="Win Rate"
          value="32.4%"
          change={2.1}
          changeLabel="improvement"
          icon={<TrendingUp className="w-6 h-6" />}
          variant="warning"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProposalChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        <RecentProposals />
      </div>
    </div>
  );
}