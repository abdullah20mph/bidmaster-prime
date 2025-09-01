import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Settings as SettingsIcon,
  Download,
  Upload,
  Trash2,
  Key,
  Globe,
  Mail,
  Smartphone
} from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    emailProposals: true,
    emailClients: true,
    pushProposals: false,
    pushDeadlines: true,
    weeklyReports: true,
    monthlyReports: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    activityTracking: false,
    dataSharing: false,
    analyticsOptIn: true
  });

  return (
    <Layout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and application settings</p>
        </div>

        {/* Profile Settings */}
        <div className="data-grid">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Profile Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="pst">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Standard Time</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time</SelectItem>
                    <SelectItem value="cst">Central Standard Time</SelectItem>
                    <SelectItem value="est">Eastern Standard Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="default">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Avatar
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="data-grid">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-3">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">New Proposal Responses</p>
                        <p className="text-xs text-muted-foreground">Get notified when clients respond to proposals</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.emailProposals}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailProposals: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Client Messages</p>
                        <p className="text-xs text-muted-foreground">Get notified of new client communications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.emailClients}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailClients: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Weekly Reports</p>
                        <p className="text-xs text-muted-foreground">Receive weekly performance summaries</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, weeklyReports: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-foreground mb-3">Push Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Proposal Updates</p>
                        <p className="text-xs text-muted-foreground">Real-time proposal status changes</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.pushProposals}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, pushProposals: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Project Deadlines</p>
                        <p className="text-xs text-muted-foreground">Reminders for upcoming deadlines</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.pushDeadlines}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, pushDeadlines: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="data-grid">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Privacy & Security</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Profile Visibility</p>
                  <p className="text-xs text-muted-foreground">Make your profile visible to potential clients</p>
                </div>
                <Switch 
                  checked={privacy.profileVisibility}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, profileVisibility: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Activity Tracking</p>
                  <p className="text-xs text-muted-foreground">Allow tracking for analytics and improvements</p>
                </div>
                <Switch 
                  checked={privacy.activityTracking}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, activityTracking: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Data Sharing</p>
                  <p className="text-xs text-muted-foreground">Share anonymized data for platform improvements</p>
                </div>
                <Switch 
                  checked={privacy.dataSharing}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Account Security</h4>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Two-Factor Auth
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Settings */}
        <div className="data-grid">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <SettingsIcon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Application Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="defaultView">Default Dashboard View</Label>
                <Select defaultValue="overview">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="proposals">Proposals</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoSave">Auto-save Interval</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="data-grid">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Export Data</span>
                </div>
                <span className="text-xs text-muted-foreground">Download all your data in JSON format</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span className="font-medium">Import Data</span>
                </div>
                <span className="text-xs text-muted-foreground">Import data from CSV or JSON files</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">Backup Settings</span>
                </div>
                <span className="text-xs text-muted-foreground">Configure automatic data backups</span>
              </Button>

              <Button variant="destructive" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span className="font-medium">Delete Account</span>
                </div>
                <span className="text-xs opacity-75">Permanently delete your account and data</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Save All Changes */}
        <div className="flex justify-end">
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
}