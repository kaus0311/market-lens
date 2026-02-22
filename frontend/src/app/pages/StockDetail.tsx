import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Layers, Heart } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  change: number;
  avatar: string;
}

// Stock data repository
const STOCK_DATA: { [key: string]: Stock } = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    price: 175.43,
    value: 17543,
    change: 2.5,
    avatar: '#c53030',
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 50,
    price: 140.23,
    value: 7011,
    change: -1.2,
    avatar: '#eab308',
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 75,
    price: 378.91,
    value: 28418,
    change: 3.8,
    avatar: '#9333ea',
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 30,
    price: 242.84,
    value: 7285,
    change: 5.4,
    avatar: '#f97316',
  },
  AMZN: {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 40,
    price: 178.35,
    value: 7134,
    change: 1.9,
    avatar: '#3b82f6',
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 60,
    price: 495.22,
    value: 29713,
    change: 7.2,
    avatar: '#10b981',
  },
  META: {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    shares: 45,
    price: 484.03,
    value: 21781,
    change: -0.8,
    avatar: '#ec4899',
  },
};

// Function to generate stock-specific mock data
const getFinancialMetrics = (symbol: string) => {
  const baseMetrics: { [key: string]: any } = {
    AAPL: [
      { label: 'Market Cap', value: '$2.8T', change: 2.3 },
      { label: 'P/E Ratio', value: '28.5', change: -1.2 },
      { label: 'Revenue', value: '$394.3B', change: 8.1 },
      { label: 'Net Income', value: '$96.9B', change: 5.4 },
      { label: 'EPS', value: '$6.13', change: 6.2 },
      { label: 'Dividend Yield', value: '0.52%', change: 0.1 },
    ],
    GOOGL: [
      { label: 'Market Cap', value: '$1.7T', change: 3.1 },
      { label: 'P/E Ratio', value: '25.3', change: 0.8 },
      { label: 'Revenue', value: '$307.4B', change: 12.4 },
      { label: 'Net Income', value: '$73.8B', change: 9.2 },
      { label: 'EPS', value: '$5.80', change: 7.8 },
      { label: 'Dividend Yield', value: '0.00%', change: 0.0 },
    ],
    MSFT: [
      { label: 'Market Cap', value: '$2.9T', change: 4.2 },
      { label: 'P/E Ratio', value: '35.7', change: 1.5 },
      { label: 'Revenue', value: '$211.9B', change: 11.2 },
      { label: 'Net Income', value: '$72.4B', change: 8.9 },
      { label: 'EPS', value: '$9.68', change: 9.1 },
      { label: 'Dividend Yield', value: '0.78%', change: 0.2 },
    ],
    TSLA: [
      { label: 'Market Cap', value: '$770.5B', change: 8.4 },
      { label: 'P/E Ratio', value: '65.2', change: -3.1 },
      { label: 'Revenue', value: '$96.8B', change: 18.8 },
      { label: 'Net Income', value: '$14.9B', change: 15.3 },
      { label: 'EPS', value: '$4.73', change: 14.2 },
      { label: 'Dividend Yield', value: '0.00%', change: 0.0 },
    ],
    AMZN: [
      { label: 'Market Cap', value: '$1.5T', change: 2.7 },
      { label: 'P/E Ratio', value: '52.8', change: -2.3 },
      { label: 'Revenue', value: '$574.8B', change: 9.4 },
      { label: 'Net Income', value: '$30.4B', change: 12.1 },
      { label: 'EPS', value: '$2.95', change: 11.8 },
      { label: 'Dividend Yield', value: '0.00%', change: 0.0 },
    ],
    NVDA: [
      { label: 'Market Cap', value: '$1.2T', change: 12.5 },
      { label: 'P/E Ratio', value: '72.4', change: 4.2 },
      { label: 'Revenue', value: '$60.9B', change: 125.9 },
      { label: 'Net Income', value: '$29.8B', change: 288.2 },
      { label: 'EPS', value: '$12.04', change: 285.4 },
      { label: 'Dividend Yield', value: '0.03%', change: 0.0 },
    ],
    META: [
      { label: 'Market Cap', value: '$1.2T', change: 5.8 },
      { label: 'P/E Ratio', value: '29.3', change: -1.8 },
      { label: 'Revenue', value: '$134.9B', change: 15.7 },
      { label: 'Net Income', value: '$39.1B', change: 35.2 },
      { label: 'EPS', value: '$14.87', change: 37.4 },
      { label: 'Dividend Yield', value: '0.00%', change: 0.0 },
    ],
  };
  
  return baseMetrics[symbol] || baseMetrics.AAPL;
};

