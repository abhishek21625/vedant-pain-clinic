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

    // ===== TESTIMONIAL SLIDER WITH DRAG SUPPORT =====
    (function testimonials() {
        const track = document.getElementById("testimonialsTrack");
        if (!track) return;

        const cards = Array.from(track.children);
        let index = 0;
        let cardWidth = 0;
        let autoSlide = null;

        // DRAG VARIABLES
        let isDown = false;
        let startX, scrollLeft;

        function getCardsPerView() {
            const w = window.innerWidth;
            if (w <= 768) return 1;
            if (w <= 992) return 2;
            return 3;
        }

        function updateCardWidth() {
            const first = track.querySelector(".testimonial-card");
            if (!first) return;
            cardWidth = first.offsetWidth + 20; // gap
        }

        // DUPLICATE CARDS FOR INFINITE LOOP
        function cloneCards() {
            const clones = track.querySelectorAll(".clone");
            clones.forEach(c => c.remove());

            const need = getCardsPerView();
            for (let i = 0; i < need; i++) {
                let clone = cards[i].cloneNode(true);
                clone.classList.add("clone");
                track.appendChild(clone);
            }
        }

        function slideTo(i, animate = true) {
            track.style.transition = animate ? "transform 0.6s ease" : "none";
            track.style.transform = `translateX(-${i * cardWidth}px)`;
        }

        function nextSlide() {
            index++;
            slideTo(index);

            if (index >= cards.length) {
                setTimeout(() => {
                    index = 0;
                    slideTo(index, false);
                }, 600);
            }
        }

        function startAuto() {
            stopAuto();
            autoSlide = setInterval(nextSlide, 2000);
        }

        function stopAuto() {
            if (autoSlide) clearInterval(autoSlide);
        }

        // DRAG HANDLERS
        function dragStart(e) {
            isDown = true;
            stopAuto();

            startX = e.pageX || e.touches[0].pageX;
            scrollLeft = index * cardWidth;
            track.style.transition = "none";
        }

        function dragMove(e) {
            if (!isDown) return;

            let x = e.pageX || e.touches[0].pageX;
            let walk = x - startX;

            track.style.transform = `translateX(${walk - scrollLeft}px)`;
        }

        function dragEnd(e) {
            if (!isDown) return;
            isDown = false;

            let x = e.pageX || (e.changedTouches ? e.changedTouches[0].pageX : 0);
            let walk = x - startX;

            // If dragged enough → move slide
            if (walk < -50) index++;
            else if (walk > 50) index--;

            if (index < 0) index = 0;
            if (index >= cards.length) index = cards.length - 1;

            slideTo(index);
            startAuto();
        }

        function setup() {
            cloneCards();
            updateCardWidth();
            index = 0;
            slideTo(index, false);
            startAuto();
        }

        // RESIZE HANDLER
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setup, 150);
        });

        // Mouse Events
        track.addEventListener("mousedown", dragStart);
        window.addEventListener("mousemove", dragMove);
        window.addEventListener("mouseup", dragEnd);

        // Touch Events
        track.addEventListener("touchstart", dragStart);
        track.addEventListener("touchmove", dragMove);
        track.addEventListener("touchend", dragEnd);

        // Hover Stop Auto Slide
        const container = document.querySelector(".testimonials-container");
        if (container) {
            container.addEventListener("mouseenter", stopAuto);
            container.addEventListener("mouseleave", startAuto);
        }

        setup();
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
});

var gallerySwiperInstance = new Swiper(".gallery-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    autoplay: {
        delay: 2600,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".gallery-next",
        prevEl: ".gallery-prev",
    },
    grabCursor: true,
    resistanceRatio: 0.45,   // smoother swipe
    watchSlidesProgress: true,
    observer: true,          // prevents reflow crash
    observeParents: true,    // prevents jitter when section loads
    breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
    }
});









function setModalImage(btn) {
    const src = btn.closest(".gallery-item").querySelector("img").src;
    document.getElementById("modalImage").src = src;
}

