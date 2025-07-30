
export type Dichotomy = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  text: string;
  options: [
    { text: string; value: Dichotomy },
    { text: string; value: Dichotomy }
  ];
}

export type MBTIType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export interface ResultData {
  title: string;
  description: string;
  keywords: string[];
  studyTips: string[];
}
