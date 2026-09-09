import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { RoleSwitcherBanner } from './components/common/RoleSwitcherBanner';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { TasksPage } from './pages/TasksPage';
import { TeamPage } from './pages/TeamPage';
import { ProgressMonitoringPage } from './pages/ProgressMonitoringPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { CalendarPage } from './pages/CalendarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const { currentUser, currentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user is not logged in or explicitly on login screen
  if (!currentUser || currentPage === 'login') {
    return (
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );
  }

  // Page Routing Router
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'projects': return <ProjectsPage />;
      case 'project-detail': return <ProjectDetailPage />;
      case 'tasks': return <TasksPage />;
      case 'team': return <TeamPage />;
      case 'progress': return <ProgressMonitoringPage />;
      case 'documents': return <DocumentsPage />;
      case 'calendar': return <CalendarPage />;
      case 'reports': return <ReportsPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'feedback': return <FeedbackPage />;
      case 'notifications': return <NotificationsPage />;
      case 'admin': return <AdminPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Demo Role Switcher Helper Bar */}
      <RoleSwitcherBanner />

      {/* Main Layout: Sidebar + Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar Navigation */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Sticky Header */}
          <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

          {/* Page View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderCurrentPage()}
          </main>
        </div>
      </div>

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <ToastContainer />
    </div>
  );
}

export default App;
