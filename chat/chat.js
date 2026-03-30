console.log("✅ chat/chat.js loaded (LLM-ready)");

let chatHistory = [];
let isUsingLLM = false;

const SYSTEM_PROMPT = `You are NutriCoach, a friendly, encouraging nutrition coach for NutriTarget.
The user has already calculated their plan. Always reference their exact calories, macros, and goal.
Be helpful, positive, and concise. Suggest realistic food swaps that still hit their macros.
Never give medical advice.`;

async function getGeminiKey() {
  return localStorage.getItem("geminiApiKey") || "";
}

async function getBotResponse(userText) {
  const ctx = window.nutriContext;
  const apiKey = await getGeminiKey();

  // If user has a key → use real LLM
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${SYSTEM_PROMPT}\n\nUser data:\n- Daily calories: ${ctx.calories}\n- Protein: ${ctx.macros.protein}g\n- Carbs: ${ctx.macros.carbs}g\n- Fat: ${ctx.macros.fat}g\n- Goal: ${ctx.goal}\n\nUser question: ${userText}`
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response right now.";
    } catch (e) {
      console.warn("LLM failed, falling back to rules", e);
    }
  }

  // Fallback to old rule-based (works even without key)
  if (userText.includes("explain") && userText.includes("calorie")) {
    return `Your ${ctx.calories} calories come from BMR × activity + your ${ctx.goal} goal adjustment. Want the exact math?`;
  }
  if (userText.includes("regenerate") || userText.includes("new plan")) {
    regenerateMeal();
    return "✅ Meal plan regenerated! Check the main screen. Anything else?";
  }
  if (userText.includes("high protein")) {
    return `Got it — I can make your next plan higher in protein (${ctx.macros.protein}g target). Just say "regenerate high protein".`;
  }
  return `Understood! Your target is ${ctx.calories} cal with ${ctx.macros.protein}g protein. What would you like to tweak? (Try: regenerate, explain calories, high protein, vegetarian lunch)`;
}

// Keep the rest of your existing functions (toggleChat, renderChat, etc.) unchanged
function toggleChat() {
  console.log("toggleChat called");
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

  setTimeout(async () => {
    const response = await getBotResponse(userText);
    addMessage(response, "bot");
  }, 300);
}

// Make functions global
window.toggleChat = toggleChat;
window.closeChat = closeChat;
window.handleChatSubmit = handleChatSubmit;
