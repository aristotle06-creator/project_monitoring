import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, FolderKanban, CheckSquare, FileText, Users, Award, X, ArrowRight } from 'lucide-react';
import { StatusBadge, PriorityBadge } from './Badge';

export const GlobalSearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, projects, tasks, documents, users, milestones, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const results = useMemo(() => {
    if (!query.trim()) return { projects: [], tasks: [], documents: [], users: [], milestones: [] };
    const q = query.toLowerCase();

    const matchedProjects = projects.filter(
      (p) => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.department.toLowerCase().includes(q) || p.teamName.toLowerCase().includes(q)
    );

    const matchedTasks = tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || (t.assignedTo && t.assignedTo.name.toLowerCase().includes(q))
    );

    const matchedDocs = documents.filter(
      (d) => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q)
    );

    const matchedUsers = users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.studentId && u.studentId.toLowerCase().includes(q))
    );

    const matchedMilestones = milestones.filter(
      (m) => m.title.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)
    );

    return {
      projects: matchedProjects,
      tasks: matchedTasks,
      documents: matchedDocs,
      users: matchedUsers,
      milestones: matchedMilestones
    };
  }, [query, projects, tasks, documents, users, milestones]);

  if (!isSearchOpen) return null;

  const totalResultsCount =
    results.projects.length +
    results.tasks.length +
    results.documents.length +
    results.users.length +
    results.milestones.length;

  const handleSelectProject = (id) => {
    navigateTo('project-detail', id);
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleSelectTask = (task) => {
    navigateTo('tasks', task.projectId);
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleSelectDoc = (doc) => {
    navigateTo('documents', doc.projectId);
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleSelectUser = () => {
    navigateTo('team');
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tasks, student IDs, documents, milestones... (ESC to close)"
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 text-xs overflow-x-auto">
          {['all', 'projects', 'tasks', 'documents', 'team', 'milestones'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-2.5 py-1 rounded-full capitalize font-medium transition-colors ${
                filterType === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <p className="font-semibold text-slate-600 dark:text-slate-300">Quick Jump & Global Search</p>
              <p className="mt-1">Type keywords like "Pose", "Sports", "SRS", "Alex", "PRJ-101", "Hospital"...</p>
            </div>
          ) : totalResultsCount === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <p className="font-semibold text-slate-600 dark:text-slate-300">No matching items found</p>
              <p className="mt-1">Try another keyword or search category.</p>
            </div>
          ) : (
            <>
              {/* Projects */}
              {(filterType === 'all' || filterType === 'projects') && results.projects.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FolderKanban className="w-3.5 h-3.5 text-blue-600" />
                    Projects ({results.projects.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.projects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProject(p.id)}
                        className="p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-transparent hover:border-blue-200 dark:hover:border-blue-900/50 cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div className="min-w-0 flex-1 mr-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                              {p.id}
                            </span>
                            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">
                              {p.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {p.teamName} • Guide: {p.guideName} • {p.currentPhase}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={p.status} size="sm" />
                          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {(filterType === 'all' || filterType === 'tasks') && results.tasks.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                    Tasks ({results.tasks.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.tasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSelectTask(t)}
                        className="p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-900/50 cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div className="min-w-0 flex-1 mr-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-500 font-bold">{t.id}</span>
                            <span className="font-medium text-xs text-slate-900 dark:text-slate-100 truncate">
                              {t.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            Assigned to: {t.assignedTo?.name || 'Unassigned'} • Due: {t.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <PriorityBadge priority={t.priority} />
                          <StatusBadge status={t.status} size="sm" />
                          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {(filterType === 'all' || filterType === 'documents') && results.documents.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    Documents ({results.documents.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.documents.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => handleSelectDoc(d)}
                        className="p-2.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-transparent hover:border-purple-200 dark:hover:border-purple-900/50 cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div className="min-w-0 flex-1 mr-3">
                          <span className="font-medium text-xs text-slate-900 dark:text-slate-100 truncate block">
                            {d.name}
                          </span>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {d.category} • {d.uploadedBy} • {d.version}
                          </p>
                        </div>
                        <StatusBadge status={d.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {(filterType === 'all' || filterType === 'team') && results.users.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    People & Students ({results.users.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.users.map((u) => (
                      <div
                        key={u.id}
                        onClick={handleSelectUser}
                        className="p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer flex items-center gap-2.5 transition-all"
                      >
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">{u.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{u.title || u.role} {u.studentId ? `• ${u.studentId}` : ''}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border rounded font-mono">Ctrl + K</kbd> anytime to open</span>
          <span>{totalResultsCount} items matching</span>
        </div>
      </div>
    </div>
  );
};
