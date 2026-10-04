import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, Loader, ArrowRight } from 'lucide-react';
import { analyzeImage } from '../api';
import { useAnalysis } from '../context/AnalysisContext';

const Analyze = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState([]);
  const { setAnalysisResult } = useAnalysis();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError(null);
      setProgress([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError(null);
      setProgress([]);
    }
  };

  const addProgress = (msg) => {
    setProgress(prev => [...prev, msg]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    setProgress([]);
    
    try {
      addProgress('Image received...');
      setTimeout(() => addProgress('Preprocessing...'), 400);
      setTimeout(() => addProgress('Extracting features...'), 800);
      setTimeout(() => addProgress('Building symbolic knowledge...'), 1200);
      setTimeout(() => addProgress('Evaluating rules & Forward chaining...'), 1600);
      setTimeout(() => addProgress('Generating explanation...'), 2000);

      const result = await analyzeImage(file);
      
      setAnalysisResult(result);
      
      setTimeout(() => {
        setLoading(false);
      }, 2400);
      
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Analysis failed. Make sure backend is running.');
    }
  };

  const { analysisResult } = useAnalysis();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="page-title">Analyze Image</h1>
      
      {!loading && !analysisResult && (
        <div 
          className="glass-panel" 
          style={{ 
            border: '2px dashed var(--panel-border)', 
            textAlign: 'center', 
            padding: '4rem 2rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <input 
            id="file-upload" 
            type="file" 
            accept=".jpg,.jpeg,.png" 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
          
          {preview ? (
            <div>
              <img src={preview} alt="Preview" style={{ maxHeight: '300px', borderRadius: '0.5rem', marginBottom: '1rem' }} />
              <div style={{ color: 'var(--text-muted)' }}>
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </div>
            </div>
          ) : (
            <div>
              <Upload size={48} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Upload or drag an image</h3>
              <p style={{ color: 'var(--text-muted)' }}>Supports JPG, JPEG, PNG</p>
            </div>
          )}
        </div>
      )}

      {file && !loading && !analysisResult && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button className="btn" onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}>
            Analyze Image <ArrowRight size={18} />
          </button>
        </div>
      )}

      {error && (
        <div className="glass-panel" style={{ marginTop: '2rem', borderLeft: '4px solid var(--error)' }}>
          <h4 style={{ color: 'var(--error)' }}>Error</h4>
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="glass-panel" style={{ marginTop: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
            <Loader className="lucide-spin" /> Analyzing Image...
          </h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {progress.map((msg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> {msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {analysisResult && !loading && (
        <div className="glass-panel" style={{ marginTop: '2rem' }}>
          <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem' }}>Analysis Complete</h2>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <img src={preview} alt="Original" style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '0.5rem' }} />
            
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Primary Classification</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>
                  {analysisResult.classification.primary}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rule Support</div>
                  <div style={{ fontWeight: '500' }}>{analysisResult.classification.support_level}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rules Fired</div>
                  <div style={{ fontWeight: '500' }}>{analysisResult.fired_rules.length}</div>
                </div>
              </div>
              
              <button className="btn" onClick={() => navigate('/results')}>
                View Detailed Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyze;
