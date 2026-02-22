import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  value: number;
  change: number;
  shares?: number;
  price?: number;
}

interface StockDetailsProps {
  stocks: Stock[];
}

export function StockDetails({ stocks }: StockDetailsProps) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-slate-200 dark:border-[#2d2d2d]">
      <h3 className="text-xl mb-6 text-slate-800 dark:text-slate-200">Stock Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stocks.map((stock, index) => {
          const isPositive = stock.change >= 0;
          const colors = [
            { bg: 'bg-gradient-to-br from-rose-500 to-pink-500', light: 'bg-rose-50 dark:bg-rose-950/20' },
            { bg: 'bg-gradient-to-br from-cyan-500 to-blue-500', light: 'bg-cyan-50 dark:bg-cyan-950/20' },
            { bg: 'bg-gradient-to-br from-amber-500 to-orange-500', light: 'bg-amber-50 dark:bg-amber-950/20' },
            { bg: 'bg-gradient-to-br from-violet-500 to-purple-500', light: 'bg-violet-50 dark:bg-violet-950/20' },
            { bg: 'bg-gradient-to-br from-emerald-500 to-teal-500', light: 'bg-emerald-50 dark:bg-emerald-950/20' },
            { bg: 'bg-gradient-to-br from-fuchsia-500 to-pink-500', light: 'bg-fuchsia-50 dark:bg-fuchsia-950/20' },
          ];
          const color = colors[index % colors.length];

          return (
            <div
              key={stock.symbol}
              className={`${color.light} rounded-lg p-5 border border-slate-200 dark:border-[#2d2d2d] hover:shadow-md transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg text-slate-800 dark:text-slate-200">{stock.symbol}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stock.name}</p>
                </div>
                <div className={`${color.bg} p-2 rounded-lg`}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Value
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">${stock.value.toLocaleString()}</span>
                </div>

                {stock.shares && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Shares</span>
                    <span className="text-slate-800 dark:text-slate-200">{stock.shares}</span>
                  </div>
                )}

                {stock.price && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Price</span>
                    <span className="text-slate-800 dark:text-slate-200">${stock.price.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-[#2d2d2d]">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Change</span>
                  <span
                    className={`flex items-center gap-1 ${
                      isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {isPositive ? '+' : ''}
                    {stock.change}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}