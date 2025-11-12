// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Button hover effects
document.querySelectorAll('.btn-learn-more, .btn-appointment').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });
    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Scroll animation trigger
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
});

heroObserver.observe(document.querySelector('.hero-content'));





/// Play Button & Feature Card Animations
document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.querySelector('.play-button');
    const viewAllBtn = document.querySelector('.btn-view-all');
    const featureCards = document.querySelectorAll('.feature-card');

    // Play Button Click
    if (playButton) {
        playButton.addEventListener('click', function () {
            console.log("[v0] Play button clicked - Video would start here");
            // Add your video modal or lightbox logic here
            alert('Video player would open here');
        });
    }

    // View All Button Click
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function () {
            console.log("[v0] View all button clicked");
            // Add navigation or modal functionality here
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const featuresObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        featuresObserver.observe(card);
    });

    // Hover effect for feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});



// Initialize Swiper
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        480: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 3.5,
            spaceBetween: 30,
        },
    },
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Handle service link clicks
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('View Details clicked');
    });
});



function handleMoreArticles() {
    console.log('More Articles button clicked');
    alert('Loading more articles...');
    // Add your logic here to load more articles
}

// Add smooth scroll behavior
document.querySelectorAll('.view-details').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View Details clicked');
        // Add navigation logic here
    });
});

// Add intersection observer for fade-in animation on scroll
const blogCards = document.querySelectorAll('.blog-card');
const blogObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

blogCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    blogObserver.observe(card);
});





let currentSlide = 0;
const track = document.getElementById('testimonialsTrack');
const cards = document.querySelectorAll('.testimonial-card');

function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function slideTestimonials(direction) {
    const cardsPerView = getCardsPerView();
    const maxSlide = cards.length - cardsPerView;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = maxSlide;
    } else if (currentSlide > maxSlide) {
        currentSlide = 0;
    }

    const cardWidth = cards[0].offsetWidth + 20; // card width + margin
    track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

// Update on window resize
window.addEventListener('resize', () => {
    currentSlide = 0;
    track.style.transform = 'translateX(0)';
});

// Auto-slide every 5 seconds
setInterval(() => {
    slideTestimonials(1);
}, 5000);







// Add smooth scroll behavior
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        // Add your navigation logic here
        console.log('Button clicked:', this.textContent);
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.contact-content, .cta-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});