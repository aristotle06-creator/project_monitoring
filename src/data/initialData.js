// Realistic Pre-populated Data for ProjectMonitor

export const DEMO_USERS = [
  {
    id: "usr_admin",
    name: "Dr. Robert Vance",
    email: "admin@univ.edu",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    title: "Dean & Head of Academic Projects",
    department: "Computer Science & Engineering",
    phone: "+1 (555) 234-5678",
    joinedDate: "2021-08-15",
    status: "active"
  },
  {
    id: "usr_guide",
    name: "Prof. Sarah Jenkins",
    email: "guide@univ.edu",
    role: "guide",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    title: "Associate Professor & Senior Project Guide",
    department: "Computer Science & Engineering",
    phone: "+1 (555) 345-6789",
    joinedDate: "2022-01-10",
    status: "active"
  },
  {
    id: "usr_lead",
    name: "Alex Rivera",
    email: "lead@univ.edu",
    role: "leader",
    studentId: "STU-2024-041",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    title: "Team Leader & Full-Stack Architect",
    department: "Computer Science & Engineering",
    semester: "Semester 8",
    projectId: "PRJ-101",
    phone: "+1 (555) 456-7890",
    joinedDate: "2024-08-01",
    status: "active"
  },
  {
    id: "usr_student",
    name: "Maya Patel",
    email: "student@univ.edu",
    role: "student",
    studentId: "STU-2024-089",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    title: "Student Developer & ML Research Intern",
    department: "Computer Science & Engineering",
    semester: "Semester 8",
    projectId: "PRJ-101",
    phone: "+1 (555) 567-8901",
    joinedDate: "2024-08-01",
    status: "active"
  },
  {
    id: "usr_student_2",
    name: "Liam Chen",
    email: "liam.chen@univ.edu",
    role: "student",
    studentId: "STU-2024-112",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    title: "Backend & Cloud Engineer",
    department: "Computer Science & Engineering",
    semester: "Semester 8",
    projectId: "PRJ-101",
    status: "active"
  },
  {
    id: "usr_student_3",
    name: "Emily Watson",
    email: "emily.watson@univ.edu",
    role: "student",
    studentId: "STU-2024-145",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    title: "UI/UX & QA Tester",
    department: "Computer Science & Engineering",
    semester: "Semester 8",
    projectId: "PRJ-101",
    status: "active"
  },
  {
    id: "usr_guide_2",
    name: "Dr. Michael Chang",
    email: "m.chang@univ.edu",
    role: "guide",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    title: "Professor in Artificial Intelligence",
    department: "Information Technology",
    status: "active"
  },
  {
    id: "usr_guide_3",
    name: "Dr. Anita Roy",
    email: "a.roy@univ.edu",
    role: "guide",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    title: "Associate Professor in IoT & Embedded",
    department: "Electronics & Communication",
    status: "active"
  }
];

