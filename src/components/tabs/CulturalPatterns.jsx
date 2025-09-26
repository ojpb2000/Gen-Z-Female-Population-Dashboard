import React from 'react'
import { motion } from 'framer-motion'

const CulturalPatterns = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="card-header">
        <h2 className="card-title">Cultural Patterns</h2>
        <p className="card-subtitle">Coming soon - Deep insights and cultural analysis</p>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>This section will reveal cultural and demographic patterns in Gen Z distribution across different regions and city types.</p>
      </div>
    </motion.div>
  )
}

export default CulturalPatterns

