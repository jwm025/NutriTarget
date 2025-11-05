const savingContainer = document.querySelector(".saving-modal-container");
const slotSelector = document.querySelectorAll(".slot");

savingContainer.addEventListener("click", (e) => {
  if (e.target === savingContainer) {
    savingContainer.style.display = "none";
  }
});

slotSelector.forEach((slot) => {
  slot.addEventListener("click", () => {
    localStorage.setItem(`${slot.id}`, `${slot.id}`);
    console.log(localStorage.getItem(`${slot.id}`));
  });
});
