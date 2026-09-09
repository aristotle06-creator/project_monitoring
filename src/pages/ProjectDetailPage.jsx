import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  User,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderKanban,
  FileText,
  CheckSquare,
  MessageSquare,
  Award,
  Sparkles,
  ChevronRight,
  Send,
  Download,
  Plus,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

export const ProjectDetailPage = () => {
  const {
    currentUser,
    selectedProjectId,
    projects,
    milestones,
    tasks,
    documents,
    feedback,
    approveMilestone,
    rejectMilestone,
    submitMilestoneForReview,
    addFeedback,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'milestones' | 'tasks' | 'documents' | 'feedback'
  const [selectedMilestoneForAction, setSelectedMilestoneForAction] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approve' | 'reject'
  const [guideNotes, setGuideNotes] = useState('');
  const [milestoneScore, setMilestoneScore] = useState('95/100');

  // Quick feedback input
  const [newFeedbackText, setNewFeedbackText] = useState('');

  const project = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const projectMilestones = milestones.filter((m) => m.projectId === project?.id);
  const projectTasks = tasks.filter((t) => t.projectId === project?.id);
  const projectDocuments = documents.filter((d) => d.projectId === project?.id);
  const projectFeedback = feedback.filter((f) => f.projectId === project?.id);

  if (!project) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Project Not Found</p>
        <button
          onClick={() => navigateTo('projects')}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Projects
        </button>
      </div>
    );
  }

  // Handle Guide Review Actions
  const handleApproveSubmit = (e) => {
    e.preventDefault();
    if (selectedMilestoneForAction) {
      approveMilestone(selectedMilestoneForAction.id, guideNotes, milestoneScore);
      setSelectedMilestoneForAction(null);
      setActionType(null);
      setGuideNotes('');
    }
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (selectedMilestoneForAction) {
      rejectMilestone(selectedMilestoneForAction.id, guideNotes);
      setSelectedMilestoneForAction(null);
      setActionType(null);
      setGuideNotes('');
    }
  };

  const handleAddFeedbackComment = (e) => {
    e.preventDefault();
    if (!newFeedbackText.trim()) return;

    addFeedback({
      projectId: project.id,
      targetType: 'project',
      targetTitle: project.title,
      content: newFeedbackText.trim()
    });
    setNewFeedbackText('');
  };

  // 7 Phases List
  const phases = project.phases || [
    { id: 1, name: "Project Proposal", status: "completed", startDate: "2026-01-10", endDate: "2026-01-25" },
    { id: 2, name: "Requirement Analysis (SRS)", status: "completed", startDate: "2026-01-26", endDate: "2026-02-15" },
    { id: 3, name: "System Design (SDD)", status: "completed", startDate: "2026-02-16", endDate: "2026-03-10" },
    { id: 4, name: "Development & Integration", status: "in_progress", startDate: "2026-03-11", endDate: "2026-04-20" },
    { id: 5, name: "Testing & Quality Assurance", status: "pending", startDate: "2026-04-21", endDate: "2026-05-05" },
    { id: 6, name: "Documentation & Thesis", status: "pending", startDate: "2026-05-06", endDate: "2026-05-20" },
    { id: 7, name: "Final Presentation & Viva", status: "pending", startDate: "2026-05-21", endDate: "2026-05-30" }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('projects')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('tasks', project.id)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open Tasks</span>
          </button>
          <button
            onClick={() => navigateTo('reports', project.id)}
            className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                {project.id}
              </span>
              <span className="text-xs font-semibold text-slate-500">{project.category}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-500">{project.department}</span>
              <StatusBadge status={project.status} size="md" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Right: Progress Meter */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex-shrink-0 min-w-[200px] text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Progress</span>
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400 my-1 font-mono">
              {project.progress}%
            </div>
            <div className="w-full">
              <ProgressBar progress={project.progress} color="auto" size="md" />
            </div>
            <span className="text-[11px] text-slate-400 mt-2 font-medium">
              Phase {project.phaseIndex || 4} of 7 Active
            </span>
          </div>
        </div>

        {/* Metadata Details Roster */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Supervising Guide</span>
            <div className="flex items-center gap-2 mt-1">
              <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">{project.guideName}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Team Group</span>
            <div className="flex items-center gap-2 mt-1">
              <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">{project.teamName}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Start Date</span>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">{project.startDate}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Expected Viva / Finish</span>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">{project.endDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Phase Visual Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Project 7-Phase Academic Lifecycle Timeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified phase completion gates conforming to university capstone guidelines
            </p>
          </div>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="relative">
          {/* Track background */}
          <div className="hidden lg:block absolute top-5 left-6 right-6 h-1 bg-slate-200 dark:bg-slate-700 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
            {phases.map((ph, idx) => {
              const isDone = ph.status === 'completed';
              const isInProgress = ph.status === 'in_progress';
              const isDelayed = ph.status === 'delayed';

              return (
                <div
                  key={ph.id}
                  className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                    isDone
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80'
                      : isInProgress
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-md scale-105'
                      : isDelayed
                      ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 opacity-75'
                  }`}
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-transform ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-900 animate-pulse'
                        : isDelayed
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  {/* Phase Info */}
                  <div className="w-full">
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight min-h-[32px] flex items-center justify-center">
                      {ph.name}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-medium uppercase tracking-wider">
                      {isDone ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">Completed</span>
                      ) : isInProgress ? (
                        <span className="text-blue-700 dark:text-blue-400 font-bold">Active Phase</span>
                      ) : isDelayed ? (
                        <span className="text-rose-700 dark:text-rose-400 font-bold">Delayed</span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">
                      {ph.endDate || 'TBD'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'overview', label: 'Milestones & Approvals', icon: Award, count: projectMilestones.length },
          { id: 'tasks', label: 'Work Breakdown & Tasks', icon: CheckSquare, count: projectTasks.length },
          { id: 'documents', label: 'Project Documents', icon: FileText, count: projectDocuments.length },
          { id: 'feedback', label: 'Guide Feedback & Reviews', icon: MessageSquare, count: projectFeedback.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Milestones & Approvals */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Project Milestones & Verification Workflow
            </h3>
            {currentUser?.role === 'guide' && (
              <span className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full font-semibold border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Guide Approval Privileges Active
              </span>
            )}
          </div>

          <div className="space-y-3">
            {projectMilestones.map((m) => (
              <div
                key={m.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-400">{m.id}</span>
                      <StatusBadge status={m.status} size="sm" />
                      <span className="text-xs font-semibold text-slate-500">{m.phase}</span>
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                        Weight: {m.weight || '15%'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {m.title}
                    </h4>

                    {m.guideNotes && (
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">Guide Remarks: </span>
                        <span className="text-slate-600 dark:text-slate-400">{m.guideNotes}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Details & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 self-start md:self-center flex-shrink-0">
                    <div className="text-right text-xs">
                      <p className="text-slate-500">Due: <span className="font-bold text-slate-800 dark:text-slate-200">{m.dueDate}</span></p>
                      <p className="text-slate-500">Score: <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{m.score || '-'}</span></p>
                    </div>

                    {/* Guide Actions */}
                    {currentUser?.role === 'guide' || currentUser?.role === 'admin' ? (
                      <div className="flex items-center gap-2">
                        {m.status !== 'Approved' && (
                          <button
                            onClick={() => {
                              setSelectedMilestoneForAction(m);
                              setActionType('approve');
                              setGuideNotes(m.guideNotes || 'Verified implementation and deliverables conform to specifications.');
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        {m.status !== 'Rejected' && m.status !== 'Approved' && (
                          <button
                            onClick={() => {
                              setSelectedMilestoneForAction(m);
                              setActionType('reject');
                              setGuideNotes('Revisions required in documentation and test results.');
                            }}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Reject / Revise</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Student / Lead Action: Submit */
                      m.status === 'Pending' && (
                        <button
                          onClick={() => submitMilestoneForReview(m.id)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit for Review</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Work Breakdown & Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Linked Sprint Tasks ({projectTasks.length})
            </h3>
            <button
              onClick={() => navigateTo('tasks', project.id)}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1"
            >
              <span>Open Full Kanban Board</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-slate-400">{t.id}</span>
                    <PriorityBadge priority={t.priority} />
                  </div>
                  <StatusBadge status={t.status} size="sm" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                  {t.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{t.description}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={t.assignedTo?.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">
                      {t.assignedTo?.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">Due: {t.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Documents Repository */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Project Deliverables & Artifacts ({projectDocuments.length})
            </h3>
            <button
              onClick={() => navigateTo('documents', project.id)}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1"
            >
              <span>Manage Documents Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {doc.category}
                    </span>
                    <StatusBadge status={doc.status} size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{doc.summary}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{doc.version} • {doc.size}</span>
                  <button
                    onClick={() => navigateTo('documents', project.id)}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                  >
                    View File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Feedback & Reviews */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Supervisory Comments & Team Discussion
          </h3>

          {/* Add Feedback Input Box */}
          <form onSubmit={handleAddFeedbackComment} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              Post Feedback or Milestone Query
            </label>
            <textarea
              rows="2"
              value={newFeedbackText}
              onChange={(e) => setNewFeedbackText(e.target.value)}
              placeholder="Type guide feedback, review comments, or student questions..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Feedback items list */}
          <div className="space-y-3">
            {projectFeedback.map((fb) => (
              <div
                key={fb.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img src={fb.authorAvatar} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {fb.authorName} <span className="font-normal text-slate-500">({fb.authorRole})</span>
                    </p>
                    <span className="text-[10px] text-slate-400">{fb.date}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-11">
                  {fb.content}
                </p>

                {/* Nested replies */}
                {fb.replies && fb.replies.length > 0 && (
                  <div className="ml-11 pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-2.5 pt-2">
                    {fb.replies.map((rep) => (
                      <div key={rep.id} className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{rep.authorName}</span>
                          <span className="text-[10px] text-slate-400">({rep.authorRole}) • {rep.date}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">{rep.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guide Approval / Rejection Modal */}
      {selectedMilestoneForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">
              {actionType === 'approve' ? 'Approve Milestone Deliverable' : 'Request Milestone Revisions'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {selectedMilestoneForAction.title}
            </p>

            <form
              onSubmit={actionType === 'approve' ? handleApproveSubmit : handleRejectSubmit}
              className="mt-4 space-y-3 text-xs"
            >
              {actionType === 'approve' && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Evaluation Score / Marks
                  </label>
                  <input
                    type="text"
                    value={milestoneScore}
                    onChange={(e) => setMilestoneScore(e.target.value)}
                    placeholder="e.g. 95/100"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Supervisor Remarks & Feedback *
                </label>
                <textarea
                  rows="3"
                  required
                  value={guideNotes}
                  onChange={(e) => setGuideNotes(e.target.value)}
                  placeholder="Provide constructive assessment comments for the student team..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMilestoneForAction(null);
                    setActionType(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 text-white font-bold text-xs rounded-xl shadow ${
                    actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {actionType === 'approve' ? 'Confirm Approval' : 'Submit Revision Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
