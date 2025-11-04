// ===== KERANJANG =====
let cart = [];
let totalCheckoutItems = 0; 

// ===== DATA PRODUK PER BRAND =====
const brandProducts = {
  SKIN1004: [
    {
      name: "SKIN1004 Centella Ampoule",
      price: 193000,
      image: "IMG_4689.jpg",
      description: "Pure Madagascar Centella Serum",
      skinTypes: ["kering", "sensitif", "berjerawat"],
    },
    {
      name: "SKIN1004 Madagascar Centella Tone Brightening Cream",
      price: 162000,
      image: "IMG_4694.jpg",
      description: "Boosting Shot Ampoule",
      skinTypes: ["kering", "normal", "kombinasi"],
    },
    {
      name: "SKIN1004 Centella Toner",
      price: 125000,
      image: "IMG_4695.jpg",
      description: "Centella Asiatica Toner",
      skinTypes: ["kering", "sensitif", "berjerawat"],
    },
    {
      name: "SKIN1004 Madagascar Centella Air-Fit Suncream Light",
      price: 152000,
      image: "IMG_4707.jpg",
      description: "Suncream Light SPF30 PA++++",
      skinTypes: ["kering", "normal", "sensitif", "kombinasi"],
    },
  ],
  LANEIGE: [
    {
      name: "LANEIGE Water Sleeping Mask",
      price: 470000,
      image: "IMG_4708.JPG",
      description: "Water Sleeping Mask_EX",
      skinTypes: ["kering", "normal", "kombinasi"],
    },
    {
      name: "LANEIGE Water Bank Blue Hyaluronic Moisture Cream",
      price: 552000,
      image: "IMG_4709.JPG",
      description: "Barier Strengthening Cream",
      skinTypes: ["kering", "normal", "sensitif"],
    },
    {
      name: "LANEIGE Sleeping Mask",
      price: 312000,
      image: "IMG_4710.JPG",
      description: "Water Sleeping Mask",
      skinTypes: ["kering", "normal", "kombinasi"],
    },
    {
      name: "LANEIGE Water Bank UV Barrier Sunscreen SPF 50+ PA++++",
      price: 410000,
      image: "IMG_4711.JPG",
      description: "Berrier-shield sunscreen",
      skinTypes: ["kering", "normal", "berminyak", "kombinasi"],
    },
  ],
  COSRX: [
    {
      name: "COSRX Advanced Snail 92 All in One Cream",
      price: 246750,
      image: "21005-large_default.jpg",
      description:
        "COSRX Advanced Snail 92 All in One Cream from Korea is a Moisturizer enriched with 92% of snail mucin to give skin nourishment",
      skinTypes: ["kering", "sensitif", "berjerawat"],
    },
    {
      name: "COSRX Aloe Soothing Sun Cream SPF 50+ PA+++",
      price: 156000,
      image: "26099-large_default.jpg",
      description: "Sun Cream SPF 50+ PA+++",
      skinTypes: ["berjerawat", "sensitif", "berminyak"],
    },
    {
      name: "COSRX Full Fit Propolis Light Ampoule",
      price: 370000,
      image: "66841548107-1597395513334.avif",
      description: "COSRX Full Fit Propolis Light Ampoule",
      skinTypes: ["kering", "normal", "kombinasi"],
    },
    {
      name: "COSRX AHA/BHA Clarifying Treatment Toner",
      price: 200000,
      image: "35760-large_default.jpg",
      description: "AHA/BHA Clarifying Treatment Toner",
      skinTypes: ["berminyak", "berjerawat", "kombinasi"],
    },
  ],
  "Beauty of Joseon": [
    {
      name: "Beauty of Joseon Ginseng Essence Water",
      price: 250000,
      image: "382a98f5-06ab-45c8-b0ec-fdf88395a7d2-.avif",
      description:
        "Toner ini mengandung bahan utama Ginseng Water yang dapat memberikan kelembapan dan nutrisi hingga ke dalam kulit, agar kelembapan kulit terjaga sepanjang hari",
      skinTypes: ["kering", "normal", "sensitif"],
    },
    {
      name: "Beauty of Joseon Dynasty Cream",
      price: 227679,
      image: "1551fd7f-5dd1-43ba-b013-979be756b04b-.avif",
      description: "Honey Glow Brightening Serum",
      skinTypes: ["kering", "normal", "kombinasi"],
    },
    {
      name: "Beauty of Joseon Revive Eye Cream: Ginseng + Retinal",
      price: 231000,
      image: "6935f3e4-b49a-4bb1-b263-59f96cf2a387-.avif",
      description:
        "Revive Eye Cream dapat merawat kulit di area mata dengan memadukan bahan Ginseng Extract dan Retinal. Ginseng adalah bahan herbal yang kaya akan saponin yang mampu untuk menyamarkan garis-garis halus.",
      skinTypes: ["kering", "normal", "sensitif", "kombinasi"],
    },
    {
      name: "Beauty of Joseon Calming Serum: Green Tea + Panthenol",
      price: 180000,
      image: "311847bc-21cd-4d93-95a1-3b2c5f4324bf-image-0-1719802733370.avif",
      description:
        "Calming Serum : Green Tea + Panthenol diformulasikan untuk Membantu menyejukkan kulit yang teriritasi ringan akibat paparan sinar UV atau faktor eksternal lainnya",
      skinTypes: ["sensitif", "berjerawat", "berminyak"],
    },
  ],
  "ROUND LAB": [
    {
      name: "ROUND LAB Sunscreen",
      price: 135000,
      image: "IMG_4144.jpg",
      description: "Birch Juice Moisturizing Tone-Up Sunscreen",
      skinTypes: ["kering", "normal", "berminyak", "kombinasi"],
    },
    {
      name: "ROUND LAB Toner",
      price: 125000,
      image: "IMG_4144.jpg",
      description: "Birch Juice Moisturizing Toner",
      skinTypes: ["kering", "normal", "sensitif"],
    },
    {
      name: "ROUND LAB Serum",
      price: 145000,
      image: "IMG_4144.jpg",
      description: "Dokdo Serum with Niacinamide",
      skinTypes: ["berminyak", "berjerawat", "kombinasi"],
    },
    {
      name: "ROUND LAB Cleanser",
      price: 115000,
      image: "IMG_4144.jpg",
      description: "1025 Dokdo Cleanser",
      skinTypes: ["berminyak", "berjerawat", "normal"],
    },
  ],
  EMBRYOLISSE: [
    {
      name: "EMBRYOLISSE Sun Stick",
      price: 155000,
      image: "IMG_4158.jpg",
      description: "Sun Stick SPF50+",
      skinTypes: ["kering", "normal", "sensitif", "kombinasi"],
    },
    {
      name: "EMBRYOLISSE Lait-Crème",
      price: 165000,
      image: "IMG_4158.jpg",
      description: "Lait-Crème Concentré Moisturizer",
      skinTypes: ["kering", "normal", "sensitif"],
    },
    {
      name: "EMBRYOLISSE Eye Cream",
      price: 175000,
      image: "IMG_4158.jpg",
      description: "Eye Contour Cream",
      skinTypes: ["kering", "normal", "sensitif", "kombinasi"],
    },
    {
      name: "EMBRYOLISSE Serum",
      price: 185000,
      image: "IMG_4158.jpg",
      description: "Brightening Serum",
      skinTypes: ["kering", "normal", "kombinasi"],
    },
  ],
  "Rice Toner": [
    {
      name: "Rice Toner Pad",
      price: 125000,
      image: "IMG_4157.jpg",
      description: "Wake up with deeply hydrated, dewy skin",
      skinTypes: ["kering", "normal", "sensitif"],
    },
    {
      name: "Rice Toner Essence",
      price: 130000,
      image: "IMG_4157.jpg",
      description: "Rice & Ceramide Moisturizing Toner",
      skinTypes: ["kering", "normal", "sensitif"],
    },
    {
      name: "Rice Cleanser",
      price: 110000,
      image: "IMG_4157.jpg",
      description: "Deep Cleansing Rice Foam Cleanser",
      skinTypes: ["berminyak", "berjerawat", "normal"],
    },
  ],
};

