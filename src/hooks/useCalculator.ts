import { useEffect } from 'react';
import { useCalculatorContext, EmotionType } from '../context/CalculatorContext';
import { EmotionEngine } from '../utils/emotionEngine';

export function useCalculator() {
  const { state, dispatch } = useCalculatorContext();
  
  // 숫자 입력 처리
  const appendDigit = (digit: string) => {
    dispatch({ type: 'APPEND_DIGIT', digit });
    checkSpecialNumber(state.displayValue + (state.resetDisplay ? '' : digit));
  };
  
  // 연산자 선택 처리
  const chooseOperation = (operation: string) => {
    dispatch({ type: 'CHOOSE_OPERATION', operation });
    
    // 연속 연산에 따른 감정 업데이트
    const emotionUpdate = EmotionEngine.getEmotionFromOperations(state.consecutiveOperations + 1);
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: emotionUpdate.emotion, 
      message: emotionUpdate.message 
    });
  };
  
  // 계산 실행
  const evaluate = () => {
    if (state.operation === null || state.previousValue === null) return;
    
    // 0으로 나누기 체크
    if (state.operation === '÷' && parseFloat(state.displayValue) === 0) {
      const errorEmotion = EmotionEngine.getEmotionFromError('division-by-zero');
      dispatch({ 
        type: 'UPDATE_EMOTION', 
        emotion: errorEmotion.emotion, 
        message: errorEmotion.message 
      });
      return;
    }
    
    dispatch({ type: 'EVALUATE' });
    
    // 결과에 따른 감정 업데이트
    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.displayValue);
    let result = 0;
    
    switch (state.operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷': result = prev / current; break;
    }
    
    const emotionUpdate = EmotionEngine.getEmotionFromResult(result);
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: emotionUpdate.emotion, 
      message: emotionUpdate.message 
    });
  };
  
  // 특별한 숫자 체크
  const checkSpecialNumber = (value: string) => {
    const specialEmotion = EmotionEngine.getEmotionFromSpecialNumber(value);
    if (specialEmotion) {
      dispatch({ 
        type: 'UPDATE_EMOTION', 
        emotion: specialEmotion.emotion, 
        message: specialEmotion.message 
      });
    }
  };
  
  // 모든 입력 초기화
  const clear = () => {
    dispatch({ type: 'CLEAR' });
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: 'neutral', 
      message: '모든 것이 초기화되었어요! 새로운 계산을 시작해볼까요?' 
    });
  };
  
  // 마지막 입력 삭제
  const deleteLastDigit = () => {
    dispatch({ type: 'DELETE' });
  };
  
  // 메모리 저장
  const memoryStore = () => {
    dispatch({ type: 'MEMORY_STORE' });
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: 'happy', 
      message: '메모리에 저장했어요! 잊지 않을게요! 🧠' 
    });
  };
  
  // 메모리 불러오기
  const memoryRecall = () => {
    dispatch({ type: 'MEMORY_RECALL' });
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: 'happy', 
      message: '메모리에서 불러왔어요! 기억력이 좋죠? 😉' 
    });
  };
  
  // 메모리 초기화
  const memoryClear = () => {
    dispatch({ type: 'MEMORY_CLEAR' });
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: 'neutral', 
      message: '메모리를 지웠어요! 깨끗해졌네요.' 
    });
  };
  
  // 제곱 계산
  const square = () => {
    dispatch({ type: 'SQUARE' });
    const result = parseFloat(state.displayValue) ** 2;
    const emotionUpdate = EmotionEngine.getEmotionFromResult(result);
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: emotionUpdate.emotion, 
      message: emotionUpdate.message 
    });
  };
  
  // 제곱근 계산
  const squareRoot = () => {
    if (parseFloat(state.displayValue) < 0) {
      dispatch({ 
        type: 'UPDATE_EMOTION', 
        emotion: 'confused', 
        message: '음수의 제곱근은 계산할 수 없어요! 복소수는 아직 못 배웠어요... 😅' 
      });
      return;
    }
    
    dispatch({ type: 'SQUARE_ROOT' });
    const result = Math.sqrt(parseFloat(state.displayValue));
    const emotionUpdate = EmotionEngine.getEmotionFromResult(result);
    dispatch({ 
      type: 'UPDATE_EMOTION', 
      emotion: emotionUpdate.emotion, 
      message: emotionUpdate.message 
    });
  };
  
  // 백분율 계산
  const percentage = () => {
    dispatch({ type: 'PERCENTAGE' });
  };
  
  // 부호 변경
  const toggleSign = () => {
    dispatch({ type: 'TOGGLE_SIGN' });
  };
  
  // 비활성 시간 체크를 위한 효과
  useEffect(() => {
    const inactivityInterval = setInterval(() => {
      const emotionUpdate = EmotionEngine.getEmotionFromInactivity(state.lastActivityTime);
      if (emotionUpdate) {
        dispatch({ 
          type: 'UPDATE_EMOTION', 
          emotion: emotionUpdate.emotion, 
          message: emotionUpdate.message 
        });
      }
    }, 10000); // 10초마다 체크
    
    return () => clearInterval(inactivityInterval);
  }, [state.lastActivityTime, dispatch]);
  
  // 키보드 이벤트 처리를 위한 효과
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      dispatch({ type: 'RECORD_ACTIVITY' });
      
      if (e.key >= '0' && e.key <= '9') {
        appendDigit(e.key);
      } else if (e.key === '.') {
        appendDigit('.');
      } else if (e.key === '+') {
        chooseOperation('+');
      } else if (e.key === '-') {
        chooseOperation('-');
      } else if (e.key === '*') {
        chooseOperation('×');
      } else if (e.key === '/') {
        chooseOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        evaluate();
      } else if (e.key === 'Escape') {
        clear();
      } else if (e.key === 'Backspace') {
        deleteLastDigit();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]);
  
  return {
    displayValue: state.displayValue,
    previousValue: state.previousValue,
    operation: state.operation,
    history: state.history,
    emotion: state.emotion,
    emotionMessage: state.emotionMessage,
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
  };
} 