import { EVENT, SDVX_STATION } from '../data/booth';
import { EVENT2, MUSIC_LIMITED, COURSES2 } from '../data/ii';
import { EVENT3, MISSION_EVENT3, MUSIC_LIMITED3, COURSES3, EXTENDS3, SP_APICAGENE3 } from '../data/gw';
import { EVENT6, COURSES6, EXTENDS6, APRILFOOLSSONGS, VALKYRIE_SONGS, LICENSED_SONGS6, 
          CURRENT_ARENA, ARENA_STATION_ITEMS, VALGENE, INFORMATION6, UNLOCK_EVENTS6, 
          MUSIC_OVERRIDE6 
} from '../data/exg';
import { EVENT7, COURSES7, EXTENDS7, LICENSED_SONGS7, CURRENT_ARENA7, ARENA_STATION_ITEMS7, 
          VALGENE7, APIGENE7, INFORMATION7, UNLOCK_EVENTS7, EGSONGS_LOCKED, MUSIC_OVERRIDE7,
          GAMEOVER_CHARA7, QUIZ7
} from '../data/nbl';
import { getVersion, checkVerStart, getRandomIntInclusive } from '../utils';
import { PluginSettings } from '../models/settings';

const parseDiff = (musicId: number, musicType: number, limNo: number) => {
  return {
    music_id: K.ITEM('s32', musicId),
    music_type: K.ITEM('u8', musicType),
    limited: K.ITEM('u8', limNo)
  }
}

