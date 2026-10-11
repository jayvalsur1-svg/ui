import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Filter,
  Download,
  Plus,
  Shield,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Check,
  Building,
  Mail,
  MoreVertical,
  Activity
} from 'lucide-react';

interface CustomerAccount {
  id: string;
  name: string;
  domain: string;
  plan: 'Enterprise' | 'Growth' | 'Starter';
  mrr: number;
  status: 'Active' | 'Trial' | 'Past Due';
  healthScore: number;
  usersCount: number;
  joinedDate: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Billing' | 'Developer';
  status: 'Active' | 'Invited';
  avatar: string;
}

const INITIAL_CUSTOMERS: CustomerAccount[] = [
  { id: 'c1', name: 'Stripeflow Ltd', domain: 'stripeflow.io', plan: 'Enterprise', mrr: 4200, status: 'Active', healthScore: 98, usersCount: 84, joinedDate: 'Jan 12, 2025' },
  { id: 'c2', name: 'HyperScale Data', domain: 'hyperscale.ai', plan: 'Enterprise', mrr: 5800, status: 'Active', healthScore: 94, usersCount: 140, joinedDate: 'Feb 03, 2025' },
  { id: 'c3', name: 'Nordic Velocity', domain: 'nordicv.se', plan: 'Growth', mrr: 1450, status: 'Active', healthScore: 89, usersCount: 32, joinedDate: 'Mar 18, 2025' },
  { id: 'c4', name: 'Aether Logistics', domain: 'aetherlog.com', plan: 'Growth', mrr: 1200, status: 'Trial', healthScore: 78, usersCount: 18, joinedDate: 'Apr 02, 2025' },
  { id: 'c5', name: 'Synthetix Bio', domain: 'synthetix.bio', plan: 'Enterprise', mrr: 3900, status: 'Active', healthScore: 92, usersCount: 65, joinedDate: 'Apr 19, 2025' },
  { id: 'c6', name: 'Klaro FinTech', domain: 'klaro.de', plan: 'Growth', mrr: 1600, status: 'Past Due', healthScore: 61, usersCount: 24, joinedDate: 'May 08, 2025' },
  { id: 'c7', name: 'Zenith Labs', domain: 'zenithlabs.co', plan: 'Starter', mrr: 490, status: 'Active', healthScore: 85, usersCount: 9, joinedDate: 'Jun 14, 2025' },
  { id: 'c8', name: 'PulseWave Media', domain: 'pulsewave.net', plan: 'Starter', mrr: 490, status: 'Trial', healthScore: 72, usersCount: 7, joinedDate: 'Jul 21, 2025' },
];

