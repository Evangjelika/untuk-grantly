// Minimal Express server untuk membuat Midtrans Snap token
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serve index.html, css, js

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
if (!MIDTRANS_SERVER_KEY) {
  console.warn('WARN: MIDTRANS_SERVER_KEY belum di-set. Isi file .env sebelum menjalankan.');
}

app.post('/create-transaction', async (req, res) => {
  try {
    const { order_id, gross_amount, items } = req.body;

    const payload = {
      transaction_details: { order_id, gross_amount },
      item_details: items
    };

    const auth = Buffer.from((MIDTRANS_SERVER_KEY || '') + ':').toString('base64');
    const midtransRes = await axios.post(
      'https://app.sandbox.midtrans.com/snap/v1/transactions',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + auth
        }
      }
    );

    return res.json({ token: midtransRes.data.token, data: midtransRes.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: 'Gagal membuat transaksi', details: err.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 3000;
// ...existing code...

// Tambahkan sebelum app.listen
app.get('/check-status/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const auth = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');
    
    const statusRes = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + auth
        }
      }
    );

    return res.json(statusRes.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: 'Gagal mengecek status' });
  }
});

// ...existing code...
app.listen(PORT, '0.0.0.0', () => console.log(`Server berjalan di http://0.0.0.0:${PORT}`));
