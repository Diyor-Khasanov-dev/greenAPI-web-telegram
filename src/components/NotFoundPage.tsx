import React from 'react';

interface NotFoundPageProps {
  onGoHome: () => void;
  onGoToLogin?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onGoHome,
  onGoToLogin,
}) => {
  return (
    <div className="not-found-page-container">
      <div className="not-found-glow glow-1" />
      <div className="not-found-glow glow-2" />

      <div className="not-found-card">
        {/* Animated 404 Visual Header */}
        <div className="not-found-visual">
          <span className="digit">4</span>
          <div className="radar-search-container">
            <div className="radar-ring ring-1" />
            <div className="radar-ring ring-2" />
            <div className="radar-ping" />
            <div className="radar-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="8.01" />
                <line x1="11" y1="12" x2="11" y2="14" />
              </svg>
            </div>
          </div>
          <span className="digit">4</span>
        </div>

        {/* Text Content */}
        <div className="not-found-text-content">
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-description">
            The page or channel you are looking for doesn't exist, was moved, or you don't have permission to access it.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="not-found-actions">
          <button
            type="button"
            className="not-found-btn primary"
            onClick={onGoHome}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Return to Chats</span>
          </button>

          {onGoToLogin && (
            <button
              type="button"
              className="not-found-btn secondary"
              onClick={onGoToLogin}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>Go to Login</span>
            </button>
          )}
        </div>

        {/* Footer Support Note */}
        <div className="not-found-footer">
          <span>Error Code: 404_PAGE_NOT_FOUND</span>
        </div>
      </div>
    </div>
  );
};
