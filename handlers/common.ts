import { EVENT6, COURSES6, EXTENDS6, APRILFOOLSSONGS, VALKYRIE_SONGS,
          LICENSED_SONGS6, ARENA, VALGENE, INFORMATION6, UNLOCK_EVENTS6
} from '../data/exg';
import {getVersion, getRandomIntInclusive} from '../utils';

export const common: EPR = async (info, data, send) => {
  try {
    let music_db = await IO.ReadFile('webui/asset/json/music_db.json')
    let events = [];
    let courses = [];
    let extend = [];
    let date = new Date();
    let currentYMDDate = parseInt([date.getFullYear(), ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1), (date.getDate() > 9 ? '' : '0') + date.getDate()].join(''));
    let currentDate = date.toLocaleDateString()
    console.log('====================================')
    console.log("Calling common function");
    
    const version = parseInt(info.model.split(":")[4]);

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
        courses = COURSES6;
        EXTENDS6.forEach(val => extend.push(Object.assign({}, val)));
        break;
      }
    }
    let songs = [];
    const gameVersion = getVersion(info);
    let songNum = 2300;

    if(U.GetConfig('unlock_all_songs')) {
      console.log("Unlocking songs");
      for (let i = 1; i < songNum; ++i) {
        for (let j = 0; j < 5; ++j) {
          songs.push({
            music_id: K.ITEM('s32', i),
            music_type: K.ITEM('u8', j),
            limited: K.ITEM('u8', 3),
          });
        }
      }
    } else {  
      let mdb = JSON.parse(music_db.toString());
      
      let limitedNo = 2;
      songNum = parseInt(mdb.mdb.music[mdb.mdb.music.length - 1]['@id'])
      console.log("Latest song id in mdb: " + songNum)
      for (let i = 0; i <= songNum; i++) {
        var foundSongIndex = mdb.mdb.music.map(function(x) {return x['@id']; }).indexOf(i.toString());
        if(foundSongIndex != -1) {
          var songData = mdb.mdb.music[foundSongIndex];
          if(gameVersion === 6 || gameVersion === -6) {
            if('distribution_date' in songData['info'] && parseInt(songData['info']['distribution_date']['#text']) > currentYMDDate) {
              console.log("Unreleased song: " + songData.info.title_name)
            }
            else {
              limitedNo = 2;
              
              // if song is released during exceed gear
              if(songData.info.version['#text'] === '6') {
                // Licensed songs released in Exceed Gear needs limited=3 to appear
                if(LICENSED_SONGS6.includes(i.toString())) limitedNo += 1;
                else if(VALKYRIE_SONGS.includes(i.toString()) && info.model.split(":")[2].match(/^(G|H)$/g) == null) limitedNo -= 1;
                
                // manual lock songs
                if(i === 2034) limitedNo = 2;

                for(let j = 0; j < 5; j++) {
                  songs.push({
                    music_id: K.ITEM('s32', i),
                    music_type: K.ITEM('u8', j),
                    limited: K.ITEM('u8', limitedNo),
                  });
                }
              }

              // if song has new XCD track
              else if (songData.info.inf_ver['#text'] === '6') { 
                // manual lock charts
                if (i === 469) limitedNo = 2;
                songs.push({
                  music_id: K.ITEM('s32', i),
                  music_type: K.ITEM('u8', 3),
                  limited: K.ITEM('u8', limitedNo),
                });
              }

              // Licensed songs released pre-exceed gear
              else if (LICENSED_SONGS6.includes(i.toString())) {
                for(let j = 0; j < 5; j++) {
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
    }

    if(INFORMATION6[version.toString()] != undefined) {
      console.log("Sending server information");
      let time = new Date();
      let tempDate = time.getDate();
      const currentTime = parseInt((time.getTime()/100000) as unknown as string)*100;
      for(const keyIter in INFORMATION6[version.toString()]) {
        extend.push({
          id: parseInt(keyIter) + 1,
          type: 1,
          params: [
            1,
            currentTime,
            0,
            0,
            31,
            '[f:0]SERVER INFORMATION',
            INFORMATION6[version.toString()][keyIter],
            '',
            '',
            '',
          ],
        });
      }
    }

    if(IO.Exists('webui/asset/config/events.json')) {
      const itemTypeList = {"track": 'e', "appeal": 'a', "crew": 'c', "pcb": 'b', "prereq": "r"}
      let bufEventData = await IO.ReadFile('webui/asset/json/events.json')
      let bufEventConfig = await IO.ReadFile('webui/asset/config/events.json')
      let eventData = JSON.parse(bufEventData.toString())
      let eventConfig = JSON.parse(bufEventConfig.toString())
      for(const eventIter in eventData['events']) {
        let stmpEvntInfo = UNLOCK_EVENTS6[eventData['events'][eventIter]['id']]
        if(eventData['events'][eventIter]['type'] === 'stamp' && eventConfig[eventData['events'][eventIter]['id']] !== undefined && eventConfig[eventData['events'][eventIter]['id']]['toggle']) {
          for(const stmpDataIter in stmpEvntInfo['info']['data']) {
            extend.push({
              'type': 3,
              'id': stmpEvntInfo['info']['data'][stmpDataIter]['stmpid'],
              'params': [
                5,
                stmpEvntInfo['info']['data'][stmpDataIter]['stps'], 
                0, 
                (stmpEvntInfo['info']['data'][stmpDataIter]['stmpid'].toString() in UNLOCK_EVENTS6['refillStamps']) ? 12 : stmpEvntInfo['info']['data'][stmpDataIter]['stps'], 
                0,
                '',
                stmpEvntInfo['info']['stmpHd'],
                '',
                stmpEvntInfo['info']['stmpFt'],
                stmpEvntInfo['info']['data'][stmpDataIter]['stprwrd']
              ]
            })
          }

          if(stmpEvntInfo['type'] === 'select') {
            extend.push({
              'type': 3,
              'id': stmpEvntInfo['info']['id'],
              'params': [
                9,
                ((stmpEvntInfo['info']['textstampval'] !== undefined) ? stmpEvntInfo['info']['textstampval'] : 0),
                0,
                0,
                0,
                stmpEvntInfo['info']['sheet'],
                '',
                stmpEvntInfo['info']['stmpSlHd'],
                stmpEvntInfo['info']['stmpSlFt'],
                stmpEvntInfo['info']['stmpBg']
              ]
            })
          }
        }
        else if(eventData['events'][eventIter]['type'] === 'completestamp' && eventConfig[eventData['events'][eventIter]['id']] !== undefined && eventConfig[eventData['events'][eventIter]['id']]['toggle']) {
          extend.push({
            'type': 19,
            'id': stmpEvntInfo['info']['id'],
            'params': [
              0, 0, 0, 0, 0,
              JSON.stringify(stmpEvntInfo['info']['data']),
              '',
              '',
              '',
              ''
            ]
          })
        }
        else if(eventData['events'][eventIter]['type'] === 'tama' && eventConfig[eventData['events'][eventIter]['id']] !== undefined && eventConfig[eventData['events'][eventIter]['id']]['toggle']) {
          events.push('TAMAADV_ENABLE')
          extend.push({
            'type': 20,
            'id': stmpEvntInfo['info']['id'],
            'params': [
              0, 0, 0, 0, 0,
              stmpEvntInfo['info']['list'],
              '',
              '',
              '',
              ''
            ]
          })
        }
        else if(eventData['events'][eventIter]['type'] === 'variant' && eventConfig[eventData['events'][eventIter]['id']] !== undefined && eventConfig[eventData['events'][eventIter]['id']]['toggle']) {
          extend.push({
            'type': 22,
            'id': stmpEvntInfo['info']['id'],
            'params': [
              0,
              stmpEvntInfo['info']['setid'],
              parseInt(eventConfig[eventData['events'][eventIter]['id']]['settings']['minOverTrackRank']),
              parseInt(eventConfig[eventData['events'][eventIter]['id']]['settings']['minSealDiff']),
              0,
              '',
              '',
              '',
              '',
              ''
            ]
          })
        }
      }
    }

    if(IO.Exists('handlers/extend.json')) {
      let bufTest = await IO.ReadFile('handlers/extend.json')
      let extendTest = JSON.parse(bufTest.toString())
      for(const ex in extendTest) {
        extend.push({
          'type': extendTest[ex]['type'],
          'id': extendTest[ex]['id'],
          'params': extendTest[ex]['params']
        })
      }
    }

    let arena_szn = U.GetConfig('arena_szn')  
    let arena_catalog_items = []

    if(arena_szn !== 'None') {
      arena_catalog_items = ARENA[arena_szn].arena_items.map(item => ({
        catalog_id: K.ITEM('s32', item[0]),
        catalog_type: K.ITEM('s32', item[1]),
        price: K.ITEM('s32', item[2]),
        item_type: K.ITEM('s32', item[3]),
        item_id: K.ITEM('s32', item[4]),
        param: K.ITEM('s32', item[5]),
      }))
    }

    let valgene_info = []
    let valgene_items = []

    valgene_info = VALGENE.info.map(val => ({
      valgene_name: K.ITEM('str', val.valgene_name),
      valgene_name_english: K.ITEM('str', val.valgene_name_english),
      valgene_id: K.ITEM('s32', val.valgene_id)
    }))

    VALGENE.catalog.forEach((val) => {
      val.items.forEach((itemVal) => {
        itemVal.item_ids.forEach((item_id) => {
          valgene_items.push({
            valgene_id: K.ITEM('s32', val.volume),
            rarity: K.ITEM('s32', VALGENE.rarity[itemVal.type.toString()]),
            item_type: K.ITEM('s32', itemVal.type),
            item_id: K.ITEM('s32', item_id)
          })
        })
      })
    })

    if(currentDate.substring(0,4) === '2/5/') events.push("EVENTDATE_ONIGO")
    if(currentDate.substring(0,5) === '2/14/') events.push('VALENTINES_DAY_2024')
    if(currentDate.substring(0,5) === '2/15/') events.push('WHITE_DAY_2024')
    if(currentDate.substring(0,4) === '4/1/') {
      console.log('Using April Fools Event')
      events.push('EVENTDATE_APRILFOOL');
      events.push('YUKKURI_RASIS_CREW_ENABLE')
      events.push('YUKKURI_RASIS_TITLE_ENABLE')
      events.push('APRIL_RAINBOW_LINE_ENABLE')
      for (const afsong in APRILFOOLSSONGS) {
        for (let j = 0; j < 5; ++j) {
          songs.push({
            music_id: K.ITEM('s32', parseInt(APRILFOOLSSONGS[afsong])),
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

    console.log("Sending common objects");
    send.object(
      {
        valgene: {
          info: valgene_info,
          catalog: valgene_items
        },
        arena: (arena_szn !== 'None') ? {
          season: K.ITEM('s32', ARENA[arena_szn].details.season),
          rule: K.ITEM('s32', ARENA[arena_szn].details.rule),
          rank_match_target: K.ITEM('s32', ARENA[arena_szn].details.rank_match_target),
          time_start: K.ITEM('u64', ARENA[arena_szn].details.time_start),
          time_end: K.ITEM('u64', ARENA[arena_szn].details.time_end),
          shop_start: K.ITEM('u64', ARENA[arena_szn].details.shop_start),
          shop_end: K.ITEM('u64', ARENA[arena_szn].details.shop_end),
          is_open: K.ITEM('bool', ARENA[arena_szn].details.is_open),
          is_shop: K.ITEM('bool', ARENA[arena_szn].details.is_shop),
          catalog: arena_catalog_items
        } : {},
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
        music_limited: { info: songs },
        skill_course: {
          info: courses.reduce(
            (acc, s) => {
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
              if((info.model.split(":")[2] === 'G' || info.model.split(":")[2] === 'H') && s.hasGod !== undefined && s.hasGod === 1) {
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
      },
      { encoding: 'utf8' }
    );
  } catch (error) {
    console.log(error)
  }     
};

export const log: EPR = async (info, data, send) => {
  send.success();
}
