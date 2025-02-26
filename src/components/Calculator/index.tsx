import React from 'react';
import Display from './Display';
import Keypad from './Keypad';
import History from './History';
import EmotionDisplay from '../EmotionDisplay';
import { useCalculator } from '../../hooks/useCalculator';

const Calculator: React.FC = () => {
  const {
    displayValue,
    previousValue,
    operation,
    history,
    emotion,
    emotionMessage,
    appendDigit,
    chooseOperation,
    evaluate,
    clear,
    deleteLastDigit,
    memoryStore,
    memoryRecall,
    memoryClear,
    square,
    squareRoot,
    percentage,
    toggleSign,
  } = useCalculator();
  
  // 현재 계산식 표시
  const getExpression = () => {
    if (!previousValue) return '';
    return `${previousValue} ${operation || ''} ${operation ? '' : displayValue}`;
  };
  
  return (
    <div className="max-w-md mx-auto">
      <EmotionDisplay emotion={emotion} message={emotionMessage} />
      
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <Display value={displayValue} expression={getExpression()} />
        <Keypad
          onDigitClick={appendDigit}
          onOperationClick={chooseOperation}
          onClearClick={clear}
          onDeleteClick={deleteLastDigit}
          onEvaluateClick={evaluate}
          onMemoryStoreClick={memoryStore}
          onMemoryRecallClick={memoryRecall}
          onMemoryClearClick={memoryClear}
          onSquareClick={square}
          onSquareRootClick={squareRoot}
          onPercentageClick={percentage}
          onToggleSignClick={toggleSign}
        />
      </div>
      
      <History history={history} />
    </div>
  );
};

export default Calculator; 