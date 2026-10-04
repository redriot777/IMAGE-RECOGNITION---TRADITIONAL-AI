import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Features = () => {
  const { analysisResult } = useAnalysis();
  const navigate = useNavigate();

  if (!analysisResult) {
    return (
      <div className="empty-state">
        <BarChart2 size={64} />
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>No image has been analyzed yet.</h2>
        <button className="btn" onClick={() => navigate('/analyze')}>Go to Analyze</button>
      </div>
    );
  }

  const { features, facts } = analysisResult;

  const getInterpretation = (featureName) => {
    const fact = facts.find(f => f.source === featureName);
    return fact ? fact.fact.split('_').pop().toUpperCase() : 'N/A';
  };

  const featureGroups = [
    {
      title: 'Intensity Features',
      items: [
        { label: 'Average Brightness', value: features.average_brightness.toFixed(3), interpretation: getInterpretation('Average Brightness') },
        { label: 'Dark Pixel Ratio', value: features.dark_pixel_ratio.toFixed(3), interpretation: getInterpretation('Dark Pixel Ratio') },
        { label: 'Bright Pixel Ratio', value: features.bright_pixel_ratio.toFixed(3), interpretation: 'N/A' },
      ]
    },
    {
      title: 'Structural & Contrast Features',
      items: [
        { label: 'Overall Contrast', value: features.overall_contrast.toFixed(3), interpretation: getInterpretation('Overall Contrast') },
        { label: 'Edge Density', value: features.edge_density.toFixed(3), interpretation: getInterpretation('Edge Density') },
        { label: 'Horizontal Edges', value: features.horizontal_edge_density.toFixed(3), interpretation: getInterpretation('Horizontal Edge Density') || 'N/A' },
        { label: 'Vertical Edges', value: features.vertical_edge_density.toFixed(3), interpretation: getInterpretation('Vertical Edge Density') || 'N/A' },
      ]
    },
    {
      title: 'Spatial Features (Regions)',
      items: [
        { label: 'Top Region Brightness', value: features.top_region_brightness.toFixed(3), interpretation: getInterpretation('Top Region Brightness') },
        { label: 'Center Brightness', value: features.center_brightness.toFixed(3), interpretation: getInterpretation('Center Brightness') },
        { label: 'Bottom Region Brightness', value: features.bottom_region_brightness.toFixed(3), interpretation: getInterpretation('Bottom Region Brightness') },
        { label: 'Border Brightness', value: features.border_brightness.toFixed(3), interpretation: getInterpretation('Border Brightness') },
      ]
    }
  ];

  return (
    <div>
      <h1 className="page-title">Feature Analysis</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Numerical measurements (features) are extracted from the preprocessed image using handcrafted mathematical functions. 
        These numbers are then converted into symbolic interpretations (e.g., HIGH, LOW) for the AI engine.
      </p>

      <div className="grid-cols-3">
        {featureGroups.map((group, idx) => (
          <div key={idx} className="glass-panel">
            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>
              {group.title}
            </h3>
            
            <table style={{ width: '100%', fontSize: '0.9rem' }}>
              <tbody>
                {group.items.map((item, i) => (
                  <tr key={i}>
                    <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>{item.label}</td>
                    <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>{item.value}</td>
                    <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>
                      {item.interpretation !== 'N/A' && (
                        <span className="badge">{item.interpretation}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
