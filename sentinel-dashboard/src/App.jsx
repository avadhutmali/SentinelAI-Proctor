import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TestsList from './pages/TestsList'
import TestCreation from './pages/TestCreation'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestsList />} />
        <Route path="/create-test" element={<TestCreation />} />
        <Route path="/dashboard/:testId" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
