const settingModal = document.querySelector("#settingsModal");

settingModal.addEventListener("click", (e) => {
  if (e.target === settingModal) {
    closeModal("settingsModal");
  }
});
