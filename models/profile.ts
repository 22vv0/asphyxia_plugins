export interface Profile {
  collection: 'profile';

  pluginVer: number;
  version: number;
  dbver: number;
  datecode: number;

  id: number;
  name: string;
  appeal: number;
  akaname: number;

  packets: number;
  blocks: number;

  expPoint: number;
  mUserCnt: number;

  musicID: number;
  musicType: number;
  sortType: number;
  headphone: number;
  blasterEnergy: number;

  hiSpeed: number;
  laneSpeed: number;
  gaugeOption: number;
  arsOption: number;
  notesOption: number;
  earlyLateDisp: number;
  drawAdjust: number;
  effCLeft: number;
  effCRight: number;
  narrowDown: number;

  boothFrame: number[];

  playCount: number;
  dayCount: number;
  todayCount: number;
  playchain: number;
  maxPlayChain: number;
  weekCount: number;
  weekPlayCount: number;
  weekChain: number;
  maxWeekChain: number;

  bplSupport: number;
  creatorItem: number;
}
