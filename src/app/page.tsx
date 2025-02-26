'use client';

import React from 'react';
import Calculator from '../components/Calculator';
import { CalculatorProvider } from '../context/CalculatorContext';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          감정이 있는 계산기
        </h1>
        
        <CalculatorProvider>
          <Calculator />
        </CalculatorProvider>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2023 감정 계산기 - Next.js로 만들어진 감정이 있는 계산기</p>
        </footer>
      </div>
    </main>
  );
}
