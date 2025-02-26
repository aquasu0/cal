import React from 'react';

type DisplayProps = {
  value: string;
  expression: string;
};

const Display: React.FC<DisplayProps> = ({ value, expression }) => {
  // 숫자 포맷팅 (천 단위 콤마)
  const formatNumber = (num: string) => {
    const [integer, decimal] = num.split('.');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
  };
  
  return (
    <div className="bg-gray-800 p-4 rounded-t-lg">
      <div className="text-gray-400 text-right h-6 overflow-hidden">
        {expression}
      </div>
      <div className="text-white text-right text-3xl md:text-4xl font-bold overflow-x-auto whitespace-nowrap">
        {formatNumber(value)}
      </div>
    </div>
  );
};

export default Display; 