import React from 'react';

const About = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="page-title">About Traditional AI</h1>
      
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>What is Traditional (Symbolic) AI?</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-muted)' }}>
          Traditional AI, often called Symbolic AI or Good Old-Fashioned AI (GOFAI), relies on explicit, human-defined rules rather than learning from massive datasets. It represents knowledge directly through logic, symbols, and production rules.
        </p>
        <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
          In this project, instead of passing an image into a convolutional neural network (like ResNet) to "learn" what a scene looks like, we manually measure visual properties, categorize those measurements into symbolic facts, and apply logical IF-THEN rules to deduce the scene type.
        </p>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Traditional AI vs. Machine Learning</h2>
        
        <table style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Feature</th>
              <th style={{ color: 'var(--accent-cyan)' }}>Traditional AI (This Project)</th>
              <th style={{ color: 'var(--text-muted)' }}>Machine Learning (Modern AI)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Knowledge Source</td>
              <td>Explicitly programmed by humans</td>
              <td>Learned automatically from data</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Reasoning</td>
              <td>Deterministic logic (IF-THEN rules)</td>
              <td>Probabilistic model parameters</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Explainability</td>
              <td>100% transparent and traceable</td>
              <td>Often a "black box"</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Training Data</td>
              <td>Not required</td>
              <td>Requires massive labeled datasets</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Feature Extraction</td>
              <td>Handcrafted (e.g., Canny edges, contrast)</td>
              <td>Learned implicitly (e.g., CNN filters)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="glass-panel">
        <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Architecture</h2>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', fontFamily: 'monospace', lineHeight: '2' }}>
          <div style={{ color: 'var(--success)' }}>User Upload</div>
          ↓<br/>
          <div style={{ color: 'var(--accent-blue)' }}>Image Preprocessing (OpenCV)</div>
          ↓<br/>
          <div style={{ color: 'var(--accent-blue)' }}>Feature Extraction (NumPy)</div>
          ↓<br/>
          <div style={{ color: 'var(--warning)' }}>Knowledge Representation</div>
          ↓<br/>
          <div style={{ color: 'var(--warning)' }}>Knowledge Base & Working Memory</div>
          ↓<br/>
          <div style={{ color: '#a855f7' }}>Rule Engine & Forward Chaining</div>
          ↓<br/>
          <div style={{ color: 'var(--success)' }}>Classification & Explanation</div>
        </div>
      </div>
    </div>
  );
};

export default About;
