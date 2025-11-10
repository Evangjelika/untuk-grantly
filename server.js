// ===== MIDTRANS BACKEND EXAMPLE (DIPERBARUI UNTUK PROYEK ANDA) =====
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const midtransClient = require("midtrans-client");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("."));
// Handle preflight for all routes (CORS)
app.options("*", cors());

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

// ===== LLM (Gemini) Proxy Endpoint =====
// Menggunakan GEMINI_API_KEY dari .env agar key tidak terekspos di frontend
app.post("/api/llm/gemini", async (req, res) => {
  console.log("[DEBUG] /api/llm/gemini hit with method:", req.method);
  console.log("[DEBUG] Body:", req.body);
  try {
    const {
      message,
      history,
      model = "gemini-2.5-flash",
      systemPrompt,
    } = req.body || {};
    if (!process.env.GEMINI_API_KEY) {
      return res
        .status(500)
        .json({ error: "GEMINI_API_KEY tidak ditemukan di server." });
    }
    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json({ error: "Parameter 'message' wajib diisi (string)." });
    }

    const contents = [];
    if (systemPrompt) {
      contents.push({ role: "user", parts: [{ text: String(systemPrompt) }] });
    }
    if (Array.isArray(history)) {
      history.forEach((m) => {
        contents.push({
          role: m?.role === "user" ? "user" : "model",
          parts: [{ text: String(m?.text || "") }],
        });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const endpoint = `https://generativelanguage.googleapis.com/v1/models/${encodeURIComponent(
      model
    )}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`;

    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });
    

    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      return res.status(r.status).json({
        error: "Gemini request gagal",
        details: errText || r.statusText,
      });
    }

    const json = await r.json();
    const text =
      json?.candidates?.[0]?.content?.parts
        ?.map((p) => p?.text || "")
        .join("\n")
        .trim() ||
      json?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    res.json({ text });
  } catch (e) {
    console.error("Gemini Proxy Error:", e);
    res
      .status(500)
      .json({ error: "Gagal memproses permintaan Gemini", details: e.message });
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
