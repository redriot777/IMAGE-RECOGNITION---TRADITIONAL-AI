import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Search, Database, Layers, BarChart2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Traditional AI Image Recognition
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span className="badge success">Explainable AI</span>
          <span className="badge">Symbolic Reasoning</span>
          <span className="badge warning">No Machine Learning</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          An educational laboratory demonstrating explicit knowledge representation, handcrafted visual features, and deterministic forward-chaining reasoning for scene classification.
        </p>
        
        <div style={{ marginTop: '3rem' }}>
          <Link to="/analyze" className="btn" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            <Search size={24} />
            Start Analysis
          </Link>
        </div>
      </header>

      <section className="glass-panel" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent-cyan)' }}>The Reasoning Pipeline</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
          <PipelineStep icon={<Search />} title="Image Preprocessing" />
          <ArrowRight color="var(--text-muted)" />
          <PipelineStep icon={<BarChart2 />} title="Feature Extraction" />
          <ArrowRight color="var(--text-muted)" />
          <PipelineStep icon={<Database />} title="Knowledge Base" />
          <ArrowRight color="var(--text-muted)" />
          <PipelineStep icon={<BrainCircuit />} title="Rule Engine" />
          <ArrowRight color="var(--text-muted)" />
          <PipelineStep icon={<Layers />} title="Classification" />
        </div>
      </section>

      <div className="grid-cols-2">
        <div className="glass-panel">
          <h3 style={{ color: 'var(--accent-cyan)' }}>What is Traditional AI?</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Unlike modern neural networks that learn patterns from vast datasets, Traditional (Symbolic) AI uses explicit, human-defined rules. Knowledge is represented as symbolic facts, and conclusions are reached through logical inference engines.
          </p>
        </div>
        <div className="glass-panel">
          <h3 style={{ color: 'var(--accent-cyan)' }}>Why it matters</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            This approach offers 100% explainability. Every classification can be traced back to the specific visual measurements, symbolic facts, and production rules that triggered it, making it an excellent educational tool for understanding AI fundamentals.
          </p>
        </div>
      </div>
    </div>
  );
};


const PipelineStep = ({ icon, title }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '120px' }}>
    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', padding: '1rem', borderRadius: '50%', marginBottom: '0.75rem' }}>
      {icon}
    </div>
    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{title}</span>
  </div>
);

export default Home;
