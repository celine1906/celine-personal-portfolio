// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({behavior: 'smooth'});
  });
});

// Observe sections to update active nav and reveal animations
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const navLink = document.querySelector(`.nav-link[href=\"#${id}\"]`);

    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(s => sectionObserver.observe(s));

// Reveal elements with .fade-up when they enter
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => animObserver.observe(el));
