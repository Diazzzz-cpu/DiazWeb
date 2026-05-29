const navbar = document.getElementById('navbar');
const topBtn = document.getElementById('topBtn');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section-anchor');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  topBtn.classList.toggle('visible', window.scrollY > 350);
  updateActiveLink();
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

function updateActiveLink() {
  const position = window.scrollY + 120;
  sections.forEach(section => {
    if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
      navItems.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealItems.forEach(item => observer.observe(item));


const carouselTrack = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  currentSlide = (index + dots.length) % dots.length;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function startSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); startSlider(); });
nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); startSlider(); });
dots.forEach(dot => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.index)); startSlider(); }));
startSlider();
