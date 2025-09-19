// js/script.js
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (!navLinks) return;
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('active');
        });
    }

    // Contact form validation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Form submitted successfully!');
            form.reset();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Optional: Smooth scroll for links (if added anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skill bars when they come into view on the About page
    const skillFills = document.querySelectorAll('.skill-fill');
    if (skillFills && skillFills.length) {
        // initialize widths to zero to enable animation
        skillFills.forEach(el => el.style.width = '0%');

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.skill-fill');
                    fills.forEach(f => {
                        if (f.classList.contains('w-95')) f.style.width = '95%';
                        if (f.classList.contains('w-90')) f.style.width = '90%';
                        if (f.classList.contains('w-85')) f.style.width = '85%';
                        if (f.classList.contains('w-80')) f.style.width = '80%';
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        const expertiseSection = document.querySelector('.expertise');
        if (expertiseSection) observer.observe(expertiseSection);
    }
});