import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GitMerge, ArrowDown } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Reasoning = () => {
  const { analysisResult } = useAnalysis();
  const navigate = useNavigate();

  if (!analysisResult) {
    return (
      <div className="empty-state">
        <GitMerge size={64} />
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No image has been analyzed yet.</h2>
        <button className="btn" onClick={() => navigate('/analyze')}>Go to Analyze</button>
      </div>
    );
  }

  const { trace, facts, features, classification } = analysisResult;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="page-title" style={{ textAlign: 'center' }}>HOW DID THE SYSTEM REACH THIS ANSWER?</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
        Complete deterministic forward-chaining trace. No hidden probabilities. No black box.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        
        {/* Step 1 */}
        <div className="glass-panel" style={{ width: '100%' }}>
          <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>STEP 1 — IMAGE OBSERVATION</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Avg Brightness:</span> {features.average_brightness.toFixed(3)}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Dark Ratio:</span> {features.dark_pixel_ratio.toFixed(3)}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Edge Density:</span> {features.edge_density.toFixed(3)}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Contrast:</span> {features.overall_contrast.toFixed(3)}
            </div>
          </div>
        </div>

        <ArrowDown color="var(--accent-cyan)" size={32} />

        {/* Step 2 */}
        <div className="glass-panel" style={{ width: '100%' }}>
          <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>STEP 2 — SYMBOLIC FACTS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {facts.map((f, i) => (
              <span key={i} className="badge">{f.fact}</span>
            ))}
          </div>
        </div>

        {trace.map((step, idx) => (
          <React.Fragment key={idx}>
            <ArrowDown color="var(--accent-cyan)" size={32} />
            
            <div className="glass-panel" style={{ width: '100%', borderLeft: '4px solid var(--success)' }}>
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                STEP {3 + (idx * 3)} — RULE EVALUATION
              </h3>
              <div style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                Checking Rule <strong>{step.rule_id}</strong>: 
                IF {step.conditions.map(c => c.fact).join(' AND ')}
              </div>
              
              <div style={{ marginLeft: '1rem', marginBottom: '1rem', color: 'var(--success)' }}>
                All conditions satisfied.
              </div>

              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                STEP {4 + (idx * 3)} — RULE FIRED
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                Rule <strong>{step.rule_id}</strong> FIRED.
              </div>

              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                STEP {5 + (idx * 3)} — NEW FACT
              </h3>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>{step.conclusion}</span> added to working memory.
              </div>
            </div>
          </React.Fragment>
        ))}

        <ArrowDown color="var(--accent-cyan)" size={32} />

        {/* Final Step */}
        <div className="glass-panel" style={{ width: '100%', textAlign: 'center', borderColor: 'var(--accent-cyan)', boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}>
          <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
            FINAL CLASSIFICATION
          </h3>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', margin: 0 }}>
            {classification.primary}
          </h1>
        </div>

      </div>
    </div>
  );
};

export default Reasoning;
