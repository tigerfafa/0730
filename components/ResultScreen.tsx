
import React, { useState, useCallback } from 'react';
import type { MBTIType } from '../types';
import { resultsData } from '../data/resultsData';
import PrimaryButton from './common/PrimaryButton';
import { GoogleGenAI } from '@google/genai';

interface ResultScreenProps {
  result: MBTIType;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  const [subject, setSubject] = useState('');
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const data = resultsData[result];

  const handleGeneratePlan = useCallback(async () => {
    if (!subject.trim()) {
      setError('알고 싶은 학습 과목을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');
    setPlan('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `당신은 MBTI 유형에 따른 학습법 전문가입니다. 학습 유형이 '${result} (${data.title})'인 사람을 위해, '${subject}' 과목에 대한 맞춤형 학습 계획을 세워주세요. 다음 내용을 포함하여 한국어로 답변해주세요:

1.  **학습 개요**: ${result} 유형의 학습자가 이 과목에 어떻게 접근하면 좋은지에 대한 간단한 소개.
2.  **핵심 학습 전략**: 2-3가지의 구체적이고 실천 가능한 학습 팁.
3.  **주간 학습 예시**: 실천할 수 있는 간단한 주간 계획표 예시.

결과는 마크다운 형식을 사용해서 목록과 굵은 글씨를 표현해주세요.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setPlan(response.text);

    } catch (e) {
      console.error(e);
      setError('AI 플랜을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [subject, result, data.title]);


  if (!data) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">오류!</h2>
        <p className="text-lg mb-8">결과를 불러올 수 없습니다. 다시 시도해주세요.</p>
        <PrimaryButton onClick={onRestart}>다시 시작</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg">
      <div className="text-center">
        <p className="text-lg text-slate-500">당신의 학습 유형은...</p>
        <h1 className="text-5xl sm:text-6xl font-bold text-[#A7C7E7] my-3">
          {result}
        </h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">"{data.title}"</h2>
        <div className="flex flex-wrap justify-center gap-2 my-4">
          {data.keywords.map((keyword) => (
            <span key={keyword} className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="my-8">
        <p className="text-lg text-slate-600 leading-relaxed text-center">{data.description}</p>
      </div>

      <div className="my-8 p-6 bg-slate-50 rounded-lg">
        <h3 className="text-xl font-bold text-slate-700 mb-4 text-center">
          - 추천 학습 전략 -
        </h3>
        <ul className="space-y-3">
          {data.studyTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-sky-500 mr-3 font-bold">✓</span>
              <span className="text-slate-600">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-10 pt-8 border-t-2 border-slate-200">
        <div className="text-center">
            <h3 className="text-2xl font-bold text-[#A7C7E7] mb-2">AI 맞춤 학습 플래너</h3>
            <p className="text-slate-600 mb-6">궁금한 과목을 입력하고 나만의 학습 계획을 받아보세요!</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="예: 파이썬 프로그래밍, 세계사"
            className="flex-grow p-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-[#A7C7E7] focus:border-transparent focus:outline-none transition"
          />
          <PrimaryButton onClick={handleGeneratePlan} isLoading={isLoading}>
            AI 플랜 생성
          </PrimaryButton>
        </div>
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        {plan && (
          <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
             <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed font-sans">{plan}</pre>
          </div>
        )}
      </div>


      <div className="text-center mt-12">
        <PrimaryButton onClick={onRestart}>
          다시 진단하기
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ResultScreen;
