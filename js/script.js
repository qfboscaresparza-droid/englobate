/* ========================================
   Englobate — Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Navigation ----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on overlay click
  navMenu.addEventListener('click', (e) => {
    if (e.target === navMenu) {
      closeMenu();
    }
  });

  // ---- Nav scroll effect ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  let ticking = false;

  function updateNav() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Scroll reveal with IntersectionObserver ----
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ---- Initial nav state ----
  updateNav();

});
