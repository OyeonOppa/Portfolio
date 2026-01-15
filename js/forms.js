/* ========================================
   FORMS HANDLER - forms.js
   จัดการ Contact Form และ Newsletter Form
   ======================================== */

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    // ⚠️ แก้ไข API URLs ตรงนี้
    API_URL: 'YOUR_WEB_APP_URL_HERE',
    NEWSLETTER_API: 'YOUR_NEWSLETTER_API_URL_HERE'
};

// ========================================
// TOAST NOTIFICATION SYSTEM
// ========================================
class Toast {
    static show(message, type = 'info', duration = 3000) {
        // สร้าง toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // เพิ่ม icon ตาม type
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };
        
        const icon = document.createElement('span');
        icon.textContent = icons[type] || icons.info;
        icon.style.fontSize = '1.5rem';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        toast.appendChild(icon);
        toast.appendChild(text);
        document.body.appendChild(toast);
        
        // แสดง toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // ซ่อน toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
const Utils = {
    // Sanitize input
    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    // Email validation
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Name validation (Thai/English only)
    isValidName(name) {
        const sanitized = this.sanitize(name.trim());
        if (sanitized.length < 2) return false;
        // Allow Thai, English, spaces, and some common characters
        if (!/^[ก-๏a-zA-Z\s\-'.]+$/.test(sanitized)) return false;
        return true;
    },
    
    // Show error message
    showError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    },
    
    // Clear all errors
    clearErrors(formElement) {
        formElement.querySelectorAll('.error-msg').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        formElement.querySelectorAll('input, textarea, select').forEach(el => {
            el.classList.remove('error');
        });
    }
};

// ========================================
// CONTACT FORM HANDLER
// ========================================
(function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitContactBtn');
    const successDiv = document.getElementById('contactSuccess');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset errors
        Utils.clearErrors(form);

        // Get values
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value.trim();

        // Validate
        let hasError = false;

        if (!Utils.isValidName(name)) {
            Utils.showError('nameError', 'Please enter a valid name (at least 2 characters)');
            document.getElementById('contact-name').classList.add('error');
            hasError = true;
        }

        if (!Utils.isValidEmail(email)) {
            Utils.showError('emailError', 'Please enter a valid email address');
            document.getElementById('contact-email').classList.add('error');
            hasError = true;
        }

        if (!subject) {
            Utils.showError('subjectError', 'Please select a subject');
            document.getElementById('contact-subject').classList.add('error');
            hasError = true;
        }

        if (!message || message.length < 10) {
            Utils.showError('messageError', 'Please write a message (at least 10 characters)');
            document.getElementById('contact-message').classList.add('error');
            hasError = true;
        }

        if (hasError) {
            Utils.showError('generalError', 'Please fill in all required fields correctly');
            Toast.show('Please check the form for errors', 'error');
            return;
        }

        // Show loading
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            // Call API
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    action: 'submitContact',
                    name: Utils.sanitize(name),
                    email: email,
                    subject: subject,
                    message: Utils.sanitize(message),
                    timestamp: new Date().toISOString()
                })
            });

            const result = await response.json();

            if (result.success) {
                // Show success
                form.style.display = 'none';
                successDiv.classList.add('show');
                Toast.show('Message sent successfully!', 'success');
                
                // Scroll to success message
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                Utils.showError('generalError', result.message || 'An error occurred. Please try again.');
                Toast.show(result.message || 'Failed to send message', 'error');
            }

        } catch (error) {
            console.error('Submit error:', error);
            Utils.showError('generalError', 'Network error. Please check your connection and try again.');
            Toast.show('Network error. Please try again.', 'error');
        } finally {
            // Hide loading
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    // Reset form function (global)
    window.resetContactForm = function() {
        form.reset();
        form.style.display = 'block';
        successDiv.classList.remove('show');
        Utils.clearErrors(form);
    };
})();

// ========================================
// NEWSLETTER FORM HANDLER
// ========================================
(function() {
    const form = document.getElementById('newsletterForm');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const successDiv = document.getElementById('newsletterSuccess');
    const errorDiv = document.getElementById('newsletterError');
    const errorMessage = document.getElementById('newsletterErrorMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset
        errorDiv.classList.remove('show');
        document.querySelectorAll('.newsletter-form input').forEach(el => {
            el.classList.remove('error');
        });

        // Get values
        const name = document.getElementById('newsletter-name').value.trim();
        const email = document.getElementById('newsletter-email').value.trim();

        // Validate
        if (!Utils.isValidName(name)) {
            document.getElementById('newsletter-name').classList.add('error');
            errorMessage.textContent = 'กรุณากรอกชื่อที่ถูกต้อง (อย่างน้อย 2 ตัวอักษร)';
            errorDiv.classList.add('show');
            Toast.show('กรุณากรอกชื่อที่ถูกต้อง', 'error');
            return;
        }

        if (!Utils.isValidEmail(email)) {
            document.getElementById('newsletter-email').classList.add('error');
            errorMessage.textContent = 'กรุณากรอกอีเมลที่ถูกต้อง';
            errorDiv.classList.add('show');
            Toast.show('กรุณากรอกอีเมลที่ถูกต้อง', 'error');
            return;
        }

        // Show loading
        subscribeBtn.disabled = true;
        subscribeBtn.classList.add('loading');

        try {
            // Call API
            const response = await fetch(CONFIG.NEWSLETTER_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    action: 'subscribeEmail',
                    name: Utils.sanitize(name),
                    email: email,
                    timestamp: new Date().toISOString()
                })
            });

            const result = await response.json();

            if (result.success) {
                // Show success
                form.style.display = 'none';
                successDiv.classList.add('show');
                Toast.show('สมัครรับข่าวสารสำเร็จ!', 'success');
            } else {
                // Show error
                errorMessage.textContent = result.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่';
                errorDiv.classList.add('show');
                Toast.show(result.message || 'เกิดข้อผิดพลาด', 'error');
            }

        } catch (error) {
            console.error('Subscribe error:', error);
            errorMessage.textContent = 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง';
            errorDiv.classList.add('show');
            Toast.show('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        } finally {
            // Hide loading
            subscribeBtn.disabled = false;
            subscribeBtn.classList.remove('loading');
        }
    });
})();

// ========================================
// FORM VALIDATION HELPERS
// ========================================

// Real-time validation for email fields
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !Utils.isValidEmail(this.value)) {
                this.classList.add('error');
                const errorId = this.id + 'Error';
                const errorEl = document.getElementById(errorId);
                if (errorEl) {
                    errorEl.textContent = 'Please enter a valid email address';
                    errorEl.classList.add('show');
                }
            } else {
                this.classList.remove('error');
                const errorId = this.id + 'Error';
                const errorEl = document.getElementById(errorId);
                if (errorEl) {
                    errorEl.classList.remove('show');
                }
            }
        });
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Toast, Utils, CONFIG };
}