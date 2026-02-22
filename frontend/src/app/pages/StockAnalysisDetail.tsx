import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Layers } from 'lucide-react';

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

const getFinancialMetrics = (symbol: string) => {
  const metrics: { [key: string]: any[] } = {
    AAPL: [
      { label: 'Market Cap', value: '$2.8T', change: 2.3 },
      { label: 'P/E Ratio', value: '28.5', change: -0.5 },
      { label: 'EPS', value: '$6.15', change: 8.2 },
      { label: 'Revenue', value: '$383B', change: 5.4 },
      { label: 'Profit Margin', value: '25.3%', change: 1.2 },
      { label: 'ROE', value: '147%', change: 3.1 },
    ],
    GOOGL: [
      { label: 'Market Cap', value: '$1.7T', change: 1.8 },
      { label: 'P/E Ratio', value: '24.2', change: -1.2 },
      { label: 'EPS', value: '$5.80', change: 12.4 },
      { label: 'Revenue', value: '$307B', change: 8.7 },
      { label: 'Profit Margin', value: '21.2%', change: 2.3 },
      { label: 'ROE', value: '28.5%', change: 1.9 },
    ],
    MSFT: [
      { label: 'Market Cap', value: '$2.9T', change: 3.2 },
      { label: 'P/E Ratio', value: '32.1', change: 0.8 },
      { label: 'EPS', value: '$11.86', change: 15.2 },
      { label: 'Revenue', value: '$227B', change: 12.1 },
      { label: 'Profit Margin', value: '36.7%', change: 3.4 },
      { label: 'ROE', value: '42.8%', change: 2.7 },
    ],
    TSLA: [
      { label: 'Market Cap', value: '$770B', change: 8.5 },
      { label: 'P/E Ratio', value: '65.4', change: -2.1 },
      { label: 'EPS', value: '$3.71', change: 22.5 },
      { label: 'Revenue', value: '$96.8B', change: 18.8 },
      { label: 'Profit Margin', value: '15.5%', change: 4.2 },
      { label: 'ROE', value: '28.2%', change: 5.1 },
    ],
    AMZN: [
      { label: 'Market Cap', value: '$1.5T', change: 2.1 },
      { label: 'P/E Ratio', value: '52.3', change: -1.5 },
      { label: 'EPS', value: '$3.41', change: 18.7 },
      { label: 'Revenue', value: '$574B', change: 9.4 },
      { label: 'Profit Margin', value: '6.3%', change: 2.1 },
      { label: 'ROE', value: '21.7%', change: 3.8 },
    ],
    NVDA: [
      { label: 'Market Cap', value: '$1.2T', change: 12.3 },
      { label: 'P/E Ratio', value: '68.2', change: 2.4 },
      { label: 'EPS', value: '$7.26', change: 128.5 },
      { label: 'Revenue', value: '$60.9B', change: 125.9 },
      { label: 'Profit Margin', value: '53.4%', change: 18.2 },
      { label: 'ROE', value: '115%', change: 45.2 },
    ],
    META: [
      { label: 'Market Cap', value: '$1.2T', change: 1.7 },
      { label: 'P/E Ratio', value: '26.8', change: -0.9 },
      { label: 'EPS', value: '$18.07', change: 35.4 },
      { label: 'Revenue', value: '$134B', change: 15.7 },
      { label: 'Profit Margin', value: '29.4%', change: 8.9 },
      { label: 'ROE', value: '36.2%', change: 11.3 },
    ],
  };

  return metrics[symbol] || metrics.AAPL;
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
      { platform: 'X (Twitter)', author: '@TechAnalyst', content: `${name} continues to dominate premium smartphone market. Ecosystem strength is unmatched! 📱`, views: '32K', time: '2 hours ago', url: 'https://twitter.com/techanalyst/status/123', sentiment: 'positive' },
      { platform: 'YouTube', author: 'Tech Review Daily', content: `Why ${symbol} is Still the King of Consumer Tech in 2026`, views: '240K', time: '1 day ago', url: 'https://youtube.com/watch?v=abc123', sentiment: 'positive' },
      { platform: 'Reddit', author: 'u/AppleInvestor', content: 'Detailed breakdown of services revenue growth - the real story behind the stock price', views: '15K', time: '3 days ago', url: 'https://reddit.com/r/stocks/comments/abc123', sentiment: 'positive' },
      { platform: 'X (Twitter)', author: '@WallStreetPro', content: `${symbol} price target raised to $220 following earnings beat`, views: '58K', time: '4 hours ago', url: 'https://twitter.com/wallstreetpro/status/456', sentiment: 'positive' },
    ],
    GOOGL: [
      { platform: 'X (Twitter)', author: '@AIResearcher', content: `Google's latest AI model is game-changing. ${symbol} severely undervalued right now. 🚀`, views: '41K', time: '3 hours ago', url: 'https://twitter.com/airesearcher/status/789', sentiment: 'positive' },
      { platform: 'YouTube', author: 'Finance Explained', content: `${symbol}: The Most Underrated FAANG Stock? Deep Dive Analysis`, views: '180K', time: '1 day ago', url: 'https://youtube.com/watch?v=def456', sentiment: 'positive' },
      { platform: 'Reddit', author: 'u/TechInvestor', content: 'Google Cloud is finally getting the recognition it deserves - margin expansion incoming', views: '21K', time: '2 days ago', url: 'https://reddit.com/r/investing/comments/def456', sentiment: 'positive' },
      { platform: 'X (Twitter)', author: '@MarketInsider', content: `Multiple analysts upgrade ${symbol} on cloud momentum`, views: '62K', time: '5 hours ago', url: 'https://twitter.com/marketinsider/status/101', sentiment: 'neutral' },
    ],
    MSFT: [
      { platform: 'X (Twitter)', author: '@CloudExpert', content: `${name} Azure growth is phenomenal. Enterprise adoption accelerating faster than expected! ☁️`, views: '28K', time: '1 hour ago', url: 'https://twitter.com/cloudexpert/status/112', sentiment: 'positive' },
      { platform: 'YouTube', author: 'Investment Channel', content: `${symbol}: Why It's the Safest Big Tech Investment Right Now`, views: '320K', time: '1 day ago', url: 'https://youtube.com/watch?v=ghi789', sentiment: 'positive' },
      { platform: 'Reddit', author: 'u/DividendKing', content: 'MSFT dividend increase + buyback announcement = shareholder friendly', views: '18K', time: '2 days ago', url: 'https://reddit.com/r/dividends/comments/ghi789', sentiment: 'positive' },
      { platform: 'X (Twitter)', author: '@TechNews', content: `${symbol} AI integrations driving massive enterprise contract wins`, views: '75K', time: '3 hours ago', url: 'https://twitter.com/technews/status/131', sentiment: 'positive' },
    ],
    TSLA: [
      { platform: 'X (Twitter)', author: '@EVAnalyst', content: `${name} production efficiency improvements are insane. Margins expanding! 🔋`, views: '89K', time: '2 hours ago', url: 'https://twitter.com/evanalyst/status/141', sentiment: 'positive' },
      { platform: 'YouTube', author: 'EV Revolution', content: `${symbol} vs Competition: Who's Really Winning the EV Race?`, views: '450K', time: '1 day ago', url: 'https://youtube.com/watch?v=jkl012', sentiment: 'neutral' },
      { platform: 'Reddit', author: 'u/TeslaLongTerm', content: 'Energy storage business alone could be worth more than legacy automakers', views: '34K', time: '1 day ago', url: 'https://reddit.com/r/teslainvestorsclub/comments/jkl012', sentiment: 'positive' },
      { platform: 'X (Twitter)', author: '@InvestDaily', content: `${symbol} delivery numbers crush expectations for Q4`, views: '120K', time: '4 hours ago', url: 'https://twitter.com/investdaily/status/151', sentiment: 'positive' },
    ],
    AMZN: [
      { platform: 'X (Twitter)', author: '@RetailWatch', content: `${name} logistics network is a competitive moat that can't be replicated. Bullish! 📦`, views: '24K', time: '3 hours ago', url: 'https://twitter.com/retailwatch/status/161', sentiment: 'positive' },
      { platform: 'YouTube', author: 'Stock Analysis Pro', content: `${symbol}: Breaking Down the AWS Dominance Story`, views: '210K', time: '2 days ago', url: 'https://youtube.com/watch?v=mno345', sentiment: 'positive' },
      { platform: 'Reddit', author: 'u/CloudInvestor', content: 'AWS operating margins are criminally underappreciated by the market', views: '19K', time: '3 days ago', url: 'https://reddit.com/r/stocks/comments/mno345', sentiment: 'positive' },
      { platform: 'X (Twitter)', author: '@MarketBull', content: `${symbol} e-commerce + cloud combo is unstoppable`, views: '47K', time: '5 hours ago', url: 'https://twitter.com/marketbull/status/171', sentiment: 'positive' },
    ],
    NVDA: [
      { platform: 'X (Twitter)', author: '@AIChipExpert', content: `${name} GPU demand is unprecedented. Every AI company needs their chips! 🚀💎`, views: '150K', time: '1 hour ago', url: 'https://twitter.com/aichipexpert/status/181', sentiment: 'positive' },
      { platform: 'YouTube', author: 'Tech & Finance', content: `${symbol}: The Pick and Shovel of the AI Gold Rush`, views: '670K', time: '1 day ago', url: 'https://youtube.com/watch?v=pqr678', sentiment: 'positive' },
      { platform: 'Reddit', author: 'u/SemiconductorBull', content: 'NVDA data center revenue growth is parabolic - this is generational', views: '52K', time: '2 days ago', url: 'https://reddit.com/r/wallstreetbets/comments/pqr678', sentiment: 'positive' },
      { platform: 'X (Twitter)', author: '@ChipAnalysis', content: `${symbol} backlog extends into 2027. Pricing power intact.`, views: '98K', time: '3 hours ago', url: 'https://twitter.com/chipanalysis/status/191', sentiment: 'positive' },
    ],
    META: [
      { platform: 'X (Twitter)', author: '@SocialMediaPro', content: `${name} cost discipline + AI ads = margin expansion. ${symbol} headed higher! 📈`, views: '36K', time: '2 hours ago', url: 'https://twitter.com/socialmediapro/status/201', sentiment: 'positive' },
      { platform: 'YouTube', author: 'Digital Marketing Hub', content: `${symbol}: How Meta Turned Around Its Business in 2025-2026`, views: '280K', time: '1 day ago', url: 'https://youtube.com/watch?v=stu901', sentiment: 'positive' },
      { platform: 'Reddit', author: 'u/AdTechInvestor', content: 'Meta AI advertising platform is printing money - ROAS improvements incredible', views: '27K', time: '2 days ago', url: 'https://reddit.com/r/investing/comments/stu901', sentiment: 'positive' },
      { platform: 'X (Twitter)', author: '@SocialTech', content: `${symbol} Reality Labs losses shrinking faster than expected`, views: '61K', time: '4 hours ago', url: 'https://twitter.com/socialtech/status/211', sentiment: 'neutral' },
    ],
  };
  
  return socialTemplates[symbol] || socialTemplates.AAPL;
};

