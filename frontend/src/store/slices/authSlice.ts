import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Helper to get user from localStorage
const getUserFromStorage = (): User | null => {
  const user = localStorage.getItem('mockUser');
  return user ? JSON.parse(user) : null;
};

const initialState: AuthState = {
  user: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage(),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
      // Accept any email/password, create a mock user
      const isAdmin = action.payload.email === 'admin@admin.com';
      const user: User = {
        id: Date.now().toString(),
        email: action.payload.email,
        name: action.payload.email.split('@')[0],
        role: isAdmin ? 'admin' : 'user',
      };
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('mockUser', JSON.stringify(user));
    },
    register: (state, action: PayloadAction<{ name: string; email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
      // Accept any registration, create a mock user
      const isAdmin = action.payload.email === 'admin@admin.com';
      const user: User = {
        id: Date.now().toString(),
        email: action.payload.email,
        name: action.payload.name,
        role: isAdmin ? 'admin' : 'user',
      };
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('mockUser', JSON.stringify(user));
    },
    logout: (state) => {
      localStorage.removeItem('mockUser');
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, register, logout, clearError } = authSlice.actions;
export default authSlice.reducer; 