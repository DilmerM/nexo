window.addEventListener('load', function() {
    const preloader = document.getElementById('nexo-preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
});

// Scroll Progress Logic
window.addEventListener('scroll', function() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. HERO SYNCHRONIZATION
    // Assuming the first main section is the hero
    const heroSection = document.querySelector('section.elementor-section');
    if (heroSection) {
        heroSection.setAttribute('data-aos', 'fade-in');
        heroSection.setAttribute('data-aos-duration', '1500');
        
        const heroElements = heroSection.querySelectorAll('.elementor-column, h1, h2, .cz_btn, img');
        heroElements.forEach((el, index) => {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (index * 100 + 300).toString()); // Start after 300ms, stagger by 100ms
            el.setAttribute('data-aos-duration', '1000');
        });
    }

    // 2. VARIETY IN ANIMATIONS
    
    // Sections - alternate directions
    const sections = document.querySelectorAll('section.elementor-section:not(:first-child)');
    sections.forEach((sec, index) => {
        if (!sec.hasAttribute('data-aos')) {
            const anims = ['fade-up', 'fade-left', 'fade-right', 'zoom-in'];
            sec.setAttribute('data-aos', anims[index % anims.length]);
            sec.setAttribute('data-aos-duration', '1000');
        }
    });

    // Columns - staggered and different effects
    const rows = document.querySelectorAll('.elementor-container');
    rows.forEach((row, rowIndex) => {
        const columns = row.querySelectorAll(':scope > .elementor-column');
        columns.forEach((col, colIndex) => {
            if (!col.hasAttribute('data-aos')) {
                const effects = ['flip-left', 'flip-right', 'slide-up', 'zoom-in-up'];
                col.setAttribute('data-aos', effects[(rowIndex + colIndex) % effects.length]);
                col.setAttribute('data-aos-delay', (colIndex * 100).toString()); // Reduced delay
                col.setAttribute('data-aos-offset', '0'); // Trigger exactly at bottom
            }
        });
    });

    // Headlines - more dramatic zoom
    const headings = document.querySelectorAll('h2, h3, h4');
    headings.forEach((h, index) => {
        if (!h.closest('.elementor-column') && !h.hasAttribute('data-aos')) {
            const hAnims = ['zoom-out', 'fade-down', 'flip-up'];
            h.setAttribute('data-aos', hAnims[index % hAnims.length]);
            h.setAttribute('data-aos-offset', '0');
        }
    });

    // Images - special treatments
    const images = document.querySelectorAll('.elementor-image img, .cz_elm img, .cz_team_img img');
    images.forEach((img, index) => {
        if (img.closest('#site_header')) {
            img.removeAttribute('data-aos');
            img.classList.remove('animate-float', 'animate-float-small');
            return;
        }

        if (!img.hasAttribute('data-aos')) {
            const imgAnims = ['zoom-in', 'fade-up-right', 'fade-up-left'];
            img.setAttribute('data-aos', imgAnims[index % imgAnims.length]);
            img.setAttribute('data-aos-offset', '0');
            
            // Randomly assign floating styles
            if (index % 3 === 0) {
                img.classList.add('animate-float');
            } else if (index % 2 === 0) {
                img.classList.add('animate-float-small');
            }
        }
    });

    // Icons and Counters
    const smallIcons = document.querySelectorAll('.cz_icon_box, .cz_counter, .cz_svg');
    smallIcons.forEach((icon, index) => {
        icon.setAttribute('data-aos', 'zoom-in');
        icon.setAttribute('data-aos-delay', (index % 4 * 50).toString()); // Reduced delay
        icon.setAttribute('data-aos-offset', '0');
    });

    // Servicios para PYMES cards - gradual individual movement tied to scroll.
    const pymesCards = document.querySelectorAll('#servicios-pymes .feature-card');
    const pymesSection = document.getElementById('servicios-pymes');
    const smoothStep = (start, end, value) => {
        const amount = Math.min(Math.max((value - start) / (end - start), 0), 1);
        return amount * amount * (3 - 2 * amount);
    };

    const updatePymesCards = () => {
        if (!pymesSection || !pymesCards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const rect = pymesSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        pymesCards.forEach((card, index) => {
            const enterStart = isMobile ? -0.18 + index * 0.045 : -0.14 + index * 0.055;
            const enterEnd = enterStart + (isMobile ? 0.10 : 0.12);
            const exitStart = 1.18;
            const exitEnd = 1.32;
            const enterAmount = smoothStep(enterStart, enterEnd, progress);
            const exitAmount = smoothStep(exitStart, exitEnd, progress);
            const visibility = Math.max(0, Math.min(enterAmount, 1 - exitAmount));
            const direction = exitAmount > enterAmount ? -1 : 1;
            const y = (1 - visibility) * 34 * direction;
            const scale = 0.96 + visibility * 0.04;

            card.classList.add('pymes-scroll-card');
            card.removeAttribute('data-aos');
            card.style.setProperty('--pymes-card-opacity', visibility.toFixed(3));
            card.style.setProperty('--pymes-card-y', `${y.toFixed(1)}px`);
            card.style.setProperty('--pymes-card-scale', scale.toFixed(3));
        });
    };

    pymesCards.forEach(card => {
        card.classList.add('pymes-scroll-card');
        card.removeAttribute('data-aos');
        card.removeAttribute('data-aos-delay');
        card.removeAttribute('data-aos-duration');
        card.removeAttribute('data-aos-offset');
        card.removeAttribute('data-aos-anchor-placement');
    });

    updatePymesCards();
    window.addEventListener('scroll', updatePymesCards, { passive: true });
    window.addEventListener('resize', updatePymesCards);

    // Make the section after Talento appear earlier in the viewport.
    const postTalentoSection = document.querySelector('.elementor-element-067b82e');
    if (postTalentoSection) {
        postTalentoSection.setAttribute('data-aos', 'fade-up');
        postTalentoSection.setAttribute('data-aos-offset', '-220');
        postTalentoSection.setAttribute('data-aos-duration', '650');
        postTalentoSection.setAttribute('data-aos-anchor-placement', 'top-bottom');

        postTalentoSection.querySelectorAll('[data-aos]').forEach(el => {
            el.setAttribute('data-aos-offset', '-220');
            el.setAttribute('data-aos-delay', '0');
        });
    }

    // Make the next visual block appear sooner too.
    const postTabsSection = document.querySelector('.elementor-element-ed9ccce');
    if (postTabsSection) {
        postTabsSection.setAttribute('data-aos', 'fade-up');
        postTabsSection.setAttribute('data-aos-offset', '-240');
        postTabsSection.setAttribute('data-aos-duration', '650');
        postTabsSection.setAttribute('data-aos-anchor-placement', 'top-bottom');

        postTabsSection.querySelectorAll('.elementor-column, [data-aos]').forEach(el => {
            el.setAttribute('data-aos-offset', '-240');
            el.setAttribute('data-aos-delay', '0');
            el.classList.remove('elementor-invisible');
        });
    }

    // ── Galería PYMES: tap para mostrar texto en Modal Móvil ──────────────────────
    if (navigator.maxTouchPoints > 0) {
        const pymesGalleryLinks = document.querySelectorAll(
            '.elementor-element-2621708 .cz_grid_link'
        );

        // Crear el modal una sola vez
        let modal = document.getElementById('mobile-pymes-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mobile-pymes-modal';
            modal.className = 'mobile-pymes-modal';
            modal.innerHTML = `
                <div class="mobile-pymes-modal-content">
                    <button class="mobile-pymes-modal-close">&times;</button>
                    <div class="mobile-pymes-modal-body"></div>
                </div>
            `;
            document.body.appendChild(modal);

            // Eventos para cerrar el modal
            const closeBtn = modal.querySelector('.mobile-pymes-modal-close');
            closeBtn.addEventListener('touchstart', (e) => { e.preventDefault(); modal.classList.remove('active'); });
            closeBtn.addEventListener('click', (e) => { e.preventDefault(); modal.classList.remove('active'); });
            modal.addEventListener('touchstart', (e) => {
                if (e.target === modal) { e.preventDefault(); modal.classList.remove('active'); }
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }

        const modalBody = modal.querySelector('.mobile-pymes-modal-body');

        pymesGalleryLinks.forEach(link => {
            // Remover la función del lightbox original
            link.removeAttribute('data-xtra-lightbox');
            link.classList.remove('cz_lightbox');

            // Doble tap: registrar tiempo del último toque
            let lastTap = 0;

            // Función para abrir el modal
            const openModal = function(e) {
                e.preventDefault();
                e.stopPropagation();

                if (modal.classList.contains('active')) return;

                const detailsHtml = this.querySelector('.cz_grid_details > div').innerHTML;
                modalBody.innerHTML = detailsHtml;
                modal.classList.add('active');
            };

            // Bloquear touchstart sin preventDefault para no romper la secuencia táctil
            link.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            }, { passive: true, capture: true });

            // Detectar doble tap usando touchend
            link.addEventListener('touchend', function(e) {
                e.stopPropagation();
                const now = Date.now();
                const timeSinceLast = now - lastTap;
                lastTap = now;
                if (timeSinceLast < 300 && timeSinceLast > 0) {
                    // Doble tap detectado
                    openModal.call(this, e);
                } else {
                    // Primer tap: solo cancelar el comportamiento por defecto
                    e.preventDefault();
                }
            }, { passive: false, capture: true });
        });
    }

    // Buttons
    const buttons = document.querySelectorAll('.cz_btn, .cz_header_button');
    buttons.forEach(btn => {
        btn.classList.add('animate-pulse-soft');
    });

    // 3. BACK TO TOP FUNCTIONALITY
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: false, 
    });

    // 3. BACK TO TOP FUNCTIONALITY
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: false, 
        mirror: true,
        anchorPlacement: 'top-bottom',
        offset: 50, // Trigger animations 50px before they reach the viewport
    });

    console.log('Nexo Optimized Animations Initialized');
});

