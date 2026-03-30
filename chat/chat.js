console.log("✅ chat/chat.js loaded (OpenAI version)");

let chatHistory = [];

const SYSTEM_PROMPT = `You are NutriCoach, a friendly, encouraging, and practical nutrition coach for the NutriTarget app.
The user has already calculated their daily calorie and macro targets.
Always reference their exact numbers and goal in a helpful way.
Suggest realistic meal swaps or adjustments that still fit their calories and macros.
Be positive, concise, and conversational. Never give medical advice.`;

async function getOpenAIKey() {
  return localStorage.getItem("openaiApiKey") || "";
}

async function saveOpenAIKey(key) {
  if (key && key.startsWith("sk-")) {
    localStorage.setItem("openaiApiKey", key);
    console.log("✅ OpenAI key saved");
    return true;
  }
  return false;
}

async function getBotResponse(userText) {
  const ctx = window.nutriContext;
  let apiKey = await getOpenAIKey();

  // If no key, fall back to rule-based responses
  if (!apiKey) {
    return fallbackRuleBased(userText, ctx);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",           // cheap & fast (recommended)
        // model: "gpt-4o" if you want higher quality
        temperature: 0.7,
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `
User's nutrition plan:
- Daily calories: ${ctx.calories}
- Protein: ${ctx.macros.protein}g
- Carbs: ${ctx.macros.carbs}g
- Fat: ${ctx.macros.fat}g
- Goal: ${ctx.goal}

User question: ${userText}
          ` }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error("OpenAI error:", error);
    return `Sorry, I couldn't connect to OpenAI right now (${error.message}). I'll use my basic mode instead. Try pasting your OpenAI key in Settings.`;
  }
}

// Simple fallback when no key is provided
function fallbackRuleBased(userText, ctx) {
  const lower = userText.toLowerCase();
  if (lower.includes("explain") && lower.includes("calorie")) {
    return `Your recommended ${ctx.calories} calories are calculated from your BMR × activity level + your ${ctx.goal} goal adjustment.`;
  }
  if (lower.includes("regenerate") || lower.includes("new plan")) {
    regenerateMeal();
    return "✅ Meal plan regenerated on the main screen! What else can I help with?";
  }
  if (lower.includes("high protein")) {
    return `I can help make a higher-protein version. Your current protein target is ${ctx.macros.protein}g. Say "regenerate high protein" next time.`;
  }
  return `Got it! You're targeting ${ctx.calories} calories (${ctx.macros.protein}g protein, ${ctx.macros.carbs}g carbs, ${ctx.macros.fat}g fat) with a ${ctx.goal} goal. What would you like to adjust or learn more about?`;
}

// ==================== UI Functions (unchanged from before) ====================
function toggleChat() {
  if (!window.nutriContext) {
    alert("Please calculate your nutrition plan first!");
    return;
  }
  const modal = document.getElementById("chat-modal");
  modal.style.display = "flex";
  renderChat();
}

function closeChat() {
  document.getElementById("chat-modal").style.display = "none";
}

function renderChat() {
  const container = document.getElementById("chat-messages");
  container.innerHTML = chatHistory.map(msg => `
    <div class="message ${msg.type}-message">${msg.text}</div>
  `).join("");
  container.scrollTop = container.scrollHeight;
}

function addMessage(text, type) {
  chatHistory.push({ text, type });
  renderChat();
}

async function handleChatSubmit() {
  const input = document.getElementById("chat-input");
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  // Show thinking indicator (optional)
  const thinkingId = "thinking-" + Date.now();
  addMessage("...", "bot"); // temporary

  const response = await getBotResponse(userText);

  // Replace thinking message
  chatHistory.pop();
  addMessage(response, "bot");
}

// Make functions available globally
window.toggleChat = toggleChat;
window.closeChat = closeChat;
window.handleChatSubmit = handleChatSubmit;
