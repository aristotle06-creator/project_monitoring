import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, GraduationCap, Users, UserCheck, Sparkles, RefreshCw } from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const { currentUser, loginAs, resetToDemoData } = useApp();

  if (!currentUser) return null;

  const roles = [
    {
      id: 'admin',
      label: 'Admin',
      name: 'Dr. Robert Vance',
      icon: ShieldCheck,
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
    },
    {
      id: 'guide',
      label: 'Project Guide',
      name: 'Prof. Sarah Jenkins',
      icon: GraduationCap,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
    },
    {
      id: 'leader',
      label: 'Team Leader',
      name: 'Alex Rivera',
      icon: Users,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      id: 'student',
      label: 'Student',
      name: 'Maya Patel',
      icon: UserCheck,
      color: 'bg-amber-600 hover:bg-amber-700 text-white',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-4 py-2 text-xs border-b border-blue-900/50 shadow-inner flex flex-wrap items-center justify-between gap-3 role-banner">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-semibold text-blue-300 uppercase tracking-wider text-[10px] bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          Role Simulation Bar
        </span>
        <span className="hidden md:inline text-slate-300">
          Current viewing as:
        </span>
        <span className="font-bold text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {currentUser.name}
          <span className="font-normal text-slate-400">({currentUser.role.toUpperCase()})</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-slate-400 mr-1 text-[11px]">Switch Persona:</span>
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = currentUser.role === r.id;
          return (
            <button
              key={r.id}
              onClick={() => loginAs(r.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-blue-500 text-white ring-2 ring-white/50 shadow-md font-bold'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}

        <button
          onClick={resetToDemoData}
          title="Reset all projects, tasks and reviews to initial state"
          className="ml-2 flex items-center gap-1 px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-amber-300 border border-slate-700 text-[11px] transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
