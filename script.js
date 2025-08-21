
/**
 * Portfolio Website JavaScript
 * Handles smooth scrolling, fade-in animations, and interactive elements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeScrollAnimations();
    initializeSkillPillAnimations();
    initializeSmoothScrolling();
    initializeContactFormHandling();
    
    console.log('Portfolio website initialized successfully');
});

/**
 * Intersection Observer for fade-in animations
 * Observes elements with 'fade-in' class and adds 'visible' class when in viewport
 */
function initializeScrollAnimations() {
    // Configuration for intersection observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with a slight delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                
                // Stop observing this element once it's animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log(`Initialized scroll animations for ${fadeElements.length} elements`);
}

/**
 * Enhanced skill pill animations
 * Adds interactive hover effects and click handling
 */
function initializeSkillPillAnimations() {
    const skillPills = document.querySelectorAll('.skill-pill');
    
    skillPills.forEach(pill => {
        // Add click event for potential future functionality
        pill.addEventListener('click', function() {
            // Create ripple effect
            createRippleEffect(this);
        });
        
        // Add mouse enter/leave events for enhanced hover effects
        pill.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        pill.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    console.log(`Enhanced ${skillPills.length} skill pills with animations`);
}

/**
 * Create ripple effect on skill pill click
 * @param {HTMLElement} element - The clicked element
 */
function createRippleEffect(element) {
    // Remove existing ripple
    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    // Create new ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Calculate ripple size and position
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    
    // Style the ripple
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    // Add ripple to element
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Smooth scrolling for anchor links
 * Enhances the CSS scroll-behavior with JavaScript fallback
 */
function initializeSmoothScrolling() {
    // Handle clicks on anchor links
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;
        
        const href = target.getAttribute('href');
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        e.preventDefault();
        
        // Smooth scroll to target with offset for fixed headers (if any)
        const offsetTop = targetElement.offsetTop - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
    });
    
    console.log('Smooth scrolling initialized');
}

/**
 * Contact form handling and email link enhancements
 */
function initializeContactFormHandling() {
    // Enhance mailto links with subject and body
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        const originalHref = link.getAttribute('href');
        
        // Add subject and body to email links
        if (!originalHref.includes('?')) {
            const subject = encodeURIComponent('Portfolio Inquiry - Preston Keeling');
            const body = encodeURIComponent('Hello Preston,\n\nI found your portfolio website and would like to discuss potential opportunities.\n\nBest regards,');
            
            link.setAttribute('href', `${originalHref}?subject=${subject}&body=${body}`);
        }
        
        // Add click tracking
        link.addEventListener('click', function() {
            console.log('Email link clicked');
            // Here you could add analytics tracking if needed
        });
    });
    
    // Enhance phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone link clicked');
            // Here you could add analytics tracking if needed
        });
    });
    
    console.log(`Enhanced ${emailLinks.length} email links and ${phoneLinks.length} phone links`);
}

/**
 * Add scroll-based header effects (for future navigation)
 * Currently commented out but ready for when navigation is added
 */
function initializeScrollHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector('.main-nav'); // Will be available when nav is uncommented
    
    if (!header) return; // Exit if no header found
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class based on scroll position
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Utility function to debounce function calls
 * Useful for scroll and resize event handlers
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
 * Add resize handler for responsive adjustments
 */
window.addEventListener('resize', debounce(function() {
    // Handle any responsive adjustments here
    console.log('Window resized');
}, 250));

/**
 * Add CSS animation keyframes dynamically
 * This ensures the ripple animation works properly
 */
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add ripple styles when script loads
addRippleStyles();

/**
 * Performance monitoring (optional)
 * Logs performance metrics to console for development
 */
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart)
                });
            }, 0);
        });
    }
}

// Enable performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    logPerformanceMetrics();
}

/**
 * Accessibility enhancements
 */
function initializeAccessibility() {
    // Add keyboard navigation support for interactive elements
    const interactiveElements = document.querySelectorAll('.skill-pill, .project-card, .contact-item');
    
    interactiveElements.forEach(element => {
        // Make elements focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event handlers
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add skip link functionality (for future navigation)
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    console.log('Accessibility enhancements initialized');
}

// Initialize accessibility features
initializeAccessibility();

/**
 * Error handling for missing elements
 */
function handleMissingElements() {
    const requiredElements = [
        '.hero-section',
        '.skills-section',
        '.projects-section',
        '.contact-section'
    ];
    
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element not found: ${selector}`);
        }
    });
}

// Check for missing elements
handleMissingElements();
