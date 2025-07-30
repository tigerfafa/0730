
import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { questions } from './data/questions';
import type { Dichotomy, MBTIType } from './types';

type Screen = 'start' | 'question' | 'result';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [result, setResult] = useState<MBTIType | null>(null);

  const handleStart = useCallback(() => {
    setScreen('question');
  }, []);

  const handleAnswer = useCallback((dichotomy: Dichotomy) => {
    const newScores = {
      ...scores,
      [dichotomy]: scores[dichotomy] + 1,
    };
    setScores(newScores);


    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Calculate result with the final score
      const mbtiResult: MBTIType = [
        newScores.E >= newScores.I ? 'E' : 'I',
        newScores.S >= newScores.N ? 'S' : 'N',
        newScores.T >= newScores.F ? 'T' : 'F',
        newScores.J >= newScores.P ? 'P' : 'J',
      ].join('') as MBTIType;

      setResult(mbtiResult);
      setScreen('result');
    }
  }, [currentQuestionIndex, scores]);

  const handleRestart = useCallback(() => {
    setScreen('start');
    setCurrentQuestionIndex(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setResult(null);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'question':
        return (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        );
      case 'result':
        return result ? <ResultScreen result={result} onRestart={handleRestart} /> : null;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-[#F0F4F8] text-[#334155] min-h-screen flex flex-col p-4">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          {renderScreen()}
        </div>
      </main>
      <footer className="text-center text-slate-500 text-sm py-4">
        © 2025 이승진
      </footer>
    </div>
  );
};

export default App;
