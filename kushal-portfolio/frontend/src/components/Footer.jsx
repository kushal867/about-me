import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">KS</h3>
            <p className="footer-tagline">Backend Developer | Django Expert</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#backend">Backend</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-links">
              <a href={process.env.REACT_APP_GITHUB || '#'} target="_blank" rel="noopener noreferrer">
                <Github size={24} />
              </a>
              <a href={process.env.REACT_APP_LINKEDIN || '#'} target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${process.env.REACT_APP_EMAIL}`}>
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Kushal Sapkota. Built with <Heart size={16} className="heart" /> using React & Django
          </p>
        </div>
      </div>
    </footer>
  );
}