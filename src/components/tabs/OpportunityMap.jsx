import React from 'react'
import { motion } from 'framer-motion'

const OpportunityMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="card-header">
        <h2 className="card-title">Opportunity Map</h2>
        <p className="card-subtitle">Coming soon - Interactive geographic analysis</p>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>This section will feature an interactive map with purple translucent heat overlay showing Gen Z concentration by ZIP code.</p>
      </div>
    </motion.div>
  )
}

export default OpportunityMap

