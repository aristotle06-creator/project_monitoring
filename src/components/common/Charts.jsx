import React, { useState } from 'react';

// 1. Donut Chart for Project Status Distribution
export const ProjectStatusDonut = ({ projects = [] }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const statusCounts = {
    'In Progress': projects.filter((p) => p.status === 'In Progress').length,
    'Under Review': projects.filter((p) => p.status === 'Under Review').length,
    'Completed': projects.filter((p) => p.status === 'Completed').length,
    'Delayed': projects.filter((p) => p.status === 'Delayed').length,
    'Planning': projects.filter((p) => p.status === 'Planning').length,
  };

  const total = projects.length || 1;

  const data = [
    { label: 'In Progress', count: statusCounts['In Progress'], color: '#2563EB', bg: 'bg-blue-600' },
    { label: 'Under Review', count: statusCounts['Under Review'], color: '#D97706', bg: 'bg-amber-600' },
    { label: 'Completed', count: statusCounts['Completed'], color: '#059669', bg: 'bg-emerald-600' },
    { label: 'Delayed', count: statusCounts['Delayed'], color: '#DC2626', bg: 'bg-rose-600' },
    { label: 'Planning', count: statusCounts['Planning'], color: '#64748B', bg: 'bg-slate-500' },
  ].filter((d) => d.count > 0);

  // Compute SVG arc angles
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedOffset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-2">
      {/* SVG Donut */}
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800"
            fill="transparent"
          />
          {data.map((item, idx) => {
            const strokeDasharray = `${(item.count / total) * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedOffset;
            accumulatedOffset += (item.count / total) * circumference;

            const isHovered = hoveredIdx === idx;

            return (
              <circle
                key={item.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="transition-all duration-300 cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {hoveredIdx !== null ? data[hoveredIdx]?.count : total}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {hoveredIdx !== null ? data[hoveredIdx]?.label : 'Total Projects'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 text-xs w-full max-w-[160px]">
        {data.map((item, idx) => (
          <div
            key={item.label}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-colors ${
              hoveredIdx === idx ? 'bg-slate-100 dark:bg-slate-800 font-bold' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${item.bg}`} />
              <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {Math.round((item.count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Monthly Progress Area/Curve Chart
export const MonthlyProgressChart = () => {
  const [activeMonth, setActiveMonth] = useState(3); // Default April

  const months = [
    { name: 'Jan', planned: 20, actual: 22, label: 'Phase 1: Synopsis' },
    { name: 'Feb', planned: 45, actual: 48, label: 'Phase 2: SRS & Specs' },
    { name: 'Mar', planned: 65, actual: 68, label: 'Phase 3: Design (SDD)' },
    { name: 'Apr', planned: 85, actual: 78, label: 'Phase 4: Dev & AI Build' },
    { name: 'May', planned: 100, actual: 92, label: 'Phase 5: Viva & Testing' },
  ];

  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 20;

  const pointsPlanned = months.map((m, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (months.length - 1);
    const y = height - paddingY - (m.planned / 100) * (height - 2 * paddingY);
    return { x, y };
  });

  const pointsActual = months.map((m, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (months.length - 1);
    const y = height - paddingY - (m.actual / 100) * (height - 2 * paddingY);
    return { x, y };
  });

  const pathPlanned = pointsPlanned.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const pathActual = pointsActual.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaActual = `${pathActual} L ${pointsActual[pointsActual.length - 1].x} ${height - paddingY} L ${pointsActual[0].x} ${height - paddingY} Z`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-blue-600 rounded-full" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Actual Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-slate-300 dark:bg-slate-600 border-dashed rounded-full" />
            <span className="text-slate-500 dark:text-slate-400 font-medium">Planned Schedule</span>
          </div>
        </div>

        {activeMonth !== null && (
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
            {months[activeMonth].name}: {months[activeMonth].actual}% vs {months[activeMonth].planned}% planned
          </span>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44">
          <defs>
            <linearGradient id="actualGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = height - paddingY - (val / 100) * (height - 2 * paddingY);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="3 3"
                  className="text-slate-100 dark:text-slate-800"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-slate-400 font-mono"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Area under Actual */}
          <path d={areaActual} fill="url(#actualGradient)" />

          {/* Planned Line (Dashed) */}
          <path d={pathPlanned} fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />

          {/* Actual Line */}
          <path d={pathActual} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />

          {/* Dots */}
          {pointsActual.map((p, i) => {
            const isActive = activeMonth === i;
            return (
              <g key={i} className="cursor-pointer" onClick={() => setActiveMonth(i)}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 6 : 4}
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-200 hover:scale-125"
                />
                <text
                  x={p.x}
                  y={height - 4}
                  textAnchor="middle"
                  className={`text-[10px] font-semibold ${
                    isActive ? 'fill-blue-600 font-bold' : 'fill-slate-500 dark:fill-slate-400'
                  }`}
                >
                  {months[i].name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// 3. Task Velocity Bar Chart
export const TaskVelocityChart = ({ tasks = [] }) => {
  const [selectedBar, setSelectedBar] = useState(null);

  const categories = [
    { label: 'AI/ML Core', total: 6, done: 4 },
    { label: 'Backend API', total: 8, done: 7 },
    { label: 'Database/Cloud', total: 5, done: 5 },
    { label: 'Frontend App', total: 7, done: 5 },
    { label: 'Testing & QA', total: 4, done: 2 },
  ];

  return (
    <div className="space-y-3">
      {categories.map((cat, i) => {
        const pct = Math.round((cat.done / cat.total) * 100);
        return (
          <div
            key={cat.label}
            onMouseEnter={() => setSelectedBar(i)}
            onMouseLeave={() => setSelectedBar(null)}
            className="group cursor-pointer"
          >
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {cat.label}
              </span>
              <span className="font-mono text-slate-500 text-[11px]">
                {cat.done}/{cat.total} completed ({pct}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out group-hover:bg-blue-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 4. Team Performance Leaderboard
export const TeamPerformanceList = ({ members = [] }) => {
  const sorted = [...members].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-3">
      {sorted.map((m, i) => (
        <div
          key={m.id || i}
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-mono font-bold text-slate-400 w-4">
              #{i + 1}
            </span>
            <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
            <div className="min-w-0 truncate">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {m.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {m.role} • {m.tasksCompleted || 0} tasks done
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {m.score}% Score
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
