import './StudentCard.css'

export default function StudentCard({ student, isSelected }) {
  const statusColor = student.status === 'safe' ? 'green' : 'red'
  const statusBg = student.status === 'safe' ? '#d4edda' : '#f8d7da'
  
  return (
    <div className={`student-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <div className="student-avatar">{student.avatar}</div>
        <div className="status-indicator" style={{ backgroundColor: statusColor }}></div>
      </div>
      
      <div className="card-body">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-id">ID: {student.id}</p>
      </div>

      <div className={`violation-section ${student.status === 'violation' ? 'active' : ''}`} style={{ backgroundColor: student.status === 'violation' ? statusBg : 'transparent' }}>
        {student.status === 'violation' && (
          <>
            <p className="violation-label">⚠️ VIOLATION DETECTED</p>
            <p className="violation-text">{student.violation}</p>
          </>
        )}
        {student.status === 'safe' && (
          <>
            <p className="safe-label">✓ {student.violation}</p>
          </>
        )}
        {student.time && <p className="violation-time">{student.time}</p>}
      </div>
    </div>
  )
}
