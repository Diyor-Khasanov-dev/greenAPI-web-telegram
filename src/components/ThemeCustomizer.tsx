import React, { useState } from 'react';

interface ThemeCustomizerProps {
  primaryColor: string;
  onColorChange: (color: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const PRESET_COLORS = [
  { name: 'Minimal Blue', hex: '#007aff' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Graphite', hex: '#3f3f46' },
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  primaryColor,
  onColorChange,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-customizer-wrapper">
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Customize Theme Accent"
        aria-label="Customize theme"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a7 7 0 1 0 10 10"></path>
        </svg>
        <span className="theme-btn-label">Theme Accent</span>
        <span className="color-preview-dot" style={{ backgroundColor: primaryColor }}></span>
      </button>

      {isOpen && (
        <div className="theme-popover">
          <div className="theme-popover-header">
            <h4>Appearance & Main Color</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="theme-section">
            <span className="section-title">Mode</span>
            <div className="mode-toggle-group">
              <button
                className={`mode-btn ${!isDarkMode ? 'active' : ''}`}
                onClick={() => isDarkMode && onToggleDarkMode()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <span>Light</span>
              </button>
              <button
                className={`mode-btn ${isDarkMode ? 'active' : ''}`}
                onClick={() => !isDarkMode && onToggleDarkMode()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="theme-section">
            <span className="section-title">Main Accent Color</span>
            <div className="preset-colors">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.hex}
                  className={`color-chip ${primaryColor.toLowerCase() === c.hex.toLowerCase() ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  onClick={() => onColorChange(c.hex)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
