import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateToNotFound?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToNotFound,
}) => {
  const [activeTab, setActiveTab] = useState<'credentials' | 'qr'>('credentials');
  const [emailOrPhone, setEmailOrPhone] = useState('alex.morgan@company.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or phone number');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password');
      return;
    }

    setIsLoading(true);
    // Simulate authentication API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="login-page-container">
      {/* Dynamic Background Glows */}
      <div className="login-bg-glow glow-1" />
      <div className="login-bg-glow glow-2" />

      <div className="login-card-wrapper">
        {/* Header / Brand */}
        <div className="login-header">
          <div className="login-brand-logo">
            <svg
              width="28"
              height="28"
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
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to continue to your secure workspace
          </p>
        </div>

        {/* Auth Method Switcher Tabs */}
        <div className="login-nav-tabs">
          <button
            className={`login-nav-tab ${activeTab === 'credentials' ? 'active' : ''}`}
            onClick={() => setActiveTab('credentials')}
            type="button"
          >
            Password
          </button>
          <button
            className={`login-nav-tab ${activeTab === 'qr' ? 'active' : ''}`}
            onClick={() => setActiveTab('qr')}
            type="button"
          >
            QR Code Quick Log
          </button>
        </div>

        {activeTab === 'credentials' ? (
          <form className="login-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="login-error-alert">
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
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="emailOrPhone">Email or Phone Number</label>
              <div className="input-field-wrapper">
                <svg
                  className="input-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  id="emailOrPhone"
                  type="text"
                  placeholder="name@company.com or +123456789"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="password">Password</label>
                <a
                  href="#forgot"
                  className="forgot-pass-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToNotFound) onNavigateToNotFound();
                  }}
                >
                  Forgot?
                </a>
              </div>
              <div className="input-field-wrapper">
                <svg
                  className="input-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? (
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
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-remember-row">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark" />
                <span className="checkbox-label">Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-spinner-content">
                  <span className="mini-spinner" />
                  Authenticating...
                </span>
              ) : (
                <span>Sign In to Account</span>
              )}
            </button>
          </form>
        ) : (
          <div className="qr-login-container">
            <div className="qr-code-box">
              {/* Modern SVG QR Code Representation */}
              <svg
                width="160"
                height="160"
                viewBox="0 0 100 100"
                fill="none"
                className="qr-svg"
              >
                <rect width="100" height="100" rx="12" fill="white" />
                {/* QR Corners */}
                <rect x="10" y="10" width="26" height="26" rx="4" fill="#0f172a" />
                <rect x="14" y="14" width="18" height="18" rx="2" fill="white" />
                <rect x="18" y="18" width="10" height="10" rx="1" fill="#6366f1" />

                <rect x="64" y="10" width="26" height="26" rx="4" fill="#0f172a" />
                <rect x="68" y="14" width="18" height="18" rx="2" fill="white" />
                <rect x="72" y="18" width="10" height="10" rx="1" fill="#6366f1" />

                <rect x="10" y="64" width="26" height="26" rx="4" fill="#0f172a" />
                <rect x="14" y="68" width="18" height="18" rx="2" fill="white" />
                <rect x="18" y="72" width="10" height="10" rx="1" fill="#6366f1" />

                {/* Random QR Pixels */}
                <rect x="42" y="10" width="6" height="6" rx="1" fill="#0f172a" />
                <rect x="50" y="10" width="6" height="12" rx="1" fill="#6366f1" />
                <rect x="42" y="22" width="14" height="6" rx="1" fill="#0f172a" />
                <rect x="42" y="32" width="6" height="6" rx="1" fill="#6366f1" />
                <rect x="52" y="32" width="16" height="6" rx="1" fill="#0f172a" />
                <rect x="74" y="32" width="16" height="6" rx="1" fill="#6366f1" />

                <rect x="10" y="42" width="12" height="6" rx="1" fill="#6366f1" />
                <rect x="26" y="42" width="10" height="6" rx="1" fill="#0f172a" />
                <rect x="10" y="52" width="6" height="6" rx="1" fill="#0f172a" />
                <rect x="20" y="52" width="16" height="6" rx="1" fill="#6366f1" />

                <rect x="42" y="44" width="16" height="16" rx="2" fill="#6366f1" />
                <rect x="64" y="44" width="26" height="6" rx="1" fill="#0f172a" />
                <rect x="64" y="54" width="10" height="6" rx="1" fill="#6366f1" />
                <rect x="78" y="54" width="12" height="6" rx="1" fill="#0f172a" />

                <rect x="42" y="64" width="6" height="16" rx="1" fill="#0f172a" />
                <rect x="52" y="64" width="6" height="26" rx="1" fill="#6366f1" />
                <rect x="64" y="64" width="26" height="6" rx="1" fill="#0f172a" />
                <rect x="64" y="74" width="12" height="16" rx="1" fill="#6366f1" />
                <rect x="80" y="74" width="10" height="16" rx="1" fill="#0f172a" />
              </svg>
              <div className="qr-badge-overlay">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>

            <p className="qr-instructions">
              Scan this QR code with your mobile app to instantly log in without entering your password.
            </p>

            <button
              type="button"
              className="login-submit-btn secondary"
              onClick={onLoginSuccess}
            >
              Simulate Mobile Scan Login
            </button>
          </div>
        )}

        <div className="login-footer-info">
          <span>Protected by 256-bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
};
