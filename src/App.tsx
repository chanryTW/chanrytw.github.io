import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const StoryPage = lazy(() => import('./pages/StoryPage').then(module => ({ default: module.StoryPage })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#030014] flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      <p className="mt-4 text-cyan-400 font-mono text-sm tracking-widest">LOADING...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<StoryPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;