// ===== ALL PRODUCTS ARRAY FOR SEARCH =====
let allProducts = [];

// Function to flatten brand products into searchable array
function initializeAllProducts() {
  allProducts = [];
  Object.keys(brandProducts).forEach((brand) => {
    brandProducts[brand].forEach((product) => {
      allProducts.push({
        ...product,
        brand: brand,
      });
    });
  });
}

// Load total checkout dari localStorage saat halaman dimuat
function loadCheckoutCounter() {
  const saved = localStorage.getItem("totalCheckoutItems");
  if (saved) {
    totalCheckoutItems = parseInt(saved, 10);
    updateCheckoutCounter();
  }
}

// Update counter di tombol Shop Now
function updateCheckoutCounter() {
  const counter = document.getElementById("checkout-counter");
  if (counter) {
    if (totalCheckoutItems > 0) {
      counter.textContent = totalCheckoutItems;
      counter.style.display = "flex";
      counter.classList.add("new-item");
      setTimeout(() => {
        counter.classList.remove("new-item");
      }, 500);
    } else {
      counter.textContent = "";
      counter.style.display = "none";
    }
    localStorage.setItem("totalCheckoutItems", totalCheckoutItems.toString());
  }
}

// Load counter saat halaman dimuat
loadCheckoutCounter();

