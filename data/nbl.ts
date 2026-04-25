import { LICENSED_SONGS6, MEGAMIX_SONGS, MEGAMIX_SONGS_2, MEGAMIX_SONGS_3, MEGAMIX_SONGS_4, UNLOCK_EVENTS6 } from './exg'

export const EVENT7 = [
  'DEMOGAME_PLAY',
  'MATCHING_MODE',
  'MATCHING_MODE_FREE_IP',
  'LEVEL_LIMIT_EASING',
  'ACHIEVEMENT_ENABLE',
  'VOLFORCE_ENABLE',
  'AKANAME_ENABLE',
  'PAUSE_ONLINEUPDATE',
  'CONTINUATION',
  'TENKAICHI_MODE',
  'QC_MODE',
  'KAC_MODE',
  'DISABLE_MONITOR_ID_CHECK',
  'FAVORITE_APPEALCARD_MAX\t200',
  'FAVORITE_MUSIC_MAX\t200',
  'STANDARD_UNLOCK_ENABLE',
  'PLAYERJUDGEADJ_ENABLE',
  'MIXID_INPUT_ENABLE',
  'DISP_PASELI_BANNER',
  'CHARACTER_IGNORE_DISABLE\t122,123,131,139,140,143,149,160,162,163,164,167,170,174,175,179,183',
  'STAMP_IGNORE_DISABLE\t273~312,773~820,993~1032,1245~1284,1469~1508,1585~1632,1633~1672,1737~1776,1777~1816,1897~1936,1937~1976,2177~2216,2257~2296',
  'SUBBG_IGNORE_DISABLE\t166~185,281~346,369~381,419~438,464~482,515~552,595~616,660~673,714~727,728~741,782~795,843~861',
  'NAMEPLATE_BADGE_IGNORE_DISABLE\t141~143,148~149,152~153,156~157,160~161,164~165,176~177',
  'BEGINNER_MUSIC_FOLDER\t56,78,80,86,87,91,111,128,134,275,278,180,697,770,769,779,842,948,940,1057,1056,1096,932,1136,1469,1480',
  'BEGINNER_MUSIC_FOLDER\t1471,1758,1753,1739,1867,1866,1860,1857,1903,1904,1859,1863,1856,1864,1865,1916,1917,1914,1915,1918,1960',
  'BEGINNER_MUSIC_FOLDER\t1961,1962,2029,2028,2030,2031,2035,2036,1905,1882,2058,2073,2070,2069,2074,2075,2067,2068,2066,2165,2166',
  'BEGINNER_MUSIC_FOLDER\t2174,2175,2193,2195,2196,2213,2216,2214,2215,2205,2206,2224,2229,2228,2230,2241,2244,2243,2242,2245,2240',
  'BEGINNER_MUSIC_FOLDER\t2251,2252,2220,2221,2289,2288,2291,2287,2290,2343,2344,2348,2353,2352,2345,2234,2351,2350,2209,2354',
  // 'SKILL_ANALYZER_ABLE',
  'BLASTER_ABLE',
  'PREMIUM_TIME_ENABLE',
  'MEGAMIX_ENABLE',
  'ARENA_ENABLE',
  'ARENA_LOCAL_TO_ONLINE_ENABLE',
  'ARENA_ALTER_MODE_WINDOW_ENABLE',
  'ARENA_PASS_MATCH_WINDOW_ENABLE',
  'ARENA_VOTE_MODE_ENABLE',
  'ARENA_LOCAL_ULTIMATE_MATCH_ALWAYS',
  'ULTIMATE_MATCH_PLAYABLE_ALWAYS',
  'MEGAMIX_BATTLE_MATCH_ENABLE',
  'DISABLED_MUSIC_IN_ARENA_ONLINE',
  'SINGLE_BATTLE_ENABLE',
  'CREW_SELECT_ABLE',
  'VALGENE_ENABLE',
  'PLAYER_RADAR_ENABLE',
  'S_PUC_EFFECT_ENABLE',
  'FAVORITE_CREW_ENABLE',
  'OVER_POWER_ENABLE',
  'APIPAGENE_ENABLE'
]

