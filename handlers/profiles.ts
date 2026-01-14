import { Skill } from '../models/skill'
import { Item } from '../models/item'
import { Param } from '../models/param'
import { Arena } from '../models/arena'
import { MusicRecord } from '../models/music_record'
import { CourseRecord } from '../models/course_record'
import { Profile } from '../models/profile'
import { ValgeneTicket } from '../models/valgene_ticket'
import { WeeklyMusicScore } from '../models/weeklymusic'
import { VariantPower } from '../models/variant'
import { getVersion, IDToCode } from '../utils'
import { Mix } from '../models/mix'
import { CURRENT_ARENA, EVENT_ITEMS6, UNLOCK_EVENTS6 } from '../data/exg'
import { CURRENT_ARENA7, EVENT_ITEMS7, UNLOCK_EVENTS7 } from '../data/nbl'
import { getRankListDB } from './webui'
import { DB_VER, nablaMigrate } from './migrate'

function unlockNavigators(items: Partial<Item>[]) {
  for (let i = 0; i < 300; ++i) items.push({ type: 11, id: i, param: 15 });
  console.log("Unlocking Navigators");
  // 10 genesis card for MITSURU's voice
  items.push({ type: 4, id: 599, param: 10 });
  return items;
}

function unlockAppealCards(items: Partial<Item>[]) {
  console.log("Unlocking Appeal Cards");
  for (let i = 0; i < 7000; ++i) items.push({ type: 1, id: i, param: 1 });

  return items;
}

function unlockAppealParts(items: Partial<Item>[]) {
  console.log("Unlocking Appeal Parts");
  for (let i = 0; i <= 50; ++i) items.push({ type: 23, id: i, param: 99 })
  for (let i = 0; i <= 200; ++i) items.push({ type: 24, id: i, param: 99 })

  return items;
}

function removeStampItems(items: Partial<Item>[]) {
  let itemsToRemove = []
  for (let index in items) {
    if (items[index].type === 17 && items[index].id % 4 != 0) {
      itemsToRemove.push(index)
    }
  }

  for (let itemIndex in itemsToRemove.reverse()) {
    items.splice(itemsToRemove[itemIndex], 1)
  }

  for (let x=0; x<items.length; x++) {
    if (items[x].type === 17) {
      items[x].id /= 4
    }
  }

  return items
}

export const loadScore: EPR = async (info, data, send) => {
  console.log("Now loading score");
  const version = Math.abs(getVersion(info));
  console.log("Got version: " + version);
  let refid = $(data).str('refid', $(data).attr().dataid);
  console.log("DataID:" + refid);
  if (!refid) return send.deny();
  console.log('Finding record');
  const records = await DB.Find<MusicRecord>(refid, { collection: 'music', version });

  if (version === 6) {
    return send.object({
      music: {
        info: records.map(r => ({
          param: K.ARRAY('u32', [
            r.mid,
            r.type,
            r.score,
            r.exscore,
            r.clear,
            r.grade,
            0,
            0,
            r.buttonRate,
            r.longRate,
            r.volRate,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ]),
        })),
      },
    });
  }

  if (version === 7) {
    return send.object({
      music: {
        info: records.map(r => ({
          param: K.ARRAY('u32', [
            r.mid,
            r.type,
            r.score,
            r.exscore,
            r.clear,
            r.grade,
            0,
            0,
            r.buttonRate,
            r.longRate,
            r.volRate,
            r.volforce,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]),
        })),
      },
    });
  }
};

