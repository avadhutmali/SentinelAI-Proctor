import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import './LiveFeed.css';

export default function LiveFeed({ students, onSelectStudent }) {
  return (
    <div className="feed-grid">
      {students.map((student) => (
        <div 
          key={student.id}
          onClick={() => onSelectStudent(student)}
          className={`student-card ${student.status}`}
        >
          {/* Status Dot */}
          <div className={`status-indicator ${student.status === 'suspicious' ? 'red' : 'green'}`}></div>

          <div className="card-header">
            <img src={student.avatar} alt="avatar" className="card-avatar" />
            <div className="card-info">
              <h3>{student.name}</h3>
              <p>ID: 202400{student.id}</p>
            </div>
          </div>

          {/* Conditional Status UI */}
          {student.status === 'suspicious' ? (
            <div className="violation-badge">
              <div className="violation-header">
                <AlertTriangle size={14} /> Violation Detected
              </div>
              <p className="violation-text">{student.violation}</p>
              <p className="violation-time">{student.time}</p>
            </div>
          ) : (
             <div className="safe-badge">
              <CheckCircle size={16} className="text-green-600" />
              <span className="safe-text">Monitoring Active</span>
            </div>
          )}
          
          <div className="hover-action">
            View Full Report →
          </div>
        </div>
      ))}
    </div>
  );
}
