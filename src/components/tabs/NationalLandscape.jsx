import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts'

const NationalLandscape = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading - in real app, this would come from API or JSON file
    const mockData = {
      national: {
        totalPopulation: 336986394,
        totalGenZ: 32367764,
        benchmark: 9.61
      },
      topCities: [
        { name: 'Gainesville', population: 328087, genZ: 49251, percentage: 15.01, index: 156.3 },
        { name: 'Waco-Temple-Bryan', population: 1184360, genZ: 146847, percentage: 12.40, index: 129.1 },
        { name: 'Mankato', population: 109697, genZ: 13592, percentage: 12.39, index: 129.0 },
        { name: 'Idaho Falls-Pocatello', population: 444441, genZ: 53193, percentage: 11.97, index: 124.6 },
        { name: 'Laredo', population: 286005, genZ: 34169, percentage: 11.95, index: 124.4 },
        { name: 'Charlottesville', population: 208199, genZ: 24821, percentage: 11.92, index: 124.1 },
        { name: 'Lubbock', population: 472532, genZ: 55703, percentage: 11.79, index: 122.7 },
        { name: 'Lafayette, IN', population: 120544, genZ: 14168, percentage: 11.75, index: 122.4 },
        { name: 'Tallahassee-Thomasville', population: 757429, genZ: 88524, percentage: 11.69, index: 121.7 },
        { name: 'Harrisonburg', population: 256443, genZ: 29922, percentage: 11.67, index: 121.5 }
      ],
      distribution: [
        { name: 'Gen Z Females', value: 32367764, color: '#B19CD9' },
        { name: 'Other Population', value: 304618630, color: '#E6E6FA' }
      ]
    }
    
    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <div className="loading">Loading national landscape data...</div>
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '10px',
          border: '1px solid #B19CD9',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ fontWeight: 'bold', color: '#9370DB' }}>{label}</p>
          <p style={{ color: '#666' }}>
            Population: {payload[0].value.toLocaleString()}
          </p>
          <p style={{ color: '#666' }}>
            Gen Z: {payload[0].payload.genZ?.toLocaleString() || 'N/A'}
          </p>
        </div>
      )
    }
    return null
  }

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
          <h2 className="card-title">The National Landscape</h2>
          <p className="card-subtitle">
            Understanding the national context of Gen Z female population distribution across the United States
          </p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="kpi-grid"
      >
        <div className="kpi-card">
          <div className="kpi-value">{data.national.benchmark}%</div>
          <div className="kpi-label">National Benchmark</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">32.4M</div>
          <div className="kpi-label">Gen Z Females</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">336.9M</div>
          <div className="kpi-label">Total Population</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">210</div>
          <div className="kpi-label">Cities Analyzed</div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* National Distribution Donut Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="chart-container"
        >
          <h3 className="chart-title">National Population Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.distribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {data.distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
            The national benchmark of 9.61% represents the average concentration of Gen Z females across all US ZIP codes, 
            serving as our baseline for identifying high-potential markets.
          </p>
        </motion.div>

        {/* Top Cities Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="chart-container"
        >
          <h3 className="chart-title">Top 10 Cities vs National Benchmark</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topCities.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E6FA" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="percentage" 
                fill="#B19CD9"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
            Gainesville leads with 15.01% Gen Z concentration, 56% above the national average. 
            University cities consistently outperform the benchmark.
          </p>
        </motion.div>
      </div>

      {/* Scatter Plot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="chart-container"
      >
        <h3 className="chart-title">City Size vs Gen Z Concentration</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={data.topCities}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E6FA" />
            <XAxis 
              type="number" 
              dataKey="population" 
              name="Population"
              scale="log"
              domain={['dataMin', 'dataMax']}
            />
            <YAxis 
              type="number" 
              dataKey="percentage" 
              name="Gen Z %"
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => [
                name === 'Population' ? value.toLocaleString() : `${value}%`,
                name === 'Population' ? 'Population' : 'Gen Z %'
              ]}
            />
            <Scatter 
              dataKey="percentage" 
              fill="#B19CD9"
              fillOpacity={0.6}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
          No clear correlation between city size and Gen Z concentration. Both large metros and smaller cities 
          can achieve high Gen Z concentrations, suggesting location-specific factors are more important than size.
        </p>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="card-title">Key Insights</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: '#9370DB', marginBottom: '0.5rem' }}>National Benchmark</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              The 9.61% national benchmark represents 32.4 million Gen Z females out of 336.9 million total population, 
              providing a critical baseline for market analysis and opportunity identification.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#9370DB', marginBottom: '0.5rem' }}>Market Opportunity</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Cities exceeding the benchmark by 20%+ (Index ≥120) represent high-potential markets for Gen Z-focused 
              marketing strategies and product positioning.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#9370DB', marginBottom: '0.5rem' }}>Geographic Distribution</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Gen Z concentration varies significantly by region and city type, with university cities and specific 
              geographic regions showing consistent patterns of higher concentration.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NationalLandscape