export const saveScore: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).attr().dataid);
  if (!refid) return send.deny();

  const version = getVersion(info);
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));

  if (version === -6 || version === 7) { // Using alternate scoring system after 20210831
    const tracks = $(data).elements('track');
    for (const i of tracks) {
      const mid = i.number('music_id');
      const type = i.number('music_type');
      if (_.isNil(mid) || _.isNil(type)) return send.deny();

      const record = (await DB.FindOne<MusicRecord>(refid, {
        collection: 'music',
        mid,
        type,
        version: Math.abs(version)
      })) || {
        collection: 'music',
        version: Math.abs(version),
        mid,
        type,
        score: 0,
        exscore: 0,
        volforce: 0,
        clear: 0,
        grade: 0,
        buttonRate: 0,
        longRate: 0,
        volRate: 0,
      };

      const score = i.number('score', 0);
      const exscore = i.number('exscore', 0);
      const volforce = i.number('volforce', 0);
      if (score > record.score) {
        record.score = score;
        record.buttonRate = i.number('btn_rate', 0);
        record.longRate = i.number('long_rate', 0);
        record.volRate = i.number('vol_rate', 0);
      }
      if (exscore > record.exscore) {
        record.exscore = exscore;
      }

      if (!('volforce' in record) || volforce > record.volforce) {
        record.volforce = volforce;
      }

      if(Math.abs(version) === 6) {
        // in eg 20250422 mxv was added and had the id of 6 which caused problems with math.max since puc (id 5) is the highest lamp, uc (id 4) second
        let clearLamp = [0, 1, 2, 3, 6, 4, 5]
        let oldClear = record.clear
        let newClear = i.number('clear_type', 0)
        record.clear = (clearLamp.findIndex(c => c === newClear) > clearLamp.findIndex(c => c === oldClear)) ? newClear : oldClear;
      } else {
        // nabla switched clear lamp ids for mxv, uc and puc so it is in chronological order.
        record.clear = Math.max(i.number('clear_type', 0), record.clear);
      }
      record.grade = Math.max(i.number('score_grade', 0), record.grade);

      await DB.Upsert<MusicRecord>(
        refid,
        { collection: 'music', mid, type, version: Math.abs(version) },
        record
      );
    }
    return send.success();
  }
};

export const saveCourse: EPR = async (info, data, send) => {
  const refid = $(data).str('refid');
  if (!refid) return send.deny();

  const version = Math.abs(getVersion(info));
  if (version === 0) return send.deny();

  const sid = $(data).number('ssnid');
  const cid = $(data).number('crsid');

  if (_.isNil(sid) || _.isNil(cid)) return send.deny();

  await DB.Upsert<CourseRecord>(
    refid,
    { collection: 'course', sid, cid, version },
    {
      $set: {
        dbver: DB_VER
      },
      $max: {
        score: $(data).number('sc', 0),
        clear: $(data).number('ct', 0),
        grade: $(data).number('gr', 0),
        rate: $(data).number('ar', 0),
      },
      $inc: {
        count: 1,
      },
    }
  );

  return send.success();
};

