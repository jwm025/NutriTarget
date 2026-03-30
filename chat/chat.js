console.log("✅ chat/chat.js loaded successfully");
let chatHistory = [];

function toggleChat() {
  console.log("toggleChat called - nutriContext:", !!window.nutriContext);
  if (!window.nutriContext) {
    alert("Please calculate your nutrition plan first!");
    return;
  }
  const modal = document.getElementById("chat-modal");
  if (!modal) {
    alert("Chat modal not found in HTML!");
    return;
  }
  modal.style.display = "flex";
  renderChat();
}

function closeChat() {
  const modal = document.getElementById("chat-modal");
  modal.style.display = "none";
  chatHistory = []; // optional: clear on close
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

function handleChatSubmit() {
  const input = document.getElementById("chat-input");
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  // Small delay so user sees their message first
  setTimeout(() => {
    const response = getBotResponse(userText.toLowerCase());
    addMessage(response, "bot");
  }, 400);
}

// RULE-BASED RESPONSES
function getBotResponse(text) {
  const ctx = window.nutriContext;

  if (text.includes("explain") && text.includes("calorie")) {
    return `Your recommended daily calories (${ctx.calories}) come from the Mifflin-St Jeor formula: BMR × activity multiplier + your goal adjustment (${ctx.goal === "lose" ? "-500" : ctx.goal === "gain" ? "+500" : "0"}). Want me to show the exact math?`;
  }

  if (text.includes("regenerate") || text.includes("new plan")) {
    regenerateMeal(); // reuses existing function
    return "✅ Meal plan regenerated! Check the main window. Want me to tweak anything?";
  }

  if (text.includes("high protein") || text.includes("more protein")) {
    return `Got it! Your current macros are Protein: ${ctx.macros.protein}g / Carbs: ${ctx.macros.carbs}g / Fat: ${ctx.macros.fat}g. I can regenerate a higher-protein version next time — just say "regenerate high protein".`;
  }

  if (text.includes("vegetarian") || text.includes("veggie")) {
    return "I can suggest vegetarian swaps! Try saying: 'vegetarian lunch' or 'regenerate vegetarian plan'.";
  }

  if (text.includes("why") && text.includes("macro")) {
    return `You’re on a 30% protein / 40% carbs / 30% fat split — the most balanced for most people. This gives you ${ctx.macros.protein}g protein to support muscle, etc.`;
  }

  // Default friendly response
  return `Understood! Your current target is ${ctx.calories} calories with ${ctx.macros.protein}g protein. What would you like to adjust? (Try: "regenerate", "explain calories", "high protein")`;
}

// Make functions available globally
window.toggleChat = toggleChat;
window.closeChat = closeChat;
window.handleChatSubmit = handleChatSubmit;
