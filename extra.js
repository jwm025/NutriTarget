const genderSelect = document.querySelector("#gender");
const genderSelectError = document.querySelector(".select-error");
const genderContainer = document.querySelector(".gender-container");
const genderLabel = document.querySelector("#gender-label");

const ageInput = document.querySelector("#age");
const ageError = document.querySelector(".age-error");
const ageContainer = document.querySelector(".age-container");
const ageLabel = document.querySelector("#age-label");

const activityInput = document.querySelector("#activity");
const activityError = document.querySelector(".activity-error");
const activityContainer = document.querySelector(".activity-container");
const activityLabel = document.querySelector("#activity-label");

const goalInput = document.querySelector("#goal-select");
const goalError = document.querySelector(".goal-error");
const goalContainer = document.querySelector(".goal-container");
const goalLabel = document.querySelector("#goal-container");

const calcForm = document.querySelector("#calc-form");

genderSelect.addEventListener("change", () => {
  genderValidation();
});

ageInput.addEventListener("input", () => {
  ageValidation();
});

activityInput.addEventListener("change", () => {
  activityValidation();
});

goalInput.addEventListener("change", () => {
  goalValidation();
});

function genderValidation() {
  if (genderSelect.value === "") {
    genderSelectError.textContent = "Please select your gender.";
    genderContainer.classList.add("error");
    genderSelect.classList.add("error");
    genderLabel.classList.add("error");
    return true;
  } else {
    genderSelectError.textContent = "";
    genderContainer.classList.remove("error");
    genderSelect.classList.remove("error");
    genderLabel.classList.remove("error");
    return false;
  }
}

function ageValidation() {
  console.log(ageInput.validity.valueMissing);
  if (
    ageInput.validity.rangeOverflow ||
    ageInput.validity.rangeUnderflow ||
    ageInput.value === ""
  ) {
    if (checkAgeError()) {
      ageError.textContent = "The range is 18 to 78!";
    } else {
      ageError.textContent = "Missing age!";
    }
    ageContainer.classList.add("error");
    ageInput.classList.add("error");
    ageLabel.classList.add("error");
    return true;
  } else {
    console.log("here");
    ageError.textContent = "";
    ageContainer.classList.remove("error");
    ageInput.classList.remove("error");
    ageLabel.classList.remove("error");
    return false;
  }
}

function activityValidation() {
  if (activityInput.value === "0") {
    activityError.textContent = "Please choose an activity level.";
    activityContainer.classList.add("error");
    activityInput.classList.add("error");
    activityLabel.classList.add("error");
    return true;
  } else {
    if (activityInput.value === "1") {
      activityError.textContent = "Sedentary (little to no exercise)";
    } else if (activityInput.value === "2") {
      activityError.textContent =
        "Lightly active (light exercise 1-3 days/week)";
    } else if (activityInput.value === "3") {
      activityError.textContent =
        "Moderately active (moderate exercise 3-5 days/week)";
    } else {
      activityError.textContent = "Very active (hard exercise 6-7 days/week)";
    }
    activityContainer.classList.remove("error");
    activityInput.classList.remove("error");
    activityLabel.classList.remove("error");
    return false;
  }
}

function goalValidation() {
  if (goalInput.value === "") {
    goalError.textContent = "Please select a goal.";
    goalContainer.classList.add("error");
    goalInput.classList.add("error");
    goalLabel.classList.add("error");
    return true;
  } else {
    goalError.textContent = "";
    goalContainer.classList.remove("error");
    goalInput.classList.remove("error");
    goalLabel.classList.remove("error");
    return false;
  }
}

// EXTENDS FUNCTION
function checkAgeError() {
  if (ageInput.validity.rangeOverflow || ageInput.validity.rangeUnderflow) {
    return true;
  } else if (ageInput.value === "") {
    return false;
  }
}

calcForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const genderValid = genderValidation();
  const ageValid = ageValidation();
  const activityValid = activityValidation();
  const goalValid = goalValidation();

  if (!genderValid || !ageValid || !activityValid || !goalValid) {
    // calculate();
  }
});

// onclick="calculate()";
