import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquareText,
  Send,
  Reply,
  FolderKanban,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { RoleBadge } from '../components/common/Badge';

export const FeedbackPage = () => {
  const {
    currentUser,
    feedback,
    projects,
    addFeedback,
    addFeedbackReply
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('all');
  const [newComment, setNewComment] = useState('');
  const [targetTitle, setTargetTitle] = useState('Milestone 4: Core Computer Vision Pose Estimation Engine');
  const [targetType, setTargetType] = useState('milestone');
  const [replyTextMap, setReplyTextMap] = useState({});

  const filteredFeedback = feedback.filter((fb) => {
    const matchesProj = selectedProjectId === 'all' || fb.projectId === selectedProjectId;
    const matchesSearch =
      fb.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.targetTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProj && matchesSearch;
  });

  const handlePostMainComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addFeedback({
      projectId: selectedProjectId !== 'all' ? selectedProjectId : 'PRJ-101',
      targetType,
      targetTitle,
      content: newComment.trim()
    });

    setNewComment('');
  };

  const handlePostReply = (feedbackId) => {
    const replyContent = replyTextMap[feedbackId];
    if (!replyContent || !replyContent.trim()) return;

    addFeedbackReply(feedbackId, replyContent.trim());
    setReplyTextMap({ ...replyTextMap, [feedbackId]: '' });
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Supervisory Feedback & Discussion Threads
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Threaded dialogue between project guides, team leaders, and students on technical blockers, milestones, and thesis revisions.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search feedback discussions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.id} - {p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Post New Feedback Thread Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Start New Feedback Discussion
          </h3>
        </div>

        <form onSubmit={handlePostMainComment} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Topic / Milestone / Task
              </label>
              <input
                type="text"
                value={targetTitle}
                onChange={(e) => setTargetTitle(e.target.value)}
                placeholder="e.g. Milestone 4: Biomechanics keypoint extraction"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Context Type
              </label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="milestone">Milestone Review</option>
                <option value="task">Sprint Task Feedback</option>
                <option value="project">General Project Scope</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Feedback Remarks / Assessment *
            </label>
            <textarea
              rows="3"
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Provide constructive guidance, technical observations, or revision instructions..."
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Feedback Thread</span>
            </button>
          </div>
        </form>
      </div>

      {/* Feedback Feed */}
      <div className="space-y-4">
        {filteredFeedback.map((fb) => (
          <div
            key={fb.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Main Feedback Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <img
                  src={fb.authorAvatar}
                  alt=""
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-blue-500/20 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {fb.authorName}
                    </span>
                    <RoleBadge role={fb.authorRole === 'Project Guide' ? 'guide' : 'leader'} />
                  </div>
                  <span className="text-[11px] text-slate-400">{fb.date}</span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-md">
                {fb.projectId}
              </span>
            </div>

            {/* Target Label */}
            <div className="text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
              Topic: <span className="text-slate-900 dark:text-slate-200">{fb.targetTitle}</span>
            </div>

            {/* Content */}
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-1">
              {fb.content}
            </p>

            {/* Nested Replies */}
            {fb.replies && fb.replies.length > 0 && (
              <div className="ml-4 sm:ml-8 pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-3 pt-2">
                {fb.replies.map((rep) => (
                  <div key={rep.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rep.authorAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-bold text-slate-900 dark:text-white">{rep.authorName}</span>
                        <span className="text-[10px] text-slate-400">({rep.authorRole})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rep.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 pl-7">{rep.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={replyTextMap[fb.id] || ''}
                onChange={(e) => setReplyTextMap({ ...replyTextMap, [fb.id]: e.target.value })}
                placeholder="Reply to this thread..."
                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handlePostReply(fb.id)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1 flex-shrink-0"
              >
                <Reply className="w-3.5 h-3.5" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
