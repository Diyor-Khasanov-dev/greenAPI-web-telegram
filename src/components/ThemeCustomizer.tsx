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
        title="Customize Theme & Main Color"
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
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="theme-section">
            <span className="section-title">Mode</span>
            <div className="mode-toggle-group">
              <button
                className={`mode-btn ${!isDarkMode ? 'active' : ''}`}
                onClick={() => isDarkMode && onToggleDarkMode()}
              >
                ☀️ Light
              </button>
              <button
                className={`mode-btn ${isDarkMode ? 'active' : ''}`}
                onClick={() => !isDarkMode && onToggleDarkMode()}
              >
                🌙 Dark
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

            <div className="custom-color-picker">
              <label htmlFor="customColor">Custom Primary Hex:</label>
              <input
                id="customColor"
                type="color"
                value={primaryColor}
                onChange={(e) => onColorChange(e.target.value)}
              />
              <span className="hex-value">{primaryColor.toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
