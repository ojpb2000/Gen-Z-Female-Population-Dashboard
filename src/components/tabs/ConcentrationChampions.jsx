import React from 'react'
import { motion } from 'framer-motion'

const ConcentrationChampions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="card-header">
        <h2 className="card-title">Concentration Champions</h2>
        <p className="card-subtitle">Coming soon - Top performing markets analysis</p>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>This section will show the top cities with highest Gen Z concentration indices.</p>
      </div>
    </motion.div>
  )
}

export default ConcentrationChampions

