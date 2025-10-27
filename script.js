// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Multimedia Filter (Photos and Videos)
const mediaFilterButtons = document.querySelectorAll('.media-filter-btn');
const mediaItems = document.querySelectorAll('.media-item');

mediaFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all media filter buttons
        mediaFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-media-filter');

        // Pause all videos when filtering
        const allVideos = document.querySelectorAll('.media-item video');
        allVideos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });

        mediaItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                if (item.getAttribute('data-media-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Video controls - show on hover
const mediaItemsWithVideos = document.querySelectorAll('.media-item[data-media-category="videos"]');
mediaItemsWithVideos.forEach(item => {
    const video = item.querySelector('video');
    const overlay = item.querySelector('.media-overlay');
    
    if (video && overlay) {
        item.addEventListener('mouseenter', () => {
            overlay.style.pointerEvents = 'none';
        });
        
        video.addEventListener('play', () => {
            overlay.style.opacity = '0';
        });
        
        video.addEventListener('pause', () => {
            if (!video.ended) {
                overlay.style.opacity = '1';
            }
        });
        
        video.addEventListener('ended', () => {
            overlay.style.opacity = '1';
        });
    }
});

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    if (index >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (index < 0) {
        currentTestimonial = testimonialCards.length - 1;
    } else {
        currentTestimonial = index;
    }
    
    testimonialCards[currentTestimonial].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
});

nextBtn.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
});

// Auto-slide testimonials
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && subject && message) {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
            color: white;
            padding: 30px 50px;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(255, 107, 157, 0.3);
            z-index: 10000;
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
        `;
        successMessage.innerHTML = `
            <h3 style="margin-bottom: 10px; font-size: 1.5rem;">Thank You!</h3>
            <p style="margin: 0;">Your message has been sent successfully. I'll get back to you soon!</p>
        `;
        
        document.body.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'fadeInUp 0.5s ease-out reverse';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 3000);
    } else {
        alert('Please fill in all fields');
    }
});

// Smooth scroll for anchor links
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

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .portfolio-item, .media-item, .about-content, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #fff5f9 0%, #ffffff 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = '#ffffff';
    });
});

// Dynamic copyright year
const footer = document.querySelector('.footer p');
if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2025', year);
}
