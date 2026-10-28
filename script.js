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

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Lightbox untuk gambar project
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
  <span class="lightbox-close">&times;</span>
  <img class="lightbox-img" src="" alt="">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.project-media img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
}

// Klik tombol close
lightboxClose.addEventListener('click', closeLightbox);

// Klik di luar gambar (background lightbox)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Tutup dengan tombol Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});