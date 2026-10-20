const menuKopi = [
  { id: 1, title: "Espresso", price: 18000, image: "espresso.png" },
  { id: 2, title: "Berrycano", price: 23000, image: "Berrycano.png" },
  { id: 3, title: "Snack", price: 20000, image: "snack.png" },
  { id: 4, title: "Cappuccino", price: 20000, image: "cappuccino.jpg" },
  { id: 5, title: "Americano", price: 20000, image: "americano.jpg" },
  { id: 6, title: "Burger", price: 20000, image: "burger.jpg" }
];

const productsElement = document.getElementById("products");
const statusElement = document.getElementById("status");
const cartItemsElement = document.getElementById("cartItems");
const searchInput = document.getElementById("search");
const checkoutBtn = document.getElementById("checkout");
const totalEl = document.getElementById("total");
const messageEl = document.getElementById("message");

let cart = [];

const rupiah = amount =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);

function renderProducts(items) {
  if (!productsElement) return;
  productsElement.replaceChildren();

  if (items.length === 0) {
    statusElement.textContent = "Produk tidak ditemukan";
    return;
  } else {
    statusElement.textContent = "";
  }

  items.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";

    const card = document.createElement("div");
    card.className = "card p-2 h-100 text-center";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    image.height = 120;
    image.style.objectFit = "contain";

    const title = document.createElement("h5");
    title.className = "mt-2";
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = rupiah(product.price);

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = "1";
    qtyInput.className = "form-control form-control-sm mb-2 w-50 mx-auto";

    const button = document.createElement("button");
    button.textContent = "Tambah ke Keranjang";
    button.className = "btn btn-danger btn-sm";
    
    button.addEventListener("click", () => {
      let qty = parseInt(qtyInput.value);
      if (isNaN(qty) || qty < 1) {
        alert("Jumlah pembelian minimal 1 dan harus angka valid!");
        return;
      }
      addToCart(product.id, qty);
    });

    card.append(image, title, price, qtyInput, button);
    col.append(card);
    productsElement.append(col);
  });
}

function addToCart(productId, qty) {
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }
  renderCart();
}

function renderCart() {
  if (!cartItemsElement) return;
  cartItemsElement.replaceChildren();
  let total = 0;

  if (cart.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-muted";
    li.textContent = "Keranjang masih kosong";
    cartItemsElement.append(li);
    totalEl.textContent = rupiah(0);
    checkoutBtn.disabled = true;
    return;
  }

  cart.forEach(item => {
    const product = menuKopi.find(p => p.id === item.productId);
    if (!product) return;

    let subtotal = product.price * item.qty;
    total += subtotal;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = `${product.title} (${item.qty}x) — ${rupiah(subtotal)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Hapus";
    removeBtn.className = "btn btn-outline-danger btn-sm";
    removeBtn.addEventListener("click", () => {
      cart = cart.filter(c => c.productId !== item.productId);
      renderCart();
    });

    li.append(removeBtn);
    cartItemsElement.append(li);
  });

  totalEl.textContent = rupiah(total);
  checkoutBtn.disabled = false;
}

if (searchInput) {
  searchInput.addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();
    const filtered = menuKopi.filter(p => p.title.toLowerCase().includes(keyword));
    renderProducts(filtered);
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      messageEl.textContent = "Pilih produk dulu bro!";
      return;
    }
    messageEl.textContent = `Pesanan berhasil dibuat! Total yang harus dibayar: ${totalEl.textContent}. Silakan tunggu di meja ya.`;
  });
}

renderProducts(menuKopi);
renderCart();