import type {
  GetStateInstanceResponse,
  GetAccountSettingsResponse,
  LogoutResponse,
} from '../types/greenApi';

export const DEFAULT_API_URL = 'https://api.green-api.com';

/**
 * Normalizes host URL to ensure clean formatting without trailing slash
 */
export function formatApiUrl(url?: string): string {
  if (!url || !url.trim()) {
    return DEFAULT_API_URL;
  }
  let formatted = url.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = `https://${formatted}`;
  }
  return formatted.replace(/\/$/, '');
}

/**
 * Get instance status from Green API (getStateInstance)
 * https://green-api.com/v3/docs/api/account/GetStateInstance/
 */
export async function getStateInstance(
  idInstance: string,
  apiTokenInstance: string,
  apiUrl?: string
): Promise<GetStateInstanceResponse> {
  const baseUrl = formatApiUrl(apiUrl);
  const endpoint = `${baseUrl}/waInstance${idInstance.trim()}/getStateInstance/${apiTokenInstance.trim()}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMsg = `API Request failed with status ${response.status}`;
    try {
      const errData = await response.json();
      if (errData && errData.message) {
        errorMsg = errData.message;
      }
    } catch {
      // ignore json parse errors
    }
    throw new Error(errorMsg);
  }

  const data: GetStateInstanceResponse = await response.json();
  return data;
}

/**
 * Get account settings from Green API (getSettings / getAccountSettings)
 */
export async function getAccountSettings(
  idInstance: string,
  apiTokenInstance: string,
  apiUrl?: string
): Promise<GetAccountSettingsResponse> {
  const baseUrl = formatApiUrl(apiUrl);
  const endpoint = `${baseUrl}/waInstance${idInstance.trim()}/getSettings/${apiTokenInstance.trim()}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {};
    }

    const data: GetAccountSettingsResponse = await response.json();
    return data;
  } catch {
    return {};
  }
}

/**
 * Log out instance from Green API (logout)
 * https://green-api.com/v3/docs/api/account/Logout/
 */
export async function logoutInstance(
  idInstance: string,
  apiTokenInstance: string,
  apiUrl?: string
): Promise<LogoutResponse> {
  const baseUrl = formatApiUrl(apiUrl);
  const endpoint = `${baseUrl}/waInstance${idInstance.trim()}/logout/${apiTokenInstance.trim()}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { isLogout: false };
    }

    const data: LogoutResponse = await response.json();
    return data;
  } catch {
    return { isLogout: false };
  }
}