export const common: EPR = async (info, data, send) => {
  const date = new Date();
  const gameVersion = getVersion(info);
  const unlockAllSongs = U.GetConfig('unlock_all_songs');
  const modelInfo = info.model.split(":");
  const version = parseInt(modelInfo[4].slice(0, -2));
  const pluginSettings = await DB.FindOne<PluginSettings>({collection: 'settings'})
  let station = [];
  let events = [];
  let courses = [];
  let extend = [];
  let information = [];
  let musicOverride = [];
  let spApica = [];
  let unlockEvents;
  let currentArena;
  let arenaItems;
  let valgene;
  let apigene;
  let currentDate = date.toLocaleDateString()
  let songNum = 0;

  const parseSongData = (music: any) => {
    const id = parseInt(music.id)
    const ver = Math.abs(gameVersion)
    const difficulty = music.difficulty[ver]
    const songVer = parseInt(music.info.version)
    let limitedNo = 3
    let result: Object[] = []
    if (_.isEmpty(difficulty) || songVer > ver) return result;
    const diffName = ['novice', 'advanced', 'exhaust', 'infinite']
    if (ver >= 4) diffName.push('maximum');
    if (ver >= 6) diffName.push('ultimate');

    // Force unlock enabled
    if (unlockAllSongs) {
      for (let i = 0; i < diffName.length; ++i) {
        (difficulty[diffName[i]] == '0') ? -1 : result.push(parseDiff(id, i, limitedNo))
      }
      return result
    }

    // Force unlock disabled
    limitedNo = 2
    if (ver >= 6) {
      let distributionDate = music.info['distribution_date']
      if (!distributionDate) return result;
      const licensedSongs = ver === 6 ? LICENSED_SONGS6 : LICENSED_SONGS7;
      if (licensedSongs.includes(id)) limitedNo += 1;  // Licensed songs in SV6+ need limited=3 to appear
      
      if (ver === 6) {
        const isValk = (['G', 'H'].includes(modelInfo[2]))
        if (!isValk && VALKYRIE_SONGS.includes(id)) limitedNo = -1;
      }

      // Handle old versions
      if (ver != songVer) {
        const egSongsMerge = [...EGSONGS_LOCKED['crossresonance']]
        if (licensedSongs.includes(id) || (ver === 7 && egSongsMerge.includes(id))) {
          for (let i = 0; i < diffName.length; ++i) {
            result.push(parseDiff(id, i, limitedNo))
          }
        }
        if (parseInt(music.info.inf_ver) == ver) {  // XCD/NBL
          if (ver === 6 && id === 469) limitedNo = 2;  // Manual lock SV6; secret XCD
          result.push(parseDiff(id, 3, limitedNo))
        }
        return result
      }

      // Handle unreleased songs
      const musicOverride = ver === 6 ? MUSIC_OVERRIDE6 : MUSIC_OVERRIDE7;
      const ovInd = musicOverride.findIndex(o => o.music_id === id)
      if (ovInd > 0 && 'date' in musicOverride[ovInd]) {
        distributionDate = String(musicOverride[ovInd].date)
      }
      if (!checkVerStart(0, 0, distributionDate, date)) {
        console.log("Unreleased song: " + music.info.title_name)
        return result
      }
    }

    if (ver === 6 && id === 2034) limitedNo = 2; // Manual lock SV6; Muishiki Requiem remix
    let musicLimited = ver === 2 ? MUSIC_LIMITED : (ver === 3 ? MUSIC_LIMITED3 : [])
    let limIdx = musicLimited.findIndex(m => m.id === id)
    let limitedDiffs: number[] = []
    if (limIdx >= 0) limitedDiffs = musicLimited[limIdx]['limited'];
    let maxDiffs = _.isEmpty(limitedDiffs) ? diffName.length : limitedDiffs.length;
  
    // Handle limited for remaining songs
    for (let i = 0; i < maxDiffs; ++i) {
      if (difficulty[diffName[i]] == '0') continue;
      limitedNo = (limIdx >= 0) ? limitedDiffs[i] : limitedNo;
      (limitedNo === 0) ? -1 : result.push(parseDiff(id, i, limitedNo))
    }

    return result
  }

  console.log("Retrieving common data");
  try {
    switch (info.method) {
      case 'common': {
        switch (info.module) {
          case 'game': {
            console.log('Game: BOOTH')
            songNum = 187
            events = EVENT
            station = SDVX_STATION
            break
          }
          case 'game_2': {
            console.log('Game: infinite infection')
            songNum = 554
            courses = COURSES2
            events = EVENT2
            break
          }
          case 'game_3': {
            console.log('Game: GRAVITY WARS')
            songNum = 953
            spApica = SP_APICAGENE3.filter(sp => sp.version <= version)
            courses = COURSES3.filter(c => version >= c.version)
            EXTENDS3.filter(ex => checkVerStart(version, ex.version, 0, date)).forEach(val => extend.push(Object.assign({}, val)));
            events = EVENT3
            break
          }
        }
        break
      }
      case 'sv6_common': {
        console.log('Game: EXCEED GEAR')
        //events = EVENT6;
        EVENT6.forEach(val => events.push(val));
        if(IO.Exists('webui/asset/config/flags.json')) {
          let bufFlagConfig = await IO.ReadFile('webui/asset/config/flags.json')
          let flagConfig = JSON.parse(bufFlagConfig.toString())
          for(const flagIter in flagConfig) {
            if(flagConfig[flagIter]['toggle']) {
              if(typeof flagConfig[flagIter]['str'] === 'string') events.push(flagConfig[flagIter]['str'])
              else {
                for(const multiFlagIter in flagConfig[flagIter]['str']) {
                  events.push(flagConfig[flagIter]['str'][multiFlagIter])
                }
              }
            }
          }
        }
        courses = COURSES6.filter(course => version >= course.version);
        information = INFORMATION6.filter(info => checkVerStart(version, info.version, info.start, date))
        EXTENDS6.filter(ex => checkVerStart(version, ex.version, ex.start, date)).forEach(val => extend.push(Object.assign({}, val)));
        unlockEvents = UNLOCK_EVENTS6;
        currentArena = CURRENT_ARENA;
        arenaItems = ARENA_STATION_ITEMS;
        musicOverride = MUSIC_OVERRIDE6;
        valgene = VALGENE;
        songNum = 2342
        break;
      }
      case 'sv7_common': {
        console.log('Game: ∇')
        EVENT7.forEach(val => events.push(val));
        if(IO.Exists('webui/asset/config/flags.json')) {
          let bufFlagConfig = await IO.ReadFile('webui/asset/config/flags.json')
          let flagConfig = JSON.parse(bufFlagConfig.toString())
          for(const flagIter in flagConfig) {
            if(flagConfig[flagIter]['toggle']) {
              if(typeof flagConfig[flagIter]['str'] === 'string') events.push(flagConfig[flagIter]['str'])
              else {
                for(const multiFlagIter in flagConfig[flagIter]['str']) {
                  events.push(flagConfig[flagIter]['str'][multiFlagIter])
                }
              }
            }
          }
        }
        courses = COURSES7.filter(course => version >= course.version);
        information = INFORMATION7.filter(info => checkVerStart(version, info.version, info.start, date))
        unlockEvents = UNLOCK_EVENTS7;
        currentArena = CURRENT_ARENA7;
        arenaItems = ARENA_STATION_ITEMS7;
        musicOverride = MUSIC_OVERRIDE7;
        valgene = {
          info: [...VALGENE.info, ...VALGENE7.info],
          rarity: {...VALGENE.rarity, ...VALGENE7.rarity},
          catalog: [...VALGENE.catalog, ...VALGENE7.catalog]
        }
        apigene = APIGENE7;
        EXTENDS7.filter(ex => checkVerStart(version, ex.version, ex.start, date)).forEach(val => extend.push(Object.assign({}, val)));
        songNum = 2500
        break;
      }
    }

    if(gameVersion === 1)  return send.object({
      limited: {
        music: Array.from({ length: songNum }, (_, id) => K.ATTR({id: (id + 1).toString(), flag: unlockAllSongs ? '3' : '2'}, {}))
      },
      event: {
        info: events.map(id => K.ATTR({id: id.toString()}))
      },
      catalog: {
        info: [
          ...[
            K.ATTR({id: "1", currency: "1", price: "0"}, {}),
            K.ATTR({id: "2", currency: "1", price: "0"}, {}),
          ],
          ...station.map((prc, ind) => K.ATTR({id: (ind + 1000).toString(), currency: "1", price: prc.toString()}))
        ]
      }
    })

    // Load songs
    const music_db = await IO.ReadFile('webui/asset/json/music_db.json')
    if (music_db === null) {
      console.warn(`music_db.json was not found.\nTo resolve, upload your music_db.xml and run "Update WebUi Assets".`)
      return send.deny()
    }
    const mdb = JSON.parse(music_db.toString())
    let songs: Object[] = []
    let omniList: number[] = []
    let absVersion = Math.abs(gameVersion)

    if (unlockAllSongs) {
      console.log("Unlocking songs. Make sure music_db.json is updated.")
    }
    else {
      songNum = (absVersion >= 6) ? Math.max(...mdb.mdb.music.map(m => parseInt(m['id']))) : songNum
      console.log("Highest music id: " + songNum)
    }

    for (let id = 1; id <= songNum; ++id) {
      const foundSongIndex = mdb.mdb.music.map(function(x) { return x['id']; }).indexOf(id.toString());
      if (foundSongIndex != -1) {
        const songData = mdb.mdb.music[foundSongIndex]
        songs.push(...parseSongData(songData))
        if (absVersion >= 6 && ('omnimix') in songData.info) omniList.push(id)  // lazy
      }
    }

    // For testing extend data.
    if(IO.Exists('handlers/extend.json')) {
      let bufTest = await IO.ReadFile('handlers/extend.json')
      let extendTest = JSON.parse(bufTest.toString())
      for(const ex in extendTest) {
        extend.push({
          type: extendTest[ex].type,
          id: extendTest[ex].id,
          params: extendTest[ex].params
        })
      }
    }

    let response = {}

    if(gameVersion === 2 || gameVersion === 3) {
      if(gameVersion === 3) {
        if(U.GetConfig('gw_mission')) events = events.concat(MISSION_EVENT3)
        if(!U.GetConfig('gw_gene')) events = events.concat([25])

        let sp = spApica[(Math.random() * spApica.length) | 0];
        extend.push({
          type: 2,
          id: 1,
          params: [
            1, 0, 0, 0, 0,
            sp.title,
            sp.str,
            '', '', ''
          ]
        })
      }
      response = {
        event: {
          info: events.map(e => ({
            event_id: K.ITEM('u32', e)
          }))
        },
        music_limited: {
          info: unlockAllSongs ? [] : songs
        },
        skill_course: {
          info: courses.reduce(
            (acc, s) => 
              acc.concat(
                s.courses.map(c => ({
                  season_id: K.ITEM('s32', s.id),
                  season_name: K.ITEM('str', s.name),
                  season_new_flg: K.ITEM('bool', s.isNew),
                  course_id: K.ITEM('s16', c.id),
                  course_name: K.ITEM('str', c.name),
                  course_type: K.ITEM('s16', c.type),
                  level: K.ITEM('s16', c.level),
                  skill_name_id: K.ITEM('s16', c.nameID),
                  matching_assist: K.ITEM('bool', c.assist),
                  gauge_type: K.ITEM('s16', 0),
                  paseli_type: K.ITEM('s16', 0),
                  track: c.tracks.map(t => ({
                    track_no: K.ITEM('s16', t.no),
                    music_id: K.ITEM('s32', t.mid),
                    music_type: K.ITEM('s8', t.mty),
                  })),
                }))
              ),
            []
          ),
        },
        ...(gameVersion === 3 && {
          extend: {
            info: extend.map(e => ({
              extend_id: K.ITEM('u32', e.id),
              extend_type: K.ITEM('u32', e.type),
              param_num_1: K.ITEM('s32', e.params[0]),
              param_num_2: K.ITEM('s32', e.params[1]),
              param_num_3: K.ITEM('s32', e.params[2]),
              param_num_4: K.ITEM('s32', e.params[3]),
              param_num_5: K.ITEM('s32', e.params[4]),
              param_str_1: K.ITEM('str', e.params[5]),
              param_str_2: K.ITEM('str', e.params[6]),
              param_str_3: K.ITEM('str', e.params[7]),
              param_str_4: K.ITEM('str', e.params[8]),
              param_str_5: K.ITEM('str', e.params[9]),
            })),
          }
        })
      }
    }

    else if(Math.abs(gameVersion) >= 6) {
      let musicOverrideFin = []
      const createItem = (key, val) => {return (typeof val === 'string') ? K.ITEM('str', val) : ((key === 'volume') ? K.ITEM('u16', val) : K.ITEM('u32', val))}
      for(const music of musicOverride.filter(m => checkVerStart(0, 0, m.start, date))) {
        let mInfKeys = Object.keys(music).filter(m => !['charts', 'start'].includes(m))
        let musicInfo = {}
        mInfKeys.forEach(k => {
          musicInfo[k] = createItem(k, music[k])
        })
        musicOverrideFin.push(musicInfo)

        let mChartKeys = Object.keys(music.charts)
        let chartInfo = {}
        let difName = {nov: 'NOVICE', adv: 'ADVANCED', exh: 'EXHAUST', inf: 'INFINITE', mxm: 'MAXIMUM', ult: 'ULTIMATE'}
        mChartKeys.forEach(ch => {
          let mChartInfoKeys = Object.keys(music.charts[ch])
          let ci = {}
          mChartInfoKeys.forEach(i => {
            ci[i] = createItem(i, music.charts[ch][i])
          })

          chartInfo[difName[ch]] = ci
        })
        musicOverrideFin.push(chartInfo)
      }

      if(information.length > 0) {
        let currentTime = parseInt((date.getTime()/100000) as unknown as string) * 100
        for(const info of information) {
          extend.push({
            id: info.id,
            type: 1,
            params: [
              1,
              currentTime,
              0,
              0,
              0,
              '[f:0]SERVER INFORMATION',
              info.str,
              '',
              '',
              '',
            ],
          });
        }
      }

      if(omniList.length > 0) {
        extend.push({
          id: 1,
          type: 3,
          params: [
            4,
            0,
            0,
            0,
            0,
            '!',
            '',
            '',
            omniList.join(','),
            "Omnimix Songs",
          ]
        })
      }

      if(version >= 20260602) {
        const charaPattern = ['l,r,l','r,l,r','l,m,r','r,m,l','l,r,m','m,l,r']
        const selPattern = charaPattern[Math.floor(Math.random() * charaPattern.length)]
        let chara = []
        for(const pos of selPattern.split(',')) {
          let tempChara = GAMEOVER_CHARA7[pos][Math.floor(Math.random() * GAMEOVER_CHARA7[pos].length)]
          while(chara.includes(tempChara)) {
            tempChara = GAMEOVER_CHARA7[pos][Math.floor(Math.random() * GAMEOVER_CHARA7[pos].length)]
          }
          chara.push(tempChara)
        }

        extend.push({
          id: 1,
          type: 1,
          params: [
            3,
            0,
            0,
            1,
            0,
            "[]\t[]\t[]",
            "[]",
            "[]",
            "[]",
            "characters: " + chara.join(' ')
          ]
        })
      }

      if(pluginSettings.akanames) {
        let akaId = 1
        let akaCnt = 0
        let params = [0,0,0,0,0,'','','','','']
        for(const [ind, titles] of pluginSettings.akanames.entries()) {
          params[akaCnt] = akaId++
          params[akaCnt + 5] = titles
          akaCnt++
          if(ind+1 === pluginSettings.akanames.length || akaCnt === 5 || (pluginSettings.akanames.length < 5 && akaCnt >= pluginSettings.akanames.length)) {
            extend.push({
              id: 0,
              type: 15,
              params: params
            })
            params = [0,0,0,0,0,'','','','','']
            akaCnt = 0
          }
        }
      }

      if(IO.Exists('webui/asset/config/events.json')) {
        let bufEventData = await IO.ReadFile('webui/asset/json/events.json')
        let bufEventConfig = await IO.ReadFile('webui/asset/config/events.json')
        let eventData = JSON.parse(bufEventData.toString())
        let eventConfig = JSON.parse(bufEventConfig.toString())
        for(const eData of eventData['events' + Math.abs(gameVersion)]) {
          let stmpEvntInfo = unlockEvents[eData.id]
          if(stmpEvntInfo && checkVerStart(version, eData.version, eData.start, date)) {
            if(eData.type === 'stamp' && eventConfig[eData.id] !== undefined && eventConfig[eData.id].toggle) {
              for(const stmpData of stmpEvntInfo.info.data) {
                if(!stmpData.version) {
                  extend.push({
                    'type': 3,
                    'id': stmpData.stmpid,
                    'params': [
                      5,
                      stmpData.stps, 
                      0, 
                      stmpData.stps % 10000, 
                      (stmpData.stmpid.toString() in unlockEvents.refillStamps) ? 999999 : 0,
                      ('stmpHdJ' in stmpEvntInfo.info) ? stmpEvntInfo.info.stmpHdJ : stmpEvntInfo.info.stmpHd,
                      stmpEvntInfo.info.stmpHd,
                      ('stmpFtJ' in stmpEvntInfo.info) ? stmpEvntInfo.info.stmpFtJ : stmpEvntInfo.info.stmpFt,
                      stmpEvntInfo.info.stmpFt,
                      stmpData.stprwrd
                    ]
                  })

                  if(eData.id === 'qmastamp') {
                    for(const quiz of QUIZ7) {
                      extend.push({
                        type: 23,
                        id: quiz.id,
                        params: [
                          0, quiz.id, 1, 0, 0,
                          quiz.text, '', '', '', ''
                        ]
                      })

                      for(const [ind, list] of quiz.list.entries()) {
                        let qParamStr = []
                        let qListStr = JSON.stringify(list)
                        let qListEsc = qListStr.replace(/"/g, '\\"')
                        let sliceLen = 0
                        let paramStrCnt = 0
                        if(qListEsc.length > 1000) {
                          for (let i = 0; i < qListEsc.length; i += 1000) {
                            if(paramStrCnt === 5) {
                              paramStrCnt++
                              console.log("ignoring list. too long - id/ind " + quiz.id + '/' + ind)
                              break
                            }
                            let strAdd = qListEsc.slice(i, i + 1000).replace(/\\"/g, '"')
                            qParamStr.push(strAdd)
                            paramStrCnt++
                          }
                        } else qParamStr.push(qListEsc.replace(/\\"/g, '"'))

                        while (qParamStr.length < 5) qParamStr.push('')

                        if(paramStrCnt <= 5) extend.push({
                          type: 23,
                          id: quiz.id,
                          params: [
                            1, quiz.id, 0, 0, 0
                          ].concat(qParamStr)
                        })
                      }


                    }
                  }
                } else if(checkVerStart(version, stmpData.version, stmpData.start, date)) {
                  extend.push({
                    type: 3,
                    id: stmpData.stmpid,
                    params: [
                      5,
                      stmpData.stps, 
                      0, 
                      stmpData.stps % 10000, 
                      (stmpData.stmpid.toString() in unlockEvents.refillStamps) ? 999999 : 0,
                      ('stmpHdJ' in stmpData) ? stmpData.stmpHdJ : stmpData.stmpHd,
                      stmpData.stmpHd,
                      ('stmpFtJ' in stmpData) ? stmpData.stmpFtJ : stmpData.stmpFt,
                      stmpData.stmpFt,
                      stmpData.stprwrd
                    ]
                  })
                }
              }

              if(stmpEvntInfo.type === 'select') {
                extend.push({
                  type: 3,
                  id: stmpEvntInfo.info.id,
                  params: [
                    9,
                    ((stmpEvntInfo.info.textstampval !== undefined) ? stmpEvntInfo.info.textstampval : 0),
                    0,
                    0,
                    0,
                    stmpEvntInfo.info.sheet,
                    '',
                    stmpEvntInfo.info.stmpSlHd,
                    stmpEvntInfo.info.stmpSlFt,
                    stmpEvntInfo.info.stmpBg
                  ]
                })
              }
            }
            else if(eData.type === 'completestamp' && eventConfig[eData.id] !== undefined && eventConfig[eData.id].toggle) {
              extend.push({
                type: 19,
                id: stmpEvntInfo.info.id,
                params: [
                  0, 0, 0, 0, 0,
                  JSON.stringify(stmpEvntInfo.info.data),
                  '',
                  '',
                  '',
                  ''
                ]
              })
            }
            else if(eData.type === 'tama' && eventConfig[eData.id] !== undefined && eventConfig[eData.id].toggle) {
              events.push('TAMAADV_ENABLE')
              extend.push({
                type: 20,
                id: stmpEvntInfo.info.id,
                params: [
                  0, 0, 0, 0, 0,
                  stmpEvntInfo.info.list,
                  '',
                  '',
                  '',
                  ''
                ]
              })
            }
            else if(eData.type === 'variant' && eventConfig[eData.id] !== undefined && eventConfig[eData.id].toggle) {
              extend.push({
                type: 22,
                id: stmpEvntInfo.info.id,
                params: [
                  0,
                  stmpEvntInfo.info.setid,
                  parseInt(eventConfig[eData.id].settings.minOverTrackRank),
                  parseInt(eventConfig[eData.id].settings.minSealDiff),
                  parseInt(eventConfig[eData.id].settings.maxSealRetain),
                  '',
                  '',
                  '',
                  '',
                  ''
                ]
              })
            }
          } else if (eData.id === 'achmissions' && checkVerStart(version, eData.version, eData.start, date)) {
            let toggles = Object.keys(eventConfig['achmissions'].toggle)
            let eventIds = '\t'
            let prio = '1'
            toggles.forEach(t => {
              if(eventConfig['achmissions'].toggle[t] === true) {
                eventIds += (eventIds === '\t' ? '' : ',') + t.split('_')[1]
                prio = t.split('_')[1]
              }
            })
            events.push('ACHIEVEMENT_EVENT_MISSION' + eventIds)
            events.push('ACHIEVEMENT_EVENT_MISSION_PRIORITY\t' + prio)
          }
        }
      }

      const arenaOpen = BigInt(date) >= currentArena.time_start && (BigInt(date) < currentArena.time_end || U.GetConfig('arena_no_endtime'))
      const shopItemSet = arenaItems[U.GetConfig('arena_station7')]
      const shopOpen = arenaOpen && !_.isEmpty(shopItemSet)
      let arenaData = {}

      const arenaStart = new Date(Number(currentArena.time_start) * 1000).toISOString().split('T')[0].split('-').join('')
      if(arenaOpen && checkVerStart(version, 20260421, arenaStart, date) && currentArena.season !== 0) {
        arenaData = {
          season: K.ITEM('s32', currentArena.season),
          rule: K.ITEM('s32', currentArena.rule),
          rank_match_target: K.ITEM('s32', currentArena.rank_match_target),
          time_start: K.ITEM('u64', currentArena.time_start),
          time_end: K.ITEM('u64', currentArena.time_end),
          shop_start: K.ITEM('u64', currentArena.shop_start),
          shop_end: K.ITEM('u64', currentArena.shop_end),
          is_open: K.ITEM('bool', arenaOpen),
          is_shop: K.ITEM('bool', shopOpen),
          catalog: (shopOpen && version >= shopItemSet.version) ? shopItemSet.items.map(item => ({
            catalog_id: K.ITEM('s32', item[0]),
            catalog_type: K.ITEM('s32', item[1]),
            price: K.ITEM('s32', item[2]),
            item_type: K.ITEM('s32', item[3]),
            item_id: K.ITEM('s32', item[4]),
            param: K.ITEM('s32', item[5]),
          })) : []
        }
      }
      let valgene_info = []
      let valgene_items = []

      valgene_info = valgene.info.filter(val => checkVerStart(version, val.version, val.start ?? 0, date)).map(val => ({
        valgene_name: K.ITEM('str', val.valgene_name),
        valgene_name_english: K.ITEM('str', val.valgene_name_english),
        valgene_id: K.ITEM('s32', val.valgene_id)
      }))

      valgene.catalog.forEach((val) => {
        val.items.forEach((itemVal) => {
          itemVal.item_ids.forEach((item_id) => {
            valgene_items.push({
              valgene_id: K.ITEM('s32', val.volume),
              rarity: K.ITEM('s32', valgene.rarity[itemVal.type.toString()]),
              item_type: K.ITEM('s32', itemVal.type),
              item_id: K.ITEM('s32', item_id)
            })
          })
        })
      })

      let apigeneInfo = []
      let apigeneItems = []

      if(gameVersion === 7) {
        apigeneInfo = apigene.info.filter(val => version >= val.version).map(api => ({
          apigene_id: K.ITEM('s32', api.apigene_id),
          name: K.ITEM('str', api.name),
          name_english: K.ITEM('str', api.name_english),
          common_rate: K.ITEM('s32', api.common_rate),
          uncommon_rate: K.ITEM('s32', api.uncommon_rate),
          rare_rate: K.ITEM('s32', api.rare_rate),
          price: K.ITEM('s32', api.price),
          no_duplicate: K.ITEM('bool', api.no_duplicate)
        }))

        apigene.catalog.forEach((val) => {
          if(version >= apigene.info.find(a => a.apigene_id === val.volume).version) {
            val.items.forEach((itemVal) => {
              itemVal.item_ids.forEach((item_id) => {
                apigeneItems.push({
                  apigene_id: K.ITEM('s32', val.volume),
                  rarity: K.ITEM('s32', apigene.rarity[itemVal.type.toString()]),
                  item_type: K.ITEM('s32', itemVal.type),
                  item_id: K.ITEM('s32', item_id)
                })
              })
            })
          }
        })
      }

      if(currentDate.substring(0,4) === '2/5/') events.push("EVENTDATE_ONIGO")
      if(currentDate.substring(0,5) === '2/14/') events.push('VALENTINES_DAY_2024')
      if(currentDate.substring(0,5) === '2/15/') events.push('WHITE_DAY_2024')
      if(currentDate.substring(0,4) === '4/1/') {
        events.push('EVENTDATE_APRILFOOL');
        events.push('YUKKURI_RASIS_CREW_ENABLE')
        events.push('YUKKURI_RASIS_TITLE_ENABLE')
        events.push('APRIL_RAINBOW_LINE_ENABLE')
        for (const afsong in APRILFOOLSSONGS) {
          for (let j = 0; j < 5; ++j) {
            songs.push({
              music_id: K.ITEM('s32', APRILFOOLSSONGS[afsong]),
              music_type: K.ITEM('u8', j),
              limited: K.ITEM('u8', 3),
            });
          }
        }
      }
      if(currentDate.substring(0,5) === '5/10/') events.push("EVENTDATE_GOTT")
      if(['10/24/', '10/25/', '10/26/', '10/27/', '10/28/', '10/29/', '10/30/', '10/31/'].includes(currentDate.substring(0,6))) events.push('HALLOWEEN_EVENT')
      if(['12/24/', '12/25/', '12/26/'].includes(currentDate.substring(0,6))) events.push('MERRY_CHRISTMAS_2023')

      let curWeekly = []
      if(IO.Exists('webui/asset/config/weeklymusic.json')) {
        let bufWeeklyMusic = await IO.ReadFile('webui/asset/config/weeklymusic.json')
        let weeklyMusic = JSON.parse(bufWeeklyMusic.toString())
        let weekData
        for(let weekIter in weeklyMusic) {
          if(Number(date) > weeklyMusic[weekIter].start && Number(date) <= weeklyMusic[weekIter].end) weekData = weeklyMusic[weekIter]
        }
        if(weekData != undefined) {
          curWeekly.push({
            weekId: weekData.weekId,
            musicId: weekData.musicId,
            start: weekData.start,
            end: weekData.end
          })
        }
      }
      response = {
        valgene: {
          info: valgene_info,
          catalog: valgene_items
        },
        arena: arenaData,
        event: {
          info: events.map(e => ({
            event_id: K.ITEM('str', e),
          })),
        },
        extend: {
          info: extend.map(e => ({
            extend_id: K.ITEM('u32', e.id),
            extend_type: K.ITEM('u32', e.type),
            param_num_1: K.ITEM('s32', e.params[0]),
            param_num_2: K.ITEM('s32', e.params[1]),
            param_num_3: K.ITEM('s32', e.params[2]),
            param_num_4: K.ITEM('s32', e.params[3]),
            param_num_5: K.ITEM('s32', e.params[4]),
            param_str_1: K.ITEM('str', e.params[5]),
            param_str_2: K.ITEM('str', e.params[6]),
            param_str_3: K.ITEM('str', e.params[7]),
            param_str_4: K.ITEM('str', e.params[8]),
            param_str_5: K.ITEM('str', e.params[9]),
          })),
        },
        music: { info: musicOverrideFin },
        music_limited: { info: songs },
        skill_course: {
          info: courses.reduce(
            (acc, s) => {
              if(version >= s.version) {
                let courseData = s.courses.map(c => ({
                  season_id: K.ITEM('s32', s.id),
                  season_name: K.ITEM('str', s.name),
                  season_new_flg: K.ITEM('bool', s.isNew),
                  course_type: K.ITEM('s16', c.type),
                  course_id: K.ITEM('s16', c.id),
                  course_name: K.ITEM('str', c.name),
                  skill_level: K.ITEM('s16', c.level),
                  skill_type: K.ITEM('s16', 0),
                  skill_name_id: K.ITEM('s16', c.nameID),
                  matching_assist: K.ITEM('bool', c.assist),
                  clear_rate: K.ITEM('s32', 5000),
                  avg_score: K.ITEM('u32', 15000000),
                  track: c.tracks.map(t => ({
                    track_no: K.ITEM('s16', t.no),
                    music_id: K.ITEM('s32', t.mid),
                    music_type: K.ITEM('s8', t.mty),
                  })),
                }))
                acc = acc.concat(courseData)
                if((info.model.split(":")[2] === 'G' || info.model.split(":")[2] === 'H') && s.hasGod !== undefined && s.hasGod === 1 && version >= 20230530) {
                  courseData = courseData.concat(
                    s.courses.map(c => ({
                      season_id: K.ITEM('s32', s.id),
                      season_name: K.ITEM('str', s.name),
                      season_new_flg: K.ITEM('bool', s.isNew),
                      course_type: K.ITEM('s16', c.type),
                      course_id: K.ITEM('s16', c.id),
                      course_name: K.ITEM('str', c.name),
                      skill_level: K.ITEM('s16', c.level),
                      skill_type: K.ITEM('s16', s.hasGod),
                      skill_name_id: K.ITEM('s16', c.nameID),
                      matching_assist: K.ITEM('bool', c.assist),
                      clear_rate: K.ITEM('s32', 5000),
                      avg_score: K.ITEM('u32', 15000000),
                      track: c.tracks.map(t => ({
                        track_no: K.ITEM('s16', t.no),
                        music_id: K.ITEM('s32', t.mid),
                        music_type: K.ITEM('s8', t.mty),
                      })),
                    }))
                  )
                  acc = acc.concat(courseData)
                }  
              }
              return acc
            },
            []
          ),
        },
        weekly_music: curWeekly != [] ? curWeekly.map(w => ({
          week_id: K.ITEM('s32', w.weekId),
          music_id: K.ITEM('s32', w.musicId),
          time_start: K.ITEM('u64', BigInt(w.start)),
          time_end: K.ITEM('u64', BigInt(w.end))
        })) : []
      }

      if(gameVersion === 7) {
        response['apigene'] = {
          info: apigeneInfo,
          catalog: apigeneItems
        }
      }
    }

    send.object(
      response,
      { encoding: 'utf8' }
    );
  } catch (error) {
    console.log(error)
  }     
};

export const log: EPR = async (info, data, send) => {
  send.success();
}
