import StudentCard from './StudentCard'
import './LiveFeed.css'

export default function LiveFeed({ students, selectedStudent, onSelectStudent }) {
  return (
    <div className="live-feed-grid">
      {students.map((student) => (
        <div 
          key={student.id} 
          className="feed-item"
          onClick={() => onSelectStudent({...student})}
        >
          <StudentCard student={student} isSelected={selectedStudent?.id === student.id} />
        </div>
      ))}
    </div>
  )
}
