import { EmotionType } from '../context/CalculatorContext';

// 감정 업데이트 함수 타입
type EmotionUpdate = {
  emotion: EmotionType;
  message: string;
};

// 감정 엔진 클래스
export class EmotionEngine {
  // 연속 연산 횟수에 따른 감정 업데이트
  static getEmotionFromOperations(consecutiveOperations: number): EmotionUpdate {
    if (consecutiveOperations > 10) {
      return {
        emotion: 'tired',
        message: '너무 많은 연산을 하고 있어요... 잠시 쉬어야 할 것 같아요... 😵‍💫',
      };
    } else if (consecutiveOperations > 5) {
      return {
        emotion: 'confused',
        message: '복잡한 계산을 하고 계시네요! 제가 따라가기 어려워요... 🤔',
      };
    } else if (consecutiveOperations > 3) {
      return {
        emotion: 'excited',
        message: '와! 열심히 계산하고 있네요! 🤩',
      };
    }
    
    return {
      emotion: 'neutral',
      message: '계산 중이에요!',
    };
  }
  
  // 계산 결과에 따른 감정 업데이트
  static getEmotionFromResult(result: number): EmotionUpdate {
    if (isNaN(result)) {
      return {
        emotion: 'confused',
        message: '이상한 계산이 나왔어요... 뭔가 잘못된 것 같아요! 😕',
      };
    }
    
    if (result === 0) {
      return {
        emotion: 'neutral',
        message: '결과가 0이네요! 깔끔하죠? 😊',
      };
    }
    
    if (result > 1000000) {
      return {
        emotion: 'excited',
        message: '와! 정말 큰 숫자예요! 🤯',
      };
    }
    
    if (result < 0) {
      return {
        emotion: 'sad',
        message: '음수가 나왔어요... 조금 슬퍼요 😢',
      };
    }
    
    if (Number.isInteger(result)) {
      return {
        emotion: 'happy',
        message: '깔끔한 정수 결과네요! 기분이 좋아요! 😄',
      };
    }
    
    return {
      emotion: 'neutral',
      message: '계산 완료!',
    };
  }
  
  // 비활성 시간에 따른 감정 업데이트
  static getEmotionFromInactivity(lastActivityTime: number): EmotionUpdate | null {
    const inactiveTime = Date.now() - lastActivityTime;
    const inactiveSeconds = inactiveTime / 1000;
    
    if (inactiveSeconds > 60) {
      return {
        emotion: 'sad',
        message: '저를 잊으셨나요? 외로워요... 😢',
      };
    } else if (inactiveSeconds > 30) {
      return {
        emotion: 'confused',
        message: '아직 거기 계신가요? 기다리고 있어요! 🧐',
      };
    }
    
    return null;
  }
  
  // 특별한 숫자에 대한 감정 업데이트
  static getEmotionFromSpecialNumber(value: string): EmotionUpdate | null {
    const numValue = parseFloat(value);
    
    if (value === '3.14159' || value.startsWith('3.14')) {
      return {
        emotion: 'excited',
        message: '파이(π)를 계산하고 계시네요! 수학을 좋아하시나 봐요! 🥧',
      };
    }
    
    if (value === '1.618' || value.startsWith('1.618')) {
      return {
        emotion: 'excited',
        message: '황금비율이네요! 아름다운 숫자예요! ✨',
      };
    }
    
    if (numValue === 42) {
      return {
        emotion: 'happy',
        message: '생명, 우주, 그리고 모든 것에 대한 해답을 찾으셨군요! 🌌',
      };
    }
    
    if (value === '80085' || value === '5318008') {
      return {
        emotion: 'confused',
        message: '음... 계산기로 장난치고 계신 것 같네요? 🙈',
      };
    }
    
    if (numValue === 0) {
      return {
        emotion: 'neutral',
        message: '0이네요! 새로운 시작을 의미하죠! 🌱',
      };
    }
    
    return null;
  }
  
  // 오류에 대한 감정 업데이트
  static getEmotionFromError(errorType: string): EmotionUpdate {
    switch (errorType) {
      case 'division-by-zero':
        return {
          emotion: 'confused',
          message: '0으로 나눌 수 없어요! 수학적으로 불가능해요! 😱',
        };
      case 'overflow':
        return {
          emotion: 'tired',
          message: '숫자가 너무 커서 표현할 수 없어요... 힘들어요... 💥',
        };
      default:
        return {
          emotion: 'sad',
          message: '뭔가 잘못됐어요... 미안해요! 😔',
        };
    }
  }
} 