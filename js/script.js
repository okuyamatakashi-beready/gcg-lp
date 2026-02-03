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

    // Course Slider
    if (document.querySelector('.course__slider')) {
        const courseSwiper = new Swiper('.course__slider', {
            loop: true,
            speed: 600,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 40,
            navigation: {
                nextEl: '.course__next',
                prevEl: '.course__prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    spaceBetween: 60,
                }
            }
        });
    }
});
