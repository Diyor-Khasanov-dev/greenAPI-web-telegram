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
  idInstance?: string;
  onLogout?: () => void;
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
  idInstance,
  onLogout,
}) => {
  return (
    <aside className="sidebar">
      {/* Search Input Box */}
      <div className="search-container">
        <div className="search-input-box">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search messages or contacts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <svg
                width="14"
                height="14"
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

      {/* Chat Conversation List */}
      <div className="chat-list">
        {chats.length === 0 ? (
          <div className="empty-chat-list">
            <p>No conversations match your search</p>
          </div>
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
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="avatar"
                  />
                  {chat.type === 'direct' && (
                    <span className={`status-dot ${chat.user.status}`} />
                  )}
                </div>

                <div className="chat-item-content">
                  <div className="chat-item-top">
                    <div className="chat-name-row">
                      <span className="chat-name">{chat.user.name}</span>
                      {chat.isPinned && (
                        <svg
                          className="pinned-icon"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                        </svg>
                      )}
                    </div>
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

      {/* Sidebar Footer: Logged in user profile & Logout */}
      <div className="sidebar-footer">
        <div className="user-profile-summary">
          <div className="avatar-wrapper sm">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="avatar"
            />
            <span className={`status-dot ${currentUser.status}`} />
          </div>
          <div className="user-info">
            <h3 className="user-name">{currentUser.name}</h3>
            <span className="user-status-text">
              {idInstance ? `ID: ${idInstance}` : currentUser.username}
            </span>
          </div>
        </div>

        <button
          className="logout-icon-btn"
          title="Log out"
          aria-label="Log out"
          onClick={onLogout}
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </aside>
  );
};
