/* ========================================
   OYEON Portfolio - JavaScript
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // NAVIGATION SCROLL EFFECT
    // ========================================
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // ========================================
    // FADE-IN ANIMATION ON SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe all cards and skill items
    const animatedElements = document.querySelectorAll(
        '.content-card, .project-card, .skill-item, .tool-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ========================================
    // LOAD BLOG POSTS FROM JSON (OPTIONAL)
    // ========================================
    function loadBlogPosts() {
        fetch('data/posts.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('ไม่สามารถโหลดโพสต์ได้');
                }
                return response.json();
            })
            .then(data => {
                const recentPosts = data.posts.slice(0, 3);
                const container = document.getElementById('blog-posts-container');
                
                if (!container) {
                    console.log('ไม่พบ blog-posts-container');
                    return;
                }
                
                container.innerHTML = '';
                
                recentPosts.forEach(post => {
                    const date = new Date(post.date);
                    const thaiDate = date.toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    const article = document.createElement('article');
                    article.className = 'blog-post';
                    article.innerHTML = `
                        <div class="post-date">${thaiDate}</div>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <a href="blog-post-${post.slug}.html" class="read-more">อ่านต่อ →</a>
                    `;
                    
                    container.appendChild(article);
                });
                
                console.log(`✅ โหลดโพสต์สำเร็จ ${recentPosts.length} โพสต์`);
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                
                const container = document.getElementById('blog-posts-container');
                if (container) {
                    container.innerHTML = `
                        <p style="text-align: center; color: #999;">
                            ⚠️ ไม่สามารถโหลดบล็อกโพสต์ได้<br>
                            <small>กรุณารันผ่าน Local Server หรือ Deploy ขึ้นเว็บ</small>
                        </p>
                    `;
                }
            });
    }
    
    // เรียกใช้ฟังก์ชันโหลดบล็อก - โหลดจาก posts.json อัตโนมัติ
    loadBlogPosts();

    // ========================================
    // TESTIMONIALS SLIDER
    // ========================================
    let currentTestimonial = 0;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (testimonialItems[index]) {
            testimonialItems[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto slide every 5 seconds
    if (testimonialItems.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c👋 สวัสดีครับ!', 'color: #CD2E3A; font-size: 20px; font-weight: bold;');
    console.log('%c🇰🇷 Welcome to OYEON Portfolio', 'color: #003478; font-size: 16px;');
    console.log('%cสนใจทำงานร่วมกัน? ติดต่อผมได้เลยครับ!', 'color: #666; font-size: 14px;');

}); // End of DOMContentLoaded

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit how often a function can run
 * Useful for scroll and resize events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}