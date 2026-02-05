document.addEventListener('DOMContentLoaded', () => {
    // MV Animation (if any JS needed, though mostly CSS)

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
    if (document.querySelector(courseSliderSelector)) {
        let courseSwiper = undefined;

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
});