export const save: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).attr().refid);
  if (!refid) return send.deny();

  const version = Math.abs(getVersion(info));
  if (version === 0) return send.deny();

  // Save Profile
  if (version === 6 || version === 7) {
    await DB.Update<Profile>(
      refid,
      { collection: 'profile', version: version },
      {
        $set: {
          appeal: $(data).number('appeal_id'),

          musicID: $(data).number('music_id'),
          musicType: $(data).number('music_type'),
          sortType: $(data).number('sort_type'),
          headphone: $(data).number('headphone'),

          hiSpeed: $(data).number('hispeed'),
          laneSpeed: $(data).number('lanespeed'),
          gaugeOption: $(data).number('gauge_option'),
          arsOption: $(data).number('ars_option'),
          notesOption: $(data).number('notes_option'),
          earlyLateDisp: $(data).number('early_late_disp'),
          drawAdjust: $(data).number('draw_adjust'),
          effCLeft: $(data).number('eff_c_left'),
          effCRight: $(data).number('eff_c_right'),
          narrowDown: $(data).number('narrow_down'),
        },
        $inc: {
          packets: $(data).number('earned_gamecoin_packet'),
          blocks: $(data).number('earned_gamecoin_block'),
          blasterEnergy: $(data).number('earned_blaster_energy'),
          playCount: 1,
          dayCount: 1,
          todayCount: 1,
          playChain: 1,
          maxPlayChain: 1,
          weekCount: 1,
          weekPlayCount: 1,
          weekChain: 1,
          maxWeekChain: 1
        },
      }
    );
  }
  
  // New course saving function found in version 20220214
  // Updated for God mode added in version 20230530
  // kac_id added in version 20230807
  const course = $(data).element('course');
  if(!_.isNil(course)){
      const sid = course.number('ssnid');
      const cid = course.number('crsid');
      const stype = course.number('st');
      const kacid = course.str('kac_id');

      if (!(_.isNil(sid) || _.isNil(cid))){
        await DB.Upsert<CourseRecord>(
          refid,
          { collection: 'course', sid, cid, stype, version },
          {
            $set: {
              kacId: kacid,
              dbver: DB_VER
            },
            $max: {
              score: course.number('sc', 0),
              exscore: course.number('ex', 0),
              clear: course.number('ct', 0),
              grade: course.number('gr', 0),
              rate: course.number('ar', 0),
            },
            $inc: {
              count: 1,
            },
          }
        );
      }
  }
  
  // Save Items
  const items = $(data).elements('item.info');

  for (const i of items) {
    const type = i.number('type');
    const id = i.number('id');
    let param = i.number('param');

    if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

    await DB.Upsert<Item>(
      refid,
      { collection: 'item', type, id, version },
      { $set: { param } }
    );
  }

  // Save Param
  const params = $(data).elements('param.info');
  for (const p of params) {
    const type = p.number('type');
    const id = p.number('id');
    const param = p.numbers('param');

    if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

    await DB.Upsert<Param>(
      refid,
      { collection: 'param', type, id, version },
      { $set: { param } }
    );
  }

  // Save version specific data
  await DB.Upsert<Skill>(
    refid,
    {
      collection: 'skill',
      version,
    },
    {
      $set: {
        base: $(data).number('skill_base_id'),
        level: $(data).number('skill_level'),
        name: $(data).number('skill_name_id'),
        type: $(data).number('skill_type'),
      },
    }
  );

  // Save Arena Data
  const arena_data = $(data).elements('arena');
  for (const are of arena_data) {
    const szn = are.number('season');
    const earnedRP = are.number('earned_rank_point');
    const earnedSP = are.number('earned_shop_point');
    const earnedUR = are.number('earned_ultimate_rate');
    const earnedMR = are.number('earned_megamix_rate');
    const earnedLE = are.number('earned_live_energy');
    const rankPlay = are.str('rank_play') == 'true' ? 1 : 0;
    const ultimatePlay = are.str('ultimate_play') == 'true' ? 1 : 0;
    await DB.Upsert<Arena>(
      refid,
      { 
        collection: 'arena',
        season: szn,
        version
      },
      { 
        $inc: { 
          ultimateRate: _.isNil(earnedUR) ? 0 : earnedUR,
          megamixRate: _.isNil(earnedMR) ? 0 : earnedMR,
          shopPoint: _.isNil(earnedSP) ? 0 : earnedSP,
          rankPoint: _.isNil(earnedRP) ? 0 : earnedRP,
          liveEnergy: _.isNil(earnedLE) ? 0 : earnedLE,
          rankCount: rankPlay,
          ultimateCount: ultimatePlay
        } 
      }
    );
  }

  // Save Variant Power
  const variant = $(data).elements('variant_gate');
  for (const vp of variant) {
    const earnedPwr = vp.number('earned_power');
    const earnedN = vp.number('earned_element.notes');
    const earnedP = vp.number('earned_element.peak');
    const earnedTs = vp.number('earned_element.tsumami');
    const earnedTr = vp.number('earned_element.tricky');
    const earnedO = vp.number('earned_element.onehand');
    const earnedH = vp.number('earned_element.handtrip');
    let overRadar = vp.numbers('over_radar');
    await DB.Upsert<VariantPower>( refid, { collection: 'variantpower', version }, {
        $inc: { 
          power: _.isNil(earnedPwr) ? 0 : earnedPwr,
          notes: _.isNil(earnedN) ? 0 : earnedN,
          peak: _.isNil(earnedP) ? 0 : earnedP,
          tsumami: _.isNil(earnedTs) ? 0 : earnedTs,
          tricky: _.isNil(earnedTr) ? 0 : earnedTr,
          onehand: _.isNil(earnedO) ? 0 : earnedO,
          handtrip: _.isNil(earnedH) ? 0 : earnedH
        },
        $set: (!overRadar) ? {
          dbver: DB_VER
        } :{
          overRadar: overRadar,
          dbver: DB_VER
        }
      }
    );
  }

  return send.success();
};

