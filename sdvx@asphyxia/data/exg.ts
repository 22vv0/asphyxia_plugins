export const EVENT6 = [
  'DEMOGAME_PLAY',
  'MATCHING_MODE',
  'MATCHING_MODE_FREE_IP',
  'LEVEL_LIMIT_EASING',
  'ACHIEVEMENT_ENABLE',
  'APICAGACHADRAW\t30',
  'VOLFORCE_ENABLE',
  'AKANAME_ENABLE',
  'PAUSE_ONLINEUPDATE',
  'CONTINUATION',
  'TENKAICHI_MODE',
  'QC_MODE',
  'KAC_MODE',
  // 'APPEAL_CARD_GEN_PRICE\t100',
  // 'APPEAL_CARD_GEN_NEW_PRICE\t200',
  // 'APPEAL_CARD_UNLOCK\t0,20170914,0,20171014,0,20171116,0,20180201,0,20180607,0,20181206,0,20200326,0,20200611,4,10140732,6,10150431',
  'FAVORITE_APPEALCARD_MAX\t200',
  'FAVORITE_MUSIC_MAX\t200',
  //'EVENTDATE_APRILFOOL',
  //'KONAMI_50TH_LOGO',
  'OMEGA_ARS_ENABLE',
  'DISABLE_MONITOR_ID_CHECK',
  'SKILL_ANALYZER_ABLE',
  'BLASTER_ABLE',
  'STANDARD_UNLOCK_ENABLE',
  'PLAYERJUDGEADJ_ENABLE',
  'MIXID_INPUT_ENABLE',
  'EVENTDATE_ONIGO',
  'EVENTDATE_GOTT',
  'GENERATOR_ABLE',
  'CREW_SELECT_ABLE',
  'PREMIUM_TIME_ENABLE',
  'OMEGA_ENABLE\t1,2,3,4,5,6,7,8,9',
  'HEXA_ENABLE\t1,2,3,4,5,6,7',
  'MEGAMIX_ENABLE',
  'VALGENE_ENABLE',
  'ARENA_ENABLE',
  'DISP_PASELI_BANNER'
];

export const INFORMATION6 = {
  '2022021400': ['[img:ver06/info_psd.ifs:hexa_diver_220215]'],
  '2022030800': ['[img:ver06/info_psd.ifs:hexa_diver_220310]'],
  '2022042500': ['[img:ver06/info_psd.ifs:hexa_diver_220215]', '[img:ver06/info_psd.ifs:hexa_diver_220310]'],
  '2022071200': ['[img:ver06/info_psd.ifs:hexa_diver_220714]'],
  '2022081600': ['[img:ver06/info_psd.ifs:hexa_diver_220714]', '[img:ver06/info_psd.ifs:hexa_diver_220818]'],
  '2022083000': ['[img:ver06/info_psd.ifs:hexa_diver_220714]', '[img:ver06/info_psd.ifs:hexa_diver_220818]', '[img:ver06/info_psd.ifs:paseli_present_220901]'],
  '2022101800': ['[img:ver06/info_psd.ifs:hexa_diver_220714]', '[img:ver06/info_psd.ifs:hexa_diver_220818]', '[img:ver06/info_psd.ifs:paseli_present_220901]'],
}

export const MISSINGSONGS6 = [
  '1471', '1477', '1634', '1635', '1636', '1637', '1649', '1650', '1653', '1654',
  '1655', '1657', '1658', '1739', '1740', '1741', '1744', '1753', '1754', '1755', 
  '1756', '1757', '1758', '1759', '1760', '1761', '1810', '1813', '1814', '1821', 
  '1866', '1867', '1871', '1872', '1873', '1874'
]

export const XRECORDSONGS = [
  // 1st edition
  '1736', // discordia_penorerihumer
  '1737', // chewingood_toriena
  '1738', // verflucht_tirfing
  // 2nd edition
  '1848', // fegrix
  '1847', // 2 beasts unchained
  '1849', // piano kyousoukyoku
]

export const KONASTESONGS = [
  '1762', '1763', '1764', '1765', '1811'
]

export const BEMANI2021EVENTSONGS = [
  '1802', '1803', '1804', '1805', '1806', '1807'
]

export const BPLSTAMPRALLYSONGS = [
  '1808', '1809'
]

export const SDVX10THSTAMPSONGS = [
  '1838', '1839', '1840', '1841', '1842', '1843', '1844'
]

export const REFLECBEATSTAMPSONGS = [
  '1850', '1851', '1852', '1853', '1854'
]

export const APRILFOOLSSONGS = [
  '840', '1219', '1751'
]

export const VALKYRIEEXCLUSIVESONGS = [
  '1672', '1744', '1855', '1742', '1743'
  '1736', '1737', '1738', '1848', '1847', '1849' // X-record
]

// arena station crew with name cheatsheet
// 29 nearnoah xmas
// 82 kanade halloween
// 95 rasis v
// 101 right v
// 103 nearnoah v
// 104 nana v
// 106 natsuhi
// 107 cocona
// 122 hime?
// 123 hina?

