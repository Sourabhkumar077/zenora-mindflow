
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  login: (userId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  login: (userId) => set({ isAuthenticated: true, userId }),
  logout: () => set({ isAuthenticated: false, userId: null }),
}));