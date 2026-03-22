document.documentElement.classList.add("js");

const grid = document.getElementById("productGrid");
const featuredGrid = document.getElementById("featuredGrid");
const q = document.getElementById("q");
const cat = document.getElementById("cat");
const sort = document.getElementById("sort");
const emptyState = document.getElementById("emptyState");

const formatPrice = (p) =>
  p.toLocaleString("vi-VN") + " VNĐ";

function createProductCard(item) {
  return `
    <div class="product-card reveal">
      
      <div class="product-media">
        <img 
          class="product-image" 
          src="${item.image}" 
          alt="${item.title}"
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

      <div class="card-badge">${item.cat}</div>

      <h4>${item.title}</h4>
      <p>${item.note || ""}</p>

      <div class="product-price">
        <strong>${item.priceText || formatPrice(item.price)}</strong>
        <span>giá bán</span>
      </div>

      <div class="card-meta">
        <div class="option-row">
          <span>Danh mục</span>
          <span>${item.cat}</span>
        </div>
        <div class="option-row">
          <span>Tình trạng</span>
          <span>${item.note}</span>
        </div>
      </div>

      <div class="card-actions">
        <a href="${CONFIG.facebookLink}" target="_blank" class="btn primary">Mua ngay</a>
      </div>

    </div>
  `;
}

function renderFeatured() {
  if (!featuredGrid) return;

  const featured = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));
  featuredGrid.innerHTML = featured.map(createProductCard).join("");
}

function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (q.value.trim()) {
    const keyword = q.value.toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(keyword));
  }

  if (cat.value !== "all") {
    list = list.filter(p => p.cat === cat.value);
  }

  if (sort.value === "price-asc") list.sort((a,b)=>a.price-b.price);
  if (sort.value === "price-desc") list.sort((a,b)=>b.price-a.price);
  if (sort.value === "name") list.sort((a,b)=>a.title.localeCompare(b.title));

  return list;
}

function renderProducts() {
  const list = getFilteredProducts();

  if (!list.length) {
    emptyState.classList.remove("hidden");
    grid.innerHTML = "";
    return;
  }

  emptyState.classList.add("hidden");
  grid.innerHTML = list.map(createProductCard).join("");

  revealOnScroll();
}

function revealOnScroll() {
  const els = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

q.addEventListener("input", renderProducts);
cat.addEventListener("change", renderProducts);
sort.addEventListener("change", renderProducts);

renderFeatured();
renderProducts();
