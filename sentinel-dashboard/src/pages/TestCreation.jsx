import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TestCreation.css'

export default function TestCreation() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    testName: '',
    subject: '',
    duration: '',
    totalQuestions: '',
    instructions: ''
  })
  const [testId, setTestId] = useState(null)
  const [copied, setCopied] = useState(false)

  const generateTestId = () => {
    return 'TST-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateTest = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.testName || !formData.subject || !formData.duration || !formData.totalQuestions) {
      alert('Please fill all required fields')
      return
    }

    // Generate test ID
    const newTestId = generateTestId()
    
    // Save test data to localStorage
    const tests = JSON.parse(localStorage.getItem('tests') || '[]')
    const newTest = {
      id: newTestId,
      ...formData,
      createdAt: new Date().toLocaleString(),
      students: []
    }
    tests.push(newTest)
    localStorage.setItem('tests', JSON.stringify(tests))

    setTestId(newTestId)
  }

  const handleCopyTestId = () => {
    navigator.clipboard.writeText(testId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartTest = () => {
    navigate(`/dashboard/${testId}`, { state: { testData: formData } })
  }

  const handleBackToTests = () => {
    navigate('/')
  }

  if (testId) {
    return (
      <div className="test-creation-container">
        <button className="back-btn" onClick={handleBackToTests}>← Back to Tests</button>
        
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Test Created Successfully!</h2>
          
          <div className="test-id-section">
            <p className="label">Share this Test ID with students:</p>
            <div className="test-id-display">
              <code>{testId}</code>
              <button 
                className="copy-btn" 
                onClick={handleCopyTestId}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="test-details">
            <h3>Test Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Test Name:</label>
                <span>{formData.testName}</span>
              </div>
              <div className="detail-item">
                <label>Subject:</label>
                <span>{formData.subject}</span>
              </div>
              <div className="detail-item">
                <label>Duration:</label>
                <span>{formData.duration} minutes</span>
              </div>
              <div className="detail-item">
                <label>Total Questions:</label>
                <span>{formData.totalQuestions}</span>
              </div>
            </div>
            
            {formData.instructions && (
              <div className="instructions">
                <label>Instructions:</label>
                <p>{formData.instructions}</p>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleStartTest}>
              Start Proctoring Now
            </button>
            <button className="btn btn-secondary" onClick={handleBackToTests}>
              Create Another Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="test-creation-container">
      <button className="back-btn" onClick={handleBackToTests}>← Back to Tests</button>
      
      <div className="creation-card">
        <div className="header">
          <h1>Create New Test</h1>
          <p>Set up your exam and get a unique Test ID to share with students</p>
        </div>

        <form onSubmit={handleCreateTest}>
          <div className="form-group">
            <label htmlFor="testName">Test Name *</label>
            <input
              type="text"
              id="testName"
              name="testName"
              placeholder="e.g., Data Structures Final Exam"
              value={formData.testName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject/Course *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="e.g., Computer Science"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (minutes) *</label>
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="e.g., 120"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalQuestions">Total Questions *</label>
              <input
                type="number"
                id="totalQuestions"
                name="totalQuestions"
                placeholder="e.g., 50"
                value={formData.totalQuestions}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Instructions (Optional)</label>
              <textarea
                id="instructions"
                name="instructions"
                placeholder="Special instructions for students..."
                value={formData.instructions}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Create Test & Get Test ID
          </button>
        </form>
      </div>
    </div>
  )
}
