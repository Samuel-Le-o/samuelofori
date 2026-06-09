// DOM Elements
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Projects Elements
const projectsGrid = document.getElementById('projectsGrid');
const projectsLoading = document.getElementById('projectsLoading');
const filterBtns = document.querySelectorAll('.filter-btn');

// Project Data Structure
const projectsData = [
    {
        id: 1,
        title: "ApexCreative",
        description: "A modern, responsive landing page showcasing cutting-edge design principles and smooth user interactions. Built with performance and conversion optimization in mind.",
        url: "https://proto-tyype.netlify.app/",
        // github: "https://github.com/samuelofori/proto-type",
        category: "landing",
        techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        thumbnail: "images/proto type.png"
    },
    {
        id: 2,
        title: "Slay Body Piercing",
        description: "Professional piercing studio website with booking system and gallery. Features modern aesthetics with smooth animations and intuitive user experience.",
        url: "https://slaybodypiercing.netlify.app/",
        // github: "https://github.com/samuelofori/slay-body-piercing",
        category: "Booking Website",
        techStack: ["React", "CSS3", "Booking System", "Gallery"],
        thumbnail: "images/slay body piercing.png"
    },
    // {
    //     id: 3,
    //     title: "Stella Commerce",
    //     description: "Full-featured e-commerce platform with product catalog, shopping cart, and secure checkout. Optimized for conversions and mobile shopping experience.",
    //     url: "https://stellacommerce.netlify.app/",
    //     github: "https://github.com/samuelofori/stella-commerce",
    //     category: "ecommerce",
    //     techStack: ["JavaScript", "Stripe API", "E-Commerce", "Mobile-First"],
    //     thumbnail: "images/Stella.png"
    // },
    {
        id: 4,
        title: "Allruing Accent",
        description: "Alluring Accent is an elegant, modern e-commerce platform designed for a premium jewelry brand. It features a sophisticated pink-and-black visual identity, a seamless customer storefront, and a robust, secure administrative dashboard for real-time inventory tracking, order management, and dynamic promotional campaigning.",
        url: "https://alluringaccent.com",
        // github: "https://github.com/samuelofori/alluring-accent",
        category: "ecommerce",
        techStack: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Stripe API", "E-Commerce", "Mobile-First"],
        thumbnail: "images/alluringaccent.png"
    },

  
];

// State Management
let currentFilter = 'all';
let projects = [...projectsData];

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Scroll Effects
window.addEventListener('scroll', () => {
    // Active navigation link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) heroContent.classList.add('fade-in');
    if (heroVisual) heroVisual.classList.add('slide-in-right');
    
    // About section
    const aboutText = document.querySelector('.about-text');
    const aboutStats = document.querySelector('.about-stats');
    
    if (aboutText) aboutText.classList.add('fade-in');
    if (aboutStats) aboutStats.classList.add('slide-in-left');
    
    // Skills section
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.classList.add('fade-in');
        category.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Projects section
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Services section
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactFormElement = document.querySelector('.contact-form');
    
    if (contactInfo) contactInfo.classList.add('slide-in-left');
    if (contactFormElement) contactFormElement.classList.add('slide-in-right');
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

function setFormStatus(message = '', type = 'info') {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.style.marginTop = '1rem';
    formStatus.style.fontWeight = '600';
    formStatus.style.color = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#94a3b8';
}

async function submitContactForm(payload) {
    const endpoint = contactForm?.dataset?.endpoint || '/.netlify/functions/contact';

    if (!endpoint) {
        throw new Error('Contact form endpoint is not configured.');
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(payload)
    });

    let result = {};
    try {
        result = await response.json();
    } catch (error) {
        result = {};
    }
    if (!response.ok) {
        const errorMessage = result?.message || 'Unable to send your message right now. Please try again.';
        const error = new Error(errorMessage);
        error.status = response.status;
        error.details = result;

        console.error('Contact form submit failed', {
            status: response.status,
            result
        });
        throw error;
    }

    return result;
}

// Form Validation and Submission
if (contactForm) {
    const formLoadedAtInput = document.getElementById('formLoadedAt');
    if (formLoadedAtInput) {
        formLoadedAtInput.value = Date.now().toString();
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const company = formData.get('company');
        const formLoadedAt = formData.get('formLoadedAt');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            setFormStatus('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            setFormStatus('Sending your message...', 'info');

            await submitContactForm({
                name,
                email,
                subject,
                message,
                company,
                formLoadedAt
            });

            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            setFormStatus('Message sent successfully. I will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification(error.message || 'Failed to send message. Please try again.', 'error');
            setFormStatus(error.message || 'Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
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
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment below for typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        const speed = 0.5;
        heroVisual.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Project card hover effects
const projectCardHoverElements = document.querySelectorAll('.project-card');
projectCardHoverElements.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
const serviceCardHoverElements = document.querySelectorAll('.service-card');
serviceCardHoverElements.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Skill item hover effects
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
            icon.style.color = 'var(--primary-dark)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1)';
            icon.style.color = 'var(--primary-color)';
        }
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats are visible
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Theme Toggle (Optional - for future implementation)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
}

// Uncomment below to enable theme toggle
// createThemeToggle();

// Performance optimization - Debounce scroll events
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

// Apply debounce to scroll event
const optimizedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    });
}

// Initialize Projects
function initProjects() {
    loadProjects();
    setupFilterButtons();
}

// Load Projects
async function loadProjects() {
    try {
        showLoading();
        
        // Projects already have local thumbnails, no need to generate
        renderProjects();
        hideLoading();
        
        // Add scroll animations
        observeProjectCards();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        hideLoading();
        renderProjects(); // Render with fallback thumbnails
    }
}

// Generate Thumbnail using Screenshot API
async function generateThumbnail(url) {
    try {
        // Using a free screenshot API (you can replace with your preferred service)
        const screenshotUrl = `https://api.screenshotone.com/take?access_key=free&url=${encodeURIComponent(url)}&format=jpg&width=400&height=280&device=desktop&full_page=false`;
        
        // Create image to test if it loads
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        return new Promise((resolve) => {
            img.onload = () => resolve(screenshotUrl);
            img.onerror = () => resolve(null); // Fallback to null
            img.src = screenshotUrl;
            
            // Timeout after 5 seconds
            setTimeout(() => resolve(null), 5000);
        });
    } catch (error) {
        console.error('Error generating thumbnail:', error);
        return null;
    }
}

// Render Projects
function renderProjects() {
    const filteredProjects = currentFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === currentFilter);
    
    projectsGrid.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
    
    // Fade in animation
    setTimeout(() => {
        projectsGrid.classList.add('loaded');
    }, 100);
}

