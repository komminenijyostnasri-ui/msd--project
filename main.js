document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
  
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  
    // Login modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.getElementById('login-close');
    const loginForm = document.getElementById('login-form');
  
    loginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
    });
  
    loginClose.addEventListener('click', () => {
      loginModal.classList.add('hidden');
    });
  
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.add('hidden');
      }
    });
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple validation
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();
  
      if (!email || !password) {
        alert('Please fill in all fields.');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
  
      // For now, just close modal and show alert
      loginModal.classList.add('hidden');
      alert(`Logged in as ${email} (demo only, no backend)`);
    });
  
    // Cart count update from localStorage
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      const cartCountElem = document.getElementById('cart-count');
      if (cartCountElem) {
        cartCountElem.textContent = count;
      }
    }
    updateCartCount();
  
    // Expose updateCartCount globally for other scripts
    window.updateCartCount = updateCartCount;
  });