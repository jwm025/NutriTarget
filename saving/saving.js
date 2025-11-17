const savingContainer = document.querySelector(".saving-modal-container");
const recallContainer = document.querySelector(".recall-modal-container");
const slotSelector = document.querySelectorAll(".slot-save");
const slotRecall = document.querySelectorAll(".slot-recall");

const recallOutputContainer = document.querySelector(
  "#recall-output-container"
);

const savingBtn = document.querySelector("#saving-btn");
const recallBtn = document.querySelector("#recalls-button");

const removeBtn = document.querySelectorAll(".remove-btn");

// EACH ITEMS
const dailyCal = document.querySelector("#calories");
const macroProtein = document.querySelector("#protein");
const macroCarbs = document.querySelector("#carbs");
const macroFat = document.querySelector("#fat");
const mealPlan = document.querySelector("#mealPlan");

// EACH ITEMS OUTPUT
const recallCal = document.querySelector("#recall-calories");
const recallPro = document.querySelector("#recall-protein");
const recallCarbs = document.querySelector("#recall-carbs");
const recallFat = document.querySelector("#recall-fat");
const recallMeal = document.querySelector("#recall-mealPlan");

savingContainer.addEventListener("click", (e) => {
  if (e.target === savingContainer) {
    savingContainer.style.display = "none";
  }
});

recallContainer.addEventListener("click", (e) => {
  if (e.target === recallContainer) {
    recallContainer.style.display = "none";
  }
});

recallOutputContainer.addEventListener("click", (e) => {
  if (e.target === recallOutputContainer) {
    recallOutputContainer.style.display = "none";
  }
});

slotSelector.forEach((slot) => {
  slot.addEventListener("click", () => {
    const meals = mealPlan.querySelectorAll("p");
    const saveData = {
      dailyCal: dailyCal.textContent,
      macroProtein: macroProtein.textContent,
      macroCarbs: macroCarbs.textContent,
      macroFat: macroFat.textContent,
      breakfast: meals[0].textContent,
      lunch: meals[1].textContent,
      dinner: meals[2].textContent,
      snack: meals[3].textContent,
    };
    localStorage.setItem(slot.id, JSON.stringify(saveData));
    slot.textContent = dailyCal.textContent;
  });
});

removeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const number = btn.dataset.number; // "1", "2", or "3"
    const slotKey = `slot-${number}`;
    console.log(slotKey);

    if (localStorage.getItem(slotKey)) {
      localStorage.removeItem(slotKey);
      alert(`Removed ${slotKey} from localStorage`);
    } else {
      alert(`${slotKey} not found in localStorage`);
    }

    slotRecall?.forEach((slot) => {
      if (slot.id === slotKey) slot.textContent = "";
    });
  });
});

slotRecall.forEach((slot) => {
  slot.addEventListener("click", () => {
    if (localStorage.getItem(slot.id)) {
      const storedData = JSON.parse(localStorage.getItem(slot.id));
      recallOutputContainer.style.display = "flex";
      recallCal.textContent = storedData.dailyCal;
      recallPro.textContent = storedData.macroProtein;
      recallCarbs.textContent = storedData.macroCarbs;
      recallFat.textContent = storedData.macroFat;
      recallMeal.innerHTML = `
      <p>${storedData.breakfast}</p>
      <p>${storedData.lunch}</p>
      <p>${storedData.dinner}</p>
      <p>${storedData.snack}</p>
    `;
      recallContainer.style.display = "none";
    } else {
      alert("No set to recall!");
    }
  });
});

savingBtn.addEventListener("click", () => {
  savingContainer.style.display = "flex";
  slotSelector.forEach((slot) => {
    if (localStorage.getItem(slot.id)) {
      slot.textContent = JSON.parse(localStorage.getItem(slot.id)).dailyCal;
    } else {
      slot.textContent = "";
    }
  });
});

recallBtn.addEventListener("click", () => {
  recallContainer.style.display = "flex";
  slotRecall.forEach((slot) => {
    if (localStorage.getItem(slot.id)) {
      slot.textContent = JSON.parse(localStorage.getItem(slot.id)).dailyCal;
    }
  });
});
