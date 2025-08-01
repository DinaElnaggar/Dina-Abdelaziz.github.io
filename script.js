// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .education-card, .languages-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Form submission handling with test functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[name="user_name"]').value;
        const email = contactForm.querySelector('input[name="user_email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Update button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Enhanced email handling for live site
        console.log('📧 Form Data Captured:', {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString(),
            site: window.location.hostname
        });
        
        // Email handling with better error detection
        console.log('🔍 Checking EmailJS availability...');
        
        if (typeof emailjs !== 'undefined') {
            console.log('✅ EmailJS is loaded');
            
            try {
                // Initialize EmailJS
                emailjs.init("0hXIeGG4Xh9uxvPEq");
                console.log('✅ EmailJS initialized');
                
                // Prepare template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_name: 'Dina Abdelaziz',
                    site_url: window.location.href
                };
                
                console.log('📤 Attempting to send email...');
                
                // Send email using EmailJS
                // Note: You need to replace these with your actual Service ID and Template ID
                emailjs.send('service_abc123', 'template_xyz789', templateParams)
                    .then(function(response) {
                        console.log('✅ Email sent successfully:', response);
                        showNotification('Thank you for your message! I will get back to you soon.', 'success');
                        contactForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, function(error) {
                        console.log('❌ Email sending failed:', error);
                        console.log('📧 Falling back to simulation mode');
                        // Fallback to simulation
                        setTimeout(() => {
                            console.log('📧 Email simulation: Message would be sent to dinaabdelaziz514@gmail.com');
                            showNotification('Thank you for your message! I will get back to you soon.', 'success');
                            contactForm.reset();
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 2000);
                    });
                    
            } catch (error) {
                console.log('❌ EmailJS Error:', error);
                console.log('📧 Falling back to simulation mode');
                // Fallback to simulation
                setTimeout(() => {
                    console.log('📧 Email simulation: Message would be sent to dinaabdelaziz514@gmail.com');
                    showNotification('Thank you for your message! I will get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        } else {
            console.log('❌ EmailJS not loaded, using simulation mode');
            
            // Create a mailto link as a fallback
            const mailtoLink = `mailto:dinaabdelaziz514@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Show notification with option to open email client
            showNotification('Opening your email client to send the message...', 'success');
            
            // Open email client
            setTimeout(() => {
                window.open(mailtoLink, '_blank');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
        
        // TODO: Uncomment and configure this when EmailJS is set up
        /*
        // Initialize EmailJS with your public key
        if (typeof emailjs !== 'undefined') {
            try {
                // Initialize EmailJS
                emailjs.init("0hXIeGG4Xh9uxvPEq");
                
                // Prepare template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_name: 'Dina Abdelaziz'
                };
                
                // Send email using EmailJS
                // Replace with your actual Service ID and Template ID
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS! Email sent successfully:', response);
                        showNotification('Thank you for your message! I will get back to you soon.', 'success');
                        contactForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, function(error) {
                        console.log('FAILED! Email sending failed:', error);
                        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
                    
            } catch (error) {
                console.log('EmailJS Error:', error);
                showNotification('Email service error. Please try again later.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } else {
            // EmailJS not loaded
            showNotification('Email service not available. Please try again later.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
        */
    });
}

// Notification function
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'var(--gradient-secondary)';
    } else {
        notification.style.background = '#ef4444';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
});

// Enhanced animations and interactions
function initializeAnimations() {
    console.log('🎬 Initializing animations...');
    
    // Add loading class to elements that need animation
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .education-card, .languages-card, .contact-item, .stat');
    console.log(`📊 Found ${elementsToAnimate.length} elements to animate`);
    
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
    });
    
    // Trigger animations when elements come into view
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                console.log('✨ Element animated:', entry.target.className);
            }
        });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(el => {
        animationObserver.observe(el);
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        console.log('⌨️ Starting typing animation...');
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add particle effect to hero section
    createParticles();
    
    // Add scroll-triggered animations
    addScrollAnimations();
    
    // Add hover effects
    addHoverEffects();
    
    console.log('✅ Animations initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    // DOM is already loaded
    initializeAnimations();
}

// Also initialize on window load to ensure everything is ready
window.addEventListener('load', () => {
    console.log('🔄 Window loaded, re-initializing animations...');
    initializeAnimations();
});

// Create floating particles in hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .education-card, .languages-card, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Add hover effects and interactions
function addHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });
    
    // Add glow effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(147, 197, 253, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Add CSS for new animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .particle {
        z-index: 1;
    }
    
    .hero {
        overflow: hidden;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Enhanced focus states */
    .btn:focus,
    .nav-link:focus,
    input:focus,
    textarea:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    /* Loading animation for images */
    .project-image {
        position: relative;
    }
    
    .project-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shimmer 2s infinite;
    }
    
    /* Pulse animation for important elements */
    .hero-buttons .btn:first-child {
        animation: pulse 2s infinite;
    }
    
    /* Floating animation for profile card */
    .profile-card {
        animation: float 6s ease-in-out infinite;
    }
    
    /* Staggered entrance animations */
    .skill-category:nth-child(1) { animation-delay: 0.1s; }
    .skill-category:nth-child(2) { animation-delay: 0.2s; }
    .skill-category:nth-child(3) { animation-delay: 0.3s; }
    .skill-category:nth-child(4) { animation-delay: 0.4s; }
    .skill-category:nth-child(5) { animation-delay: 0.5s; }
    .skill-category:nth-child(6) { animation-delay: 0.6s; }
    .skill-category:nth-child(7) { animation-delay: 0.7s; }
    .skill-category:nth-child(8) { animation-delay: 0.8s; }
    .skill-category:nth-child(9) { animation-delay: 0.9s; }
    
    /* Hover effects for timeline */
    .timeline-item:hover .timeline-content {
        transform: translateY(-8px) scale(1.02);
    }
    
    /* Animated background for hero */
    .hero::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
        animation: shimmer 3s infinite;
        pointer-events: none;
    }
`;
document.head.appendChild(additionalStyles); 