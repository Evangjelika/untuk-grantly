// Minimal Express server untuk membuat Midtrans Snap token
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;

if (!MIDTRANS_SERVER_KEY) {
  console.warn(
    "WARN: MIDTRANS_SERVER_KEY belum di-set. Isi file .env sebelum menjalankan."
  );
}

app.post("/create-transaction", async (req, res) => {
  try {
    const { transaction_details, customer_details, item_details } = req.body;

    if (
      !transaction_details ||
      !transaction_details.order_id ||
      !transaction_details.gross_amount
    ) {
      return res.status(400).json({
        error: "transaction_details (order_id, gross_amount) wajib disertakan.",
      });
    }

    const payload = {
      transaction_details: transaction_details,
      customer_details: customer_details,
      item_details: item_details, 
    };

    const auth = Buffer.from((MIDTRANS_SERVER_KEY || "") + ":").toString(
      "base64"
    );
    const midtransRes = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
      }
    );

    // Kirim kembali token snap ke frontend
    return res.json({ token: midtransRes.data.token, data: midtransRes.data });
  } catch (err) {
    console.error(
      "Error creating transaction:",
      err.response?.data || err.message
    );
    return res.status(500).json({
      error: "Gagal membuat transaksi",
      details: err.response?.data || err.message,
    });
  }
});

// Endpoint untuk mengecek status transaksi (opsional, untuk keperluan internal Anda)
app.get("/check-status/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID wajib disertakan." });
    }

    const auth = Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64");

    const statusRes = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
      }
    );

    return res.json(statusRes.data);
  } catch (err) {
    console.error("Error checking status:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Gagal mengecek status",
      details: err.response?.data || err.message,
    });
  }
});

// Endpoint untuk menerima notifikasi pembayaran dari Midtrans (WEBHOOK)
app.post("/notification-handler", async (req, res) => {
  const notificationJson = req.body;

  const orderId = notificationJson.order_id;
  const transactionStatus = notificationJson.transaction_status;
  const fraudStatus = notificationJson.fraud_status;

  console.log(
    `Notification received for order ${orderId}. Status: ${transactionStatus}, Fraud: ${fraudStatus}`
  );

  if (transactionStatus === "settlement" && fraudStatus === "accept") {
    console.log(`Pembayaran untuk order ${orderId} berhasil.`);

  } else if (
    transactionStatus === "cancel" ||
    transactionStatus === "expire" ||
    transactionStatus === "failure"
  ) {
    console.log(`Pembayaran untuk order ${orderId} gagal atau dibatalkan.`);
  } else if (transactionStatus === "pending") {
    console.log(`Pembayaran untuk order ${orderId} sedang menunggu.`);
  }
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server berjalan di http://0.0.0.0:${PORT}`)
);
