export type StateInstance =
  | 'authorized'
  | 'notAuthorized'
  | 'blocked'
  | 'starting'
  | 'suspended'
  | 'pendingPassword';

export interface GetStateInstanceResponse {
  stateInstance: StateInstance;
}

export interface GreenApiCredentials {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl?: string;
}

export interface GetAccountSettingsResponse {
  phone?: string;
  wid?: string;
  countryInstance?: string;
  typeInstance?: string;
}

export interface LogoutResponse {
  isLogout?: boolean;
  statusInstanceChanged?: boolean;
}
