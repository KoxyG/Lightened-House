// ================================
// Lightened House - JavaScript
// ================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileNav();
    initScrollAnimations();
    initCounterAnimation();
    initProductFiltering();
    initEventCountdown();
    initContactForm();
    initFAQ();
    initDOMTree();
    initBackToTopButton();
});

// ================================
// 1. Mobile Navigation Toggle
// ================================
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ================================
// 2. Scroll Animations
// ================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ================================
// 3. Counter Animation (Stats)
// ================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };

    updateCounter();
}

// ================================
// 4. Product Filtering
// ================================
function initProductFiltering() {
    // This function is called by filter buttons
    // No initialization needed
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter products with animation
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'scale(1)';
            }, 10);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'scale(0.8)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// ================================
// 5. Add to Cart Functionality
// ================================
function addToCart(productName) {
    // Show notification
    const notification = document.getElementById('cartNotification');
    if (notification) {
        notification.textContent = `${productName} added to cart!`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Add bounce animation to the button
    event.target.style.transform = 'scale(0.9)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 200);

    console.log(`Product added to cart: ${productName}`);
}

// ================================
// 6. Event Countdown Timer
// ================================
function initEventCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Set target date (Dec 10, 2025 for VIP Preview)
    const targetDate = new Date('2025-12-10T18:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.querySelector('.countdown-text').textContent = 'Event has started!';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ================================
// 7. Event Registration
// ================================
function registerEvent(eventName) {
    alert(`Thank you for your interest in "${eventName}"!\n\nYou will be redirected to our registration portal.\n\nFor now, this is a demo - no actual registration occurs.`);
    console.log(`Registration requested for: ${eventName}`);
}

// ================================
// 8. Contact Form Handling
// ================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Show/hide appointment fields based on inquiry type
    const inquiryType = document.getElementById('inquiry-type');
    if (inquiryType) {
        inquiryType.addEventListener('change', function() {
            const appointmentDate = document.getElementById('appointmentDate');
            const appointmentTime = document.getElementById('appointmentTime');
            
            if (this.value === 'appointment' || this.value === 'styling') {
                appointmentDate.style.display = 'block';
                appointmentTime.style.display = 'block';
            } else {
                appointmentDate.style.display = 'none';
                appointmentTime.style.display = 'none';
            }
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            inquiryType: document.getElementById('inquiry-type').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.inquiryType || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message
        form.style.display = 'none';
        const successMessage = document.getElementById('formSuccess');
        if (successMessage) {
            successMessage.style.display = 'block';
        }

        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted:', formData);

        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
    });
}

// ================================
// 9. FAQ Accordion
// ================================
function initFAQ() {
    // This function is called by FAQ questions
    // No initialization needed
}

function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ================================
// 10. Board Member Modal
// ================================
function showMemberDetails(name, title) {
    const modal = document.getElementById('memberModal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('modalName').textContent = name;
        document.getElementById('modalTitle').textContent = title;
    }
}

function closeModal() {
    const modal = document.getElementById('memberModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('memberModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ================================
// 11. DOM Tree Interactions
// ================================
function initDOMTree() {
    // Set data-level attributes for proper indentation
    const domNodes = document.querySelectorAll('.dom-node');
    domNodes.forEach(node => {
        const level = node.getAttribute('data-level');
        if (level) {
            node.style.setProperty('--level', level);
        }
    });
}

function toggleNode(toggleElement) {
    const node = toggleElement.parentElement;
    const children = node.querySelector('.node-children');
    
    if (children) {
        children.classList.toggle('collapsed');
        toggleElement.textContent = children.classList.contains('collapsed') ? '▶' : '▼';
    }
}

function expandAllDOM() {
    const allChildren = document.querySelectorAll('.node-children');
    const allToggles = document.querySelectorAll('.node-toggle');
    
    allChildren.forEach(child => {
        child.classList.remove('collapsed');
    });
    
    allToggles.forEach(toggle => {
        toggle.textContent = '▼';
    });
}

function collapseAllDOM() {
    const allChildren = document.querySelectorAll('.node-children');
    const allToggles = document.querySelectorAll('.node-toggle');
    
    // Keep only the first level open
    allChildren.forEach((child, index) => {
        if (index > 0) {
            child.classList.add('collapsed');
        }
    });
    
    allToggles.forEach((toggle, index) => {
        if (index > 0) {
            toggle.textContent = '▶';
        }
    });
}

function highlightDOM() {
    const interactiveNodes = document.querySelectorAll('.dom-node');
    
    interactiveNodes.forEach(node => {
        node.style.background = '#fff3cd';
        node.style.padding = '5px';
        node.style.borderRadius = '3px';
        node.style.transition = 'all 0.3s ease';
    });

    setTimeout(() => {
        interactiveNodes.forEach(node => {
            node.style.background = 'transparent';
        });
    }, 2000);
}

// ================================
// 12. Smooth Scrolling
// ================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ================================
// 13. Social Media Click Handler
// ================================
function socialClick(platform) {
    alert(`This would open ${platform} in a new window.\n\nFor demo purposes, this is just a notification.`);
    console.log(`Social media click: ${platform}`);
    return false;
}

// ================================
// 14. Map Function
// ================================
function openMap() {
    const address = 'MIVA Open University, Abuja-Keffi Expressway, Abuja, FCT, Nigeria';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

// ================================
// 15. Page Load Animation
// ================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 10);
});

// ================================
// 16. Navbar Scroll Effect
// ================================
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    }

    lastScrollTop = scrollTop;
});

// ================================
// 17. Prevent Default on Demo Links
// ================================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});

// ================================
// 18. Dynamic Year in Footer
// ================================
window.addEventListener('load', function() {
    const footerYear = document.querySelectorAll('.footer-bottom p');
    footerYear.forEach(p => {
        if (p.textContent.includes('2025')) {
            p.textContent = p.textContent.replace('2025', new Date().getFullYear());
        }
    });
});

// ================================
// 19. Product Card Hover Effect
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// ================================
// 20. Keyboard Navigation Support
// ================================
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('memberModal');
        if (modal && modal.style.display === 'block') {
            closeModal();
        }
    }
});

// ================================
// Console Welcome Message
// ================================
console.log('%c Welcome to Lightened House! ', 'background: linear-gradient(135deg, #4169E1 0%, #0F52BA 100%); color: white; font-size: 20px; padding: 10px;');
console.log('%c Elegance Redefined Since 2010 ', 'color: #0F52BA; font-size: 14px;');
console.log('Website developed with HTML, CSS, and JavaScript');

// ================================
// Export functions for HTML onclick handlers
// ================================
// Functions that are called from HTML are already in global scope

// ================================
// 21. Back to Top Button  
// ================================
function initBackToTopButton() {
    let backToTopBtn = document.getElementById("backToTopBtn");

    window.onscroll = function() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
}
