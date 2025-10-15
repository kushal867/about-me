import React, { useEffect, useState } from 'react';
import { getStatistics } from '../services/api';
import { Code, Database, Server, Zap } from 'lucide-react';

export default function About() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatistics()
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching statistics:', err);
        setLoading(false);
      });
  }, []);

  const features = [
    {
      icon: <Code size={32} />,
      title: 'Backend Development',
      description: 'Expert in Django, DRF, and Python architecture patterns'
    },
    {
      icon: <Server size={32} />,
      title: 'API Design',
      description: 'RESTful APIs with authentication, pagination, and filtering'
    },
    {
      icon: <Database size={32} />,
      title: 'Database Design',
      description: 'PostgreSQL optimization, migrations, and complex relationships'
    },
    {
      icon: <Zap size={32} />,
      title: 'Performance',
      description: 'Caching strategies, query optimization, and scalability'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">About Me</span>
        </h2>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a dedicated backend engineer with a passion for building robust, scalable systems.
              With expertise in Django, REST APIs, and database design, I focus on creating
              architectures that solve real-world problems efficiently.
            </p>
            <p>
              Currently studying BICT Software Engineering, I'm constantly learning about
              microservices, cloud technologies, and advanced system design patterns to stay
              at the forefront of backend development.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects,
              and sharing knowledge with the developer community through blogs and technical documentation.
            </p>

            {!loading && stats.length > 0 && (
              <div className="stats-grid">
                {stats.map((stat) => (
                  <div key={stat.id} className="stat-card">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="about-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}