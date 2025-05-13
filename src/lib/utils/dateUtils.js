/**
 * Get the number of days in a month
 * @param {number} month - 1-12 for January-December
 * @param {number} year - Full year (e.g., 2025)
 * @returns {number} - Number of days in the month
 */
export function getDaysInMonth(month, year) {
  // JavaScript months are 0-based, so we subtract 1 from the month
  return new Date(year, month, 0).getDate();
}

/**
 * Format a date as a string
 * @param {Date} date - Date object to format
 * @param {string} format - Format string (default: 'YYYY-MM-DD')
 * @returns {string} - Formatted date string
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
}

/**
 * Get the current month and year
 * @returns {Object} - Object with month (1-12) and year properties
 */
export function getCurrentMonthYear() {
  const now = new Date();
  return {
    month: now.getMonth() + 1, // Convert from 0-11 to 1-12
    year: now.getFullYear()
  };
}

/**
 * Get a list of all months
 * @returns {Array} - Array of month objects with value and label
 */
export function getMonthOptions() {
  return [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];
}

/**
 * Get a list of year options (current year plus 2 past and 2 future years)
 * @returns {Array} - Array of year objects with value and label
 */
export function getYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  for (let year = currentYear - 2; year <= currentYear + 2; year++) {
    years.push({ value: year, label: year.toString() });
  }
  
  return years;
}