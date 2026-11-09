/* ===========================================================
   LEHGAMOH — Shared Components (Navbar, Footer, Cart Drawer)
   Injected into #navbar-placeholder, #footer-placeholder and body
   =========================================================== */

function renderNavbar() {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  placeholder.innerHTML = `
  <div class="bg-brand text-white text-center text-xs sm:text-sm py-2 px-4 tracking-wide">
    Free shipping on orders above ₹5,000 &nbsp;•&nbsp; Handcrafted in India
  </div>

  <nav class="bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center gap-4">
        <div class="flex items-center gap-3">
          <button onclick="toggleMobileMenu()" aria-label="Open menu" class="md:hidden text-2xl text-gray-700">
            <i class="fa-solid fa-bars"></i>
          </button>
          <a href="index.html" class="flex items-center gap-2">
            <img src="logo.png" alt="Lehgamoh Logo" class="h-10 w-10 object-contain" onerror="this.style.display='none'">
            <span class="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-brand tracking-[0.18em]">LEHGAMOH</span>
          </a>
        </div>

        <div class="hidden md:flex items-center space-x-6 lg:space-x-8 text-gray-700 font-medium text-sm">
          <a href="index.html" class="hover:text-brand transition gold-underline">Home</a>
          <a href="shop.html" class="hover:text-brand transition gold-underline">Shop</a>
          <div class="relative group">
            <button class="hover:text-brand transition flex items-center gap-1 py-6">
              Categories <i class="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
            <div class="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl rounded-lg py-2 w-52 border border-gray-100">
              <a href="category-bridal.html" class="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand">Bridal Collection</a>
              <a href="category-wedding.html" class="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand">Wedding Collection</a>
              <a href="category-party.html" class="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand">Party Wear</a>
              <a href="category-reception.html" class="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand">Reception Wear</a>
              <a href="category-casual.html" class="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand">Casual & Suits</a>
              <a href="new-arrivals.html" class="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand">New Arrivals</a>
              <a href="sale.html" class="block px-4 py-2.5 hover:bg-gray-50 text-brand font-bold">SALE</a>
            </div>
          </div>
          <a href="blog.html" class="hover:text-brand transition gold-underline">Blog</a>
          <a href="about.html" class="hover:text-brand transition gold-underline">About</a>
          <a href="contact.html" class="hover:text-brand transition gold-underline">Contact</a>
        </div>

        <div class="flex items-center gap-3 sm:gap-5">
          <button onclick="toggleSearch()" aria-label="Search" class="text-gray-700 hover:text-brand transition text-lg sm:text-xl">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <a href="wishlist.html" aria-label="Wishlist" class="relative text-gray-700 hover:text-brand transition text-lg sm:text-xl">
            <i class="fa-regular fa-heart"></i>
            <span id="wishlist-count" class="absolute -top-2 -right-3 bg-brand text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
          </a>
          <button onclick="openCartDrawer()" aria-label="Cart" class="relative text-gray-700 hover:text-brand transition text-lg sm:text-xl">
            <i class="fa-solid fa-bag-shopping"></i>
            <span id="cart-count" class="absolute -top-2 -right-3 bg-brand text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
          </button>
          <a href="login.html" id="user-link" aria-label="Account" class="text-gray-700 hover:text-brand transition text-sm flex items-center gap-1.5 max-w-[100px]">
            <i class="fa-regular fa-user text-lg"></i>
            <span id="user-label" class="hidden lg:inline truncate">Login</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Search bar -->
    <div id="search-panel" class="hidden border-t border-gray-100 bg-white">
      <form onsubmit="doSearch(event)" class="max-w-3xl mx-auto px-4 py-4 flex gap-2">
        <input id="search-input" type="text" placeholder="Search lehengas, sarees, gowns..." class="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:border-brand">
        <button type="submit" class="bg-brand text-white px-5 rounded-lg hover:bg-[#5a0000]"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-gray-100 bg-white">
      <div class="px-4 py-3 space-y-1 text-gray-700 font-medium">
        <a href="index.html" class="block py-2.5 border-b border-gray-50">Home</a>
        <a href="shop.html" class="block py-2.5 border-b border-gray-50">Shop</a>
        <a href="category-bridal.html" class="block py-2.5 border-b border-gray-50">Bridal Collection</a>
        <a href="category-wedding.html" class="block py-2.5 border-b border-gray-50">Wedding Collection</a>
        <a href="category-party.html" class="block py-2.5 border-b border-gray-50">Party Wear</a>
        <a href="category-reception.html" class="block py-2.5 border-b border-gray-50">Reception Wear</a>
        <a href="new-arrivals.html" class="block py-2.5 border-b border-gray-50">New Arrivals</a>
        <a href="sale.html" class="block py-2.5 border-b border-gray-50 text-brand font-bold">SALE</a>
        <a href="blog.html" class="block py-2.5 border-b border-gray-50">Blog</a>
        <a href="about.html" class="block py-2.5 border-b border-gray-50">About</a>
        <a href="contact.html" class="block py-2.5">Contact</a>
      </div>
    </div>
  </nav>`;

  updateHeaderState();
}

