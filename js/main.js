// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Batch timings tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.timings-table-wrap');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form -> WhatsApp handoff
const CENTRE_NUMBERS = {
  'Baner/Balewadi': '918446188518',
  'Mahalunge': '919270402022',
  'Either': '918446188518'
};

const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim();
  const phone = data.get('phone').trim();
  const centre = data.get('centre');
  const style = data.get('style');
  const message = data.get('message').trim();

  const waNumber = CENTRE_NUMBERS[centre] || CENTRE_NUMBERS['Either'];
  const text = [
    `Hi Zero Dance Studio! I'd like to book a free trial.`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Preferred Centre: ${centre}`,
    `Dance Style: ${style}`,
    message ? `Message: ${message}` : null
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  form.reset();
});

// Scroll-reveal animations
const revealSelectors = [
  '.about-text', '.about-visual .visual-card',
  '.section-tag', '.section h2', '.section-intro',
  '.program-card', '.batch-type',
  '.timings-tabs', '.timings-table-wrap',
  '.location-card',
  '.gallery-tile',
  '.trust-item',
  '.contact-info', '.contact-form'
];
const revealEls = document.querySelectorAll(revealSelectors.join(','));
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 0.06}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Header shrinks/darkens on scroll
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();
