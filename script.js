// Smooth scrolling for navigation
function scrollToPrice() {
    document.getElementById('pricing').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in-up.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in-left {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
        }
        
        .fade-in-left.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .fade-in-right {
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in-right.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .scale-in {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.6s ease;
        }
        
        .scale-in.animate-in {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
    
    // Apply animation classes to elements
    const animateElements = [
        { selector: '.problem-card', class: 'fade-in-up', delay: true },
        { selector: '.member-card', class: 'scale-in', delay: true },
        { selector: '.timeline-item', class: 'fade-in-left', delay: true },
        { selector: '.benefit-item', class: 'fade-in-right', delay: true },
        { selector: '.solution-text', class: 'fade-in-left' },
        { selector: '.solution-visual', class: 'fade-in-right' },
        { selector: '.pricing-card', class: 'scale-in' }
    ];
    
    animateElements.forEach(({ selector, class: className, delay }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add(className);
            if (delay) {
                el.style.transitionDelay = `${index * 0.1}s`;
            }
            observer.observe(el);
        });
    });
});

// Add floating animation to hero elements
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-badge, .phone-mockup');
    
    heroElements.forEach((el, index) => {
        el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
    
    // Add float keyframes
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
    `;
    document.head.appendChild(floatStyle);
});

// Add hover effects for member cards
document.addEventListener('DOMContentLoaded', () => {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click tracking for CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Track button click (you can integrate with analytics here)
            console.log('CTA Button clicked:', button.textContent.trim());
        });
    });
    
    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Add countdown timer for price increase
document.addEventListener('DOMContentLoaded', () => {
    // Set target date for price increase (August 31, 2025)
    const targetDate = new Date('2025-08-31T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Create countdown display if it doesn't exist
            let countdownEl = document.getElementById('countdown');
            if (!countdownEl) {
                countdownEl = document.createElement('div');
                countdownEl.id = 'countdown';
                countdownEl.innerHTML = `
                    <div class="countdown-container">
                        <div class="countdown-label">値上げまで残り</div>
                        <div class="countdown-time">
                            <span class="time-unit">
                                <span class="time-number">${days}</span>
                                <span class="time-label">日</span>
                            </span>
                            <span class="time-separator">:</span>
                            <span class="time-unit">
                                <span class="time-number">${hours.toString().padStart(2, '0')}</span>
                                <span class="time-label">時間</span>
                            </span>
                            <span class="time-separator">:</span>
                            <span class="time-unit">
                                <span class="time-number">${minutes.toString().padStart(2, '0')}</span>
                                <span class="time-label">分</span>
                            </span>
                            <span class="time-separator">:</span>
                            <span class="time-unit">
                                <span class="time-number">${seconds.toString().padStart(2, '0')}</span>
                                <span class="time-label">秒</span>
                            </span>
                        </div>
                    </div>
                `;
                
                // Insert countdown before pricing section
                const pricingSection = document.querySelector('.pricing');
                if (pricingSection) {
                    pricingSection.insertBefore(countdownEl, pricingSection.firstChild);
                }
            } else {
                // Update existing countdown
                const timeNumbers = countdownEl.querySelectorAll('.time-number');
                if (timeNumbers.length >= 4) {
                    timeNumbers[0].textContent = days;
                    timeNumbers[1].textContent = hours.toString().padStart(2, '0');
                    timeNumbers[2].textContent = minutes.toString().padStart(2, '0');
                    timeNumbers[3].textContent = seconds.toString().padStart(2, '0');
                }
            }
        }
    }
    
    // Add countdown styles
    const countdownStyle = document.createElement('style');
    countdownStyle.textContent = `
        #countdown {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            text-align: center;
            margin-bottom: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .countdown-label {
            color: #FFD700;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .countdown-time {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .time-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 15px 20px;
            border-radius: 15px;
            min-width: 80px;
        }
        
        .time-number {
            font-size: 2rem;
            font-weight: 900;
            color: white;
            line-height: 1;
        }
        
        .time-label {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.8);
            margin-top: 5px;
        }
        
        .time-separator {
            font-size: 1.5rem;
            color: white;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            .countdown-time {
                gap: 5px;
            }
            
            .time-unit {
                min-width: 60px;
                padding: 10px 15px;
            }
            
            .time-number {
                font-size: 1.5rem;
            }
            
            .time-separator {
                display: none;
            }
        }
    `;
    document.head.appendChild(countdownStyle);
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Add lazy loading for images and improve performance
document.addEventListener('DOMContentLoaded', () => {
    // Add intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
});

// Add form validation and submission handling (if needed)
document.addEventListener('DOMContentLoaded', () => {
    // This can be extended for actual form handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'P' to scroll to pricing
    if (e.key === 'p' || e.key === 'P') {
        scrollToPrice();
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add mobile menu functionality (if header menu is added later)
document.addEventListener('DOMContentLoaded', () => {
    // This is prepared for future mobile menu implementation
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});