const getNewsData = (symbol: string, name: string) => {
  const newsTemplates: { [key: string]: any[] } = {
    AAPL: [
      { title: 'Apple unveils new iPhone lineup with advanced AI features', source: 'TechCrunch', time: '2 hours ago', sentiment: 'positive', url: 'https://techcrunch.com/apple-iphone-ai' },
      { title: 'Apple services revenue hits all-time high in Q4', source: 'Bloomberg', time: '5 hours ago', sentiment: 'positive', url: 'https://bloomberg.com/apple-services' },
      { title: 'Analysts bullish on Apple ahead of product event', source: 'Reuters', time: '1 day ago', sentiment: 'positive', url: 'https://reuters.com/apple-analysts' },
      { title: 'Apple stock reaches new 52-week high on strong demand', source: 'Wall Street Journal', time: '2 days ago', sentiment: 'positive', url: 'https://wsj.com/apple-stock' },
    ],
    GOOGL: [
      { title: 'Google announces breakthrough in quantum computing', source: 'Nature', time: '3 hours ago', sentiment: 'positive', url: 'https://nature.com/google-quantum' },
      { title: 'Alphabet ad revenue exceeds expectations in latest quarter', source: 'Financial Times', time: '6 hours ago', sentiment: 'positive', url: 'https://ft.com/alphabet-revenue' },
      { title: 'Google Cloud gains market share against AWS', source: 'Bloomberg', time: '1 day ago', sentiment: 'positive', url: 'https://bloomberg.com/google-cloud' },
      { title: 'Regulatory concerns loom over Google search dominance', source: 'Reuters', time: '2 days ago', sentiment: 'neutral', url: 'https://reuters.com/google-regulation' },
    ],
    MSFT: [
      { title: 'Microsoft Azure revenue surges 30% year-over-year', source: 'Bloomberg', time: '1 hour ago', sentiment: 'positive', url: 'https://bloomberg.com/microsoft-azure' },
      { title: 'GitHub Copilot adoption accelerates among developers', source: 'TechCrunch', time: '4 hours ago', sentiment: 'positive', url: 'https://techcrunch.com/github-copilot' },
      { title: 'Microsoft announces major AI partnership expansion', source: 'Reuters', time: '1 day ago', sentiment: 'positive', url: 'https://reuters.com/microsoft-ai' },
      { title: 'Windows 11 market share continues steady growth', source: 'ZDNet', time: '3 days ago', sentiment: 'positive', url: 'https://zdnet.com/windows-11' },
    ],
    TSLA: [
      { title: 'Tesla deliveries beat estimates for fifth consecutive quarter', source: 'Reuters', time: '2 hours ago', sentiment: 'positive', url: 'https://reuters.com/tesla-deliveries' },
      { title: 'New Gigafactory construction ahead of schedule', source: 'Bloomberg', time: '5 hours ago', sentiment: 'positive', url: 'https://bloomberg.com/tesla-gigafactory' },
      { title: 'Tesla energy storage business shows strong growth', source: 'Electrek', time: '1 day ago', sentiment: 'positive', url: 'https://electrek.co/tesla-energy' },
      { title: 'Musk announces timeline for next-generation vehicle platform', source: 'TechCrunch', time: '2 days ago', sentiment: 'neutral', url: 'https://techcrunch.com/tesla-vehicle' },
    ],
    AMZN: [
      { title: 'Amazon Prime Day sets new sales records globally', source: 'CNBC', time: '3 hours ago', sentiment: 'positive', url: 'https://cnbc.com/amazon-prime-day' },
      { title: 'AWS maintains cloud infrastructure market leadership', source: 'Forbes', time: '6 hours ago', sentiment: 'positive', url: 'https://forbes.com/aws-leadership' },
      { title: 'Amazon logistics network expansion continues in Asia', source: 'Wall Street Journal', time: '1 day ago', sentiment: 'positive', url: 'https://wsj.com/amazon-logistics' },
      { title: 'Amazon invests $4B in AI startup Anthropic', source: 'TechCrunch', time: '2 days ago', sentiment: 'positive', url: 'https://techcrunch.com/amazon-anthropic' },
    ],
    NVDA: [
      { title: 'NVIDIA announces next-generation GPU architecture', source: 'AnandTech', time: '1 hour ago', sentiment: 'positive', url: 'https://anandtech.com/nvidia-gpu' },
      { title: 'Data center revenue triples as AI demand soars', source: 'Bloomberg', time: '4 hours ago', sentiment: 'positive', url: 'https://bloomberg.com/nvidia-datacenter' },
      { title: 'NVIDIA partners with major automakers for AI chips', source: 'Reuters', time: '1 day ago', sentiment: 'positive', url: 'https://reuters.com/nvidia-automotive' },
      { title: 'Record earnings driven by generative AI boom', source: 'Financial Times', time: '3 days ago', sentiment: 'positive', url: 'https://ft.com/nvidia-earnings' },
    ],
    META: [
      { title: 'Meta Reality Labs unveils new VR headset lineup', source: 'The Verge', time: '2 hours ago', sentiment: 'positive', url: 'https://theverge.com/meta-vr' },
      { title: 'Instagram Threads reaches 150 million monthly users', source: 'TechCrunch', time: '5 hours ago', sentiment: 'positive', url: 'https://techcrunch.com/instagram-threads' },
      { title: 'Meta AI assistant integration expands across platforms', source: 'Bloomberg', time: '1 day ago', sentiment: 'positive', url: 'https://bloomberg.com/meta-ai' },
      { title: 'Advertising revenue rebounds with improved targeting', source: 'AdAge', time: '2 days ago', sentiment: 'positive', url: 'https://adage.com/meta-advertising' },
    ],
  };
  
  return newsTemplates[symbol] || newsTemplates.AAPL;
};

