
import type { FormData, CalculationResult } from '../types';

// Converts US customary units to metric
const convertToMetric = (formData: FormData): { weight: number, height: number } => {
  if (formData.unit === 'metric') {
    return {
      weight: parseFloat(formData.weightKg) || 0,
      height: parseFloat(formData.heightCm) || 0,
    };
  } else {
    const feet = parseFloat(formData.heightFt) || 0;
    const inches = parseFloat(formData.heightIn) || 0;
    const totalInches = (feet * 12) + inches;
    return {
      weight: (parseFloat(formData.weightLb) || 0) * 0.453592,
      height: totalInches * 2.54,
    };
  }
};

// Calculates calories using the Mifflin-St Jeor equation
export const calculateCalories = (formData: FormData): CalculationResult => {
  const { weight, height } = convertToMetric(formData);
  const age = parseFloat(formData.age) || 0;
  const activityMultiplier = parseFloat(formData.activityLevel) || 1.2;

  if (weight <= 0 || height <= 0 || age <= 0) {
    return { maintenance: 0, mildLoss: 0, loss: 0, extremeLoss: 0, mildGain: 0, gain: 0, extremeGain: 0 };
  }

  let bmr: number;
  if (formData.gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const maintenance = Math.round(bmr * activityMultiplier);

  return {
    maintenance,
    mildLoss: maintenance - 250,
    loss: maintenance - 500,
    extremeLoss: maintenance - 1000,
    mildGain: maintenance + 250,
    gain: maintenance + 500,
    extremeGain: maintenance + 1000,
  };
};
