import React from 'react';
import { Database, Server, Code, Shield, Zap, GitBranch } from 'lucide-react';

export default function Backend() {
  const backendSkills = [
    { name: 'Python & Django', level: 95, color: '#3776ab' },
    { name: 'Django REST Framework', level: 92, color: '#ff1709' },
    { name: 'PostgreSQL', level: 88, color: '#336791' },
    { name: 'MySQL', level: 85, color: '#4479a1' },
    { name: 'RESTful APIs', level: 93, color: '#61dafb' },
    { name: 'JWT Authentication', level: 90, color: '#000000' },
    { name: 'Database Design', level: 87, color: '#4db33d' },
    { name: 'API Documentation', level: 85, color: '#49a32b' },
    { name: 'Docker', level: 82, color: '#2496ed' },
    { name: 'Git & GitHub', level: 90, color: '#f05032' },
    { name: 'Redis Caching', level: 80, color: '#dc382d' },
    { name: 'Microservices', level: 78, color: '#0db7ed' }
  ];

  const expertise = [
    {
      icon: <Database size={40} />,
      title: 'Database Architecture',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Query Optimization', 'Migrations']
    },
    {
      icon: <Server size={40} />,
      title: 'API Development',
      skills: ['Django REST Framework', 'JWT Auth', 'Pagination', 'Filtering', 'Throttling', 'Versioning']
    },
    {
      icon: <Shield size={40} />,
      title: 'Security & Auth',
      skills: ['JWT Tokens', 'OAuth 2.0', 'Permissions', 'Password Hashing', 'CORS', 'HTTPS']
    },
    {
      icon: <Zap size={40} />,
      title: 'Performance',
      skills: ['Redis Caching', 'Query Optimization', 'Indexing', 'Load Balancing', 'CDN', 'Compression']
    },
    {
      icon: <GitBranch size={40} />,
      title: 'DevOps & Tools',
      skills: ['Docker', 'Git', 'CI/CD', 'Nginx', 'Gunicorn', 'Linux']
    },
    {
      icon: <Code size={40} />,
      title: 'Best Practices',
      skills: ['Clean Code', 'Design Patterns', 'Testing', 'Documentation', 'Code Review', 'Agile']
    }
  ];

  return (
    <section id="backend" className="backend">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">Backend Expertise</span>
        </h2>
        <p className="section-subtitle">
          Specialized in building scalable, secure, and high-performance backend systems
        </p>

        {/* Skills Progress Bars */}
        <div className="skills-container">
          <h3 className="skills-heading">Technical Proficiency</h3>
          <div className="skills-grid">
            {backendSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Cards */}
        <div className="expertise-container">
          <h3 className="expertise-heading">Areas of Expertise</h3>
          <div className="expertise-grid">
            {expertise.map((area, index) => (
              <div key={index} className="expertise-card">
                <div className="expertise-icon">{area.icon}</div>
                <h4 className="expertise-title">{area.title}</h4>
                <div className="expertise-skills">
                  {area.skills.map((skill, idx) => (
                    <span key={idx} className="expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}