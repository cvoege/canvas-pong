import { Color } from './Color';

export interface Score {
  value: number;
  color: Color;
  font: string;
  x: number;
  y: number;
}

export interface Scores {
  paddle1: Score;
  paddle2: Score;
}
