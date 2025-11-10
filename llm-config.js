// Frontend LLM config (tanpa API key). Key diambil oleh backend (server.js) dari .env
window.GEMINI_CONFIG = {
  backendEndpoint: "http://localhost:3001/api/llm/gemini",
  model: "gemini-2.5-flash",

  systemPrompt:
    "You are a helpful shopping assistant for BraveVerse Beauty (GlowSkin). Answer in Indonesian unless the user uses English. Be concise, friendly, and helpful.",
};
