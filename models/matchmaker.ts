export interface Matchmaker {
  collection: 'matchmaker';

  timestamp: number,
  c_ver: number,
  p_num: number,
  p_rest: number,
  filter: number,
  mid: number,
  sec: number,
  port: number,
  gip: number[],
  lip: number[],
  claim: number,
  entry_id: number
}
