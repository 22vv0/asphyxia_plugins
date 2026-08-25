import {Counter} from './models/counter';

// Songs rated down from EG => NBL. Used for on the fly VF calculation
var levelDifOverride = [
  { mid: 1, type: 1, lvl: 10 }, { mid: 18, type: 1, lvl: 8 }, { mid: 18, type: 2, lvl: 10 },
  { mid: 73, type: 2, lvl: 17 }, { mid: 48, type: 1, lvl: 8 }, { mid: 75, type: 2, lvl: 12 },
  { mid: 124, type: 2, lvl: 16 }, { mid: 65, type: 1, lvl: 7 }, { mid: 66, type: 1, lvl: 8 },
  { mid: 27, type: 1, lvl: 7 }, { mid: 27, type: 2, lvl: 12 }, { mid: 68, type: 1, lvl: 9 },
  { mid: 6, type: 1, lvl: 7 }, { mid: 6, type: 2, lvl: 12 }, { mid: 16, type: 1, lvl: 7 },
  { mid: 2, type: 1, lvl: 10 }, { mid: 60, type: 3, lvl: 17 }, { mid: 5, type: 2, lvl: 13 },
  { mid: 128, type: 2, lvl: 13 }, { mid: 9, type: 2, lvl: 1 }, { mid: 340, type: 2, lvl: 13 },
  { mid: 247, type: 3, lvl: 18 }, { mid: 282, type: 2, lvl: 17 }, { mid: 288, type: 2, lvl: 13 },
  { mid: 699, type: 3, lvl: 18 }, { mid: 595, type: 2, lvl: 17 }, { mid: 507, type: 2, lvl: 17 }, 
  { mid: 1044, type: 2, lvl: 16 }, { mid: 948, type: 4, lvl: 16 }, { mid: 1115, type: 4, lvl: 16 },
  { mid: 1215, type: 2, lvl: 15 }, { mid: 1152, type: 2, lvl: 15 }, { mid: 1282, type: 3, lvl: 17.5 },
  { mid: 1343, type: 2, lvl: 16 }, { mid: 1300, type: 3, lvl: 17.5 }, { mid: 1938, type: 2, lvl: 18 }
]

export function IDToCode(id: number) {
  const padded = _.padStart(id.toString(), 8);
  return `${padded.slice(0, 4)}-${padded.slice(4)}`;
}

export async function GetCounter(key: string) {
  await DB.Upsert<Counter>(
    { collection: 'counter', key },
    { $inc: { value: 1 } }
  )
  return (await DB.FindOne<Counter>({collection: 'counter', key})).value
}

export function getVersion(info: EamuseInfo) {
  const dateCode = parseInt(info.model.split(":")[4]);
  if (dateCode <= 2013052900) return 1;
  if (dateCode <= 2014112000) return 2;
  if (dateCode <= 2016121900) return 3;
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

export function convertGWHHGrade(score) {
  let grade = 0
  if(score < 6500000) grade = 1
  if(score >= 6500000) grade = 2
  if(score >= 7500000) grade = 3
  if(score >= 8700000) grade = 4
  if(score >= 9000000) grade = 5
  if(score >= 9300000) grade = 6
  if(score >= 9500000) grade = 7
  if(score >= 9700000) grade = 8
  if(score >= 9800000) grade = 9
  if(score >= 9900000) grade = 10
  return grade
}

export function computeForce(version, rec, songData) {
  const medalCoef = [0, 0.50, 1.0, 1.02, 1.04, 1.05, 1.10]
  const gradeCoef = [0, 0.8, 0.82, 0.85, 0.88, 0.91, 0.94, 0.97, 1.0, 1.02, 1.05]
  if(version === 7) medalCoef[5] = 1.06
  const diffName = ['novice', 'advanced', 'exhaust', 'infinite', 'maximum', 'ultimate']
  const egClear = [0, 1, 2, 3, 6, 4, 5]

  let clear = rec.clear
  if(version === 6) clear = egClear.indexOf(clear)

  let diffLevel = parseInt(songData['difficulty'][6][diffName[rec.type]])
  let lvOverride = levelDifOverride.findIndex(d => d.mid === rec.mid && d.type === rec.type)
  if(lvOverride >= 0) diffLevel = levelDifOverride[lvOverride].lvl
  return Math.floor(diffLevel * (rec.score / 10000000) * (gradeCoef[rec.grade]) * (medalCoef[clear]) * 20)
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
    "69bb5ab5_75b7e8": 20260324,
    "69ccbc0e_75b838": 20260407,
    "69e097b6_770498": 20260421,
    "69fd4402_772268": 20260512,
    "6a179570_77f988": 20260602,
    "6a29084b_78a6c8": 20260615,
    "6a3c9c77_8aab48": 20260630,
    "6a4b3e8a_8ab548": 20260707,
    "6a4f1ee9_79ef18": 20260714
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

export function getYMDDate(date) { 
  return parseInt([date.getFullYear(), ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1), (date.getDate() > 9 ? '' : '0') + date.getDate()].join(''))
}
