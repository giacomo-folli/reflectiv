import { register, init, getLocaleFromNavigator, locale, dictionary } from 'svelte-i18n';
import { browser } from '$app/environment';

// Register the translations
register('en', () => import('./locales/en.json'));
register('it', () => import('./locales/it.json'));

// Initialize the i18n library
export function initializeI18n() {
  init({
    fallbackLocale: 'en',
    initialLocale: 'en', // Always start with a valid locale to avoid SSR issues
  });

  // After initialization, set the locale properly if we're in the browser
  if (browser) {
    locale.set(getUserLocale());
  }
}

// Get the user's locale from browser preferences or localStorage
function getUserLocale() {
  // Check if a locale is saved in localStorage
  const savedLocale = browser && localStorage ? localStorage.getItem('preferredLocale') : null;
  if (savedLocale) {
    return savedLocale;
  }
  
  // Try to get the locale from browser settings
  let browserLocale = browser ? getLocaleFromNavigator() : null;
  if (browserLocale) {
    browserLocale = browserLocale.split('-')[0];
  }
  
  // Only return 'it' if it's Italian, otherwise default to English
  return browserLocale === 'it' ? 'it' : 'en';
}

// Helper function to switch locale
export function setLocale(newLocale) {
  locale.set(newLocale);
  if (browser && localStorage) {
    localStorage.setItem('preferredLocale', newLocale);
  }
}

// Get the current locale
export function getCurrentLocale() {
  let currentLocale;
  const unsubscribe = locale.subscribe(value => {
    currentLocale = value;
  });
  unsubscribe();
  
  return currentLocale || 'en';
}

// Export the locale and dictionary for use in components
export { locale, dictionary };