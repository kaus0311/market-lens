import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Chrome } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  change: number;
  avatar: string;
  dateChecked: string;
}

const MOCK_HISTORY_STOCKS: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    price: 175.43,
    value: 17543,
    change: 2.5,
    avatar: '#c53030',
    dateChecked: '2026-02-22 14:23:15',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 50,
    price: 140.23,
    value: 7011,
    change: -1.2,
    avatar: '#eab308',
    dateChecked: '2026-02-22 13:45:32',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 75,
    price: 378.91,
    value: 28418,
    change: 3.8,
    avatar: '#9333ea',
    dateChecked: '2026-02-22 12:18:47',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 30,
    price: 242.84,
    value: 7285,
    change: 5.4,
    avatar: '#f97316',
    dateChecked: '2026-02-21 16:55:22',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 40,
    price: 178.35,
    value: 7134,
    change: 1.9,
    avatar: '#3b82f6',
    dateChecked: '2026-02-21 15:30:11',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 60,
    price: 495.22,
    value: 29713,
    change: 7.2,
    avatar: '#10b981',
    dateChecked: '2026-02-21 11:22:05',
  },
];

export function StockAnalysis() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(() => {
    const stored = localStorage.getItem('extensionConnected');
    return stored === 'true';
  });
  const [historyStocks, setHistoryStocks] = useState<Stock[]>([]);

  useEffect(() => {
    localStorage.setItem('extensionConnected', String(isConnected));
    if (isConnected) {
      setHistoryStocks(MOCK_HISTORY_STOCKS);
    } else {
      setHistoryStocks([]);
    }
  }, [isConnected]);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleStockClick = (stock: Stock) => {
    navigate(`/stock-analysis/${stock.symbol}`, { state: { stock } });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="h-full flex flex-col dark:bg-[#121212]">
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Connect Extension Header */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-5 border border-slate-200 dark:border-[#2d2d2d]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Chrome className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h2 className="text-lg text-slate-900 dark:text-slate-100">Chrome Extension</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {isConnected ? 'Connected to Robinhood' : 'Connect to track your stock views'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleConnect}
                className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                  isConnected
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <Chrome className="w-4 h-4" />
                {isConnected ? 'Connected' : 'Connect to Chrome Extension'}
              </button>
            </div>
          </div>

          {/* History Section */}
          {isConnected && historyStocks.length > 0 && (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d]">
              <div className="mb-4">
                <h3 className="text-xl text-slate-900 dark:text-slate-100 mb-1">History</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Stocks you've viewed on Robinhood ({historyStocks.length} total)
                </p>
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
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Date Checked</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-[#2d2d2d]">
                    {historyStocks.map((stock, index) => (
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
                          <span
                            className={`${
                              stock.change >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                          {formatDateTime(stock.dateChecked)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isConnected && (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-12 border border-slate-200 dark:border-[#2d2d2d] text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#2d2d2d] flex items-center justify-center mx-auto mb-4">
                <Chrome className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg text-slate-900 dark:text-slate-100 mb-2">No Extension Connected</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Connect our Chrome extension to automatically track stocks you view on Robinhood and other trading platforms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}