// ===== MIDTRANS PAYMENT FUNCTIONS =====
function generateOrderId() {
  return "ORDER-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function createMidtransTransaction() {
  const orderId = generateOrderId();
  const total = calculateTotal();
  const customerName = document.getElementById("client-name").value;
  const customerEmail = document.getElementById("client-email").value;
  const customerPhone = document.getElementById("client-phone").value;
  const transactionDetails = {
    order_id: orderId,
    gross_amount: total,
  };
  const customerDetails = {
    first_name: customerName,
    email: customerEmail,
    phone: customerPhone,
  };
  const itemDetails = cart.map((item, index) => ({
    id: `item-${index + 1}`,
    price: item.price,
    quantity: item.quantity,
    name: item.name,
    category: "Skincare",
  }));
  return {
    transaction_details: transactionDetails,
    customer_details: customerDetails,
    item_details: itemDetails,
  };
}

async function processMidtransPayment() {
  try {
    const transactionData = createMidtransTransaction();

    const response = await fetch("http://127.0.0.1:3000/create-transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    console.log("Response Status:", response.status);

    // Cek apakah respons berhasil (status 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Error Response:", errorText);
      console.error("Server Error Status:", response.status);
      // Tampilkan pesan error yang lebih informatif berdasarkan status
      let errorMessage = "Gagal mendapatkan token pembayaran dari server.";
      if (response.status === 405) {
        errorMessage =
          "Endpoint pembayaran tidak ditemukan atau metode tidak diizinkan. Periksa server Anda.";
      } else if (response.status === 404) {
        errorMessage =
          "Endpoint pembayaran tidak ditemukan. Periksa server Anda.";
      } else if (response.status === 500) {
        errorMessage = "Kesalahan internal server. Periksa log server.";
      }

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.details || errorJson.error || errorMessage;
      } catch (e) {
      }
      throw new Error(errorMessage);
    }

    // Parse respons JSON
    const result = await response.json();
    const snap_token = result.token; // Sesuaikan dengan kunci yang dikembalikan server

    // Validasi apakah token ada
    if (!snap_token) {
      throw new Error("Token pembayaran tidak ditemukan dari server.");
    }

    // Tutup popup checkout sebelum membuka Midtrans Snap
    document.getElementById("checkout-popup").style.display = "none";

    // Buka Midtrans popup
    window.snap.pay(snap_token, {
      onSuccess: function (result) {
        console.log("Payment Success:", result);
        // Simpan cart sebelum reset untuk ditampilkan di summary
        const checkoutCart = [...cart];
        resetCart();
        // Tampilkan popup summary
        showCheckoutSummary(checkoutCart);
      },
      onPending: function (result) {
        console.log("Payment Pending:", result);
        alert(
          "Pembayaran sedang diproses. Silakan selesaikan pembayaran Anda. ⏳"
        );
      },
      onError: function (result) {
        console.log("Payment Error:", result);
        alert("Terjadi kesalahan dalam pembayaran. Silakan coba lagi. ❌");
      },
      onClose: function () {
        console.log("Payment popup closed");
        // Opsi: Tampilkan kembali popup checkout jika ditutup sebelum pembayaran
        // document.getElementById('checkout-popup').style.display = 'flex';
      },
    });
  } catch (error) {
    console.error("Payment Error:", error);
    alert(
      "Gagal mendapatkan token pembayaran. Silakan coba lagi. ❌ " +
        error.message
    );
  }
}