// ARENA data
export const ARENA = {
  'Set 1 (04/25/22)': {
    details: {
      // season: 1,
      time_start: BigInt(Date.parse('25 Apr 2022 00:00:00 GMT')),
      time_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
      shop_start: BigInt(Date.parse('25 Apr 2022 00:00:00 GMT')),
      shop_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
      is_open: 1,
      is_shop: 1
    },
    arena_items: [
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 15000,
        item_type: 11,
        item_id: 101,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 15000,
        item_type: 11,
        item_id: 95,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 1855,
        param: 23,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 381,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 633,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 332,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 711,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 871,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 872,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 64,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 88,
        param: 8,
      },
    ] 
  },
  'Set 2 (06/30/22)': {
    details: {
      // season: 2,
      time_start: BigInt(Date.parse('30 Jun 2022 00:00:00 GMT')),
      time_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
      shop_start: BigInt(Date.parse('30 Jun 2022 00:00:00 GMT')),
      shop_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
      is_open: 1,
      is_shop: 1
    },
    arena_items: [
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 15000,
        item_type: 11,
        item_id: 103,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 1742,
        param: 23,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 632,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 37,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 239,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 111,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 132,
        param: 8,
      }
    ],
  },
  'Set 4 (10/20/22)': {
    details: {
      // season: 4,
      time_start: BigInt(Date.parse('20 Oct 2022 00:00:00 GMT')),
      time_end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT')),
      shop_start: BigInt(Date.parse('20 Oct 2022 00:00:00 GMT')),
      shop_end: BigInt(Date.parse('31 Dec 2099 23:59:59 GMT')),
      is_open: 1,
      is_shop: 1
    },
    arena_items: [
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 15000,
        item_type: 11,
        item_id: 122,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 15000,
        item_type: 11,
        item_id: 123,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 1902,
        param: 23,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 1855,
        param: 23,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 381,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 8000,
        item_type: 0,
        item_id: 633,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 332,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 711,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 4000,
        item_type: 0,
        item_id: 871,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 872,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 64,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 2000,
        item_type: 0,
        item_id: 88,
        param: 8,
      },
    ],
  }
  // 'debug': {
  //   details: {
  //     season: 0,
  //     time_start: BigInt(Date.parse('30 Jun 2022 00:00:00 GMT')),
  //     time_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
  //     shop_start: BigInt(Date.parse('30 Jun 2022 00:00:00 GMT')),
  //     shop_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
  //     is_open: 1,
  //     is_shop: 1
  //   },
  //   arena_items: [
  //     {
  //       catalog_id: 1,
  //       catalog_type: 1,
  //       price: 1000,
  //       item_type: 1,
  //       item_id: 10,
  //       param: 1,
  //     },
  //     {
  //       catalog_id: 1,
  //       catalog_type: 1,
  //       price: 1000,
  //       item_type: parseInt(U.GetConfig('arena_debug_item_type')),
  //       item_id: 10,
  //       param: 1,
  //     }
  //   ]
  // }
}

export const VALGENE = {
  info: [
    {
      valgene_name: "ヴァルキリージェネレーター　第１弾",
      valgene_name_english: "Valkyrie Generator Vol. 1",
      valgene_id: 1
    },
    {
      valgene_name: "ヴァルキリージェネレーター　第2弾",
      valgene_name_english: "Valkyrie Generator Vol. 2",
      valgene_id: 2
    },
    {
      valgene_name: "ヴァルキリージェネレーター　第3弾",
      valgene_name_english: "Valkyrie Generator Vol. 3",
      valgene_id: 3
    },
    {
      valgene_name: "ヴァルキリージェネレーター　第4弾",
      valgene_name_english: "Valkyrie Generator Vol. 4",
      valgene_id: 4
    },
    {
      valgene_name: "ヴァルキリージェネレーター　第5弾",
      valgene_name_english: "Valkyrie Generator Vol. 5",
      valgene_id: 5
    },
    {
      valgene_name: "ヴァルキリージェネレーター　第6弾",
      valgene_name_english: "Valkyrie Generator Vol. 6",
      valgene_id: 6
    },
    {
      valgene_name: "ヴァルキリージェネレーター　第7弾",
      valgene_name_english: "Valkyrie Generator Vol. 7",
      valgene_id: 7
    },
    {
      valgene_name: "ヴァルキリージェネレーター　第9弾",
      valgene_name_english: "Valkyrie Generator Vol. 9",
      valgene_id: 9
    }
  ],
  rarity: {
    "11": 5,
    "17": 20,
    "18": 15,
    "19": 10,
    "20": 15
  },
  catalog: [
    {
      volume: 1,
      items: [
        {
          type: 11, // nemsys crew
          item_ids: [117]
        },
        {
          type: 17, // chat stamp
          item_ids: [1, 2, 3, 4, 5]
        },
        {
          type: 18, // submonitor bg
          item_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        },
        {
          type: 19, // bgm
          item_ids: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
          type: 20, // nemsys
          item_ids: [1, 2, 3, 4]
        }
      ]
    },
    {
      volume: 2,
      items: [
        {
          type: 11,
          item_ids: [119]
        },
        {
          type: 17,
          item_ids: [6, 7, 8, 9, 10]
        },
        {
          type: 18,
          item_ids: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
        },
        {
          type: 19,
          item_ids: [9, 10, 11, 12, 13, 14]
        },
        {
          type: 20,
          item_ids: [5, 6, 7]
        }
      ]
    },
    {
      volume: 3,
      items: [
        {
          type: 11,
          item_ids: [120]
        },
        {
          type: 17,
          item_ids: [11, 12, 13, 14, 15, 16]
        },
        {
          type: 18,
          item_ids: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]
        },
        {
          type: 19,
          item_ids: [15, 16, 17]
        },
        {
          type: 20,
          item_ids: [12, 13, 14]
        }
      ]
    },
    {
      volume: 4,
      items: [
        {
          type: 11,
          item_ids: [121]
        },
        {
          type: 17,
          item_ids: [17, 18, 19, 20, 21]
        },
        {
          type: 18,
          item_ids: [57, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79]
        },
        {
          type: 19,
          item_ids: [18, 19, 20, 21]
        },
        {
          type: 20,
          item_ids: [15, 16, 17]
        }
      ]
    },
    {
      volume: 5,
      items: [
        {
          type: 11,
          item_ids: [124]
        },
        {
          type: 17,
          item_ids: [22, 23, 24, 25, 26, 27]
        },
        {
          type: 18,
          item_ids: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102]
        },
        {
          type: 19,
          item_ids: [22, 23, 24, 25]
        },
        {
          type: 20,
          item_ids: [18, 19, 20]
        }
      ]
    },
    {
      volume: 6,
      items: [
        {
          type: 11,
          item_ids: [129]
        },
        {
          type: 17,
          item_ids: [28, 29, 30, 31, 32]
        },
        {
          type: 18,
          item_ids: [103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127]
        },
        {
          type: 19,
          item_ids: [26, 27, 28, 29]
        },
        {
          type: 20,
          item_ids: [21, 22, 23, 24, 25]
        }
      ]
    },
    {
      volume: 7,
      items: [
        {
          type: 17,
          item_ids: [33, 34, 35, 36, 37]
        },
        {
          type: 18,
          item_ids: [129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151]
        },
        {
          type: 19,
          item_ids: [30, 31, 32, 33, 34, 35, 36, 37]
        },
        {
          type: 20,
          item_ids: [26, 27, 28, 29, 30]
        }
      ]
    },
    {
      volume: 9,
      items: [
        {
          type: 11, // nemsys crew
          item_ids: [133]
        },
        {
          type: 17, // chat stamp
          item_ids: [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
        },
        {
          type: 18,  // submonitor bg
          item_ids: [186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199]
        },
        {
          type: 19, // bgm
          item_ids: [43, 44, 45, 46, 47]
        },
        {
          type: 20, // nemsys
          item_ids: [32]
        }
      ]
    },
  ]
}

