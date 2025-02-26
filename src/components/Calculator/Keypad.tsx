import React from 'react';
import CalculatorButton from './CalculatorButton';

type KeypadProps = {
  onDigitClick: (digit: string) => void;
  onOperationClick: (operation: string) => void;
  onClearClick: () => void;
  onDeleteClick: () => void;
  onEvaluateClick: () => void;
  onMemoryStoreClick: () => void;
  onMemoryRecallClick: () => void;
  onMemoryClearClick: () => void;
  onSquareClick: () => void;
  onSquareRootClick: () => void;
  onPercentageClick: () => void;
  onToggleSignClick: () => void;
};

const Keypad: React.FC<KeypadProps> = ({
  onDigitClick,
  onOperationClick,
  onClearClick,
  onDeleteClick,
  onEvaluateClick,
  onMemoryStoreClick,
  onMemoryRecallClick,
  onMemoryClearClick,
  onSquareClick,
  onSquareRootClick,
  onPercentageClick,
  onToggleSignClick,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-4 bg-gray-900 rounded-b-lg">
      {/* 첫 번째 줄: 메모리 및 특수 기능 */}
      <CalculatorButton onClick={onMemoryClearClick} type="function">MC</CalculatorButton>
      <CalculatorButton onClick={onMemoryRecallClick} type="function">MR</CalculatorButton>
      <CalculatorButton onClick={onMemoryStoreClick} type="function">M+</CalculatorButton>
      <CalculatorButton onClick={onClearClick} type="function">C</CalculatorButton>
      
      {/* 두 번째 줄: 특수 연산 및 삭제 */}
      <CalculatorButton onClick={onSquareClick} type="function">x²</CalculatorButton>
      <CalculatorButton onClick={onSquareRootClick} type="function">√</CalculatorButton>
      <CalculatorButton onClick={onPercentageClick} type="function">%</CalculatorButton>
      <CalculatorButton onClick={onDeleteClick} type="delete">CE</CalculatorButton>
      
      {/* 세 번째 줄: 숫자 7-9 및 나누기 */}
      <CalculatorButton onClick={() => onDigitClick('7')}>7</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('8')}>8</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('9')}>9</CalculatorButton>
      <CalculatorButton onClick={() => onOperationClick('÷')} type="operation">÷</CalculatorButton>
      
      {/* 네 번째 줄: 숫자 4-6 및 곱하기 */}
      <CalculatorButton onClick={() => onDigitClick('4')}>4</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('5')}>5</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('6')}>6</CalculatorButton>
      <CalculatorButton onClick={() => onOperationClick('×')} type="operation">×</CalculatorButton>
      
      {/* 다섯 번째 줄: 숫자 1-3 및 빼기 */}
      <CalculatorButton onClick={() => onDigitClick('1')}>1</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('2')}>2</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('3')}>3</CalculatorButton>
      <CalculatorButton onClick={() => onOperationClick('-')} type="operation">-</CalculatorButton>
      
      {/* 여섯 번째 줄: 부호 변경, 0, 소수점, 더하기 */}
      <CalculatorButton onClick={onToggleSignClick}>+/-</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('0')}>0</CalculatorButton>
      <CalculatorButton onClick={() => onDigitClick('.')}>.</CalculatorButton>
      <CalculatorButton onClick={() => onOperationClick('+')} type="operation">+</CalculatorButton>
      
      {/* 일곱 번째 줄: 계산 버튼 */}
      <CalculatorButton onClick={onEvaluateClick} type="equals" span={4}>=</CalculatorButton>
    </div>
  );
};

export default Keypad; 