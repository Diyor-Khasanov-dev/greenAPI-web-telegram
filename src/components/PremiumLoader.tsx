import React from 'react';

interface PremiumLoaderProps {
  message?: string;
  submessage?: string;
  fullScreen?: boolean;
}

export const PremiumLoader: React.FC<PremiumLoaderProps> = ({
  message = 'Loading environment...',
  submessage = 'Preparing end-to-end encryption & synchronizing messages',
  fullScreen = true,
}) => {
  return (
    <div className={`premium-loader-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loader-backdrop-glow" />

      <div className="loader-card">
        {/* Glowing Orb Animation */}
        <div className="orbit-spinner">
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />

          {/* Central Logo Core */}
          <div className="core-badge">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
        </div>

        {/* Text Details & Animated Bar */}
        <div className="loader-content">
          <h3 className="loader-title">{message}</h3>
          {submessage && <p className="loader-subtitle">{submessage}</p>}

          <div className="progress-bar-track">
            <div className="progress-bar-fill" />
          </div>

          <div className="loader-status-footer">
            <span className="status-indicator-dot" />
            <span className="status-text">Secure connection established</span>
          </div>
        </div>
      </div>
    </div>
  );
};
