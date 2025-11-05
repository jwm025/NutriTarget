const breakfasts = [
  {name: "Turkey & Broccoli Omelet", cal:397, p: 35, c:26, f:17},
  {name: "Strawberries & Cream Overnight Oats", cal:282, p:30, c:27, f:6},
  {name: "Fluffy Protein Waffles", cal: 225, p:20, c:25, f:5},
  {name: "Macro-Friendly French Toast", cal:170, p:12, c:18, f: 5.5},
  {name: "Beef Bacon Egg Muffins", cal:255, p:20, c:10, f:15}
];

const lunches = [
  {name: "Rotisserie Chicken Salad", cal: 470, p:21, c:47, f:22},
  {name: "Philly Cheesesteak Pita", cal: 310, p:23, c:25, f:13},
  {name: "Lemon Ricotta Pasta with Arugula", cal:477, p:22, c:68, f:13},
  {name: "Apple Pecan Salad", cal: 315, p:25, c:18, f:16},
  {name: "Philly Cheesesteak Stuffed Peppers", cal:340, p:30, c:10, f:20}
];

const dinners = [
  {name: "Air Fryer Chicken Parm", cal:385, p:32, c:28, f:18},
  {name: "Green Chili Chicken Bake", cal:240, p:40, c:14, f:5},
  {name: "Low Carb Hamburger Helper", cal:390, p:40, c:11, f:20},
  {name: "Garlic Butter Steak & Potatoes Skillet", cal:493, p:27, c:40, f:25},
  {name: "Chicken Noodle Soup", cal:313, p:34, c:24, f:5}
];

const snacks = [
  {name: "Apple with Nut Butter", cal:190, p:4, c:24, f:7},
  {name: "Greek Yogurt with Berries", cal:150, p:10, c:13, f:6},
  {name: "Protein Bar", cal:150, p:21, c:5, f:7},
  {name: "Veggies with Hummus", cal:182, p:10, c:14, f:10},
  {name: "Cottage Cheese", cal:90, p:13, c:5, f:2.5}
];

let currentCal = 0;
let adjustment = 0;
const activityLevels = [
  {value: 1.2, text: "Sedentary (little to no exercise)"},
  {value: 1.375, text: "Lightly active (light exercise 1-3 days/week)"},
  {value: 1.55, text: "Moderately active (moderate exercise 3-5 days/week)"},
  {value: 1.725, text: "Very active (hard exercise 6-7 days/week)"},
  {value: 1.9, text: "Extremely active (hard daily exercise and physical job)"}
];

function acceptDisclaimer() {
  if (document.getElementById('acknowledge').checked) {
    document.getElementById('disclaimerModal').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
  } else {
      alert('Please acknowledge the terms.');
  }
}

function showTerms() {
  document.getElementById('termsModal').style.display = 'block';
}