export const load: EPR = async (info, data, send) => {
  console.log("Loading savedata");
  const refid = $(data).str('refid', $(data).attr().dataid);
  if (!refid) return send.deny();

  const version = Math.abs(getVersion(info));
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));
  console.log("Got version: " + version);
  console.log("DataID: " + refid);
  if (version === 0) return send.deny();

  let profile = await DB.FindOne<Profile>(refid, {
    collection: 'profile', version
  });

  if (!profile) {
    if(version === 7 && await DB.Count<Profile>(refid, {collection: 'profile', version: 6}) === 1) profile = await DB.FindOne<Profile>(refid, {collection: 'profile', version: 6})
    else return send.object({ result: K.ITEM('u8', 1) });
  }

  let skill = (await DB.FindOne<Skill>(refid, {
    collection: 'skill',
    version,
  })) || { base: 0, name: 0, level: 0 };

  let presents = []
  let date = new Date()
  let currentDate = date.toLocaleDateString()
  let currentYMDDate = parseInt([date.getFullYear(), ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1), (date.getDate() > 9 ? '' : '0') + date.getDate()].join(''));

  if(IO.Exists('webui/asset/config/events.json')) {
    let bufEventData = await IO.ReadFile('webui/asset/json/events.json')
    let bufEventConfig = await IO.ReadFile('webui/asset/config/events.json')
    let eventData = JSON.parse(bufEventData.toString())
    let eventConfig = JSON.parse(bufEventConfig.toString())
    let eventItems
    switch (version) {
      case 6:
        eventItems = EVENT_ITEMS6
        break;
      case 7:
        eventItems = EVENT_ITEMS7 
        break;
    }
    for(const eData of eventData['events' + version]) {
      let typeIds = {'gift_crew': [11, 1], 'gift_ap': [1, 1], 'gift': [0, 23], 'cross_online': [0, 23]}
      if(['gift_crew', 'gift_ap', 'gift', 'cross_online'].includes(eData.type) && eventConfig[eData.id] !== undefined) {
        if(typeof eventConfig[eData.id].toggle === "boolean") {
          if(eventConfig[eData.id].toggle && dVersion >= eData.version && currentYMDDate >= eData.start) {
            for(const itemIter in eventItems[eData.id]) {
              let itemId = parseInt(eventItems[eData.id][itemIter])
              if(await DB.Count(refid, {collection:'item', type: typeIds[eData.type][0], id: itemId, version: version}) === 0) {
                await DB.Upsert(
                  refid, 
                  {collection: 'item', type: typeIds[eData.type][0], id: itemId, version: version}, 
                  {$set: { param: typeIds[eData.type][1] }}
                )

                presents.push({
                  id: itemId,
                  type: typeIds[eData.type][0],
                  param: typeIds[eData.type][1]
                })
              }
            }
          }
        } else{
          for(const toggleKeys in Object.keys(eventConfig[eData.id].toggle)) {
            if(eventConfig[eData['id']]['toggle'][Object.keys(eventConfig[eData.id].toggle)[toggleKeys]] && dVersion >= eData.version[toggleKeys] && currentYMDDate >= eData.start[toggleKeys]) {
              for(const itemIter in eventItems[Object.keys(eventConfig[eData.id].toggle)[toggleKeys]]) {
                let itemId = parseInt(eventItems[Object.keys(eventConfig[eData.id].toggle)[toggleKeys]][itemIter])
                if(await DB.Count(refid, {collection:'item', type: typeIds[eData.type][0], id: itemId, version: version}) === 0) {
                  await DB.Upsert(
                    refid, 
                    {collection: 'item', type: typeIds[eData.type][0], id: itemId, version: version}, 
                    {$set: { param: typeIds[eData.type][1] }}
                  )

                  presents.push({
                    id: itemId,
                    type: typeIds[eData.type][0],
                    param: typeIds[eData.type][1]
                  })
                }
              }
            }
          }
        }
      }
    }
  }

  let flagConfig = {}
  if(IO.Exists('webui/asset/config/flags.json')) {
    let bufFlagConfig = await IO.ReadFile('webui/asset/config/flags.json')
    flagConfig = JSON.parse(bufFlagConfig.toString())
  }

  if(dVersion >= 20250324) {
    let addlPresents = []
    if('aprilyukkuri' in flagConfig && flagConfig['aprilyukkuri']['toggle'] || currentDate.substring(0,4) === '4/1/') {
      addlPresents.push([5546, 1, 1])
      addlPresents.push([10244, 14, 1])
    }
    
    for(const giftIter in addlPresents) {
      if(await DB.Count(refid, {collection:'item', type: addlPresents[giftIter][1], id: addlPresents[giftIter][0], version: version}) === 0) {
        await DB.Upsert(
          refid, 
          {collection: 'item', type: addlPresents[giftIter][1], id: addlPresents[giftIter][0], version: version}, 
          {$set: { param: addlPresents[giftIter][2] }}
        )

        presents.push({
          id: addlPresents[giftIter][0],
          type: addlPresents[giftIter][1],
          param: addlPresents[giftIter][2]
        })
      }
    }
  }

  let curWeekly = []
  if(dVersion >= 20241210) {
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
  }

  let currentArena
  if(version === 6) currentArena = CURRENT_ARENA
  else if(version === 7) currentArena = CURRENT_ARENA7 
  let arenaOpen = U.GetConfig('arena_no_endtime') || BigInt(date) < currentArena.time_end

  const items = await DB.Find<Item>(refid, { collection: 'item', version: version });
  const courses = await DB.Find<CourseRecord>(refid, { collection: 'course', version: version });
  const params = await DB.Find<Param>(refid, { collection: 'param', version: version });
  const arena = await DB.FindOne<Arena>(refid, { collection: 'arena', season: arenaOpen ? currentArena['season'] : 0, version: version });
  const valgeneTicket = await DB.FindOne<ValgeneTicket>(refid, { collection: 'valgene_ticket' })
  let variant = await DB.FindOne<VariantPower>(refid, { collection: 'variantpower', version: version })
  
  if(dVersion >= 20250422) {
    if(!variant) {
      variant = <VariantPower>{
        power: 0, notes: 0, peak: 0, handtrip: 0, onehand: 0, tricky: 0, tsumami: 0, overRadar: []
      }
    } else if(!variant.overRadar) variant.overRadar = [] 
  }

  let weeklyMusic = []
  if(dVersion >= 20241210) {
    if (curWeekly.length > 0) {
      for(let wCtr = 0; wCtr <= 4; wCtr++) {
        let jRankResults = await getRankListDB(curWeekly[0].weekId, curWeekly[0].musicId, wCtr, version)
        if(jRankResults.length > 0) {
          jRankResults = jRankResults.filter(e => e.refid === refid)[0]
          weeklyMusic.push(jRankResults)
        }
      }
    }
  }


  let time = new Date();
  let tempHour = time.getHours();
  let tempDate = time.getDate();
  tempHour += 12;
  tempDate += 1;
  time.setDate(tempDate);
  time.setHours(tempHour);
  const currentTime = time.getTime();

  const bgm = profile.bgm ? profile.bgm : 0;
  const subbg = profile.subbg ? profile.subbg : 0;
  const nemsys = profile.nemsys ? profile.nemsys : 0;
  const stampA = profile.stampA ? profile.stampA : 0;
  const stampB = profile.stampB ? profile.stampB : 0;
  const stampC = profile.stampC ? profile.stampC : 0;
  const stampD = profile.stampD ? profile.stampD : 0;
  const stampRA = profile.stampRA ? profile.stampRA : 0;
  const stampRB = profile.stampRB ? profile.stampRB : 0;
  const stampRC = profile.stampRC ? profile.stampRC : 0;
  const stampRD = profile.stampRD ? profile.stampRD : 0;
  const sysBG = profile.sysBG ? profile.sysBG : 0;
  const creatorItem = profile.creatorItem ? profile.creatorItem : 0;
  const bplPro = (profile.bplSupport > 10) ? true : false
  profile.bplSupport = profile.bplSupport ? profile.bplSupport % 10 : 0;

  const customize = [];
  customize.push(bgm, subbg, nemsys, stampA, stampB, stampC, stampD, stampRA, stampRB, stampRC, stampRD, sysBG);

  var tempCustom = params.findIndex((e) => (e.type == 2 && e.id == 2))

  if (tempCustom == -1) {
    const tempParam: Param = { collection: 'param', type: 2, id: 2, param: [] };
    params.push(tempParam);
    tempCustom = params.findIndex((e) => (e.type == 2 && e.id == 2))
  }

  if (params[tempCustom]) {
    if(version === 6) params[tempCustom].param = customize;
    else if(version === 7) {
      for(let ind in customize) {
        params[tempCustom].param[ind] = customize[ind]
      }
    }
  }

  let blasterpass = U.GetConfig('use_blasterpass') ? 1 : 0;

  var tempItem = U.GetConfig('unlock_all_navigators') ? unlockNavigators(items) : items;
  tempItem = U.GetConfig('unlock_all_appeal_cards') ? unlockAppealCards(items) : items;
  tempItem = removeStampItems(tempItem)
  tempItem = (version >= 7 && U.GetConfig('unlock_all_valk_items')) ? unlockAppealParts(items) : items;

  // Make generator power always 100%,
  for (let i = 0; i < 50; i++) {
    const tempGene: Item = { collection: 'item', type: 7, id: i, param: 10 };
    tempItem.push(tempGene);
  }

  let result = 0
  if (version > profile.version) result = 2

  return send.pugFile('templates/load.pug', {
    result,
    courses,
    items: tempItem,
    present: presents,
    params,
    skill,
    currentTime,
    version,
    blasterpass,
    code: IDToCode(profile.id),
    arena,
    valgeneTicket,
    creatorItem,
    bplPro,
    weeklyMusic,
    variant,
    ...profile,
  });
};

