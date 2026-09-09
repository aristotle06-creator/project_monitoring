import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Activity,
  FileText,
  Calendar,
  FileSpreadsheet,
  BarChart3,
  MessageSquareText,
  Bell,
  ShieldCheck,
  Settings,
  LogOut,
  X,
  Layers
} from 'lucide-react';

export const Sidebar = ({ mobileOpen, onCloseMobile }) => {
  const {
    currentUser,
    currentPage,
    navigateTo,
    projects,
    tasks,
    notifications,
    logout
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingTasksCount = tasks.filter((t) => t.status !== 'completed').length;
  const activeProjectsCount = projects.filter((p) => p.status === 'In Progress' || p.status === 'Under Review').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban, badge: activeProjectsCount },
    { id: 'tasks', label: 'Task Kanban', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'team', label: 'Team & Students', icon: Users },
    { id: 'progress', label: 'Progress Monitoring', icon: Activity },
    { id: 'documents', label: 'Documents Hub', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'feedback', label: 'Guide Feedback', icon: MessageSquareText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null, badgeColor: 'bg-rose-500 text-white' },
    { id: 'admin', label: 'Admin Control', icon: ShieldCheck, restrictedTo: 'admin' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    navigateTo(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden animate-fade-in no-print"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print`}
      >
        {/* Brand Logo Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">
                  Project<span className="text-blue-400">Monitor</span>
                </span>
                <span className="text-[9px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1 py-0.5 rounded">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Integrated Project Platform</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Main Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || (item.id === 'projects' && currentPage === 'project-detail');
            const isRestricted = item.restrictedTo && currentUser?.role !== item.restrictedTo;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge !== null && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {isRestricted && (
                  <span className="text-[9px] text-slate-500 uppercase font-mono">
                    Admin
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Card & Logout Bottom */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div
              onClick={() => handleNavClick('settings')}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
            >
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/50"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {currentUser?.name}
                </p>
                <p className="text-[10px] text-blue-400 capitalize truncate">
                  {currentUser?.role === 'leader' ? 'Team Leader' : currentUser?.role === 'guide' ? 'Project Guide' : currentUser?.role}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
