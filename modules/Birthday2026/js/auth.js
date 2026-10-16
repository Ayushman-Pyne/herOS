/**
 * Authentication Module
 * Validates User ID: 'they_boooo' (placeholder "Instagram ID")
 * and Password: '3101' (placeholder "My Birthday DDMM")
 */

function validateLogin(username, password) {
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const isValidUser = cleanUser === 'they_boooo' || cleanUser === '@they_boooo';
  const isValidPass = cleanPass === '3101';

  return isValidUser && isValidPass;
}

if (typeof window !== 'undefined') {
  window.validateLogin = validateLogin;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateLogin };
}