const getSocialPosts = (symbol: string, name: string) => {
  const socialTemplates: { [key: string]: any[] } = {
    AAPL: [
      { platform: 'X (Twitter)', author: '@TechAnalyst', content: `${name} continues to dominate premium smartphone market. Ecosystem strength is unmatched! 📱`, views: '3.2K', time: '2 hours ago', url: 'https://twitter.com/techanalyst/status/123' },
      { platform: 'YouTube', author: 'Tech Review Daily', content: `Why ${symbol} is Still the King of Consumer Tech in 2026`, views: '24K', time: '1 day ago', url: 'https://youtube.com/watch?v=abc123' },
      { platform: 'Reddit', author: 'u/AppleInvestor', content: 'Detailed breakdown of services revenue growth - the real story behind the stock price', views: '1.5K', time: '3 days ago', url: 'https://reddit.com/r/stocks/comments/abc123' },
      { platform: 'X (Twitter)', author: '@WallStreetPro', content: `${symbol} price target raised to $220 following earnings beat`, views: '5.8K', time: '4 hours ago', url: 'https://twitter.com/wallstreetpro/status/456' },
    ],
    GOOGL: [
      { platform: 'X (Twitter)', author: '@AIResearcher', content: `Google's latest AI model is game-changing. ${symbol} severely undervalued right now. 🚀`, views: '4.1K', time: '3 hours ago', url: 'https://twitter.com/airesearcher/status/789' },
      { platform: 'YouTube', author: 'Finance Explained', content: `${symbol}: The Most Underrated FAANG Stock? Deep Dive Analysis`, views: '18K', time: '1 day ago', url: 'https://youtube.com/watch?v=def456' },
      { platform: 'Reddit', author: 'u/TechInvestor', content: 'Google Cloud is finally getting the recognition it deserves - margin expansion incoming', views: '2.1K', time: '2 days ago', url: 'https://reddit.com/r/investing/comments/def456' },
      { platform: 'X (Twitter)', author: '@MarketInsider', content: `Multiple analysts upgrade ${symbol} on cloud momentum`, views: '6.2K', time: '5 hours ago', url: 'https://twitter.com/marketinsider/status/101' },
    ],
    MSFT: [
      { platform: 'X (Twitter)', author: '@CloudExpert', content: `${name} Azure growth is phenomenal. Enterprise adoption accelerating faster than expected! ☁️`, views: '2.8K', time: '1 hour ago', url: 'https://twitter.com/cloudexpert/status/112' },
      { platform: 'YouTube', author: 'Investment Channel', content: `${symbol}: Why It's the Safest Big Tech Investment Right Now`, views: '32K', time: '1 day ago', url: 'https://youtube.com/watch?v=ghi789' },
      { platform: 'Reddit', author: 'u/DividendKing', content: 'MSFT dividend increase + buyback announcement = shareholder friendly', views: '1.8K', time: '2 days ago', url: 'https://reddit.com/r/dividends/comments/ghi789' },
      { platform: 'X (Twitter)', author: '@TechNews', content: `${symbol} AI integrations driving massive enterprise contract wins`, views: '7.5K', time: '3 hours ago', url: 'https://twitter.com/technews/status/131' },
    ],
    TSLA: [
      { platform: 'X (Twitter)', author: '@EVAnalyst', content: `${name} production efficiency improvements are insane. Margins expanding! 🔋`, views: '8.9K', time: '2 hours ago', url: 'https://twitter.com/evanalyst/status/141' },
      { platform: 'YouTube', author: 'EV Revolution', content: `${symbol} vs Competition: Who's Really Winning the EV Race?`, views: '45K', time: '1 day ago', url: 'https://youtube.com/watch?v=jkl012' },
      { platform: 'Reddit', author: 'u/TeslaLongTerm', content: 'Energy storage business alone could be worth more than legacy automakers', views: '3.4K', time: '1 day ago', url: 'https://reddit.com/r/teslainvestorsclub/comments/jkl012' },
      { platform: 'X (Twitter)', author: '@InvestDaily', content: `${symbol} delivery numbers crush expectations for Q4`, views: '12K', time: '4 hours ago', url: 'https://twitter.com/investdaily/status/151' },
    ],
    AMZN: [
      { platform: 'X (Twitter)', author: '@RetailWatch', content: `${name} logistics network is a competitive moat that can't be replicated. Bullish! 📦`, views: '2.4K', time: '3 hours ago', url: 'https://twitter.com/retailwatch/status/161' },
      { platform: 'YouTube', author: 'Stock Analysis Pro', content: `${symbol}: Breaking Down the AWS Dominance Story`, views: '21K', time: '2 days ago', url: 'https://youtube.com/watch?v=mno345' },
      { platform: 'Reddit', author: 'u/CloudInvestor', content: 'AWS operating margins are criminally underappreciated by the market', views: '1.9K', time: '3 days ago', url: 'https://reddit.com/r/stocks/comments/mno345' },
      { platform: 'X (Twitter)', author: '@MarketBull', content: `${symbol} e-commerce + cloud combo is unstoppable`, views: '4.7K', time: '5 hours ago', url: 'https://twitter.com/marketbull/status/171' },
    ],
    NVDA: [
      { platform: 'X (Twitter)', author: '@AIChipExpert', content: `${name} GPU demand is unprecedented. Every AI company needs their chips! 🚀💎`, views: '15K', time: '1 hour ago', url: 'https://twitter.com/aichipexpert/status/181' },
      { platform: 'YouTube', author: 'Tech & Finance', content: `${symbol}: The Pick and Shovel of the AI Gold Rush`, views: '67K', time: '1 day ago', url: 'https://youtube.com/watch?v=pqr678' },
      { platform: 'Reddit', author: 'u/SemiconductorBull', content: 'NVDA data center revenue growth is parabolic - this is generational', views: '5.2K', time: '2 days ago', url: 'https://reddit.com/r/wallstreetbets/comments/pqr678' },
      { platform: 'X (Twitter)', author: '@ChipAnalysis', content: `${symbol} backlog extends into 2027. Pricing power intact.`, views: '9.8K', time: '3 hours ago', url: 'https://twitter.com/chipanalysis/status/191' },
    ],
    META: [
      { platform: 'X (Twitter)', author: '@SocialMediaPro', content: `${name} cost discipline + AI ads = margin expansion. ${symbol} headed higher! 📈`, views: '3.6K', time: '2 hours ago', url: 'https://twitter.com/socialmediapro/status/201' },
      { platform: 'YouTube', author: 'Digital Marketing Hub', content: `${symbol}: How Meta Turned Around Its Business in 2025-2026`, views: '28K', time: '1 day ago', url: 'https://youtube.com/watch?v=stu901' },
      { platform: 'Reddit', author: 'u/AdTechInvestor', content: 'Meta AI advertising platform is printing money - ROAS improvements incredible', views: '2.7K', time: '2 days ago', url: 'https://reddit.com/r/investing/comments/stu901' },
      { platform: 'X (Twitter)', author: '@SocialTech', content: `${symbol} Reality Labs losses shrinking faster than expected`, views: '6.1K', time: '4 hours ago', url: 'https://twitter.com/socialtech/status/211' },
    ],
  };
  
  return socialTemplates[symbol] || socialTemplates.AAPL;
};

