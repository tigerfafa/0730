
import React from 'react';
import PrimaryButton from './common/PrimaryButton';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105 duration-300">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#A7C7E7] mb-4">
        AI 학습 유형 진단
      </h1>
      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
        당신의 숨겨진 학습 스타일을 찾아보세요! <br />
        몇 가지 질문에 답하고 나에게 꼭 맞는 학습 전략을 확인하세요.
      </p>
      <PrimaryButton onClick={onStart} className="text-lg">
        진단 시작하기
      </PrimaryButton>
    </div>
  );
};

export default StartScreen;