const getSectionRatings = (symbol: string) => {
  const ratings: { [key: string]: { financial: number; market: number; social: number } } = {
    AAPL: { financial: 8, market: 9, social: 9 },
    GOOGL: { financial: 7, market: 8, social: 7 },
    MSFT: { financial: 9, market: 9, social: 8 },
    TSLA: { financial: 6, market: 8, social: 9 },
    AMZN: { financial: 7, market: 8, social: 8 },
    NVDA: { financial: 10, market: 10, social: 9 },
    META: { financial: 7, market: 7, social: 8 },
  };
  
  return ratings[symbol] || ratings.AAPL;
};

const getRiskScore = (symbol: string) => {
  const riskScores: { [key: string]: number } = {
    AAPL: 3.2,
    GOOGL: 4.1,
    MSFT: 2.8,
    TSLA: 7.5,
    AMZN: 4.3,
    NVDA: 5.6,
    META: 5.2,
  };
  
  return riskScores[symbol] || 5.0;
};

const getRatingColor = (rating: number) => {
  if (rating >= 8) return 'text-green-600 dark:text-green-400';
  if (rating >= 5) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

const getRatingBgColor = (rating: number) => {
  if (rating >= 8) return 'bg-green-100 dark:bg-green-900/30';
  if (rating >= 5) return 'bg-yellow-100 dark:bg-yellow-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
};

export function StockAnalysisDetail() {
  const navigate = useNavigate();
  const params = useParams<{ symbol: string }>();

  const stock = params.symbol ? STOCK_DATA[params.symbol] : STOCK_DATA.AAPL;

  const financialMetrics = getFinancialMetrics(stock.symbol);
  const news = getNewsData(stock.symbol, stock.name);
  const socialPosts = getSocialPosts(stock.symbol, stock.name);
  const ratings = getSectionRatings(stock.symbol);
  const riskScore = getRiskScore(stock.symbol);

  const handleBack = () => {
    navigate('/stock-analysis', { replace: false });
  };

  return (
    <div className="h-full flex flex-col dark:bg-[#121212]">
      <div className="flex-1 overflow-auto p-8">
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
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
              <div className="bg-slate-100 dark:bg-[#2d2d2d] rounded-lg px-4 py-2">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Risk Score</div>
                <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{riskScore.toFixed(1)}</div>
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
              <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${getRatingBgColor(ratings.financial)} ${getRatingColor(ratings.financial)}`}>
                {ratings.financial}/10
              </div>
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
              <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${getRatingBgColor(ratings.market)} ${getRatingColor(ratings.market)}`}>
                {ratings.market}/10
              </div>
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
                        : newsItem.sentiment === 'negative'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
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
              <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${getRatingBgColor(ratings.social)} ${getRatingColor(ratings.social)}`}>
                {ratings.social}/10
              </div>
              <h2 className="text-xl text-slate-900 dark:text-slate-100">Social Insights</h2>
            </div>
            <div className="space-y-3">
              {socialPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-50 dark:bg-[#2d2d2d] rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-[#3d3d3d] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
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
                          <span>👁️ {post.views} views</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                      post.sentiment === 'positive' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : post.sentiment === 'negative'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {post.sentiment}
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