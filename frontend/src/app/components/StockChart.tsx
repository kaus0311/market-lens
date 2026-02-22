import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StockChartProps {
  data: any[];
}

export function StockChart({ data }: StockChartProps) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-slate-200 dark:border-[#2d2d2d]">
      <h3 className="text-xl mb-6 text-slate-800 dark:text-slate-200">Stock Performance</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-[#2d2d2d]" />
          <XAxis dataKey="symbol" stroke="#64748b" className="dark:stroke-slate-400" />
          <YAxis stroke="#64748b" className="dark:stroke-slate-400" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
            cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
          />
          <Legend />
          <Bar dataKey="value" fill="url(#colorValue)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="change" fill="url(#colorChange)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorChange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
              <stop offset="100%" stopColor="#059669" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}