export const create: EPR = async (info, data, send) => {
  console.log("Creating profile");
  const version = Math.abs(getVersion(info))
  const refid = $(data).str('refid', $(data).attr().refid);
  if (!refid) return send.deny();
  console.log("DataID " + refid);

  if(await DB.Count<Profile>(refid, {collection: 'profile', version: 6}) > 0) {
    if(version === 7) {
      await nablaMigrate(refid)
      return send.object({
        result: K.ITEM('u8', 0)
      })
    }
  }

  const name = $(data).str('name', $(data).attr().name ? $(data).attr().name : 'GUEST');
  let id = _.random(0, 99999999);
  while (await DB.FindOne<Profile>(null, { collection: 'profile', id })) {
    id = _.random(0, 99999999);
  }

  const profile: Profile = {
    pluginVer: 1,
    version: version,
    dbver: DB_VER,

    collection: 'profile',
    id,
    name,
    appeal: 0,
    akaname: 0,
    blocks: 0,
    packets: 0,
    arsOption: 0,
    drawAdjust: 0,
    earlyLateDisp: 0,
    effCLeft: 0,
    effCRight: 1,
    gaugeOption: 0,
    hiSpeed: 0,
    laneSpeed: 0,
    narrowDown: 0,
    notesOption: 0,
    blasterEnergy: 0,
    bgm: 0,
    subbg: 0,
    nemsys: 0,
    stampA: 0,
    stampB: 0,
    stampC: 0,
    stampD: 0,
    stampRA: 0,
    stampRB: 0,
    stampRC: 0,
    stampRD: 0,

    sysBG: 0,

    headphone: 0,
    musicID: 0,
    musicType: 0,
    sortType: 0,
    expPoint: 0,
    mUserCnt: 0,
    boothFrame: [0, 0, 0, 0, 0],

    playCount: 0,
    dayCount: 0,
    todayCount: 0,
    playchain: 0,
    maxPlayChain: 0,
    weekCount: 0,
    weekPlayCount: 0,
    weekChain: 0,
    maxWeekChain: 0,

    bplSupport: 0,
    creatorItem: 1
  };

  await DB.Upsert(refid, { collection: 'profile' }, profile);
  return send.object({ result: K.ITEM('u8', 0) });
};

