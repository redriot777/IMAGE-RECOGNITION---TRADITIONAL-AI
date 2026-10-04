import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Search, ArrowRight } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Results = () => {
  const { analysisResult } = useAnalysis();
  const navigate = useNavigate();

  if (!analysisResult) {
    return (
      <div className="empty-state">
        <Target size={64} />
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No image has been analyzed yet.</h2>
        <button className="btn" onClick={() => navigate('/analyze')}>Go to Analyze</button>
      </div>
    );
  }

  const { classification, explanation, fired_rules, features } = analysisResult;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="page-title">Analysis Results</h1>

      <div className="glass-panel" style={{ marginBottom: '2rem', textAlign: 'center', borderColor: 'var(--accent-cyan)' }}>
        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
          Primary Classification
        </h3>
        <h1 style={{ fontSize: '3rem', color: 'var(--success)', margin: '0 0 1rem 0' }}>
          {classification.primary}
        </h1>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Rule Support:</span>
          <span style={{ fontWeight: 'bold' }}>{classification.support_level} ({classification.score})</span>
        </div>
      </div>

      <div className="grid-cols-2" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Supporting Classifications</h3>
          {classification.supporting.length > 0 ? (
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)' }}>
              {classification.supporting.map((c, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{c}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No alternative classifications were strongly supported.</p>
          )}
        </div>

        <div className="glass-panel">
          <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Key Evidence</h3>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Brightness: {features.average_brightness.toFixed(3)}</li>
            <li style={{ marginBottom: '0.5rem' }}>Dark Ratio: {features.dark_pixel_ratio.toFixed(3)}</li>
            <li style={{ marginBottom: '0.5rem' }}>Edge Density: {features.edge_density.toFixed(3)}</li>
            <li style={{ marginBottom: '0.5rem' }}>Contrast: {features.overall_contrast.toFixed(3)}</li>
          </ul>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Human-Readable Explanation</h3>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem', color: 'var(--text-main)' }}>
          {explanation}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/reasoning')}>
          View Reasoning Trace <ArrowRight size={18} />
        </button>
        <button className="btn" onClick={() => navigate('/analyze')}>
          <Search size={18} /> Analyze Another Image
        </button>
      </div>
    </div>
  );
};

export default Results;
