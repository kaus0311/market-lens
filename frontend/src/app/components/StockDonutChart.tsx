import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StockDonutChartProps {
  data: any[];
  isPlaceholder?: boolean;
}

const COLORS = ['#ef4444', '#eab308', '#f97316', '#3b82f6', '#06b6d4', '#22c55e'];

export function StockDonutChart({ data, isPlaceholder = false }: StockDonutChartProps) {
  const chartData = isPlaceholder 
    ? [{ name: 'Placeholder', value: 1 }]
    : data.map(stock => ({ name: stock.symbol, value: stock.value }));

  const colors = isPlaceholder ? ['#e5e7eb'] : COLORS;

  return (
    <div className={`bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-lg border ${isPlaceholder ? 'border-slate-200 dark:border-[#2d2d2d]' : 'border-slate-200 dark:border-[#2d2d2d]'}`}>
      <h3 className={`text-xl mb-6 ${isPlaceholder ? 'text-slate-300 dark:text-slate-700' : 'text-slate-800 dark:text-slate-200'}`}>
        Portfolio Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {!isPlaceholder && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl fill-slate-700 dark:fill-slate-300"
            >
              {data.length}
            </text>
          )}
          {!isPlaceholder && (
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="hanging"
              className="text-sm fill-slate-500 dark:fill-slate-400"
            >
              Stocks
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>
      {!isPlaceholder && (
        <div className="mt-6 grid grid-cols-2 gap-2">
          {data.slice(0, 6).map((stock, index) => (
            <div key={stock.symbol} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                {stock.symbol}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}