export const COURSES6 = [
  {
    id: 1,
    name: 'SKILL ANALYZER 第1回 Aコース',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1383,
            mty: 0,
          },
          {
            no: 1,
            mid: 334,
            mty: 1,
          },
          {
            no: 2,
            mid: 774,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 74,
            mty: 0,
          },
          {
            no: 1,
            mid: 771,
            mty: 1,
          },
          {
            no: 2,
            mid: 1125,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 784,
            mty: 1,
          },
          {
            no: 1,
            mid: 1126,
            mty: 1,
          },
          {
            no: 2,
            mid: 1075,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 505,
            mty: 1,
          },
          {
            no: 1,
            mid: 1403,
            mty: 1,
          },
          {
            no: 2,
            mid: 609,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 630,
            mty: 1,
          },
          {
            no: 1,
            mid: 1598,
            mty: 1,
          },
          {
            no: 2,
            mid: 1475,
            mty: 1,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1154,
            mty: 2,
          },
          {
            no: 1,
            mid: 1238,
            mty: 2,
          },
          {
            no: 2,
            mid: 590,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1606,
            mty: 2,
          },
          {
            no: 1,
            mid: 834,
            mty: 2,
          },
          {
            no: 2,
            mid: 820,
            mty: 4,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 183,
            mty: 2,
          },
          {
            no: 1,
            mid: 1602,
            mty: 2,
          },
          {
            no: 2,
            mid: 173,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1418,
            mty: 4,
          },
          {
            no: 1,
            mid: 469,
            mty: 2,
          },
          {
            no: 2,
            mid: 1413,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1596,
            mty: 4,
          },
          {
            no: 1,
            mid: 1649,
            mty: 4,
          },
          {
            no: 2,
            mid: 229,
            mty: 2,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1651,
            mty: 4,
          },
          {
            no: 1,
            mid: 1105,
            mty: 4,
          },
          {
            no: 2,
            mid: 1152,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1664,
            mty: 4,
          },
          {
            no: 1,
            mid: 1528,
            mty: 4,
          },
          {
            no: 2,
            mid: 1185,
            mty: 4,
          },
        ],
      }
    ],
  },
  {
    id: 2,
    name: 'SKILL ANALYZER 第1回 Bコース',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1066,
            mty: 0,
          },
          {
            no: 1,
            mid: 1054,
            mty: 1,
          },
          {
            no: 2,
            mid: 1055,
            mty: 0,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 768,
            mty: 1,
          },
          {
            no: 1,
            mid: 948,
            mty: 1,
          },
          {
            no: 2,
            mid: 755,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 401,
            mty: 1,
          },
          {
            no: 1,
            mid: 1320,
            mty: 1,
          },
          {
            no: 2,
            mid: 485,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 295,
            mty: 1,
          },
          {
            no: 1,
            mid: 255,
            mty: 1,
          },
          {
            no: 2,
            mid: 1029,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1420,
            mty: 1,
          },
          {
            no: 1,
            mid: 1001,
            mty: 2,
          },
          {
            no: 2,
            mid: 1611,
            mty: 1,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1338,
            mty: 2,
          },
          {
            no: 1,
            mid: 79,
            mty: 2,
          },
          {
            no: 2,
            mid: 1151,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1047,
            mty: 2,
          },
          {
            no: 1,
            mid: 982,
            mty: 2,
          },
          {
            no: 2,
            mid: 1042,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 664,
            mty: 2,
          },
          {
            no: 1,
            mid: 1370,
            mty: 2,
          },
          {
            no: 2,
            mid: 838,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 624,
            mty: 2,
          },
          {
            no: 1,
            mid: 1113,
            mty: 4,
          },
          {
            no: 2,
            mid: 1629,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1595,
            mty: 4,
          },
          {
            no: 1,
            mid: 1657,
            mty: 4,
          },
          {
            no: 2,
            mid: 658,
            mty: 2,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1647,
            mty: 4,
          },
          {
            no: 1,
            mid: 1587,
            mty: 4,
          },
          {
            no: 2,
            mid: 333,
            mty: 3,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1363,
            mty: 4,
          },
          {
            no: 1,
            mid: 692,
            mty: 3,
          },
          {
            no: 2,
            mid: 1270,
            mty: 4,
          },
        ],
      },
    ]
  },
  {
    id: 3,
    name: 'SKILL ANALYZER 第1回 Cコース',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1376,
            mty: 0,
          },
          {
            no: 1,
            mid: 564,
            mty: 1,
          },
          {
            no: 2,
            mid: 87,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 34,
            mty: 1,
          },
          {
            no: 1,
            mid: 932,
            mty: 1,
          },
          {
            no: 2,
            mid: 945,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1132,
            mty: 1,
          },
          {
            no: 1,
            mid: 1549,
            mty: 1,
          },
          {
            no: 2,
            mid: 380,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 130,
            mty: 1,
          },
          {
            no: 1,
            mid: 1204,
            mty: 1,
          },
          {
            no: 2,
            mid: 1424,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 48,
            mty: 2,
          },
          {
            no: 1,
            mid: 565,
            mty: 2,
          },
          {
            no: 2,
            mid: 1109,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1534,
            mty: 2,
          },
          {
            no: 1,
            mid: 1398,
            mty: 2,
          },
          {
            no: 2,
            mid: 1312,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 962,
            mty: 2,
          },
          {
            no: 1,
            mid: 1560,
            mty: 2,
          },
          {
            no: 2,
            mid: 357,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 965,
            mty: 2,
          },
          {
            no: 1,
            mid: 906,
            mty: 2,
          },
          {
            no: 2,
            mid: 579,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 332,
            mty: 2,
          },
          {
            no: 1,
            mid: 36,
            mty: 2,
          },
          {
            no: 2,
            mid: 1476,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1533,
            mty: 4,
          },
          {
            no: 1,
            mid: 1597,
            mty: 4,
          },
          {
            no: 2,
            mid: 1541,
            mty: 4,
          },
        ],
      }
    ]
  },
  {
    id: 4,
    name: 'SKILL ANALYZER 第2回',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1374,
            mty: 0,
          },
          {
            no: 1,
            mid: 936,
            mty: 1,
          },
          {
            no: 2,
            mid: 314,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1221,
            mty: 0,
          },
          {
            no: 1,
            mid: 169,
            mty: 1,
          },
          {
            no: 2,
            mid: 254,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1429,
            mty: 1,
          },
          {
            no: 1,
            mid: 462,
            mty: 1,
          },
          {
            no: 2,
            mid: 237,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 449,
            mty: 1,
          },
          {
            no: 1,
            mid: 329,
            mty: 1,
          },
          {
            no: 2,
            mid: 1293,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 486,
            mty: 2,
          },
          {
            no: 1,
            mid: 920,
            mty: 2,
          },
          {
            no: 2,
            mid: 1318,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1288,
            mty: 2,
          },
          {
            no: 1,
            mid: 256,
            mty: 2,
          },
          {
            no: 2,
            mid:1445,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1129,
            mty: 2,
          },
          {
            no: 1,
            mid: 1349,
            mty: 2,
          },
          {
            no: 2,
            mid: 1608,
            mty: 4,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 492,
            mty: 2,
          },
          {
            no: 1,
            mid: 930,
            mty: 4,
          },
          {
            no: 2,
            mid: 651,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1607,
            mty: 2,
          },
          {
            no: 1,
            mid: 1240,
            mty: 2,
          },
          {
            no: 2,
            mid: 510,
            mty: 2,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1251,
            mty: 4,
          },
          {
            no: 1,
            mid: 1540,
            mty: 4,
          },
          {
            no: 2,
            mid: 1712,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1143,
            mty: 4,
          },
          {
            no: 1,
            mid: 1298,
            mty: 4,
          },
          {
            no: 2,
            mid: 1619,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1639,
            mty: 4,
          },
          {
            no: 1,
            mid: 1496,
            mty: 4,
          },
          {
            no: 2,
            mid: 1766,
            mty: 4,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1224,
            mty: 2,
          },
          {
            no: 1,
            mid: 989,
            mty: 2,
          },
          {
            no: 2,
            mid: 688,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1201,
            mty: 2,
          },
          {
            no: 1,
            mid: 980,
            mty: 2,
          },
          {
            no: 2,
            mid: 900,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1155,
            mty: 4,
          },
          {
            no: 1,
            mid: 937,
            mty: 4,
          },
          {
            no: 2,
            mid: 1243,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1158,
            mty: 4,
          },
          {
            no: 1,
            mid: 1341,
            mty: 4,
          },
          {
            no: 2,
            mid: 1238,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 374,
            mty: 2,
          },
          {
            no: 1,
            mid: 1277,
            mty: 4,
          },
          {
            no: 2,
            mid: 73,
            mty: 3,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1101,
            mty: 4,
          },
          {
            no: 1,
            mid: 1189,
            mty: 4,
          },
          {
            no: 2,
            mid: 1362,
            mty: 4,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'SKILL ANALYZER 第3回',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1718,
            mty: 0,
          },
          {
            no: 1,
            mid: 144,
            mty: 1,
          },
          {
            no: 2,
            mid: 568,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1659,
            mty: 0,
          },
          {
            no: 1,
            mid: 739,
            mty: 1,
          },
          {
            no: 2,
            mid: 561,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1110,
            mty: 1,
          },
          {
            no: 1,
            mid: 1513,
            mty: 1,
          },
          {
            no: 2,
            mid: 732,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 174,
            mty: 1,
          },
          {
            no: 1,
            mid: 1217,
            mty: 1,
          },
          {
            no: 2,
            mid: 617,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1564,
            mty: 1,
          },
          {
            no: 1,
            mid: 1679,
            mty: 1,
          },
          {
            no: 2,
            mid: 285,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 545,
            mty: 2,
          },
          {
            no: 1,
            mid: 1563,
            mty: 2,
          },
          {
            no: 2,
            mid: 916,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 866,
            mty: 2,
          },
          {
            no: 1,
            mid: 330,
            mty: 2,
          },
          {
            no: 2,
            mid: 669,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 399,
            mty: 2,
          },
          {
            no: 1,
            mid: 1166,
            mty: 2,
          },
          {
            no: 2,
            mid: 1305,
            mty: 3,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 882,
            mty: 4,
          },
          {
            no: 1,
            mid: 1759,
            mty: 4,
          },
          {
            no: 2,
            mid: 993,
            mty: 4,
          },
        ],
      },
      
      
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1644,
            mty: 4,
          },
          {
            no: 1,
            mid: 1331,
            mty: 4,
          },
          {
            no: 2,
            mid: 1625,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1550,
            mty: 3,
          },
          {
            no: 1,
            mid: 1366,
            mty: 4,
          },
          {
            no: 2,
            mid: 1722,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 495,
            mty: 3,
          },
          {
            no: 1,
            mid: 1464,
            mty: 4,
          },
          {
            no: 2,
            mid: 1767,
            mty: 4,
          },
        ],
      },
    ]
  },
  {
    id: 6,
    name: '10周年記念コース',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: '10周年記念コース(梅)',
        level: 0,
        nameID: 14,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 247,
            mty: 0,
          },
          {
            no: 1,
            mid: 611,
            mty: 0,
          },
          {
            no: 2,
            mid: 339,
            mty: 0,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: '10周年記念コース(竹)',
        level: 0,
        nameID: 14,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 247,
            mty: 1,
          },
          {
            no: 1,
            mid: 611,
            mty: 1,
          },
          {
            no: 2,
            mid: 339,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: '10周年記念コース(松)',
        level: 0,
        nameID: 14,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 247,
            mty: 2,
          },
          {
            no: 1,
            mid: 611,
            mty: 2,
          },
          {
            no: 2,
            mid: 339,
            mty: 2,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: '10周年記念コース(極)',
        level: 0,
        nameID: 14,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 793,
            mty: 2,
          },
          {
            no: 1,
            mid: 247,
            mty: 3,
          },
          {
            no: 2,
            mid: 339,
            mty: 3,
          },
        ],
      },
    ]
  },
  {
    id: 7,
    name: '新生活応援コース',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: '新生活応援コース(入学)',
        level: 0,
        nameID: 15,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 239,
            mty: 0,
          },
          {
            no: 1,
            mid: 437,
            mty: 0,
          },
          {
            no: 2,
            mid: 1705,
            mty: 0,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: '新生活応援コース(進学)',
        level: 0,
        nameID: 15,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 239,
            mty: 1,
          },
          {
            no: 1,
            mid: 437,
            mty: 1,
          },
          {
            no: 2,
            mid: 1705,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: '新生活応援コース(就職)',
        level: 0,
        nameID: 15,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 239,
            mty: 2,
          },
          {
            no: 1,
            mid: 437,
            mty: 2,
          },
          {
            no: 2,
            mid: 1705,
            mty: 4,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: '新生活応援コース(新年度受講生大募集)',
        level: 0,
        nameID: 15,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 840,
            mty: 3,
          },
          {
            no: 1,
            mid: 1219,
            mty: 3,
          },
          {
            no: 2,
            mid: 1751,
            mty: 4,
          },
        ],
      },
    ]
  },
  {
    id: 8,
    name: 'SKILL ANALYZER 第4回 Aコース',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 271,
            mty: 0,
          },
          {
            no: 1,
            mid: 209,
            mty: 1,
          },
          {
            no: 2,
            mid: 1083,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1088,
            mty: 1,
          },
          {
            no: 1,
            mid: 973,
            mty: 1,
          },
          {
            no: 2,
            mid: 22,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 157,
            mty: 1,
          },
          {
            no: 1,
            mid: 1039,
            mty: 1,
          },
          {
            no: 2,
            mid: 972,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1395,
            mty: 1,
          },
          {
            no: 1,
            mid: 238,
            mty: 2,
          },
          {
            no: 2,
            mid: 1342,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 283,
            mty: 2,
          },
          {
            no: 1,
            mid: 1551,
            mty: 1,
          },
          {
            no: 2,
            mid: 573,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1565,
            mty: 2,
          },
          {
            no: 1,
            mid: 1409,
            mty: 2,
          },
          {
            no: 2,
            mid: 202,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1250,
            mty: 2,
          },
          {
            no: 1,
            mid: 434,
            mty: 2,
          },
          {
            no: 2,
            mid: 690,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 460,
            mty: 2,
          },
          {
            no: 1,
            mid: 772,
            mty: 2,
          },
          {
            no: 2,
            mid: 891,
            mty: 4,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 234,
            mty: 2,
          },
          {
            no: 1,
            mid: 886,
            mty: 4,
          },
          {
            no: 2,
            mid: 1716,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1760,
            mty: 4,
          },
          {
            no: 1,
            mid: 730,
            mty: 2,
          },
          {
            no: 2,
            mid: 1405,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1776,
            mty: 4,
          },
          {
            no: 1,
            mid: 1365,
            mty: 4,
          },
          {
            no: 2,
            mid: 911,
            mty: 3,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1364,
            mty: 4,
          },
          {
            no: 1,
            mid: 1661,
            mty: 4,
          },
          {
            no: 2,
            mid: 1099,
            mty: 4,
          },
        ],
      },
    ]
  },
  {
    id: 9,
    name: 'SKILL ANALYZER 第4回 Bコース',
    isNew: 0,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1526,
            mty: 0,
          },
          {
            no: 1,
            mid: 84,
            mty: 1,
          },
          {
            no: 2,
            mid: 76,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 171,
            mty: 1,
          },
          {
            no: 1,
            mid: 474,
            mty: 1,
          },
          {
            no: 2,
            mid: 18,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 281,
            mty: 1,
          },
          {
            no: 1,
            mid: 1254,
            mty: 1,
          },
          {
            no: 2,
            mid: 997,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 417,
            mty: 1,
          },
          {
            no: 1,
            mid: 1572,
            mty: 1,
          },
          {
            no: 2,
            mid: 539,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1701,
            mty: 1,
          },
          {
            no: 1,
            mid: 523,
            mty: 2,
          },
          {
            no: 2,
            mid: 477,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1412,
            mty: 2,
          },
          {
            no: 1,
            mid: 1417,
            mty: 2,
          },
          {
            no: 2,
            mid: 1081,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 315,
            mty: 2,
          },
          {
            no: 1,
            mid: 861,
            mty: 4,
          },
          {
            no: 2,
            mid: 1303,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 484,
            mty: 2,
          },
          {
            no: 1,
            mid: 905,
            mty: 2,
          },
          {
            no: 2,
            mid: 1539,
            mty: 4,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1019,
            mty: 4,
          },
          {
            no: 1,
            mid: 943,
            mty: 4,
          },
          {
            no: 2,
            mid: 1208,
            mty: 4,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 786,
            mty: 2,
          },
          {
            no: 1,
            mid: 837,
            mty: 2,
          },
          {
            no: 2,
            mid: 1814,
            mty: 4,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 979,
            mty: 3,
          },
          {
            no: 1,
            mid: 1459,
            mty: 4,
          },
          {
            no: 2,
            mid: 1774,
            mty: 4,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 914,
            mty: 3,
          },
          {
            no: 1,
            mid: 376,
            mty: 3,
          },
          {
            no: 2,
            mid: 1362,
            mty: 4,
          },
        ],
      },
    ]
  },
  {
    id: 10,
    name: 'SKILL ANALYZER 第5回 Aコース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1441,
            mty: 0,
          },
          {
            no: 1,
            mid: 274,
            mty: 1,
          },
          {
            no: 2,
            mid: 569,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1057,
            mty: 1,
          },
          {
            no: 1,
            mid: 865,
            mty: 1,
          },
          {
            no: 2,
            mid: 721,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 673,
            mty: 1,
          },
          {
            no: 1,
            mid: 954,
            mty: 1,
          },
          {
            no: 2,
            mid: 1867,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 461,
            mty: 1,
          },
          {
            no: 1,
            mid: 438,
            mty: 2,
          },
          {
            no: 2,
            mid: 1510,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1300,
            mty: 1,
          },
          {
            no: 1,
            mid: 1697,
            mty: 1,
          },
          {
            no: 2,
            mid: 476,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1115,
            mty: 2,
          },
          {
            no: 1,
            mid: 1425,
            mty: 2,
          },
          {
            no: 2,
            mid: 756,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 411,
            mty: 2,
          },
          {
            no: 1,
            mid: 990,
            mty: 4,
          },
          {
            no: 2,
            mid: 192,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 778,
            mty: 2,
          },
          {
            no: 1,
            mid: 1727,
            mty: 2,
          },
          {
            no: 2,
            mid: 1127,
            mty: 4,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 737,
            mty: 2,
          },
          {
            no: 1,
            mid: 1485,
            mty: 4,
          },
          {
            no: 2,
            mid: 1262,
            mty: 2,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 832,
            mty: 2,
          },
          {
            no: 1,
            mid: 1749,
            mty: 4,
          },
          {
            no: 2,
            mid: 633,
            mty: 2,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 725,
            mty: 2,
          },
          {
            no: 1,
            mid: 1201,
            mty: 4,
          },
          {
            no: 2,
            mid: 654,
            mty: 2,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 704,
            mty: 3,
          },
          {
            no: 1,
            mid: 1176,
            mty: 4,
          },
          {
            no: 2,
            mid: 1889,
            mty: 4,
          },
        ],
      },
    ]
  },
  {
    id: 11,
    name: 'SKILL ANALYZER 第5回 Bコース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'SKILL ANALYZER Level.01',
        level: 1,
        nameID: 1,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 698,
            mty: 0,
          },
          {
            no: 1,
            mid: 159,
            mty: 1,
          },
          {
            no: 2,
            mid: 671,
            mty: 1,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'SKILL ANALYZER Level.02',
        level: 2,
        nameID: 2,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 388,
            mty: 1,
          },
          {
            no: 1,
            mid: 1084,
            mty: 1,
          },
          {
            no: 2,
            mid: 1755,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'SKILL ANALYZER Level.03',
        level: 3,
        nameID: 3,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 854,
            mty: 1,
          },
          {
            no: 1,
            mid: 321,
            mty: 1,
          },
          {
            no: 2,
            mid: 512,
            mty: 1,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'SKILL ANALYZER Level.04',
        level: 4,
        nameID: 4,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 412,
            mty: 1,
          },
          {
            no: 1,
            mid: 992,
            mty: 1,
          },
          {
            no: 2,
            mid: 1315,
            mty: 1,
          },
        ],
      },
      {
        id: 5,
        type: 0,
        name: 'SKILL ANALYZER Level.05',
        level: 5,
        nameID: 5,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1085,
            mty: 2,
          },
          {
            no: 1,
            mid: 1229,
            mty: 2,
          },
          {
            no: 2,
            mid: 212,
            mty: 2,
          },
        ],
      },
      {
        id: 6,
        type: 0,
        name: 'SKILL ANALYZER Level.06',
        level: 6,
        nameID: 6,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1616,
            mty: 2,
          },
          {
            no: 1,
            mid: 1815,
            mty: 2,
          },
          {
            no: 2,
            mid: 813,
            mty: 2,
          },
        ],
      },
      {
        id: 7,
        type: 0,
        name: 'SKILL ANALYZER Level.07',
        level: 7,
        nameID: 7,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1719,
            mty: 2,
          },
          {
            no: 1,
            mid: 344,
            mty: 2,
          },
          {
            no: 2,
            mid: 1322,
            mty: 2,
          },
        ],
      },
      {
        id: 8,
        type: 0,
        name: 'SKILL ANALYZER Level.08',
        level: 8,
        nameID: 8,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1410,
            mty: 2,
          },
          {
            no: 1,
            mid: 1761,
            mty: 2,
          },
          {
            no: 2,
            mid: 63,
            mty: 2,
          },
        ],
      },
      {
        id: 9,
        type: 0,
        name: 'SKILL ANALYZER Level.09',
        level: 9,
        nameID: 9,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 96,
            mty: 2,
          },
          {
            no: 1,
            mid: 976,
            mty: 3,
          },
          {
            no: 2,
            mid: 801,
            mty: 2,
          },
        ],
      },
      {
        id: 10,
        type: 0,
        name: 'SKILL ANALYZER Level.10',
        level: 10,
        nameID: 10,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1729,
            mty: 4,
          },
          {
            no: 1,
            mid: 985,
            mty: 4,
          },
          {
            no: 2,
            mid: 234,
            mty: 3,
          },
        ],
      },
      {
        id: 11,
        type: 0,
        name: 'SKILL ANALYZER Level.11',
        level: 11,
        nameID: 11,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1517,
            mty: 4,
          },
          {
            no: 1,
            mid: 1335,
            mty: 4,
          },
          {
            no: 2,
            mid: 367,
            mty: 2,
          },
        ],
      },
      {
        id: 12,
        type: 0,
        name: 'SKILL ANALYZER Level.∞',
        level: 12,
        nameID: 12,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 273,
            mty: 3,
          },
          {
            no: 1,
            mid: 1581,
            mty: 4,
          },
          {
            no: 2,
            mid: 1888,
            mty: 4,
          },
        ],
      },
    ]
  },
  {
    id: 12,
    name: 'Red Bull 5G 2022予選コース',
    isNew: 1,
    courses: [
      {
        id: 1,
        type: 0,
        name: 'Red Bull 5G 2022 エンジョイコース(梅)',
        level: 0,
        nameID: 16,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1258,
            mty: 0,
          },
          {
            no: 1,
            mid: 1191,
            mty: 0,
          },
          {
            no: 2,
            mid: 915,
            mty: 0,
          },
        ],
      },
      {
        id: 2,
        type: 0,
        name: 'Red Bull 5G 2022 エンジョイコース(竹)',
        level: 0,
        nameID: 16,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1258,
            mty: 1,
          },
          {
            no: 1,
            mid: 1191,
            mty: 1,
          },
          {
            no: 2,
            mid: 915,
            mty: 1,
          },
        ],
      },
      {
        id: 3,
        type: 0,
        name: 'Red Bull 5G 2022 エンジョイコース(松)',
        level: 0,
        nameID: 16,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1258,
            mty: 2,
          },
          {
            no: 1,
            mid: 1191,
            mty: 2,
          },
          {
            no: 2,
            mid: 915,
            mty: 2,
          },
        ],
      },
      {
        id: 4,
        type: 0,
        name: 'Red Bull 5G 2022予選コース',
        level: 0,
        nameID: 16,
        assist: 0,
        tracks: [
          {
            no: 0,
            mid: 1258,
            mty: 4,
          },
          {
            no: 1,
            mid: 1191,
            mty: 4,
          },
          {
            no: 2,
            mid: 915,
            mty: 3,
          },
        ],
      },
    ]
  }
];


