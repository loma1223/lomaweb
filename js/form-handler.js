/**
 * CAFE LOMA - Form Handler
 * Handles Web3Forms integration
 */

(function() {
  'use strict';

  // Web3Forms Configuration
  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
  
  // DOM Elements
  let contactForm = null;
  let submitBtn = null;
  let successAlert = null;
  let errorAlert = null;

  /**
   * Initialize Form Handler
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupForm);
    } else {
      setupForm();
    }
  }

  /**
   * Setup Contact Form
   */
  function setupForm() {
    contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    submitBtn = contactForm.querySelector('[type="submit"]');
    successAlert = document.getElementById('form-success');
    errorAlert = document.getElementById('form-error');

    contactForm.addEventListener('submit', handleSubmit);
  }

  /**
   * Handle Form Submission
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Disable submit button
    setLoading(true);

    // Hide previous alerts
    hideAlerts();

    try {
      const formData = new FormData(contactForm);
      
      // Add additional fields
      formData.append('subject', 'Neue Nachricht von Cafe Loma Website');
      formData.append('from_name', 'Cafe Loma Kontaktformular');

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        handleSuccess();
      } else {
        handleError(data.message || 'Ein Fehler ist aufgetreten.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      handleError('Verbindungsfehler. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Validate Form
   */
  function validateForm() {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const formGroup = field.closest('.form-group');
      
      if (!field.value.trim()) {
        formGroup.classList.add('has-error');
        isValid = false;
      } else {
        // Email validation
        if (field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            formGroup.classList.add('has-error');
            isValid = false;
          } else {
            formGroup.classList.remove('has-error');
          }
        } else {
          formGroup.classList.remove('has-error');
        }
      }
    });

    return isValid;
  }

  /**
   * Handle Success
   */
  function handleSuccess() {
    contactForm.reset();
    
    if (successAlert) {
      successAlert.classList.remove('alert--hidden');
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      hideAlerts();
    }, 5000);
  }

  /**
   * Handle Error
   */
  function handleError(message) {
    if (errorAlert) {
      errorAlert.textContent = message;
      errorAlert.classList.remove('alert--hidden');
      errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Hide Alerts
   */
  function hideAlerts() {
    if (successAlert) {
      successAlert.classList.add('alert--hidden');
    }
    if (errorAlert) {
      errorAlert.classList.add('alert--hidden');
    }
  }

  /**
   * Set Loading State
   */
  function setLoading(loading) {
    if (!submitBtn) return;

    if (loading) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = 'Wird gesendet...';
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText || 'Nachricht senden';
    }
  }

  /**
   * Clear error state on input
   */
  function setupInputValidation() {
    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        const formGroup = this.closest('.form-group');
        if (formGroup) {
          formGroup.classList.remove('has-error');
        }
      });
    });
  }

  // Expose public API
  window.FormHandler = {
    init
  };

  // Auto-initialize
  init();
})();
