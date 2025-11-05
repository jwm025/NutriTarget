const { expect, test, describe } = require('@jest/globals');
const { calculateBMR, applyActivityMultiplier, calculateMacros, scaleMeal } = require('../script.js');

describe('BMR and TDEE Calculations', () => {
  test('calculateBMR for male (30y, 70kg, 175cm)', () => {
    expect(calculateBMR('male', 70, 175, 30)).toBe(1649);
  });

  test('calculateBMR for female (30y, 70kg, 175cm)', () => {
    expect(calculateBMR('female', 70, 175, 30)).toBe(1483);
  });

  test('Invalid gender throws error', () => {
    expect(() => calculateBMR('other', 70, 175, 30)).toThrow('Invalid gender');
  });

  test('applyActivityMultiplier for moderate activity (index 3)', () => {
    expect(applyActivityMultiplier(1649, 3)).toBe(2556);
  });
});

describe('Macros Calculation', () => {
  test('calculateMacros for 2000 calories', () => {
    expect(calculateMacros(2000)).toEqual({ protein: 150, carbs: 200, fat: 67 });
  });
});

describe('Meal Scaling', () => {
  test('scaleMeal to 500 cal from 397 cal base', () => {
    const meal = { cal: 397, p: 35, c: 26, f:17 };
    const scaled = scaleMeal(meal, 500);
    expect(scaled.p).toBe(44);
    expect(scaled.c).toBe(33);
    expect(scaled.f).toBe(21);
  });
});
