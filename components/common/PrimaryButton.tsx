
import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick, className = '', isLoading = false, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold bg-[#A7C7E7] text-slate-800 px-8 py-3 rounded-lg shadow-md hover:bg-[#b8d2eb] active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A7C7E7] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
