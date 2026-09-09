import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  CheckSquare,
  ArrowRight,
  TrendingUp,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  Activity as ActivityIcon
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { ProjectStatusDonut, MonthlyProgressChart, TaskVelocityChart, TeamPerformanceList } from '../components/common/Charts';

export const DashboardPage = () => {
  const {
    currentUser,
    projects,
    tasks,
    milestones,
    users,
    activities,
    calendarEvents,
    navigateTo,
    setSelectedProjectId
  } = useApp();

  // Metrics Calculations
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === 'In Progress' || p.status === 'Under Review').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const delayedProjects = projects.filter((p) => p.status === 'Delayed').length;
  const totalMembers = users.filter((u) => u.role === 'student' || u.role === 'leader').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'completed').length;
  
  const avgProgress = Math.round(
    projects.reduce((acc, p) => acc + (p.progress || 0), 0) / (projects.length || 1)
  );

  // Filter deadlines
  const upcomingDeadlines = [
    {
      id: 'D-1',
      title: 'Milestone 4: Core Computer Vision Pose Estimation Engine',
      projectName: 'Smart Mobile Platform for Sports Talent Identification',
      projectId: 'PRJ-101',
      dueDate: '2026-04-15',
      daysLeft: 5,
      type: 'Milestone',
      priority: 'High',
      status: 'Under Review'
    },
    {
      id: 'D-2',
      title: 'FastAPI Athlete Performance Metrics Engine Endpoint',
      projectName: 'Smart Mobile Platform for Sports Talent Identification',
      projectId: 'PRJ-101',
      dueDate: '2026-04-08',
      daysLeft: 2,
      type: 'Task',
      priority: 'Critical',
      status: 'In Progress'
    },
    {
      id: 'D-3',
      title: 'LoRaWAN Gateway & ESP32 Node Firmware Fix',
      projectName: 'Smart Campus IoT Monitoring & Energy Optimization System',
      projectId: 'PRJ-105',
      dueDate: '2026-04-12',
      daysLeft: 4,
      type: 'Task',
      priority: 'Critical',
      status: 'Delayed'
    },
    {
      id: 'D-4',
      title: 'Penetration Testing & HIPAA Compliance Audit',
      projectName: 'Online Hospital Management & Telemedicine System',
      projectId: 'PRJ-102',
      dueDate: '2026-05-08',
      daysLeft: 28,
      type: 'Milestone',
      priority: 'Medium',
      status: 'Under Review'
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Welcome & Role Context Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-blue-200 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Academic Project Supervision Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name} 👋
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
              {currentUser?.role === 'admin' && 'You have global oversight across all department projects, guide assignments, and milestone completion audits.'}
              {currentUser?.role === 'guide' && 'You are currently supervising 3 active capstone projects. 1 milestone submission is pending your review and sign-off.'}
              {currentUser?.role === 'leader' && 'Your team "Alpha Innovations" is 78% completed on PRJ-101. Sprint 4 task submissions are scheduled for this week.'}
              {currentUser?.role === 'student' && 'You have 2 assigned tasks in progress for PRJ-101. Camera pose landmark benchmarking is due in 5 days.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('projects')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <FolderKanban className="w-4 h-4 text-blue-600" />
              <span>Browse All Projects</span>
            </button>
            <button
              onClick={() => navigateTo('reports')}
              className="px-4 py-2.5 rounded-xl bg-blue-700/80 hover:bg-blue-700 text-white font-semibold text-xs border border-blue-500/50 transition-all flex items-center gap-2"
            >
              <span>Generate Audit Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          subtitle="Across 3 Depts"
          icon={FolderKanban}
          color="blue"
          trend="+2 New"
          onClick={() => navigateTo('projects')}
        />
        <StatCard
          title="Active Projects"
          value={activeProjects}
          subtitle="In Progress / Review"
          icon={Clock}
          color="indigo"
          trend="83% Active"
          onClick={() => navigateTo('projects')}
        />
        <StatCard
          title="Completed"
          value={completedProjects}
          subtitle="Viva Passed"
          icon={CheckCircle2}
          color="emerald"
          trend="100% Viva"
          onClick={() => navigateTo('projects')}
        />
        <StatCard
          title="Delayed"
          value={delayedProjects}
          subtitle="Action Required"
          icon={AlertTriangle}
          color="rose"
          badge="Alert"
          trendType="down"
          trend="1 Behind"
          onClick={() => navigateTo('progress')}
        />
        <StatCard
          title="Avg Progress"
          value={`${avgProgress}%`}
          subtitle="Schedule On-Track"
          icon={TrendingUp}
          color="purple"
          trend="+8% this wk"
          onClick={() => navigateTo('progress')}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          subtitle="In Kanban Board"
          icon={CheckSquare}
          color="amber"
          trend="12 in review"
          onClick={() => navigateTo('tasks')}
        />
      </div>

      {/* Core Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Progress Planned vs Actual (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Semester Project Progress (Planned vs. Actual)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison of scheduled milestones vs verified delivery percentages
              </p>
            </div>
            <button
              onClick={() => navigateTo('progress')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Details
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <MonthlyProgressChart />

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[10px] text-slate-500 block">Schedule Index</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">0.96 (Good)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[10px] text-slate-500 block">Next Milestone</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">April 15</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[10px] text-slate-500 block">Final Viva</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">May 28</span>
            </div>
          </div>
        </div>

        {/* Status Distribution Donut (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Project Status Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current health & phase breakdown
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {totalProjects} Projects
            </span>
          </div>

          <ProjectStatusDonut projects={projects} />

          <div className="pt-2 text-center text-xs text-slate-400">
            Hover segments to inspect project counts
          </div>
        </div>
      </div>

      {/* Two Column Grid: Upcoming Deadlines & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Deadlines (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Upcoming Deadlines & Milestones
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Critical due dates across active teams</p>
            </div>
            <button
              onClick={() => navigateTo('calendar')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Full Calendar
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {upcomingDeadlines.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateTo(item.type === 'Task' ? 'tasks' : 'project-detail', item.projectId)}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-colors cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.type}
                    </span>
                    <PriorityBadge priority={item.priority} />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {item.projectName}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {item.dueDate}
                    </p>
                    <p className={`text-[10px] font-bold ${
                      item.daysLeft <= 3 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {item.daysLeft} days remaining
                    </p>
                  </div>
                  <StatusBadge status={item.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Log (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ActivityIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Live Activity Stream
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time actions by guides & students</p>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {activities.slice(0, 6).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <img
                  src={act.avatar}
                  alt={act.user}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 flex-shrink-0 mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-slate-800 dark:text-slate-200 leading-snug">
                    <span className="font-bold text-slate-900 dark:text-white">{act.user}</span>{' '}
                    <span className="text-slate-600 dark:text-slate-400">{act.action}</span>{' '}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{act.target}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                    <span>{act.time}</span>
                    <span>•</span>
                    <span className="font-mono">{act.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Task Velocity & Team Performance Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Task Completion by Technical Domain
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Velocity distribution across project workstreams</p>
            </div>
            <button
              onClick={() => navigateTo('tasks')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open Kanban →
            </button>
          </div>
          <TaskVelocityChart tasks={tasks} />
        </div>

        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Team Performance Index
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Student task velocity and guide evaluation scores</p>
            </div>
            <button
              onClick={() => navigateTo('team')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Roster →
            </button>
          </div>
          <TeamPerformanceList members={projects[0]?.members || []} />
        </div>
      </div>
    </div>
  );
};
