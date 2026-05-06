import './ScenarioSelector.css'

function ScenarioSelector({ scenario, onScenarioChange }) {
  const scenarios = [
    { id: 'rice', name: '🌾 Pasar Beras (Rice Market)', description: 'Komoditas pangan utama Indonesia' },
    { id: 'fuel', name: '⛽ Pasar Bahan Bakar (Fuel Market)', description: 'Energi dan transportasi' },
    { id: 'labor', name: '👥 Pasar Tenaga Kerja (Labor Market)', description: 'Upah dan ketenagakerjaan' },
  ]

  return (
    <div className="scenario-selector">
      <label htmlFor="scenario-select">Pilih Skenario Ekonomi:</label>
      <select 
        id="scenario-select"
        value={scenario} 
        onChange={(e) => onScenarioChange(e.target.value)}
        className="scenario-select"
      >
        {scenarios.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <div className="scenario-descriptions">
        {scenarios.map(s => (
          s.id === scenario && (
            <div key={s.id} className="scenario-description">
              <p>{s.description}</p>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default ScenarioSelector
