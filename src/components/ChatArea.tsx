import React, { useState, useRef, useEffect } from 'react';
import type { Chat } from '../types/chat';

interface ChatAreaProps {
  chat: Chat | null;
  onSendMessage: (text: string) => void;
  onToggleInfo: () => void;
  onBackToSidebar?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  chat,
  onSendMessage,
  onToggleInfo,
  onBackToSidebar,
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
          <div className="placeholder-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h2>Select a conversation</h2>
          <p>Choose a chat from the sidebar to start messaging in minimalist style.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="chat-area">
      {/* Active Chat Header */}
      <header className="chat-header">
        <div className="header-left">
          {onBackToSidebar && (
            <button className="back-btn" onClick={onBackToSidebar} aria-label="Back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          )}
          <div className="avatar-wrapper">
            <img src={chat.user.avatar} alt={chat.user.name} className="avatar" />
            <span className={`status-dot ${chat.user.status}`} />
          </div>
          <div className="header-user-info">
            <h3 className="user-name">{chat.user.name}</h3>
            <span className="user-status-text">
              {chat.user.status === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="action-icon-btn"
            onClick={onToggleInfo}
            title="Contact Info"
            aria-label="Toggle contact details"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="messages-container">
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 6 7 17 2 12"></polyline>
                          <polyline points="22 10 13 19 10 16"></polyline>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Message Input Box */}
      <form className="message-input-area" onSubmit={handleSend}>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button type="submit" className="send-btn" disabled={!inputText.trim()} title="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </main>
  );
};