export function StockDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const stockSymbol = params.symbol || 'AAPL';
  const stock = STOCK_DATA[stockSymbol] || {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 100,
    price: 175.43,
    value: 17543,
    change: 2.5,
    avatar: '#c53030',
  };

  const financialMetrics = getFinancialMetrics(stock.symbol);
  const news = getNewsData(stock.symbol, stock.name);
  const socialPosts = getSocialPosts(stock.symbol, stock.name);

  // Calculate ratings for each section
  const financialHealthRating = 8.0; // Sample rating for Financial Health
  const marketIntelligenceRating = 9.0; // Sample rating for Market Intelligence
  const socialInsightsRating = 7.5; // Sample rating for Social Insights

  return (
    <div className="h-full flex flex-col dark:bg-[#121212]">
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-[#2d2d2d] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
            <div className="flex items-center gap-4 flex-1">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-medium"
                style={{ backgroundColor: stock.avatar }}
              >
                {stock.symbol.substring(0, 2)}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl text-slate-900 dark:text-slate-100">{stock.name}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-slate-600 dark:text-slate-400">{stock.symbol}</p>
                  <span className="text-slate-400 dark:text-slate-500">•</span>
                  <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">${stock.price.toFixed(2)}</p>
                  <span className={`flex items-center gap-1 text-lg ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stock.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Risk Score</p>
                <p className="text-4xl font-semibold text-slate-900 dark:text-slate-100">3.2</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-5 border border-slate-200 dark:border-[#2d2d2d]">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Total Value</span>
              </div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">${stock.value.toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-5 border border-slate-200 dark:border-[#2d2d2d]">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Shares Owned</span>
              </div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{stock.shares}</p>
            </div>
            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-5 border border-slate-200 dark:border-[#2d2d2d]">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Average Cost</span>
              </div>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">${(stock.value / stock.shares).toFixed(2)}</p>
            </div>
          </div>

          {/* Financial Health */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d]">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-sm font-semibold">
                {financialHealthRating}/10
              </span>
              <h2 className="text-xl text-slate-900 dark:text-slate-100">Financial Health</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {financialMetrics.map((metric, index) => (
                <div key={index} className="bg-slate-50 dark:bg-[#2d2d2d] rounded-lg p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{metric.label}</p>
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

          {/* Market Intelligence */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d]">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-sm font-semibold">
                {marketIntelligenceRating}/10
              </span>
              <h2 className="text-xl text-slate-900 dark:text-slate-100">Market Intelligence</h2>
            </div>
            <div className="space-y-3">
              {news.map((newsItem, index) => (
                <a
                  key={index}
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-50 dark:bg-[#2d2d2d] rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-[#3d3d3d] transition-colors"
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
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      newsItem.sentiment === 'positive' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {newsItem.sentiment}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Social Insights */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border border-slate-200 dark:border-[#2d2d2d]">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-sm font-semibold">
                {socialInsightsRating}/10
              </span>
              <h2 className="text-xl text-slate-900 dark:text-slate-100">Social Insights</h2>
            </div>
            <div className="space-y-3">{socialPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-50 dark:bg-[#2d2d2d] rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-[#3d3d3d] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                      {post.platform[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{post.author}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">• {post.platform}</span>
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
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}