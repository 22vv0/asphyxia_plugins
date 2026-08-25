export interface Arena {
  collection: 'arena';

  version: number;

  last_play_season: number;
  rank_point: number;
  shop_point: number;
  ultimate_rate: number;
  megamix_rate: number;
  rank_play_cnt: number;
  ultimate_play_cnt: number;
}

export interface Volfes {
  collection: 'volfes';
  version: number;

  id: number;
  liveEnergy: number;
  bonus: any[];
}