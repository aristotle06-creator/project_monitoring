import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Plus,
  Search,
  UserCheck,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Award,
  BookOpen,
  Edit2,
  Trash2,
  CheckSquare,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { RoleBadge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

export const TeamPage = () => {
  const {
    currentUser,
    users,
    tasks,
    projects,
    addUser,
    updateUser,
    deleteUser,
    navigateTo
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    studentId: '',
    title: 'Frontend & ML Engineer',
    department: 'Computer Science & Engineering',
    semester: 'Semester 8',
    phone: '+1 (555) 000-0000'
  });

  const studentsAndLeads = users.filter(
    (u) => u.role === 'student' || u.role === 'leader' || u.role === 'guide'
  );

  const filteredUsers = studentsAndLeads.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.studentId && u.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.title && u.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRole && matchesSearch;
  });

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    addUser({
      ...formData,
      studentId: formData.studentId || `STU-2024-${Math.floor(100 + Math.random() * 900)}`
    });

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Team & Student Roster Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track individual student task assignments, project velocity, and academic performance indices.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              role: 'student',
              studentId: '',
              title: 'Full-Stack Developer',
              department: 'Computer Science & Engineering',
              semester: 'Semester 8',
              phone: '+1 (555) 000-0000'
            });
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, ID, or role..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="leader">Team Leaders</option>
            <option value="student">Student Developers</option>
            <option value="guide">Project Guides</option>
          </select>
        </div>
      </div>

      {/* Members Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUsers.map((member) => {
          const userTasks = tasks.filter((t) => t.assignedTo?.id === member.id);
          const completedTasks = userTasks.filter((t) => t.status === 'completed').length;
          const progressRate = userTasks.length > 0 ? Math.round((completedTasks / userTasks.length) * 100) : 85;

          return (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-800 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Header: Avatar, Name, Role */}
                <div className="flex items-start gap-3.5 mb-4">
                  <img
                    src={member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <RoleBadge role={member.role} />
                      {member.studentId && (
                        <span className="font-mono text-[10px] text-slate-400 font-bold">
                          {member.studentId}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{member.department}</span>
                  </div>
                </div>
              </div>

              {/* Task Metrics & Score Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Assigned</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                      {userTasks.length || 7}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Done</span>
                    <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {completedTasks || 6}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Score</span>
                    <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                      {member.score || 92}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-semibold">
                    <span>Task Execution Rate</span>
                    <span className="text-slate-800 dark:text-slate-200">{progressRate}%</span>
                  </div>
                  <ProgressBar progress={progressRate} size="sm" color="auto" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <h3 className="text-lg font-bold">Register New Team Member</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Add student or faculty guide to academic project groups.
            </p>

            <form onSubmit={handleAddMemberSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="j.hayes@univ.edu"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student / Faculty ID
                  </label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="STU-2024-199"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role in Project
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="student">Student Developer</option>
                    <option value="leader">Team Leader</option>
                    <option value="guide">Project Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Specialization / Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Backend API Engineer"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Profile Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedMember.avatar}
                alt=""
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <RoleBadge role={selectedMember.role} />
                <h3 className="text-lg font-bold mt-1">{selectedMember.name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {selectedMember.title}
                </p>
              </div>
            </div>

            <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Student / ID:</span>
                <span className="font-mono font-bold">{selectedMember.studentId || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Department:</span>
                <span className="font-semibold">{selectedMember.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-semibold">{selectedMember.email}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
