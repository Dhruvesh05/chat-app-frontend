import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">
      {/* Feature Cards */}
      <section className="features-grid">
        <div className="feature-card feature-instant">
          <div className="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="responsive-svg"
              aria-label="Instant"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3>Instant</h3>
          <p>Zero latency messaging powered by robust WebSocket connections.</p>
        </div>

        <div className="feature-card feature-private">
          <div className="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="responsive-svg"
              aria-label="Private"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3>Private</h3>
          <p>Built with security at the core of every architectural decision.</p>
        </div>

        <div className="feature-card feature-open">
          <div className="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="responsive-svg"
              aria-label="Open"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3>Open</h3>
          <p>Modern stack designed for developers and power users alike.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <span className="mission-label">The Mission</span>
            <h2 className="mission-title">
              Technology that fades into the background
            </h2>
            <div className="mission-text">
              <p>
                In a world cluttered with notifications and complex interfaces, ProChat provides 
                a sanctuary for clear, focused conversation. We believe that the best technology 
                is the one you don't notice.
              </p>
              <p>
                By leveraging real-time WebSockets and a sleek React frontend backed by Spring Boot, 
                we've created an environment where your words take center stage. Every feature is 
                intentional, every interaction is smooth, and every conversation feels natural.
              </p>
            </div>
            
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number stat-uptime">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-item">
                <div className="stat-number stat-latency">&lt;50ms</div>
                <div className="stat-label">Latency</div>
              </div>
              <div className="stat-item">
                <div className="stat-number stat-encryption">256-bit</div>
                <div className="stat-label">Encryption</div>
              </div>
            </div>
          </div>

          {/* Mockup */}
          <div className="mission-visual">
            <div className="mockup-container">
              <div className="mockup-line"></div>
              <div className="mockup-line delay-1"></div>
              <div className="mockup-line delay-2"></div>
              <div className="mockup-highlight">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="responsive-svg"
                  aria-label="Chat Mockup"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
            <div className="glow glow-top"></div>
            <div className="glow glow-bottom"></div>
          </div>
        </div>
      </section>
      <style>{`
        .responsive-svg {
          width: 2.5rem;
          height: 2.5rem;
          min-width: 1.5rem;
          min-height: 1.5rem;
          max-width: 100%;
          max-height: 100%;
          display: block;
        }
        @media (max-width: 600px) {
          .responsive-svg {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;