export const BLASTER_GATE7 = [
  [
    // bpls3
    212923, 213023, 213323, 213423, 213223, 213523, 213723, 213623, 213923, 213823, 
    214023, 214123, 214223, 214323, 214623, 214523, 214423, 214723, 213123, 214823,
    214923, 212423, 212323, 216123, 216023, 212223, 212623, 215023, 212823, 215123,
    212123, 215223, 212723, 212523
  ],
  [
    // bpls2
    194323, 195223, 194823, 195123, 195623, 194923, 194623, 195823, 195523, 195723, 
    194723, 195323, 195023, 194423, 194523, 195423, 194223, 193923, 194023, 194123, 
    192123, 192223, 192623, 193823, 192023, 192523, 192323, 191923, 192423
  ],
  [
    // xcd
    13208, 63208, 8808, 33208, 87108, 808, 6408, 11108, 71108, 63308, 87208, 3708,
    38108, 34208, 23908, 32308, 13108, 61208, 61008, 41808, 18308, 46608, 78908, 
    79008, 78708, 78608, 77908, 68708, 51008, 47508, 38908, 39008, 8508, 78808, 22508, 
    28108, 83608, 16508, 84208, 34808, 28908, 24108, 63408, 6108, 63508, 

    // xcd tama
    77408, 4408, 45008, 65008, 65308, 65708, 64208, 18208, 67508
  ],
  [
    // hexa
    158523, 158623, 158723, 158123, 158223, 158323, 158023,
    158923, 159423, 159223, 159023, 159323, 159123, 158823, 158423,
    166523, 166623, 166223, 166123, 166323, 166423, 166023, 
    177623, 177423, 177523, 176823, 176923, 177023, 176623, 
    177923, 177823, 177723, 177223, 177323, 177123, 176723,
    190023, 189723, 189623, 189523, 189123, 189323, 188923,
    189823, 189923, 190123, 189223, 189023, 189423, 188823,
    204423, 205023, 204723, 204623, 203923, 204023, 203723, 
    204323, 204923, 204823, 204523, 204123, 204223, 203823,
    207923, 208023, 208123, 208223, 208323, 208423, 208523,
    209223, 209023, 208923, 209123, 208623, 208823, 208723,
    225723, 225823, 225923, 225423, 225523, 225623, 225323
  ],
  [
    // bpls5
    231423, 231523, 231623, 231723, 231823, 231923, 232023, 232123, 232223, 232323, 232423, 232523, 232623, 232723
  ],
  [
    // tamaadv
    215623, 215323, 215523, 215923, 215423, 215723, 215823, 218623, 218323, 218523, 211223, 209823, 211723, 210923,
    210023, 210723, 211523, 209423, 209723, 210623, 211623, 210823, 211023, 211323, 220423, 220023, 220323, 220223,
    220123, 219823
  ],
  [
    // puct
    196923, 197723, 197623, 197123, 197523, 197323, 197423, 197023, 197223
  ]
]

export const LICENSED_SONGS7 = LICENSED_SONGS6.concat([
  2348, 2344, 2343, 2352, 2353, 2345, 2234, 2354, 2350, 2351, 2209, 2376, 2377,
  2384, 2385, 2386, 2388, 2389, 2390, 2391
])