export const buy: EPR = async (info, data, send) => {
  const refid = $(data).str('refid');
  if (!refid) return send.deny();

  const growth = {
    blocks: $(data).number('earned_gamecoin_block', 0),
    packets: $(data).number('earned_gamecoin_packet', 0),
  };

  const currency = $(data).bool('currency_type') ? 'blocks' : 'packets';

  const cost = _.sum($(data).numbers('item.price', []));
  const balanceChange = growth[currency] - cost;

  const updated = await DB.Update<Profile>(
    refid,
    { collection: 'profile', [currency]: { $gte: -balanceChange } },
    { $inc: { [currency]: balanceChange } }
  );

  if (updated.updated) {
    const items = _.zipWith(
      $(data).numbers('item.item_type', []),
      $(data).numbers('item.item_id', []),
      $(data).numbers('item.param', []),
      (type, id, param) => ({ type, id, param })
    );

    for (const item of items) {
      await DB.Upsert<Item>(
        refid,
        { collection: 'item', type: item.type, id: item.id },
        { $set: { param: item.param } }
      );
    }

    return send.object({
      gamecoin_packet: K.ITEM('u32', updated.docs[0].packets),
      gamecoin_block: K.ITEM('u32', updated.docs[0].blocks),
    });
  } else {
    return send.success();
  }
};

