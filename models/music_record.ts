export interface MusicRecord {
  collection: 'music';

  version: number;
  dbver: number;

  mid: number;
  type: number;
  score: number;
  exscore: number;
  volforce: number;
  clear: number;
  grade: number;
  buttonRate: number;
  longRate: number;
  volRate: number;
  playCount: number;

  maxChain: number;
  critical: number;
  near: number;
  error: number;
  effectiveRate: number;
}