export const UNLOCK_EVENTS7 = {
  refillStamps: {},
  gitadorastamp: UNLOCK_EVENTS6['gitadorastamp'],
  vgate1: UNLOCK_EVENTS6['vgate1'],
  vgate2: UNLOCK_EVENTS6['vgate2'],
  bluediamond: {
    type: 'main',
    info: {
      id: 0,
      stmpHdJ: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFtJ: '[sz:22]1/8~2/11の間、ポルテを遊ぶとスタンプを獲得できます',
      stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 1/8～2/11',
      data: [
        {
          stmpid: 64,
          stps: 30,
          stprwrd: '5:e:217001 10:e:217002 15:e:217004 20:b:500 25:p:1000 30:e:217016'
        }
      ]
    }
  },
  mikustamp: {
    type: 'main',
    info: {
      id: 0,
      stmpHdJ: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFtJ: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/5～3/15',
      stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/5～3/15',
      data: [
        {
          stmpid: 68,
          stps: 15,
          stprwrd: '1:r:141 3:b:390 5:r:142 7:b:3900 10:a:6503 12:r:143 15:n:40302 req:genre:8 imgbg:bg_stamp_miku'
        }
      ]
    }
  },
  hololive7: {
    type: 'main',
    info: {
      id: 0,
      stmpHdJ: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFtJ: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/19～3/22',
      stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/19～3/22',
      data: [
        {
          stmpid: 73,
          stps: 15,
          stprwrd: '1:a:5541[p:1000] 2:r:148 4:n:40245[p:1000] 6:r:149 8:n:40246[p:1000] 10:r:150 12:n:40247[p:1000] 15:r:151 req:musicid:2069,2070,2071,2072,2073 imgbg:bg_stamp_fubuki'
        },
        {
          stmpid: 74,
          stps: 15,
          stprwrd: '1:a:5542[p:1000] 2:r:152 4:n:40248[p:1000] 6:r:153 8:n:40249[p:1000] 10:r:154 12:n:40250[p:1000] 15:r:155 req:musicid:2165,2166,2167 imgbg:bg_stamp_okayu'
        },
        {
          stmpid: 75,
          stps: 15,
          stprwrd: '1:a:5543[p:1000] 2:r:156 4:n:40251[p:1000] 6:r:157 8:n:40252[p:1000] 10:r:158 12:n:40253[p:1000] 15:r:159 req:musicid:2172,2173,2174,2175 imgbg:bg_stamp_watame'
        },
        {
          stmpid: 76,
          stps: 15,
          stprwrd: '1:a:5544[p:1000] 2:r:160 4:n:40254[p:1000] 6:r:161 8:n:40255[p:1000] 10:r:162 12:n:40256[p:1000] 15:r:163 req:musicid:1753,1754,1755,1756,1757,1758,2071,2194,2195,2196,2197 imgbg:bg_stamp_marine'
        },
        {
          stmpid: 77,
          stps: 15,
          stprwrd: '1:a:5545[p:1000] 2:r:164 4:n:40257[p:1000] 6:r:165 8:n:40258[p:1000] 10:r:166 12:n:40259[p:1000] 15:r:167 req:musicid:1755,2205,2206,2207,2208 imgbg:bg_stamp_pekora'
        }
      ]
    }
  },  
  whiteday2026: {
    type: 'main',
    info: {
      id: 0,
      stmpHdJ: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFtJ: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 3/12～3/23',
      stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 3/12～3/23',
      data: [
        {
          stmpid: 82,
          stps: 3,
          stprwrd: '1:a:6505 2:a:6506 3:a:6507 imgbg:bg_stamp_whiteday'
        }
      ]
    }
  },
  bpls5stamp: {
    type: 'select',
    info: {
      id: 7,
      textstampval: -1,
      stmpSlHd: '[sz:22][c:FFA6AA]BEMANI PRO LEAGUE -SEASON 5- スペシャルスタンプ!!',
      stmpSlFt: '[sz:23]{TextStamp}[br:5]{TextTerm} 2026/03/26～2026/05/10',
      stmpHd: '[sz:22][c:DAC491]BEMANI PRO LEAGUE -SEASON 5- スペシャルスタンプ!!',
      stmpFt: '[sz:22]ボルテを遊んでスタンプをゲット！',
      stmpBg: 'bg_stamp_bpls5',
      sheet: '83#sheet_track_2383#e#2383,84#sheet_track_2369#e#2369,85#sheet_track_2366#e#2366,86#sheet_track_2363#e#2363,87#sheet_track_2365#e#2365,88#sheet_track_2368#e#2368,89#sheet_track_2364#e#2364,90#sheet_track_2367#e#2367,91#sheet_track_2331#e#2331,92#sheet_track_2328#e#2328,93#sheet_track_2329#e#2329,94#sheet_track_2330#e#2330',
      data: [
        {
          stmpid: 83,
          stps: 10,
          stprwrd: '10:e:238323'
        },
        {
          stmpid: 84,
          stps: 10,
          stprwrd: '10:e:236923'
        },
        {
          stmpid: 85,
          stps: 10,
          stprwrd: '10:e:236623'
        },
        {
          stmpid: 86,
          stps: 10,
          stprwrd: '10:e:236323'
        },
        {
          stmpid: 87,
          stps: 10,
          stprwrd: '10:e:236523'
        },
        {
          stmpid: 88,
          stps: 10,
          stprwrd: '10:e:236823'
        },
        {
          stmpid: 89,
          stps: 10,
          stprwrd: '10:e:236423'
        },
        {
          stmpid: 90,
          stps: 10,
          stprwrd: '10:e:236723'
        },
        {
          stmpid: 91,
          stps: 15,
          stprwrd: '0:r:x83 0:r:x84 0:r:x85 0:r:x86 0:r:x87 0:r:x88 0:r:x89 0:r:x90 15:e:233123'
        },
        {
          stmpid: 92,
          stps: 15,
          stprwrd: '0:r:x83 0:r:x84 0:r:x85 0:r:x86 0:r:x87 0:r:x88 0:r:x89 0:r:x90 15:e:232823'
        },
        {
          stmpid: 93,
          stps: 15,
          stprwrd: '0:r:x83 0:r:x84 0:r:x85 0:r:x86 0:r:x87 0:r:x88 0:r:x89 0:r:x90 15:e:232923'
        },
        {
          stmpid: 94,
          stps: 30,
          stprwrd: '0:r:x91 0:r:x92 0:r:x93 30:e:233023'
        }
      ]
    }
  },
  shiranuiflare: {
    type: 'main',
    info: {
      id: 0,
      stmpHdJ: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFtJ: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 4/23～5/31',
      stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
      stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 4/23～5/31',
      data: [
        {
          stmpid: 99,
          stps: 15,
          stprwrd: '1:a:6508 2:r:176 4:n:40303 6:r:177 8:n:40304 10:r:178 12:n:40304 15:r:179 req:musicid:1757,2388,2389,2390,2391 imgbg:bg_stamp_flare'
        }
      ]
    }
  },
  nblweeklystamp: {
    type: 'main',
    info: {
      id: 0,
      stmpHdJ: '',
      stmpFtJ: '',
      stmpHd: '',
      stmpFt: '',
      data: [
        {
          stmpid: 61,
          stps: 310030,
          version: 20251224,
          start: 20251224,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]12/24~12/31の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 12/24～12/31',
          stprwrd: '1:p:1000 5:b:500 10:r:137 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 62,
          stps: 310030,
          version: 20251224,
          start: 20260101,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/1~1/7の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 1/1～1/7',
          stprwrd: '0:r:x61 1:p:1000 5:b:500 10:r:138 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 63,
          stps: 310030,
          version: 20251224,
          start: 20260108,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/8~1/14の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 1/8～1/14',
          stprwrd: '0:r:x62 1:p:1000 5:b:500 10:p:5000 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 65,
          stps: 310030,
          version: 20260113,
          start: 20260115,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/5~1/21の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 1/15～1/21',
          stprwrd: '0:r:x63 1:p:1000 5:b:500 10:r:139 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 66,
          stps: 310030,
          version: 20260113,
          start: 20260122,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/22~1/28の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 1/22～1/28',
          stprwrd: '0:r:x65 1:p:1000 5:b:500 10:r:140 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 67,
          stps: 310030,
          version: 20260113,
          start: 20260129,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/29~2/4の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 1/29～2/4',
          stprwrd: '0:r:x66 1:p:1000 5:b:500 10:p:5000 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 69,
          stps: 310030,
          version: 20260203,
          start: 20260205,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/5~1/21の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/5～2/8',
          stprwrd: '0:r:x67 1:p:1000 5:b:500 10:r:144 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 70,
          stps: 310030,
          version: 20260203,
          start: 20260209,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/22~1/28の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/9～2/15',
          stprwrd: '0:r:x69 1:p:1000 5:b:500 10:r:145 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 71,
          stps: 310030,
          version: 20260203,
          start: 20260216,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/29~2/4の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/16～2/22',
          stprwrd: '0:r:x70 1:p:1000 5:b:500 10:r:146 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 72,
          stps: 310030,
          version: 20260203,
          start: 20260223,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]1/29~2/4の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 2/23～3/1',
          stprwrd: '0:r:x71 1:p:1000 5:b:500 10:r:147 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 78,
          stps: 310030,
          version: 20260217,
          start: 20260302,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]3/2~3/8の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 3/2～3/8',
          stprwrd: '0:r:x72 1:p:1000 5:b:500 10:r:168 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 79,
          stps: 310030,
          version: 20260217,
          start: 20260309,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]3/9~3/15の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 3/9～3/15',
          stprwrd: '0:r:x78 1:p:1000 5:b:500 10:r:169 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 80,
          stps: 310030,
          version: 20260217,
          start: 20260316,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]3/16~3/22の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 3/16～3/22',
          stprwrd: '0:r:x79 1:p:1000 5:b:500 10:r:170 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 81,
          stps: 310030,
          version: 20260217,
          start: 20260323,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]3/23~3/29の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 3/23～3/29',
          stprwrd: '0:r:x80 1:p:1000 5:b:500 10:r:171 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 95,
          stps: 310030,
          version: 20260324,
          start: 20260330,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]3/30~4/5の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 3/30～4/5',
          stprwrd: '0:r:x81 1:p:1000 5:b:500 10:r:172 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 96,
          stps: 310030,
          version: 20260324,
          start: 20260406,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]4/6~4/12の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 4/6～4/12',
          stprwrd: '0:r:x95 1:p:1000 5:b:500 10:r:173 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 97,
          stps: 310030,
          version: 20260324,
          start: 20260413,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]4/13~4/19の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 4/13～4/19',
          stprwrd: '0:r:x96 1:p:1000 5:b:500 10:r:174 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 98,
          stps: 310030,
          version: 20260324,
          start: 20260420,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]4/20~4/26の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 4/20～4/26',
          stprwrd: '0:r:x97 1:p:1000 5:b:500 10:r:175 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 100,
          stps: 310030,
          version: 20260421,
          start: 20260427,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]4/27~5/3の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 4/27～5/3',
          stprwrd: '0:r:x98 1:p:1000 5:b:500 10:r:180 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 101,
          stps: 310030,
          version: 20260421,
          start: 20260504,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]5/4~5/10の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 5/4～5/10',
          stprwrd: '0:r:x100 1:p:1000 5:b:500 10:r:181 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 102,
          stps: 310030,
          version: 20260421,
          start: 20260511,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]5/11~5/17の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 5/11～5/17',
          stprwrd: '0:r:x101 1:p:1000 5:b:500 10:r:182 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 103,
          stps: 310030,
          version: 20260421,
          start: 20260518,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]5/18~5/24の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 5/18～5/24',
          stprwrd: '0:r:x102 1:p:1000 5:b:500 10:r:183 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        },
        {
          stmpid: 104,
          stps: 310030,
          version: 20260421,
          start: 20260525,
          stmpHdJ: '[sz:22][c:DAC491]▽ウィークリースタンプボーナス!',
          stmpFtJ: '[sz:22]5/25~5/31の間、ポルテを遊ぶとスタンプを獲得できます',
          stmpHd: '[sz:22][c:DAC491]SPECIAL STAMP BONUS',
          stmpFt: '[sz:22]YOU CAN GET A STAMP AND BONUS! :)[br:5]TERM: 5/25～5/31',
          stprwrd: '0:r:x103 1:p:1000 5:b:500 10:r:184 11:p:1000 15:b:500 20:p:5000 21:p:1000 25:b:500 30:p:5000'
        }
      ]
    }
  }  
}

