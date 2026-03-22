document.documentElement.classList.add("js");

const grid = document.getElementById("productGrid");
const featuredGrid = document.getElementById("featuredGrid");
const q = document.getElementById("q");
const cat = document.getElementById("cat");
const sort = document.getElementById("sort");
const emptyState = document.getElementById("emptyState");

const CATEGORY_LABELS = {
  youtube: "YouTube Premium",
  ai: "ChatGPT & AI Tools",
  gemini: "Gemini",
  office: "Văn phòng / học tập",
  creative: "Thiết kế / sáng tạo",
  entertain: "Giải trí"
};

function getCategoryLabel(catKey) {
  return CATEGORY_LABELS[catKey] || catKey || "Khác";
}

function formatPrice(price) {
  return Number(price || 0).toLocaleString("vi-VN") + " VNĐ";
}

function getBadgeText(item) {
  if (item.tags && item.tags.includes("featured")) {
    return "🔥 HOT • NỔI BẬT";
  }
  return getCategoryLabel(item.cat);
}

function getBadgeClass(item) {
  if (item.tags && item.tags.includes("featured")) {
    return "card-badge badge-hot";
  }
  return "card-badge";
}

function createProductCard(item) {
  return `
    <div class="product-card reveal">
      <div class="product-media">
        <img
          class="product-image"
          src="${item.image || ""}"
          alt="${item.title || ""}"
          loading="lazy"
          onload="this.parentElement.classList.add('has-image')"
          onerror="this.style.display='none'; this.parentElement.classList.remove('has-image')"
        >
        <div class="product-fallback">
          <div class="icon-fallback">
            ${ICONS[item.icon] || ""}
          </div>
        </div>
      </div>

      <div class="${getBadgeClass(item)}">${getBadgeText(item)}</div>

      <h4>${item.title || ""}</h4>
      <p>${item.note || ""}</p>

      <div class="product-price">
        <strong>${item.priceText || formatPrice(item.price)}</strong>
        <span>giá bán</span>
      </div>

      <div class="card-meta">
        <div class="option-row">
          <span>Danh mục</span>
          <span>${getCategoryLabel(item.cat)}</span>
        </div>
        <div class="option-row">
          <span>Tình trạng</span>
          <span>${item.note || "BHF"}</span>
        </div>
      </div>

      <div class="card-actions">
        <a href="${CONFIG.facebookLink}" target="_blank" rel="noreferrer" class="btn primary">
          Mua ngay
        </a>
      </div>
    </div>
  `;
}

function createFeaturedCard(item) {
  return `
    <div class="feature-card reveal">
      <div class="product-media">
        <img
          class="product-image"
          src="${item.image || ""}"
          alt="${item.title || ""}"
          loading="lazy"
          onload="this.parentElement.classList.add('has-image')"
          onerror="this.style.display='none'; this.parentElement.classList.remove('has-image')"
        >
        <div class="product-fallback">
          <div class="icon-fallback">
            ${ICONS[item.icon] || ""}
          </div>
        </div>
      </div>

      <div class="feature-badge">🔥 HOT • NỔI BẬT</div>

      <h4>${item.title || ""}</h4>
      <p>${item.note || ""}</p>

      <div class="feature-price">
        <strong>${item.priceText || formatPrice(item.price)}</strong>
        <span>giá bán</span>
      </div>

      <div class="feature-options">
        <div class="option-row">
          <span>Danh mục</span>
          <span>${getCategoryLabel(item.cat)}</span>
        </div>
        <div class="option-row">
          <span>Tình trạng</span>
          <span>${item.note || "BHF"}</span>
        </div>
      </div>

      <div class="card-actions">
        <a href="${CONFIG.facebookLink}" target="_blank" rel="noreferrer" class="btn primary">
          Mua ngay
        </a>
      </div>
    </div>
  `;
}

function renderFeatured() {
  if (!featuredGrid) return;

  const featured = PRODUCTS.filter((item) => FEATURED_IDS.includes(item.id));
  featuredGrid.innerHTML = featured.map(createFeaturedCard).join("");

  revealOnScroll();
}

function getFilteredProducts() {
  let list = [...PRODUCTS];

  const keyword = q && q.value ? q.value.trim().toLowerCase() : "";
  const category = cat && cat.value ? cat.value : "all";
  const sortValue = sort && sort.value ? sort.value : "hot";

  if (keyword) {
    list = list.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const note = (item.note || "").toLowerCase();
      const catLabel = getCategoryLabel(item.cat).toLowerCase();
      return (
        title.includes(keyword) ||
        note.includes(keyword) ||
        catLabel.includes(keyword)
      );
    });
  }

  if (category !== "all") {
    list = list.filter((item) => item.cat === category);
  }

  if (sortValue === "price-asc") {
    list.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortValue === "price-desc") {
    list.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortValue === "name") {
    list.sort((a, b) => (a.title || "").localeCompare(b.title || "", "vi"));
  } else {
    list.sort((a, b) => {
      const aFeatured = a.tags && a.tags.includes("featured") ? 1 : 0;
      const bFeatured = b.tags && b.tags.includes("featured") ? 1 : 0;
      const aHot = a.tags && a.tags.includes("hot") ? 1 : 0;
      const bHot = b.tags && b.tags.includes("hot") ? 1 : 0;

      if (bFeatured !== aFeatured) return bFeatured - aFeatured;
      if (bHot !== aHot) return bHot - aHot;
      return (a.price || 0) - (b.price || 0);
    });
  }

  return list;
}

function renderProducts() {
  if (!grid) return;

  const list = getFilteredProducts();

  if (!list.length) {
    if (emptyState) emptyState.classList.remove("hidden");
    grid.innerHTML = "";
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");
  grid.innerHTML = list.map(createProductCard).join("");

  revealOnScroll();
}

let revealObserver;

function revealOnScroll() {
  const els = document.querySelectorAll(".reveal:not(.show)");

  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("show"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
      }
    );
  }

  els.forEach((el) => revealObserver.observe(el));
}

if (q) q.addEventListener("input", renderProducts);
if (cat) cat.addEventListener("change", renderProducts);
if (sort) sort.addEventListener("change", renderProducts);

renderFeatured();
renderProducts();
