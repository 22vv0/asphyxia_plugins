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
  'APPEAL_CARD_GEN_PRICE\t100',
  'APPEAL_CARD_GEN_NEW_PRICE\t200',
  'APPEAL_CARD_UNLOCK\t0,20170914,0,20171014,0,20171116,0,20180201,0,20180607,0,20181206,0,20200326,0,20200611,4,10140732,6,10150431',
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
  'HEXA_ENABLE\t1,2,3,4,5,6',
  'MEGAMIX_ENABLE',
  'VALGENE_ENABLE',
  'ARENA_ENABLE',
  'DISP_PASELI_BANNER'
];

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
  '1672', '1744', '1855', '1742',
  '1736', '1737', '1738', '1848', '1847', '1849' // X-record
]

export const ARENA = {
  'Set 1 (04/25/22)': {
    details: {
      season: 0,
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
        price: 3000,
        item_type: 11,
        item_id: 101,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 3000,
        item_type: 11,
        item_id: 95,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 1855,
        param: 23,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 381,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 633,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 332,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 711,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 871,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 872,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 64,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 88,
        param: 8,
      },
    ] 
  },
  'Set 2 (06/30/22)': {
    details: {
      season: 0,
      time_start: BigInt(Date.parse('30 Jun 2022 00:00:00 GMT')),
      time_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
      shop_start: BigInt(Date.parse('30 Jun 2022 00:00:00 GMT')),
      shop_end: BigInt(Date.parse('31 Dec 2022 23:59:59 GMT')),
      is_open: 1,
      is_shop: 1
    },
    arena_items: [
      // {
      //   catalog_id: 1,
      //   catalog_type: 1,
      //   price: 3000,
      //   item_type: 11,
      //   item_id: 95,
      //   param: 1,
      // },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 1742,
        param: 23,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 632,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 37,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 239,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 111,
        param: 8,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: 0,
        item_id: 132,
        param: 8,
      }
    ],
  },
  'debug': {
    details: {
      season: 0,
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
        price: 1000,
        item_type: 1,
        item_id: 10,
        param: 1,
      },
      {
        catalog_id: 1,
        catalog_type: 1,
        price: 1000,
        item_type: parseInt(U.GetConfig('arena_debug_item_type')),
        item_id: 10,
        param: 1,
      }
    ]
  }
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
          type: 11,
          item_ids: [117]
        },
        {
          type: 17,
          item_ids: [1, 2, 3, 4, 5]
        },
        {
          type: 18,
          item_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        },
        {
          type: 19,
          item_ids: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
          type: 20,
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

  ]
}

export const COURSES6 = [
  {
    id: 1,
    name: 'SKILL ANALYZER 第1回 Aコース',
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
];

export const SDVX_AUTOMATION_SONGS = [
  1,
  2,
  6,
  7,
  8,
  19,
  24,
  25,
  31,
  39,
  42,
  44,
  47,
  54,
  55,
  59,
  60,
  63,
  64,
  69,
  75,
  86,
  87,
  88,
  94,
  96,
  97,
  98,
  101,
  103,
  109,
  115,
  117,
  120,
  125,
  126,
  127,
  128,
  134,
  135,
  180,
  182,
  192,
  212,
  216,
  224,
  225,
  230,
  241,
  245,
  246,
  251,
  252,
  253,
  255,
  256,
  257,
  258,
  259,
  267,
  268,
  269,
  271,
  272,
  286,
  290,
  291,
  295,
  296,
  297,
  298,
  299,
  304,
  307,
  311,
  312,
  313,
  316,
  324,
  330,
  337,
  344,
  349,
  359,
  364,
  365,
  369,
  374,
  381,
  416,
  420,
  422,
  437,
  471,
  479,
  499,
  500,
  517,
  518,
  519,
  533,
  538,
  539,
  540,
  541,
  542,
  543,
  546,
  551,
  552,
  553,
  581,
  597,
  606,
  607,
  611,
  616,
  623,
  626,
  633,
  634,
  669,
  671,
  673,
  678,
  684,
  698,
  699,
  704,
  708,
  717,
  718,
  741,
  743,
  788,
  816,
  823,
  831,
  842,
  855,
  866,
  903,
  907,
  939,
  978,
  1072,
  1225,
  1231,
  1250,
  1252,
  1260,
  1261,
  1297,
  1331,
  1333,
  1422,
  1423,
  1490,
  1491
];

export const EXTENDS6 = [
  //  {
  //   id: 91,
  //    type: 17,
  //    params: [
  //      0,
  //      1,
  //      0,
  //      0,
  //      1,
  //      SDVX_AUTOMATION_SONGS.join(','),
  //      '0',
  //      '0',
  //      '0',
  //      '0',
  //    ],
  //  },  
];
