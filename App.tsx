import React, { useState, useCallback } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import ProfileSection from './components/ProfileSection';
import HistorySection from './components/HistorySection';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { UserProfile, CalculationResult, HistoryEntry, FormData } from './types';
import { calculateCalories } from './services/calorieService';

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    age: '25',
    gender: 'male',
    heightCm: '180',
    heightFt: '5',
    heightIn: '10',
    weightKg: '65',
    weightLb: '143',
    activityLevel: '1.55',
    unit: 'metric',
    diet: 'veg',
    goal: 'maintain',
    budget: 'medium',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('user-profile', null);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('calculation-history', []);
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');

  const handleCalculate = useCallback(() => {
    const calculationResult = calculateCalories(formData);
    setResult(calculationResult);

    const newHistoryEntry: HistoryEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      formData: { ...formData },
      result: calculationResult,
    };
    setHistory(prevHistory => [newHistoryEntry, ...prevHistory.slice(0, 9)]);
  }, [formData, setHistory]);

  const loadProfile = useCallback(() => {
    if (profile) {
      setFormData(profile.formData);
      // Automatically calculate when profile is loaded for immediate feedback
      const calculationResult = calculateCalories(profile.formData);
      setResult(calculationResult);
    }
  }, [profile]);

  const saveProfile = useCallback(() => {
    setProfile({ formData });
  }, [formData, setProfile]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">AI Calorie Calculator</h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            Estimate your daily calorie needs and get AI-powered dietary advice for your health goals.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <CalculatorForm formData={formData} setFormData={setFormData} onCalculate={handleCalculate} />
            </div>
            {result && <ResultsDisplay result={result} formData={formData} />}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 sticky top-8">
              <div className="flex border-b border-slate-200 mb-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'history'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  History
                </button>
              </div>
              
              {activeTab === 'profile' && (
                <ProfileSection onSave={saveProfile} onLoad={loadProfile} hasProfile={!!profile} />
              )}
              {activeTab === 'history' && (
                <HistorySection history={history} onClear={clearHistory} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}