// Create Project Card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.style.animationDelay = `${index * 0.15}s`;
    card.dataset.category = project.category;
    
    const thumbnailHtml = project.thumbnail 
        ? `<img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail lazy-image" loading="lazy">`
        : createFallbackThumbnail(project);
    
    card.innerHTML = `
        <div class="project-image" onclick="openProject('${project.url}')">
            ${thumbnailHtml}
            <div class="project-overlay">
                <div class="overlay-text">View Project</div>
                <div class="overlay-icon">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </div>
        </div>
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-actions">
                <a href="${project.url}" target="_blank" class="project-btn project-btn-primary" onclick="event.stopPropagation()">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </a>
                ${project.github ? `
                    <a href="${project.github}" target="_blank" class="project-btn project-btn-secondary" onclick="event.stopPropagation()">
                        <i class="fab fa-github"></i>
                        View Code
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    // Add lazy loading for images
    if (project.thumbnail) {
        const img = card.querySelector('.lazy-image');
        img.addEventListener('load', () => img.classList.add('loaded'));
    }
    
    return card;
}

// Create Fallback Thumbnail
function createFallbackThumbnail(project) {
    const icons = {
        landing: 'fas fa-rocket',
        ecommerce: 'fas fa-shopping-cart',
        portfolio: 'fas fa-briefcase'
    };
    
    const icon = icons[project.category] || 'fas fa-code';
    
    return `
        <div class="fallback-thumbnail">
            <div class="fallback-icon">
                <i class="${icon}"></i>
            </div>
            <div class="fallback-text">${project.title}</div>
        </div>
    `;
}

// Setup Filter Buttons
function setupFilterButtons() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter
            currentFilter = btn.dataset.filter;
            renderProjects();
            
            // Re-observe new cards
            observeProjectCards();
        });
    });
}

// Open Project
function openProject(url) {
    window.open(url, '_blank');
}

// Show/Hide Loading
function showLoading() {
    projectsLoading.classList.remove('hidden');
    projectsGrid.classList.remove('loaded');
}

function hideLoading() {
    projectsLoading.classList.add('hidden');
}

// Observe Project Cards for Animation
function observeProjectCards() {
    const cards = document.querySelectorAll('.project-card:not(.visible)');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initProjects();
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Export functions for potential use in other scripts
window.PortfolioJS = {
    showNotification,
    animateCounter,
    debounce,
    isValidEmail
};

// Console welcome message
console.log('%c👨‍💻 Samuel Ofori - Frontend Developer Portfolio', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with passion, creativity, and modern web technologies', 'font-size: 14px; color: #22d3ee;');
console.log('%cInterested in how this was built? Let\'s connect! 🚀', 'font-size: 12px; color: #f43f5e;');
