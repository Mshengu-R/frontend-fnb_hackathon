export type UserProfile = {
  id: number | string;
  name: string;
  email: string;
};

export type AuthSession = {
  token: string;
  user: UserProfile;
};

export type AuthState =
  | { status: 'restoring' }
  | { status: 'signedOut' }
  | { status: 'signedIn'; session: AuthSession }
  | { status: 'error'; message: string };

export type AuthAction =
  | { type: 'RESTORE'; session: AuthSession | null }
  | { type: 'SIGN_IN'; session: AuthSession }
  | { type: 'SIGN_OUT' }
  | { type: 'ERROR'; message: string };

export function authReducer(_state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE':
      return action.session ? { status: 'signedIn', session: action.session } : { status: 'signedOut' };
    case 'SIGN_IN':
      return { status: 'signedIn', session: action.session };
    case 'SIGN_OUT':
      return { status: 'signedOut' };
    case 'ERROR':
      return { status: 'error', message: action.message };
  }
}