export const EVENT_ITEMS7 = {
  "bpls5sdvx7_1": ['2318'],
  "bpls5sdvx7_2": ['2319'],
  "bpls5sdvx7_3": ['2320'],
  "bpls5sdvx7_4": ['2321'],
  "bpls5sdvx7_5": ['2322'],
  "bpls5sdvx7_6": ['2323'],
  "bpls5sdvx7_7": ['2324'],
  "bpls5sdvx7_8": ['2325'],
  "bpls5sdvx7_9": ['2326'],
  "bpls5sdvx7_10": ['2327'],
  "2026apica": ['6501'],
  "crossresonance_1": ['2231'],
  "crossresonance_2": ['2232'],
  "crossresonance_3": ['2233'],
  "crossresonance_4": ['2260'],
  "crossresonance_5": ['2261'],
  "crossresonance_6": ['2262'],
  "crossresonance_7": ['2284'],
  "crossresonance_8": ['2285'],
  "crossresonance_9": ['2286'],
  "crossresonance_10": ['2339'],
  "crossresonance_11": ['2340'],
  "crossresonance_12": ['2341'],
  "crossresonance_13": ['2370'],
  "crossresonance_14": ['2371'],
  "crossresonance_15": ['2372'],
  "bpls5apica_1": ['5547'],
  "bpls5apica_2": ['5548'],
  "bpls5apica_3": ['5549'],
  "bpls5apica_4": ['5550'],
  "bpls5apica_5": ['5551'],
  "bpls5apica_6": ['5552'],
  "bpls5apica_7": ['5553'],
  "popncheers_1": ['2357'],
  "popncheers_2": ['2356'],
  "popncheers_3": ['2355'],
  "14thannivap": ['6502'],
  "bpls5tripletribe2_1": ['2360'],
  "bpls5tripletribe2_2": ['2358'],
  "bpls5tripletribe2_3": ['2359'],
  "bpls5tripletribe2_4": ['2361'],
  "bpls5tripletribe2_5": ['2362'],
  "valentines2026": ['6504'],
  "bpls5tripletribe3_1": ['2378'],
  "bpls5tripletribe3_2": ['2380'],
  "bpls5tripletribe3_3": ['2382'],
}

// rule: 0 score 1 point 2 vote
// rank_match_target: 0 arena 1 single 2 mega
export const CURRENT_ARENA7 = {
  season: 0,
  rule: 0,
  rank_match_target: 0,
  time_start: BigInt(Date.parse('19 Dec 1900 08:00:00 GMT')),
  time_end: BigInt(Date.parse('23 Dec 1900 15:59:59 GMT')),
  shop_start: BigInt(Date.parse('19 Dec 1900 08:00:00 GMT')),
  shop_end: BigInt(Date.parse('23 Dec 1900 15:59:59 GMT'))
}

// catalog_id, catalog_type, price, item_type, item_id, param 

export const ARENA_STATION_ITEMS7 = {}

export const VALGENE7 = {
  info: [
    {
      valgene_name: "ヴァルキリージェネレーター　第18弾",
      valgene_name_english: "Valkyrie Generator Vol. 18",
      valgene_id: 19,
      version: 20210303
    },
  ],
  rarity: {
    "11": 5,
    "17": 20,
    "18": 15,
    "19": 10,
    "20": 15,
  },
  catalog: [
    {
      volume: 19,
      items: [
        {
          type: 11, // nemsys crew
          item_ids: [180, 181]
        },
        {
          type: 18, // submonitor bg
          item_ids: [796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815]
        },
        {
          type: 19, // bgm
          item_ids: [93, 94, 95, 96, 97, 98, 99, 100, 101]
        },
        {
          type: 20, // nemsys
          item_ids: [48]
        }
      ]
    },
  ]
}

