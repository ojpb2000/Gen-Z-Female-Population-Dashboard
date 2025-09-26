import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Import tabs
import NationalLandscape from './tabs/NationalLandscape'
import ConcentrationChampions from './tabs/ConcentrationChampions'
import AgeDivide from './tabs/AgeDivide'
import OpportunityMap from './tabs/OpportunityMap'
import DataExplorer from './tabs/DataExplorer'
import CulturalPatterns from './tabs/CulturalPatterns'
import Methodology from './tabs/Methodology'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('national')

  const tabs = [
    { id: 'national', label: 'National Landscape', component: NationalLandscape },
    { id: 'champions', label: 'Concentration Champions', component: ConcentrationChampions },
    { id: 'age', label: 'Age Divide', component: AgeDivide },
    { id: 'map', label: 'Opportunity Map', component: OpportunityMap },
    { id: 'explorer', label: 'Data Explorer', component: DataExplorer },
    { id: 'patterns', label: 'Cultural Patterns', component: CulturalPatterns },
    { id: 'methodology', label: 'Methodology', component: Methodology }
  ]

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Gen Z Female Population Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            TBWA Data Intelligence • Interactive Analysis of US ZIP Code Distribution
          </motion.p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <ul className="nav-list">
            {tabs.map((tab, index) => (
              <li key={tab.id} className="nav-item">
                <motion.button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          <AnimatePresence mode="wait">
            {tabs.map(tab => 
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <tab.component />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--primary-purple-dark)',
        color: 'white',
        textAlign: 'center',
        padding: '1rem 0',
        marginTop: '2rem'
      }}>
        <div className="container">
          <p>&copy; 2024 TBWA Data Intelligence. Gen Z Female Population Analysis Dashboard.</p>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard

