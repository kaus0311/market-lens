import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Plus } from 'lucide-react';

interface ChartData {
  label: string;
  name?: string;
  value: number;
  percentage: number;
  color: string;
}

interface PieChartSectionProps {
  data?: ChartData[];
  totalValue?: number;
  riskNumber?: number;
  onAddFile?: () => void;
  title?: string;
}

const DEFAULT_DATA: ChartData[] = [
  { label: 'Label 1', value: 12, percentage: 28.6, color: '#14b8a6' },
  { label: 'Label 2', value: 22, percentage: 42.9, color: '#3b82f6' },
  { label: 'Label 3', value: 12, percentage: 28.6, color: '#6366f1' },
  { label: 'Label 4', value: 12, percentage: 28.6, color: '#ec4899' },
  { label: 'Label 5', value: 7, percentage: 14.3, color: '#f97316' },
  { label: 'Label 6', value: 7, percentage: 14.3, color: '#eab308' },
];

export function PieChartSection({ data = DEFAULT_DATA, totalValue = 72, riskNumber = 6.5, onAddFile, title = 'Portfolio Assessment' }: PieChartSectionProps) {
  // Sort data by value descending and group top 5, rest as "Others"
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const top5 = sortedData.slice(0, 5);
  const others = sortedData.slice(5);
  
  // Calculate "Others" totals
  const othersValue = others.reduce((sum, item) => sum + item.value, 0);
  const othersPercentage = others.reduce((sum, item) => sum + item.percentage, 0);
  
  // Create display data with top 5 + Others (if applicable)
  const displayData: ChartData[] = [...top5];
  if (others.length > 0) {
    displayData.push({
      label: 'Others',
      value: othersValue,
      percentage: parseFloat(othersPercentage.toFixed(1)),
      color: '#94a3b8', // slate-400
    });
  }
  
  const chartData = displayData.map(item => ({ name: item.label, value: item.value }));

  // Determine risk color (green: <4, yellow: 4-7, red: >7)
  const getRiskColor = (risk: number) => {
    if (risk < 4) return 'text-green-600 dark:text-green-400';
    if (risk <= 7) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="w-full bg-white dark:bg-[#1e1e1e] rounded-xl p-5 border border-slate-200 dark:border-[#2d2d2d] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg text-slate-800 dark:text-slate-200">{title}</h2>
        <button
          onClick={onAddFile}
          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add CSV File
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Pie Chart */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-48 h-48">
            <PieChart width={192} height={192}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={77}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">Total</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {typeof totalValue === 'number' && totalValue > 1000 ? `$${totalValue.toLocaleString()}` : totalValue}
              </p>
            </div>
          </div>
        </div>

        {/* Legend Table */}
        <div>
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 gap-y-2">
            {/* Header */}
            <div></div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Label</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 text-right">Value</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 text-right w-12">%</div>

            {/* Data Rows */}
            {displayData.map((item, index) => (
              <div key={index} className="contents" title={item.name || item.label}>
                <div className="flex items-center">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{item.label}</div>
                <div className="text-sm text-slate-900 dark:text-slate-100 text-right font-medium">
                  ${item.value.toLocaleString()}
                </div>
                <div className="text-sm text-slate-900 dark:text-slate-100 text-right font-medium">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
          
          {/* Risk Number */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#2d2d2d]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Risk Number</span>
              <span className={`text-lg font-semibold ${getRiskColor(riskNumber)}`}>{riskNumber}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}