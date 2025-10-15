import React, { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../services/api';
import { ExternalLink, Github, Loader } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeaturedProjects()
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="projects">
        <div className="container">
          <div className="loading-state">
            <Loader className="spinner" size={48} />
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects">
        <div className="container">
          <div className="error-state">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">Featured Projects</span>
        </h2>
        <p className="section-subtitle">
          Backend-focused projects showcasing REST APIs, database design, and system architecture
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-category">{project.category_display}</span>
              </div>

              <p className="project-description">{project.description}</p>

              {project.features && project.features.length > 0 && (
                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="tech-stack">
                {project.tech_stack.map((tech, idx) => (
                  <span key={idx} className="tech-badge">{tech}</span>
                ))}
              </div>

              <div className="project-links">
                {project.github_link && (
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                )}
                {project.live_link && (
                  <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}