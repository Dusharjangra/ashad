export type Unit = 'metric' | 'us';
export type Gender = 'male' | 'female';
export type DietPreference = 'veg' | 'non-veg';
export type Goal = 'loss' | 'maintain' | 'gain';
export type Budget = 'low' | 'medium' | 'high';


export interface FormData {
  age: string;
  gender: Gender;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weightKg: string;
  weightLb: string;
  activityLevel: string;
  unit: Unit;
  diet: DietPreference;
  goal: Goal;
  budget: Budget;
}

export interface CalculationResult {
  maintenance: number;
  mildLoss: number;
  loss: number;
  extremeLoss: number;
  mildGain: number;
  gain: number;
  extremeGain: number;
}

export interface UserProfile {
  formData: FormData;
}

export interface HistoryEntry {
  id: number;
  date: string;
  formData: FormData;
  result: CalculationResult;
}