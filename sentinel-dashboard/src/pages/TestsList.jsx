import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TestsList.css'

export default function TestsList() {
  const navigate = useNavigate()
  const [tests, setTests] = useState([])

  useEffect(() => {
    // Load tests from localStorage
    const savedTests = JSON.parse(localStorage.getItem('tests') || '[]')
    setTests(savedTests)
  }, [])

  const handleCreateTest = () => {
    navigate('/create-test')
  }

  const handleStartTest = (testId) => {
    navigate(`/dashboard/${testId}`)
  }

  const handleDeleteTest = (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      const updatedTests = tests.filter(t => t.id !== testId)
      setTests(updatedTests)
      localStorage.setItem('tests', JSON.stringify(updatedTests))
    }
  }

  return (
    <div className="tests-container">
      {/* Header */}
      <header className="tests-header">
        <div className="header-content">
          <h1>
            <span className="logo-icon">🛡️</span> SentinelAI
            <span className="subtitle">| Exam Management</span>
          </h1>
          <p>Secure Online Proctoring System</p>
        </div>
      </header>

      <div className="content-layout">
        {/* Create Test Section */}
        <div className="teacher-section">
          <div className="create-card">
            <div className="card-icon">📝</div>
            <h2>Create a New Test</h2>
            <p>Set up an exam and get a unique Test ID to share with students</p>
            <button className="btn btn-primary btn-large" onClick={handleCreateTest}>
              Create Test
            </button>
          </div>

          {/* Active Tests List */}
          <div className="tests-list">
            <h2>Your Tests</h2>
            {tests.length === 0 ? (
              <div className="empty-state">
                <p>No tests created yet. Create your first test to get started!</p>
              </div>
            ) : (
              <div className="tests-grid">
                {tests.map(test => (
                  <div key={test.id} className="test-item">
                    <div className="test-header">
                      <h3>{test.testName}</h3>
                      <span className="test-id-badge">{test.id}</span>
                    </div>
                    <div className="test-info">
                      <p><strong>Subject:</strong> {test.subject}</p>
                      <p><strong>Duration:</strong> {test.duration} minutes</p>
                      <p><strong>Questions:</strong> {test.totalQuestions}</p>
                      <p><strong>Created:</strong> {test.createdAt}</p>
                    </div>
                    <div className="test-actions">
                      <button 
                        className="btn btn-small btn-primary" 
                        onClick={() => handleStartTest(test.id)}
                      >
                        Start Proctoring
                      </button>
                      <button 
                        className="btn btn-small btn-danger" 
                        onClick={() => handleDeleteTest(test.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
