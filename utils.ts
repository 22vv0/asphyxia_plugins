import {Counter} from './models/counter';

export function IDToCode(id: number) {
  const padded = _.padStart(id.toString(), 8);
  return `${padded.slice(0, 4)}-${padded.slice(4)}`;
}

export async function GetCounter(key: string) {
  return (
    await DB.Upsert<Counter>(
      { collection: 'counter', key: 'mix' },
      { $inc: { value: 1 } }
    )
  ).docs[0].value;
}

export function getVersion(info: EamuseInfo) {
  const dateCode = parseInt(info.model.split(":")[4]);
  if (dateCode <= 2013052900) return 1;
  if (dateCode <= 2014112000) return 2;
  if (dateCode <= 2016121200) return 3;
  if (info.method.startsWith('sv4')) return 4;
  if (info.method.startsWith('sv5')) return 5;
  if (dateCode <= 2021082400) return 6;
  if (dateCode <= 2025121900) return -6;
  if (dateCode >= 2025122400) return 7;
  return 0;
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function computeForce(diff, score, medal, grade) { // computing force with EG values
  const medalCoef = [0, 0.50, 1.0, 1.02, 1.04, 1.05, 1.10]
  const gradeCoef = [0, 0.8, 0.82, 0.85, 0.88, 0.91, 0.94, 0.97, 1.0, 1.02, 1.05]
  return Math.floor(diff * (score / 10000000) * (gradeCoef[grade]) * (medalCoef[medal]) * 20)
}

export function checkVerStart(gameVersion, checkVersion, checkStart, dateObj) {
  if(checkStart === 0) return true 
  let startYr = checkStart.toString().slice(0,4) 
  let startMo = checkStart.toString().slice(4,6) 
  let startDa = checkStart.toString().slice(6,8)
  let checkStartUTC = new Date(startYr + '-' + startMo + '-' + startDa +'T00:00:00Z')

  if (gameVersion < checkVersion) return false
  if (dateObj.getTime() < checkStartUTC.getTime()) return false
  return true
}

export async function getDateCodeInit() {
  // based on get_identifier from sp2xpatcher's find_sp2x_patches
  // https://github.com/pinapelz/sp2xpatcher/blob/1b69d4f1abedbfe5ee6f56865504dd37e8568785/find_sp2x_patches/find_sp2x_patches.py#L212-L241
  const dateCodes = {
    "69318a20_74de58": 20251209,
    "694a2601_743f28": 20251224,
    "694cd6fa_743f38": 20251226,
    "695f6ac9_7449d8": 20260113,
    "6970d404_7463f8": 20260127,
    "697c025d_751898": 20260203,
    "698e6863_753ba8": 20260217,
    "69a00a63_7551f8": 20260303,
    "69bb5ab5_75b7e8": 20260324
  }
  let bufOffset = 60
  let gameDir = U.GetConfig('sdvx_eg_root_dir')
  if(gameDir != "" && IO.Exists(gameDir + '/modules/soundvoltex.dll')) {
    let dll = await IO.ReadFile(gameDir + '/modules/soundvoltex.dll', {flag: 'r'})
    let hdrOffset = dll.readUInt32LE(bufOffset)
    let hdr = dll.readUInt32BE(hdrOffset).toString(16).toUpperCase()
    if (hdr !== '50450000') return false
    let opt = hdrOffset + 24
    let epoint = dll.readUInt32LE(hdrOffset + 8).toString(16) + "_" + dll.readUInt32LE(opt + 16).toString(16)
    if(!(epoint in dateCodes)) return false
    return dateCodes[epoint]
  }
  return false
}