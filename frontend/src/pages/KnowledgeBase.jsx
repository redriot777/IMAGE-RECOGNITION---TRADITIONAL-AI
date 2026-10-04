import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const KnowledgeBase = () => {
  const { analysisResult } = useAnalysis();
  const navigate = useNavigate();

  if (!analysisResult) {
    return (
      <div className="empty-state">
        <Database size={64} />
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No image has been analyzed yet.</h2>
        <button className="btn" onClick={() => navigate('/analyze')}>Go to Analyze</button>
      </div>
    );
  }

  const { facts, working_memory } = analysisResult;

  return (
    <div>
      <h1 className="page-title">Knowledge Base & Working Memory</h1>
      
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Working Memory</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Working memory holds all currently known symbolic facts. This includes initial facts derived from numerical features, plus any new facts inferred by the rule engine.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {working_memory.map((fact, i) => (
            <span key={i} className="badge" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              {fact}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-panel">
        <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Generated Initial Facts</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          This table shows exactly how numerical measurements became explicit symbolic knowledge based on human-defined thresholds.
        </p>
        
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Fact ID</th>
                <th>Symbolic Fact</th>
                <th>Source Feature</th>
                <th>Actual Value</th>
                <th>Threshold Condition</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {facts.map((fact, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text-muted)' }}>{fact.id}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{fact.fact}</td>
                  <td>{fact.source}</td>
                  <td>{fact.value.toFixed(3)}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{fact.condition}</td>
                  <td><span className="badge success">{fact.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
