const products = [
    {
      id: 1,
      title: 'Wireless Headphones',
      price: 2999,
      images: [
        'assets/images/headphones.jpg',
        'assets/images/headphones-2.jpg',
        'assets/images/headphones-3.jpg',
      ],
      description: 'High-quality wireless headphones with noise cancellation.',
      reviews: [
        { text: 'Great sound quality!', rating: 5 },
        { text: 'Very comfortable.', rating: 4 },
      ],
    },
    {
      id: 2,
      title: 'Smart Watch',
      price: 4999,
      images: [
        'assets/images/smartwatch.jpg',
        'assets/images/smartwatch-2.jpg',
      ],
      description: 'Track your fitness and notifications on the go.',
      reviews: [],
    },
    {
      id: 3,
      title: 'Gaming Mouse',
      price: 1499,
      images: [
        'assets/images/mouse.jpg',
        'assets/images/mouse-2.jpg',
      ],
      description: 'Ergonomic mouse with customizable buttons.',
      reviews: [{ text: 'Perfect for gaming!', rating: 5 }],
    },
    {
      id: 4,
      title: 'Mechanical Keyboard',
      price: 3999,
      images: [
        'assets/images/keyboard.jpg',
        'assets/images/keyboard-2.jpg',
      ],
      description: 'Durable keyboard with tactile feedback.',
      reviews: [],
    },
  ];
  
  function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
  }
  
  function renderProduct(product) {
    if (!product) {
      document.querySelector('.product-detail-container').innerHTML = '<p>Product not found.</p>';
      return;
    }
  
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('breadcrumb-product-title').textContent = product.title;
  
    // Main image
    const mainImage = document.getElementById('main-image');
    mainImage.src = product.images[0];
    mainImage.alt = product.title;
  
    // Thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-container');
    thumbnailContainer.innerHTML = '';
    product.images.forEach((imgSrc, index) => {
      const thumb = document.createElement('img');
      thumb.src = imgSrc;
      thumb.alt = `${product.title} image ${index + 1}`;
      thumb.className = 'thumbnail';
      thumb.tabIndex = 0;
      thumb.addEventListener('click', () => {
        mainImage.src = imgSrc;
      });
      thumb.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') mainImage.src = imgSrc;
      });
      thumbnailContainer.appendChild(thumb);
    });
  
    // Reviews
    renderReviews(product.reviews);
  }
  
  function renderReviews(reviews) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
  
    if (reviews.length === 0) {
      reviewsList.innerHTML = '<li>No reviews yet.</li>';
      return;
    }
  
    reviews.forEach((review) => {
      const li = document.createElement('li');
      li.className = 'review-item';
      li.innerHTML = `
        <p>${review.text}</p>
        <p>Rating: ${'⭐'.repeat(review.rating)}</p>
      `;
      reviewsList.appendChild(li);
    });
  }
  
  function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: product.id, title: product.title, price: product.price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
    window.updateCartCount();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    const product = products.find((p) => p.id === productId);
    renderProduct(product);
  
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('quantity');
  
    addToCartBtn.addEventListener('click', () => {
      const qty = parseInt(quantityInput.value);
      if (qty < 1 || isNaN(qty)) {
        alert('Please enter a valid quantity.');
        return;
      }
      addToCart(product, qty);
    });
  
    // Review form
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = document.getElementById('review-text').value.trim();
      const rating = parseInt(document.getElementById('review-rating').value);
  
      if (!text || !rating) {
        alert('Please enter review text and rating.');
        return;
      }
  
      product.reviews.push({ text, rating });
      renderReviews(product.reviews);
      reviewForm.reset();
      alert('Thank you for your review!');
    });
  });