import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  DollarSign,
  FileText,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform Development',
    client: 'TechCorp Inc.',
    status: 'in_progress',
    progress: 75,
    budget: '$15,000',
    earned: '$11,250',
    startDate: '2024-01-15',
    deadline: '2024-02-29',
    daysRemaining: 12,
    team: ['John Doe', 'Sarah Wilson'],
    description: 'Building a modern e-commerce platform with React and Node.js',
    milestones: [
      { name: 'Design Approval', completed: true },
      { name: 'Backend API', completed: true },
      { name: 'Frontend Implementation', completed: false },
      { name: 'Testing & Deployment', completed: false }
    ],
    lastActivity: 'Deployed payment integration',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Mobile App UI/UX Design',
    client: 'StartupXYZ',
    status: 'in_progress',
    progress: 60,
    budget: '$8,500',
    earned: '$5,100',
    startDate: '2024-01-20',
    deadline: '2024-02-15',
    daysRemaining: 5,
    team: ['Alice Johnson'],
    description: 'Complete mobile app design for fintech startup',
    milestones: [
      { name: 'User Research', completed: true },
      { name: 'Wireframes', completed: true },
      { name: 'UI Design', completed: false },
      { name: 'Prototype', completed: false }
    ],
    lastActivity: 'Completed user flow diagrams',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Database Optimization',
    client: 'DataSolutions',
    status: 'completed',
    progress: 100,
    budget: '$3,200',
    earned: '$3,200',
    startDate: '2024-01-05',
    deadline: '2024-01-25',
    daysRemaining: 0,
    team: ['Mike Chen'],
    description: 'Optimize database queries and improve performance',
    milestones: [
      { name: 'Analysis', completed: true },
      { name: 'Query Optimization', completed: true },
      { name: 'Performance Testing', completed: true },
      { name: 'Documentation', completed: true }
    ],
    lastActivity: 'Project completed successfully',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'API Integration Project',
    client: 'CloudFirst',
    status: 'on_hold',
    progress: 30,
    budget: '$6,000',
    earned: '$1,800',
    startDate: '2024-01-10',
    deadline: '2024-03-10',
    daysRemaining: 28,
    team: ['David Park', 'Emma Wilson'],
    description: 'Integrate multiple third-party APIs',
    milestones: [
      { name: 'API Research', completed: true },
      { name: 'Authentication Setup', completed: false },
      { name: 'Data Integration', completed: false },
      { name: 'Testing', completed: false }
    ],
    lastActivity: 'Waiting for client API credentials',
    priority: 'medium'
  },
  {
    id: 5,
    title: 'React Dashboard',
    client: 'Analytics Pro',
    status: 'planning',
    progress: 10,
    budget: '$12,000',
    earned: '$0',
    startDate: '2024-02-01',
    deadline: '2024-03-15',
    daysRemaining: 35,
    team: ['John Doe', 'Sarah Wilson', 'Tom Brown'],
    description: 'Build comprehensive analytics dashboard',
    milestones: [
      { name: 'Requirements Gathering', completed: false },
      { name: 'Technical Design', completed: false },
      { name: 'Development', completed: false },
      { name: 'Testing & Launch', completed: false }
    ],
    lastActivity: 'Initial planning meeting scheduled',
    priority: 'low'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'in_progress':
      return 'bg-primary text-primary-foreground';
    case 'completed':
      return 'bg-success text-success-foreground';
    case 'on_hold':
      return 'bg-warning text-warning-foreground';
    case 'planning':
      return 'bg-muted text-muted-foreground';
    case 'cancelled':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'in_progress':
      return <PlayCircle className="w-4 h-4" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'on_hold':
      return <PauseCircle className="w-4 h-4" />;
    case 'planning':
      return <FileText className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-muted-foreground';
  }
}

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Track and manage your active projects</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <PlayCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">28</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$156,400</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Time Rate</p>
                <p className="text-2xl font-bold text-success">94%</p>
              </div>
              <Clock className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('all')}
            >
              All
            </Button>
            <Button
              variant={selectedStatus === 'in_progress' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('in_progress')}
            >
              In Progress
            </Button>
            <Button
              variant={selectedStatus === 'completed' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('completed')}
            >
              Completed
            </Button>
            <Button
              variant={selectedStatus === 'on_hold' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('on_hold')}
            >
              On Hold
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="data-grid">
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1 capitalize">{project.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{project.description}</p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold text-foreground">{project.budget}</p>
                    <p className="text-xs text-success">Earned: {project.earned}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="font-semibold text-foreground">
                      {project.daysRemaining > 0 ? `${project.daysRemaining} days left` : 'Completed'}
                    </p>
                    <p className="text-xs text-muted-foreground">Due: {project.deadline}</p>
                  </div>
                </div>

                {/* Team */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Team</p>
                  <div className="flex items-center space-x-2">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Milestones</p>
                  <div className="space-y-1">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-success' : 'bg-muted'
                        }`}>
                          {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs ${
                          milestone.completed ? 'text-foreground line-through' : 'text-muted-foreground'
                        }`}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last Activity */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{project.lastActivity}</p>
                  </div>
                </div>

                {/* Priority & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className={getPriorityColor(project.priority)}>
                    {project.priority.toUpperCase()} PRIORITY
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                    <Button variant="default" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}