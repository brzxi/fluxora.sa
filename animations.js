/**
 * FLUXORA Theme - Animations & Effects
 * Cursor glow, particles, scroll animations, microinteractions
 */

// Cursor Glow Effect
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.innerWidth < 1024) { if (glow) glow.style.display = 'none'; return; }
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

// Particles System
function initParticles() {
  const container = document.querySelector('.particles-container');
  if (!container || window.innerWidth < 768) return;
  const particleCount = 25;
  const colors = ['rgba(59, 130, 246, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(34, 197, 94, 0.3)'];
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 25 + 15) + 's';
    particle.style.animationDelay = (Math.random() * 25) + 's';
    const size = (Math.random() * 3 + 1) + 'px';
    particle.style.width = size;
    particle.style.height = size;
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(particle);
  }
}

// Magnetic Button Effect
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-lg');
  if (window.innerWidth < 1024) return;
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// Tilt Effect for Cards
function initTiltCards() {
  const cards = document.querySelectorAll('.glass-card, .product-card, .pricing-card');
  if (window.innerWidth < 1024) return;
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 6;
      const tiltY = (x - 0.5) * -6;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

// Stagger Animation for Grid Items
function initStaggerAnimations() {
  const grids = document.querySelectorAll('.products-grid, .features-grid, .stats-grid, .pricing-grid');
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.children;
        Array.from(items).forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(30px)';
          setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        });
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  grids.forEach(grid => gridObserver.observe(grid));
}

// Parallax Scroll Effect
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length || window.innerWidth < 768) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = (scrollY - el.offsetTop) * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, { passive: true });
}

// Ripple Effect on Click
function initRippleEffect() {
  document.querySelectorAll('.btn, .product-card, .feature-card').forEach(el => {
    el.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      Object.assign(ripple.style, {
        position: 'absolute', width: size + 'px', height: size + 'px',
        left: x + 'px', top: y + 'px', borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.15)', transform: 'scale(0)',
        animation: 'ripple 0.6s ease-out', pointerEvents: 'none'
      });
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple { to { transform: scale(4); opacity: 0; } }
  .cart-bounce { animation: cartBounce 0.5s ease; }
  @keyframes cartBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
  .typing-cursor { animation: blink 1s infinite; }
  @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
`;
document.head.appendChild(style);

// Typing Effect for Hero
function initTypingEffect() {
  const typingEl = document.querySelector('[data-typing]');
  if (!typingEl) return;
  const words = JSON.parse(typingEl.dataset.typing);
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentWord.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 500; }
    setTimeout(type, delay);
  }
  type();
}

// Progress Bar on Scroll
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}

// Lazy Load Images with Fade
function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.src = img.dataset.src;
        img.onload = () => { img.style.opacity = '1'; };
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });
  images.forEach(img => imgObserver.observe(img));
}

// Number Counter with Intersection Observer
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();
        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.floor(eased * target);
          el.textContent = prefix + current.toLocaleString('ar-SA') + suffix;
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = prefix + target.toLocaleString('ar-SA') + suffix;
        }
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initParticles();
  initMagneticButtons();
  initTiltCards();
  initStaggerAnimations();
  initParallax();
  initRippleEffect();
  initTypingEffect();
  initScrollProgress();
  initLazyImages();
  initCounters();
});
