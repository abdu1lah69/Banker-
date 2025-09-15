// Testimonials JavaScript - Banker Theme
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
});

function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentTestimonial = 0;

    if (testimonials.length === 0) return;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
        
        // Update dots if they exist
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Event listeners for navigation buttons
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
    }

    // Create dots navigation
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && testimonials.length > 1) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
            dotsContainer.appendChild(dot);
        });
        
        testimonialSlider.appendChild(dotsContainer);
    }

    // Auto-play testimonials
    setInterval(nextTestimonial, 6000);

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    const testimonialContainer = document.getElementById('testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        testimonialContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
            }
        }
    }

    // Initialize first testimonial
    showTestimonial(0);
}
