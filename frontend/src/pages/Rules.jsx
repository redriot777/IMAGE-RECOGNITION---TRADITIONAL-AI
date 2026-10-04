import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, CheckCircle, XCircle } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Rules = () => {
  const { analysisResult } = useAnalysis();
  const navigate = useNavigate();

  if (!analysisResult) {
    return (
      <div className="empty-state">
        <Settings size={64} />
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No image has been analyzed yet.</h2>
        <button className="btn" onClick={() => navigate('/analyze')}>Go to Analyze</button>
      </div>
    );
  }

  const { all_rules, fired_rules, failed_rules } = analysisResult;
  
  const firedRuleIds = fired_rules.map(r => r.id);

  return (
    <div>
      <h1 className="page-title">Rule Engine</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        The Rule Engine contains manually designed IF-THEN rules. During forward chaining, the engine evaluates each rule's conditions against the Working Memory.
      </p>

      <div className="card-grid">
        {all_rules.map(rule => {
          const isFired = firedRuleIds.includes(rule.id);
          const failedDetails = failed_rules.find(r => r.id === rule.id);
          
          return (
            <div key={rule.id} className="glass-panel" style={{ 
              borderColor: isFired ? 'rgba(16, 185, 129, 0.3)' : 'var(--panel-border)',
              boxShadow: isFired ? '0 4px 20px rgba(16, 185, 129, 0.1)' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: isFired ? 'var(--success)' : 'var(--text-muted)', margin: 0 }}>
                  Rule {rule.id}
                </h3>
                {isFired ? (
                  <span className="badge success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle size={14} /> FIRED
                  </span>
                ) : (
                  <span className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: 0.7 }}>
                    <XCircle size={14} /> NOT FIRED
                  </span>
                )}
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '0.5rem' }}>IF:</div>
                <ul style={{ listStyleType: 'none', paddingLeft: '1rem', margin: '0 0 1rem 0' }}>
                  {rule.conditions.map((cond, i) => {
                    let statusIcon = null;
                    if (failedDetails) {
                      const c = failedDetails.conditions.find(cd => cd.fact === cond);
                      statusIcon = c && c.satisfied ? 
                        <span style={{ color: 'var(--success)', marginLeft: '0.5rem' }}>✓</span> : 
                        <span style={{ color: 'var(--error)', marginLeft: '0.5rem' }}>✗</span>;
                    } else if (isFired) {
                      statusIcon = <span style={{ color: 'var(--success)', marginLeft: '0.5rem' }}>✓</span>;
                    }
                    
                    return (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>
                        {cond}
                        {i < rule.conditions.length - 1 && <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>AND</span>}
                        {statusIcon}
                      </li>
                    );
                  })}
                </ul>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '0.5rem' }}>THEN:</div>
                <div style={{ paddingLeft: '1rem', fontWeight: 'bold' }}>{rule.conclusion}</div>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isFired ? (
                  <span style={{ color: 'var(--text-main)' }}>{rule.explanation}</span>
                ) : failedDetails ? (
                  <span style={{ color: 'var(--error)' }}>Reason: Condition failed.</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rules;
