// ===== MIDTRANS BACKEND EXAMPLE (DIPERBARUI UNTUK PROYEK ANDA) =====
require("dotenv").config(); // 💡 Tambahkan ini
console.log("🔍 DEBUG: MIDTRANS_SERVER_KEY =", process.env.MIDTRANS_SERVER_KEY);
console.log("🔍 DEBUG: MIDTRANS_CLIENT_KEY =", process.env.MIDTRANS_CLIENT_KEY);

const express = require("express");
const cors = require("cors");
const midtransClient = require("midtrans-client");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(".")); 


// Midtrans Configuration
const snap = new midtransClient.Snap({
  isProduction: false, 
  serverKey: process.env.MIDTRANS_SERVER_KEY, 
  clientKey: process.env.MIDTRANS_CLIENT_KEY, 
});

// Endpoint untuk mendapatkan snap token — SESUAI DENGAN FRONTEND ANDA
app.post("/create-transaction", async (req, res) => {
  try {
    const { transaction_details, customer_details, item_details } = req.body;
    if (!transaction_details?.order_id || !transaction_details?.gross_amount) {
      return res.status(400).json({
        error: "transaction_details (order_id dan gross_amount) wajib diisi.",
      });
    }

    // Siapkan parameter untuk Midtrans
    const parameter = {
      transaction_details,
      customer_details: customer_details || {
        first_name: "Guest",
        email: "guest@example.com",
      },
      item_details: item_details || [
        {
          id: "1",
          price: transaction_details.gross_amount,
          quantity: 1,
          name: "Item default",
        },
      ],
    };

    const snapResponse = await snap.createTransaction(parameter);
    res.json({
      token: snapResponse.token,
    });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({
      error: "Gagal membuat token pembayaran",
      details: error.message,
    });
  }
});


// Webhook (opsional, tetapi disarankan)
app.post("/notification-handler", (req, res) => {
  const notification = req.body;
  console.log("Notifikasi dari Midtrans:", notification);
  res.status(200).json({ status: "OK" });
});

// Jalankan server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
  console.log(
    `Pastikan MIDTRANS_SERVER_KEY dan MIDTRANS_CLIENT_KEY ada di .env`
  );
});
