import type { Toast } from "$lib/types";
import { writable } from "svelte/store";

const toastStore = writable<Toast[]>([]);

const generateId = () => {
  return `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Add a new toast notification
export function addToast(
  message: Toast["message"],
  type: Toast["type"] = "info",
  duration: Toast["duration"] = 3000
) {
  const id = generateId();

  toastStore.update((toasts) => [...toasts, { id, message, type, duration }]);

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }

  return id;
}

// Remove a specific toast by ID
export function removeToast(id: number | string) {
  toastStore.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

// Shorthand methods for different toast types
export const toast = {
  info: (message: Toast["message"], duration: Toast["duration"]) =>
    addToast(message, "info", duration),
  success: (message: Toast["message"], duration: Toast["duration"]) =>
    addToast(message, "success", duration),
  warning: (message: Toast["message"], duration: Toast["duration"]) =>
    addToast(message, "warning", duration),
  error: (message: Toast["message"], duration: Toast["duration"]) =>
    addToast(message, "error", duration),
};

export default toastStore;
