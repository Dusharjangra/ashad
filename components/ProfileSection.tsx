
import React from 'react';
import { SaveIcon, UserIcon } from './icons';

interface ProfileSectionProps {
  onSave: () => void;
  onLoad: () => void;
  hasProfile: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onSave, onLoad, hasProfile }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-800">User Profile</h3>
      <p className="mt-1 text-sm text-slate-500 mb-4">
        Save your data for quick calculations in the future. Your data is stored only in your browser.
      </p>
      <div className="space-y-3">
        <button
          onClick={onSave}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <SaveIcon />
          Save Current Data
        </button>
        <button
          onClick={onLoad}
          disabled={!hasProfile}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          <UserIcon />
          Load Saved Data
        </button>
      </div>
      {!hasProfile && (
        <p className="mt-3 text-xs text-slate-400 text-center">
            No profile saved yet. Fill the form and click "Save".
        </p>
      )}
    </div>
  );
};

export default ProfileSection;
