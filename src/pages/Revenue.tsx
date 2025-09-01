import { Layout } from '@/components/layout/Layout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Target,
  CreditCard,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const monthlyRevenueData = [
  { month: 'Jan', revenue: 18500, expenses: 2200, profit: 16300, projects: 8 },
  { month: 'Feb', revenue: 22300, expenses: 2800, profit: 19500, projects: 9 },
  { month: 'Mar', revenue: 25800, expenses: 3100, profit: 22700, projects: 11 },
  { month: 'Apr', revenue: 28400, expenses: 3400, profit: 25000, projects: 12 },
  { month: 'May', revenue: 31200, expenses: 3800, profit: 27400, projects: 14 },
  { month: 'Jun', revenue: 35600, expenses: 4200, profit: 31400, projects: 16 }
];

const quarterlyData = [
  { quarter: 'Q1 2023', revenue: 45600, growth: 12.5 },
  { quarter: 'Q2 2023', revenue: 52800, growth: 15.8 },
  { quarter: 'Q3 2023', revenue: 61200, growth: 15.9 },
  { quarter: 'Q4 2023', revenue: 73400, growth: 19.9 },
  { quarter: 'Q1 2024', revenue: 66600, growth: 46.1 }
];

const clientRevenueData = [
  { name: 'TechCorp Inc.', revenue: 45800, percentage: 28.5, color: '#3B82F6' },
  { name: 'StartupXYZ', revenue: 28400, percentage: 17.7, color: '#10B981' },
  { name: 'CloudFirst', revenue: 52300, percentage: 32.5, color: '#F59E0B' },
  { name: 'DataSolutions', revenue: 15600, percentage: 9.7, color: '#EF4444' },
  { name: 'Others', revenue: 18900, percentage: 11.6, color: '#8B5CF6' }
];

const recentTransactions = [
  {
    id: 1,
    client: 'TechCorp Inc.',
    project: 'E-commerce Platform',
    amount: 3500,
    date: '2024-02-01',
    status: 'completed',
    type: 'milestone'
  },
  {
    id: 2,
    client: 'StartupXYZ',
    project: 'Mobile App Design',
    amount: 2200,
    date: '2024-01-28',
    status: 'pending',
    type: 'milestone'
  },
  {
    id: 3,
    client: 'CloudFirst',
    project: 'API Integration',
    amount: 1800,
    date: '2024-01-25',
    status: 'completed',
    type: 'final_payment'
  },
  {
    id: 4,
    client: 'DataSolutions',
    project: 'Database Optimization',
    amount: 950,
    date: '2024-01-22',
    status: 'completed',
    type: 'bonus'
  },
  {
    id: 5,
    client: 'Analytics Pro',
    project: 'Dashboard Development',
    amount: 4200,
    date: '2024-01-20',
    status: 'overdue',
    type: 'milestone'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-success text-success-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'overdue':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function getTransactionIcon(type: string) {
  switch (type) {
    case 'milestone':
      return <Target className="w-4 h-4" />;
    case 'final_payment':
      return <CreditCard className="w-4 h-4" />;
    case 'bonus':
      return <PiggyBank className="w-4 h-4" />;
    default:
      return <DollarSign className="w-4 h-4" />;
  }
}

export default function Revenue() {
  const currentMonth = monthlyRevenueData[monthlyRevenueData.length - 1];
  const previousMonth = monthlyRevenueData[monthlyRevenueData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;

  const totalRevenue = monthlyRevenueData.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = monthlyRevenueData.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Revenue Analytics</h1>
            <p className="text-muted-foreground">Track earnings, expenses, and financial performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-primary hover:bg-primary-dark">
              <Calendar className="w-4 h-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
        </div>

        {/* Revenue Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change={revenueGrowth}
            changeLabel="vs last month"
            icon={<DollarSign className="w-6 h-6" />}
            variant="primary"
          />
          <MetricCard
            title="Net Profit"
            value={`$${totalProfit.toLocaleString()}`}
            change={18.5}
            changeLabel="margin growth"
            icon={<TrendingUp className="w-6 h-6" />}
            variant="success"
          />
          <MetricCard
            title="Active Contracts"
            value="24"
            change={12.0}
            changeLabel="new this month"
            icon={<Target className="w-6 h-6" />}
            variant="primary"
          />
          <MetricCard
            title="Avg Project Value"
            value="$3,468"
            change={8.7}
            changeLabel="increase"
            icon={<Wallet className="w-6 h-6" />}
            variant="success"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Trend */}
          <div className="dashboard-chart">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Monthly Revenue & Profit</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Profit</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
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
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Client Revenue Distribution */}
          <div className="dashboard-chart">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue by Client</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientRevenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="revenue"
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                >
                  {clientRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quarterly Growth */}
          <div className="dashboard-chart">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quarterly Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quarter" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue vs Expenses */}
          <div className="dashboard-chart">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
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
                <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                <Bar dataKey="expenses" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="data-grid">
          <div className="data-grid-header flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <Button variant="outline" size="sm">
              View All Transactions
            </Button>
          </div>
          <div className="divide-y divide-border">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{transaction.project}</h4>
                      <p className="text-sm text-muted-foreground">{transaction.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-lg">
                        ${transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                    <div className="p-1">
                      {transaction.status === 'completed' ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-warning" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients by Revenue */}
        <div className="data-grid">
          <div className="data-grid-header">
            <h3 className="text-lg font-semibold text-foreground">Top Clients by Revenue</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {clientRevenueData.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                         style={{ backgroundColor: client.color }}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{client.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.percentage}% of total revenue</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">${client.revenue.toLocaleString()}</p>
                    <div className="w-24 bg-muted rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${client.percentage * 3}%`, 
                          backgroundColor: client.color 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}