export const SDVX_AUTOMATION_SONGS = [
	6,
	75,
	86,
	87,
	94,
	115,
	116,
	117,
	118,
	120,
	121,
	122,
	123,
	124,
	125,
	126,
	128,
	134,
	251,
	253,
	258,
	259,
	271,
	272,
	304,
	344,
	357,
	358,
	359,
	360,
	361,
	362,
	363,
	364,
	365,
	366,
	367,
	368,
	369,
	370,
	372,
	373,
	374,
	375,
	376,
	377,
	381,
	437,
	479,
	495,
	538,
	542,
	543,
	546,
	553,
	581,
	607,
	625,
	626,
	632,
	633,
	634,
	635,
	636,
	637,
	638,
	639,
	640,
	641,
	642,
	643,
	644,
	645,
	646,
	647,
	648,
	649,
	650,
	651,
	652,
	653,
	654,
	655,
	656,
	657,
	658,
	659,
	673,
	679,
	692,
	693,
	694,
	698,
	699,
	704,
	708,
	709,
	715,
	716,
	718,
	786,
	787,
	788,
	789,
	790,
	791,
	792,
	793,
	794,
	795,
	796,
	797,
	798,
	799,
	800,
	801,
	802,
	803,
	804,
	805,
	806,
	807,
	808,
	809,
	810,
	811,
	812,
	813,
	814,
	815,
	816,
	817,
	818,
	823,
	825,
	827,
	828,
	829,
	830,
	831,
	842,
	866,
	900,
	902,
	907,
	908,
	909,
	910,
	911,
	912,
	913,
	914,
	915,
	927,
	929,
	979,
	1022,
	1023,
	1024,
	1025,
	1026,
	1027,
	1028,
	1029,
	1030,
	1031,
	1032,
	1033,
	1034,
	1035,
	1036,
	1037,
	1038,
	1039,
	1040,
	1041,
	1042,
	1043,
	1044,
	1045,
	1046,
	1047,
	1048,
	1049,
	1072,
	1099,
	1100,
	1101,
	1102,
	1103,
	1104,
	1105,
	1106,
	1107,
	1108,
	1117,
	1140,
	1141,
	1142,
	1143,
	1144,
	1145,
	1146,
	1147,
	1148,
	1176,
	1177,
	1178,
	1179,
	1180,
	1181,
	1183,
	1184,
	1185,
	1186,
	1187,
	1188,
	1189,
	1190,
	1191,
	1192,
	1193,
	1194,
	1195,
	1196,
	1197,
	1198,
	1199,
	1200,
	1201,
	1202,
	1203,
	1204,
	1205,
	1206,
	1207,
	1208,
];