// ── CAROUSEL MÓVIL HERO ───────────────────────────────────────────────
(function() {
    function initHeroCarousel() {
        const carousel = document.getElementById('nexo-hero-carousel');
        if (!carousel) return;

        // Solo activo en móvil
        if (window.innerWidth > 768) return;

        const track = carousel.querySelector('.nexo-carousel-track');
        const slides = carousel.querySelectorAll('.nexo-carousel-slide');
        const dotsContainer = carousel.querySelector('.nexo-carousel-dots');
        const prevBtn = carousel.querySelector('.nexo-carousel-prev');
        const nextBtn = carousel.querySelector('.nexo-carousel-next');
        const total = slides.length;
        let current = 0;
        let autoPlayTimer = null;

        // Crear dots
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'nexo-carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Slide ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            dotsContainer.querySelectorAll('.nexo-carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            updateDots();
        }

        prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoPlay(); });
        nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoPlay(); });

        // Swipe support
        let touchStartX = 0;
        carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        carousel.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                diff > 0 ? goTo(current + 1) : goTo(current - 1);
                resetAutoPlay();
            }
        }, { passive: true });

        // Auto-play cada 4s
        function startAutoPlay() {
            autoPlayTimer = setInterval(() => goTo(current + 1), 4000);
        }
        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        startAutoPlay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroCarousel);
    } else {
        initHeroCarousel();
    }
})();
// ── FIN CAROUSEL MÓVIL HERO ───────────────────────────────────────────