function showCheckoutSummary(checkoutCart) {
  const summaryPopup = document.getElementById("checkout-summary-popup");
  const summaryCount = document.getElementById("summary-count");
  const summaryItemsList = document.getElementById("summary-items-list");
  const summaryTotal = document.getElementById("summary-total");

  // Hitung total jumlah barang
  const totalItems = checkoutCart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = checkoutCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update total checkout counter
  totalCheckoutItems += totalItems;
  updateCheckoutCounter();

  // Update count
  summaryCount.textContent = `${totalItems} ${
    totalItems === 1 ? "barang" : "barang"
  }`;

  // Update items list
  summaryItemsList.innerHTML = "";
  checkoutCart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("summary-item");
    itemDiv.innerHTML = `
      <span class="summary-item-name">${item.name}</span>
      <div class="summary-item-details">
        <div>${item.quantity}x Rp ${item.price.toLocaleString()}</div>
        <div><strong>Rp ${(
          item.price * item.quantity
        ).toLocaleString()}</strong></div>
      </div>
    `;
    summaryItemsList.appendChild(itemDiv);
  });

  // Update total
  summaryTotal.textContent = `Rp ${totalPrice.toLocaleString()}`;

  // Tampilkan popup
  summaryPopup.classList.add("active");
}

function closeCheckoutSummary() {
  const summaryPopup = document.getElementById("checkout-summary-popup");
  summaryPopup.classList.remove("active");
}

function resetCart() {
  cart = [];
  updateCart();
  // Popup checkout sudah ditutup di processMidtransPayment
  document.getElementById("client-name").value = "";
  document.getElementById("client-email").value = "";
  document.getElementById("client-phone").value = "";
  document.getElementById("payment-method").value = "";
  document.getElementById("payment-info").style.display = "none";
  document.getElementById("midtrans-payment-btn").style.display = "none";
}

// Fungsi untuk menambah produk ke keranjang
function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

// Tambahkan event listener ke semua tombol Tambahkan ke Keranjang
function initAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      addToCart(name, price);
    });
  });
}

// Jalankan fungsi setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  initAddToCartButtons();
  updateCart(); // Initialize cart counter badge on page load
});

