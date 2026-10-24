import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { api } from '@/services/api';
import { authReducer, type AuthSession, type AuthState, type UserProfile } from './types';

const SESSION_KEY = 'lets-learn-session';

type AuthContextValue = {
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (details: { name: string; email: string; password: string }) => Promise<void>;
  updateProfile: (details: { name: string; email: string; password?: string }) => Promise<UserProfile>;
  deleteAccount: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function readSession(): Promise<string | null> {
  return Platform.OS === 'web' ? window.localStorage.getItem(SESSION_KEY) : SecureStore.getItemAsync(SESSION_KEY);
}

async function writeSession(value: string): Promise<void> {
  if (Platform.OS === 'web') {
    window.localStorage.setItem(SESSION_KEY, value);
    return;
  }
  await SecureStore.setItemAsync(SESSION_KEY, value);
}

async function clearSession(): Promise<void> {
  if (Platform.OS === 'web') {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { status: 'restoring' });

  useEffect(() => {
    let active = true;
    readSession()
      .then((serialized) => {
        if (!active) return;
        if (!serialized) {
          dispatch({ type: 'RESTORE', session: null });
          return;
        }
        const session = JSON.parse(serialized) as AuthSession;
        if (!session.token || !session.user?.id || !session.user.email) {
          throw new Error('The saved sign-in session is incomplete. Please sign in again.');
        }
        dispatch({ type: 'RESTORE', session });
      })
      .catch((error: unknown) => {
        if (active) dispatch({ type: 'ERROR', message: error instanceof Error ? error.message : 'Could not restore your sign-in session.' });
      });
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await api.signIn(email, password);
    const session = { token: result.token, user: result.user };
    await writeSession(JSON.stringify(session));
    dispatch({ type: 'SIGN_IN', session });
  }, []);

  const signUp = useCallback(async (details: { name: string; email: string; password: string }) => {
    await api.signUp(details);
  }, []);

  const updateProfile = useCallback(async (
    details: { name: string; email: string; password?: string },
  ) => {
    if (state.status !== 'signedIn') throw new Error('Sign in to update your profile.');
    const user = await api.updateUser(state.session.user.id, state.session.token, details);
    const session = { ...state.session, user };
    await writeSession(JSON.stringify(session));
    dispatch({ type: 'SIGN_IN', session });
    return user;
  }, [state]);

  const deleteAccount = useCallback(async () => {
    if (state.status !== 'signedIn') throw new Error('Sign in to delete your account.');
    await api.deleteUser(state.session.user.id, state.session.token);
    dispatch({ type: 'SIGN_OUT' });
    await clearSession();
  }, [state]);

  const signOut = useCallback(async () => {
    if (state.status !== 'signedIn') return;
    let signOutError: unknown;
    try {
      await api.signOut(state.session.token);
    } catch (error) {
      signOutError = error;
    }
    dispatch({ type: 'SIGN_OUT' });
    await clearSession();
    if (signOutError) {
      throw new Error(`You were signed out on this device, but the backend sign-out request failed: ${signOutError instanceof Error ? signOutError.message : 'Unknown error'}`);
    }
  }, [state]);

  const value = useMemo(() => ({ state, signIn, signUp, updateProfile, deleteAccount, signOut }), [
    state,
    signIn,
    signUp,
    updateProfile,
    deleteAccount,
    signOut,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
