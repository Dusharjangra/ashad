
import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px border-b-2 py-3 px-4 text-sm font-medium transition-colors duration-200 focus:outline-none ${
        isActive
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
      }`}
    >
      {children}
    </button>
  );
};

export default TabButton;
