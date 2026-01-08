import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import LiveFeed from '../components/LiveFeed'
import StudentProfile from '../components/StudentProfile'
import './Dashboard.css'

export default function Dashboard() {
  const { testId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const testData = location.state?.testData
  const isStudent = location.state?.isStudent

  const [selectedStudent, setSelectedStudent] = useState({
    id: '2024004',
    name: 'sarah khan',
    department: 'Computer Science B Tech',
    avatar: '👩‍💼',
    status: 'active',
    integrityScore: '5%',
    riskLevel: 'LOW RISK',
    events: [
      { time: '10:00 AM', event: 'Exam Started', details: 'Session initialized successfully' }
    ],
    analysis: 'Behavior appears consistent with normal exam-taking patterns. Gaze tracking shows focus remains on the screen content area. No audio anomalies detected.'
  })

  const students = [
    { id: '2024001', name: 'Amit Sharma', avatar: '👨‍💼', status: 'violation', violation: 'Multiple Faces Detected', time: '10:14 AM' },
    { id: '2024002', name: 'akash tiwari', avatar: '👦', status: 'safe', violation: 'Monitoring Active' },
    { id: '2024004', name: 'sarah khan', avatar: '👩‍💼', status: 'safe', violation: 'Monitoring Active' },
    { id: '2024005', name: 'Michael', avatar: '👨', status: 'violation', violation: 'Suspicious Activity' }
  ]

  const stats = [
    { label: 'Total Students', value: '8', icon: '👥' },
    { label: 'Active & Safe', value: '5', icon: '✅' },
    { label: 'Flagged Issues', value: '3', icon: '⚠️' }
  ]

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleBack}>← Back</button>
            <div>
              <h1 className="title">
                <span className="logo-icon">🛡️</span> SentinelAI <span className="subtitle">| Proctor Dashboard</span>
              </h1>
              {testData && (
                <p className="exam-info">
                  Test: <strong>{testData.testName || 'Exam'}</strong> • 
                  Duration: {testData.duration || '01:45:00'} • 
                  Test ID: <code>{testId}</code>
                </p>
              )}
              {!testData && (
                <p className="exam-info">Exam Session: CS-202 Data Structures • 01:45:00 Remaining</p>
              )}
            </div>
          </div>
          {isStudent && <div className="student-badge">👨‍🎓 Student Mode</div>}
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Main Content */}
        <main className="main-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-text">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Monitoring Feeds */}
          <div className="feeds-section">
            <h2 className="section-title">Live Monitoring Feeds</h2>
            <LiveFeed students={students} selectedStudent={selectedStudent} onSelectStudent={setSelectedStudent} />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="sidebar">
          <StudentProfile student={selectedStudent} />
        </aside>
      </div>
    </div>
  )
}
