export interface WeeklyMusicScore {
  collection: 'weeklymusicscore';

  version: number;
  
  week: number,
  mid: number,
  mtype: number,
  exscore: number,
  name: string,
  playCount: number,
  hiscoreCount: number
}
