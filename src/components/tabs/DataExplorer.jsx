import React from 'react'
import { motion } from 'framer-motion'

const DataExplorer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="card-header">
        <h2 className="card-title">Data Explorer</h2>
        <p className="card-subtitle">Coming soon - Interactive data analysis tool</p>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>This section will provide an interactive table with advanced filtering capabilities for deep data exploration.</p>
      </div>
    </motion.div>
  )
}

export default DataExplorer

