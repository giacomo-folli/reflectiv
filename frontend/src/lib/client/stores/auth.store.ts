import { writable } from 'svelte/store';
import { apiService } from '../services/api.service';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    loading: false,
    error: null,
  });

  return {
    subscribe,
    
    async login(email: string, password: string) {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const result = await apiService.login(email, password);
        if (result.success && result.user) {
          update(state => ({ ...state, user: result.user, loading: false }));
          return { success: true };
        }
        throw new Error('Login failed');
      } catch (error: any) {
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error.message || 'Login failed' 
        }));
        throw error;
      }
    },

    async register(email: string, password: string, name: string) {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const result = await apiService.register(email, password, name);
        if (result.success && result.user) {
          update(state => ({ ...state, user: result.user, loading: false }));
          return { success: true };
        }
        throw new Error('Registration failed');
      } catch (error: any) {
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error.message || 'Registration failed' 
        }));
        throw error;
      }
    },

    async logout() {
      try {
        await apiService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        set({ user: null, loading: false, error: null });
      }
    },

    async checkAuth() {
      update(state => ({ ...state, loading: true }));
      
      try {
        const result = await apiService.getCurrentUser();
        if (result.user) {
          update(state => ({ ...state, user: result.user, loading: false }));
          return true;
        }
        update(state => ({ ...state, user: null, loading: false }));
        return false;
      } catch (error) {
        update(state => ({ ...state, user: null, loading: false }));
        return false;
      }
    },

    clearError() {
      update(state => ({ ...state, error: null }));
    },
  };
};

export const authStore = createAuthStore(); 