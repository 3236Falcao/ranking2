// src/types.ts
export interface Grade {
  portugues: number;
  matematica: number;
  historia: number;
  ciencias: number;
  geografia: number;
  ensinoReligioso: number;
}

export interface Student {
  id: number;
  name: string;
  class: string;
  grades: Grade;
  effortPoints: number;
}

export interface RankedStudent extends Student {
  totalScore: number;
  avgGrade: number;
  finalScore: number;
}

export interface Suggestion {
  id: number;
  type: 'improvement' | 'new_feature';
  description: string;
  status: 'pending' | 'approved';
}