// ===== UPDATE ISI KERANJANG =====
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const cartCountBadge = document.getElementById("cart-item-count");

  cartItems.innerHTML = "";
  let total = 0;
  let totalCartItems = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalCartItems += item.quantity; // Hitung total jumlah item
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <div class="quantity-controls">
        <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
      </div>
      <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
    `;
    cartItems.appendChild(div);
  });

  totalElement.textContent = total.toLocaleString();

  // Update badge cart counter
  if (cartCountBadge) {
    if (totalCartItems > 0) {
      cartCountBadge.textContent = totalCartItems;
      cartCountBadge.style.display = "flex";
      cartCountBadge.classList.add("new-item-added");
      setTimeout(() => {
        cartCountBadge.classList.remove("new-item-added");
      }, 500);
    } else {
      cartCountBadge.textContent = "";
      cartCountBadge.style.display = "none";
    }
  }
}

// ===== TAMBAH / KURANG JUMLAH =====
function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCart();
}

// ===== PANEL KERANJANG =====
const cartPanel = document.getElementById("cart-panel");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");

if (openCartBtn && closeCartBtn) {
  openCartBtn.addEventListener("click", () =>
    cartPanel.classList.add("active")
  );
  closeCartBtn.addEventListener("click", () =>
    cartPanel.classList.remove("active")
  );
}

// ===== CHECKOUT =====
// Checkout - Event listener untuk tombol checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong 💕");
  } else {
    // Tampilkan popup checkout
    document.getElementById("checkout-popup").style.display = "flex";
    // Reset informasi pembayaran
    document.getElementById("payment-info").style.display = "none";
    document.getElementById("midtrans-payment-btn").style.display = "none";
  }
});

// Event listener untuk tombol batal checkout
document.getElementById("cancel-checkout").addEventListener("click", () => {
  document.getElementById("checkout-popup").style.display = "none";
});

// Ketika memilih metode pembayaran
document
  .getElementById("payment-method")
  .addEventListener("change", function () {
    const method = this.value;
    const info = document.getElementById("payment-info");
    const number = document.getElementById("payment-number");
    const total = document.getElementById("payment-total");
    const midtransPayment = document.getElementById("midtrans-payment");
    const midtransBtn = document.getElementById("midtrans-payment-btn");
    const instructions = document.getElementById("payment-instructions");
    const totalPrice = document
      .querySelector(".cart-footer p")
      .innerText.replace("Total: ", "");

    if (method === "") {
      info.style.display = "none";
      midtransBtn.style.display = "none";
      return;
    }

    info.style.display = "block";
    total.textContent = totalPrice;

    // Reset Midtrans elements
    midtransPayment.style.display = "none";
    midtransBtn.style.display = "none";

    // Daftar metode pembayaran Midtrans
    const MIDTRANS_PAYMENT_METHODS = [
      "credit_card",
      "bca_va",
      "bni_va",
      "bri_va",
      "mandiri_va",
      "gopay",
      "shopeepay",
      "dana",
      "linkaja",
      "ovo",
    ];

    if (MIDTRANS_PAYMENT_METHODS.includes(method)) {
      // Tampilkan tombol Midtrans
      midtransBtn.style.display = "block";
      midtransPayment.style.display = "block";
      switch (method) {
        case "credit_card":
          number.textContent =
            "💳 Credit Card - Bayar dengan kartu kredit/debit";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk membuka halaman pembayaran Midtrans";
          break;
        case "bca_va":
          number.textContent = "🏦 BCA Virtual Account";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account BCA";
          break;
        case "bni_va":
          number.textContent = "🏦 BNI Virtual Account";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account BNI";
          break;
        case "bri_va":
          number.textContent = "🏦 BRI Virtual Account";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account BRI";
          break;
        case "mandiri_va":
          number.textContent = "🏦 Mandiri Virtual Account";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account Mandiri";
          break;
        case "gopay":
          number.textContent = "📱 GoPay";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi GoPay";
          break;
        case "shopeepay":
          number.textContent = "🛍 ShopeePay";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi ShopeePay";
          break;
        case "dana":
          number.textContent = "💙 DANA";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi DANA";
          break;
        case "linkaja":
          number.textContent = "🔗 LinkAja";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi LinkAja";
          break;
        case "ovo":
          number.textContent = "🟠 OVO";
          instructions.textContent =
            "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi OVO";
          break;
      }
    } else {
      // Metode pembayaran manual (tidak didukung oleh Midtrans)
      // Misalnya, transfer manual ke BRI/BNI (bukan VA)
      switch (method) {
        case "bri":
          number.textContent = "BRI - 1234 5678 9101 a.n. GlowSkin Store";
          instructions.textContent =
            "Silakan transfer ke rekening di atas dan kirim bukti transfer.";
          break;
        case "bni":
          number.textContent = "BNI - 9876 5432 1098 a.n. GlowSkin Store";
          instructions.textContent =
            "Silakan transfer ke rekening di atas dan kirim bukti transfer.";
          break;
        default:
          number.textContent = "Metode pembayaran manual";
          instructions.textContent =
            "Silakan hubungi admin untuk instruksi lebih lanjut.";
      }
      // Sembunyikan tombol Midtrans untuk metode manual
      midtransBtn.style.display = "none";
      midtransPayment.style.display = "none";
    }
  });

// Event listener untuk tombol Midtrans "Bayar Sekarang"
document.getElementById("pay-button").addEventListener("click", () => {
  const name = document.getElementById("client-name").value.trim();
  const email = document.getElementById("client-email").value.trim();
  const phone = document.getElementById("client-phone").value.trim();
  const method = document.getElementById("payment-method").value;

  if (!name || !email || !phone || !method) {
    alert(
      "Mohon lengkapi semua data (nama, email, telepon, dan metode pembayaran) 💬"
    );
    return;
  }

  // Validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Mohon masukkan email yang valid 📧");
    return;
  }

  // Validasi nomor telepon
  const phoneRegex = /^[0-9]{10,13}$/;
  if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
    alert("Mohon masukkan nomor telepon yang valid (10-13 digit) 📱");
    return;
  }

  // Panggil fungsi pembayaran Midtrans
  processMidtransPayment();
});

// Konfirmasi checkout untuk metode manual (misalnya transfer manual)
document.getElementById("confirm-checkout").addEventListener("click", () => {
  const name = document.getElementById("client-name").value.trim();
  const method = document.getElementById("payment-method").value;

  if (!name || !method) {
    alert("Mohon isi nama dan pilih metode pembayaran 💬");
    return;
  }

  // Daftar metode pembayaran Midtrans
  const MIDTRANS_PAYMENT_METHODS = [
    "credit_card",
    "bca_va",
    "bni_va",
    "bri_va",
    "mandiri_va",
    "gopay",
    "shopeepay",
    "dana",
    "linkaja",
    "ovo",
  ];

  // Jika metode Midtrans dipilih, jangan proses di sini, karena tombol Midtrans akan digunakan
  if (MIDTRANS_PAYMENT_METHODS.includes(method)) {
    alert("Untuk metode pembayaran ini, gunakan tombol 'Bayar Sekarang' 💳");
    return;
  }

  alert(
    `Checkout berhasil! Silakan lakukan pembayaran melalui: ${method}. Simpan bukti transfer Anda.`
  );

  // Simpan cart sebelum reset untuk ditampilkan di summary
  const checkoutCart = [...cart];
  resetCart();
  showCheckoutSummary(checkoutCart);
  document.getElementById("checkout-popup").style.display = "none";
});

// ===== FUNGSI UNTUK MENAMPILKAN PRODUK BRAND =====
function showBrandProducts(brandName) {
  const brandProductsSection = document.getElementById("brand-products");
  const brandProductsTitle = document.getElementById("brand-products-title");
  const brandProductsGrid = document.getElementById("brand-products-grid");

  if (!brandProductsSection || !brandProductsTitle || !brandProductsGrid)
    return;

  // Cek apakah brand ada dalam data
  if (!brandProducts[brandName] || brandProducts[brandName].length === 0) {
    alert(`Maaf, belum ada produk untuk brand ${brandName} saat ini.`);
    return;
  }

  // Update title
  brandProductsTitle.textContent = `🌸 Produk ${brandName}`;

  // Clear grid
  brandProductsGrid.innerHTML = "";

  // Tampilkan produk brand
  brandProducts[brandName].forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-price">Rp ${product.price.toLocaleString(
        "id-ID"
      )}</div>
      <button class="btn-brand add-to-cart" data-name="${
        product.name
      }" data-price="${product.price}">Tambahkan ke Keranjang</button>
    `;
    brandProductsGrid.appendChild(productCard);
  });

  // Tampilkan section
  brandProductsSection.style.display = "block";

  // Scroll ke section
  brandProductsSection.scrollIntoView({ behavior: "smooth", block: "start" });

  // Re-initialize add to cart buttons untuk produk yang baru ditambahkan
  initAddToCartButtons();
}

