
const settingModal = document.querySelector("#settingsModal");

settingModal.addEventListener("click", (e) => {
  if (e.target === settingModal) {
    closeModal("settingsModal");
  }
});

// Auto-save OpenAI key when it changes
const openaiKeyInput = document.getElementById("openai-key");
if (openaiKeyInput) {
  openaiKeyInput.addEventListener("change", () => {
    const key = openaiKeyInput.value.trim();
    if (key) {
      localStorage.setItem("openaiApiKey", key);
      console.log("✅ OpenAI API key saved to localStorage");
    }
  });
}
