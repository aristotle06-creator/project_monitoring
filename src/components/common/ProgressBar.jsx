import React from 'react';

export const ProgressBar = ({ progress = 0, size = 'md', showLabel = false, color = 'blue', animate = true }) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
    xl: 'h-5'
  };

  const getColorClasses = (val) => {
    if (color === 'auto') {
      if (val >= 90) return 'bg-emerald-500 from-emerald-500 to-teal-400';
      if (val >= 60) return 'bg-blue-600 from-blue-600 to-cyan-500';
      if (val >= 35) return 'bg-amber-500 from-amber-500 to-yellow-400';
      return 'bg-rose-500 from-rose-500 to-red-400';
    }
    
    const map = {
      blue: 'bg-blue-600 from-blue-600 to-indigo-500',
      emerald: 'bg-emerald-500 from-emerald-500 to-teal-400',
      amber: 'bg-amber-500 from-amber-500 to-yellow-400',
      rose: 'bg-rose-500 from-rose-500 to-red-500',
      purple: 'bg-purple-600 from-purple-600 to-indigo-500'
    };
    return map[color] || map.blue;
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold">
          <span className="text-slate-600 dark:text-slate-400">Progress</span>
          <span className="text-slate-900 dark:text-slate-100">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${heightClasses[size]} border border-slate-200/50 dark:border-slate-700/50`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColorClasses(clamped)} ${
            animate ? 'transition-all duration-500 ease-out' : ''
          }`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export const CircularProgress = ({ progress = 0, size = 64, strokeWidth = 6, color = '#2563EB' }) => {
  const clamped = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-850"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-bold text-slate-800 dark:text-slate-200">
        {clamped}%
      </span>
    </div>
  );
};