function closeBrandProducts() {
  const brandProductsSection = document.getElementById("brand-products");
  if (brandProductsSection) {
    brandProductsSection.style.display = "none";
  }
}

// Event listener untuk tombol close summary (setelah DOM ready)
document.addEventListener("DOMContentLoaded", () => {
  const closeSummaryBtn = document.getElementById("close-summary");
  const closeSummaryFooterBtn = document.getElementById("close-summary-btn");
  const summaryPopup = document.getElementById("checkout-summary-popup");

  if (closeSummaryBtn) {
    closeSummaryBtn.addEventListener("click", closeCheckoutSummary);
  }
  if (closeSummaryFooterBtn) {
    closeSummaryFooterBtn.addEventListener("click", closeCheckoutSummary);
  }
  // Close summary ketika klik di luar popup
  if (summaryPopup) {
    summaryPopup.addEventListener("click", function (e) {
      if (e.target === this) {
        closeCheckoutSummary();
      }
    });
  }

  // Event listener untuk brand card click
  const brandCards = document.querySelectorAll(".clickable-brand");
  brandCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".btn-brand")) {
        const brandName = this.getAttribute("data-brand");
        if (brandName) {
          showBrandProducts(brandName);
        }
      }
    });
  });

  // Event listener untuk tombol close brand products
  const closeBrandBtn = document.getElementById("close-brand-products");
  if (closeBrandBtn) {
    closeBrandBtn.addEventListener("click", closeBrandProducts);
  }
});

