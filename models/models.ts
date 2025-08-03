export interface Profile {
  collection: 'profile';

  profileId: string;
  name: string;
  tutorial: number;
  areaId: number;
  useNavi: number;
  readNews: number;
  staff: number;
  itemType: number;
  itemId: number;
  isConv: number;
  activeFriends: number;
  totalPlayCount: number;
  todayPlayCount: number;
  consecutiveDays: number;
  totalDays: number;
  intervalDay: number;
  myBest: number;
  latestMusic: numbers;
  nice: numbers;
  favoriteChara: numbers;
  specialArea: numbers;
  chocolateCharalist: numbers;
  chocolateSPChara: number;
  chocolatePassCnt: number;
  chocolateHonCnt: number;
  chocolateGiriCnt: number;
  chocolateKokyuCnt: number;
  teacherSetting: numbers;
  licenseData: numbers;
  welcomePack: boolean;
  rankingNode: number;
  charaRankingKindId: number;
  naviEvolutionFlg: number;
  rankingNewsLastNo: number;
  powerPoint: number;
  playerPoint: number;
  powerPointList: numbers;
  spRiddlesId: number;
  optionTuto: boolean;
  extraPlay: number;
}

export interface Option {
  collection: 'option';
  musicNum: number;
  sheetNum: number;

  hispeed: number;
  popkun: number;
  hidden: boolean;
  hiddenRate: number;
  sudden: boolean;
  suddenRate: number;
  randMir: number;
  gaugeType: number;
  ojama1: number;
  ojama2: number;
  forever1: boolean;
  forever2: boolean;
  fullSetting: boolean;
  judge: number;
  guideSE: number;
  guideSEVolume: number;
  lift: boolean;
  liftRate: number;
}

export interface Config {
  collection: 'config';

  mode: number;
  chara: number;
  music: number;
  sheet: number;
  category: number;
  subCategory: number;
  charaCategory: number;
  courseId: number;
  courseFolder: number;
  msBannerDisp: number;
  msDownInfo: number;
  msSideInfo: number;
  msRaiseType: number;
  msRndType: number;
  bannerSort: number;
}

export interface Score {
  collection: 'score';
  musicNum: number;
  sheetNum: number;

  clearType: number;
  clearRank: number;
  score: number;
}

export interface CharaParam {
  collection: 'charaparam';

  charaId: number;
  friendship: number;
}

export interface Customize {
  collection: 'customize';

  effectLeft: number;
  effectCenter: number;
  effectRight: number;
  hukidashi: number;
  comment1: number;
  comment2: number;
}