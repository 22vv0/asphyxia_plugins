import { Difficulty, Rank, ClearKind } from '../models/score'

export interface RivalWorld {
  collection: "rival3";

  slot: number;
  rivalCode: number;
}

export interface ScoreWorld {
  collection: "score3";

  scoreId: number;
  songId: number;
  style: number;
  difficulty: Difficulty;
  ghostId: number;
  rank: Rank;
  clearKind: ClearKind;
  score: number;
  exScore: number;
  maxCombo: number;
  flareForce: number;
}

export interface HiScoreWorld {
  collection: "hiscore3";

  slot: number;
  country: string;
  region: string;
  customerCode: string;
  companyCode: string;
  locationId: string;
  pcbid: string;
  songId: number;
  style: number;
  difficulty: number;
  dancerName: string;
  score: number;
  ghostId: number;
}

export interface GhostWorld {
  collection: "ghost3"

  ghostId: number;
  ghostSize: number;
  ghost: string;
}

export interface EventWorld {
  collection: "event3";

  eventId: number;
  eventNo: number;
  eventType: number;
  compTime: number;
  saveData: number;
}

export interface LeagueWorld {
  collection: "league3";

  id: number;
  class: number;
  score: number;
  rankNum: number;
  playCount: number;
  ended: boolean;
}

export interface LeagueResultWorld {
  collection: "leagueresult3";

  id: number;
  class: number;
  promoteRank: number;
  promoteScore: number;
  demoteRank: number;
  demoteScore: number;
  joinNum: number;
  ended: boolean;
}

export interface CustomizeWorld {
  collection: "customize3";

  category: number;
  key: number;
  pattern: number;
}

export interface ProfileWorld {
  collection: "profile3";

  ddrCode: number;
  dancerName: string;
  area: number;
  extraStar: number;
  playCount: number;
  weight: number;
  todayCal: number;
  isDispWeight: boolean;
  prePlayableNum: number;

  opHispeed: number;
  opGauge: number;
  opFastSlow: number;
  opGuideline: number;
  opStepZone: number;
  opTimingDisp: number;
  opVisibility: number;
  opVisibleTime: number;
  opLane: number;
  opLaneHiddenPos: number;
  opLaneSuddenPos: number;
  opLaneHidSudPos: number;
  opLaneFilter: number;
  opScrollDirection: number;
  opScrollMoving: number;
  opArrowPriority: number;
  opArrowPlacement: number;
  opArrowColor: number;
  opArrowDesign: number;
  opCutTiming: number;
  opCutFreeze: number;
  opCutJump: number;
  
  lpMode: number;
  lpFolder: number;
  lpMcode: number;
  lpStyle: number;
  lpDifficulty: number;
  lpWindowMain: number;
  lpWindowSub: number;
  lpTarget: number;
  lpTabMain: number;
  lpTabSub: number;
  
  fsTitle: number;
  fsVersion: number;
  fsGenre: number;
  fsBpm: number;
  fsEvent: number;
  fsLevel: number;
  fsFlareRank: number;
  fsClearRank: number;
  fsFlareSkillTarget: number;
  fsRivalFlareSkill: number;
  fsRivalScoreRank: number;
  fsSortType: number;
  fsOrderType: number;
  
  cgTipsBasic: number;
  cgTipsOption: number;
  cgTipsEvent: number;
  cgTipsGimmick: number;
  cgTipsAdvance: number;
  cgGuideScene: number;
}
