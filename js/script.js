document.addEventListener('DOMContentLoaded', function () {

    // ===== Utility helpers =====
    const safeQuery = (sel, root = document) => root.querySelector(sel);
    const safeQueryAll = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    // ===== ACTIVE LINK HIGHLIGHT =====
    (function activeLink() {
        const currentLocation = window.location.pathname.split('/').pop();
        const navLinks = safeQueryAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href === currentLocation) link.classList.add('active');
        });
    })();

    // ===== HERO SECTION (AOS will animate, no JS animation needed) =====
    // Add data-aos="fade-up" directly in HTML

    // ===== PLAY BUTTON & FEATURE CARDS =====
    (function playAndFeatures() {
        const playButton = safeQuery('.play-button');
        const viewAllBtn = safeQuery('.btn-view-all');

        if (playButton) {
            playButton.addEventListener('click', () => {
                alert('Video player would open here');
            });
        }

        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => console.log('View All button clicked'));
        }
    })();

    // ===== SWIPER (unchanged) =====
    (function initSwiper() {
        if (!document.querySelector('.mySwiper')) return;
        try {
            const swiper = new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: {
                    480: { slidesPerView: 1.5, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 25 },
                    992: { slidesPerView: 3, spaceBetween: 30 },
                    1200: { slidesPerView: 3.5, spaceBetween: 30 },
                },
                loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
            });
        } catch (err) {
            console.warn('Swiper init failed:', err);
        }
    })();

    // ===== TESTIMONIAL SLIDER (kept, but removed animations) =====
    (function testimonials() {
        const track = document.getElementById('testimonialsTrack');
        if (!track) return;

        let cards = safeQueryAll('.testimonial-card', track);
        let currentSlide = 0;
        let autoSlideInterval = null;
        let cardWidth = 0;

        function getCardsPerView() {
            const w = window.innerWidth;
            if (w <= 768) return 1;
            if (w <= 992) return 2;
            return 3;
        }

        function updateCardList() {
            cards = safeQueryAll('.testimonial-card', track);
        }

        function cloneCards() {
            const existingClones = track.querySelectorAll('.clone');
            existingClones.forEach(c => c.remove());

            const cloneCount = Math.max(0, Math.min(cards.length, getCardsPerView()));
            for (let i = 0; i < cloneCount; i++) {
                const clone = cards[i].cloneNode(true);
                clone.classList.add('clone');
                track.appendChild(clone);
            }
        }

        function updateCardWidth() {
            if (!cards.length) {
                cardWidth = 0;
                return;
            }
            cardWidth = (cards[0].offsetWidth || 0) + 20;
        }

        function slideTestimonials() {
            if (!cardWidth || !cards.length) return;
            currentSlide++;
            const cardsPerView = getCardsPerView();

            track.style.transition = 'transform 0.6s ease';
            track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

            if (currentSlide >= cards.length) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    currentSlide = 0;
                }, 600);
            }
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(slideTestimonials, 3000);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
        }

        function setupSlider() {
            updateCardList();
            cloneCards();
            updateCardWidth();
            currentSlide = 0;
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            setTimeout(startAutoSlide, 50);
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setupSlider, 150);
        });

        const testimonialsContainer = document.querySelector('.testimonials-container');
        if (testimonialsContainer) {
            testimonialsContainer.addEventListener('mouseenter', stopAutoSlide);
            testimonialsContainer.addEventListener('mouseleave', startAutoSlide);
        }

        setupSlider();
    })();

    // ===== CONTACT FORM (unchanged, only animations removed) =====
    (function contactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const isValidEmail = email =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const firstName = (document.getElementById('firstName') || {}).value?.trim() || '';
            const lastName = (document.getElementById('lastName') || {}).value?.trim() || '';
            const email = (document.getElementById('email') || {}).value?.trim() || '';
            const message = (document.getElementById('message') || {}).value?.trim() || '';
            const privacyEl = document.getElementById('privacy');
            const privacy = privacyEl ? privacyEl.checked : false;

            if (!firstName || !lastName || !email || !message || !privacy) {
                alert('Please fill in all fields and accept the privacy policy.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }

            setTimeout(() => {
                const successMessage = document.getElementById('successMessage');
                if (successMessage) successMessage.classList.add('show');

                form.reset();

                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }

                setTimeout(() => {
                    if (successMessage) successMessage.classList.remove('show');
                }, 5000);
            }, 1500);
        });
    })();

    // ===== VIDEO GALLERY SECTION (animations removed) =====
    (function videoGallery() {
        const playButtons = safeQueryAll('.play-btn');
        const loadMoreBtn = safeQuery('.load-more-btn');

        playButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                alert('Playing video...');
            });
        });

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function () {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                setTimeout(() => {
                    this.innerHTML = 'Load More Videos <i class="fas fa-arrow-right ms-2"></i>';
                    alert('More videos loaded!');
                }, 1500);
            });
        }
    })();

    // ===== SERVICE DETAILS PAGE =====
    (function serviceDetails() {
        let currentGalleryIndex = 1;
        const galleryImages = [
            { id: 1, src: '/placeholder.svg?height=300&width=400', alt: 'Gallery 1' },
            { id: 2, src: '/placeholder.svg?height=300&width=400', alt: 'Gallery 2' },
            { id: 3, src: '/placeholder.svg?height=300&width=400', alt: 'Gallery 3' },
            { id: 4, src: '/placeholder.svg?height=300&width=400', alt: 'Gallery 4' }
        ];

        window.nextGallery = function () {
            currentGalleryIndex++;
            if (currentGalleryIndex > galleryImages.length) currentGalleryIndex = 1;
            updateGallery();
        };

        window.previousGallery = function () {
            currentGalleryIndex--;
            if (currentGalleryIndex < 1) currentGalleryIndex = galleryImages.length;
            updateGallery();
        };

        function updateGallery() {
            const container = document.getElementById('galleryContainer');
            if (!container) return;
            const images = container.querySelectorAll('img');
            if (!images.length) return;

            const startIndex = (currentGalleryIndex - 1) % galleryImages.length;
            const secondIndex = (startIndex + 1) % galleryImages.length;

            images[0].src = galleryImages[startIndex].src;
            images[0].alt = galleryImages[startIndex].alt;

            if (images[1]) {
                images[1].src = galleryImages[secondIndex].src;
                images[1].alt = galleryImages[secondIndex].alt;
            }

            const idxEl = document.getElementById('galleryIndex');
            if (idxEl) idxEl.textContent = currentGalleryIndex;
        }

        window.switchService = function (element, serviceName) {
            const navItems = safeQueryAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            if (element) element.classList.add('active');

            console.log(`Switched to: ${serviceName}`);
        };

        window.scrollToContact = function () {
            alert('Thank you for your interest! Contact form would appear here.');
        };
    })();
});
