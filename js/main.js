/* ===========================================================
   LEHGAMOH — Global Application Logic
   Cart, Wishlist, Auth, Toasts, Cart Drawer, Search, AOS init
   =========================================================== */

const LGH = {
  cart: "lehgamoh_cart",
  wishlist: "lehgamoh_wishlist",
  user: "lehgamoh_user",
  accounts: "lehgamoh_accounts",
  orders: "lehgamoh_orders",
  addresses: "lehgamoh_addresses",
  cards: "lehgamoh_cards",
};

/* ---------------- Utilities ---------------- */
function formatPrice(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN");
}

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------------- Cart ---------------- */
function getCart() {
  return readJSON(LGH.cart, []);
}

function saveCart(cart) {
  writeJSON(LGH.cart, cart);
  updateHeaderState();
  renderCartDrawer();
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
}

function addToCart(productId, size, quantity) {
  const product = getProductById(productId);
  if (!product) return;
  const chosenSize = size || (product.sizes && product.sizes[1]) || "M";
  const qty = Math.max(1, Number(quantity) || 1);
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id && item.size === chosenSize);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: chosenSize,
      quantity: qty,
    });
  }

  saveCart(cart);
  toast(product.name + " added to your bag", "success");
  openCartDrawer();
}

function removeFromCart(index) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  saveCart(cart);
}

function changeQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

/* ---------------- Wishlist ---------------- */
function getWishlist() {
  return readJSON(LGH.wishlist, []);
}

function saveWishlist(list) {
  writeJSON(LGH.wishlist, list);
  updateHeaderState();
}

function isInWishlist(id) {
  return getWishlist().indexOf(Number(id)) !== -1;
}

function toggleWishlist(id) {
  const product = getProductById(id);
  if (!product) return;
  let list = getWishlist();
  if (list.indexOf(Number(id)) !== -1) {
    list = list.filter((x) => Number(x) !== Number(id));
    saveWishlist(list);
    toast(product.name + " removed from wishlist", "info");
  } else {
    list.push(Number(id));
    saveWishlist(list);
    toast(product.name + " saved to wishlist", "success");
  }
  document.querySelectorAll('[data-wish-btn="' + id + '"]').forEach((btn) => {
    const active = isInWishlist(id);
    btn.classList.toggle("text-brand", active);
    btn.innerHTML = '<i class="' + (active ? "fa-solid" : "fa-regular") + ' fa-heart"></i>';
  });
}

/* ---------------- Auth ---------------- */
function getUser() {
  const raw = localStorage.getItem(LGH.user);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed;
  } catch (e) {
    return { name: raw, email: "" };
  }
  return null;
}

function setUser(user) {
  writeJSON(LGH.user, user);
  updateHeaderState();
}

