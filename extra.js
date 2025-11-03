const genderSelect = document.querySelector("#gender");
const genderSelectError = document.querySelector(".select-error");
const genderContainer = document.querySelector(".gender-container");
const genderLabel = document.querySelector("#gender-label");

const ageInput = document.querySelector("#age");
const ageError = document.querySelector(".age-error");
const ageContainer = document.querySelector(".age-container");
const ageLabel = document.querySelector("#age-label");

// IMPERIAL
const feetInput = document.querySelector("#ft");
const inchInput = document.querySelector("#in");
const feetLabel = document.querySelector("#feet-label");
const inchLabel = document.querySelector("#in-label");
const heightErrorImperial = document.querySelector(".height-error-imperial");
const heightImperialContainer = document.querySelector(
  ".height-imperial-container"
);

const weightImperialContainer = document.querySelector(
  ".weight-imperial-container"
);
const lbLabel = document.querySelector("#lb-label");
const lbInput = document.querySelector("#lb");
const weightErrorImperial = document.querySelector(".weight-error-imperial");

// METRIC
const cmInput = document.querySelector("#height");
const cmLabel = document.querySelector("#height-label");
const heightMetricContainer = document.querySelector(
  ".height-metric-container"
);
const heightErrorMetric = document.querySelector(".height-error-metric");

const kgInput = document.querySelector("#weight");
const kgLabel = document.querySelector("#kg-label");
const weightMetricContainer = document.querySelector(
  ".weight-metric-container"
);
const weightErrorMetric = document.querySelector(".weight-error-metric");

const activityInput = document.querySelector("#activity");
const activityError = document.querySelector(".activity-error");
const activityContainer = document.querySelector(".activity-container");
const activityLabel = document.querySelector("#activity-label");

const goalInput = document.querySelector("#goal-select");
const goalError = document.querySelector(".goal-error");
const goalContainer = document.querySelector(".goal-container");
const goalLabel = document.querySelector("#goal-container");

const calcForm = document.querySelector("#calc-form");
const acceptBtn = document.querySelector(".accept-disclaimer-btn");

acceptBtn.addEventListener("click", () => {
  acceptDisclaimer();
});

genderSelect.addEventListener("change", () => {
  genderValidation();
});

ageInput.addEventListener("input", () => {
  ageValidation();
});

feetInput.addEventListener("input", () => {
  heightImperialValidation();
});

inchInput.addEventListener("input", () => {
  heightImperialValidation();
});

lbInput.addEventListener("input", () => {
  weightImperialValidation();
});

cmInput.addEventListener("input", () => {
  heightMetricValidation();
});

