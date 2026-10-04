import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from '../types/chat';

interface ChatAreaProps {
  chat: Chat | null;
  onSendMessage: (text: string) => void;
  onToggleInfo: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  chat,
  onSendMessage,
  onToggleInfo,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  if (!chat) {
    return (
      <main className="chat-area empty-state">
        <div className="empty-chat-placeholder">
          <div className="placeholder-icon-badge">
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h2>Select a Conversation</h2>
          <p>Choose a contact or group from the sidebar to start sending real-time messages.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="chat-area">
      {/* Header */}
      <header className="chat-header">
        <div className="header-left">
          {!isSidebarOpen && onToggleSidebar && (
            <button
              className="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              title="Open Sidebar"
              aria-label="Open sidebar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </button>
          )}

          <div className="avatar-wrapper sm">
            <img
              src={chat.user.avatar}
              alt={chat.user.name}
              className="avatar"
            />
            {chat.type === 'direct' && (
              <span className={`status-dot ${chat.user.status}`} />
            )}
          </div>

          <div className="header-user-info">
            <h3 className="user-name">{chat.user.name}</h3>
            <span
              className={`user-status-text ${
                chat.user.status === 'offline' ? 'offline' : ''
              }`}
            >
              {chat.user.status === 'online'
                ? 'Online'
                : chat.user.status === 'away'
                ? 'Away'
                : 'Offline'}
            </span>
          </div>
        </div>

        <div className="header-actions">
          {/* Audio Call Placeholder */}
          <button
            className="icon-btn"
            title="Start voice call"
            aria-label="Start voice call"
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>

          {/* Toggle Info Panel */}
          <button
            className="icon-btn"
            onClick={onToggleInfo}
            title="Contact details"
            aria-label="Toggle contact details"
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="messages-container">
        <div className="date-divider">
          <span>Today</span>
        </div>

        {chat.messages.map((msg) => {
          const isSentByMe = msg.senderId === 'me';

          return (
            <div
              key={msg.id}
              className={`message-row ${isSentByMe ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <p className="message-text">{msg.text}</p>
                <div className="message-meta">
                  <span className="message-time">{msg.timestamp}</span>
                  {isSentByMe && (
                    <span className="message-status">
                      {msg.status === 'read' ? (
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
                          <polyline points="18 6 7 17 2 12"></polyline>
                          <polyline points="22 10 13 19 10 16"></polyline>
                        </svg>
                      ) : (
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
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <form className="message-input-area" onSubmit={handleSend}>
        <div className="input-actions-left">
          <button
            type="button"
            className="input-icon-btn"
            title="Attach file"
            aria-label="Attach file"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
        </div>

        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="input-actions-right">
          <button
            type="button"
            className="input-icon-btn"
            title="Insert Emoji"
            aria-label="Insert Emoji"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>

          <button
            type="submit"
            className="send-btn"
            disabled={!inputText.trim()}
            title="Send Message"
            aria-label="Send Message"
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
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </main>
  );
};
