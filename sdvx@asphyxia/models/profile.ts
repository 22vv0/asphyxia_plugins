export interface Profile {
  collection: 'profile';

  pluginVer: number;

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
  blasterCount: number;

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
}