export const PREGENE7 = [
  {
    id: 23,
    items: {
      crew: [178],
      stamp: [535, 536, 537, 538, 539, 540, 541, 542, 543, 544],
      subbg: [763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781]
    },
    probability: [0.05, 0.39, 0.6]
  },
  {
    id: 24,
    items: {
      crew: [179],
      stamp: [545, 546, 547, 548, 549, 550, 551, 552, 553, 554],
      subbg: [782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795]
    },
    probability: [0.05, 0.39, 0.6]
  },
  {
    id: 25,
    items: {
      crew: [182],
      stamp: [555, 556, 557, 558, 559, 560, 561, 562, 563, 564],
      subbg: [816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842],
      sysbg: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    },
    probability: [0.05, 0.42, 0.84, 0.9]
  },
  {
    id: 26,
    items: {
      crew: [183],
      stamp: [565, 566, 567, 568, 569, 570, 571, 572, 573, 574],
      subbg: [843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861]
    },
    probability: [0.05, 0.39, 0.6]
  }
]

export const APIGENE7 = {
  info: [
    {
      apigene_id: 1,
      name: 'アピールパーツジェネレーター 第1弾',
      name_english: 'APPEAL PARTS GENERATOR VOL. 1',
      common_rate: 60,
      uncommon_rate: 30,
      rare_rate: 1,
      price: 100,
      no_duplicate: false,
      version: 20251224
    }
  ],
  rarity: {
    '23': 1,
    '24': 0
  },
  catalog: [
    {
      volume: 1,
      items: [
        {
          type: 23,
          item_ids: Array.from({ length: 26 }, (_, i) => i + 1)

        },
        {
          type: 24,
          item_ids: Array.from({ length: 136 }, (_, i) => i + 1)
        }
      ]
    }
  ]
}

export const COURSES7 = []

