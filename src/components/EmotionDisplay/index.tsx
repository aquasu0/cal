import React from 'react';
import Image from 'next/image';
import { EmotionType } from '../../context/CalculatorContext';

type EmotionDisplayProps = {
  emotion: EmotionType;
  message: string;
};

const EmotionDisplay: React.FC<EmotionDisplayProps> = ({ emotion, message }) => {
  const getEmotionImage = () => {
    switch (emotion) {
      case 'happy':
        return '/emotions/happy.svg';
      case 'sad':
        return '/emotions/sad.svg';
      case 'confused':
        return '/emotions/confused.svg';
      case 'tired':
        return '/emotions/tired.svg';
      case 'excited':
        return '/emotions/excited.svg';
      default:
        return '/emotions/neutral.svg';
    }
  };
  
  const getEmotionColor = () => {
    switch (emotion) {
      case 'happy':
        return 'bg-yellow-100 border-yellow-300';
      case 'sad':
        return 'bg-blue-100 border-blue-300';
      case 'confused':
        return 'bg-purple-100 border-purple-300';
      case 'tired':
        return 'bg-gray-100 border-gray-300';
      case 'excited':
        return 'bg-pink-100 border-pink-300';
      default:
        return 'bg-green-100 border-green-300';
    }
  };
  
  return (
    <div className={`p-4 rounded-lg border-2 ${getEmotionColor()} mb-4 flex items-center`}>
      <div className="w-12 h-12 relative mr-3 emotion-icon">
        <Image
          src={getEmotionImage()}
          alt={emotion}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};

export default EmotionDisplay; 