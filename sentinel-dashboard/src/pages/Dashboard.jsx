import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldAlert, Search, Users, CheckCircle, AlertTriangle, BrainCircuit } from 'lucide-react';
import LiveFeed from '../components/LiveFeed';
import StudentProfile from '../components/StudentProfile';
import './Dashboard.css';

const DUMMY_STUDENTS = [
  { id: 1, name: "Amit Sharma", status: "suspicious", violation: "Multiple Faces Detected", time: "10:14 AM", riskScore: 85, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
  { id: 2, name: "Akash Tiwari", status: "safe", violation: null, time: null, riskScore: 12, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 3, name: "Rahul Verma", status: "suspicious", violation: "Tab Switch", time: "10:05 AM", riskScore: 92, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
  { id: 4, name: "Sarah Khan", status: "safe", violation: null, time: null, riskScore: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
  { id: 5, name: "Michael", status: "suspicious", violation: "Looking Away", time: "10:22 AM", riskScore: 65, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
  { id: 6, name: "Priya Patel", status: "safe", violation: null, time: null, riskScore: 8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
  { id: 7, name: "Travis", status: "safe", violation: null, time: null, riskScore: 15, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
  { id: 8, name: "Trevar", status: "safe", violation: null, time: null, riskScore: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" },
];

export default function Dashboard() {
  const { testId } = useParams();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = DUMMY_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: DUMMY_STUDENTS.length,
    safe: DUMMY_STUDENTS.filter(s => s.status === 'safe').length,
    suspicious: DUMMY_STUDENTS.filter(s => s.status === 'suspicious').length,
  };

  return (
    <div className="dashboard-container">
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="brand-section">
          <h1>
            <ShieldAlert className="icon-primary" color="#4f46e5" /> 
            SentinelAI <span className="brand-subtitle">| Proctor Dashboard</span>
          </h1>
          <p className="session-info">
            Exam Session: {testId || "CS-202 Data Structures"} • 01:45:00 Remaining
          </p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search Student..." 
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="user-avatar">JD</div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="stats-container">
        <StatCard title="Total Students" value={stats.total} icon={Users} color="blue" />
        <StatCard title="Active & Safe" value={stats.safe} icon={CheckCircle} color="green" />
        <StatCard title="Flagged Issues" value={stats.suspicious} icon={AlertTriangle} color="red" />
        <StatCard title="Avg. Integrity" value="94%" icon={BrainCircuit} color="purple" />
      </div>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="section-heading">Live Monitoring Feeds</h2>
        <LiveFeed 
          students={filteredStudents} 
          onSelectStudent={setSelectedStudent} 
        />
      </main>

      {/* Slide-over Profile Panel */}
      <StudentProfile 
        selectedStudent={selectedStudent} 
        setSelectedStudent={setSelectedStudent} 
      />
    </div>
  );
}


const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: { bg: '#dbeafe', text: '#2563eb' },
    green: { bg: '#dcfce7', text: '#16a34a' },
    red: { bg: '#fee2e2', text: '#dc2626' },
    purple: { bg: '#f3e8ff', text: '#9333ea' }
  };
  
  const activeColor = colors[color];

  return (
    <div className="stat-card-box">
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
      <div style={{ height: '3rem', width: '3rem', borderRadius: '50%', backgroundColor: activeColor.bg, color: activeColor.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} />
      </div>
    </div>
  );
};
