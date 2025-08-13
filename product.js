const featuredProducts = [
    {
      id: 1,
      title: 'Wireless Headphones',
      price: 2999,
      image: 'assets/images/headphones.jpg',
      description: 'High-quality wireless headphones with noise cancellation.',
    },
    {
      id: 2,
      title: 'Smart Watch',
      price: 4999,
      image: 'assets/images/smartwatch.jpg',
      description: 'Track your fitness and notifications on the go.',
    },
    {
      id: 3,
      title: 'Gaming Mouse',
      price: 1499,
      image: 'assets/images/mouse.jpg',
      description: 'Ergonomic mouse with customizable buttons.',
    },
    {
      id: 4,
      title: 'Mechanical Keyboard',
      price: 3999,
      image: 'assets/images/keyboard.jpg',
      description: 'Durable keyboard with tactile feedback.',
    },
  ];
  
  function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
  
    container.innerHTML = featuredProducts
      .map(
        (p) => `
      <div class="product-card" tabindex="0" aria-label="${p.title}">
        <img src="${p.image}" alt="${p.title}" class="product-image" />
        <div class="product-info">
          <h3 class="product-title">${p.title}</h3>
          <p class="product-price">₹${p.price.toLocaleString('en-IN')}</p>
          <button class="btn-add-cart" data-id="${p.id}" aria-label="Add ${p.title} to cart">Add to Cart</button>
        </div>
      </div>
    `
      )
      .join('');
  
    // Add event listeners to Add to Cart buttons
    container.querySelectorAll('.btn-add-cart').forEach((btn) => {
      btn.addEventListener('click', () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        addToCart(productId);
      });
    });
  }
  
  function addToCart(productId) {
    const product = featuredProducts.find((p) => p.id === productId);
    if (!product) return;
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: product.id, title: product.title, price: product.price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
    window.updateCartCount();
  }
  
  document.addEventListener('DOMContentLoaded', renderFeaturedProducts);