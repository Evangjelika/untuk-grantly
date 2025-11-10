// Minimal Gemini client to plug into the existing chat widget
(function () {
  if (!window.GEMINI_CONFIG || !window.GEMINI_CONFIG.backendEndpoint) {
    console.warn(
      "[LLM] GEMINI_CONFIG.backendEndpoint is not set. Falling back to local responses."
    );
    return;
  }

  const { backendEndpoint, model, systemPrompt } = window.GEMINI_CONFIG;

  async function callGeminiViaBackend(userText, chatHistory) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 detik timeout

    try {
      const res = await fetch(backendEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: chatHistory || null,
          model: model || "gemini-2.5-flash",
          systemPrompt: systemPrompt || "",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(
          `Gemini backend error ${res.status}: ${errText || res.statusText}`
        );
      }

      const json = await res.json();
      const text =
        String(json?.text || "").trim() ||
        "Maaf, saya tidak mendapatkan balasan. Coba lagi ya 💬";
      return text;
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  }

  let chatHistory = [];

  window.requestLLMResponse = async function (message, onResult) {
    try {
      const reply = await callGeminiViaBackend(message, chatHistory);
      chatHistory.push({ role: "user", text: message });
      chatHistory.push({ role: "model", text: reply });
      onResult(reply);
    } catch (err) {
      console.error("[LLM] Gemini backend request failed:", err);
      onResult(
        "Maaf, terjadi kendala koneksi ke AI. Coba lagi sebentar ya. ❌"
      );
    }
  };
})();
