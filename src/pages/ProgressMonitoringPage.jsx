import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../components/common/Badge';
import { ProgressBar, CircularProgress } from '../components/common/ProgressBar';
import { MonthlyProgressChart, TaskVelocityChart } from '../components/common/Charts';

export const ProgressMonitoringPage = () => {
  const { projects, milestones, tasks, navigateTo } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState('all');

  const activeProjects = projects.filter((p) => selectedProjectId === 'all' || p.id === selectedProjectId);
  const delayedProjects = projects.filter((p) => p.status === 'Delayed');

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Academic Project Progress & Schedule Monitoring
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit planned vs. actual project velocity, schedule variance, and critical path milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Global (All 5 Projects)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.id}: {p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Delayed / Risk Alert Banner if any delayed project exists */}
      {delayedProjects.length > 0 && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-600/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                Critical Schedule Warning: {delayedProjects.length} Project Behind Target
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">
                {delayedProjects[0].title} ({delayedProjects[0].id}) has fallen 15 days behind due to hardware sleep current revisions. Immediate guide consultation required.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('project-detail', delayedProjects[0].id)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow whitespace-nowrap self-start sm:self-center"
          >
            Review Project Mitigation →
          </button>
        </div>
      )}

      {/* KPI Cards for Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Average Progress</span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">76%</div>
            <span className="text-[11px] text-emerald-600 font-medium">+8% from last sprint</span>
          </div>
          <CircularProgress progress={76} size={58} strokeWidth={6} color="#2563EB" />
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Schedule Index (SPI)</span>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">0.96</div>
            <span className="text-[11px] text-slate-500">Target &gt; 0.90 (Healthy)</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Milestones Passed</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-1">11 / 15</div>
            <span className="text-[11px] text-blue-600 font-medium">73.3% Verified</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Days to Final Viva</span>
            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-1">42</div>
            <span className="text-[11px] text-slate-500">May 28 Exhibition</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Planned vs. Actual Milestone Delivery Curve
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Monthly project milestone velocity against the academic semester schedule
            </p>
          </div>
        </div>

        <MonthlyProgressChart />
      </div>

      {/* Project-by-Project Detailed Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Active Project Schedule Breakdown
        </h3>

        <div className="space-y-4">
          {activeProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => navigateTo('project-detail', p.id)}
              className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {p.id}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{p.currentPhase}</span>
                  <StatusBadge status={p.status} size="sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-8">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Milestone Progress</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{p.progress}%</span>
                  </div>
                  <ProgressBar progress={p.progress} color="auto" size="md" />
                </div>
                <div className="sm:col-span-4 flex items-center justify-end gap-3 text-xs text-slate-500">
                  <span>Guide: <strong className="text-slate-800 dark:text-slate-200">{p.guideName}</strong></span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
