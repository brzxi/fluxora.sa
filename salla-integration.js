/**
 * FLUXORA Theme - Salla Platform Integration
 * Handles Salla API events and theme-specific interactions
 */

// ============================================
// SALLA EVENTS INTEGRATION
// ============================================

// Listen for Salla cart events
document.addEventListener('salla::cart.updated', (event) => {
  const cartData = event.detail;
  if (window.Alpine) {
    Alpine.store('app').cartCount = cartData.count || 0;
  }
  // Update cart badge animation
  const cartIcon = document.querySelector('.nav-cart');
  if (cartIcon) {
    cartIcon.classList.add('cart-bounce');
    setTimeout(() => cartIcon.classList.remove('cart-bounce'), 500);
  }
});

// Listen for add to cart
document.addEventListener('salla::cart.item.added', (event) => {
  showToast('تمت الإضافة إلى السلة بنجاح!', 'success');
});

// Listen for remove from cart
document.addEventListener('salla::cart.item.removed', (event) => {
  showToast('تم حذف المنتج من السلة', 'info');
});

// Listen for wishlist events
document.addEventListener('salla::wishlist.item.added', (event) => {
  showToast('تمت الإضافة للمفضلة ❤️', 'success');
});

// Listen for order completion
document.addEventListener('salla::order.created', (event) => {
  showToast('تم إنشاء الطلب بنجاح! 🎉', 'success');
});

// ============================================
// SALLA PRODUCT INTERACTIONS
// ============================================

// Add to cart with animation
function sallaAddToCart(productId, quantity = 1) {
  if (window.salla) {
    salla.cart.addItem({
      id: productId,
      quantity: quantity
    }).then((response) => {
      showToast('تمت الإضافة إلى السلة!', 'success');
    }).catch((error) => {
      showToast('حدث خطأ، حاول مرة أخرى', 'error');
    });
  }
}

// Quick buy
function sallaBuyNow(productId) {
  if (window.salla) {
    salla.cart.addItem({
      id: productId,
      quantity: 1
    }).then(() => {
      window.location.href = '/checkout';
    });
  }
}

// ============================================
// SALLA THEME HELPERS
// ============================================

// Format price in SAR
function formatPrice(price) {
  return new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price) + ' ر.س';
}

// Format date in Arabic
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Relative time in Arabic
function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return 'الآن';
  if (diff < 3600) return `قبل ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `قبل ${Math.floor(diff / 3600)} ساعة`;
  if (diff < 2592000) return `قبل ${Math.floor(diff / 86400)} يوم`;
  return formatDate(dateStr);
}

// ============================================
// SALLA SEARCH
// ============================================

function initSallaSearch() {
  const searchInput = document.querySelector('.search-overlay input');
  if (!searchInput) return;
  
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.trim();
      if (query.length >= 2 && window.salla) {
        salla.product.search(query).then((results) => {
          // Handle search results
          console.log('Search results:', results);
        });
      }
    }, 300);
  });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initSallaSearch();
  
  // Initialize cart count from Salla
  if (window.salla) {
    salla.cart.getCart().then((cart) => {
      if (window.Alpine) {
        Alpine.store('app').cartCount = cart.count || 0;
      }
    });
  }
});

// Export utilities
window.FluxoraTheme = {
  addToCart: sallaAddToCart,
  buyNow: sallaBuyNow,
  formatPrice,
  formatDate,
  timeAgo,
  showToast
};
