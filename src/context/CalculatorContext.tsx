import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 감정 상태 타입
export type EmotionType = 'happy' | 'sad' | 'confused' | 'tired' | 'excited' | 'neutral';

// 계산기 상태 타입
type CalculatorState = {
  displayValue: string;
  previousValue: string | null;
  operation: string | null;
  resetDisplay: boolean;
  history: string[];
  memory: number;
  emotion: EmotionType;
  emotionMessage: string;
  consecutiveOperations: number;
  lastActivityTime: number;
};

// 액션 타입
type CalculatorAction =
  | { type: 'APPEND_DIGIT'; digit: string }
  | { type: 'CHOOSE_OPERATION'; operation: string }
  | { type: 'CLEAR' }
  | { type: 'DELETE' }
  | { type: 'EVALUATE' }
  | { type: 'MEMORY_STORE' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'SQUARE' }
  | { type: 'SQUARE_ROOT' }
  | { type: 'PERCENTAGE' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'UPDATE_EMOTION'; emotion: EmotionType; message: string }
  | { type: 'RECORD_ACTIVITY' };

// 초기 상태
const initialState: CalculatorState = {
  displayValue: '0',
  previousValue: null,
  operation: null,
  resetDisplay: false,
  history: [],
  memory: 0,
  emotion: 'neutral',
  emotionMessage: '안녕하세요! 계산할 준비가 되었어요.',
  consecutiveOperations: 0,
  lastActivityTime: Date.now(),
};

// 리듀서 함수
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'APPEND_DIGIT':
      if (state.resetDisplay) {
        return {
          ...state,
          displayValue: action.digit,
          resetDisplay: false,
          consecutiveOperations: 0,
          lastActivityTime: Date.now(),
        };
      }
      
      if (action.digit === '.' && state.displayValue.includes('.')) {
        return state;
      }
      
      return {
        ...state,
        displayValue: state.displayValue === '0' && action.digit !== '.' 
          ? action.digit 
          : state.displayValue + action.digit,
        consecutiveOperations: 0,
        lastActivityTime: Date.now(),
      };
      
    case 'CHOOSE_OPERATION':
      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: state.displayValue,
          operation: action.operation,
          resetDisplay: true,
          consecutiveOperations: state.consecutiveOperations + 1,
          lastActivityTime: Date.now(),
        };
      }
      
      if (state.resetDisplay) {
        return {
          ...state,
          operation: action.operation,
          consecutiveOperations: state.consecutiveOperations + 1,
          lastActivityTime: Date.now(),
        };
      }
      
      return {
        ...state,
        previousValue: evaluate(state),
        operation: action.operation,
        resetDisplay: true,
        history: [...state.history, `${state.previousValue} ${state.operation} ${state.displayValue} = ${evaluate(state)}`],
        consecutiveOperations: state.consecutiveOperations + 1,
        lastActivityTime: Date.now(),
      };
      
    case 'CLEAR':
      return {
        ...initialState,
        memory: state.memory,
        lastActivityTime: Date.now(),
      };
      
    case 'DELETE':
      if (state.resetDisplay) return state;
      
      return {
        ...state,
        displayValue: state.displayValue.length === 1 ? '0' : state.displayValue.slice(0, -1),
        lastActivityTime: Date.now(),
      };
      
    case 'EVALUATE':
      if (state.operation === null || state.previousValue === null || state.resetDisplay) {
        return state;
      }
      
      const result = evaluate(state);
      return {
        ...state,
        displayValue: result,
        previousValue: null,
        operation: null,
        resetDisplay: true,
        history: [...state.history, `${state.previousValue} ${state.operation} ${state.displayValue} = ${result}`],
        consecutiveOperations: 0,
        lastActivityTime: Date.now(),
      };
      
    case 'MEMORY_STORE':
      return {
        ...state,
        memory: parseFloat(state.displayValue),
        lastActivityTime: Date.now(),
      };
      
    case 'MEMORY_RECALL':
      return {
        ...state,
        displayValue: state.memory.toString(),
        resetDisplay: true,
        lastActivityTime: Date.now(),
      };
      
    case 'MEMORY_CLEAR':
      return {
        ...state,
        memory: 0,
        lastActivityTime: Date.now(),
      };
      
    case 'SQUARE':
      const squared = (parseFloat(state.displayValue) ** 2).toString();
      return {
        ...state,
        displayValue: squared,
        resetDisplay: true,
        history: [...state.history, `${state.displayValue}² = ${squared}`],
        lastActivityTime: Date.now(),
      };
      
    case 'SQUARE_ROOT':
      const sqrtValue = Math.sqrt(parseFloat(state.displayValue)).toString();
      return {
        ...state,
        displayValue: sqrtValue,
        resetDisplay: true,
        history: [...state.history, `√${state.displayValue} = ${sqrtValue}`],
        lastActivityTime: Date.now(),
      };
      
    case 'PERCENTAGE':
      const percentValue = (parseFloat(state.displayValue) / 100).toString();
      return {
        ...state,
        displayValue: percentValue,
        resetDisplay: true,
        lastActivityTime: Date.now(),
      };
      
    case 'TOGGLE_SIGN':
      return {
        ...state,
        displayValue: (parseFloat(state.displayValue) * -1).toString(),
        lastActivityTime: Date.now(),
      };
      
    case 'UPDATE_EMOTION':
      return {
        ...state,
        emotion: action.emotion,
        emotionMessage: action.message,
      };
      
    case 'RECORD_ACTIVITY':
      return {
        ...state,
        lastActivityTime: Date.now(),
      };
      
    default:
      return state;
  }
}

// 계산 함수
function evaluate(state: CalculatorState): string {
  const prev = parseFloat(state.previousValue || '0');
  const current = parseFloat(state.displayValue);
  
  let computation = 0;
  switch (state.operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      return state.displayValue;
  }
  
  return computation.toString();
}

// 컨텍스트 생성
type CalculatorContextType = {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// 컨텍스트 프로바이더
export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}

// 커스텀 훅
export function useCalculatorContext() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculatorContext must be used within a CalculatorProvider');
  }
  return context;
} 