export const INFORMATION7 = [
  { id: 45, version: 20260127, start: 20260129, str: '[img:info/260129_info_tripletribe.png:]'},
  { id: 46, version: 20260203, start: 20260205, str: '[img:info/250205_info_hatsunemiku.png:]'},
  { id: 47, version: 20260217, start: 20260219, str: '[img:info/260219_info_cross_resonance.png:]'},
  { id: 48, version: 20260324, start: 20260326, str: '[img:info/260326_info_generator.png:]'},
  { id: 49, version: 20260324, start: 20260326, str: '[img:info/260326_info_tripletribe.png:]'}
] 

export const EXTENDS7 = [
  {
    version: 20260203,
    start: 20260203,
    type: 21,
    id: 0,
    params: [
      0, 0, 0, 0, 0,
      "demo/260205_miku_demo.mp4",
      "demo/260205_miku_demo.s3v",
      "",
      "",
      ""
    ]
  },
  {
    version: 0,
    start: 0,
    id: 91,
    type: 17,
    params: [
      0, 0, 0, 0, 0,
      MEGAMIX_SONGS.join(','),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 0,
    start: 0,
    id: 92,
    type: 17,
    params: [
      0, 0, 0, 0, 0,
      MEGAMIX_SONGS_2.join(','),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 0,
    start: 0,
    id: 93,
    type: 17,
    params: [
      0, 0, 0, 0, 0,
      MEGAMIX_SONGS_3.join(','),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 0,
    start: 0,
    id: 94,
    type: 17,
    params: [
      0, 0, 0, 0, 0,
      MEGAMIX_SONGS_4.join(','),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 20251224,
    start: 20251224,
    id: 1,
    type: 18,
    params: [
      0, 0, 0, 20, 0,
      BLASTER_GATE7[0].join(' '),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 20251224,
    start: 20251224,
    id: 1,
    type: 18,
    params: [
      0, 0, 0, 20, 0,
      BLASTER_GATE7[1].join(' '),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 20251224,
    start: 20251224,
    id: 1,
    type: 18,
    params: [
      0, 0, 0, 20, 0,
      BLASTER_GATE7[2].join(' '),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 20251224,
    start: 20251224,
    id: 1,
    type: 18,
    params: [
      0, 0, 0, 20, 0,
      BLASTER_GATE7[3].join(' '),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 20251224,
    start: 20251224,
    id: 1,
    type: 18,
    params: [
      0, 0, 0, 20, 0,
      BLASTER_GATE7[4].join(' '),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 20251224,
    start: 20251224,
    id: 1,
    type: 18,
    params: [
      0, 0, 0, 20, 0,
      BLASTER_GATE7[5].join(' '),
      '',
      '',
      '',
      '',
    ],
  },
  {
    version: 20260113,
    start: 20260115,
    id: 1,
    type: 18,
    params: [
      0, 0, 0, 20, 0,
      BLASTER_GATE7[6].join(' '),
      '',
      '',
      '',
      '',
    ],
  }
]

export const EGSONGS_LOCKED = {
  "crossresonance" : [2231, 2232, 2233, 2260, 2261, 2262, 2284, 2285, 2286, 2339, 2340, 2341]
}

export const MUSIC_OVERRIDE7 = [
  {
    music_id: 2235,
    start: 20260212,
    charts: {
      nov: { price: 4294967294 },
      adv: { price: 4294967294 },
      exh: { price: 4294967294 },
      mxm: { price: 4294967294 }
    }
  },
  {
    music_id: 2236,
    start: 20260212,
    charts: {
      nov: { price: 4294967294 },
      adv: { price: 4294967294 },
      exh: { price: 4294967294 },
      mxm: { price: 4294967294 }
    }
  },
  {
    music_id: 2237,
    start: 20260212,
    charts: {
      nov: { price: 4294967294 },
      adv: { price: 4294967294 },
      exh: { price: 4294967294 },
      mxm: { price: 4294967294 }
    }
  },
  {
    music_id: 2238,
    start: 20260212,
    charts: {
      nov: { price: 4294967294 },
      adv: { price: 4294967294 },
      exh: { price: 4294967294 },
      mxm: { price: 4294967294 }
    }
  },
  {
    music_id: 2239,
    start: 20260212,
    charts: {
      nov: { price: 4294967294 },
      adv: { price: 4294967294 },
      exh: { price: 4294967294 },
      mxm: { price: 4294967294 }
    }
  }
]