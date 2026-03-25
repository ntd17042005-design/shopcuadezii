document.documentElement.classList.add("js");

const state = { q: "", cat: "all", sort: "hot" };
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const productGrid = $("#productGrid");
const featuredGrid = $("#featuredGrid");
const emptyState = $("#emptyState");

const CATEGORY_NAME = {
  youtube: "YouTube Premium",
  ai: "ChatGPT & AI Tools",
  gemini: "Gemini",
  office: "Văn phòng / học tập",
  creative: "Thiết kế / sáng tạo",
  entertain: "Giải trí"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function categoryName(cat) {
  return CATEGORY_NAME[cat] || cat;
}

function scoreProduct(p) {
  let s = 0;
  if ((p.tags || []).includes("featured")) s += 100;
  if ((p.tags || []).includes("hot")) s += 35;
  if ((p.tags || []).includes("deal")) s += 15;
  if ((p.tags || []).includes("new")) s += 10;
  if (p.cat === "youtube") s += 8;
  if (p.cat === "ai" || p.cat === "gemini") s += 7;
  return s;
}

function fallbackIcon(iconKey) {
  return `<div class="icon-fallback">${ICONS[iconKey] || ICONS.chatgpt}</div>`;
}

function mediaMarkup(p) {
  return `<div class="product-media"><div class="product-fallback">${fallbackIcon(p.icon)}</div><img class="product-image" src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'"></div>`;
}

function buildBuyLink(p) {
  const text = encodeURIComponent(`Xin chào, mình muốn mua: ${p.title} - ${p.priceText}`);
  return `${CONFIG.facebookLink}?sk=messages&text=${text}`;
}

function featuredItems() {
  return FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
}

function filteredProducts() {
  const q = state.q.trim().toLowerCase();
  let list = PRODUCTS.filter((p) => {
    const haystack = `${p.title} ${p.note || ""} ${categoryName(p.cat)}`.toLowerCase();
    return (!q || haystack.includes(q)) && (state.cat === "all" || p.cat === state.cat);
  });

  list.sort((a, b) => {
    if (state.sort === "price-asc") return (a.price ?? 999999999) - (b.price ?? 999999999);
    if (state.sort === "price-desc") return (b.price ?? -1) - (a.price ?? -1);
    if (state.sort === "name") return a.title.localeCompare(b.title, "vi");
    return scoreProduct(b) - scoreProduct(a) || ((a.price ?? 999999999) - (b.price ?? 999999999));
  });

  return list;
}

function productCardMarkup(p, featured = false, index = 0) {
  const badge = featured ? "🔥 HOT • NỔI BẬT" : categoryName(p.cat);
  const badgeClass = featured ? "feature-badge" : "card-badge";

  return `<article class="${featured ? "feature-card" : "product-card"} cursor-hover fx-card" data-cursor-hover style="animation-delay:${Math.min(index * 70, 700)}ms">${mediaMarkup(p)}<div class="${badgeClass}">${badge}</div><h4>${p.title}</h4><p>${p.note || "Liên hệ để chốt đơn nhanh."}</p><div class="${featured ? "feature-price" : "product-price"}"><strong>${p.priceText}</strong><span>giá bán</span></div><div class="${featured ? "feature-options" : "card-meta"}"><div class="option-row"><span>Danh mục</span><span>${categoryName(p.cat)}</span></div><div class="option-row"><span>Tình trạng</span><span>${p.note || "Liên hệ"}</span></div></div><div class="card-actions"><a class="btn primary cursor-hover" href="${buildBuyLink(p)}" target="_blank" rel="noreferrer">Mua ngay</a></div></article>`;
}

function renderFeatured() {
  if (!featuredGrid) return;
  featuredGrid.innerHTML = featuredItems().map((p, i) => productCardMarkup(p, true, i)).join("");
  bindFxCards();
}

function renderProducts() {
  if (!productGrid || !emptyState) return;
  const items = filteredProducts();
  emptyState.classList.toggle("hidden", items.length > 0);
  productGrid.innerHTML = items.map((p, i) => productCardMarkup(p, false, i)).join("");
  bindFxCards();
}

function bindControls() {
  const q = $("#q");
  const cat = $("#cat");
  const sort = $("#sort");

  if (q) q.addEventListener("input", (e) => {
    state.q = e.target.value;
    renderProducts();
  });

  if (cat) cat.addEventListener("change", (e) => {
    state.cat = e.target.value;
    renderProducts();
  });

  if (sort) sort.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });
}

function forceShowReveal() {
  $$(".reveal").forEach((el) => {
    el.classList.add("show");
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.visibility = "visible";
  });
}

function bindReveal() {
  const reveals = $$(".reveal");
  if (!reveals.length) return;

  const shouldForceVisible = prefersReducedMotion || window.innerWidth < 769 || !("IntersectionObserver" in window);
  if (shouldForceVisible) {
    forceShowReveal();
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  reveals.forEach((el, index) => {
    el.style.setProperty("--reveal-delay", `${Math.min(index * 80, 260)}ms`);
    io.observe(el);
  });
}

function bindFxCards() {
  $$(".fx-card").forEach((card) => {
    if (card.dataset.fxBound) return;
    card.dataset.fxBound = "1";

    let frame = 0;
    let next = { rx: 0, ry: 0, mx: "50%", my: "50%" };

    const paint = () => {
      frame = 0;
      card.style.setProperty("--rx", `${next.rx.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${next.ry.toFixed(2)}deg`);
      card.style.setProperty("--mx", next.mx);
      card.style.setProperty("--my", next.my);
    };

    card.addEventListener("pointermove", (e) => {
      if (prefersReducedMotion || window.innerWidth < 769) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      next = {
        rx: (py - 0.5) * -7,
        ry: (px - 0.5) * 9,
        mx: `${(px * 100).toFixed(1)}%`,
        my: `${(py * 100).toFixed(1)}%`
      };
      card.classList.add("tilt-on");
      if (!frame) frame = requestAnimationFrame(paint);
    }, { passive: true });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("tilt-on");
      next = { rx: 0, ry: 0, mx: "50%", my: "50%" };
      if (!frame) frame = requestAnimationFrame(paint);
    });
  });
}

function bindBackgroundMotion() {
  if (prefersReducedMotion) return;
  const orbs = $$(".bg-orb");
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let ticking = false;

  const update = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 0.7;
      orb.style.transform = `translate3d(${(cx * factor).toFixed(2)}px, ${(cy * factor).toFixed(2)}px, 0)`;
    });
    ticking = false;
    if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) requestTick();
  };

  const requestTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("pointermove", (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    tx = x * 18;
    ty = y * 14;
    requestTick();
  }, { passive: true });
}

function bindScrollDepth() {
  if (prefersReducedMotion) return;
  const heroPanel = document.querySelector(".hero-panel");
  const topbar = document.querySelector(".topbar");

  const onScroll = () => {
    const y = Math.min(window.scrollY, 500);
    document.body.style.setProperty("--scroll-depth", `${(y / 500).toFixed(3)}`);
    if (heroPanel) heroPanel.style.transform = `translate3d(0, ${(-y * 0.03).toFixed(1)}px, 0)`;
    if (topbar) topbar.classList.toggle("topbar-scrolled", y > 14);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initPage() {
  renderFeatured();
  renderProducts();
  bindControls();
  bindReveal();
  bindBackgroundMotion();
  bindScrollDepth();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage, { once: true });
} else {
  initPage();
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 769) {
    forceShowReveal();
  }
}, { passive: true });