// ===== CHAT SUPPORT FUNCTIONALITY =====
// Chat responses database
const chatResponses = {
  produk:
    "🌸 Kami memiliki berbagai produk skincare terbaru seperti Hydra Glow Serum, Radiant Night Cream, dan banyak lagi! Kunjungi bagian 'New Arrivals' untuk melihat koleksi terbaru kami. 💖",
  diskon:
    "🎉 Saat ini kami sedang memberikan diskon hingga 35% + free gift untuk pembelian pertama! Jangan lewatkan kesempatan ini untuk mendapatkan produk skincare impian Anda. ✨",
  pengiriman:
    "🚚 Kami mengirim ke seluruh Indonesia dengan berbagai pilihan kurir (JNE, TIKI, POS Indonesia). Pengiriman gratis untuk pembelian di atas Rp 500.000! 📦",
  kontak:
    "📞 Hubungi kami di:\nEmail: support@BraveVerse.com\nInstagram: @BraveVerse.official\nWhatsApp: +62 812-3456-7890\nKami siap membantu Anda 24/7! 💕",
  default:
    "Terima kasih atas pertanyaannya! 💖 Untuk informasi lebih lanjut, silakan hubungi tim support kami di support@BraveVerse.com atau kunjungi halaman Contact. Kami akan dengan senang hati membantu Anda! 🌸",
};

// Chat state
let chatMessages = [];
let isChatOpen = false;

// Initialize chat
function initChat() {
  const chatButton = document.getElementById("chat-button");
  const closeChatBtn = document.getElementById("close-chat");
  const sendMessageBtn = document.getElementById("send-message");
  const chatInput = document.getElementById("chat-input");
  const chatPanel = document.getElementById("chat-panel");
  const quickReplyBtns = document.querySelectorAll(".quick-reply-btn");

  // Toggle chat panel
  chatButton.addEventListener("click", () => {
    isChatOpen = !isChatOpen;
    chatPanel.classList.toggle("active");
    if (isChatOpen) {
      chatInput.focus();
      scrollToBottom();
    }
  });

  // Close chat
  closeChatBtn.addEventListener("click", () => {
    isChatOpen = false;
    chatPanel.classList.remove("active");
  });

  // Send message on button click
  sendMessageBtn.addEventListener("click", sendMessage);

  // Send message on Enter key
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Quick reply buttons
  quickReplyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const replyType = btn.dataset.reply;
      handleQuickReply(replyType);
    });
  });
}

// Send user message
function sendMessage() {
  const chatInput = document.getElementById("chat-input");
  const message = chatInput.value.trim();
  if (message === "") return;

  // Add user message
  addMessage(message, "user");

  // Clear input
  chatInput.value = "";

  // Generate bot response
  setTimeout(() => {
    const response = generateResponse(message);
    addMessage(response, "bot");
  }, 500);
}

// Handle quick reply
function handleQuickReply(replyType) {
  const response = chatResponses[replyType] || chatResponses.default;
  addMessage(response, "bot");
}

// Generate bot response based on user message
function generateResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Check for keywords
  if (
    lowerMessage.includes("produk") ||
    lowerMessage.includes("product") ||
    lowerMessage.includes("item")
  ) {
    return chatResponses.produk;
  } else if (
    lowerMessage.includes("diskon") ||
    lowerMessage.includes("promo") ||
    lowerMessage.includes("sale") ||
    lowerMessage.includes("discount")
  ) {
    return chatResponses.diskon;
  } else if (
    lowerMessage.includes("kirim") ||
    lowerMessage.includes("pengiriman") ||
    lowerMessage.includes("shipping") ||
    lowerMessage.includes("delivery")
  ) {
    return chatResponses.pengiriman;
  } else if (
    lowerMessage.includes("kontak") ||
    lowerMessage.includes("contact") ||
    lowerMessage.includes("hubungi") ||
    lowerMessage.includes("call")
  ) {
    return chatResponses.kontak;
  } else if (
    lowerMessage.includes("halo") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hai") ||
    lowerMessage.includes("hello")
  ) {
    return "Halo! 👋 Selamat datang di BraveVerse Beauty! Ada yang bisa saya bantu hari ini? 💖";
  } else if (
    lowerMessage.includes("terima kasih") ||
    lowerMessage.includes("thanks") ||
    lowerMessage.includes("thank you")
  ) {
    return "Sama-sama! 💕 Jika ada pertanyaan lain, jangan ragu untuk bertanya. Semoga hari Anda menyenangkan! 🌸";
  } else {
    return chatResponses.default;
  }
}

