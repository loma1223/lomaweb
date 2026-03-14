/**
 * CAFE LOMA - Cookie Banner (DSGVO)
 * Handles cookie consent management
 */

(function() {
  'use strict';

  // Cookie Banner Configuration
  const COOKIE_NAME = 'cafe_loma_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // DOM Elements
  let banner = null;
  let acceptBtn = null;
  let declineBtn = null;

  /**
   * Initialize Cookie Banner
   */
  function init() {
    // Check if consent already given
    if (hasConsent()) {
      return;
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupBanner);
    } else {
      setupBanner();
    }
  }

  /**
   * Setup Cookie Banner
   */
  function setupBanner() {
    banner = document.getElementById('cookie-banner');
    acceptBtn = document.getElementById('cookie-accept');
    declineBtn = document.getElementById('cookie-decline');

    if (!banner) return;

    // Add event listeners
    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies);
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', declineCookies);
    }

    // Show banner with slight delay for better UX
    setTimeout(() => {
      banner.classList.add('cookie-banner--visible');
    }, 1000);
  }

  /**
   * Accept Cookies
   */
  function acceptCookies() {
    setCookieConsent('accepted');
    hideBanner();
    
    // Trigger any analytics/tracking initialization here
    document.dispatchEvent(new CustomEvent('cookiesAccepted'));
  }

  /**
   * Decline Cookies
   */
  function declineCookies() {
    setCookieConsent('declined');
    hideBanner();
    
    // Ensure no tracking cookies are set
    document.dispatchEvent(new CustomEvent('cookiesDeclined'));
  }

  /**
   * Hide Banner
   */
  function hideBanner() {
    if (banner) {
      banner.classList.remove('cookie-banner--visible');
      
      // Remove from DOM after animation
      setTimeout(() => {
        banner.style.display = 'none';
      }, 350);
    }
  }

  /**
   * Set Cookie Consent
   */
  function setCookieConsent(value) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
    
    const cookieValue = encodeURIComponent(value);
    const cookieString = `${COOKIE_NAME}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
    
    document.cookie = cookieString;
    
    // Also store in localStorage as backup
    try {
      localStorage.setItem(COOKIE_NAME, value);
    } catch (e) {
      // localStorage not available
    }
  }

  /**
   * Get Cookie Consent
   */
  function getCookieConsent() {
    // Check cookies first
    const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
    if (match) {
      return decodeURIComponent(match[2]);
    }
    
    // Fallback to localStorage
    try {
      return localStorage.getItem(COOKIE_NAME);
    } catch (e) {
      return null;
    }
  }

  /**
   * Check if consent has been given
   */
  function hasConsent() {
    return getCookieConsent() !== null;
  }

  /**
   * Check if cookies were accepted
   */
  function wasAccepted() {
    return getCookieConsent() === 'accepted';
  }

  /**
   * Check if cookies were declined
   */
  function wasDeclined() {
    return getCookieConsent() === 'declined';
  }

  /**
   * Reset consent (for testing)
   */
  function resetConsent() {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    try {
      localStorage.removeItem(COOKIE_NAME);
    } catch (e) {
      // localStorage not available
    }
  }

  // Expose public API
  window.CookieBanner = {
    init,
    hasConsent,
    wasAccepted,
    wasDeclined,
    resetConsent
  };

  // Auto-initialize
  init();
})();
