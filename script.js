// This file can be used for any interactive elements on your portfolio.
// For a simple static portfolio, it might not have much code initially.

document.addEventListener('DOMContentLoaded', () => {
    // Example: Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // You can add more JavaScript here later, such as:
    // - A "back to top" button
    // - Dynamic content loading (e.g., fetching game data from an API)
    // - Simple animations or transitions on scroll
    // - A contact form submission handler
});
