import React from "react";
import { Link } from "react-router-dom";
import "./JoinCreateChat.css";

const JoinCreateChat = () => {
  return (
    <section className="join-create-section">
      <div className="join-create-container">
        <div className="section-header">
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-subtitle">Join an existing room or create your own in seconds</p>
        </div>

        <div className="cards-grid">
          {/* Join Room Card */}
          <div className="action-card join-card">
            <div className="card-icon join-icon">
              <svg
                className="responsive-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="card-title">Join a Room</h3>
            <p className="card-description">
              Enter a room code to connect with others instantly
            </p>
            <Link to="/join" className="card-button join-button">
              Join Now
            </Link>
          </div>

          {/* Create Room Card */}
          <div className="action-card create-card">
            <div className="card-icon create-icon">
              <svg
                className="responsive-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="card-title">Create a Room</h3>
            <p className="card-description">
              Start a new conversation and invite your team
            </p>
            <Link to="/create" className="card-button create-button">
              Create Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCreateChat;