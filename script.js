// ============================
// NAVBAR SCROLL & PROGRESS BAR
// ============================
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Update top scroll progress bar
  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  }

  updateActiveLink();
  toggleTopBtn();
});

// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
function updateActiveLink() {
  const scrollPos = window.scrollY + 140;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

// ============================
// MOBILE MENU TOGGLE
// ============================
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ============================
// BACK TO TOP BUTTON
// ============================
const topBtn = document.getElementById('topBtn');

function toggleTopBtn() {
  if (window.scrollY > 450) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
}

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================
// TYPING ANIMATION
// ============================
const roles = [
  '4th Year BSIT Student',
  'Full-Stack Web Developer',
  'System Architect & Builder',
  'TypeScript & .NET Developer',
  'Database & API Engineer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1900);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, isDeleting ? 45 : 85);
}

type();

// ============================
// SCROLL REVEAL ANIMATION
// ============================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ============================
// PROJECT CAROUSEL + QUICK TABS
// ============================
(function () {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const dots = document.querySelectorAll('.carousel-dot');
  const tabs = document.querySelectorAll('.project-tab');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const viewport = track.closest('.carousel-viewport');
  const total = track.querySelectorAll('.carousel-slide').length;
  let current = 0;
  let autoTimer = null;

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('active', active);
      d.setAttribute('aria-selected', String(active));
    });

    tabs.forEach((t, i) => {
      const active = i === current;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6500);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(Number(dot.dataset.index)); startAuto(); });
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => { goTo(Number(tab.dataset.index)); startAuto(); });
  });

  // Pause auto-slide while hovering
  viewport.addEventListener('mouseenter', stopAuto);
  viewport.addEventListener('mouseleave', startAuto);

  // Touch swipe support
  let touchX = 0;
  viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    startAuto();
  }, { passive: true });

  startAuto();
})();

// ============================
// IMAGE LIGHTBOX
// ============================
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(img) {
  lightboxImage.src = img.dataset.full;
  lightboxImage.alt = img.alt;
  lightboxTitle.textContent = img.dataset.title;
  imageLightbox.classList.add('active');
  imageLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  imageLightbox.classList.remove('active');
  imageLightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  lightboxTitle.textContent = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-preview-img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img));
});

lightboxClose.addEventListener('click', closeLightbox);

imageLightbox.addEventListener('click', e => {
  if (e.target === imageLightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && imageLightbox.classList.contains('active')) closeLightbox();
});

// ============================
// CONTACT FORM HANDLER
// ============================
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span>';

  setTimeout(() => {
    form.reset();
    formSuccess.classList.add('visible');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;

    setTimeout(() => {
      formSuccess.classList.remove('visible');
    }, 5000);
  }, 900);
});
