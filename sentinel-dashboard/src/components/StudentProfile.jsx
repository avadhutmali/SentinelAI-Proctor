import React from 'react';
import { X, BrainCircuit } from 'lucide-react';
import './StudentProfile.css';

const StudentProfile = ({ selectedStudent, setSelectedStudent }) => {
  if (!selectedStudent) return null;

  return (
    <div className="student-panel">
      
      {/* Panel Header */}
      <div className="panel-header">
        <button 
          onClick={() => setSelectedStudent(null)}
          className="close-btn"
        >
          <X size={20} />
        </button>
        <div className="profile-section">
          <img 
            src={selectedStudent.avatar} 
            className="avatar" 
            alt="profile"
          />
          <div>
            <h2 className="student-name">{selectedStudent.name}</h2>
            <p className="student-course">Computer Science B.Tech</p>
          </div>
        </div>
      </div>

      {/* Panel Body */}
      <div className="panel-body">
        
        {/* Integrity Score */}
        <div>
          <h4 className="section-title">Live Integrity Score</h4>
          <div style={{ paddingTop: '0.25rem', position: 'relative' }}>
            <div className="score-header">
              <div>
                <span className={`badge ${selectedStudent.riskScore > 50 ? 'high-risk' : 'low-risk'}`}>
                  {selectedStudent.riskScore > 50 ? 'High Risk' : 'Low Risk'}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="probability-text">
                  {selectedStudent.riskScore}% Probability
                </span>
              </div>
            </div>
            <div className="progress-bar-bg">
              <div 
                style={{ width: `${selectedStudent.riskScore}%` }} 
                className={`progress-bar-fill ${selectedStudent.riskScore > 50 ? 'bg-red' : 'bg-green'}`}
              ></div>
            </div>
          </div>
        </div>

        {/* Violation Timeline */}
        <div>
           <h4 className="section-title">Event Timeline</h4>
           <div className="timeline-container">
             {selectedStudent.status === 'suspicious' ? (
               <>
                 <TimelineItem time="10:22 AM" title="Looking Away" desc="Head pose deviation > 45 degrees detected." isAlert />
                 <TimelineItem time="10:14 AM" title="Multiple Faces" desc="Second person detected in frame." isAlert />
                 <TimelineItem time="10:00 AM" title="Exam Started" desc="Session initialized successfully." />
               </>
             ) : (
               <TimelineItem time="10:00 AM" title="Exam Started" desc="Session initialized successfully." />
             )}
           </div>
        </div>

        {/* AI Analysis Box */}
        <div className="ai-box">
          <div className="ai-header">
            <BrainCircuit className="icon-indigo" size={20} />
            <h3 className="ai-title">Gemini AI Analysis</h3>
          </div>
          <p className="ai-text">
            {selectedStudent.status === 'suspicious' 
              ? "Pattern analysis indicates a high likelihood of external assistance. The student's gaze consistently shifts to the left quadrant immediately after new questions load. Audio spikes correlate with these movements."
              : "Behavior appears consistent with normal exam-taking patterns. Gaze tracking shows focus remains on the screen content area. No audio anomalies detected."}
          </p>
        </div>

        {/* Actions */}
        <div className="action-grid">
          <button className="btn btn-secondary">
            Send Warning
          </button>
          <button className="btn btn-danger">
            Terminate Exam
          </button>
        </div>

      </div>
    </div>
  );
};

// Helper components for timeline
const TimelineItem = ({ time, title, desc, isAlert }) => (
  <div className="timeline-item">
    <div className={`timeline-dot ${isAlert ? 'dot-alert' : 'dot-normal'}`}></div>
    <span className="time-stamp">{time}</span>
    <h5 className={`timeline-title ${isAlert ? 'text-alert' : 'text-normal'}`}>{title}</h5>
    <p className="timeline-desc">{desc}</p>
  </div>
);

export default StudentProfile;
