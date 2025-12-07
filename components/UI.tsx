import React, { Fragment } from 'react';
import { X } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-sm dark:bg-primary-600 dark:hover:bg-primary-500",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700",
    outline: "bg-transparent hover:bg-gray-50 text-primary-600 border border-primary-600 focus:ring-primary-500 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-slate-800",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm dark:bg-red-700 dark:hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; padding?: string }> = ({ 
  children, 
  className = '',
  padding = 'p-5'
}) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 ${padding} ${className}`}>
    {children}
  </div>
);

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
    <input
      className={`w-full px-3 py-2 border ${error ? 'border-red-300 dark:border-red-800' : 'border-gray-300 dark:border-slate-600'} rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white dark:bg-slate-900 dark:text-white ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

// --- Select ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string | number }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
    <select
      className={`w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white dark:bg-slate-900 dark:text-white ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);


// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-900/50 dark:bg-black/70 transition-opacity" onClick={onClose} aria-hidden="true" />

        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">{title}</h3>
              <button 
                onClick={onClose}
                className="rounded-md bg-white dark:bg-slate-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-gray-900 dark:text-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-gray-100 text-gray-800' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
    {children}
  </span>
);