export const SDVX_AUTOMATION_SONGS_2 = [
	1209,
	1210,
	1211,
	1212,
	1213,
	1214,
	1215,
	1216,
	1217,
	1218,
	1220,
	1221,
	1260,
	1269,
	1270,
	1271,
	1272,
	1273,
	1274,
	1275,
	1276,
	1277,
	1278,
	1279,
	1280,
	1281,
	1282,
	1300,
	1301,
	1302,
	1329,
	1345,
	1346,
	1347,
	1348,
	1361,
	1362,
	1363,
	1364,
	1365,
	1366,
	1367,
	1368,
	1369,
	1370,
	1371,
	1372,
	1373,
	1374,
	1375,
	1376,
	1377,
	1378,
	1379,
	1380,
	1381,
	1382,
	1383,
	1384,
	1385,
	1386,
	1433,
	1434,
	1435,
	1436,
	1437,
	1459,
	1460,
	1461,
	1462,
	1463,
	1464,
	1465,
	1466,
	1467,
	1468,
	1490,
	1491,
	1495,
	1496,
	1497,
	1498,
	1499,
	1500,
	1501,
	1580,
	1581,
	1582,
	1583,
	1584,
	1585,
	1586,
	1587,
	1588,
	1589,
	1590,
	1591,
	1592,
	1593,
	1594,
	1595,
	1596,
	1597,
	1598,
	1599,
	1600,
	1601,
	1602,
	1603,
	1604,
	1605,
	1606,
	1607,
	1608,
	1609,
	1610,
	1611,
	1660,
	1661,
	1662,
	1663,
	1664,
	1665,
	1666,
	1838,
	1839,
	1840,
	1841,
	1842,
	1843,
	1844,
	99001,
	99002,
	99003,
	99004
]

export const EXTENDS6 = [
  {
    id: 91,
    type: 17,
    params: [
      0,
      0,
      0,
      0,
      0,
      SDVX_AUTOMATION_SONGS.join(','),
      '',
      '',
      '',
      '',
    ],
  },
	{
    id: 92,
    type: 17,
    params: [
      0,
      0,
      0,
      0,
      0,
      SDVX_AUTOMATION_SONGS_2.join(','),
      '',
      '',
      '',
      '',
    ],
  },    
];

