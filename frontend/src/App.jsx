import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Preprocessing from './pages/Preprocessing';
import Features from './pages/Features';
import KnowledgeBase from './pages/KnowledgeBase';
import Rules from './pages/Rules';
import Reasoning from './pages/Reasoning';
import Results from './pages/Results';
import About from './pages/About';
import BatchAnalysis from './pages/BatchAnalysis';

const App = () => {
  return (
    <AnalysisProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/preprocessing" element={<Preprocessing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/reasoning" element={<Reasoning />} />
              <Route path="/results" element={<Results />} />
              <Route path="/about" element={<About />} />
              <Route path="/batch" element={<BatchAnalysis />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AnalysisProvider>
  );
};

export default App;
