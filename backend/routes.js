import { db } from './database.js';

// Helper to send JSON responses
export const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
};

// Helper to parse JSON request body
export const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        if (!body.trim()) resolve({});
        else resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
};

export const handleApiRequest = async (req, res, pathname, query) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  try {
    // 1. HEALTH & SYSTEM
    if (pathname === '/api/health' && req.method === 'GET') {
      const allData = db.read();
      return sendJson(res, 200, {
        status: 'online',
        serverTime: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
          projectsCount: (allData.projects || []).length,
          tasksCount: (allData.tasks || []).length,
          usersCount: (allData.users || []).length,
          milestonesCount: (allData.milestones || []).length,
          documentsCount: (allData.documents || []).length
        },
        version: '2.0.0-PROD'
      });
    }

    if (pathname === '/api/system/reset' && req.method === 'POST') {
      const resetData = db.reset();
      return sendJson(res, 200, { success: true, message: 'Database reset to initial demo state', data: resetData });
    }

    if (pathname === '/api/system/logs' && req.method === 'GET') {
      const logs = db.get('systemLogs');
      return sendJson(res, 200, logs);
    }

    // 2. AUTH
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const { email, password } = body;
      const users = db.get('users');
      const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
      if (user) {
        return sendJson(res, 200, {
          success: true,
          token: 'pm_token_' + Buffer.from(user.id).toString('base64'),
          user
        });
      }
      return sendJson(res, 401, { success: false, message: 'Invalid credentials. Use demo accounts.' });
    }

    if (pathname === '/api/auth/switch-role' && req.method === 'POST') {
      const body = await parseBody(req);
      const { role } = body;
      const users = db.get('users');
      const user = users.find((u) => u.role === role) || users[0];
      return sendJson(res, 200, {
        success: true,
        token: 'pm_token_' + Buffer.from(user.id).toString('base64'),
        user
      });
    }

    // 3. PROJECTS CRUD
    if (pathname === '/api/projects' && req.method === 'GET') {
      let projects = db.get('projects');
      if (query.status && query.status !== 'all') {
        projects = projects.filter((p) => p.status.toLowerCase().replace(/\s+/g, '_') === query.status.toLowerCase());
      }
      if (query.department && query.department !== 'all') {
        projects = projects.filter((p) => p.department === query.department);
      }
      if (query.guide && query.guide !== 'all') {
        projects = projects.filter((p) => p.guideName === query.guide);
      }
      if (query.search) {
        const q = query.search.toLowerCase();
        projects = projects.filter((p) => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.teamName.toLowerCase().includes(q));
      }
      return sendJson(res, 200, projects);
    }

    const projectMatch = pathname.match(/^\/api\/projects\/([A-Za-z0-9_-]+)$/);
    if (projectMatch) {
      const projectId = projectMatch[1];
      if (req.method === 'GET') {
        const project = db.getById('projects', projectId);
        if (!project) return sendJson(res, 404, { error: 'Project not found' });
        const milestones = db.get('milestones').filter((m) => m.projectId === projectId);
        const tasks = db.get('tasks').filter((t) => t.projectId === projectId);
        const documents = db.get('documents').filter((d) => d.projectId === projectId);
        return sendJson(res, 200, { ...project, milestones, tasks, documents });
      }

      if (req.method === 'PUT') {
        const body = await parseBody(req);
        const updated = db.update('projects', projectId, body);
        if (!updated) return sendJson(res, 404, { error: 'Project not found' });
        return sendJson(res, 200, updated);
      }

      if (req.method === 'DELETE') {
        const deleted = db.delete('projects', projectId);
        if (!deleted) return sendJson(res, 404, { error: 'Project not found' });
        return sendJson(res, 200, { success: true, message: `Project ${projectId} deleted` });
      }
    }

    if (pathname === '/api/projects' && req.method === 'POST') {
      const body = await parseBody(req);
      const allProjects = db.get('projects');
      const newId = `PRJ-${100 + allProjects.length + 1}`;
      const newProject = {
        id: newId,
        code: `CSE-2026-${String(allProjects.length + 1).padStart(2, '0')}`,
        status: 'Planning',
        progress: 0,
        currentPhase: 'Project Proposal',
        phaseIndex: 1,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2026-05-30',
        membersCount: 4,
        phases: [
          { id: 1, name: "Project Proposal", status: "in_progress", endDate: "2026-01-25" },
          { id: 2, name: "Requirement Analysis (SRS)", status: "pending", endDate: "2026-02-15" },
          { id: 3, name: "System Design (SDD)", status: "pending", endDate: "2026-03-10" },
          { id: 4, name: "Development & Integration", status: "pending", endDate: "2026-04-20" },
          { id: 5, name: "Testing & Quality Assurance", status: "pending", endDate: "2026-05-05" },
          { id: 6, name: "Documentation & Thesis", status: "pending", endDate: "2026-05-20" },
          { id: 7, name: "Final Presentation & Viva", status: "pending", endDate: "2026-05-30" }
        ],
        ...body
      };
      db.insert('projects', newProject);
      return sendJson(res, 201, newProject);
    }

    // 4. MILESTONES & SUPERVISOR APPROVAL
    if (pathname === '/api/milestones' && req.method === 'GET') {
      let milestones = db.get('milestones');
      if (query.projectId) {
        milestones = milestones.filter((m) => m.projectId === query.projectId);
      }
      return sendJson(res, 200, milestones);
    }

    if (pathname === '/api/milestones' && req.method === 'POST') {
      const body = await parseBody(req);
      const allMls = db.get('milestones');
      const newMls = {
        id: `MLS-${String(allMls.length + 1).padStart(2, '0')}`,
        status: 'Pending',
        progress: 0,
        score: '-',
        ...body
      };
      db.insert('milestones', newMls);
      return sendJson(res, 201, newMls);
    }

    const milestoneApproveMatch = pathname.match(/^\/api\/milestones\/([A-Za-z0-9_-]+)\/approve$/);
    if (milestoneApproveMatch && req.method === 'POST') {
      const mlsId = milestoneApproveMatch[1];
      const body = await parseBody(req);
      const updated = db.update('milestones', mlsId, {
        status: 'Approved',
        progress: 100,
        guideNotes: body.guideNotes || 'Verified implementation and deliverables conform to specifications.',
        score: body.score || '95/100'
      });
      if (!updated) return sendJson(res, 404, { error: 'Milestone not found' });
      return sendJson(res, 200, { success: true, milestone: updated });
    }

    const milestoneRejectMatch = pathname.match(/^\/api\/milestones\/([A-Za-z0-9_-]+)\/reject$/);
    if (milestoneRejectMatch && req.method === 'POST') {
      const mlsId = milestoneRejectMatch[1];
      const body = await parseBody(req);
      const updated = db.update('milestones', mlsId, {
        status: 'Rejected',
        guideNotes: body.guideNotes || 'Revisions requested by project supervisor.'
      });
      if (!updated) return sendJson(res, 404, { error: 'Milestone not found' });
      return sendJson(res, 200, { success: true, milestone: updated });
    }

    // 5. TASKS CRUD & KANBAN
    if (pathname === '/api/tasks' && req.method === 'GET') {
      let tasks = db.get('tasks');
      if (query.projectId && query.projectId !== 'all') {
        tasks = tasks.filter((t) => t.projectId === query.projectId);
      }
      if (query.status) {
        tasks = tasks.filter((t) => t.status === query.status);
      }
      return sendJson(res, 200, tasks);
    }

    if (pathname === '/api/tasks' && req.method === 'POST') {
      const body = await parseBody(req);
      const allTasks = db.get('tasks');
      const newTask = {
        id: `TSK-${allTasks.length + 201}`,
        status: 'todo',
        progress: 0,
        tags: body.tags || ['Task'],
        ...body
      };
      db.insert('tasks', newTask);
      return sendJson(res, 201, newTask);
    }

    const taskMatch = pathname.match(/^\/api\/tasks\/([A-Za-z0-9_-]+)$/);
    if (taskMatch) {
      const taskId = taskMatch[1];
      if (req.method === 'PUT' || req.method === 'PATCH') {
        const body = await parseBody(req);
        const updated = db.update('tasks', taskId, body);
        if (!updated) return sendJson(res, 404, { error: 'Task not found' });
        return sendJson(res, 200, updated);
      }
      if (req.method === 'DELETE') {
        const deleted = db.delete('tasks', taskId);
        if (!deleted) return sendJson(res, 404, { error: 'Task not found' });
        return sendJson(res, 200, { success: true, message: `Task ${taskId} deleted` });
      }
    }

    // 6. DOCUMENTS CRUD
    if (pathname === '/api/documents' && req.method === 'GET') {
      let docs = db.get('documents');
      if (query.projectId && query.projectId !== 'all') {
        docs = docs.filter((d) => d.projectId === query.projectId);
      }
      return sendJson(res, 200, docs);
    }

    if (pathname === '/api/documents/upload' && req.method === 'POST') {
      const body = await parseBody(req);
      const allDocs = db.get('documents');
      const newDoc = {
        id: `DOC-${allDocs.length + 301}`,
        uploadedDate: new Date().toISOString().split('T')[0],
        status: 'Under Review',
        version: 'v1.0',
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        ...body
      };
      db.insert('documents', newDoc);
      return sendJson(res, 201, newDoc);
    }

    const docMatch = pathname.match(/^\/api\/documents\/([A-Za-z0-9_-]+)$/);
    if (docMatch && req.method === 'DELETE') {
      const docId = docMatch[1];
      const deleted = db.delete('documents', docId);
      return sendJson(res, 200, { success: deleted });
    }

    // 7. FEEDBACK & COMMENTS
    if (pathname === '/api/feedback' && req.method === 'GET') {
      let feedback = db.get('feedback');
      if (query.projectId && query.projectId !== 'all') {
        feedback = feedback.filter((f) => f.projectId === query.projectId);
      }
      return sendJson(res, 200, feedback);
    }

    if (pathname === '/api/feedback' && req.method === 'POST') {
      const body = await parseBody(req);
      const newFb = {
        id: `FB-${Date.now()}`,
        date: new Date().toLocaleString(),
        replies: [],
        ...body
      };
      db.insert('feedback', newFb);
      return sendJson(res, 201, newFb);
    }

    const fbReplyMatch = pathname.match(/^\/api\/feedback\/([A-Za-z0-9_-]+)\/reply$/);
    if (fbReplyMatch && req.method === 'POST') {
      const fbId = fbReplyMatch[1];
      const body = await parseBody(req);
      const feedbackItem = db.getById('feedback', fbId);
      if (!feedbackItem) return sendJson(res, 404, { error: 'Feedback not found' });
      const newReply = {
        id: `RPL-${Date.now()}`,
        authorName: body.authorName || 'Team Leader',
        authorRole: body.authorRole || 'leader',
        date: new Date().toLocaleString(),
        content: body.content
      };
      const updatedReplies = [...(feedbackItem.replies || []), newReply];
      const updated = db.update('feedback', fbId, { replies: updatedReplies });
      return sendJson(res, 200, updated);
    }

    // 8. NOTIFICATIONS
    if (pathname === '/api/notifications' && req.method === 'GET') {
      return sendJson(res, 200, db.get('notifications'));
    }

    if (pathname === '/api/notifications/read-all' && req.method === 'POST') {
      const allNotifs = db.get('notifications').map((n) => ({ ...n, read: true }));
      const dbData = db.read();
      dbData.notifications = allNotifs;
      db.write(dbData);
      return sendJson(res, 200, { success: true, count: allNotifs.length });
    }

    // 9. USERS CRUD
    if (pathname === '/api/users' && req.method === 'GET') {
      return sendJson(res, 200, db.get('users'));
    }

    if (pathname === '/api/users' && req.method === 'POST') {
      const body = await parseBody(req);
      const newUser = {
        id: `usr_${Date.now()}`,
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        ...body
      };
      db.insert('users', newUser);
      return sendJson(res, 201, newUser);
    }

    const userMatch = pathname.match(/^\/api\/users\/([A-Za-z0-9_-]+)$/);
    if (userMatch) {
      const userId = userMatch[1];
      if (req.method === 'PUT') {
        const body = await parseBody(req);
        const updated = db.update('users', userId, body);
        return sendJson(res, 200, updated);
      }
      if (req.method === 'DELETE') {
        const deleted = db.delete('users', userId);
        return sendJson(res, 200, { success: deleted });
      }
    }

    // 10. CALENDAR
    if (pathname === '/api/calendar' && req.method === 'GET') {
      return sendJson(res, 200, db.get('calendarEvents'));
    }

    if (pathname === '/api/calendar' && req.method === 'POST') {
      const body = await parseBody(req);
      const newEvt = {
        id: `EVT-${Date.now()}`,
        ...body
      };
      db.insert('calendarEvents', newEvt);
      return sendJson(res, 201, newEvt);
    }

    // 11. ANALYTICS & REPORTS
    if (pathname === '/api/analytics' && req.method === 'GET') {
      const projects = db.get('projects');
      const milestones = db.get('milestones');
      const tasks = db.get('tasks');
      const approvedMls = milestones.filter((m) => m.status === 'Approved').length;
      const doneTasks = tasks.filter((t) => t.status === 'completed').length;
      return sendJson(res, 200, {
        successRate: 94.2,
        avgProgress: Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / (projects.length || 1)),
        milestonesTotal: milestones.length,
        milestonesApproved: approvedMls,
        tasksTotal: tasks.length,
        tasksCompleted: doneTasks,
        departments: [
          { name: 'Computer Science & Engineering', projects: 3, score: 94 },
          { name: 'Information Technology', projects: 1, score: 88 },
          { name: 'Electronics & Communication', projects: 1, score: 72 }
        ]
      });
    }

    if (pathname === '/api/reports/csv' && req.method === 'GET') {
      const projects = db.get('projects');
      let csv = "Project ID,Title,Department,Guide,Team,Progress,Status,Start Date,End Date\n";
      projects.forEach((p) => {
        csv += `"${p.id}","${p.title}","${p.department}","${p.guideName}","${p.teamName}",${p.progress}%,"${p.status}","${p.startDate}","${p.endDate}"\n`;
      });
      res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="ProjectMonitor_Audit.csv"',
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(csv);
    }

    // Fallback 404 for unknown API routes
    return sendJson(res, 404, { error: `Endpoint ${req.method} ${pathname} not found in REST API catalog.` });
  } catch (err) {
    console.error('API Error:', err);
    return sendJson(res, 500, { error: 'Internal Server Error', message: err.message });
  }
};
