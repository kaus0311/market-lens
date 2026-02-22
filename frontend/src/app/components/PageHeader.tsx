import React from 'react';
import { Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function PageHeader({ title, icon: Icon }: PageHeaderProps) {
  return (
    <div className="w-full bg-white dark:bg-[#1e1e1e] border-b border-slate-200 dark:border-[#2d2d2d] px-8 py-4">
      <div className="flex items-center gap-3">
        {Icon ? (
          <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        ) : (
          <Home className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        )}
        <h1 className="text-2xl text-slate-800 dark:text-slate-200">{title}</h1>
      </div>
    </div>
  );
}