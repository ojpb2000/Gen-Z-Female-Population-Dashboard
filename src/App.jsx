import React from 'react'

function App() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #B19CD9 0%, #9370DB 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🎉 Gen Z Dashboard - TBWA Data Intelligence</h1>
      <p>¡El servidor React está funcionando correctamente!</p>
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '8px',
        display: 'inline-block'
      }}>
        <p>✅ React funcionando</p>
        <p>✅ Vite funcionando</p>
        <p>✅ Estilos aplicados</p>
      </div>
    </div>
  )
}

export default App