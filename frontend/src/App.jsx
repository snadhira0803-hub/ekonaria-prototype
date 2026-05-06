import { useState, useEffect } from 'react'
import axios from 'axios'
import Graph from './components/Graph'
import ScenarioSelector from './components/ScenarioSelector'
import './App.css'

function App() {
  const [scenario, setScenario] = useState('rice')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchScenarioData(scenario)
  }, [scenario])

  const fetchScenarioData = async (scenarioName) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/api/scenarios/${scenarioName}`)
      setData(response.data)
    } catch (err) {
      setError('Failed to load scenario data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌾 Ekonaria</h1>
        <p>Platform Belajar Ekonomi Indonesia - Kurva Penawaran & Permintaan</p>
      </header>

      <main className="app-main">
        <div className="controls">
          <ScenarioSelector 
            scenario={scenario} 
            onScenarioChange={setScenario}
          />
        </div>

        {loading && <div className="loading">Memuat data...</div>}
        {error && <div className="error">{error}</div>}
        
        {data && (
          <div className="content">
            <div className="info-panel">
              <h2>{data.name}</h2>
              <p>{data.description}</p>
              <div className="stats">
                <div className="stat">
                  <span className="label">Harga Keseimbangan:</span>
                  <span className="value">Rp {data.equilibrium.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="stat">
                  <span className="label">Kuantitas Keseimbangan:</span>
                  <span className="value">{data.equilibrium.quantity.toLocaleString('id-ID')} unit</span>
                </div>
              </div>
            </div>
            
            <Graph data={data} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Ekonaria © 2024 | Platform Pembelajaran Ekonomi Interaktif</p>
      </footer>
    </div>
  )
}

export default App
