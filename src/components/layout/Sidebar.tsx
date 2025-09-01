import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  UserCheck, 
  TrendingUp, 
  DollarSign, 
  Settings,
  BarChart3,
  Target,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Proposals', href: '/proposals', icon: FileText },
  { name: 'Profiles', href: '/profiles', icon: Users },
  { name: 'Clients', href: '/clients', icon: UserCheck },
  { name: 'Pipeline', href: '/pipeline', icon: Target },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">BidMaster</h1>
              <p className="text-xs text-muted-foreground">Pro CRM</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
        </button>
      </div>

      <nav className="p-4">
        <ul className="sidebar-nav">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "sidebar-nav-item",
                    isActive ? "sidebar-nav-item-active" : "sidebar-nav-item-inactive"
                  )
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}