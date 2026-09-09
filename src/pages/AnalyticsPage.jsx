import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { ProgressBar, CircularProgress } from '../components/common/ProgressBar';
import { ProjectStatusDonut, TaskVelocityChart } from '../components/common/Charts';

export const AnalyticsPage = () => {
  const { projects, milestones, tasks, users } = useApp();

  const totalMilestones = milestones.length;
  const approvedMilestones = milestones.filter((m) => m.status === 'Approved').length;
  const approvalRate = Math.round((approvedMilestones / (totalMilestones || 1)) * 100);

  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const taskCompletionRate = Math.round((completedTasks / (tasks.length || 1)) * 100);

  const departmentStats = [
    { name: 'Computer Science & Engineering', projects: 3, avgScore: 94, onTimeRate: 92 },
    { name: 'Information Technology', projects: 1, avgScore: 88, onTimeRate: 100 },
    { name: 'Electronics & Communication', projects: 1, avgScore: 72, onTimeRate: 50 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Executive Performance & Cohort Analytics
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          High-level institutional statistics on project completion rate, milestone approvals, and team productivity.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Project Success Rate"
          value="94.2%"
          subtitle="On-time delivery"
          icon={Target}
          color="blue"
          trend="+4.2% YoY"
        />
        <StatCard
          title="Avg Progress"
          value="76%"
          subtitle="Cohort average"
          icon={TrendingUp}
          color="indigo"
          trend="Ahead"
        />
        <StatCard
          title="Milestone Approval"
          value={`${approvalRate}%`}
          subtitle={`${approvedMilestones}/${totalMilestones} Passed`}
          icon={Award}
          color="emerald"
          trend="92% First Try"
        />
        <StatCard
          title="Task Velocity"
          value={`${taskCompletionRate}%`}
          subtitle={`${completedTasks}/${tasks.length} Completed`}
          icon={CheckCircle2}
          color="purple"
          trend="+14% Sprint"
        />
        <StatCard
          title="Team Productivity"
          value="89.5"
          subtitle="Quality Score / 100"
          icon={Zap}
          color="amber"
          trend="High"
        />
        <StatCard
          title="Guide Response"
          value="18 hrs"
          subtitle="Avg Review Speed"
          icon={Clock}
          color="rose"
          trend="Fast"
        />
      </div>

      {/* Analytics Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Comparison (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Academic Department Evaluation Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative benchmark of project delivery quality and on-time compliance
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {departmentStats.map((dept) => (
              <div
                key={dept.name}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {dept.name}
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    {dept.projects} Active Projects
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Quality & Viva Score</span>
                      <span className="font-bold">{dept.avgScore}%</span>
                    </div>
                    <ProgressBar progress={dept.avgScore} color="blue" size="sm" />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Schedule On-Time Rate</span>
                      <span className="font-bold">{dept.onTimeRate}%</span>
                    </div>
                    <ProgressBar progress={dept.onTimeRate} color="emerald" size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Approval Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Milestone Approval Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Faculty supervisor sign-off decisions
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6">
            <CircularProgress progress={approvalRate} size={130} strokeWidth={12} color="#059669" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-3">
              {approvedMilestones} of {totalMilestones} Milestones Approved
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              <span className="text-[10px] block">Approved</span>
              <span className="font-bold text-sm font-mono">{approvedMilestones}</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <span className="text-[10px] block">Review Pending</span>
              <span className="font-bold text-sm font-mono">
                {milestones.filter((m) => m.status === 'Under Review').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