export const print: EPR = async (info, data, send) => {
  const genesisCards = $(data).elements('genesis_card');
  var genesisCardsArray = [];
  var generatorArray = [];
  for (const g of genesisCards) {
    let tempGeneratorID = g.number('generator_id');
    let exist = generatorArray.findIndex((e) => (e == tempGeneratorID));
    if (exist == -1) {
      generatorArray.push(tempGeneratorID);
    }
  }
  send.object({
    result: K.ITEM('s8', 0),
    genesis_cards: genesisCards.map(r => ({
      index: K.ITEM('s32', r.number('index')),
      print_id: K.ITEM('s32', r.number('print_id'))
    })),
    after_power: generatorArray.map(r => ({
      generator_id: K.ITEM('s32', r),
      param: K.ITEM('s32', 10),
    }))
  }), { status: "0" };
}

export const saveValgene: EPR = async (info, data, send) => {
  console.log("Saving Valkyrie Generator Item")
  const refid = $(data).str('refid');
  const items = $(data).elements('item.info');
  const useTicket = $(data).bool('use_ticket');
  const version = Math.abs(getVersion(info))
  
  let itemsToAdd = []
  for (const i of items) {
    const type = i.number('type');
    const id = i.number('id');
    const param = i.number('param');
    if(type === 17) {
      for (let stampId = ((id * 4) - 3); stampId <= (id * 4); stampId++) {
        itemsToAdd.push({'type': type, 'id': stampId, 'param': param})
      }
    } else {
      itemsToAdd.push({'type': type, 'id': id, 'param': param})
    }
  }

  for(let itemToAdd in itemsToAdd) {
    let id = itemsToAdd[itemToAdd].id
    let type = itemsToAdd[itemToAdd].type
    let param = itemsToAdd[itemToAdd].param
    console.log("Saving (" + type + " | " + id + " | " + param + ")")
    if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

    await DB.Upsert<Item>(
      refid,
      { collection: 'item', type, id, version },
      { $set: { param } }
    );
    if(version === 7 && id <= 18) {
      await DB.Upsert<Item>(
        refid,
        { collection: 'item', type, id, version: 6 },
        { $set: { param } }
      );
    }
  }

  if(useTicket) {
    await DB.Upsert<ValgeneTicket>(
      refid,
      { collection: 'valgene_ticket' },
      { $inc: {ticketNum: -1} }
    )
  }
  let valgeneTicket = await DB.FindOne<ValgeneTicket>(refid, { collection: 'valgene_ticket' })
  let result = {
    result: K.ITEM('s32', 1)
  }
  if(valgeneTicket !== null) {
    result['ticket_num'] = K.ITEM('s32', valgeneTicket.ticketNum)
    result['limit_date'] = K.ITEM('u64', BigInt(valgeneTicket.limitDate))
  }

  return send.object(result);
}

