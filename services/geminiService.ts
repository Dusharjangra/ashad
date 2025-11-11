import { GoogleGenAI } from "@google/genai";
import type { FormData, CalculationResult } from '../types';

export const getAIAssistantAdvice = async (formData: FormData, result: CalculationResult): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Please set up your API key to use the AI Assistant.";
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { age, gender, heightCm, heightFt, heightIn, weightKg, weightLb, unit, diet, goal, budget } = formData;
  
  const heightStr = unit === 'metric' ? `${heightCm} cm` : `${heightFt}'${heightIn}"`;
  const weightStr = unit === 'metric' ? `${weightKg} kg` : `${weightLb} lbs`;

  const goalMap = {
    loss: 'Weight Loss',
    maintain: 'Maintain Weight',
    gain: 'Weight Gain'
  };

  const budgetMap = {
    low: 'Budget-Friendly',
    medium: 'Moderate',
    high: 'Flexible'
  };

  const calorieTarget = {
    loss: result.loss,
    maintain: result.maintenance,
    gain: result.gain
  };

  const prompt = `
    You are a friendly and encouraging health and fitness expert specializing in Indian cuisine.
    A user has provided their details, their health goal, and their budget, and has received their daily calorie estimates.
    Provide them with clear, actionable, and safe advice.

    User's Data:
    - Age: ${age}
    - Gender: ${gender}
    - Height: ${heightStr}
    - Weight: ${weightStr}
    - Activity Level: (Based on multiplier, from sedentary to extra active)
    - Dietary Preference: ${diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
    - Primary Goal: ${goalMap[goal]}
    - Food Budget: ${budgetMap[budget]}

    Calorie Results:
    - For Weight Loss (0.5 lb/week): ${result.loss} calories/day
    - To Maintain Weight: ${result.maintenance} calories/day
    - For Weight Gain (0.5 lb/week): ${result.gain} calories/day

    Your task is to generate a response in Markdown format that includes:
    1.  **A Brief, Positive Summary:** Start with a positive and encouraging summary of their results, acknowledging their goal.
    2.  **Personalized Tips for their Goal:** Based on their goal (${goalMap[goal]}), provide 3-4 simple, actionable tips relevant to that goal.
    3.  **A Sample One-Day Indian Meal Plan:**
        - This is the most important part. Create a simple, balanced, sample meal plan (Breakfast, Lunch, Dinner, Snacks).
        - The plan must align with their dietary preference (${diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}).
        - The plan must be suitable for their stated budget (${budgetMap[budget]}). Suggest budget-friendly ingredients where appropriate (e.g., lentils, seasonal vegetables for low budget).
        - The total calories for the plan must align with their specific goal, targeting approximately **${calorieTarget[goal]} calories**.
        - The plan must be based on common Indian food items.
        - Crucially, specify the quantity of each food item in **grams (g)**, based on its **cooked weight**, not raw. This is important for user convenience.
    4.  **A Disclaimer:** End with a friendly disclaimer advising the user to consult with a healthcare professional or registered dietitian before making significant dietary changes.

    Keep the tone supportive and easy to understand. Avoid overly technical jargon.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching advice from Gemini API:", error);
    return "Sorry, I couldn't fetch advice at the moment. Please check your API key and try again later.";
  }
};