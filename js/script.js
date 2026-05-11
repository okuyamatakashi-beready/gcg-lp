document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.js-hamburger');
    const nav = document.querySelector('.header__nav');
    const closeBtn = document.querySelector('.js-menu-close');
    const navLinks = document.querySelectorAll('.header__item a');

    const floatBtn = document.querySelector('.float-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const floatBtn = document.querySelector('.float-nav'); // Re-select to be sure
            hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            if (floatBtn) {
                if (nav.classList.contains('is-active')) {
                    floatBtn.classList.add('is-hidden');
                } else {
                    floatBtn.classList.remove('is-hidden');
                }
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const floatBtn = document.querySelector('.float-nav');
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                if (floatBtn) floatBtn.classList.remove('is-hidden');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const floatBtn = document.querySelector('.float-nav');
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                if (floatBtn) floatBtn.classList.remove('is-hidden');
            });
        });
    }

    // MV Animation (if any JS needed, though mostly CSS)

    // Scroll Animation (Fade In)
    const fadeElements = document.querySelectorAll('.js-fade, .js-fade-left, .js-fade-right');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeObserver.unobserve(entry.target); // Animate once
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Trigger when element comes into view (slightly before bottom)
            threshold: 0
        });

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    // Smooth Scroll
    const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
    smoothScrollTrigger.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            let href = a.getAttribute('href');
            let targetElement = document.getElementById(href.replace('#', ''));
            const rect = targetElement.getBoundingClientRect().top;
            const offset = window.pageYOffset;
            let gap = 0;
            const isSP = window.matchMedia('(max-width: 767px)').matches;
            if (isSP) {
                gap = 120; // Offset for mobile floating button
            }
            const target = rect + offset - gap;
            window.scrollTo({
                top: target,
                behavior: 'smooth',
            });
        });
    });

    // Pickup Slider
    if (document.querySelector('.pickup__slider')) {
        new Swiper('.pickup__slider', {
            loop: true,
            speed: 600,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 40,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.pickup__next',
                prevEl: '.pickup__prev',
            },
            breakpoints: {
                768: {
                    spaceBetween: 60,
                }
            }
        });
    }

    // Courses Slider
    let courseSwiper = undefined;
    if (document.querySelector('.courses-swiper')) {
        courseSwiper = new Swiper('.courses-swiper', {
            loop: true,
            pagination: {
                el: '.courses-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.courses-arrow--next',
                prevEl: '.courses-arrow--prev',
            },
        });
    }

    // Pickup Click Interaction
    const pickupSlides = document.querySelectorAll('.js-pickup-slide');
    if (pickupSlides.length > 0) {
        pickupSlides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                const targetIndex = slide.getAttribute('data-slide-index');
                const courseSection = document.getElementById('courses');

                if (targetIndex !== null && courseSection) {
                    const headerOffset = 100; // Approx header height
                    const elementPosition = courseSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    if (courseSwiper) {
                        courseSwiper.slideToLoop(parseInt(targetIndex));
                    }
                }
            });
        });
    }



    // Sticky Header
    const header = document.querySelector('.header');
    const aboutSection = document.querySelector('#about');


    if (header && aboutSection) {
        window.addEventListener('scroll', () => {
            const triggerPoint = aboutSection.getBoundingClientRect().top + window.pageYOffset - 100;

            if (window.scrollY > triggerPoint) {
                header.classList.add('is-active');
            } else {
                header.classList.remove('is-active');
            }
        });
    }

    // Page Top Button
    const pagetopBtn = document.getElementById('pagetop');
    if (pagetopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show after scrolling 300px
                pagetopBtn.classList.add('is-active');
            } else {
                pagetopBtn.classList.remove('is-active');
            }
        });

        pagetopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