const INITIAL_TEAM: TeamMember[] = [
  { id: 'm1', name: 'Alex Morgan', email: 'alex@nexora.dev', role: 'Owner', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
  { id: 'm2', name: 'Marcus Sterling', email: 'marcus@nexora.dev', role: 'Admin', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { id: 'm3', name: 'Elena Rostova', email: 'elena@nexora.dev', role: 'Developer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 'm4', name: 'David Kim', email: 'david@nexora.dev', role: 'Billing', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
];

export const SaasDashboardDemo: React.FC = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'team' | 'billing'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop compact
  
  // Timeframe selector
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D' | 'YTD'>('30D');

  // Customer table filtering & search
  const [customerSearch, setCustomerSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Trial' | 'Past Due'>('All');
  const [selectedPlan, setSelectedPlan] = useState<'All' | 'Enterprise' | 'Growth' | 'Starter'>('All');

  // Notification drawer
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'New Enterprise Signup', desc: 'HyperScale Data upgraded to Enterprise ($5.8k/mo)', time: '12m ago', unread: true },
    { id: 'n2', title: 'Invoice Paid', desc: 'Stripeflow Ltd settled invoice #INV-2025-08', time: '1h ago', unread: true },
    { id: 'n3', title: 'Payment Failed', desc: 'Klaro FinTech failed renewal attempt #2', time: '4h ago', unread: false },
  ]);

  // Settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [emailDigests, setEmailDigests] = useState(true);

  // Invite member modal
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Developer' | 'Billing'>('Developer');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const newMember: TeamMember = {
      id: `m${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'Invited',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    };
    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail('');
    setInviteModalOpen(false);
  };

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return INITIAL_CUSTOMERS.filter((cust) => {
      const matchesSearch = cust.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                            cust.domain.toLowerCase().includes(customerSearch.toLowerCase());
      const matchesStatus = statusFilter === 'All' || cust.status === statusFilter;
      const matchesPlan = selectedPlan === 'All' || cust.plan === selectedPlan;
      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [customerSearch, statusFilter, selectedPlan]);

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DemoViewerShell
      demoId="saas-dashboard"
      demoTitle="Nexus Metrics // SaaS Analytics"
      category="Enterprise SaaS & Business Intelligence"
      styleBadge="Modern SaaS Dashboard"
    >
      <div className={`min-h-screen font-sans transition-colors duration-200 ${isDarkMode ? 'bg-[#0B0F19] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
        
        {/* Top Demo Bar Banner */}
        <div className={`border-b px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs transition-colors ${
          isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-indigo-500 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              NEXUS METRICS // ENTERPRISE
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              LIVE MULTI-TENANT SIMULATION
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 font-mono text-[11px] transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-yellow-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Light / Dark Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <Link
              to="/request?style=saas-dashboard"
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-all"
            >
              <Sparkles className="w-3 h-3" />
              <span>Order Dashboard UI</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Shell: Sidebar + Content */}
        <div className="flex relative">
          
          {/* Mobile Sidebar Overlay Backdrop */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* SIDEBAR NAVIGATION */}
          <aside className={`fixed md:sticky top-0 h-screen z-50 flex flex-col justify-between border-r transition-all duration-300 ${
            isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200'
          } ${
            isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
          } ${
            isSidebarCollapsed ? 'md:w-20' : 'md:w-64'
          }`}>
            
            {/* Sidebar Top: Logo & Workspace */}
            <div>
              <div className="h-16 px-4 flex items-center justify-between border-b border-inherit">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-base shadow-md shrink-0">
                    N
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="min-w-0">
                      <div className="font-display font-black text-sm tracking-tight truncate">Nexus Metrics</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">Acme Global Corp</div>
                    </div>
                  )}
                </div>

                {/* Close button on mobile */}
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="md:hidden p-1 rounded-lg text-slate-400 hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="p-3 space-y-1">
                {[
                  { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
                  { id: 'customers', label: 'Customer Accounts', icon: Building, badge: '8' },
                  { id: 'team', label: 'Team & Roles', icon: Users, badge: '4' },
                  { id: 'billing', label: 'Revenue & Plans', icon: CreditCard },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md'
                          : isDarkMode
                          ? 'text-slate-400 hover:text-white hover:bg-white/5'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!isSidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                              isActive ? 'bg-white/20 text-white' : 'bg-slate-500/10 text-slate-400'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Bottom: Collapse toggle & User badge */}
            <div className="p-3 border-t border-inherit space-y-2">
              {/* Desktop Collapse Toggle */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`hidden md:flex w-full items-center justify-center p-2 rounded-lg text-xs text-slate-400 hover:bg-white/5 transition-colors`}
                title="Collapse Sidebar"
              >
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
                {!isSidebarCollapsed && <span className="ml-2 text-[11px] font-mono">Collapse Sidebar</span>}
              </button>

              {/* User Profile Card */}
              <div 
                onClick={() => setSettingsOpen(true)}
                className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30 shrink-0"
                />
                {!isSidebarCollapsed && (
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">Alex Morgan</div>
                    <div className="text-[10px] text-slate-400 truncate">Owner • Pro Plan</div>
                  </div>
                )}
                {!isSidebarCollapsed && <Settings className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              </div>
            </div>

          </aside>

          {/* MAIN DASHBOARD CONTENT AREA */}
          <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 space-y-6">
            
            {/* Top Application Bar */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile Hamburger */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`md:hidden p-2 rounded-xl border ${
                    isDarkMode ? 'bg-[#0E1322] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                    {activeTab === 'overview' && 'Executive Metrics Overview'}
                    {activeTab === 'customers' && 'Customer Accounts & Retainers'}
                    {activeTab === 'team' && 'Team Access & Role Governance'}
                    {activeTab === 'billing' && 'Subscription Tiers & Billing'}
                  </h1>
                  <p className="text-xs text-slate-400 font-mono">
                    Updated live • Next sync in 4m 12s
                  </p>
                </div>
              </div>

              {/* Action Toolbar: Timeframe + Notifications + Search */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Global Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Quick search..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className={`pl-8 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-36 sm:w-48 transition-colors ${
                      isDarkMode ? 'bg-[#121829] border-white/10 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Timeframe pill selector */}
                <div className={`flex rounded-xl p-0.5 border text-xs font-mono ${
                  isDarkMode ? 'bg-[#121829] border-white/10' : 'bg-slate-200/70 border-slate-300'
                }`}>
                  {(['7D', '30D', '90D', 'YTD'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={`px-2 py-1 rounded-lg transition-all ${
                        timeframe === t 
                          ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Notification Dropdown Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className={`relative p-2 rounded-xl border transition-colors ${
                      isDarkMode ? 'bg-[#121829] border-white/10 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label="View notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#0B0F19]" />
                    )}
                  </button>

                  {/* Dropdown Panel */}
                  {notificationsOpen && (
                    <div className={`absolute right-0 mt-2 w-80 rounded-2xl border p-4 shadow-2xl z-50 transition-all ${
                      isDarkMode ? 'bg-[#0E1322] border-white/15' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between pb-3 border-b border-inherit">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">Notifications</span>
                          {unreadCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-400">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[10px] text-indigo-400 hover:underline font-mono"
                        >
                          Mark all read
                        </button>
                      </div>

                      <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                        {notifications.map((n) => (
                          <div 
                            key={n.id} 
                            className={`p-2.5 rounded-xl text-xs space-y-1 transition-colors ${
                              n.unread 
                                ? (isDarkMode ? 'bg-indigo-600/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-100')
                                : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-bold">{n.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug">{n.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </header>

            {/* TAB 1: OVERVIEW & KPIS */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 4 Primary KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* KPI 1: MRR */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#0E1322] border-white/10 hover:border-indigo-500/30' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Monthly Recurring (MRR)</span>
                      <span className="flex items-center text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold mt-2 tracking-tight">
                      $128,450
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>vs $112,470 last period</span>
                      <span className="font-mono text-indigo-400">ARR: $1.54M</span>
                    </div>
                  </div>

                  {/* KPI 2: Active Customer Orgs */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#0E1322] border-white/10 hover:border-indigo-500/30' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Active Organizations</span>
                      <span className="flex items-center text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +8.5%
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold mt-2 tracking-tight">
                      2,840
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>+142 this month</span>
                      <span className="font-mono text-cyan-400">99.4% SLA</span>
                    </div>
                  </div>

                  {/* KPI 3: Net Revenue Retention */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#0E1322] border-white/10 hover:border-indigo-500/30' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Net Revenue Retention</span>
                      <span className="flex items-center text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +3.1%
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold mt-2 tracking-tight">
                      118.4%
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>Top quartile benchmark</span>
                      <span className="font-mono text-emerald-400">High Growth</span>
                    </div>
                  </div>

                  {/* KPI 4: Logo Churn */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#0E1322] border-white/10 hover:border-indigo-500/30' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Monthly Logo Churn</span>
                      <span className="flex items-center text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <TrendingDown className="w-3 h-3 mr-0.5" /> -0.4%
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-extrabold mt-2 tracking-tight">
                      1.18%
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>Lowest in 12 months</span>
                      <span className="font-mono text-slate-400">Target &lt; 2%</span>
                    </div>
                  </div>

                </div>

                {/* Analytical Visualizations Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* MRR Trajectory Interactive Chart */}
                  <div className={`lg:col-span-8 p-6 rounded-2xl border ${
                    isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div>
                        <h3 className="font-display font-bold text-base">Revenue Trajectory & Expansion</h3>
                        <p className="text-xs text-slate-400 font-mono">Simulated monthly compounding run rate ({timeframe})</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-mono">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> New Expansion
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Base MRR
                        </span>
                      </div>
                    </div>

                    {/* SVG Chart simulation */}
                    <div className="relative h-60 w-full flex items-end justify-between gap-2 pt-6">
                      {[
                        { month: 'Oct', base: 65, exp: 12, val: '$88k' },
                        { month: 'Nov', base: 72, exp: 15, val: '$96k' },
                        { month: 'Dec', base: 78, exp: 18, val: '$104k' },
                        { month: 'Jan', base: 84, exp: 20, val: '$112k' },
                        { month: 'Feb', base: 90, exp: 24, val: '$121k' },
                        { month: 'Mar', base: 96, exp: 28, val: '$128k' },
                      ].map((bar) => (
                        <div key={bar.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                          {/* Hover Tooltip */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono px-2 py-1 rounded bg-black/80 text-white mb-2 pointer-events-none">
                            {bar.val}
                          </div>
                          
                          <div className="w-full max-w-[42px] flex flex-col gap-1 items-center">
                            {/* Expansion segment */}
                            <div 
                              className="w-full rounded-t-lg bg-indigo-500 group-hover:bg-indigo-400 transition-all duration-300"
                              style={{ height: `${bar.exp * 2}px` }}
                            />
                            {/* Base segment */}
                            <div 
                              className="w-full rounded-b-lg bg-cyan-500/70 group-hover:bg-cyan-400 transition-all duration-300"
                              style={{ height: `${bar.base * 1.5}px` }}
                            />
                          </div>

                          <span className="text-[11px] font-mono text-slate-400 mt-3">{bar.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Revenue Distribution by Tier */}
                  <div className={`lg:col-span-4 p-6 rounded-2xl border flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div>
                      <h3 className="font-display font-bold text-base">Plan Contribution</h3>
                      <p className="text-xs text-slate-400 font-mono">Revenue mix across tiers</p>

                      <div className="space-y-4 mt-6">
                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1.5">
                            <span>Enterprise Custom</span>
                            <span className="font-bold text-indigo-400">58% ($74.5k)</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-700/30 overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '58%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1.5">
                            <span>Growth Tier</span>
                            <span className="font-bold text-cyan-400">28% ($35.9k)</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-700/30 overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full" style={{ width: '28%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1.5">
                            <span>Starter Tier</span>
                            <span className="font-bold text-slate-400">14% ($18.0k)</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-700/30 overflow-hidden">
                            <div className="h-full bg-slate-400 rounded-full" style={{ width: '14%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border mt-6 text-xs space-y-2 ${
                      isDarkMode ? 'bg-[#121829] border-white/5' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2 text-indigo-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Automated Churn Defense</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Dunning emails and automated card updates recovered $4,120 in recurring revenue this cycle.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Quick Account Snapshot Table */}
                <div className={`p-6 rounded-2xl border ${
                  isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-base">Recent High-Value Accounts</h3>
                    <button
                      onClick={() => setActiveTab('customers')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1"
                    >
                      View All Customers <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className={`border-b font-mono ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                          <th className="pb-3 font-semibold">Account</th>
                          <th className="pb-3 font-semibold">Plan</th>
                          <th className="pb-3 font-semibold">MRR</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold">Health Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-inherit">
                        {INITIAL_CUSTOMERS.slice(0, 4).map((c) => (
                          <tr key={c.id} className={`${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'} transition-colors`}>
                            <td className="py-3 font-bold">{c.name} <span className="text-[10px] text-slate-400 block font-normal">{c.domain}</span></td>
                            <td className="py-3 font-mono">{c.plan}</td>
                            <td className="py-3 font-mono font-bold">${c.mrr.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                                c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                c.status === 'Trial' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex items-center gap-2 font-mono">
                                <span className={c.healthScore >= 90 ? 'text-emerald-400' : 'text-amber-400'}>{c.healthScore}/100</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: SEARCHABLE & FILTERABLE CUSTOMER TABLE */}
            {activeTab === 'customers' && (
              <div className={`p-6 rounded-2xl border space-y-5 ${
                isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                {/* Search & Filter Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-bold text-lg">Customer Directory</h2>
                    <p className="text-xs text-slate-400 font-mono">Showing {filteredCustomers.length} of {INITIAL_CUSTOMERS.length} total subscribers</p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status filter buttons */}
                    <div className={`flex rounded-xl p-0.5 border text-xs font-mono ${
                      isDarkMode ? 'bg-[#121829] border-white/10' : 'bg-slate-100 border-slate-300'
                    }`}>
                      {(['All', 'Active', 'Trial', 'Past Due'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={`px-2.5 py-1 rounded-lg transition-all ${
                            statusFilter === s
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Plan Filter */}
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs border font-mono focus:outline-none ${
                        isDarkMode ? 'bg-[#121829] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <option value="All">All Plans</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Growth">Growth</option>
                      <option value="Starter">Starter</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b font-mono ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                        <th className="pb-3 font-semibold">Organization</th>
                        <th className="pb-3 font-semibold">Tier Plan</th>
                        <th className="pb-3 font-semibold">MRR</th>
                        <th className="pb-3 font-semibold">Seats</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Health Score</th>
                        <th className="pb-3 font-semibold">Joined</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-inherit">
                      {filteredCustomers.map((c) => (
                        <tr key={c.id} className={`${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'} transition-colors`}>
                          <td className="py-3 font-bold">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                                {c.name.slice(0, 1)}
                              </div>
                              <div>
                                <div>{c.name}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{c.domain}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 font-mono">{c.plan}</td>
                          <td className="py-3 font-mono font-bold">${c.mrr.toLocaleString()}</td>
                          <td className="py-3 font-mono text-slate-400">{c.usersCount} seats</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                              c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              c.status === 'Trial' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 font-mono">
                            <span className={c.healthScore >= 90 ? 'text-emerald-400' : c.healthScore >= 75 ? 'text-amber-400' : 'text-red-400'}>
                              {c.healthScore}/100
                            </span>
                          </td>
                          <td className="py-3 text-slate-400 font-mono text-[11px]">{c.joinedDate}</td>
                          <td className="py-3 text-right">
                            <button className="px-2.5 py-1 rounded-lg border text-[11px] hover:bg-indigo-600 hover:text-white transition-colors">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: TEAM & ROLES */}
            {activeTab === 'team' && (
              <div className={`p-6 rounded-2xl border space-y-6 ${
                isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-bold text-lg">Team Members & Governance</h2>
                    <p className="text-xs text-slate-400 font-mono">Manage RBAC permissions and organization collaborators</p>
                  </div>

                  <button
                    onClick={() => setInviteModalOpen(true)}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Invite Team Member</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b font-mono ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                        <th className="pb-3 font-semibold">Member</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold">Role</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-inherit">
                      {teamMembers.map((m) => (
                        <tr key={m.id} className={`${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'} transition-colors`}>
                          <td className="py-3.5 font-bold">
                            <div className="flex items-center gap-3">
                              <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                              <span>{m.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-slate-400 font-mono">{m.email}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[10px] border border-indigo-500/20">
                              {m.role}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                              m.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button className="text-slate-400 hover:text-slate-200 p-1">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: REVENUE & PLANS */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Starter', price: '$490', period: '/month', features: ['Up to 10 seats', 'Standard analytics', 'Email support', '1M events/mo'] },
                    { name: 'Growth', price: '$1,450', period: '/month', badge: 'Popular', features: ['Up to 50 seats', 'Advanced funnel analysis', 'Slack connect priority', '10M events/mo', 'Custom domains'] },
                    { name: 'Enterprise', price: '$3,900+', period: '/month', features: ['Unlimited seats', 'Real-time CDC pipeline', 'Dedicated CSM', '99.99% SLA guarantee', 'SOC-2 audit logs'] },
                  ].map((tier) => (
                    <div 
                      key={tier.name}
                      className={`p-6 rounded-2xl border flex flex-col justify-between ${
                        tier.badge 
                          ? (isDarkMode ? 'bg-indigo-950/20 border-indigo-500/50 shadow-xl' : 'bg-indigo-50/50 border-indigo-300 shadow-sm')
                          : (isDarkMode ? 'bg-[#0E1322] border-white/10' : 'bg-white border-slate-200')
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-display font-extrabold text-lg">{tier.name}</h3>
                          {tier.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white font-mono text-[10px] font-bold">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-3xl font-display font-black tracking-tight">
                          {tier.price} <span className="text-xs font-normal text-slate-400 font-mono">{tier.period}</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-400 pt-2 border-t border-inherit">
                          {tier.features.map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all">
                        Upgrade Organization
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>

        {/* SETTINGS DRAWER / MODAL */}
        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-5 ${
              isDarkMode ? 'bg-[#0E1322] border-white/15' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center pb-3 border-b border-inherit">
                <h3 className="font-display font-bold text-base">User Preferences & Security</h3>
                <button onClick={() => setSettingsOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">Two-Factor Authentication</div>
                    <div className="text-slate-400 text-[11px]">Require TOTP app on every login</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={mfaEnabled}
                    onChange={(e) => setMfaEnabled(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">Weekly Performance Digest</div>
                    <div className="text-slate-400 text-[11px]">Send summary of MRR changes on Mondays</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailDigests}
                    onChange={(e) => setEmailDigests(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INVITE TEAM MEMBER MODAL */}
        {inviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <form onSubmit={handleInvite} className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-[#0E1322] border-white/15' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center pb-2 border-b border-inherit">
                <h3 className="font-display font-bold text-base">Invite Team Collaborator</h3>
                <button type="button" onClick={() => setInviteModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="teammate@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode ? 'bg-[#121829] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Assign Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-xl border font-mono focus:outline-none ${
                      isDarkMode ? 'bg-[#121829] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="Admin">Admin (Full Workspace Config)</option>
                    <option value="Developer">Developer (API Keys & Logs)</option>
                    <option value="Billing">Billing (Invoices & Inbound Receipts)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </DemoViewerShell>
  );
};
