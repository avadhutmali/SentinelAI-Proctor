import './StudentProfile.css'

export default function StudentProfile({ student }) {
  return (
    <div className="profile-container">
      {/* Student Header Card */}
      <div className="profile-header">
        <button className="close-btn">×</button>
        <div className="profile-avatar">{student.avatar}</div>
        <h2 className="profile-name">{student.name}</h2>
        <p className="profile-dept">{student.department}</p>
      </div>

      {/* Live Integrity Score */}
      <div className="integrity-section">
        <h3 className="section-title">LIVE INTEGRITY SCORE</h3>
        <div className="score-display">
          <div className="score-meter">
            <div className="score-bar" style={{ width: student.integrityScore }}></div>
          </div>
          <p className="score-percentage">{student.integrityScore} Probability</p>
        </div>
        <div className="risk-badge">{student.riskLevel}</div>
      </div>

      {/* Event Timeline */}
      <div className="timeline-section">
        <h3 className="section-title">EVENT TIMELINE</h3>
        <div className="timeline">
          {student.events.map((event, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <p className="timeline-time">{event.time}</p>
                <p className="timeline-event">{event.event}</p>
                <p className="timeline-details">{event.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini AI Analysis */}
      <div className="analysis-section">
        <h3 className="section-title">🤖 Gemini AI Analysis</h3>
        <div className="analysis-box">
          <p className="analysis-text">{student.analysis}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-warning">Send Warning</button>
        <button className="btn btn-danger">Terminate Exam</button>
      </div>
    </div>
  )
}
