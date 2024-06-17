import { Difficulty, Rank, ClearKind } from '../models/score'

export interface RivalWorld {
  collection: "rival3";

  slot: number;
  rivalCode: number;
}

export interface ScoreWorld {
  collection: "score3";

  songId: number;
  style: number;
  difficulty: Difficulty;
  rank: Rank;
  clearKind: ClearKind;
  score: number;
  exScore: number;
  maxCombo: number;
  flareForce: number;
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
  
  

  singleGrade?: number;
  doubleGrade?: number;

  events?: {};

  usergamedata?: {
    COMMON?: {
      strdata?: string;
      bindata?: string;
    };
    OPTION?: {
      strdata?: string;
      bindata?: string;
    };
    LAST?: {
      strdata?: string;
      bindata?: string;
    };
    RIVAL?: {
      strdata?: string;
      bindata?: string;
    };
  };
}
