import { useState, useEffect } from 'react';
import { initialChats, currentUser } from './mock/chatData';
import type { Chat } from './types/chat';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { ChatInfo } from './components/ChatInfo';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import './App.css';

export function App() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>('chat-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'groups'>('all');
  const [showInfo, setShowInfo] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Apply primary color to CSS custom variable
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--primary-color-hover', primaryColor);
    document.documentElement.style.setProperty(
      '--primary-color-light',
      `${primaryColor}1a`
    );
    document.documentElement.style.setProperty(
      '--primary-color-glow',
      `${primaryColor}40`
    );
  }, [primaryColor]);

  // Apply Dark/Light theme mode attribute
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // Filtered chats list
  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.lastMessage &&
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === 'unread') return chat.unreadCount > 0;
    if (filter === 'groups') return chat.type === 'group';
    return true;
  });

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    // Clear unread count when chat is opened
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (text: string) => {
    if (!activeChatId) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent' as const,
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            lastMessage: text,
            lastMessageTimestamp: newMessage.timestamp,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );
  };

  return (
    <div className="app-layout">
      {/* Top Header Control Bar */}
      <header className="top-control-bar">
        <div className="brand">
          <button
            className="sidebar-toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            aria-label="Toggle sidebar"
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
          <div className="brand-badge">
            <div className="brand-icon">
              <svg
                width="20"
                height="20"
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
            <span className="brand-title">PulseChat</span>
          </div>
        </div>

        <div className="header-right-actions">
          {/* Quick Sun/Moon Dark Mode Toggle Button */}
          <button
            className="icon-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {isDarkMode ? (
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
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
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
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Theme Color Accent Customizer Popover */}
          <ThemeCustomizer
            primaryColor={primaryColor}
            onColorChange={setPrimaryColor}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        </div>
      </header>

      {/* Main Container */}
      <div
        className={`chat-interface-container ${
          !isSidebarOpen ? 'sidebar-collapsed' : ''
        }`}
      >
        <Sidebar
          chats={filteredChats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={filter}
          onFilterChange={setFilter}
          currentUser={currentUser}
        />

        <ChatArea
          chat={activeChat}
          onSendMessage={handleSendMessage}
          onToggleInfo={() => setShowInfo(!showInfo)}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {showInfo && (
          <ChatInfo chat={activeChat} onClose={() => setShowInfo(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
