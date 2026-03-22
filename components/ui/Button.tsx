import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-in-out rounded-sm transform hover:-translate-y-1 shadow-md";
  
  const variants = {
    primary: "bg-gold-700 hover:bg-gold-600 text-white shadow-gold-700/20",
    outline: "border-2 border-gold-700 text-gold-700 hover:bg-gold-700 hover:text-white"
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};