import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import JoinCreateChat from "./JoinCreateChat";
import "./Home.css";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="home-wrapper">
      {/* Navigation */}
      <nav className="navbar-modern">
        <div className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            <div className="nav-logo">
              <div className="logo-icon">
                <img src="/ProChat.svg" alt="ProChat Logo" style={{ width: 32, height: 32, display: 'block' }} />
              </div>
              <span className="logo-text">ProChat</span>
            </div>

            {/* Desktop Navigation */}
            <ul className="nav-links">
              <li><a href="#about-section">About</a></li>
              <li><a href="#joincreate-section">Join/Create</a></li>
              <li><Link to="/help" className="nav-cta">Help</Link></li>
            </ul>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#about-section" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#joincreate-section" onClick={() => setMobileMenuOpen(false)}>Join/Create</a>
            <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="mobile-cta">Help</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">Real-time Communication</div>
          <h1 className="hero-title">
            Connections made
            <br />
            <span className="gradient-text">simple & instant</span>
          </h1>
          <p className="hero-subtitle">
            A communication platform built for the modern era—fast, secure, and intentionally minimal. 
            Experience conversations without the clutter.
          </p>
          <div className="hero-actions">
            <a href="#joincreate-section" className="btn-primary">Start Chatting</a>
            <a href="#about-section" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* About Component */}
      <div id="about-section">
        <About />
      </div>

      {/* Join/Create Component */}
      <div id="joincreate-section">
        <JoinCreateChat />
      </div>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon-small">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span>ProChat</span>
            </div>
            
            <div className="tech-stack">
              <span className="tech-pill">React</span>
              <span className="tech-pill">Spring Boot</span>
              <span className="tech-pill">WebSocket</span>
            </div>

            <p className="copyright">
              © {new Date().getFullYear()} ProChat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;