export const INITIAL_PROJECTS = [
  {
    id: "PRJ-101",
    code: "CSE-2026-01",
    title: "Smart Mobile Platform for Sports Talent Identification",
    category: "AI / Mobile Computing",
    department: "Computer Science & Engineering",
    teamName: "Alpha Innovations",
    guideId: "usr_guide",
    guideName: "Prof. Sarah Jenkins",
    leaderId: "usr_lead",
    leaderName: "Alex Rivera",
    startDate: "2026-01-10",
    endDate: "2026-05-30",
    status: "In Progress", // "Planning", "In Progress", "Under Review", "Completed", "Delayed"
    progress: 78,
    budget: "$2,400",
    currentPhase: "Development & Integration",
    phaseIndex: 4,
    description: "An AI-powered computer vision mobile application that analyzes athletic biomechanics, sprint acceleration, and vertical jump metrics to discover grassroot sports talents.",
    membersCount: 4,
    members: [
      { id: "usr_lead", name: "Alex Rivera", role: "Team Lead & Architect", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-041", tasksAssigned: 8, tasksCompleted: 7, score: 96 },
      { id: "usr_student", name: "Maya Patel", role: "Frontend & ML Engineer", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-089", tasksAssigned: 7, tasksCompleted: 6, score: 92 },
      { id: "usr_student_2", name: "Liam Chen", role: "Backend & API Developer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-112", tasksAssigned: 6, tasksCompleted: 4, score: 85 },
      { id: "usr_student_3", name: "Emily Watson", role: "QA & UI/UX Specialist", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-145", tasksAssigned: 5, tasksCompleted: 4, score: 88 }
    ],
    phases: [
      { id: 1, name: "Project Proposal", status: "completed", startDate: "2026-01-10", endDate: "2026-01-25", completedDate: "2026-01-24" },
      { id: 2, name: "Requirement Analysis (SRS)", status: "completed", startDate: "2026-01-26", endDate: "2026-02-15", completedDate: "2026-02-14" },
      { id: 3, name: "System Design (SDD)", status: "completed", startDate: "2026-02-16", endDate: "2026-03-10", completedDate: "2026-03-08" },
      { id: 4, name: "Development & Integration", status: "in_progress", startDate: "2026-03-11", endDate: "2026-04-20", completedDate: null },
      { id: 5, name: "Testing & Quality Assurance", status: "pending", startDate: "2026-04-21", endDate: "2026-05-05", completedDate: null },
      { id: 6, name: "Documentation & Thesis", status: "pending", startDate: "2026-05-06", endDate: "2026-05-20", completedDate: null },
      { id: 7, name: "Final Presentation & Viva", status: "pending", startDate: "2026-05-21", endDate: "2026-05-30", completedDate: null }
    ]
  },
  {
    id: "PRJ-102",
    code: "CSE-2026-02",
    title: "Online Hospital Management & Telemedicine System",
    category: "Full-Stack Web / Cloud",
    department: "Computer Science & Engineering",
    teamName: "HealthTech Pioneers",
    guideId: "usr_guide",
    guideName: "Prof. Sarah Jenkins",
    leaderId: "usr_lead_2",
    leaderName: "Marcus Brody",
    startDate: "2026-01-15",
    endDate: "2026-05-15",
    status: "Under Review",
    progress: 92,
    budget: "$3,100",
    currentPhase: "Testing & Quality Assurance",
    phaseIndex: 5,
    description: "Cloud-native hospital ERP featuring real-time WebRTC teleconsultations, electronic health record (EHR) encryption, and automated OPD queue allocation.",
    membersCount: 4,
    members: [
      { id: "usr_lead_2", name: "Marcus Brody", role: "Team Lead", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-032", tasksAssigned: 9, tasksCompleted: 9, score: 98 },
      { id: "usr_stu_5", name: "Sara Al-Mansoor", role: "Cloud & Security", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-077", tasksAssigned: 7, tasksCompleted: 6, score: 90 }
    ],
    phases: [
      { id: 1, name: "Project Proposal", status: "completed", startDate: "2026-01-15", endDate: "2026-01-30", completedDate: "2026-01-29" },
      { id: 2, name: "Requirement Analysis (SRS)", status: "completed", startDate: "2026-02-01", endDate: "2026-02-20", completedDate: "2026-02-19" },
      { id: 3, name: "System Design (SDD)", status: "completed", startDate: "2026-02-21", endDate: "2026-03-15", completedDate: "2026-03-14" },
      { id: 4, name: "Development & Integration", status: "completed", startDate: "2026-03-16", endDate: "2026-04-25", completedDate: "2026-04-22" },
      { id: 5, name: "Testing & Quality Assurance", status: "in_progress", startDate: "2026-04-26", endDate: "2026-05-08", completedDate: null },
      { id: 6, name: "Documentation & Thesis", status: "pending", startDate: "2026-05-09", endDate: "2026-05-18", completedDate: null },
      { id: 7, name: "Final Presentation & Viva", status: "pending", startDate: "2026-05-19", endDate: "2026-05-25", completedDate: null }
    ]
  },
  {
    id: "PRJ-103",
    code: "IT-2026-08",
    title: "AI-Based Student Performance Prediction & Early Warning",
    category: "Machine Learning / EdTech",
    department: "Information Technology",
    teamName: "EduMetrics AI",
    guideId: "usr_guide_2",
    guideName: "Dr. Michael Chang",
    leaderId: "usr_lead_3",
    leaderName: "Kavita Nair",
    startDate: "2026-02-01",
    endDate: "2026-06-15",
    status: "In Progress",
    progress: 64,
    budget: "$1,800",
    currentPhase: "Development & Integration",
    phaseIndex: 4,
    description: "Ensemble deep learning system tracking LMS engagements, quiz patterns, and attendance to provide automated counseling triggers for at-risk students.",
    membersCount: 3,
    members: [
      { id: "usr_lead_3", name: "Kavita Nair", role: "Lead Data Scientist", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-055", tasksAssigned: 8, tasksCompleted: 5, score: 86 }
    ],
    phases: [
      { id: 1, name: "Project Proposal", status: "completed", startDate: "2026-02-01", endDate: "2026-02-15", completedDate: "2026-02-14" },
      { id: 2, name: "Requirement Analysis (SRS)", status: "completed", startDate: "2026-02-16", endDate: "2026-03-05", completedDate: "2026-03-04" },
      { id: 3, name: "System Design (SDD)", status: "completed", startDate: "2026-03-06", endDate: "2026-03-25", completedDate: "2026-03-24" },
      { id: 4, name: "Development & Integration", status: "in_progress", startDate: "2026-03-26", endDate: "2026-05-10", completedDate: null },
      { id: 5, name: "Testing & Quality Assurance", status: "pending", startDate: "2026-05-11", endDate: "2026-05-25", completedDate: null },
      { id: 6, name: "Documentation & Thesis", status: "pending", startDate: "2026-05-26", endDate: "2026-06-05", completedDate: null },
      { id: 7, name: "Final Presentation & Viva", status: "pending", startDate: "2026-06-06", endDate: "2026-06-15", completedDate: null }
    ]
  },
  {
    id: "PRJ-104",
    code: "CSE-2025-19",
    title: "Autonomous E-Commerce Supply Chain & Inventory Portal",
    category: "Microservices / Distributed Systems",
    department: "Computer Science & Engineering",
    teamName: "Nexus Logistics",
    guideId: "usr_guide",
    guideName: "Prof. Sarah Jenkins",
    leaderId: "usr_lead_4",
    leaderName: "David Kim",
    startDate: "2025-09-01",
    endDate: "2026-02-28",
    status: "Completed",
    progress: 100,
    budget: "$4,500",
    currentPhase: "Final Presentation & Viva",
    phaseIndex: 7,
    description: "High-throughput microservices architecture with predictive inventory replenishment, automated warehouse bin routing, and supplier telemetry.",
    membersCount: 4,
    members: [
      { id: "usr_lead_4", name: "David Kim", role: "Team Lead", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-019", tasksAssigned: 12, tasksCompleted: 12, score: 99 }
    ],
    phases: [
      { id: 1, name: "Project Proposal", status: "completed", startDate: "2025-09-01", endDate: "2025-09-20", completedDate: "2025-09-18" },
      { id: 2, name: "Requirement Analysis (SRS)", status: "completed", startDate: "2025-09-21", endDate: "2025-10-15", completedDate: "2025-10-14" },
      { id: 3, name: "System Design (SDD)", status: "completed", startDate: "2025-10-16", endDate: "2025-11-10", completedDate: "2025-11-09" },
      { id: 4, name: "Development & Integration", status: "completed", startDate: "2025-11-11", endDate: "2026-01-10", completedDate: "2026-01-08" },
      { id: 5, name: "Testing & Quality Assurance", status: "completed", startDate: "2026-01-11", endDate: "2026-01-30", completedDate: "2026-01-29" },
      { id: 6, name: "Documentation & Thesis", status: "completed", startDate: "2026-02-01", endDate: "2026-02-15", completedDate: "2026-02-14" },
      { id: 7, name: "Final Presentation & Viva", status: "completed", startDate: "2026-02-16", endDate: "2026-02-28", completedDate: "2026-02-27" }
    ]
  },
  {
    id: "PRJ-105",
    code: "ECE-2026-04",
    title: "Smart Campus IoT Monitoring & Energy Optimization System",
    category: "IoT / Embedded Systems",
    department: "Electronics & Communication",
    teamName: "GreenGrid Innovators",
    guideId: "usr_guide_3",
    guideName: "Dr. Anita Roy",
    leaderId: "usr_lead_5",
    leaderName: "Priya Sharma",
    startDate: "2026-01-10",
    endDate: "2026-04-30",
    status: "Delayed",
    progress: 45,
    budget: "$2,200",
    currentPhase: "Development & Integration",
    phaseIndex: 4,
    description: "Sensor mesh network monitoring building power consumption, ambient occupancy, and solar micro-inverter grid efficiency across university facilities.",
    membersCount: 3,
    members: [
      { id: "usr_lead_5", name: "Priya Sharma", role: "Team Lead", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", studentId: "STU-2024-063", tasksAssigned: 8, tasksCompleted: 3, score: 72 }
    ],
    phases: [
      { id: 1, name: "Project Proposal", status: "completed", startDate: "2026-01-10", endDate: "2026-01-25", completedDate: "2026-01-25" },
      { id: 2, name: "Requirement Analysis (SRS)", status: "completed", startDate: "2026-01-26", endDate: "2026-02-20", completedDate: "2026-02-24" },
      { id: 3, name: "System Design (SDD)", status: "completed", startDate: "2026-02-25", endDate: "2026-03-15", completedDate: "2026-03-20" },
      { id: 4, name: "Development & Integration", status: "delayed", startDate: "2026-03-21", endDate: "2026-04-10", completedDate: null },
      { id: 5, name: "Testing & Quality Assurance", status: "pending", startDate: "2026-04-11", endDate: "2026-04-20", completedDate: null },
      { id: 6, name: "Documentation & Thesis", status: "pending", startDate: "2026-04-21", endDate: "2026-04-27", completedDate: null },
      { id: 7, name: "Final Presentation & Viva", status: "pending", startDate: "2026-04-28", endDate: "2026-04-30", completedDate: null }
    ]
  }
];

export const INITIAL_MILESTONES = [
  {
    id: "MLS-01",
    projectId: "PRJ-101",
    title: "Milestone 1: Project Synopsis & Architecture Approval",
    phase: "Project Proposal",
    dueDate: "2026-01-25",
    submittedDate: "2026-01-24",
    status: "Approved", // "Approved", "Under Review", "Pending", "Rejected"
    progress: 100,
    guideNotes: "Clear scope and sound hardware acceleration design. Approved to proceed to requirements phase.",
    score: "95/100",
    weight: "15%"
  },
  {
    id: "MLS-02",
    projectId: "PRJ-101",
    title: "Milestone 2: Software Requirement Specification (SRS)",
    phase: "Requirement Analysis (SRS)",
    dueDate: "2026-02-15",
    submittedDate: "2026-02-14",
    status: "Approved",
    progress: 100,
    guideNotes: "Functional specifications and camera frame rate requirements are well defined. IEEE format followed.",
    score: "92/100",
    weight: "15%"
  },
  {
    id: "MLS-03",
    projectId: "PRJ-101",
    title: "Milestone 3: UI/UX Wireframes & Database Schema (SDD)",
    phase: "System Design (SDD)",
    dueDate: "2026-03-10",
    submittedDate: "2026-03-08",
    status: "Approved",
    progress: 100,
    guideNotes: "Schema handles athlete profiles and video frame vectors cleanly. Good Figma prototypes.",
    score: "94/100",
    weight: "20%"
  },
  {
    id: "MLS-04",
    projectId: "PRJ-101",
    title: "Milestone 4: Core Computer Vision Pose Estimation Engine",
    phase: "Development & Integration",
    dueDate: "2026-04-15",
    submittedDate: "2026-04-14",
    status: "Under Review",
    progress: 85,
    guideNotes: "Currently testing MediaPipe / YOLOv8 pose keypoint extraction on Android and iOS devices.",
    score: "Pending Review",
    weight: "25%"
  },
  {
    id: "MLS-05",
    projectId: "PRJ-101",
    title: "Milestone 5: Integration Testing & Field Evaluation",
    phase: "Testing & Quality Assurance",
    dueDate: "2026-05-05",
    submittedDate: null,
    status: "Pending",
    progress: 0,
    guideNotes: "Scheduled for live track & field field trials with university sports club.",
    score: "-",
    weight: "15%"
  },
  {
    id: "MLS-06",
    projectId: "PRJ-101",
    title: "Milestone 6: Final Dissertation & Research Paper Submission",
    phase: "Final Presentation & Viva",
    dueDate: "2026-05-25",
    submittedDate: null,
    status: "Pending",
    progress: 0,
    guideNotes: "Draft IEEE conference manuscript.",
    score: "-",
    weight: "10%"
  },
  // Milestones for PRJ-102
  {
    id: "MLS-07",
    projectId: "PRJ-102",
    title: "Milestone 4: End-to-End Telemedicine WebRTC & Encryption",
    phase: "Development & Integration",
    dueDate: "2026-04-20",
    submittedDate: "2026-04-18",
    status: "Approved",
    progress: 100,
    guideNotes: "Excellent end-to-end latency below 120ms with DTLS-SRTP encryption verified.",
    score: "98/100",
    weight: "30%"
  },
  {
    id: "MLS-08",
    projectId: "PRJ-102",
    title: "Milestone 5: Penetration Testing & HIPAA Compliance Audit",
    phase: "Testing & Quality Assurance",
    dueDate: "2026-05-08",
    submittedDate: "2026-05-01",
    status: "Under Review",
    progress: 90,
    guideNotes: "Reviewing static security scan logs and SQL injection fuzzing results.",
    score: "Pending",
    weight: "20%"
  },
  // Milestone for PRJ-105
  {
    id: "MLS-09",
    projectId: "PRJ-105",
    title: "Milestone 3: LoRaWAN Gateway & ESP32 Node Firmware",
    phase: "Development & Integration",
    dueDate: "2026-03-25",
    submittedDate: "2026-04-05",
    status: "Rejected",
    progress: 40,
    guideNotes: "Hardware power draw is 3x higher than battery budget specifications. Need sleep-cycle rework.",
    score: "55/100",
    weight: "25%"
  }
];

export const INITIAL_TASKS = [
  {
    id: "TSK-201",
    projectId: "PRJ-101",
    milestoneId: "MLS-04",
    title: "Implement MediaPipe 33-point body pose estimator on React Native",
    description: "Integrate MediaPipe pose landmark estimation via TFLite native bridge with 60 FPS real-time rendering on modern smartphones.",
    status: "in_progress", // "todo", "in_progress", "review", "completed"
    priority: "High", // "Low", "Medium", "High", "Critical"
    assignedTo: {
      id: "usr_student",
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-089"
    },
    dueDate: "2026-04-10",
    progress: 75,
    tags: ["AI/ML", "React Native", "Computer Vision"],
    commentsCount: 4,
    estimatedHours: 32,
    loggedHours: 24
  },
  {
    id: "TSK-202",
    projectId: "PRJ-101",
    milestoneId: "MLS-04",
    title: "Build Node.js / FastAPI Athlete Performance Metrics Engine",
    description: "Develop REST and WebSocket endpoints computing knee flexion angles, stride cadence, and vertical jump heights from joint coordinates.",
    status: "review",
    priority: "Critical",
    assignedTo: {
      id: "usr_lead",
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-041"
    },
    dueDate: "2026-04-08",
    progress: 90,
    tags: ["Backend", "FastAPI", "Biomechanics"],
    commentsCount: 6,
    estimatedHours: 28,
    loggedHours: 26
  },
  {
    id: "TSK-203",
    projectId: "PRJ-101",
    milestoneId: "MLS-04",
    title: "PostgreSQL Database Schema & Athlete Telemetry Timeseries",
    description: "Design optimized TimescaleDB schema to ingest high-frequency joint position streams with sub-10ms query performance.",
    status: "completed",
    priority: "Medium",
    assignedTo: {
      id: "usr_student_2",
      name: "Liam Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-112"
    },
    dueDate: "2026-03-28",
    progress: 100,
    tags: ["Database", "PostgreSQL", "TimescaleDB"],
    commentsCount: 2,
    estimatedHours: 20,
    loggedHours: 18
  },
  {
    id: "TSK-204",
    projectId: "PRJ-101",
    milestoneId: "MLS-04",
    title: "Design Athlete Coach Dashboard & PDF Scouting Report Generator",
    description: "Create interactive coach UI with radar comparison graphs, percentile rankings, and automated PDF export.",
    status: "in_progress",
    priority: "Medium",
    assignedTo: {
      id: "usr_student_3",
      name: "Emily Watson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-145"
    },
    dueDate: "2026-04-14",
    progress: 60,
    tags: ["UI/UX", "TailwindCSS", "PDF Export"],
    commentsCount: 3,
    estimatedHours: 24,
    loggedHours: 15
  },
  {
    id: "TSK-205",
    projectId: "PRJ-101",
    milestoneId: "MLS-05",
    title: "Conduct End-to-End Stress & Frame Rate Benchmarks on Low-Tier Phones",
    description: "Execute automated test suites measuring battery drain, thermal throttling, and frame drop rates across 5 test hardware devices.",
    status: "todo",
    priority: "Low",
    assignedTo: {
      id: "usr_student_3",
      name: "Emily Watson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-145"
    },
    dueDate: "2026-04-28",
    progress: 0,
    tags: ["Testing", "QA", "Performance"],
    commentsCount: 1,
    estimatedHours: 16,
    loggedHours: 0
  },
  {
    id: "TSK-206",
    projectId: "PRJ-101",
    milestoneId: "MLS-05",
    title: "Configure OAuth2 JWT Authentication & Role-Based Access Control",
    description: "Secure all REST and WebSocket communication using JWT tokens with Coach, Scout, and Athlete scopes.",
    status: "completed",
    priority: "High",
    assignedTo: {
      id: "usr_lead",
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-041"
    },
    dueDate: "2026-03-20",
    progress: 100,
    tags: ["Security", "JWT", "OAuth2"],
    commentsCount: 3,
    estimatedHours: 14,
    loggedHours: 12
  },
  {
    id: "TSK-207",
    projectId: "PRJ-101",
    milestoneId: "MLS-04",
    title: "Train Custom Jump Landing Kinematics Model with PyTorch",
    description: "Train lightweight classifier to detect risky knee valgus angles during deceleration to prevent ACL injury.",
    status: "todo",
    priority: "High",
    assignedTo: {
      id: "usr_student",
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-089"
    },
    dueDate: "2026-04-18",
    progress: 20,
    tags: ["PyTorch", "AI/ML", "Injury Prevention"],
    commentsCount: 2,
    estimatedHours: 30,
    loggedHours: 6
  },
  // Tasks for PRJ-102
  {
    id: "TSK-208",
    projectId: "PRJ-102",
    title: "Implement WebRTC Mesh signaling for HD Teleconsultation",
    status: "completed",
    priority: "Critical",
    assignedTo: {
      id: "usr_lead_2",
      name: "Marcus Brody",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-032"
    },
    dueDate: "2026-04-15",
    progress: 100,
    tags: ["WebRTC", "Networking", "Video"],
    commentsCount: 5,
    estimatedHours: 35,
    loggedHours: 35
  },
  // Task for PRJ-105
  {
    id: "TSK-209",
    projectId: "PRJ-105",
    title: "Optimize LoRa Deep Sleep Firmware to cut sensor battery consumption",
    status: "todo",
    priority: "Critical",
    assignedTo: {
      id: "usr_lead_5",
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      studentId: "STU-2024-063"
    },
    dueDate: "2026-04-12",
    progress: 15,
    tags: ["Embedded", "C++", "Power Optimization"],
    commentsCount: 4,
    estimatedHours: 25,
    loggedHours: 5
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "DOC-301",
    projectId: "PRJ-101",
    name: "PRJ-101_Project_Synopsis_and_Proposal.pdf",
    category: "Project Proposal",
    fileType: "pdf",
    size: "2.4 MB",
    uploadedBy: "Alex Rivera (Team Lead)",
    uploadedDate: "2026-01-20",
    version: "v1.2",
    status: "Approved", // "Approved", "Under Review", "Draft"
    downloadsCount: 14,
    summary: "Complete project charter, domain background, problem formulation, hardware requisites, and semester roadmap."
  },
  {
    id: "DOC-302",
    projectId: "PRJ-101",
    name: "PRJ-101_IEEE_Software_Requirements_Specification_SRS.docx",
    category: "Requirement Document",
    fileType: "docx",
    size: "4.8 MB",
    uploadedBy: "Maya Patel",
    uploadedDate: "2026-02-12",
    version: "v2.0",
    status: "Approved",
    downloadsCount: 22,
    summary: "Detailed functional and non-functional specifications conforming to IEEE Std 830-1998 standards."
  },
  {
    id: "DOC-303",
    projectId: "PRJ-101",
    name: "PRJ-101_System_Design_Document_and_Architecture_SDD.pdf",
    category: "Design Document",
    fileType: "pdf",
    size: "7.1 MB",
    uploadedBy: "Alex Rivera",
    uploadedDate: "2026-03-05",
    version: "v1.5",
    status: "Approved",
    downloadsCount: 19,
    summary: "High-level UML diagrams, sequence diagrams, ER schemas, and MediaPipe inference pipeline flowcharts."
  },
  {
    id: "DOC-304",
    projectId: "PRJ-101",
    name: "PRJ-101_Core_Biomechanics_Engine_SourceCode.zip",
    category: "Source Code",
    fileType: "zip",
    size: "18.5 MB",
    uploadedBy: "Liam Chen",
    uploadedDate: "2026-04-02",
    version: "v0.8-alpha",
    status: "Under Review",
    downloadsCount: 8,
    summary: "React Native frontend codebase and FastAPI backend server with model weights and Docker compose configurations."
  },
  {
    id: "DOC-305",
    projectId: "PRJ-101",
    name: "PRJ-101_Unit_and_Integration_Test_Suite_Report.pdf",
    category: "Test Report",
    fileType: "pdf",
    size: "1.9 MB",
    uploadedBy: "Emily Watson",
    uploadedDate: "2026-04-05",
    version: "v1.0",
    status: "Under Review",
    downloadsCount: 5,
    summary: "Jest unit test reports with 88.4% code coverage and Postman API contract verification logs."
  },
  {
    id: "DOC-306",
    projectId: "PRJ-101",
    name: "PRJ-101_Interim_Review_Presentation_Deck.pptx",
    category: "Presentation",
    fileType: "pptx",
    size: "12.3 MB",
    uploadedBy: "Alex Rivera",
    uploadedDate: "2026-04-01",
    version: "v2.1",
    status: "Approved",
    downloadsCount: 31,
    summary: "Slide deck for Mid-Term Academic Evaluation covering prototype live demo and algorithm performance."
  }
];

export const INITIAL_FEEDBACK = [
  {
    id: "FB-401",
    projectId: "PRJ-101",
    authorId: "usr_guide",
    authorName: "Prof. Sarah Jenkins",
    authorRole: "Project Guide",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    targetType: "milestone", // "milestone", "task", "project"
    targetTitle: "Milestone 4: Core Computer Vision Pose Estimation Engine",
    date: "2026-04-03 14:30",
    content: "The real-time joint keypoint tracking on Android looks very promising! Please ensure you test camera latency in outdoor sunlight conditions, as contrast changes can affect 33-point landmark accuracy. Keep up the solid progress.",
    replies: [
      {
        id: "FB-401-1",
        authorId: "usr_lead",
        authorName: "Alex Rivera",
        authorRole: "Team Leader",
        authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        date: "2026-04-03 16:15",
        content: "Thank you Prof. Jenkins! Maya and I have incorporated auto-exposure compensation in the OpenCV preprocessing step, which solved the glare issue."
      },
      {
        id: "FB-401-2",
        authorId: "usr_guide",
        authorName: "Prof. Sarah Jenkins",
        authorRole: "Project Guide",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        date: "2026-04-04 09:00",
        content: "Excellent! Please document the exposure compensation algorithm in Section 4.3 of your thesis."
      }
    ]
  },
  {
    id: "FB-402",
    projectId: "PRJ-101",
    authorId: "usr_guide",
    authorName: "Prof. Sarah Jenkins",
    authorRole: "Project Guide",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    targetType: "task",
    targetTitle: "PostgreSQL Database Schema & Athlete Telemetry Timeseries",
    date: "2026-03-29 11:20",
    content: "Schema is approved. Liam, remember to add compound indices on (athlete_id, recorded_timestamp) so the coach dashboard loads instantaneously.",
    replies: [
      {
        id: "FB-402-1",
        authorId: "usr_student_2",
        authorName: "Liam Chen",
        authorRole: "Backend Developer",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        date: "2026-03-29 13:40",
        content: "Added the BRIN index on timestamp and B-Tree on athlete_id. Query latency dropped from 140ms to 4ms!"
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-501",
    title: "Guide Feedback Received",
    message: "Prof. Sarah Jenkins commented on Milestone 4: 'Pose estimation latency is impressive...'",
    type: "feedback", // "deadline", "approval", "feedback", "task", "warning"
    timestamp: "10 mins ago",
    read: false,
    link: "/projects/PRJ-101",
    projectId: "PRJ-101"
  },
  {
    id: "NOTIF-502",
    title: "Milestone Deadline Approaching",
    message: "Milestone 4: Core Computer Vision Pose Estimation Engine is due in 5 days (April 15).",
    type: "deadline",
    timestamp: "2 hours ago",
    read: false,
    link: "/tasks",
    projectId: "PRJ-101"
  },
  {
    id: "NOTIF-503",
    title: "Milestone Approved",
    message: "Milestone 3 (System Design Document) has been officially approved with score 94/100.",
    type: "approval",
    timestamp: "1 day ago",
    read: true,
    link: "/projects/PRJ-101",
    projectId: "PRJ-101"
  },
  {
    id: "NOTIF-504",
    title: "Project Behind Schedule Warning",
    message: "PRJ-105: Smart Campus IoT Monitoring is 15 days behind schedule. Review required.",
    type: "warning",
    timestamp: "1 day ago",
    read: true,
    link: "/progress",
    projectId: "PRJ-105"
  },
  {
    id: "NOTIF-505",
    title: "New Task Assigned",
    message: "Alex Rivera assigned you to task: 'Train Custom Jump Landing Kinematics Model with PyTorch'",
    type: "task",
    timestamp: "2 days ago",
    read: true,
    link: "/tasks",
    projectId: "PRJ-101"
  }
];

export const INITIAL_CALENDAR_EVENTS = [
  {
    id: "EVT-601",
    title: "Milestone 4 Code Freeze & Demo Submission",
    type: "milestone",
    date: "2026-04-15",
    time: "17:00",
    projectId: "PRJ-101",
    projectTitle: "Sports Talent Identification",
    location: "Online Portal / GitHub",
    color: "blue"
  },
  {
    id: "EVT-602",
    title: "Weekly Guide Review with Prof. Sarah Jenkins",
    type: "meeting",
    date: "2026-04-08",
    time: "14:00 - 15:30",
    projectId: "PRJ-101",
    projectTitle: "Sports Talent Identification",
    location: "CS Lab 304 / Zoom",
    color: "purple"
  },
  {
    id: "EVT-603",
    title: "Task Deadline: Athlete Performance Engine",
    type: "task",
    date: "2026-04-08",
    time: "23:59",
    projectId: "PRJ-101",
    projectTitle: "Sports Talent Identification",
    location: "Jira / GitHub PR",
    color: "emerald"
  },
  {
    id: "EVT-604",
    title: "Hospital ERP HIPAA Security Audit Review",
    type: "review",
    date: "2026-05-08",
    time: "10:00 - 12:00",
    projectId: "PRJ-102",
    projectTitle: "Hospital Management System",
    location: "Conference Room B",
    color: "amber"
  },
  {
    id: "EVT-605",
    title: "Semester Project Exhibition & Viva",
    type: "submission",
    date: "2026-05-28",
    time: "09:00 - 17:00",
    projectId: "PRJ-101",
    projectTitle: "University Academic Viva",
    location: "Main Auditorium & Exhibition Hall",
    color: "rose"
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: "ACT-701",
    user: "Prof. Sarah Jenkins",
    role: "Project Guide",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    action: "reviewed and posted feedback on",
    target: "Milestone 4: Core Computer Vision Engine",
    project: "PRJ-101",
    time: "15 minutes ago",
    badge: "Feedback",
    badgeColor: "purple"
  },
  {
    id: "ACT-702",
    user: "Maya Patel",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    action: "updated progress to 75% on",
    target: "MediaPipe 33-point body pose estimator",
    project: "PRJ-101",
    time: "1 hour ago",
    badge: "Task Progress",
    badgeColor: "blue"
  },
  {
    id: "ACT-703",
    user: "Liam Chen",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    action: "uploaded new version v1.0 of",
    target: "Core Biomechanics Engine SourceCode.zip",
    project: "PRJ-101",
    time: "3 hours ago",
    badge: "Document",
    badgeColor: "emerald"
  },
  {
    id: "ACT-704",
    user: "Alex Rivera",
    role: "Team Leader",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    action: "moved task to Review column",
    target: "FastAPI Athlete Performance Metrics Engine",
    project: "PRJ-101",
    time: "5 hours ago",
    badge: "Kanban",
    badgeColor: "amber"
  },
  {
    id: "ACT-705",
    user: "Dr. Robert Vance",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    action: "approved semester project allocation for",
    target: "AI-Based Student Performance Prediction",
    project: "PRJ-103",
    time: "1 day ago",
    badge: "System",
    badgeColor: "indigo"
  }
];
