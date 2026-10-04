import React from 'react';
import type { Chat } from '../types/chat';

interface ChatInfoProps {
  chat: Chat | null;
  onClose: () => void;
}

export const ChatInfo: React.FC<ChatInfoProps> = ({ chat, onClose }) => {
  if (!chat) return null;

  const { user } = chat;

  return (
    <aside className="chat-info-panel">
      <div className="info-panel-header">
        <h4>Contact Information</h4>
        <button
          className="clear-search-btn"
          onClick={onClose}
          aria-label="Close details panel"
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="info-profile">
        <img src={user.avatar} alt={user.name} className="large-avatar" />
        <h3 className="profile-name">{user.name}</h3>
        {user.username && <span className="profile-handle">{user.username}</span>}

        <div className="info-quick-actions">
          <button className="quick-action-btn">
            <div className="action-circle">
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <span>Call</span>
          </button>
          <button className="quick-action-btn">
            <div className="action-circle">
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
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <span>Mute</span>
          </button>
        </div>
      </div>

      <div className="info-details-list">
        {user.bio && (
          <div className="info-item">
            <span className="info-label">Bio</span>
            <p className="info-value">{user.bio}</p>
          </div>
        )}

        {user.phone && (
          <div className="info-item">
            <span className="info-label">Phone</span>
            <p className="info-value">{user.phone}</p>
          </div>
        )}

        <div className="info-item">
          <span className="info-label">Status</span>
          <p className="info-value status-badge" style={{ textTransform: 'capitalize' }}>
            {user.status}
          </p>
        </div>
      </div>
    </aside>
  );
};
