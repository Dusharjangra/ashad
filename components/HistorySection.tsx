import React from 'react';
import type { HistoryEntry } from '../types';
import { TrashIcon } from './icons';

interface HistorySectionProps {
  history: HistoryEntry[];
  onClear: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, onClear }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Calculation History</h3>
        {history.length > 0 && (
            <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            >
            <TrashIcon />
            Clear
            </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8">
            <p className="text-sm text-slate-500">Your recent calculations will appear here.</p>
        </div>
      ) : (
        <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {history.map(entry => (
            <li key={entry.id} className="p-3 bg-slate-50 rounded-md border border-slate-200">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-800">{Math.round(entry.result.maintenance).toLocaleString()} <span className="text-xs font-normal text-slate-500">kcal/day</span></p>
                <p className="text-xs text-slate-400">{new Date(entry.date).toLocaleDateString()}</p>
              </div>
              <p className="text-xs text-slate-500 mt-1 capitalize">
                {entry.formData.age}yo, {entry.formData.gender}, {entry.formData.diet === 'veg' ? 'Veg' : 'Non-Veg'}, Goal: {entry.formData.goal}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorySection;