import React from 'react'
import { motion } from 'framer-motion'

const Methodology = () => {
  const methodologySteps = [
    {
      step: 1,
      title: "Data Collection & Processing",
      description: "Analyzed 29,381 ZIP codes across 210 DMAs (Designated Market Areas) containing population and Gen Z female demographic data.",
      details: [
        "Total population: 336,986,394",
        "Total Gen Z females: 32,367,764",
        "Age groups: 15-19, 20-24, 25-29",
        "Geographic coverage: All US states and territories"
      ]
    },
    {
      step: 2,
      title: "National Benchmark Calculation",
      description: "Established the national baseline for Gen Z female concentration across all ZIP codes.",
      formula: "National Benchmark = (Total Gen Z Females / Total Population) × 100",
      result: "9.61%",
      details: [
        "This benchmark serves as the reference point for all comparisons",
        "Any market above 9.61% has higher-than-average Gen Z concentration",
        "Markets below 9.61% have lower-than-average concentration"
      ]
    },
    {
      step: 3,
      title: "DMA-Level Index Calculation",
      description: "Calculated concentration indices for each city (DMA) by aggregating ZIP code data.",
      formula: "DMA Index = (DMA Gen Z % / National Benchmark) × 100",
      example: "Gainesville: (15.01% / 9.61%) × 100 = 156.3",
      details: [
        "Index of 100 = exactly at national average",
        "Index > 120 = high-potential market",
        "Index > 150 = exceptional opportunity"
      ]
    },
    {
      step: 4,
      title: "ZIP Code Analysis",
      description: "Individual ZIP code analysis for granular market targeting and geographic clustering.",
      formula: "ZIP Index = (ZIP Gen Z % / National Benchmark) × 100",
      details: [
        "Identifies specific high-concentration areas within cities",
        "Enables precise geographic targeting",
        "Reveals clustering patterns and market density"
      ]
    },
    {
      step: 5,
      title: "Regional & Demographic Segmentation",
      description: "Advanced analysis by geographic regions, city types, and age demographics within Gen Z.",
      details: [
        "Regional patterns and cultural factors",
        "University city vs. non-university city analysis",
        "Age distribution within Gen Z (15-19, 20-24, 25-29)",
        "Market size categorization and opportunity assessment"
      ]
    }
  ]

  const concentrationLevels = [
    { level: "Very High", range: "≥130", description: "Exceptional opportunity markets", count: 1, example: "Gainesville (156.3)" },
    { level: "High", range: "120-129", description: "High-potential markets", count: 10, example: "Waco-Temple-Bryan (129.1)" },
    { level: "Medium-High", range: "110-119", description: "Above-average markets", count: 13, example: "Salt Lake City (118.7)" },
    { level: "Medium", range: "100-109", description: "Average markets", count: 64, example: "Dallas-Ft. Worth (104.2)" },
    { level: "Medium-Low", range: "90-99", description: "Below-average markets", count: 88, example: "Los Angeles (99.5)" },
    { level: "Low", range: "<90", description: "Low-concentration markets", count: 34, example: "Alpena (67.0)" }
  ]

  const dataQuality = [
    { metric: "Total ZIP Codes", value: "29,381", description: "Complete coverage of US postal codes" },
    { metric: "DMAs Analyzed", value: "210", description: "All major metropolitan areas" },
    { metric: "Population Coverage", value: "99.8%", description: "Nearly complete US population" },
    { metric: "Data Accuracy", value: "2024", description: "Most recent demographic data" }
  ]

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card"
      >
        <div className="card-header">
          <h2 className="card-title">The Methodology</h2>
          <p className="card-subtitle">
            How we calculated indices, identified opportunities, and analyzed Gen Z female population distribution
          </p>
        </div>
      </motion.div>

      {/* Data Quality Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="kpi-grid"
      >
        {dataQuality.map((item, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-value">{item.value}</div>
            <div className="kpi-label">{item.metric}</div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              {item.description}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Methodology Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="card-title">Analysis Process</h3>
          <p className="card-subtitle">Step-by-step methodology for calculating Gen Z concentration indices</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {methodologySteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
                borderRadius: '12px',
                border: '1px solid #E6E6FA'
              }}
            >
              <div style={{
                background: '#B19CD9',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {step.step}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#9370DB', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                  {step.title}
                </h4>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  {step.description}
                </p>
                
                {step.formula && (
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #E6E6FA',
                    marginBottom: '1rem'
                  }}>
                    <strong style={{ color: '#9370DB' }}>Formula:</strong>
                    <code style={{
                      display: 'block',
                      background: '#f8f9ff',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      marginTop: '0.5rem',
                      fontFamily: 'monospace',
                      color: '#2d3748'
                    }}>
                      {step.formula}
                    </code>
                    {step.result && (
                      <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#9370DB' }}>
                        Result: {step.result}
                      </div>
                    )}
                    {step.example && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                        Example: {step.example}
                      </div>
                    )}
                  </div>
                )}
                
                <ul style={{ color: '#666', fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
                  {step.details.map((detail, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Concentration Levels Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="card-title">Concentration Level Categories</h3>
          <p className="card-subtitle">How we categorize markets based on their Gen Z concentration index</p>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Index Range</th>
                <th>Description</th>
                <th>Count</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {concentrationLevels.map((level, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 'bold', color: '#9370DB' }}>
                    {level.level}
                  </td>
                  <td style={{ fontFamily: 'monospace', background: '#f8f9ff' }}>
                    {level.range}
                  </td>
                  <td>{level.description}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {level.count}
                  </td>
                  <td style={{ fontSize: '0.9rem', color: '#666' }}>
                    {level.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="card-title">Methodology Insights</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: '#9370DB', marginBottom: '0.5rem' }}>Index Interpretation</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              The index system allows for easy comparison across markets. An index of 120 means that market 
              has 20% higher Gen Z concentration than the national average, making it a high-potential target.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#9370DB', marginBottom: '0.5rem' }}>Statistical Significance</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              With 29,381 ZIP codes analyzed, our findings are statistically robust and representative of 
              the entire US population, providing reliable insights for strategic decision-making.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#9370DB', marginBottom: '0.5rem' }}>Practical Application</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              This methodology enables precise geographic targeting, market prioritization, and resource 
              allocation for Gen Z-focused marketing campaigns and product launches.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Methodology

