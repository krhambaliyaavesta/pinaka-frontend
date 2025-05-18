import { ButtonHTMLAttributes, FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-[#42B4AC] hover:bg-teal-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border border-[#42B4AC] text-[#42B4AC] hover:bg-teal-50'
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`font-medium rounded-full transition-colors duration-200 
      ${variantClasses[variant]} 
      ${sizeClasses[size]} 
      ${fullWidth ? 'w-full' : ''} 
      ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
      ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin mr-2 h-4 w-4" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 