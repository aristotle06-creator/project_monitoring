import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  GraduationCap,
  Users,
  UserCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const { loginWithCredentials, loginAs, DEMO_USERS, navigateTo } = useApp();
  const [email, setEmail] = useState('admin@univ.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    const res = loginWithCredentials(email, password);
    if (res.success) {
      navigateTo('dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleQuickRole = (role) => {
    loginAs(role);
    navigateTo('dashboard');
  };

  const demoPresets = [
    {
      role: 'admin',
      label: 'Administrator',
      name: 'Dr. Robert Vance',
      email: 'admin@univ.edu',
      icon: ShieldCheck,
      desc: 'Full system management, guide allocations & university audit',
      color: 'border-purple-200 dark:border-purple-900/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/30'
    },
    {
      role: 'guide',
      label: 'Project Guide',
      name: 'Prof. Sarah Jenkins',
      email: 'guide@univ.edu',
      icon: GraduationCap,
      desc: 'Milestone approval, student thesis reviews & feedback',
      color: 'border-blue-200 dark:border-blue-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30'
    },
    {
      role: 'leader',
      label: 'Team Leader',
      name: 'Alex Rivera',
      email: 'lead@univ.edu',
      icon: Users,
      desc: 'Sprint task assignments, documents, deadlines & progress updates',
      color: 'border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30'
    },
    {
      role: 'student',
      label: 'Student',
      name: 'Maya Patel',
      email: 'student@univ.edu',
      icon: UserCheck,
      desc: 'Task execution, code uploads, daily progress & review queries',
      color: 'border-amber-200 dark:border-amber-900/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/30'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 my-8">
        {/* Left Side: Brand & Quick Demo Logins */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/25">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">
                  Project<span className="text-blue-400">Monitor</span>
                </h1>
                <p className="text-xs text-blue-300 font-medium">Integrated Project Monitoring Platform</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-6">
              Centralized Academic & Software Project Governance
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Empowering administrators, faculty guides, team leads, and student researchers to track milestones, tasks, documents, and performance from submission to final viva.
            </p>
          </div>

          {/* Quick Demo Access Cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Demo Persona Login
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {demoPresets.map((preset) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() => handleQuickRole(preset.role)}
                    className={`p-3 rounded-xl border bg-slate-800/80 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${preset.color}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-blue-400" />
                        {preset.label}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium truncate">{preset.name}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{preset.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            © 2026 ProjectMonitor. Built for College Academic & Engineering Projects.
          </div>
        </div>

        {/* Right Side: Traditional Login Form */}
        <div className="lg:col-span-6">
          <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Account Sign In</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your university credentials or click any demo preset on the left.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address / Student ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@univ.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                  />
                  <span>Remember me for 30 days</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <h3 className="text-lg font-bold">Reset Your Password</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter your institutional email address and we'll send you an instant reset link.
            </p>

            {forgotSent ? (
              <div className="my-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <div>
                  <p className="font-bold">Password Reset Email Sent!</p>
                  <p className="mt-0.5">Please check your inbox at <strong>{forgotEmail}</strong>.</p>
                </div>
              </div>
            ) : (
              <div className="my-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="e.g. yourname@univ.edu"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSent(false);
                  setForgotEmail('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => {
                    if (forgotEmail.trim()) setForgotSent(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
