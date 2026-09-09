# 🚀 ProjectMonitor – Integrated Project Monitoring Platform

> A modern, full-stack web-based project governance and monitoring platform engineered for academic capstone projects, college engineering projects, and agile software development teams.

---

## 📸 Overview & Key Features

**ProjectMonitor** centralizes project management across university faculties, student teams, and project supervisors with a real-time reactive dashboard, automated 7-phase milestones, drag-and-drop Kanban task boards, deliverable document verification, threaded supervisor guidance, and instant CSV/PDF export capabilities.

### 🌟 Core Capabilities
- **👥 Role-Based Access & 1-Click Simulation**: Preloaded roles for **Admin**, **Project Guide**, **Team Leader**, and **Student** with top-bar instant persona switcher.
- **📊 Executive Dashboard**: KPI cards, interactive Project Status Donut chart, Planned vs. Actual progress curve, Task completion velocity, and Upcoming Deadlines countdown.
- **🗓️ 7-Phase Academic Lifecycle**: Standardized college project timeline (*Proposal → SRS Specs → SDD Design → Development → Testing → Thesis → Viva Presentation*).
- **📋 Sprint Task Kanban Board**: Interactive drag-and-drop task board across *To Do*, *In Progress*, *Under Review*, and *Completed* columns with priority tagging (*Critical, High, Medium, Low*).
- **✅ Milestone Evaluation Gateways**: Project Guide evaluation interface with numeric grading (e.g. `95/100`), supervisor notes, and official approval/rejection sign-offs.
- **📁 Document Management Hub**: Categorized deliverables repository (*SRS, SDD, Source Code ZIP, Test Reports, Presentation Decks*) with document previews, versioning, and download simulations.
- **📑 Reports & Data Export**: Audit dossier formatted for evaluation committees with live **CSV download** generation and custom printable PDF stylesheets.
- **💬 Threaded Supervisory Feedback**: Contextual discussion threads between project guides and student researchers.
- **⚡ Built-in REST API Explorer**: Interactive API testing playground right inside the UI to inspect live JSON responses, status codes, and test backend endpoints.
- **🌙 Dark / Light Mode**: Seamless theme toggle with state persistence.

---

## 🏗️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend**: Node.js REST API Server
- **Database**: File-backed JSON Database (`data/db.json`) with atomic persistence and audit logging
- **Tooling**: Vite, PostCSS, Git

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- Git (optional, for version control)

### 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/project-monitor.git
   cd project-monitor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Full-Stack Application**:
   ```bash
   npm start
   ```
   *or*
   ```bash
   node server.js
   ```

4. **Open your browser**:
   - **Web Application**: [http://localhost:3000](http://localhost:3000)
   - **REST API Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## ⚡ Zero-Installation Direct Launch

If you prefer to run the application immediately without installing Node dependencies:
1. Double-click **`standalone.html`** in your file explorer.
2. The entire platform runs directly in your browser with full interactivity and local persistence!

---

## 🔑 Demo Accounts

Use any of the preloaded demo accounts to log in, or click the **Role Switcher** bar at the top of the interface:

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | Dr. Robert Vance | `admin@univ.edu` | `password123` |
| **Project Guide** | Prof. Sarah Jenkins | `guide@univ.edu` | `password123` |
| **Team Leader** | Alex Rivera | `lead@univ.edu` | `password123` |
| **Student** | Maya Patel | `student@univ.edu` | `password123` |

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server uptime, memory, and database entity counts |
| `POST` | `/api/auth/login` | User authentication |
| `POST` | `/api/auth/switch-role` | 1-click persona simulation switch |
| `GET` | `/api/projects` | List all projects (supports `status`, `department`, `guide`, `search` filters) |
| `POST` | `/api/projects` | Create a new project with initialized 7-phase timeline |
| `GET` | `/api/projects/:id` | Get project details, milestones, tasks, and team |
| `PUT` | `/api/projects/:id` | Update project metadata and progress |
| `DELETE` | `/api/projects/:id` | Delete project |
| `GET` | `/api/milestones` | List milestone deliverable gates |
| `POST` | `/api/milestones/:id/approve` | Guide milestone approval with score and feedback |
| `POST` | `/api/milestones/:id/reject` | Request revision on milestone |
| `GET` | `/api/tasks` | List sprint tasks with Kanban status |
| `POST` | `/api/tasks` | Create new sprint task |
| `PATCH` | `/api/tasks/:id` | Move task status (*To Do, In Progress, Under Review, Completed*) |
| `DELETE` | `/api/tasks/:id` | Delete task |
| `GET` | `/api/documents` | Deliverable documents repository |
| `POST` | `/api/documents/upload` | Upload new deliverable specification or source code |
| `GET` | `/api/reports/csv` | Dynamically stream CSV audit report file |
| `POST` | `/api/system/reset` | Reset database to initial clean seed state |

---

## 📂 Project Directory Structure

```
project-monitor/
├── .gitignore               # Git ignored files and directories
├── README.md                # Comprehensive project documentation
├── package.json             # Project dependencies and npm scripts
├── server.js                # Node.js Full-Stack REST API & static web server
├── standalone.html          # Standalone zero-setup browser executable
├── index.html               # Main entry HTML
├── vite.config.js           # Vite bundler configuration
├── tailwind.config.js       # Tailwind design system configuration
├── postcss.config.js        # PostCSS configuration
├── backend/
│   ├── database.js          # Persistent JSON database engine
│   ├── initialData.js       # Preloaded university seed datasets
│   └── routes.js            # REST API router and controllers
├── data/
│   └── db.json              # Persistent database file
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # App layout, header, sidebar & router
    ├── index.css            # Global Tailwind CSS and print rules
    ├── context/
    │   └── AppContext.jsx   # State store and CRUD hooks
    ├── components/
    │   └── common/          # Badges, Progress Bars, Stat Cards, Charts
    └── pages/               # 14 Full Feature Page Views
```

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👥 Authors & Acknowledgments

- Developed for academic project evaluations, viva committee demonstrations, and student research teams.
- Special thanks to the university project guides, coordinators, and engineering departments.
