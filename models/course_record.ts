export interface CourseRecord {
  collection: 'course';

  version: number;

  sid: number;
  cid: number;
  stype: number;
  score: number;
  exscore: number;
  clear: number;
  grade: number;
  rate: number;
  count: number;
}