// Add message to chat
function addMessage(content, sender) {
  const chatMessages = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  const messageContent = document.createElement("div");
  messageContent.className = "message-content";

  // Handle multiline messages
  const lines = content.split("\n");
  lines.forEach((line, index) => {
    const p = document.createElement("p");
    p.textContent = line;
    if (index < lines.length - 1) {
      p.style.marginBottom = "8px";
    }
    messageContent.appendChild(p);
  });

  messageDiv.appendChild(messageContent);
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Scroll to bottom of chat
function scrollToBottom() {
  const chatMessages = document.getElementById("chat-messages");
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 100);
}

// ===== SEARCH AND FILTER FUNCTIONALITY =====
function initSearchAndFilter() {
  initializeAllProducts();

  // Get elements safely
  const searchInput = document.getElementById("product-search");
  const skinTypeSelect = document.getElementById("skin-type-select"); // Sesuaikan ID

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  } else {
    console.warn("Element dengan ID 'product-search' tidak ditemukan.");
  }

  if (skinTypeSelect) {
    skinTypeSelect.addEventListener("change", filterProducts);
  } else {
    console.warn("Element dengan ID 'skin-type-select' tidak ditemukan.");
  }
}

// Filter products based on search and skin type
function filterProducts() {
  const searchInput = document.getElementById("product-search");
  const skinTypeSelect = document.getElementById("skin-type-select");

  if (!searchInput || !skinTypeSelect) {
    console.error("Element untuk filter tidak ditemukan.");
    return;
  }

  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedSkinType = skinTypeSelect.value;

  // Get all product cards
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    const productDesc = card.querySelector("p").textContent.toLowerCase();
    const brandName =
      card
        .closest(".products")
        ?.querySelector("h2")
        ?.textContent.toLowerCase() || "";

    // Find the product data to check skin types
    const productData = findProductData(productName, brandName);

    // Check search term match
    const matchesSearch =
      searchTerm === "" ||
      productName.includes(searchTerm) ||
      productDesc.includes(searchTerm) ||
      brandName.includes(searchTerm);

    // Check skin type match
    const matchesSkinType =
      selectedSkinType === "" ||
      (productData &&
        productData.skinTypes &&
        productData.skinTypes.includes(selectedSkinType)); 

    // Show/hide card based on filters
    if (matchesSearch && matchesSkinType) {
      card.style.display = "block";
      card.style.animation = "fadeInUp 0.5s ease-out";
    } else {
      card.style.display = "none";
    }
  });

  // Update results count
  updateResultsCount();
}

// Find product data by name and brand
function findProductData(productName, brandName) {
  // Search in allProducts array
  return allProducts.find(
    (product) =>
      product.name.toLowerCase().includes(productName) ||
      productName.includes(
        product.name.toLowerCase().split(" ").slice(-2).join(" ")
      ) // Match last few words
  );
}

// Update results count display
function updateResultsCount() {
  const visibleCards = document.querySelectorAll(
    '.product-card[style*="display: block"]'
  );
  const totalCards = document.querySelectorAll(".product-card");

  // You can add a results counter element if needed
  console.log(
    `Showing ${visibleCards.length} of ${totalCards.length} products.`
  );
}

// Clear filters
function clearFilters() {
  const searchInput = document.getElementById("product-search");
  const skinTypeSelect = document.getElementById("skin-type-select");

  if (searchInput) {
    searchInput.value = "";
  }
  if (skinTypeSelect) {
    skinTypeSelect.value = "";
  }
  filterProducts();
}

// Initialize chat when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initChat();
  initSearchAndFilter();
});
