/**
 * FLUXORA Theme - Main Application JavaScript
 * Version: 1.0.0
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    mobileMenuOpen: false,
    cartCount: 0,
    isScrolled: false,
    searchOpen: false,
    toggleMobileMenu() { this.mobileMenuOpen = !this.mobileMenuOpen; },
    closeMobileMenu() { this.mobileMenuOpen = false; }
  });

  Alpine.data('cart', () => ({
    items: [],
    isOpen: false,
    get total() { return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0); },
    get count() { return this.items.reduce((sum, item) => sum + item.quantity, 0); },
    addItem(product) {
      const existing = this.items.find(item => item.id === product.id);
      if (existing) { existing.quantity++; } else { this.items.push({ ...product, quantity: 1 }); }
      this.showAddAnimation();
      Alpine.store('app').cartCount = this.count;
    },
    removeItem(id) { this.items = this.items.filter(item => item.id !== id); Alpine.store('app').cartCount = this.count; },
    updateQuantity(id, qty) { const item = this.items.find(item => item.id === id); if (item) { item.quantity = Math.max(1, qty); } Alpine.store('app').cartCount = this.count; },
    showAddAnimation() { const cartIcon = document.querySelector('.nav-cart'); if (cartIcon) { cartIcon.classList.add('cart-bounce'); setTimeout(() => cartIcon.classList.remove('cart-bounce'), 500); } }
  }));

  Alpine.data('faq', () => ({
    activeIndex: null,
    toggle(index) { this.activeIndex = this.activeIndex === index ? null : index; },
    isOpen(index) { return this.activeIndex === index; }
  }));

  Alpine.data('productGallery', () => ({
    currentImage: 0,
    images: [],
    init() { this.images = JSON.parse(this.$el.dataset.images || '[]'); },
    next() { this.currentImage = (this.currentImage + 1) % this.images.length; },
    prev() { this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length; },
    goTo(index) { this.currentImage = index; }
  }));

  Alpine.data('newsletter', () => ({
    email: '',
    status: '',
    message: '',
    async submit() {
      if (!this.email || !this.email.includes('@')) { this.status = 'error'; this.message = 'يرجى إدخال بريد إلكتروني صحيح'; return; }
      this.status = 'loading';
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.status = 'success';
      this.message = 'تم الاشتراك بنجاح! شكراً لك';
      this.email = '';
      setTimeout(() => { this.status = ''; this.message = ''; }, 4000);
    }
  }));

  Alpine.data('carousel', () => ({
    currentSlide: 0,
    totalSlides: 0,
    autoplayInterval: null,
    init() { this.totalSlides = this.$el.querySelectorAll('.carousel-slide').length; this.startAutoplay(); },
    next() { this.currentSlide = (this.currentSlide + 1) % this.totalSlides; },
    prev() { this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides; },
    goTo(index) { this.currentSlide = index; },
    startAutoplay() { this.autoplayInterval = setInterval(() => this.next(), 5000); },
    stopAutoplay() { clearInterval(this.autoplayInterval); },
    destroy() { this.stopAutoplay(); }
  }));

  Alpine.data('tabs', () => ({
    activeTab: 0,
    setTab(index) { this.activeTab = index; },
    isActive(index) { return this.activeTab === index; }
  }));

  Alpine.data('counter', () => ({
    current: 0,
    target: 0,
    duration: 2000,
    started: false,
    init() { this.target = parseInt(this.$el.dataset.target) || 0; },
    start() {
      if (this.started) return;
      this.started = true;
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        this.current = Math.floor(eased * this.target);
        if (progress < 1) { requestAnimationFrame(animate); } else { this.current = this.target; }
      };
      requestAnimationFrame(animate);
    }
  }));
});

// Header Scroll
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const currentScrollY = window.scrollY;
  if (header) { if (currentScrollY > 50) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); } }
  if (window.Alpine) { Alpine.store('app').isScrolled = currentScrollY > 50; }
  lastScrollY = currentScrollY;
}, { passive: true });

// Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});

// Intersection Observer
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in, .slide-in-right, .scale-in').forEach(el => observer.observe(el));
});

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const bgColor = type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)';
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  Object.assign(toast.style, { position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%) translateY(20px)', background: bgColor, color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', fontSize: '0.9rem', fontFamily: 'var(--font-family)', fontWeight: '600', zIndex: '10000', opacity: '0', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '0.5rem' });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)'; setTimeout(() => toast.remove(), 300); }, 3000);
}
window.showToast = showToast;

// Reduced Motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition-fast', '0s');
  document.documentElement.style.setProperty('--transition-normal', '0s');
  document.documentElement.style.setProperty('--transition-slow', '0s');
}
