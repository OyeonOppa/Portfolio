/* ========================================
   CONFIGURATION FILE
   config.js
   
   ⚠️ แก้ไข URLs และ settings ที่นี่
   ======================================== */

const CONFIG = {
    // ========================================
    // API URLs
    // ========================================
    
    // Google Apps Script Web App URL
    // แก้เป็น URL ของ Web App ที่ deploy จาก Google Apps Script
    API_URL: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    
    // Newsletter API (ถ้าแยก endpoint)
    // หรือใช้ API_URL เดียวกันก็ได้
    NEWSLETTER_API: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    
    // Testimonial API
    TESTIMONIAL_API: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    
    // ========================================
    // FEATURE FLAGS
    // ========================================
    FEATURES: {
        enableToast: true,              // เปิด/ปิด Toast notifications
        enableAnalytics: false,          // Google Analytics (ยังไม่ได้ setup)
        enableLazyLoad: true,           // Lazy loading สำหรับรูปภาพ
        enableSkeleton: true,           // Skeleton loaders
        debugMode: false                // แสดง console logs เพิ่มเติม
    },
    
    // ========================================
    // UI SETTINGS
    // ========================================
    UI: {
        toastDuration: 3000,            // Toast แสดงกี่ milliseconds
        scrollBehavior: 'smooth',       // smooth หรือ auto
        animationDuration: 300,         // Animation duration (ms)
        
        // Skeleton loader settings
        skeletonShimmerSpeed: 2000,     // ความเร็ว shimmer effect (ms)
        
        // Form settings
        minNameLength: 2,
        minMessageLength: 10,
        maxMessageLength: 1000
    },
    
    // ========================================
    // VALIDATION RULES
    // ========================================
    VALIDATION: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        name: /^[ก-๏a-zA-Z\s\-'.]+$/,
        phone: /^[0-9\-+() ]+$/
    },
    
    // ========================================
    // ERROR MESSAGES
    // ========================================
    MESSAGES: {
        EN: {
            nameRequired: 'Please enter your name',
            nameInvalid: 'Please enter a valid name (at least 2 characters)',
            emailRequired: 'Please enter your email',
            emailInvalid: 'Please enter a valid email address',
            subjectRequired: 'Please select a subject',
            messageRequired: 'Please write a message',
            messageShort: 'Message must be at least 10 characters',
            generalError: 'Please fill in all required fields correctly',
            networkError: 'Network error. Please check your connection.',
            success: 'Message sent successfully!',
            subscribeSuccess: 'Successfully subscribed to newsletter!'
        },
        TH: {
            nameRequired: 'กรุณากรอกชื่อของคุณ',
            nameInvalid: 'กรุณากรอกชื่อที่ถูกต้อง (อย่างน้อย 2 ตัวอักษร)',
            emailRequired: 'กรุณากรอกอีเมล',
            emailInvalid: 'กรุณากรอกอีเมลที่ถูกต้อง',
            subjectRequired: 'กรุณาเลือกหัวข้อ',
            messageRequired: 'กรุณาเขียนข้อความ',
            messageShort: 'ข้อความต้องมีอย่างน้อย 10 ตัวอักษร',
            generalError: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',
            networkError: 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
            success: 'ส่งข้อความสำเร็จ!',
            subscribeSuccess: 'สมัครรับข่าวสารสำเร็จ!'
        },
        KR: {
            nameRequired: '이름을 입력하세요',
            nameInvalid: '유효한 이름을 입력하세요 (최소 2자)',
            emailRequired: '이메일을 입력하세요',
            emailInvalid: '유효한 이메일 주소를 입력하세요',
            subjectRequired: '주제를 선택하세요',
            messageRequired: '메시지를 작성하세요',
            messageShort: '메시지는 최소 10자 이상이어야 합니다',
            generalError: '모든 필수 항목을 올바르게 입력하세요',
            networkError: '네트워크 오류가 발생했습니다',
            success: '메시지가 성공적으로 전송되었습니다!',
            subscribeSuccess: '뉴스레터 구독이 완료되었습니다!'
        }
    },
    
    // ========================================
    // DEFAULT LANGUAGE
    // ========================================
    defaultLanguage: 'EN',
    
    // ========================================
    // SOCIAL MEDIA LINKS
    // ========================================
    SOCIAL: {
        github: 'https://github.com/OyeonOppa/',
        linkedin: 'https://www.linkedin.com/in/oyeon/',
        instagram: 'https://instagram.com/oyeonoppa',
        facebook: 'https://facebook.com/oyeonoppa',
        twitter: 'https://twitter.com/oyeonoppa',
        youtube: 'https://youtube.com/@oyeonoppa'
    },
    
    // ========================================
    // ANALYTICS (Optional)
    // ========================================
    ANALYTICS: {
        googleAnalyticsId: '',          // GA4 Measurement ID
        facebookPixelId: '',            // Facebook Pixel ID
        enableTracking: false
    },
    
    // ========================================
    // SEO SETTINGS
    // ========================================
    SEO: {
        siteName: 'OYEON - Korea Travel Influencer & Insider',
        defaultTitle: 'OYEON - Korea Travel Influencer & Web Developer',
        defaultDescription: 'Sharing real travel experiences, cultural insights, and perspectives on Korea — beyond trends and hype.',
        ogImage: '/images/og-image.jpg',
        twitterCard: 'summary_large_image'
    }
};

// ========================================
// HELPER FUNCTIONS
// ========================================

// Get message in current language
CONFIG.getMessage = function(key, lang = this.defaultLanguage) {
    return this.MESSAGES[lang]?.[key] || this.MESSAGES.EN[key] || key;
};

// Debug log (only if debug mode enabled)
CONFIG.log = function(...args) {
    if (this.FEATURES.debugMode) {
        console.log('[CONFIG]', ...args);
    }
};

// Validate API URLs
CONFIG.validateUrls = function() {
    const urls = [this.API_URL, this.NEWSLETTER_API, this.TESTIMONIAL_API];
    const hasPlaceholder = urls.some(url => 
        url.includes('YOUR_DEPLOYMENT_ID') || 
        url.includes('YOUR_WEB_APP_URL')
    );
    
    if (hasPlaceholder) {
        console.warn('⚠️ Warning: API URLs contain placeholders. Please update config.js with actual URLs.');
        return false;
    }
    return true;
};

// Initialize config
CONFIG.init = function() {
    this.log('Initializing configuration...');
    this.validateUrls();
    this.log('Configuration loaded:', {
        features: this.FEATURES,
        language: this.defaultLanguage,
        apiConfigured: !this.API_URL.includes('YOUR_DEPLOYMENT_ID')
    });
};

// Auto-initialize when loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        CONFIG.init();
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}