import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Calendar,
  User,
  Clock,
  MessageSquare,
  MoreVertical,
  Edit2,
  Trash2,
  AlertCircle,
  Tag,
  FolderKanban,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

export const TasksPage = () => {
  const {
    currentUser,
    tasks,
    projects,
    users,
    addTask,
    updateTask,
    deleteTask,
    moveTaskStatus,
    selectedProjectId,
    setSelectedProjectId
  } = useApp();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [projectFilter, setProjectFilter] = useState(selectedProjectId || 'all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  // Drag and Drop state
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: selectedProjectId || 'PRJ-101',
    priority: 'High',
    status: 'todo',
    dueDate: '2026-04-20',
    assignedToId: 'usr_student',
    estimatedHours: 20,
    tags: 'AI/ML, React Native'
  });

  // Filter Tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesProj = projectFilter === 'all' || t.projectId === projectFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesAssignee = assigneeFilter === 'all' || t.assignedTo?.id === assigneeFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.assignedTo?.name && t.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesProj && matchesPriority && matchesAssignee && matchesSearch;
  });

  // Kanban Columns Definition
  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40', badgeColor: 'bg-slate-200 text-slate-700' },
    { id: 'in_progress', title: 'In Progress', color: 'border-blue-300 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20', badgeColor: 'bg-blue-100 text-blue-800' },
    { id: 'review', title: 'Under Review', color: 'border-amber-300 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20', badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'completed', title: 'Completed', color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20', badgeColor: 'bg-emerald-100 text-emerald-800' }
  ];

  // Drag and drop handlers
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      moveTaskStatus(taskId, columnId);
      setDraggedTaskId(null);
    }
  };

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      description: '',
      projectId: projectFilter !== 'all' ? projectFilter : 'PRJ-101',
      priority: 'High',
      status: 'todo',
      dueDate: '2026-04-20',
      assignedToId: 'usr_student',
      estimatedHours: 24,
      tags: 'Frontend, UI/UX'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (task, e) => {
    if (e) e.stopPropagation();
    setActiveTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      projectId: task.projectId,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      assignedToId: task.assignedTo?.id || 'usr_student',
      estimatedHours: task.estimatedHours || 20,
      progress: task.progress || 0,
      tags: (task.tags || []).join(', ')
    });
    setShowEditModal(true);
  };

  const handleOpenDetail = (task) => {
    setActiveTask(task);
    setShowTaskDetailModal(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const assignedUser = users.find((u) => u.id === formData.assignedToId) || users[3];
    const tagsArr = formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : ['Task'];

    addTask({
      title: formData.title,
      description: formData.description,
      projectId: formData.projectId,
      priority: formData.priority,
      dueDate: formData.dueDate,
      estimatedHours: Number(formData.estimatedHours) || 20,
      tags: tagsArr,
      assignedTo: {
        id: assignedUser.id,
        name: assignedUser.name,
        avatar: assignedUser.avatar,
        studentId: assignedUser.studentId || 'STU-2024'
      }
    });

    setShowAddModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const assignedUser = users.find((u) => u.id === formData.assignedToId) || users[3];
    const tagsArr = formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : ['Task'];

    updateTask(activeTask.id, {
      title: formData.title,
      description: formData.description,
      projectId: formData.projectId,
      priority: formData.priority,
      status: formData.status,
      progress: Number(formData.progress),
      dueDate: formData.dueDate,
      estimatedHours: Number(formData.estimatedHours) || 20,
      tags: tagsArr,
      assignedTo: {
        id: assignedUser.id,
        name: assignedUser.name,
        avatar: assignedUser.avatar,
        studentId: assignedUser.studentId || 'STU-2024'
      }
    });

    setShowEditModal(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Sprint Task Management & Kanban
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Drag cards between status columns to update execution state and project progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban Board"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List Table"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, IDs, or members..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Project Filter */}
          <div className="lg:col-span-3">
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none truncate"
            >
              <option value="all">All Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id}: {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="lg:col-span-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Assignee Filter */}
          <div className="lg:col-span-3">
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none truncate"
            >
              <option value="all">All Assignees</option>
              {users.filter((u) => u.role === 'student' || u.role === 'leader').map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`rounded-3xl border ${col.color} p-4 flex flex-col min-h-[500px] transition-colors`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      {col.title}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                      {colTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={handleOpenAdd}
                    className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Task Cards Column */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {colTasks.length === 0 ? (
                    <div className="h-36 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-4 text-slate-400 text-xs">
                      <span>Drag tasks here</span>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onClick={() => handleOpenDetail(task)}
                        className="group bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all cursor-grab active:cursor-grabbing relative"
                      >
                        {/* Task Card Header */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold text-slate-400">
                              {task.id}
                            </span>
                            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                              {task.projectId}
                            </span>
                          </div>
                          <PriorityBadge priority={task.priority} />
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>

                        {/* Tags */}
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Progress */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                            <span>Progress</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                              {task.progress || 0}%
                            </span>
                          </div>
                          <ProgressBar progress={task.progress || 0} size="sm" color="auto" />
                        </div>

                        {/* Footer: Assignee, Comments & Actions */}
                        <div className="mt-3 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 min-w-0" title={task.assignedTo?.name}>
                            <img
                              src={task.assignedTo?.avatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"}
                              alt=""
                              className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                            />
                            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-[90px]">
                              {task.assignedTo?.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-slate-400 text-[10px]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{task.dueDate}</span>
                            </div>

                            <button
                              onClick={(e) => handleOpenEdit(task, e)}
                              className="p-1 hover:text-blue-600 transition-colors"
                              title="Edit Task"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id);
                              }}
                              className="p-1 hover:text-rose-600 transition-colors"
                              title="Delete Task"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Task & Project</th>
                  <th className="py-3.5 px-4">Assignee</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4">Progress</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => handleOpenDetail(task)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-400">{task.id}</span>
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {task.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                        {task.projectId}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <img src={task.assignedTo?.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {task.assignedTo?.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <PriorityBadge priority={task.priority} />
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={task.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400">
                      {task.dueDate}
                    </td>

                    <td className="py-3.5 px-4 min-w-[120px]">
                      <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                        <span>{task.progress || 0}%</span>
                      </div>
                      <ProgressBar progress={task.progress || 0} color="auto" size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => handleOpenEdit(task, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task.id);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Task Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {showAddModal ? 'Create New Sprint Task' : `Edit Task: ${activeTask?.id}`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign tasks to student developers and set delivery deadlines.
              </p>
            </div>

            <form
              onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit}
              className="p-6 overflow-y-auto space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Implement MediaPipe landmark tracking bridge"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Project & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Associated Project
                  </label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.id} - {p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Assignee & Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Assignee
                  </label>
                  <select
                    value={formData.assignedToId}
                    onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {users.filter((u) => u.role === 'student' || u.role === 'leader').map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.studentId || u.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Edit Specific: Status & Progress */}
              {showEditModal && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Task Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Under Review</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Progress ({formData.progress || 0}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress || 0}
                      onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Tags & Description */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. AI/ML, PyTorch, Biomechanics"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Task Instructions
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide technical specifications and expected deliverable criteria..."
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  {showAddModal ? 'Create Task' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {showTaskDetailModal && activeTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">{activeTask.id}</span>
                <PriorityBadge priority={activeTask.priority} />
                <StatusBadge status={activeTask.status} size="sm" />
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{activeTask.projectId}</span>
            </div>

            <h3 className="text-base font-bold">{activeTask.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              {activeTask.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-400 block">Assigned Developer</span>
                <span className="font-bold">{activeTask.assignedTo?.name}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-400 block">Due Date</span>
                <span className="font-bold">{activeTask.dueDate}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span>Task Completion Progress</span>
                <span>{activeTask.progress || 0}%</span>
              </div>
              <ProgressBar progress={activeTask.progress || 0} color="auto" size="md" />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowTaskDetailModal(false);
                  handleOpenEdit(activeTask);
                }}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Edit Task Details
              </button>
              <button
                onClick={() => setShowTaskDetailModal(false)}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
