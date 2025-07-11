'use strict';

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/** navbar toggle **/
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/** header sticky & back top btn **/
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }
  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);

/** scroll reveal **/
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();
addEventOnElem(window, "scroll", scrollReveal);

/** cart functionality **/

document.addEventListener('DOMContentLoaded', () => {
  const cartButtonText = document.querySelector('.header-action-btn[aria-label="cart item"] .btn-text');
  const cartBadge = document.querySelector('.header-action-btn[aria-label="cart item"] .btn-badge');
  const wishlistBadge = document.querySelector('.header-action-btn[aria-label="favourite item"] .btn-badge');
  const headerCartBtn = document.querySelector('.header-action-btn[aria-label="cart item"]');

  // Initialize cartItems from localStorage or empty array
  let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  let wishlistItems = 0;

  document.querySelectorAll('.shop-card').forEach(card => {
    const priceElement = card.querySelector('.price .span');
    const nameElement = card.querySelector('.card-title');
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const name = nameElement.textContent.trim();

    const cartBtn = card.querySelector('button[aria-label="add to cart"]');
    const starBtn = card.querySelector('button[aria-label="add to whishlist"]');
    const compareBtn = card.querySelector('button[aria-label="compare"]');

    cartBtn.addEventListener('click', () => {
      cartItems.push({ name, price });
      saveCart();
      updateCartDisplay();
    });

    starBtn.addEventListener('click', () => {
      wishlistItems++;
      wishlistBadge.textContent = wishlistItems;
    });

    compareBtn.addEventListener('click', () => {
      alert('Compare feature coming soon!');
    });
  });

  headerCartBtn.addEventListener('click', () => {
    // open cart.html in new tab/window
    window.open('cart.html', '_blank');
  });

  function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  function updateCartDisplay() {
    let total = 0;
    cartItems.forEach(item => total += item.price);
    cartBadge.textContent = cartItems.length;
    cartButtonText.textContent = `$${total.toFixed(2)}`;
  }

  updateCartDisplay();
});
const products = [
  { name: "Lipstick", price: 10, category: "lipstick" },
  { name: "Red Lipstick", price: 12, category: "lipstick" },
  { name: "Matte Lipstick", price: 15, category: "lipstick" },
  { name: "Bodywash", price: 8, category: "bodywash" },
  { name: "Herbal Bodywash", price: 9, category: "bodywash" },
  { name: "Lip Balm", price: 5, category: "lipbalm" },
  { name: "Facial Cream", price: 20, category: "facial" },
  { name: "Facial Mask", price: 18, category: "facial" },
];

const searchInput = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';
  
  if (query.length === 0) {
    searchResults.style.display = 'none';
    return;
  }

  const matched = products.filter(p => 
    p.name.toLowerCase().includes(query) || p.category.includes(query)
  );

  if (matched.length === 0) {
    searchResults.innerHTML = '<p style="padding:8px;">No products found</p>';
  } else {
    matched.slice(0, 4).forEach(p => {
      const div = document.createElement('div');
      div.classList.add('search-item');
      div.innerHTML = `
        <strong>${p.name}</strong> - $${p.price.toFixed(2)}
        <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      `;
      searchResults.appendChild(div);
    });
  }

  searchResults.style.display = 'block';
});

function addToCart(name, price) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  cartItems.push({ name, price });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert(`${name} added to cart!`);
}
