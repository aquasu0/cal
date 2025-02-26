import React from 'react';

type ButtonType = 'number' | 'operation' | 'function' | 'equals';

type CalculatorButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  type?: ButtonType;
  span?: number;
};

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  onClick,
  children,
  type = 'number',
  span = 1,
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'number':
        return 'bg-gray-600 hover:bg-gray-500 text-white';
      case 'operation':
        return 'bg-orange-500 hover:bg-orange-400 text-white';
      case 'function':
        return 'bg-gray-400 hover:bg-gray-300 text-gray-900';
      case 'equals':
        return 'bg-blue-500 hover:bg-blue-400 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-500 text-white';
    }
  };
  
  return (
    <button
      onClick={onClick}
      className={`${getButtonStyle()} p-4 text-xl font-bold rounded-lg transition-colors duration-200 
      ${span > 1 ? `col-span-${span}` : ''} calculator-button`}
    >
      {children}
    </button>
  );
};

export default CalculatorButton; 