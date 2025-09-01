import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit3, 
  MoreHorizontal, 
  Users,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';

const profilesData = [
  {
    id: 1,
    name: 'Full-Stack Developer',
    specialization: 'Web Development',
    hourlyRate: '$75/hr',
    totalEarnings: '$45,230',
    activeProposals: 12,
    winRate: '38%',
    badges: ['Top Rated', 'Rising Talent'],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    responseTime: '2 hours',
    profileViews: 1247,
    rating: 4.9,
    completedJobs: 87,
    status: 'active',
    description: 'Experienced full-stack developer specializing in modern web applications...'
  },
  {
    id: 2,
    name: 'UI/UX Designer',
    specialization: 'Design',
    hourlyRate: '$60/hr',
    totalEarnings: '$28,940',
    activeProposals: 8,
    winRate: '42%',
    badges: ['Top Rated Plus'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    responseTime: '1 hour',
    profileViews: 892,
    rating: 4.8,
    completedJobs: 56,
    status: 'active',
    description: 'Creative designer focused on user-centered design and modern interfaces...'
  },
  {
    id: 3,
    name: 'Mobile App Developer',
    specialization: 'Mobile Development',
    hourlyRate: '$80/hr',
    totalEarnings: '$32,150',
    activeProposals: 6,
    winRate: '29%',
    badges: ['Rising Talent'],
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    responseTime: '3 hours',
    profileViews: 734,
    rating: 4.7,
    completedJobs: 34,
    status: 'paused',
    description: 'Mobile app specialist with expertise in cross-platform development...'
  },
  {
    id: 4,
    name: 'Data Scientist',
    specialization: 'Data & Analytics',
    hourlyRate: '$90/hr',
    totalEarnings: '$19,800',
    activeProposals: 4,
    winRate: '45%',
    badges: ['Expert-Vetted'],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
    responseTime: '4 hours',
    profileViews: 456,
    rating: 5.0,
    completedJobs: 23,
    status: 'active',
    description: 'Data scientist specializing in machine learning and predictive analytics...'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-success text-success-foreground';
    case 'paused':
      return 'bg-warning text-warning-foreground';
    case 'inactive':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export default function Profiles() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfiles = profilesData.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profiles</h1>
            <p className="text-muted-foreground">Manage your Upwork profiles and specializations</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            Create Profile
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Profiles</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Profiles</p>
                <p className="text-2xl font-bold text-success">3</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Win Rate</p>
                <p className="text-2xl font-bold text-primary">38.5%</p>
              </div>
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">$126,120</p>
              </div>
              <Star className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProfiles.map((profile) => (
            <div key={profile.id} className="data-grid">
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {profile.name}
                    </h3>
                    <p className="text-muted-foreground">{profile.specialization}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(profile.status)}>
                      {profile.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                      <Award className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {profile.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{profile.hourlyRate}</p>
                    <p className="text-xs text-muted-foreground">Hourly Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{profile.winRate}</p>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{profile.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{profile.completedJobs}</p>
                    <p className="text-xs text-muted-foreground">Completed Jobs</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.slice(0, 5).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Earnings</p>
                    <p className="font-semibold text-foreground">{profile.totalEarnings}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Proposals</p>
                    <p className="font-semibold text-foreground">{profile.activeProposals}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="font-semibold text-foreground">{profile.responseTime}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="default" className="flex-1">
                    View Analytics
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