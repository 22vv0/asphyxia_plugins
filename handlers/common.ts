import { EVENT6, COURSES6, EXTENDS6, APRILFOOLSSONGS, VALKYRIE_SONGS, LICENSED_SONGS6, CURRENT_ARENA, ARENA_STATION_ITEMS, VALGENE, INFORMATION6, UNLOCK_EVENTS6, MUSIC_OVERRIDE6 } from '../data/exg';
import { EVENT7, COURSES7, EXTENDS7, LICENSED_SONGS7, CURRENT_ARENA7, ARENA_STATION_ITEMS7, VALGENE7, APIGENE7, INFORMATION7, UNLOCK_EVENTS7, EGSONGS_LOCKED, MUSIC_OVERRIDE7 } from '../data/nbl';
import {getVersion, checkVerStart, getRandomIntInclusive} from '../utils';

export const common: EPR = async (info, data, send) => {
  try {
    let events = [];
    let courses = [];
    let extend = [];
    let information = [];
    let licensedSongs = [];
    let unlockEvents;
    let currentArena;
    let arenaItems;
    let valgene;
    let apigene;
    let date = new Date();
    let currentYMDDate = parseInt([date.getFullYear(), ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1), (date.getDate() > 9 ? '' : '0') + date.getDate()].join(''));
    let currentDate = date.toLocaleDateString()
    let songNum = 0;
    const gameVersion = getVersion(info);

    console.log('====================================')
    console.log("Calling common function");
    
    const version = parseInt(info.model.split(":")[4].slice(0, -2));

    switch (info.method) {
      case 'sv6_common': {
        console.log('Game: Exceed Gear')
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
        licensedSongs = LICENSED_SONGS6;
        unlockEvents = UNLOCK_EVENTS6;
        currentArena = CURRENT_ARENA;
        arenaItems = ARENA_STATION_ITEMS;
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
        licensedSongs = LICENSED_SONGS7;
        unlockEvents = UNLOCK_EVENTS7;
        currentArena = CURRENT_ARENA7;
        arenaItems = {...ARENA_STATION_ITEMS, ...ARENA_STATION_ITEMS7};
        valgene = {
          info: [...VALGENE.info, ...VALGENE7.info],
          rarity: {...VALGENE.rarity, ...VALGENE7.rarity},
          catalog: [...VALGENE.catalog, ...VALGENE7.catalog]
        }
        apigene = APIGENE7;
        EXTENDS7.filter(ex => checkVerStart(version, ex.version, ex.start, date)).forEach(val => extend.push(Object.assign({}, val)));
        songNum = 2400
        break;
      }
    }
    let music_db = await IO.ReadFile('webui/asset/json/music_db.json')
    let mdb = JSON.parse(music_db.toString());
    let mdbFin = [...mdb.mdb.music, ...mdb.omni.music]
    let songs = [];
    let diffName = ['novice', 'advanced', 'exhaust', 'infinite', 'maximum', 'ultimate']

    if(U.GetConfig('unlock_all_songs')) {
      console.log("Unlocking songs. Make sure music_db.json is updated.");
      for (let i = 1; i < songNum; ++i) {
        var foundSongIndex = mdbFin.map(function(x) {return x['id']; }).indexOf(i.toString());
        if(foundSongIndex != -1) {
          var songData = mdbFin[foundSongIndex];
          for (let j = 0; j < 6; ++j) {
            if(songData.difficulty[diffName[j]] != '0') {
              songs.push({
                music_id: K.ITEM('s32', i),
                music_type: K.ITEM('u8', j),
                limited: K.ITEM('u8', 3),
              });
            }
          }
        }
      }
    } 
    else {
      let limitedNo = 2;
      let mdbId = Math.max(...mdb.mdb.music.map(m => parseInt(m['id'])))
      let omniId = Math.max(...mdb.omni.music.map(m => parseInt(m['id'])))
      songNum = mdbId > omniId ? mdbId : omniId 

      console.log("Highest music id: " + songNum)
      for (let i = 0; i <= songNum; i++) {
        var foundSongIndex = mdbFin.map(function(x) {return x['id']; }).indexOf(i.toString());
        if(foundSongIndex != -1) {
          var songData = mdbFin[foundSongIndex];
          if(Math.abs(gameVersion) === 6) {
            if(parseInt(songData.info.version) <= 6 && 'distribution_date' in songData['info'] && parseInt(songData['info']['distribution_date']) > currentYMDDate) {
              console.log("Unreleased song: " + songData.info.title_name)
            }
            else {
              limitedNo = 2;
              
              // if song is released during exceed gear
              if(songData.info.version === '6') {
                // Licensed songs released in Exceed Gear needs limited=3 to appear
                if(licensedSongs.includes(i)) limitedNo += 1;
                else if(VALKYRIE_SONGS.includes(i) && info.model.split(":")[2].match(/^(G|H)$/g) == null) limitedNo -= 1;
                
                // manual lock songs
                if(i === 2034) limitedNo = 2;

                for(let j = 0; j < 6; j++) {
                  if(songData.difficulty[diffName[j]] != '0') {
                    songs.push({
                      music_id: K.ITEM('s32', i),
                      music_type: K.ITEM('u8', j),
                      limited: K.ITEM('u8', limitedNo),
                    });
                  }
                }
              }

              // if song has new XCD track
              else if (songData.info.inf_ver === '6') { 
                // manual lock charts
                if (i === 469) limitedNo = 2;
                songs.push({
                  music_id: K.ITEM('s32', i),
                  music_type: K.ITEM('u8', 3),
                  limited: K.ITEM('u8', limitedNo),
                });
              }
            }
          }
          else if(gameVersion === 7) {
            if(parseInt(songData.info.version) <= 7 && 'distribution_date' in songData['info'] && parseInt(songData['info']['distribution_date']) > currentYMDDate) {
              console.log("Unreleased song: " + songData.info.title_name)
            }
            else {
              limitedNo = 2;

              let egSongsMerge = [...EGSONGS_LOCKED['crossresonance']]
              if(songData.info.version === '7' || egSongsMerge.includes(i)) {
                if(licensedSongs.includes(i)) limitedNo += 1;

                for(let j = 0; j < 6; j++) {
                  if(songData.difficulty[diffName[j]] != '0') {
                    songs.push({
                      music_id: K.ITEM('s32', i),
                      music_type: K.ITEM('u8', j),
                      limited: K.ITEM('u8', limitedNo),
                    });
                  }
                }
              }
            }
          }
          // Licensed songs released prior to current version
          if (parseInt(songData.info.version) < Math.abs(gameVersion) && licensedSongs.includes(i)) {
            limitedNo += 1;
            for(let j = 0; j < 6; j++) {
              if(songData.difficulty[diffName[j]] != '0') {
                songs.push({
                  music_id: K.ITEM('s32', i),
                  music_type: K.ITEM('u8', j),
                  limited: K.ITEM('u8', limitedNo),
                });
              }
            }
          }
        }
      }
    }

    let musicOverride = []
    let mList = (Math.abs(gameVersion) === 6) ? MUSIC_OVERRIDE6 : MUSIC_OVERRIDE7
    const createItem = (key, val) => {return (typeof val === 'string') ? K.ITEM('str', val) : ((key === 'volume') ? K.ITEM('u16', val) : K.ITEM('u32', val))}
    for(const music of mList.filter(m => checkVerStart(0, 0, m.start, date))) {
      let mInfKeys = Object.keys(music).filter(m => !['charts', 'start'].includes(m))
      let musicInfo = {}
      mInfKeys.forEach(k => {
        musicInfo[k] = createItem(k, music[k])
      })
      musicOverride.push(musicInfo)

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
      musicOverride.push(chartInfo)
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

    if(mdb.omni.music.length > 0) {
      let omniList = mdb.omni.music.map(m => m['id'])
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
            }

            if(stmpEvntInfo.type === 'select') {
              extend.push({
                'type': 3,
                'id': stmpEvntInfo.info.id,
                'params': [
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
              'type': 19,
              'id': stmpEvntInfo.info.id,
              'params': [
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
              'type': 20,
              'id': stmpEvntInfo.info.id,
              'params': [
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
              'type': 22,
              'id': stmpEvntInfo.info.id,
              'params': [
                0,
                stmpEvntInfo.info.setid,
                parseInt(eventConfig[eData.id].settings.minOverTrackRank),
                parseInt(eventConfig[eData.id].settings.minSealDiff),
                0,
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

    // For testing extend data.
    if(IO.Exists('handlers/extend.json')) {
      let bufTest = await IO.ReadFile('handlers/extend.json')
      let extendTest = JSON.parse(bufTest.toString())
      for(const ex in extendTest) {
        extend.push({
          'type': extendTest[ex].type,
          'id': extendTest[ex].id,
          'params': extendTest[ex].params
        })
      }
    }

    let arenaOpen = U.GetConfig('arena_no_endtime') || BigInt(date) < currentArena.time_end
    let shopOpen = arenaOpen && U.GetConfig('arena_station') !== 'None'
    let arenaData = {}

    if(arenaOpen && version >= 20220425 && currentArena.season !== 0) {
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
        catalog: (shopOpen && U.GetConfig('arena_station') !== 'None' && version >= arenaItems[U.GetConfig('arena_station')].version) ? arenaItems[U.GetConfig('arena_station')].items.map(item => ({
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

    valgene_info = valgene.info.filter(val => version >= val.version).map(val => ({
      valgene_name: K.ITEM('str', val.valgene_name),
      valgene_name_english: K.ITEM('str', val.valgene_name_english),
      valgene_id: K.ITEM('s32', val.valgene_id)
    }))

    valgene.catalog.forEach((val) => {
      if(version >= valgene.info.find(v => v.valgene_id === val.volume).version) {
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
      }
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

    let response = {
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
      music: { info: musicOverride },
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

    console.log("Sending common objects");
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
