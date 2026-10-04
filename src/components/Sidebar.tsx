import React from 'react';
import type { Chat, User } from '../types/chat';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: 'all' | 'unread' | 'groups';
  onFilterChange: (filter: 'all' | 'unread' | 'groups') => void;
  currentUser: User;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  currentUser,
}) => {
  return (
    <aside className="sidebar">
      {/* Sidebar Header / Profile */}
      <div className="sidebar-header">
        <div className="user-profile-summary">
          <div className="avatar-wrapper">
            <img src={currentUser.avatar} alt={currentUser.name} className="avatar" />
            <span className={`status-dot ${currentUser.status}`} />
          </div>
          <div className="user-info">
            <h3 className="user-name">{currentUser.name}</h3>
            <span className="user-status-text">{currentUser.username}</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <div className="search-input-box">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => onSearchChange('')}>✕</button>
          )}
        </div>
      </div>

      {/* Filter Navigation */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-tab ${activeFilter === 'unread' ? 'active' : ''}`}
          onClick={() => onFilterChange('unread')}
        >
          Unread
        </button>
        <button
          className={`filter-tab ${activeFilter === 'groups' ? 'active' : ''}`}
          onClick={() => onFilterChange('groups')}
        >
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="chat-list">
        {chats.length === 0 ? (
          <div className="empty-chat-list">No conversations found</div>
        ) : (
          chats.map((chat) => {
            const isActive = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                className={`chat-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="avatar-wrapper">
                  <img src={chat.user.avatar} alt={chat.user.name} className="avatar" />
                  {chat.type === 'direct' && (
                    <span className={`status-dot ${chat.user.status}`} />
                  )}
                </div>

                <div className="chat-item-content">
                  <div className="chat-item-top">
                    <span className="chat-name">{chat.user.name}</span>
                    <span className="chat-time">{chat.lastMessageTimestamp}</span>
                  </div>
                  <div className="chat-item-bottom">
                    <p className="chat-preview">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="unread-badge">{chat.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