function renderFooter() {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  placeholder.innerHTML = `
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <img src="logo.png" alt="Lehgamoh Logo" class="h-10 w-10 object-contain" onerror="this.style.display='none'">
          <h3 class="text-2xl font-serif text-gold tracking-widest">LEHGAMOH</h3>
        </div>
        <p class="text-sm leading-relaxed text-gray-400">Crafting elegance, weaving traditions. Handcrafted ethnic wear for weddings, celebrations and every moment that deserves to be remembered.</p>
        <div class="flex gap-3 mt-5 text-lg">
          <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Facebook" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="WhatsApp" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition"><i class="fa-brands fa-whatsapp"></i></a>
          <a href="#" aria-label="Pinterest" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand transition"><i class="fa-brands fa-pinterest"></i></a>
        </div>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-4 tracking-wide">Quick Links</h4>
        <ul class="space-y-2.5 text-sm text-gray-400">
          <li><a href="shop.html" class="hover:text-gold transition">Shop the Collection</a></li>
          <li><a href="new-arrivals.html" class="hover:text-gold transition">New Arrivals</a></li>
          <li><a href="about.html" class="hover:text-gold transition">About Us</a></li>
          <li><a href="blog.html" class="hover:text-gold transition">Journal</a></li>
          <li><a href="contact.html" class="hover:text-gold transition">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-4 tracking-wide">Customer Service</h4>
        <ul class="space-y-2.5 text-sm text-gray-400">
          <li><a href="faq.html" class="hover:text-gold transition">FAQ</a></li>
          <li><a href="shipping-policy.html" class="hover:text-gold transition">Shipping Policy</a></li>
          <li><a href="return-policy.html" class="hover:text-gold transition">Returns & Refunds</a></li>
          <li><a href="size-guide.html" class="hover:text-gold transition">Size Guide</a></li>
          <li><a href="track-order.html" class="hover:text-gold transition">Track Your Order</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-4 tracking-wide">Help & Info</h4>
        <ul class="space-y-2.5 text-sm text-gray-400">
          <li><a href="privacy-policy.html" class="hover:text-gold transition">Privacy Policy</a></li>
          <li><a href="terms-conditions.html" class="hover:text-gold transition">Terms & Conditions</a></li>
          <li><a href="account.html" class="hover:text-gold transition">My Account</a></li>
          <li><a href="orders.html" class="hover:text-gold transition">My Orders</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <p>© 2024 Lehgamoh. All rights reserved.</p>
        <p>Designed &amp; developed by Raj Gautam — BCA Final Year Project</p>
      </div>
    </div>
  </footer>`;
}

function injectCartDrawer() {
  if (document.getElementById("cart-drawer")) return;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
  <div id="drawer-overlay" onclick="closeCartDrawer()" class="fixed inset-0 bg-black/50 z-[60]"></div>
  <aside id="cart-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col">
    <div class="flex items-center justify-between px-5 py-4 border-b">
      <h3 class="text-lg font-serif font-bold text-gray-900">Your Shopping Bag <span id="drawer-count" class="text-sm font-sans font-normal text-gray-500"></span></h3>
      <button onclick="closeCartDrawer()" aria-label="Close cart" class="text-2xl text-gray-500 hover:text-brand"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div id="drawer-items" class="flex-1 overflow-y-auto px-5 py-4"></div>
    <div class="border-t px-5 py-5 space-y-4">
      <div class="flex justify-between items-center text-lg">
        <span class="text-gray-600">Subtotal</span>
        <span id="drawer-subtotal" class="font-bold text-brand">₹0</span>
      </div>
      <p class="text-xs text-gray-500">Shipping & taxes calculated at checkout.</p>
      <a href="checkout.html" class="block text-center w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-[#5a0000] transition">Proceed to Checkout</a>
      <a href="cart.html" class="block text-center w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-brand hover:text-brand transition">View Cart</a>
    </div>
  </aside>`;
  document.body.appendChild(wrapper);
  document.body.style.overflow = "";
  updateHeaderState();
}
