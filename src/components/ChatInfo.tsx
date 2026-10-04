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
        <h4>User Details</h4>
        <button className="close-panel-btn" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="info-profile">
        <img src={user.avatar} alt={user.name} className="large-avatar" />
        <h3 className="profile-name">{user.name}</h3>
        {user.username && <span className="profile-handle">{user.username}</span>}
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
          <p className="info-value status-badge">{user.status}</p>
        </div>
      </div>
    </aside>
  );
};
