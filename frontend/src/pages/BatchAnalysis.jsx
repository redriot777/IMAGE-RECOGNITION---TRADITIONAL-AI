import React, { useState } from 'react';
import { Layers, Upload, Loader } from 'lucide-react';
import { analyzeBatch } from '../api';
import { useAnalysis } from '../context/AnalysisContext';
import { useNavigate } from 'react-router-dom';

const BatchAnalysis = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  
  const { setAnalysisResult } = useAnalysis();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 5); // Limit to 5
      setFiles(selectedFiles);
    }
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const batchResults = await analyzeBatch(files);
      setResults(batchResults);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Batch analysis failed.');
    }
  };

  const viewDetails = (result) => {
    if (result.error) return;
    setAnalysisResult(result);
    navigate('/results');
  };

  return (
    <div>
      <h1 className="page-title">Batch Analysis</h1>
      
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Upload 2-5 images to compare their Traditional AI classifications side-by-side.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="file" 
            multiple 
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            id="batch-upload"
            style={{ display: 'none' }}
          />
          <button className="btn btn-secondary" onClick={() => document.getElementById('batch-upload').click()}>
            <Upload size={18} /> Select Images (Max 5)
          </button>
          
          <span style={{ color: 'var(--text-muted)' }}>
            {files.length} file(s) selected
          </span>
          
          {files.length > 0 && (
            <button className="btn" onClick={handleAnalyze} disabled={loading}>
              {loading ? <Loader className="lucide-spin" size={18} /> : <Layers size={18} />}
              {loading ? 'Analyzing...' : 'Analyze Batch'}
            </button>
          )}
        </div>
        
        {error && <div style={{ color: 'var(--error)', marginTop: '1rem' }}>{error}</div>}
      </div>

      {results.length > 0 && (
        <div className="glass-panel">
          <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Batch Results</h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Classification</th>
                  <th>Brightness</th>
                  <th>Dark Ratio</th>
                  <th>Edge Density</th>
                  <th>Fired Rules</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, i) => (
                  <tr key={i}>
                    <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {res.filename}
                    </td>
                    {res.error ? (
                      <td colSpan="6" style={{ color: 'var(--error)' }}>{res.error}</td>
                    ) : (
                      <>
                        <td style={{ fontWeight: 'bold', color: 'var(--success)' }}>{res.classification.primary}</td>
                        <td>{res.features.average_brightness.toFixed(3)}</td>
                        <td>{res.features.dark_pixel_ratio.toFixed(3)}</td>
                        <td>{res.features.edge_density.toFixed(3)}</td>
                        <td>{res.fired_rules.length}</td>
                        <td>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                            onClick={() => viewDetails(res)}
                          >
                            View
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchAnalysis;
