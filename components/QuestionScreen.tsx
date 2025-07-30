
import React from 'react';
import type { Question, Dichotomy } from '../types';
import ProgressBar from './ProgressBar';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: Dichotomy) => void;
}

const AnswerButton: React.FC<{text: string, onClick: () => void}> = ({text, onClick}) => (
    <button 
        onClick={onClick}
        className="w-full text-left text-lg bg-slate-50 border-2 border-slate-200 rounded-lg hover:bg-[#A7C7E7] hover:border-[#A7C7E7] hover:text-white p-4 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#A7C7E7] transform hover:scale-105"
    >
        {text}
    </button>
)

const QuestionScreen: React.FC<QuestionScreenProps> = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  return (
    <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg">
      <div className="mb-6">
        <p className="text-right text-sm mb-2 text-slate-500">
          {questionNumber} / {totalQuestions}
        </p>
        <ProgressBar current={questionNumber} total={totalQuestions} />
      </div>
      <h2 className="text-2xl font-bold mb-8 text-slate-800 leading-relaxed text-center">
        {question.text}
      </h2>
      <div className="space-y-4">
        <AnswerButton 
            text={question.options[0].text} 
            onClick={() => onAnswer(question.options[0].value)} 
        />
        <AnswerButton 
            text={question.options[1].text} 
            onClick={() => onAnswer(question.options[1].value)}
        />
      </div>
    </div>
  );
};

export default QuestionScreen;
