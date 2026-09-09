import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEMO_USERS,
  INITIAL_PROJECTS,
  INITIAL_MILESTONES,
  INITIAL_TASKS,
  INITIAL_DOCUMENTS,
  INITIAL_FEEDBACK,
  INITIAL_NOTIFICATIONS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_ACTIVITIES
} from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEYS = {
  USER: 'pm_current_user',
  USERS: 'pm_users_data',
  PROJECTS: 'pm_projects_data',
  MILESTONES: 'pm_milestones_data',
  TASKS: 'pm_tasks_data',
  DOCUMENTS: 'pm_documents_data',
  FEEDBACK: 'pm_feedback_data',
  NOTIFICATIONS: 'pm_notifications_data',
  CALENDAR: 'pm_calendar_data',
  ACTIVITIES: 'pm_activities_data',
  THEME: 'pm_theme_dark'
};

export const AppProvider = ({ children }) => {
  // Load helper from localStorage or fallback
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(`Error loading state for ${key}`, e);
    }
    return fallback;
  };

  const [currentUser, setCurrentUser] = useState(() => loadState(STORAGE_KEYS.USER, DEMO_USERS[0]));
  const [users, setUsers] = useState(() => loadState(STORAGE_KEYS.USERS, DEMO_USERS));
  const [projects, setProjects] = useState(() => loadState(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS));
  const [milestones, setMilestones] = useState(() => loadState(STORAGE_KEYS.MILESTONES, INITIAL_MILESTONES));
  const [tasks, setTasks] = useState(() => loadState(STORAGE_KEYS.TASKS, INITIAL_TASKS));
  const [documents, setDocuments] = useState(() => loadState(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS));
  const [feedback, setFeedback] = useState(() => loadState(STORAGE_KEYS.FEEDBACK, INITIAL_FEEDBACK));
  const [notifications, setNotifications] = useState(() => loadState(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS));
  const [calendarEvents, setCalendarEvents] = useState(() => loadState(STORAGE_KEYS.CALENDAR, INITIAL_CALENDAR_EVENTS));
  const [activities, setActivities] = useState(() => loadState(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES));
  const [darkMode, setDarkMode] = useState(() => loadState(STORAGE_KEYS.THEME, false));

  // Navigation State
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-101');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      else localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks)); } catch (e) {}
  }, [tasks]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestones)); } catch (e) {}
  }, [milestones]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents)); } catch (e) {}
  }, [documents]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedback)); } catch (e) {}
  }, [feedback]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications)); } catch (e) {}
  }, [notifications]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendarEvents)); } catch (e) {}
  }, [calendarEvents]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities)); } catch (e) {}
  }, [activities]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); } catch (e) {}
  }, [users]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(darkMode)); } catch (e) {}
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcut for Spotlight Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast Notification Manager
  const addToast = (title, message, type = 'info') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation helper
  const navigateTo = (page, projectId = null) => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Switch / Login Role
  const loginAs = (role) => {
    const matchedUser = users.find((u) => u.role === role) || DEMO_USERS.find((u) => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      addToast('Role Switched', `Logged in as ${matchedUser.name} (${matchedUser.role.toUpperCase()})`, 'info');
    }
  };

  const loginWithCredentials = (email, password) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      addToast('Welcome back', `Signed in as ${user.name}`, 'success');
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Use demo accounts or sample email.' };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    addToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const resetToDemoData = () => {
    setUsers(DEMO_USERS);
    setCurrentUser(DEMO_USERS[0]);
    setProjects(INITIAL_PROJECTS);
    setMilestones(INITIAL_MILESTONES);
    setTasks(INITIAL_TASKS);
    setDocuments(INITIAL_DOCUMENTS);
    setFeedback(INITIAL_FEEDBACK);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setActivities(INITIAL_ACTIVITIES);
    addToast('Reset Complete', 'Application data restored to realistic demo state.', 'success');
  };

  // Activity logger helper
  const logActivity = (action, target, project = 'PRJ-101', badge = 'Update', badgeColor = 'blue') => {
    if (!currentUser) return;
    const newAct = {
      id: 'ACT-' + Date.now(),
      user: currentUser.name,
      role: currentUser.role === 'leader' ? 'Team Leader' : currentUser.role === 'guide' ? 'Project Guide' : currentUser.role === 'admin' ? 'Admin' : 'Student',
      avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      action,
      target,
      project,
      time: 'Just now',
      badge,
      badgeColor
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  // ==================== PROJECT ACTIONS ====================
  const addProject = (projectData) => {
    const newId = `PRJ-${100 + projects.length + 1}`;
    const newProject = {
      id: newId,
      code: `CSE-2026-${String(projects.length + 1).padStart(2, '0')}`,
      status: 'Planning',
      progress: 0,
      phaseIndex: 1,
      currentPhase: 'Project Proposal',
      membersCount: projectData.members ? projectData.members.length : 1,
      phases: [
        { id: 1, name: "Project Proposal", status: "in_progress", startDate: projectData.startDate || "2026-03-01", endDate: "2026-03-15", completedDate: null },
        { id: 2, name: "Requirement Analysis (SRS)", status: "pending", startDate: "2026-03-16", endDate: "2026-04-05", completedDate: null },
        { id: 3, name: "System Design (SDD)", status: "pending", startDate: "2026-04-06", endDate: "2026-04-25", completedDate: null },
        { id: 4, name: "Development & Integration", status: "pending", startDate: "2026-04-26", endDate: "2026-05-15", completedDate: null },
        { id: 5, name: "Testing & Quality Assurance", status: "pending", startDate: "2026-05-16", endDate: "2026-05-25", completedDate: null },
        { id: 6, name: "Documentation & Thesis", status: "pending", startDate: "2026-05-26", endDate: "2026-06-05", completedDate: null },
        { id: 7, name: "Final Presentation & Viva", status: "pending", startDate: "2026-06-06", endDate: "2026-06-15", completedDate: null }
      ],
      ...projectData
    };
    setProjects((prev) => [newProject, ...prev]);
    logActivity('created new project', newProject.title, newProject.id, 'New Project', 'indigo');
    addToast('Project Created', `Project "${newProject.title}" was successfully initialized.`, 'success');
    return newProject;
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    logActivity('updated project details for', id, id, 'Project Edit', 'blue');
    addToast('Project Updated', `Project details saved.`, 'info');
  };

  const deleteProject = (id) => {
    const projectToDelete = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    logActivity('deleted project', projectToDelete?.title || id, id, 'Delete', 'rose');
    addToast('Project Deleted', `Project ${id} removed.`, 'warning');
  };

  const recalculateProjectProgress = (projectId) => {
    const projTasks = tasks.filter((t) => t.projectId === projectId);
    if (projTasks.length === 0) return;
    const completedTasks = projTasks.filter((t) => t.status === 'completed').length;
    const calculated = Math.round((completedTasks / projTasks.length) * 100);
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, progress: calculated } : p))
    );
  };

  // ==================== MILESTONE ACTIONS ====================
  const addMilestone = (milestoneData) => {
    const newId = `MLS-${String(milestones.length + 1).padStart(2, '0')}`;
    const newMls = {
      id: newId,
      status: 'Pending',
      progress: 0,
      submittedDate: null,
      score: '-',
      weight: '15%',
      ...milestoneData
    };
    setMilestones((prev) => [...prev, newMls]);
    logActivity('created new milestone', newMls.title, newMls.projectId, 'Milestone', 'emerald');
    addToast('Milestone Added', newMls.title, 'success');
  };

  const approveMilestone = (id, notes = '', score = '95/100') => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          logActivity('approved milestone', m.title, m.projectId, 'Approved', 'emerald');
          return {
            ...m,
            status: 'Approved',
            progress: 100,
            guideNotes: notes || m.guideNotes,
            score: score || '95/100'
          };
        }
        return m;
      })
    );
    // Add positive notification for team
    const milestone = milestones.find((m) => m.id === id);
    if (milestone) {
      setNotifications((prev) => [
        {
          id: 'NOTIF-' + Date.now(),
          title: 'Milestone Approved! 🎉',
          message: `${milestone.title} was approved by ${currentUser?.name || 'Guide'} (Score: ${score}).`,
          type: 'approval',
          timestamp: 'Just now',
          read: false,
          link: `/projects/${milestone.projectId}`,
          projectId: milestone.projectId
        },
        ...prev
      ]);
    }
    addToast('Milestone Approved', 'Status set to Approved and notification sent to team.', 'success');
  };

  const rejectMilestone = (id, notes = 'Revisions requested by project supervisor.') => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          logActivity('requested revisions on', m.title, m.projectId, 'Revision', 'rose');
          return {
            ...m,
            status: 'Rejected',
            guideNotes: notes
          };
        }
        return m;
      })
    );
    const milestone = milestones.find((m) => m.id === id);
    if (milestone) {
      setNotifications((prev) => [
        {
          id: 'NOTIF-' + Date.now(),
          title: 'Milestone Revision Requested',
          message: `${milestone.title} requires updates: "${notes}"`,
          type: 'warning',
          timestamp: 'Just now',
          read: false,
          link: `/projects/${milestone.projectId}`,
          projectId: milestone.projectId
        },
        ...prev
      ]);
    }
    addToast('Revision Requested', 'Milestone marked for student revision.', 'warning');
  };

  const submitMilestoneForReview = (id) => {
    const today = new Date().toISOString().split('T')[0];
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: 'Under Review', submittedDate: today }
          : m
      )
    );
    const milestone = milestones.find((m) => m.id === id);
    if (milestone) {
      logActivity('submitted milestone for evaluation', milestone.title, milestone.projectId, 'Submitted', 'blue');
      addToast('Submitted for Review', `${milestone.title} is now under guide review.`, 'info');
    }
  };

  // ==================== TASK ACTIONS (KANBAN) ====================
  const addTask = (taskData) => {
    const newId = `TSK-${tasks.length + 201}`;
    const newTask = {
      id: newId,
      status: 'todo',
      progress: 0,
      commentsCount: 0,
      tags: taskData.tags || ['Task'],
      ...taskData
    };
    setTasks((prev) => [newTask, ...prev]);
    logActivity('created task', newTask.title, newTask.projectId, 'Task Created', 'blue');
    addToast('Task Created', newTask.title, 'success');
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updatedFields };
          // If progress was updated to 100%, mark as completed
          if (updatedFields.progress === 100 && t.status !== 'completed') {
            updated.status = 'completed';
          }
          return updated;
        }
        return t;
      })
    );
    addToast('Task Saved', 'Task information updated.', 'info');
  };

  const deleteTask = (id) => {
    const t = tasks.find((item) => item.id === id);
    setTasks((prev) => prev.filter((item) => item.id !== id));
    logActivity('deleted task', t?.title || id, t?.projectId, 'Task Deleted', 'rose');
    addToast('Task Deleted', `Task ${id} removed.`, 'warning');
  };

  const moveTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          let progress = t.progress;
          if (newStatus === 'completed') progress = 100;
          if (newStatus === 'todo' && progress === 100) progress = 0;
          logActivity(`moved task to ${newStatus.replace('_', ' ')}`, t.title, t.projectId, 'Kanban', 'amber');
          return { ...t, status: newStatus, progress };
        }
        return t;
      })
    );
  };

  // ==================== DOCUMENT ACTIONS ====================
  const uploadDocument = (docData) => {
    const newId = `DOC-${documents.length + 301}`;
    const today = new Date().toISOString().split('T')[0];
    const newDoc = {
      id: newId,
      uploadedDate: today,
      version: 'v1.0',
      status: 'Under Review',
      downloadsCount: 0,
      size: '3.2 MB',
      uploadedBy: currentUser?.name || 'Student',
      ...docData
    };
    setDocuments((prev) => [newDoc, ...prev]);
    logActivity('uploaded project document', newDoc.name, newDoc.projectId, 'Document', 'emerald');
    addToast('Document Uploaded', `${newDoc.name} is ready for review.`, 'success');
  };

  const deleteDocument = (id) => {
    const d = documents.find((doc) => doc.id === id);
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    logActivity('removed document', d?.name || id, d?.projectId, 'Doc Delete', 'rose');
    addToast('Document Deleted', 'File removed from repository.', 'warning');
  };

  const updateDocumentStatus = (id, newStatus) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    addToast('Document Status Updated', `Status set to ${newStatus}`, 'info');
  };

  // ==================== FEEDBACK & COMMENTS ====================
  const addFeedback = (feedbackData) => {
    const newId = `FB-${Date.now()}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newFb = {
      id: newId,
      authorId: currentUser?.id || 'usr_guide',
      authorName: currentUser?.name || 'Prof. Sarah Jenkins',
      authorRole: currentUser?.role === 'guide' ? 'Project Guide' : currentUser?.role === 'leader' ? 'Team Leader' : currentUser?.role === 'admin' ? 'Admin' : 'Student',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      date: formattedDate,
      replies: [],
      ...feedbackData
    };
    setFeedback((prev) => [newFb, ...prev]);
    logActivity('posted feedback comment on', newFb.targetTitle, newFb.projectId, 'Feedback', 'purple');
    addToast('Feedback Posted', 'Your message has been sent to the team.', 'success');
  };

  const addFeedbackReply = (feedbackId, replyContent) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const replyObj = {
      id: `RPL-${Date.now()}`,
      authorId: currentUser?.id || 'usr_lead',
      authorName: currentUser?.name || 'Alex Rivera',
      authorRole: currentUser?.role === 'leader' ? 'Team Leader' : currentUser?.role === 'guide' ? 'Project Guide' : currentUser?.role === 'admin' ? 'Admin' : 'Student',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      date: formattedDate,
      content: replyContent
    };

    setFeedback((prev) =>
      prev.map((fb) =>
        fb.id === feedbackId
          ? { ...fb, replies: [...(fb.replies || []), replyObj] }
          : fb
      )
    );
    addToast('Reply Sent', 'Your reply has been posted.', 'info');
  };

  // ==================== NOTIFICATIONS ====================
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All Read', 'Marked all notifications as read.', 'info');
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ==================== CALENDAR ====================
  const addCalendarEvent = (eventData) => {
    const newId = `EVT-${Date.now()}`;
    const newEvt = {
      id: newId,
      color: 'blue',
      ...eventData
    };
    setCalendarEvents((prev) => [...prev, newEvt]);
    logActivity('scheduled calendar event', newEvt.title, newEvt.projectId || 'PRJ-101', 'Calendar', 'blue');
    addToast('Event Scheduled', newEvt.title, 'success');
  };

  const deleteCalendarEvent = (id) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    addToast('Event Removed', 'Event deleted from calendar.', 'info');
  };

  // ==================== ADMIN & USERS ====================
  const addUser = (userData) => {
    const newId = `usr_${Date.now()}`;
    const newUser = {
      id: newId,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: new Date().toISOString().split('T')[0],
      ...userData
    };
    setUsers((prev) => [...prev, newUser]);
    logActivity('added new user', newUser.name, 'PRJ-101', 'User Admin', 'indigo');
    addToast('User Added', `${newUser.name} registered as ${newUser.role}.`, 'success');
  };

  const updateUser = (id, updatedFields) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedFields } : u))
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) => ({ ...prev, ...updatedFields }));
    }
    addToast('User Updated', 'Account details saved.', 'info');
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'active' ? 'inactive' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    addToast('Account Status Changed', 'User account status toggled.', 'info');
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addToast('User Removed', 'User record deleted from directory.', 'warning');
  };

  return (
    <AppContext.Provider
      value={{
        // State
        currentUser,
        users,
        projects,
        milestones,
        tasks,
        documents,
        feedback,
        notifications,
        calendarEvents,
        activities,
        darkMode,
        currentPage,
        selectedProjectId,
        isSearchOpen,
        toasts,

        // Setters & Nav
        setCurrentUser,
        setCurrentPage,
        setSelectedProjectId,
        setIsSearchOpen,
        navigateTo,
        loginAs,
        loginWithCredentials,
        logout,
        toggleDarkMode,
        resetToDemoData,
        addToast,
        removeToast,

        // Project CRUD
        addProject,
        updateProject,
        deleteProject,
        recalculateProjectProgress,

        // Milestone Actions
        addMilestone,
        approveMilestone,
        rejectMilestone,
        submitMilestoneForReview,

        // Task CRUD & Kanban
        addTask,
        updateTask,
        deleteTask,
        moveTaskStatus,

        // Document Actions
        uploadDocument,
        deleteDocument,
        updateDocumentStatus,

        // Feedback & Discussion
        addFeedback,
        addFeedbackReply,

        // Notifications
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,

        // Calendar
        addCalendarEvent,
        deleteCalendarEvent,

        // User & Admin
        addUser,
        updateUser,
        toggleUserStatus,
        deleteUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
