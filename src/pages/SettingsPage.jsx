import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Lock,
  Bell,
  Palette,
  RefreshCw,
  LogOut,
  Save,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';
import { RoleBadge } from '../components/common/Badge';

export const SettingsPage = () => {
  const {
    currentUser,
    updateUser,
    darkMode,
    toggleDarkMode,
    resetToDemoData,
    logout,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'notifications' | 'appearance'

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || 'Dr. Robert Vance',
    email: currentUser?.email || 'admin@univ.edu',
    title: currentUser?.title || 'Dean of Engineering',
    department: currentUser?.department || 'Computer Science & Engineering',
    phone: currentUser?.phone || '+1 (555) 234-5678'
  });

  // Password Form
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });
  const [passSuccess, setPassSuccess] = useState(false);

  // Notification toggles
  const [notifSettings, setNotifSettings] = useState({
    emailReviews: true,
    taskAssignments: true,
    deadlineReminders: true,
    weeklyDigest: false
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUser(currentUser.id, profileForm);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPass && passwords.newPass === passwords.confirm) {
      setPassSuccess(true);
      setPasswords({ current: '', newPass: '', confirm: '' });
      addToast('Password Changed', 'Your password has been updated securely.', 'success');
      setTimeout(() => setPassSuccess(false), 4000);
    } else {
      addToast('Password Mismatch', 'New password and confirmation do not match.', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Account & Platform Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Customize your profile, notification rules, theme appearance, and security credentials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs">
        {[
          { id: 'profile', label: 'User Profile', icon: User },
          { id: 'security', label: 'Security & Password', icon: Lock },
          { id: 'notifications', label: 'Notification Preferences', icon: Bell },
          { id: 'appearance', label: 'Theme & Appearance', icon: Palette }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{currentUser?.name}</h3>
                <RoleBadge role={currentUser?.role} />
              </div>
              <p className="text-xs text-slate-500">{currentUser?.email}</p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Title / Position
                </label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={profileForm.department}
                  onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Security */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Change Account Password</h3>
            <p className="text-xs text-slate-500 mt-0.5">Ensure your account uses a strong passphrase.</p>
          </div>

          {passSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Password updated successfully!</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 text-xs max-w-md">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
            <p className="text-xs text-slate-500 mt-0.5">Control which event notifications trigger email or browser alerts.</p>
          </div>

          <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <label className="pt-3 flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Guide Milestone Approvals & Rejections</p>
                <p className="text-slate-500">Receive instant alerts when supervisors sign off deliverables.</p>
              </div>
              <input
                type="checkbox"
                checked={notifSettings.emailReviews}
                onChange={(e) => setNotifSettings({ ...notifSettings, emailReviews: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
            </label>

            <label className="pt-3 flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Sprint Task Assignment Alerts</p>
                <p className="text-slate-500">Get notified when new task tickets are assigned to your roster.</p>
              </div>
              <input
                type="checkbox"
                checked={notifSettings.taskAssignments}
                onChange={(e) => setNotifSettings({ ...notifSettings, taskAssignments: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
            </label>

            <label className="pt-3 flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Milestone Due Date Reminders (48hr Countdown)</p>
                <p className="text-slate-500">Automated warning when phase delivery deadlines approach.</p>
              </div>
              <input
                type="checkbox"
                checked={notifSettings.deadlineReminders}
                onChange={(e) => setNotifSettings({ ...notifSettings, deadlineReminders: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
            </label>
          </div>
        </div>
      )}

      {/* Tab 4: Appearance & Data Reset */}
      {activeTab === 'appearance' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Platform Theme</h3>
            <p className="text-xs text-slate-500 mt-0.5">Switch between light and high-contrast dark modes.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button
              onClick={() => { if (darkMode) toggleDarkMode(); }}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                !darkMode ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/30' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <Sun className="w-6 h-6 text-amber-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</span>
            </button>

            <button
              onClick={() => { if (!darkMode) toggleDarkMode(); }}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                darkMode ? 'border-blue-600 bg-blue-950/50 ring-2 ring-blue-600/30' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <Moon className="w-6 h-6 text-blue-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</span>
            </button>
          </div>

          {/* Reset Demo Data Danger Zone */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Demonstration Environment Reset
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Restore initial projects (Sports Talent, Hospital ERP, Student Prediction), tasks, and milestone review states.
            </p>
            <button
              onClick={resetToDemoData}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors border border-slate-300 dark:border-slate-700"
            >
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Reset All Sample Projects & Tasks</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
