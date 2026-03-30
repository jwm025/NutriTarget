
const settingModal = document.querySelector("#settingsModal");

settingModal.addEventListener("click", (e) => {
  if (e.target === settingModal) {
    closeModal("settingsModal");
  }
});

// Save Gemini key when settings change
const openAIKeyInput = document.getElementById("OpenAI-key");

function saveSettings() {
  const key = openAIKeyInput.value.trim();
  if (key) {
    localStorage.setItem("OpenAIApiKey", key);
    console.log("✅ OpenAI key saved");
  }
}

// Call saveSettings whenever the settings modal is closed or changed
// (You can attach it to the mode toggle or add a "Save Settings" button if you want)
