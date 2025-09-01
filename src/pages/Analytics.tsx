import { Layout } from '@/components/layout/Layout';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  FileText,
  Award,
  Clock,
  Calendar
} from 'lucide-react';

const proposalTrendData = [
  { month: 'Jan', submitted: 42, won: 12, lost: 18, pending: 12 },
  { month: 'Feb', submitted: 38, won: 15, lost: 14, pending: 9 },
  { month: 'Mar', submitted: 45, won: 18, lost: 16, pending: 11 },
  { month: 'Apr', submitted: 52, won: 22, lost: 19, pending: 11 },
  { month: 'May', submitted: 48, won: 19, lost: 17, pending: 12 },
  { month: 'Jun', submitted: 55, won: 28, lost: 15, pending: 12 }
];

const revenueData = [
  { month: 'Jan', revenue: 18500, target: 20000 },
  { month: 'Feb', revenue: 22300, target: 22000 },
  { month: 'Mar', revenue: 25800, target: 24000 },
  { month: 'Apr', revenue: 28400, target: 26000 },
  { month: 'May', revenue: 31200, target: 28000 },
  { month: 'Jun', revenue: 35600, target: 30000 }
];

const skillsPerformanceData = [
  { skill: 'React', proposals: 45, winRate: 38, avgValue: 3200 },
  { skill: 'Node.js', proposals: 32, winRate: 42, avgValue: 2800 },
  { skill: 'TypeScript', proposals: 28, winRate: 45, avgValue: 3500 },
  { skill: 'Python', proposals: 22, winRate: 35, avgValue: 2400 },
  { skill: 'UI/UX', proposals: 18, winRate: 52, avgValue: 2200 }
];

const clientDistributionData = [
  { name: 'Technology', value: 35, color: '#3B82F6' },
  { name: 'Healthcare', value: 22, color: '#10B981' },
  { name: 'Finance', value: 18, color: '#F59E0B' },
  { name: 'E-commerce', value: 15, color: '#EF4444' },
  { name: 'Education', value: 10, color: '#8B5CF6' }
];

const connectsData = [
  { month: 'Jan', spent: 168, earned: 2400, roi: 14.3 },
  { month: 'Feb', spent: 184, earned: 2800, roi: 15.2 },
  { month: 'Mar', spent: 176, earned: 3200, roi: 18.2 },
  { month: 'Apr', spent: 192, earned: 3600, roi: 18.8 },
  { month: 'May', spent: 188, earned: 4100, roi: 21.8 },
  { month: 'Jun', spent: 204, earned: 4800, roi: 23.5 }
];

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive performance insights and metrics</p>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Overall Win Rate"
            value="34.2%"
            change={5.2}
            changeLabel="vs last month"
            icon={<Target className="w-6 h-6" />}
            variant="primary"
          />
          <MetricCard
            title="Avg Response Time"
            value="2.4h"
            change={-12.5}
            changeLabel="improvement"
            icon={<Clock className="w-6 h-6" />}
            variant="success"
          />
          <MetricCard
            title="Monthly Proposals"
            value="55"
            change={14.6}
            changeLabel="this month"
            icon={<FileText className="w-6 h-6" />}
            variant="primary"
          />
          <MetricCard
            title="Client Retention"
            value="78%"
            change={8.3}
            changeLabel="improvement"
            icon={<Users className="w-6 h-6" />}
            variant="success"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Proposal Trends */}
          <div className="dashboard-chart">
            <h3 className="text-lg font-semibold text-foreground mb-4">Proposal Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={proposalTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="submitted" stackId="a" fill="hsl(var(--primary))" name="Submitted" />
                <Bar dataKey="won" stackId="a" fill="hsl(var(--success))" name="Won" />
                <Bar dataKey="lost" stackId="a" fill="hsl(var(--destructive))" name="Lost" />
                <Bar dataKey="pending" stackId="a" fill="hsl(var(--warning))" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue vs Target */}
          <div className="dashboard-chart">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue vs Target</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--success))" strokeWidth={3} name="Actual Revenue" />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Client Distribution */}
          <div className="dashboard-chart">
            <h3 className="text-lg font-semibold text-foreground mb-4">Client Industry Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {clientDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Connects ROI */}
          <div className="dashboard-chart">
            <h3 className="text-lg font-semibold text-foreground mb-4">Connects ROI Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={connectsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="spent" fill="hsl(var(--warning))" name="Connects Spent" />
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="hsl(var(--success))" strokeWidth={3} name="ROI %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Performance Table */}
        <div className="data-grid">
          <div className="data-grid-header">
            <h3 className="text-lg font-semibold text-foreground">Skills Performance Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Skill</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Proposals</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Win Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Avg Project Value</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Performance</th>
                </tr>
              </thead>
              <tbody>
                {skillsPerformanceData.map((skill, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium text-foreground">{skill.skill}</td>
                    <td className="py-3 px-4 text-muted-foreground">{skill.proposals}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        skill.winRate >= 40 ? 'text-success' : 
                        skill.winRate >= 30 ? 'text-warning' : 'text-destructive'
                      }`}>
                        {skill.winRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">${skill.avgValue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(skill.winRate / 60) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.winRate >= 40 ? 'Excellent' : 
                           skill.winRate >= 30 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}