export const saveE: EPR = async (info, data, send) => {
  const refid = $(data).str('refid');
  const version = Math.abs(getVersion(info));
  // Save Weekly Score
  let weeklyScores = $(data).elements('weekly_music')
  let weeklyMusicResp = []
  let jRankResults = []
  for(let wScoreIter in weeklyScores) {
    let week = weeklyScores[wScoreIter].number('week_id')
    let mid = weeklyScores[wScoreIter].number('music_id')
    let mtype = weeklyScores[wScoreIter].number('music_type')
    let exscore = weeklyScores[wScoreIter].number('exscore')
    let playCount = weeklyScores[wScoreIter].number('play_cnt')
    let hiscoreCount = weeklyScores[wScoreIter].number('hiscore_cnt')

    let score = await DB.FindOne<WeeklyMusicScore>(refid, {collection: 'weeklymusicscore', week: week, mid: mid, mtype: mtype, version: version})
    let profile = await DB.FindOne<Profile>(refid, {collection: 'profile', version: version})
    let curExscore = 0
    if(score !== null) curExscore = score.exscore
    if(exscore > curExscore) {
      curExscore = exscore
      await DB.Upsert<WeeklyMusicScore>(
        refid,
        { collection: 'weeklymusicscore', week, mid, mtype, version},
        {
          $set: {
            exscore: curExscore,
            name: profile.name
          },
          $inc: {
            playCount: playCount,
            hiscoreCount: hiscoreCount
          }
        }
      )
      jRankResults = await getRankListDB(week, mid, mtype, version)
      jRankResults = jRankResults.filter(e => e.refid === refid)[0]
      weeklyMusicResp.push(jRankResults)
    }    
  }
  
  send.object(
    {
      weekly_music: weeklyMusicResp.map(ws => ({
        week_id: K.ITEM('s32', ws.week),
        music_id: K.ITEM('s32', ws.mid),
        music_type: K.ITEM('s32', ws.mtype),
        exscore: K.ITEM('u32', ws.exscore),
        rank: K.ITEM('s32', ws.rank)
      }))
    }
  ) 

  // send.object({
  //   bpl_campaign: {
  //     total_ticket: K.ITEM('s32', 69),
  //     get_ticket: K.ITEM('s32', 3)
  //   }
  // })
}
