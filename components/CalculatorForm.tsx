import React from 'react';
import type { FormData, Unit, DietPreference, Goal, Budget } from '../types';
import { ACTIVITY_LEVELS } from '../constants';
import { CalculatorIcon } from './icons';
import TabButton from './TabButton';

interface CalculatorFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onCalculate: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ formData, setFormData, onCalculate }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUnitChange = (unit: Unit) => {
    setFormData(prev => ({ ...prev, unit }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex border-b border-gray-200">
        <TabButton isActive={formData.unit === 'metric'} onClick={() => handleUnitChange('metric')}>
          Metric Units
        </TabButton>
        <TabButton isActive={formData.unit === 'us'} onClick={() => handleUnitChange('us')}>
          US Units
        </TabButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-700">Age</label>
          <input type="number" name="age" id="age" value={formData.age} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white" placeholder="e.g., 25" required />
          <p className="mt-1 text-xs text-slate-500">Ages 15 - 80</p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Gender</label>
          <div className="mt-2 flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} className="h-4 w-4 bg-white text-blue-600 border-slate-300 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-slate-700">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} className="h-4 w-4 bg-white text-blue-600 border-slate-300 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-slate-700">Female</span>
            </label>
          </div>
        </div>
        
        {/* Height */}
        <div className="sm:col-span-2">
          <label htmlFor="height" className="block text-sm font-medium text-slate-700">Height</label>
          {formData.unit === 'metric' ? (
            <div className="relative mt-1">
              <input type="number" name="heightCm" id="height" value={formData.heightCm} onChange={handleInputChange} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-4 pr-12 bg-white" placeholder="e.g., 180" required />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm">cm</span>
              </div>
            </div>
          ) : (
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div className="relative">
                <input type="number" name="heightFt" value={formData.heightFt} onChange={handleInputChange} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-4 pr-12 bg-white" placeholder="e.g., 5" required />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">ft</span>
                </div>
              </div>
              <div className="relative">
                <input type="number" name="heightIn" value={formData.heightIn} onChange={handleInputChange} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-4 pr-12 bg-white" placeholder="e.g., 10" required />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">in</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Weight */}
        <div className="sm:col-span-2">
           <label htmlFor="weight" className="block text-sm font-medium text-slate-700">Weight</label>
           <div className="relative mt-1">
             {formData.unit === 'metric' ? (
                <>
                  <input type="number" name="weightKg" id="weight" value={formData.weightKg} onChange={handleInputChange} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-4 pr-12 bg-white" placeholder="e.g., 65" required />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">kg</span>
                  </div>
                </>
             ) : (
                <>
                  <input type="number" name="weightLb" id="weight" value={formData.weightLb} onChange={handleInputChange} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-4 pr-12 bg-white" placeholder="e.g., 143" required />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">lbs</span>
                  </div>
                </>
             )}
            </div>
        </div>

        {/* Activity Level */}
        <div className="sm:col-span-2">
          <label htmlFor="activityLevel" className="block text-sm font-medium text-slate-700">Activity Level</label>
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white">
            {ACTIVITY_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        {/* Diet Preference */}
        <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Dietary Preference</label>
            <div className="mt-2 flex items-center space-x-4">
                <label className="inline-flex items-center">
                <input type="radio" name="diet" value="veg" checked={formData.diet === 'veg'} onChange={handleInputChange} className="h-4 w-4 bg-white text-blue-600 border-slate-300 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-slate-700">Vegetarian</span>
                </label>
                <label className="inline-flex items-center">
                <input type="radio" name="diet" value="non-veg" checked={formData.diet === 'non-veg'} onChange={handleInputChange} className="h-4 w-4 bg-white text-blue-600 border-slate-300 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-slate-700">Non-Vegetarian</span>
                </label>
            </div>
        </div>

        {/* Goal */}
        <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Goal</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
                 <label className={`text-center text-sm p-2 rounded-md cursor-pointer transition-colors ${formData.goal === 'loss' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <input type="radio" name="goal" value="loss" checked={formData.goal === 'loss'} onChange={handleInputChange} className="sr-only" />
                    Weight Loss
                </label>
                 <label className={`text-center text-sm p-2 rounded-md cursor-pointer transition-colors ${formData.goal === 'maintain' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <input type="radio" name="goal" value="maintain" checked={formData.goal === 'maintain'} onChange={handleInputChange} className="sr-only" />
                    Maintain
                </label>
                <label className={`text-center text-sm p-2 rounded-md cursor-pointer transition-colors ${formData.goal === 'gain' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <input type="radio" name="goal" value="gain" checked={formData.goal === 'gain'} onChange={handleInputChange} className="sr-only" />
                    Weight Gain
                </label>
            </div>
        </div>

        {/* Budget */}
        <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Weekly Food Budget</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
                 <label className={`text-center text-sm p-2 rounded-md cursor-pointer transition-colors ${formData.budget === 'low' ? 'bg-green-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <input type="radio" name="budget" value="low" checked={formData.budget === 'low'} onChange={handleInputChange} className="sr-only" />
                    Budget-Friendly
                </label>
                 <label className={`text-center text-sm p-2 rounded-md cursor-pointer transition-colors ${formData.budget === 'medium' ? 'bg-green-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <input type="radio" name="budget" value="medium" checked={formData.budget === 'medium'} onChange={handleInputChange} className="sr-only" />
                    Moderate
                </label>
                <label className={`text-center text-sm p-2 rounded-md cursor-pointer transition-colors ${formData.budget === 'high' ? 'bg-green-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    <input type="radio" name="budget" value="high" checked={formData.budget === 'high'} onChange={handleInputChange} className="sr-only" />
                    Flexible
                </label>
            </div>
        </div>

      </div>

      <div className="pt-2">
        <button type="submit" className="w-full flex justify-center items-center gap-2 rounded-md border border-transparent bg-green-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform transform hover:scale-105">
          <CalculatorIcon />
          Calculate
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;