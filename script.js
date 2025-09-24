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
  {name: "Garlic Butter Steak & Potatoes Skillet", cal:493, p:27, c:40, f:9},
  {name: "Chicken Noodle Soup", cal:313, p:34, c:24, f:5}
];

const snacks = [
  {name: "Apple with Nut Butter", cal:190, c:25, f:10},
  {name: "Greek Yogurt with Berries", cal:150, p:15, c:15, f:3},
  {name: "Protein Bar", cal:200, p:20, c:20, f:5},
  {name: "Veggies with Hummus", cal:150, p:5, c:20, f:8},
  {name: "Cottage Cheese", cal:100, p:12, c:5, f:4}
];

let currentCal = 0;
let adjustment = 0;

function calculate() {
  const gender = document.getElementByID('gender').value;
  const age = parseFloat(document.getElementByID('age').value);
  const ft = parseFloat(document.getElementByID('ft').value) || 0;
  const inc = parseFloat(document.getElementByID('in').value) || 0;
  const lb = parseFloat(document.getElementByID('lb').value);
  const activity = parseFloat(documet.getElementByID('activity').value);
  const goal = document.getElementByID('goal').value;

  //Validate inputs
  if (!gender || !age || !ft || !lb || !activity || !goal) {
    alert('Please fill in all required fields.');
    return;
  }

  //Convert imperial to metric for Mifflin-St Jeor formula
  const height = (ft * 12 + inc) *2.54; //feet and inches to cm
  const weight = lb / 2.20462; //pounds to kilograms

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

  document.getElementByID('calories').innerText = currentCal;
  document.getElementByID('protein').innerText = protein;
  document.getElementByID('carbs').innerText = carbs;
  document.getElementByID('fat').innerText = fat;
  generateMealPlan();
  document.getElementByID('output').style.display = 'block';
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

  let planHTML = '
      <p>Breakfast: ${bMeal.name} (${bScale.toFixed(1)} portions) - ${bCal} cal, ${Math.round(bMeal.p * bScale)}g protein, 
      ${Math.round(bMeal.c * bScale)}g carbs, ${Math.round(bMeal.f * bScale)}g fat</p>

      <p>Lunch: ${lMeal.name} (${lScale.toFixed(1)} portions) - ${lCal} cal, ${Math.round(bMeal.l * lScale)}g protein, 
      ${Math.round(lMeal.c * lScale)}g carbs, ${Math.round(lMeal.f * lScale)}g fat</p>

      <p>Dinner: ${dMeal.name} (${dScale.toFixed(1)} portions) - ${dCal} cal, ${Math.round(dMeal.p * dScale)}g protein, 
      ${Math.round(dMeal.c * dScale)}g carbs, ${Math.round(dMeal.f * dScale)}g fat</p>

      <p>Snack: ${sMeal.name} (${sScale.toFixed(1)} portions) - ${sCal} cal, ${Math.round(sMeal.p * sScale)}g protein, 
      ${Math.round(sMeal.c * sScale)}g carbs, ${Math.round(sMeal.f * sScale)}g fat</p>
  ';
  document.getElementByID('mealPlan').innerHTML = planHTML;
  document.getElementByID('totalMealCal').innerText = totalMealCal;
  document.getElementByID('totalMealP').innerText = totalP;
  document.getElementByID('totalMealC').innerText = totalC;
  document.getElementByID('totalMealF').innerText = totalF;
}

function regenerateMeal() {
  generateMealPlan();
}

function ClearAll() {
  document.getElementByID('NutriTarget').reset;
  document.getElementByID('output').style.display = 'none';
