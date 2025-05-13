import { writable } from 'svelte/store';

// Create a writable store for toast notifications
const toastStore = writable([]);

// Generate a unique ID for each toast
const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

// Add a new toast notification
export function addToast(message, type = 'info', duration = 3000) {
  const id = generateId();
  
  // Add toast to the store
  toastStore.update(toasts => [
    ...toasts,
    {
      id,
      message,
      type,
      duration
    }
  ]);
  
  // Automatically remove toast after duration
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
  
  return id;
}

// Remove a specific toast by ID
export function removeToast(id) {
  toastStore.update(toasts => toasts.filter(toast => toast.id !== id));
}

// Shorthand methods for different toast types
export const toast = {
  info: (message, duration) => addToast(message, 'info', duration),
  success: (message, duration) => addToast(message, 'success', duration),
  warning: (message, duration) => addToast(message, 'warning', duration),
  error: (message, duration) => addToast(message, 'error', duration)
};

export default toastStore;