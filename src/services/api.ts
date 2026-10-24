import { Platform } from 'react-native';

import type { UserProfile } from '@/auth/types';

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5500').replace(/\/+$/, '');

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
};

async function request<T>(path: string, options: RequestInit = {}, token?: string, allowMissingData = false): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    const hostHint =
      Platform.OS === 'android'
        ? ' On an Android emulator, set EXPO_PUBLIC_API_URL to http://10.0.2.2:<port>.'
        : '';
    throw new Error(`Could not connect to the server. Our team is currently fixing it. We are sorry for the inconvenience. Please try again later.`);
  }

  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T>;
  if (!response.ok) {
    throw new Error(payload.error || payload.message || `Request failed (${response.status})`);
  }
  if (payload.data === undefined) {
    if (allowMissingData && payload.success) return undefined as T;
    throw new Error('An unknown error has occured.');
  }
  return payload.data;
}

async function requestChatReply(message: string, token: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/ai/chat`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new Error('Could not connect to the chatbot service. Please try again.');
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error('The chatbot service returned an invalid response.');
  }

  if (!response.ok) {
    if (typeof payload === 'object' && payload !== null) {
      const error = 'error' in payload && typeof payload.error === 'string' ? payload.error : null;
      const messageText = 'message' in payload && typeof payload.message === 'string' ? payload.message : null;
      throw new Error(error || messageText || `Chat request failed (${response.status}).`);
    }
    throw new Error(`Chat request failed (${response.status}).`);
  }

  if (
    typeof payload !== 'object'
    || payload === null
    || !('role' in payload)
    || payload.role !== 'assistant'
    || !('content' in payload)
    || typeof payload.content !== 'string'
  ) {
    throw new Error('The chatbot service returned an unexpected response.');
  }

  return payload.content;
}

export const api = {
  async signIn(email: string, password: string) {
    return request<{ token: string; user: UserProfile }>('/api/v1/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async signUp(details: { name: string; email: string; password: string }) {
    return request<{ user: UserProfile }>('/api/v1/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(details),
    });
  },

  async getUser(id: number | string, token: string) {
    return request<UserProfile>(`/api/v1/users/${encodeURIComponent(id)}`, {}, token);
  },

  async updateUser(
    id: number | string,
    token: string,
    details: { name: string; email: string; password?: string },
  ) {
    return request<UserProfile>(`/api/v1/users/${encodeURIComponent(id)}/update`, {
      method: 'PUT',
      body: JSON.stringify(details),
    }, token);
  },

  async deleteUser(id: number | string, token: string) {
    return request<UserProfile>(`/api/v1/users/${encodeURIComponent(id)}/delete`, {
      method: 'DELETE',
    }, token);
  },

  async signOut(token: string) {
    return request<void>('/api/v1/auth/sign-out', { method: 'POST' }, token, true);
  },

  async chat(message: string, token: string) {
    return requestChatReply(message, token);
  },
};
