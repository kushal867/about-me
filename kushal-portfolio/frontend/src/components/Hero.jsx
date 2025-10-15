import React from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="hero-content">
        <div className="hero-avatar">
          <div className="avatar-ring">
            <span className="avatar-text">KS</span>
          </div>
        </div>

        <h1 className="hero-title">
          <span className="gradient-text">Kushal Sapkota</span>
        </h1>

        <p className="hero-subtitle">
          Backend Software Engineer | BICT Student
        </p>

        <p className="hero-description">
          Building scalable, efficient backend systems with <strong>Django</strong>, <strong>REST APIs</strong>, 
          and <strong>PostgreSQL</strong>. Passionate about clean code, system architecture, and solving complex problems.
        </p>

        <div className="hero-tags">
          <span className="tag">Python</span>
          <span className="tag">Django</span>
          <span className="tag">REST API</span>
          <span className="tag">PostgreSQL</span>
          <span className="tag">Docker</span>
        </div>

        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            <Download size={18} />
            Download CV
          </a>
        </div>

        <div className="hero-socials">
          <a href={process.env.REACT_APP_GITHUB || '#'} target="_blank" rel="noopener noreferrer" className="social-icon">
            <Github size={24} />
          </a>
          <a href={process.env.REACT_APP_LINKEDIN || '#'} target="_blank" rel="noopener noreferrer" className="social-icon">
            <Linkedin size={24} />
          </a>
          <a href={`mailto:${process.env.REACT_APP_EMAIL}`} className="social-icon">
            <Mail size={24} />
          </a>
        </div>

        <div className="hero-scroll">
          <ChevronDown size={32} className="bounce" />
        </div>
      </div>
    </section>
  );
}