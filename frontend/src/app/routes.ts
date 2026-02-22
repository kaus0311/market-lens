import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { PortfolioAssessment } from './pages/PortfolioAssessment';
import { StockAnalysis } from './pages/StockAnalysis';
import { StockDetail } from './pages/StockDetail';
import { StockAnalysisDetail } from './pages/StockAnalysisDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: PortfolioAssessment },
      { path: 'stock-analysis', Component: StockAnalysis },
      { path: 'stock/:symbol', Component: StockDetail },
      { path: 'stock-analysis/:symbol', Component: StockAnalysisDetail },
    ],
  },
]);