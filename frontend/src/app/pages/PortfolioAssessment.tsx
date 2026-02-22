import React, { useState, useEffect } from 'react';
import { PieChartSection } from '../components/PieChartSection';
import { StocksTable } from '../components/StocksTable';
import { TrendingUp, TrendingDown, Star, Heart, MessageCircle, ThumbsUp } from 'lucide-react';

const DEFAULT_STOCKS = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    price: 175.43,
    value: 17543,
    change: 2.5,
    avatar: '#c53030',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 50,
    price: 140.23,
    value: 7011,
    change: -1.2,
    avatar: '#eab308',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 75,
    price: 378.91,
    value: 28418,
    change: 3.8,
    avatar: '#9333ea',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 30,
    price: 242.84,
    value: 7285,
    change: 5.4,
    avatar: '#f97316',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 40,
    price: 178.35,
    value: 7134,
    change: 1.9,
    avatar: '#3b82f6',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 60,
    price: 495.22,
    value: 29713,
    change: 7.2,
    avatar: '#10b981',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    shares: 45,
    price: 484.03,
    value: 21781,
    change: -0.8,
    avatar: '#ec4899',
  },
];

// Mock data for Financial Health
const FINANCIAL_HEALTH_DATA = [
  { label: 'P/E Ratio', value: '32.4', change: 1.5, rating: 4.2 },
  { label: 'Revenue Growth', value: '18.7%', change: 3.2, rating: 4.5 },
  { label: 'Profit Margin', value: '24.3%', change: 2.1, rating: 4.0 },
  { label: 'Debt to Equity', value: '0.58', change: -1.2, rating: 4.3 },
  { label: 'Current Ratio', value: '1.85', change: 0.8, rating: 3.8 },
  { label: 'ROE', value: '42.1%', change: 5.4, rating: 4.7 },
];

// Mock data for Market Intelligence
const MARKET_INTELLIGENCE_DATA = [
  { title: 'Tech sector shows strong momentum amid AI revolution', source: 'Bloomberg', time: '2 hours ago', sentiment: 'positive', rating: 4.5 },
  { title: 'Portfolio diversification reduces risk by 23% in Q1', source: 'Financial Times', time: '5 hours ago', sentiment: 'positive', rating: 4.2 },
  { title: 'Analyst consensus: Buy rating on 6 of 7 holdings', source: 'Reuters', time: '1 day ago', sentiment: 'positive', rating: 4.8 },
  { title: 'Cloud computing growth accelerates across portfolio', source: 'TechCrunch', time: '2 days ago', sentiment: 'positive', rating: 4.3 },
];

// Mock data for Social Insights
const SOCIAL_INSIGHTS_DATA = [
  { platform: 'X (Twitter)', author: '@MarketExpert', content: 'This portfolio composition is solid! Strong mix of growth and value stocks 📈', views: '12.4K', time: '3 hours ago', rating: 4.6 },
  { platform: 'Reddit', author: 'u/InvestmentPro', content: 'Detailed analysis of why this tech-heavy portfolio will outperform in 2026', views: '8.9K', time: '1 day ago', rating: 4.4 },
  { platform: 'YouTube', author: 'Finance Channel', content: 'Portfolio Review: The Perfect Balance of Risk and Reward', views: '24.2K', time: '2 days ago', rating: 4.7 },
  { platform: 'X (Twitter)', author: '@WallStreetDaily', content: 'These holdings are positioned perfectly for the next market cycle', views: '15.8K', time: '4 hours ago', rating: 4.5 },
];

export function PortfolioAssessment() {
  const [showStocks, setShowStocks] = useState(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem('portfolioStocksVisible');
    return stored === 'true';
  });

  useEffect(() => {
    // Persist to localStorage whenever it changes
    localStorage.setItem('portfolioStocksVisible', String(showStocks));
  }, [showStocks]);

  const handleAddFile = () => {
    setShowStocks(true);
  };

  // Calculate chart data from stocks
  const totalValue = DEFAULT_STOCKS.reduce((sum, stock) => sum + stock.value, 0);
  const chartData = DEFAULT_STOCKS.map(stock => ({
    label: stock.symbol,
    name: stock.name,
    value: stock.value,
    percentage: parseFloat(((stock.value / totalValue) * 100).toFixed(1)),
    color: stock.avatar,
  }));

  // Calculate risk number (simple example based on portfolio diversity and volatility)
  const calculateRiskNumber = () => {
    const avgChange = DEFAULT_STOCKS.reduce((sum, stock) => sum + Math.abs(stock.change), 0) / DEFAULT_STOCKS.length;
    const riskScore = Math.min(10, Math.max(1, avgChange * 1.2));
    return parseFloat(riskScore.toFixed(1));
  };

  const riskNumber = calculateRiskNumber();

  // Helper function to render star rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-slate-300 dark:text-slate-600" />);
      }
    }
    
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <div className="h-full flex flex-col dark:bg-[#121212]">
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          <PieChartSection 
            onAddFile={handleAddFile} 
            title="Portfolio Assessment"
            data={showStocks ? chartData : undefined}
            totalValue={showStocks ? totalValue : undefined}
            riskNumber={showStocks ? riskNumber : undefined}
          />
          {showStocks && <StocksTable stocks={DEFAULT_STOCKS} />}
          
          {/* Financial Health Section */}
          {showStocks && (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d]">
              <h2 className="text-xl text-slate-900 dark:text-slate-100 mb-4">Financial Health</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FINANCIAL_HEALTH_DATA.map((metric, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-[#2d2d2d] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{metric.label}</p>
                      {renderStars(metric.rating)}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{metric.value}</p>
                      <span className={`text-sm ${metric.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {metric.change >= 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Intelligence Section */}
          {showStocks && (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d]">
              <h2 className="text-xl mb-4 text-slate-900 dark:text-slate-100">Market Intelligence</h2>
              <div className="space-y-3">
                {MARKET_INTELLIGENCE_DATA.map((newsItem, index) => (
                  <div
                    key={index}
                    className="block bg-slate-50 dark:bg-[#2d2d2d] rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-[#3d3d3d] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{newsItem.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span>{newsItem.source}</span>
                          <span>•</span>
                          <span>{newsItem.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStars(newsItem.rating)}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          newsItem.sentiment === 'positive' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {newsItem.sentiment}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Insights Section */}
          {showStocks && (
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d]">
              <h2 className="text-xl mb-4 text-slate-900 dark:text-slate-100">Social Insights</h2>
              <div className="space-y-3">
                {SOCIAL_INSIGHTS_DATA.map((post, index) => (
                  <div
                    key={index}
                    className="block bg-slate-50 dark:bg-[#2d2d2d] rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-[#3d3d3d] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                        {post.platform[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900 dark:text-slate-100">{post.author}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">• {post.platform}</span>
                          </div>
                          {renderStars(post.rating)}
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mb-2">{post.content}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                            {post.views}
                          </span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}