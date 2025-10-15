import React, { useState } from 'react';
import { sendContactMessage } from '../services/api';
import { Mail, Phone, MapPin, Send, Loader } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await sendContactMessage(formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: '' });
      }, 5000);
    } catch (err) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Failed to send message. Please try again.' 
      });
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">Get In Touch</span>
        </h2>
        <p className="section-subtitle">
          Let's discuss your next backend project or collaboration opportunity
        </p>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <Mail className="info-icon" size={32} />
              <h3>Email</h3>
              <a href={`mailto:${process.env.REACT_APP_EMAIL}`}>
                {process.env.REACT_APP_EMAIL || 'kushal@example.com'}
              </a>
            </div>
            <div className="info-card">
              <Phone className="info-icon" size={32} />
              <h3>Phone</h3>
              <a href="tel:+977XXXXXXXXXX">+977 XX XXX XXXX</a>
            </div>
            <div className="info-card">
              <MapPin className="info-icon" size={32} />
              <h3>Location</h3>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            {status.success && (
              <div className="alert alert-success">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status.error && (
              <div className="alert alert-error">
                ✗ {status.error}
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status.loading}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status.loading}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={status.loading}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status.loading}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-submit"
              disabled={status.loading}
            >
              {status.loading ? (
                <>
                  <Loader className="spinner" size={18} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}