function logout() {
  localStorage.removeItem(LGH.user);
  toast("You have been logged out", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

function requireLogin(redirect) {
  if (!getUser()) {
    window.location.href = "login.html?redirect=" + encodeURIComponent(redirect || window.location.pathname.split("/").pop());
    return false;
  }
  return true;
}

/* ---------------- Header state ---------------- */
function updateHeaderState() {
  const cart = cartCount();
  const wish = getWishlist().length;
  const user = getUser();

  const cartBadge = document.getElementById("cart-count");
  if (cartBadge) {
    cartBadge.textContent = cart;
    cartBadge.classList.toggle("hidden", cart <= 0);
  }

  const wishBadge = document.getElementById("wishlist-count");
  if (wishBadge) {
    wishBadge.textContent = wish;
    wishBadge.classList.toggle("hidden", wish <= 0);
  }

  const userLabel = document.getElementById("user-label");
  const userLink = document.getElementById("user-link");
  if (userLabel) userLabel.textContent = user ? "Hi, " + (user.name || "User").split(" ")[0] : "Login";
  if (userLink) userLink.href = user ? "account.html" : "login.html";

  const drawerItems = document.getElementById("drawer-items");
  if (drawerItems) renderCartDrawer();
}

/* ---------------- Navbar interactions ---------------- */
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}

function toggleSearch() {
  const panel = document.getElementById("search-panel");
  if (!panel) return;
  panel.classList.toggle("hidden");
  if (!panel.classList.contains("hidden")) {
    const input = document.getElementById("search-input");
    if (input) setTimeout(() => input.focus(), 50);
  }
}

function doSearch(event) {
  if (event) event.preventDefault();
  const input = document.getElementById("search-input");
  const query = input ? input.value.trim() : "";
  window.location.href = "shop.html" + (query ? "?q=" + encodeURIComponent(query) : "");
}

/* ---------------- Cart Drawer ---------------- */
function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (drawer) drawer.classList.add("open");
  if (overlay) overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function renderCartDrawer() {
  const container = document.getElementById("drawer-items");
  if (!container) return;
  const cart = getCart();

  const countEl = document.getElementById("drawer-count");
  if (countEl) countEl.textContent = cartCount() > 0 ? "(" + cartCount() + ")" : "";

  const subtotalEl = document.getElementById("drawer-subtotal");
  if (subtotalEl) subtotalEl.textContent = formatPrice(cartSubtotal());

  if (!cart.length) {
    container.innerHTML =
      '<div class="text-center py-16">' +
      '<i class="fa-solid fa-bag-shopping text-5xl text-gray-200 mb-4"></i>' +
      '<p class="text-gray-500">Your bag is empty.</p>' +
      '<a href="shop.html" class="inline-block mt-4 text-brand font-semibold hover:underline">Start Shopping</a>' +
      "</div>";
    return;
  }

  container.innerHTML = cart
    .map(
      (item, index) =>
        '<div class="flex gap-3 py-4 border-b last:border-0">' +
        '<img src="' + item.image + '" alt="' + escapeHtml(item.name) + '" class="w-16 h-20 object-cover rounded" onerror="this.src=\'https://via.placeholder.com/80x100\'">' +
        '<div class="flex-1 min-w-0">' +
        '<h4 class="font-semibold text-sm text-gray-900 truncate">' + escapeHtml(item.name) + "</h4>" +
        '<p class="text-xs text-gray-500 mt-0.5">Size: ' + escapeHtml(item.size) + "</p>" +
        '<div class="flex items-center justify-between mt-2">' +
        '<div class="flex items-center border rounded">' +
        '<button onclick="changeQty(' + index + ',-1)" class="px-2 py-0.5 text-gray-600 hover:text-brand">−</button>' +
        '<span class="px-2 text-sm">' + item.quantity + "</span>" +
        '<button onclick="changeQty(' + index + ',1)" class="px-2 py-0.5 text-gray-600 hover:text-brand">+</button>' +
        "</div>" +
        '<span class="text-sm font-bold text-brand">' + formatPrice(item.price * item.quantity) + "</span>" +
        "</div></div>" +
        '<button onclick="removeFromCart(' + index + ')" aria-label="Remove" class="text-gray-400 hover:text-red-600 self-start"><i class="fa-solid fa-trash text-sm"></i></button>' +
        "</div>"
    )
    .join("");
}

/* ---------------- Toast ---------------- */
function toast(message, type) {
  let host = document.getElementById("toast-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "toast-host";
    host.className = "fixed top-24 right-4 z-[90] flex flex-col gap-2 items-end";
    document.body.appendChild(host);
  }

  const palette =
    type === "error"
      ? "bg-red-600"
      : type === "info"
      ? "bg-gray-800"
      : "bg-emerald-600";
  const icon = type === "error" ? "fa-circle-exclamation" : type === "info" ? "fa-circle-info" : "fa-circle-check";

  const el = document.createElement("div");
  el.className = "toast-item " + palette + " text-white text-sm px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-xs";
  el.innerHTML = '<i class="fa-solid ' + icon + '"></i><span>' + escapeHtml(message) + "</span>";
  host.appendChild(el);

  setTimeout(() => {
    el.classList.add("hide");
    setTimeout(() => el.remove(), 350);
  }, 2600);
}

/* ---------------- Product card markup ---------------- */
function productCard(product) {
  const inWish = isInWishlist(product.id);
  return (
    '<article class="product-card bg-white rounded-xl shadow-sm overflow-hidden group card-hover" data-aos="fade-up">' +
    '<div class="relative block overflow-hidden h-80">' +
    '<a href="product.html?id=' + product.id + '">' +
    '<img src="' + product.image + '" alt="' + escapeHtml(product.name) + '" loading="lazy" class="product-img w-full h-80 object-cover" onerror="this.src=\'https://via.placeholder.com/400x600?text=Lehgamoh\'">' +
    "</a>" +
    (product.discount >= 22
      ? '<span class="absolute top-3 left-3 bg-brand text-white text-[11px] font-bold px-2.5 py-1 rounded">' + product.discount + "% OFF</span>"
      : "") +
    '<button data-wish-btn="' + product.id + '" onclick="toggleWishlist(' + product.id + ')" aria-label="Wishlist" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:text-brand shadow ' + (inWish ? "text-brand" : "") + '">' +
    '<i class="' + (inWish ? "fa-solid" : "fa-regular") + ' fa-heart"></i></button>' +
    '<div class="slide-up absolute bottom-0 left-0 w-full p-3 bg-white/95 backdrop-blur">' +
    '<button onclick="addToCart(' + product.id + ')" class="w-full bg-black text-white py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase hover:bg-brand transition">Add to Cart</button>' +
    "</div></div>" +
    '<div class="p-4 text-center">' +
    '<p class="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">' + escapeHtml(product.categoryLabel) + "</p>" +
    '<a href="product.html?id=' + product.id + '" class="block text-sm font-semibold text-gray-800 hover:text-brand truncate">' + escapeHtml(product.name) + "</a>" +
    '<div class="mt-1.5 flex items-center justify-center gap-2">' +
    '<span class="text-brand font-bold">' + formatPrice(product.price) + "</span>" +
    '<span class="text-gray-400 text-xs line-through">' + formatPrice(product.oldPrice) + "</span>" +
    "</div>" +
    '<div class="mt-1 text-[11px] text-amber-500"><i class="fa-solid fa-star"></i> ' + product.rating + " / 5</div>" +
    "</div></article>"
  );
}

function renderProductGrid(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!list.length) {
    container.innerHTML =
      '<div class="col-span-full text-center py-20">' +
      '<i class="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-4"></i>' +
      '<p class="text-gray-500 text-lg">No products found.</p>' +
      '<a href="shop.html" class="inline-block mt-4 text-brand font-semibold hover:underline">View all products</a>' +
      "</div>";
    return;
  }
  container.innerHTML = list.map(productCard).join("");
  if (window.AOS) AOS.refresh();
}

/* ---------------- Init ---------------- */
function initPage() {
  renderNavbar();
  renderFooter();
  injectCartDrawer();
  renderCartDrawer();
  updateHeaderState();

  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 60, easing: "ease-out-cubic" });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCartDrawer();
  });
}

document.addEventListener("DOMContentLoaded", initPage);
