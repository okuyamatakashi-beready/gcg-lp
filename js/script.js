document.addEventListener('DOMContentLoaded', () => {
    // MV Animation (if any JS needed, though mostly CSS)

    // Scroll Animation (Fade In)
    const fadeElements = document.querySelectorAll('.js-fade, .js-fade-left');
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
            const target = rect + offset;
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

    // Course Slider
    const courseSliderSelector = '.course__slider';
    let courseSwiper = undefined; // Expose instance

    if (document.querySelector(courseSliderSelector)) {
        const initCourseSwiper = () => {
            const isSP = window.matchMedia('(max-width: 767px)').matches;

            if (isSP && courseSwiper === undefined) {
                courseSwiper = new Swiper(courseSliderSelector, {
                    loop: true,
                    speed: 600,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 40,
                    navigation: {
                        nextEl: '.course__button-next',
                        prevEl: '.course__button-prev',
                    },
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                });
            } else if (!isSP && courseSwiper !== undefined) {
                courseSwiper.destroy(true, true);
                courseSwiper = undefined;
            }
        };

        initCourseSwiper();
        window.addEventListener('resize', initCourseSwiper);
    }

    // Pickup Click Interaction
    const pickupSlides = document.querySelectorAll('.js-pickup-slide');
    if (pickupSlides.length > 0) {
        pickupSlides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                const targetIndex = slide.getAttribute('data-slide-index');
                const courseSection = document.getElementById('course');

                if (targetIndex !== null && courseSection) {
                    const headerOffset = 100; // Approx header height
                    const elementPosition = courseSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // If SP and Swiper is active, slide to target
                    if (window.innerWidth <= 767 && courseSwiper) {
                        // Use slideToLoop for looped slider
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
});
