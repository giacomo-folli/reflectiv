/**
 * Validate an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether the email is valid
 */
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a password
 * @param {string} password - Password to validate
 * @returns {Object} - Object with valid boolean and message string
 */
export function validatePassword(password: string) {
  if (!password || password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one number",
    };
  }

  return { valid: true, message: "" };
}

/**
 * Validate a URL
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Validate all login form fields
 * @param {Object} formData - Form data object with email and password
 * @returns {Object} - Object with errors object and boolean indicating if form is valid
 */
export function validateLoginForm(formData: any) {
  const errors: any = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

/**
 * Validate all registration form fields
 * @param {Object} formData - Form data object with name, email, password and confirmPassword
 * @returns {Object} - Object with errors object and boolean indicating if form is valid
 */
export function validateRegistrationForm(formData: any) {
  const errors: any = {};

  if (!formData.name) {
    errors.name = "Name is required";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.message;
    }
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

/**
 * Validate ChatGPT link submission
 * @param {Object} linkData - Link data object with title and url
 * @returns {Object} - Object with errors object and boolean indicating if form is valid
 */
export function validateLinkSubmission(linkData: any) {
  const errors: any = {};

  if (!linkData.title) {
    errors.title = "Title is required";
  } else if (linkData.title.length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (!linkData.url) {
    errors.url = "URL is required";
  } else if (!isValidUrl(linkData.url)) {
    errors.url = "URL is invalid";
  } else if (!linkData.url.includes("chat.openai.com/share/")) {
    errors.url = "URL must be a ChatGPT shared link";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
