import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { getImageUrl } from '../api';

const Preprocessing = () => {
  const { analysisResult } = useAnalysis();
  const navigate = useNavigate();

  if (!analysisResult) {
    return (
      <div className="empty-state">
        <ImageIcon size={64} />
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No image has been analyzed yet.</h2>
        <button className="btn" onClick={() => navigate('/analyze')}>Go to Analyze</button>
      </div>
    );
  }

  const { preprocessing_urls } = analysisResult;

  const steps = [
    {
      id: 'original',
      title: 'Original Image',
      url: preprocessing_urls.original,
      desc: 'The input image uploaded by the user.'
    },
    {
      id: 'resized',
      title: 'Resized Image',
      url: preprocessing_urls.resized,
      desc: 'Resized to 400x300. Standardizing size ensures that edge density and spatial grid calculations are consistent across all inputs.'
    },
    {
      id: 'grayscale',
      title: 'Grayscale Conversion',
      url: preprocessing_urls.grayscale,
      desc: 'Simplifies the image into intensity information so that brightness-related rules can operate on measurable scalar values instead of RGB vectors.'
    },
    {
      id: 'blurred',
      title: 'Gaussian Blur',
      url: preprocessing_urls.blurred,
      desc: 'Applies Gaussian smoothing to reduce high-frequency noise, preventing false edge detections in textured areas.'
    },
    {
      id: 'threshold',
      title: 'Threshold Map',
      url: preprocessing_urls.threshold,
      desc: 'Binarizes the image (black/white) to easily measure the ratio of very bright vs. dark pixels for contrast analysis.'
    },
    {
      id: 'edges',
      title: 'Canny Edge Map',
      url: preprocessing_urls.edges,
      desc: 'Detects structural outlines. Crucial for measuring edge density and identifying structural or textured scenes.'
    }
  ];

  return (
    <div>
      <h1 className="page-title">Image Preprocessing</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Preprocessing prepares the raw image for handcrafted feature extraction. Note: Preprocessing itself is not "AI". It is standard computer vision preparing data for the reasoning engine.
      </p>

      <div className="card-grid">
        {steps.map(step => (
          <div key={step.id} className="glass-panel">
            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
              {step.title}
            </h3>
            <img 
              src={getImageUrl(step.url)} 
              alt={step.title} 
              style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#000', borderRadius: '0.5rem', marginBottom: '1rem' }} 
            />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preprocessing;
