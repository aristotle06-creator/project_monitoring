import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileSpreadsheet,
  Printer,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  FolderKanban,
  FileText,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../components/common/Badge';

export const ReportsPage = () => {
  const { projects, milestones, tasks, users, addToast } = useApp();

  const [reportType, setReportType] = useState('progress');
  const [selectedProjectId, setSelectedProjectId] = useState('all');
  const [dateRange, setDateRange] = useState('semester');
  const [isGenerated, setIsGenerated] = useState(true);

  const activeProjects = projects.filter(
    (p) => selectedProjectId === 'all' || p.id === selectedProjectId
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Project ID,Project Title,Department,Guide,Team,Progress,Status,Start Date,End Date\n";

    activeProjects.forEach((p) => {
      csvContent += `"${p.id}","${p.title}","${p.department}","${p.guideName}","${p.teamName}",${p.progress}%,"${p.status}","${p.startDate}","${p.endDate}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ProjectMonitor_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('CSV Downloaded', 'Project data exported successfully as CSV file.', 'success');
  };

  const handleExportPDF = () => {
    addToast('PDF Report Generated', 'Generating university audit PDF dossier...', 'success');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Project Audit Reports & Export Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Generate formal academic evaluations, sprint velocity metrics, and committee review sheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Filter Control Box */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 no-print">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Report Parameters & Scope
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Report Category
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="progress">Full Project Progress Summary</option>
              <option value="performance">Team & Student Performance Audit</option>
              <option value="milestones">Milestone Approval & Evaluation Log</option>
              <option value="delayed">Delayed Schedule & Risk Analysis</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Filter by Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none truncate"
            >
              <option value="all">All Capstone Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.id} - {p.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Reporting Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="semester">Full Semester (Jan 2026 - May 2026)</option>
              <option value="midterm">Mid-Term Phase (Phases 1-4)</option>
              <option value="month">Current Month (April 2026)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Live Generated Report Document Container (Print-optimized) */}
      <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl print:shadow-none print:border-none print:p-0">
        {/* Formal Institutional Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-extrabold text-lg text-blue-900 uppercase tracking-wide">
                Department of Computer Science & Engineering
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              Capstone Project Monitoring & Progress Audit
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Academic Session 2025–2026 • Evaluation Committee Report
            </p>
          </div>

          <div className="text-right text-xs space-y-0.5">
            <p className="font-mono text-slate-500">Report ID: <strong className="text-slate-900">RPT-2026-088</strong></p>
            <p className="text-slate-500">Generated: <strong>{new Date().toLocaleDateString()}</strong></p>
            <p className="text-emerald-700 font-bold">Status: Official Verified</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            1. Executive Evaluation Summary
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            This audit consolidates progress metrics, supervisor reviews, and milestone verification states for registered engineering projects. Out of <strong>{projects.length} capstone projects</strong>, <strong>{projects.filter(p => p.progress >= 75).length} teams</strong> have surpassed 75% delivery gates, with an average cohort progress of <strong>76.4%</strong>.
          </p>
        </div>

        {/* Table of Projects */}
        <div className="mb-8 overflow-x-auto">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
            2. Project Status & Progress Registry
          </h3>

          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 border-r">Project ID</th>
                <th className="py-2.5 px-3 border-r">Project Title</th>
                <th className="py-2.5 px-3 border-r">Guide</th>
                <th className="py-2.5 px-3 border-r">Phase</th>
                <th className="py-2.5 px-3 border-r text-center">Progress</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {activeProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-900 border-r">{p.id}</td>
                  <td className="py-2.5 px-3 font-semibold border-r">{p.title}</td>
                  <td className="py-2.5 px-3 border-r">{p.guideName}</td>
                  <td className="py-2.5 px-3 border-r">{p.currentPhase}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-center border-r">{p.progress}%</td>
                  <td className="py-2.5 px-3 text-center font-bold">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Milestones Verified */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
            3. Verified Milestone Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {milestones.slice(0, 4).map((m) => (
              <div key={m.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex justify-between font-mono font-bold text-blue-900 text-[11px]">
                  <span>{m.id}</span>
                  <span className="text-emerald-700">{m.status} ({m.score})</span>
                </div>
                <p className="font-bold text-slate-900 mt-1">{m.title}</p>
                <p className="text-[11px] text-slate-600 mt-1">{m.guideNotes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures and Viva Committee Approval Blocks */}
        <div className="mt-12 pt-8 border-t-2 border-slate-900 grid grid-cols-3 gap-6 text-center text-xs">
          <div>
            <div className="h-12 border-b border-dashed border-slate-400 mb-2" />
            <p className="font-bold text-slate-900">Prof. Sarah Jenkins</p>
            <p className="text-[10px] text-slate-500">Project Supervisor</p>
          </div>

          <div>
            <div className="h-12 border-b border-dashed border-slate-400 mb-2" />
            <p className="font-bold text-slate-900">Dr. Michael Chang</p>
            <p className="text-[10px] text-slate-500">Head of Review Committee</p>
          </div>

          <div>
            <div className="h-12 border-b border-dashed border-slate-400 mb-2" />
            <p className="font-bold text-slate-900">Dr. Robert Vance</p>
            <p className="text-[10px] text-slate-500">Dean of Academic Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};
