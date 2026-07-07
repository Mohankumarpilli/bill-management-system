import { Routes, Route } from 'react-router-dom'
import RestaurantPOS from './RestaurantPOS'
import ReportsPage from './ReportsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantPOS />} />
      <Route path="/reports" element={<ReportsPage />} />
    </Routes>
  )
}

export default App
