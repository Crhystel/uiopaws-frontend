import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-semibold text-brand-dark mb-2">
                {label}
            </label>
            <input
                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all placeholder-gray-400 text-gray-700 ${className}`}
                {...props}
            />
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
};
