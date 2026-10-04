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
        <button className="close-panel-btn" onClick={onClose}>✕</button>
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
