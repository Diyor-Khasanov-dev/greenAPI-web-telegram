import React, { useState } from 'react';
import { getStateInstance, DEFAULT_API_URL } from '../api/greenApi';
import type { GreenApiCredentials } from '../types/greenApi';

interface LoginPageProps {
  onLoginSuccess: (credentials: GreenApiCredentials) => void;
  onNavigateToNotFound?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
}) => {
  const [idInstance, setIdInstance] = useState(() => {
    return localStorage.getItem('green_api_id_instance') || '';
  });
  const [apiTokenInstance, setApiTokenInstance] = useState(() => {
    return localStorage.getItem('green_api_token_instance') || '';
  });
  const [apiUrl, setApiUrl] = useState(() => {
    return localStorage.getItem('green_api_url') || DEFAULT_API_URL;
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedId = idInstance.trim();
    const trimmedToken = apiTokenInstance.trim();
    const trimmedUrl = apiUrl.trim() || DEFAULT_API_URL;

    if (!trimmedId) {
      setErrorMessage('Please enter your idInstance');
      return;
    }

    if (!trimmedToken) {
      setErrorMessage('Please enter your apiTokenInstance');
      return;
    }

    setIsLoading(true);

    try {
      const result = await getStateInstance(trimmedId, trimmedToken, trimmedUrl);

      if (result.stateInstance === 'notAuthorized') {
        setErrorMessage(
          'Instance status is "notAuthorized". Please authorize your phone number with QR-code in GREEN-API console.'
        );
        setIsLoading(false);
        return;
      }

      if (result.stateInstance === 'blocked') {
        setErrorMessage(
          'Instance account is blocked. Please check your GREEN-API account.'
        );
        setIsLoading(false);
        return;
      }

      // Save credentials in localStorage
      localStorage.setItem('green_api_id_instance', trimmedId);
      localStorage.setItem('green_api_token_instance', trimmedToken);
      localStorage.setItem('green_api_url', trimmedUrl);

      setIsLoading(false);
      onLoginSuccess({
        idInstance: trimmedId,
        apiTokenInstance: trimmedToken,
        apiUrl: trimmedUrl,
      });
    } catch (err: unknown) {
      setIsLoading(false);
      const msg =
        err instanceof Error ? err.message : 'Failed to authenticate with Green API';
      setErrorMessage(
        `${msg}. Please verify your idInstance and apiTokenInstance.`
      );
    }
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
          <h1 className="login-title">GREEN-API Login</h1>
          <p className="login-subtitle">
            Enter your GREEN-API instance credentials to authenticate
          </p>
        </div>

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
            <label htmlFor="idInstance">idInstance *</label>
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
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <line x1="7" y1="8" x2="17" y2="8"></line>
                <line x1="7" y1="12" x2="13" y2="12"></line>
              </svg>
              <input
                id="idInstance"
                type="text"
                placeholder="e.g. 7103847291"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="apiTokenInstance">apiTokenInstance *</label>
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
                id="apiTokenInstance"
                type={showToken ? 'text' : 'password'}
                placeholder="Enter apiTokenInstance"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowToken(!showToken)}
                title={showToken ? 'Hide Token' : 'Show Token'}
              >
                {showToken ? (
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

          <div className="form-group">
            <button
              type="button"
              className="advanced-toggle-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color, #6366f1)',
                padding: '4px 0',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>{showAdvanced ? 'Hide API Host Settings' : 'Advanced: Custom API Host'}</span>
            </button>

            {showAdvanced && (
              <div className="input-field-wrapper" style={{ marginTop: '8px' }}>
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <input
                  id="apiUrl"
                  type="text"
                  placeholder="https://api.green-api.com"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn-spinner-content">
                <span className="mini-spinner" />
                Authenticating Green API...
              </span>
            ) : (
              <span>Sign In with Green API</span>
            )}
          </button>
        </form>

        <div className="login-footer-info">
          <span>Protected by GREEN-API Secure Gateway</span>
        </div>
      </div>
    </div>
  );
};