function showPrivacy() {
  document.getElementById('privacyModal').style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function showSettings() {
  document.getElementById('settingsModal').style.display = 'block';
}

function updateActivityText(value) {
  const index = parseInt(value);
  if (index > 0) {
    document.getElementById('activityText').innerText = activityLevels[index - 1].text;
  } else {
    document.getElementById('activityText').innerText = 'Select activity level';
  }
}

function toggleUnits() {
  const units = document.getElementById('units').value;
  if (units === 'metric') {
    document.getElementById('heightImperial').style.display = 'none';
    document.getElementById('heightMetric').style.display = 'block';
    document.getElementById('weightImperial').style.display = 'none';
    document.getElementById('weightMetric').style.display = 'block';
    document.getElementById('height').required = true;
    document.getElementById('weight').required = true;
    document.getElementById('ft').required = false;
    document.getElementById('lb').required = false;
  } else {
    document.getElementById('heightImperial').style.display = 'block';
    document.getElementById('heightMetric').style.display = 'none';
    document.getElementById('weightImperial').style.display = 'block';
    document.getElementById('weightMetric').style.display = 'none';
    document.getElementById('height').required = false;
    document.getElementById('weight').required = false;
    document.getElementById('ft').required = true;
    document.getElementById('lb').required = true;
  }
}

function calculate() {
  const gender = document.getElementById('gender').value;
  const age = parseFloat(document.getElementById('age').value);
  const units = document.getElementById('units').value || 'imperial';
  let height, weight;
  if (units === 'metric') {
    height = parseFloat(document.getElementById('height').value);
    weight = parseFloat(document.getElementById('weight').value);
  } else {
    const ft = parseFloat(document.getElementById('ft').value) || 0;
    const inc = parseFloat(document.getElementById('in').value) || 0;
    height = (ft * 12 + inc) * 2.54;
    weight = parseFloat(document.getElementById('lb').value) / 2.20462;
  }
  const activityIndex = parseInt(document.getElementById('activity').value);
  const activity = activityLevels[activityIndex - 1].value;
  const goal = document.getElementById('goal').value;

  //Validate inputs
  if (!gender || isNaN(age) || age < 18 || age > 78 || isNaN(height) || isNaN(weight) || weight <= 0 || activityIndex === 0 || !goal) {
    alert('Please fill in all required fields correctly. Age must be 18-78, weight/height must be positive and in range');
    return;
  }
  if (units === 'metric' && (height < 90 || height > 250)) {
    alert('Height must be between 90 and 250 cm.');
    return;
  } else if (units !== 'metric') {
    const ft = parseFloat(document.getElementById('ft').value) || 0;
    const inc = parseFloat(document.getElementById('in').value) || 0;
    if (ft < 3 || ft > 8 || inc < 0 || inc > 11) {
      alert('Height must be between 3 and 8 ft, 0-11 in.');
      return;
    }
  }
  if (units === 'metric' && (weight < 20 || weight > 250)) {
    alert('Weight must be between 20 and 250 kg.');
    return;
  } else if (units !== 'metric' && (parseFloat(document.getElementById('lb').value) < 50 || parseFloat(document.getElementById('lb').value) > 500)){
    alert('Weight must be between 50 and 500 lb.');
    return;
  }

  if (goal == 'lose') adjustment = -500;
  else if (goal == 'gain') adjustment = 500;
  else adjustment = 0;

  //Mifflin-St Jeor formula
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const tdee = bmr * activity;
  currentCal = Math.round(tdee + adjustment);

  const protein = Math.round((currentCal * 0.3) / 4);
  const carbs = Math.round((currentCal * 0.4) / 4);
  const fat = Math.round((currentCal * 0.3) / 9);

  document.getElementById('calories').innerText = currentCal;
  document.getElementById('protein').innerText = protein;
  document.getElementById('carbs').innerText = carbs;
  document.getElementById('fat').innerText = fat;
  generateMealPlan();
  document.getElementById('output').style.display = 'block';
}

function generateMealPlan() {
  const props = {b: 0.25, l: 0.3, d: 0.3, s:0.15};
  const bCal = Math.round(currentCal * props.b);
  const lCal = Math.round(currentCal * props.l);
  const dCal = Math.round(currentCal * props.d);
  const sCal = Math.round(currentCal * props.s);
  
  const bMeal = breakfasts[Math.floor(Math.random() * breakfasts.length)];
  const lMeal = lunches[Math.floor(Math.random() * lunches.length)];
  const dMeal = dinners[Math.floor(Math.random() * dinners.length)];
  const sMeal = snacks[Math.floor(Math.random() * snacks.length)];

  const bScale = bCal / bMeal.cal;
  const lScale = lCal / lMeal.cal;
  const dScale = dCal / dMeal.cal;
  const sScale = sCal / sMeal.cal;

  const totalMealCal = bCal + lCal + dCal + sCal;
  const totalP = Math.round(bMeal.p * bScale + lMeal.p * lScale + dMeal.p * dScale + sMeal.p * sScale);
  const totalC = Math.round(bMeal.c * bScale + lMeal.c * lScale + dMeal.c * dScale + sMeal.c * sScale);
  const totalF = Math.round(bMeal.f * bScale + lMeal.f * lScale + dMeal.f * dScale + sMeal.f * sScale);

  let planHTML = `
    <p>Breakfast: ${bMeal.name} (${bScale.toFixed(1)} portions) - ${bCal} cal, ${Math.round(bMeal.p * bScale)}g protein, 
    ${Math.round(bMeal.c * bScale)}g carbs, ${Math.round(bMeal.f * bScale)}g fat</p>
    <p>Lunch: ${lMeal.name} (${lScale.toFixed(1)} portions) - ${lCal} cal, ${Math.round(lMeal.p * lScale)}g protein, 
    ${Math.round(lMeal.c * lScale)}g carbs, ${Math.round(lMeal.f * lScale)}g fat</p>
    <p>Dinner: ${dMeal.name} (${dScale.toFixed(1)} portions) - ${dCal} cal, ${Math.round(dMeal.p * dScale)}g protein, 
    ${Math.round(dMeal.c * dScale)}g carbs, ${Math.round(dMeal.f * dScale)}g fat</p>
    <p>Snack: ${sMeal.name} (${sScale.toFixed(1)} portions) - ${sCal} cal, ${Math.round(sMeal.p * sScale)}g protein, 
    ${Math.round(sMeal.c * sScale)}g carbs, ${Math.round(sMeal.f * sScale)}g fat</p>
  `;
  document.getElementById('mealPlan').innerHTML = planHTML;
  document.getElementById('totalMealCal').innerText = totalMealCal;
  document.getElementById('totalMealP').innerText = totalP;
  document.getElementById('totalMealC').innerText = totalC;
  document.getElementById('totalMealF').innerText = totalF;
}

function regenerateMeal() {
  generateMealPlan();
}

function clearAll() {
  document.getElementById('calcForm').reset();
  document.getElementById('output').style.display = 'none';
  updateActivityText(0);
  toggleUnits();
}

//Initial setup
//document.addEventListener('DOMContentLoaded', function() {
//  toggleUnits();
 // updateActivityText(0);
});

//CJS exports for jest tests
module.exports = {
  calculateBMR,
  applyActivityMultiplier,
  calculateMacros,
  scaleMeal
};
