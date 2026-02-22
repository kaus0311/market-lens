import React from 'react';
import { useNavigate } from 'react-router';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  change: number;
  avatar: string;
}

interface StocksTableProps {
  stocks: Stock[];
}

export function StocksTable({ stocks }: StocksTableProps) {
  const navigate = useNavigate();

  const handleStockClick = (stock: Stock) => {
    navigate(`/stock/${stock.symbol}`, { state: { stock } });
  };

  return (
    <div className="w-full bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d] shadow-sm">
      <div className="mb-4">
        <h3 className="text-base text-slate-600 dark:text-slate-400">Total stocks: {stocks.length}</h3>
      </div>
      
      <div className="overflow-hidden border border-slate-200 dark:border-[#2d2d2d] rounded-lg">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-[#2d2d2d]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Shares</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Value</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#2d2d2d]">
            {stocks.map((stock, index) => (
              <tr 
                key={index} 
                onClick={() => handleStockClick(stock)}
                className="hover:bg-slate-50 dark:hover:bg-[#2d2d2d]/50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
                      style={{ backgroundColor: stock.avatar }}
                    >
                      {stock.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{stock.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{stock.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{stock.shares}</td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">${stock.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">${stock.value.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}