kgInput.addEventListener("input", () => {
  weightMetricValidation();
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
  if (
    ageInput.validity.rangeOverflow ||
    ageInput.validity.rangeUnderflow ||
    ageInput.value === ""
  ) {
    if (checkAgeError()) {
      ageError.textContent = "The range is 18 to 78!";
    } else {
      ageError.textContent = "Missing age.";
    }
    ageContainer.classList.add("error");
    ageInput.classList.add("error");
    ageLabel.classList.add("error");
    return true;
  } else {
    ageError.textContent = "";
    ageContainer.classList.remove("error");
    ageInput.classList.remove("error");
    ageLabel.classList.remove("error");
    return false;
  }
}

function heightImperialValidation() {
  if (
    feetInput.value === "" ||
    inchInput.value === null ||
    feetInput.validity.rangeOverflow ||
    inchInput.validity.rangeOverflow ||
    feetInput.validity.rangeUnderflow ||
    inchInput.validity.rangeUnderflow
  ) {
    if (checkHeightImperialError()) {
      heightErrorImperial.textContent =
        "Height range (ft): 3-8, Inch range: 0-11.";
    } else {
      heightErrorImperial.textContent = "Missing height.";
    }
    heightImperialContainer.classList.add("error");
    feetInput.classList.add("error");
    feetLabel.classList.add("error");
    inchInput.classList.add("error");
    inchLabel.classList.add("error");
    return true;
  } else {
    heightErrorImperial.textContent = "";
    heightImperialContainer.classList.remove("error");
    feetInput.classList.remove("error");
    feetLabel.classList.remove("error");
    inchInput.classList.remove("error");
    inchLabel.classList.remove("error");
    return false;
  }
}

function weightImperialValidation() {
  if (
    lbInput.validity.rangeOverflow ||
    lbInput.validity.rangeUnderflow ||
    lbInput.value === ""
  ) {
    if (checkWeightImperialError()) {
      weightErrorImperial.textContent = "Weight range (lb): 50-500";
    } else {
      weightErrorImperial.textContent = "Missing weight.";
    }
    weightImperialContainer.classList.add("error");
    lbInput.classList.add("error");
    lbLabel.classList.add("error");
    return true;
  } else {
    weightErrorImperial.textContent = "";
    weightImperialContainer.classList.remove("error");
    lbInput.classList.remove("error");
    lbLabel.classList.remove("error");
    return false;
  }
}

function heightMetricValidation() {
  if (
    cmInput.value === "" ||
    cmInput.validity.rangeOverflow ||
    cmInput.validity.rangeUnderflow
  ) {
    if (checkHeightMetricError()) {
      heightErrorMetric.textContent = "Height range (cm): 90-250";
    } else {
      heightErrorMetric.textContent = "Missing height.";
    }
    heightMetricContainer.classList.add("error");
    cmInput.classList.add("error");
    cmLabel.classList.add("error");
    return true;
  } else {
    heightErrorMetric.textContent = "";
    heightMetricContainer.classList.remove("error");
    cmInput.classList.remove("error");
    cmLabel.classList.remove("error");
    return false;
  }
}

function weightMetricValidation() {
  if (
    kgInput.validity.rangeOverflow ||
    kgInput.validity.rangeUnderflow ||
    kgInput.value === ""
  ) {
    if (checkWeightMetricError()) {
      weightErrorMetric.textContent = "Weight range (kg): 20-250";
    } else {
      weightErrorMetric.textContent = "Missing weight.";
    }
    weightMetricContainer.classList.add("error");
    kgInput.classList.add("error");
    kgLabel.classList.add("error");
    return true;
  } else {
    weightErrorMetric.textContent = "";
    weightMetricContainer.classList.remove("error");
    kgInput.classList.remove("error");
    kgLabel.classList.remove("error");
    return false;
  }
}

function activityValidation() {
  if (activityInput.value === "0") {
    activityError.textContent = "Please choose an activity level.";
    activityContainer.classList.add("error");
    activityInput.classList.add("error");
    activityLabel.classList.add("error");
    activityError.classList.add("error");
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
    activityError.classList.remove("error");
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

function checkHeightImperialError() {
  if (
    feetInput.validity.rangeOverflow ||
    inchInput.validity.rangeOverflow ||
    feetInput.validity.rangeUnderflow ||
    inchInput.validity.rangeUnderflow
  ) {
    return true;
  } else if (inchInput.value === "" || feetInput.value === "") {
    return false;
  }
}

function checkWeightImperialError() {
  if (lbInput.validity.rangeOverflow || lbInput.validity.rangeUnderflow) {
    return true;
  } else if (lbInput.value === "") {
    return false;
  }
}

function checkHeightMetricError() {
  if (cmInput.validity.rangeOverflow || cmInput.validity.rangeUnderflow) {
    return true;
  } else if (cmInput.value === "" || cmInput.value === "") {
    return false;
  }
}

function checkWeightMetricError() {
  if (kgInput.validity.rangeOverflow || kgInput.validity.rangeUnderflow) {
    return true;
  } else if (kgInput.value === "") {
    return false;
  }
}

calcForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // UNIT
  const units = document.getElementById("units").value;

  const genderValid = genderValidation();
  const ageValid = ageValidation();
  const activityValid = activityValidation();
  const goalValid = goalValidation();
  if (units === "imperial") {
    const heightImpValidation = heightImperialValidation();
    const weightImpValidation = weightImperialValidation();
    checkAllValidation(
      genderValid,
      ageValid,
      activityValid,
      goalValid,
      heightImpValidation,
      weightImpValidation
    );
  } else {
    const heightMeValidation = heightMetricValidation();
    const weightMeValidation = weightMetricValidation();
    checkAllValidation(
      genderValid,
      ageValid,
      activityValid,
      goalValid,
      heightMeValidation,
      weightMeValidation
    );
  }
});

function checkAllValidation(gender, age, height, weight, activity, goal) {
  console.log(gender, age, height, weight, activity, goal);
  if (!gender && !age && !height && !weight && !activity && !goal) {
    calculate();
  }
}
