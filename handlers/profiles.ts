import { Skill } from '../models/skill'
import { Item } from '../models/item'
import { Param } from '../models/param'
import { Arena, Volfes } from '../models/arena'
import { PolicyBreak } from '../models/policy_break'
import { MusicRecord, AutomaRecord } from '../models/music_record'
import { CourseRecord } from '../models/course_record'
import { Profile } from '../models/profile'
import { ValgeneTicket } from '../models/valgene_ticket'
import { WeeklyMusicScore } from '../models/weeklymusic'
import { VariantPower } from '../models/variant'
import { GWStory } from '../models/gw_story'
import { PluginSettings } from '../models/settings'
import { getVersion, IDToCode, checkVerStart, convertGWHHGrade, getYMDDate, computeForce } from '../utils'
import { Mix } from '../models/mix'
import { POLICY_BREAK2 } from '../data/ii'
import { POLICY_BREAK3, COURSES3 } from '../data/gw'
import { POLICY_BREAK4, EVENT_ITEMS4, COURSES4 } from '../data/hh'
import { POLICY_BREAK5, EVENT_ITEMS5, COURSES5, VOLFES } from '../data/vw'
import { CURRENT_ARENA, EVENT_ITEMS6, UNLOCK_EVENTS6 } from '../data/exg'
import { CURRENT_ARENA7, EVENT_ITEMS7, UNLOCK_EVENTS7 } from '../data/nbl'
import { getRankListDB } from './webui'
import { DB_VER, iiMigrate, iiiMigrate, ivMigrate, vMigrate, viMigrate, viiMigrate } from './migrate'
const logging = false

function unlockNavigators(items: Partial<Item>[], version: number) {
  console.log("Unlocking Navigators and Genesis Cards");
  let verInd = version - 1
  let maxGenId = [0, 0, 762, 1211, 1211, 1408, 1408];
  items = items.filter(i => i.type !== 11 && i.type !== 4 && i.type !== 8);
  for (let i = 0; version >= 3 && version < 7 && i < maxGenId[verInd]; ++i) items.push({ type: 4, id: i, param: 15 });
  for (let i = 0; version == 3 && i < maxGenId[verInd]; ++i) items.push({ type: 8, id: i, param: 9999 });
  for (let i = 0; version >= 6 && i < 300; ++i) items.push({ type: 11, id: i, param: 15 });
  return items;
}

function unlockAppealCards(items: Partial<Item>[], version: number) {
  let verInd = version - 1
  console.log("Unlocking Appeal Cards");
  let maxId = [0, 1904, 3001, 3595, 3595, 5553, 7000]
  items = items.filter(i => i.type !== 1);
  for (let i = 0; i < maxId[verInd]; ++i) items.push({ type: 1, id: i, param: 1 });

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
  console.log("Retrieving scores");
  const version = Math.abs(getVersion(info));
  if(logging) console.log("Got version: " + version);
  let refid = $(data).str('refid', ((version === 2 || version === 3) ? $(data).str('dataid') : $(data).attr().dataid));
  if(logging) console.log("DataID: " + refid);
  if (!refid) return send.deny();
  const records = await DB.Find<MusicRecord>(refid, { collection: 'music', version });

  if (version === 1) {
    return send.object({
      music: records.map(r => (
        K.ATTR({ music_id: r.mid.toString() }, {
        type: K.ATTR({
          type_id: r.type.toString(),
          clear_type: r.clear.toString(),
          score_grade: r.grade.toString(),
          score: r.score.toString(),
          cnt: r.playCount.toString()
        })
      })))
    });
  }

  if (version === 2 || version === 3) {
    const recordsOld = await DB.Find<MusicRecord>(refid, { collection: 'music', version: version - 1 });
    const gwClearLamp = [0, 1, 2, 4, 5, 3]
    return send.object({
      new: {
        music: records.map(r => ({
          music_id: K.ITEM('u32', r.mid),
          music_type: K.ITEM('u32', r.type),
          score: K.ITEM('u32', r.score),
          cnt: K.ITEM('u32', r.playCount),
          clear_type: K.ITEM('u32', r.clear),
          score_grade: K.ITEM('u32', r.grade),
          btn_rate: K.ITEM('u32', r.buttonRate),
          long_rate: K.ITEM('u32', r.longRate),
          vol_rate: K.ITEM('u32', r.volRate),
        }))
      },
      old: {
        music: recordsOld.map(r => ({
          music_id: K.ITEM('u32', r.mid),
          music_type: K.ITEM('u32', r.type),
          score: K.ITEM('u32', r.score),
          cnt: K.ITEM('u32', r.playCount),
          clear_type: K.ITEM('u32', gwClearLamp[r.clear]),
          score_grade: K.ITEM('u32', r.grade)
        }))
      }
    })
  }

  if (version === 4 || version === 5) {
    const recordsMerged = records.concat(await DB.Find<MusicRecord>(refid, { collection: 'music', version: version - 1 }))
    const automaRecord = await DB.Find<AutomaRecord>(refid, {collection:'automa', version})
    let scores = {
      music: {
        info: _.map(
          _.groupBy(recordsMerged, r => `${r.mid}:${r.type}`),
          group => {
            const newScore = group.find(s => s.version === version)
            const oldScore = group.find(s => s.version === version - 1)
            let scoreData = []

            // populate current version scores
            if(!newScore) scoreData = scoreData.concat([0,0,0,0,0,0,0,0,0,0])
            else scoreData = scoreData.concat([
              newScore.mid,
              newScore.type,
              newScore.score,
              newScore.clear,
              newScore.grade,
              0,
              0,
              newScore.buttonRate,
              newScore.longRate,
              newScore.volRate
            ])

            // populate previous version scores
            if(!oldScore) scoreData = scoreData.concat([0,0,0,0,0,0,0,0,0])
            else {
              const grade = (version === 4) ? convertGWHHGrade(oldScore.score) : oldScore.grade
              
              if(!newScore) {
                scoreData[0] = oldScore.mid
                scoreData[1] = oldScore.type
              }
              scoreData = scoreData.concat([
                oldScore.score,
                oldScore.clear,
                grade,
                0,
                0,
                0,
                // konaste score (score/clear/grade)
                0,
                0,
                0,
                0
              ])
            }

            return {
              param: K.ARRAY('u32', scoreData),
            }
          }
        )
      },
      ...(version === 5 && {
        automation: {
          record: automaRecord.map(rec => ({
            param: K.ARRAY('u32', [
              rec.id,
              0,
              rec.score,
              rec.clear,
              rec.grade,
              0
            ])
          }))
        }
      })
    }

    return send.object(scores);
  }

  if (version === 6) {
    const recordsMerged = records.concat(await DB.Find<MusicRecord>(refid, { collection: 'music', version: version - 1 }))
    return send.object({
      music: {
        info: _.map(
          _.groupBy(recordsMerged, r => `${r.mid}:${r.type}`),
          group => {
            const newScore = group.find(s => s.version === version)
            const oldScore = group.find(s => s.version === version - 1)
            let scoreData = []

            // populate current version scores
            if(!newScore) scoreData = scoreData.concat([0,0,0,0,0,0,0,0,0,0,0])
            else scoreData = scoreData.concat([
              newScore.mid,
              newScore.type,
              newScore.score,
              newScore.exscore,
              newScore.clear,
              newScore.grade,
              0,
              0,
              newScore.buttonRate,
              newScore.longRate,
              newScore.volRate
            ])

            // populate previous version scores
            if(!oldScore) scoreData = scoreData.concat([0,0,0,0,0,0,0,0,0,0])
            else {              
              if(!newScore) {
                scoreData[0] = oldScore.mid
                scoreData[1] = oldScore.type
              }
              scoreData = scoreData.concat([
                oldScore.score,
                oldScore.clear,
                oldScore.grade,
                0,
                0,
                0,
                // konaste score (score/clear/grade)
                0,
                0,
                0,
                0,
              ])
            }

            return {
              param: K.ARRAY('u32', scoreData),
            }
          }
        )
      },
    });
  }

  if (version === 7) {
    let exScoreResetList = [
      { id: 360, type: 3 }, { id: 580, type: 2 }, { id: 1121, type: 4 }, { id: 1185, type: 2 },
      { id: 1199, type: 4 }, { id: 1738, type: 4 }, { id: 2242, type: 0 }
    ]
    const egClear = [0, 1, 2, 3, 6, 4, 5]
    const music_db = await IO.ReadFile('webui/asset/json/music_db.json')
    const mdb = JSON.parse(music_db.toString()).mdb.music;

    const recordsMerged = records.concat(await DB.Find<MusicRecord>(refid, { collection: 'music', version: version - 1 }))
    return send.object({
      music: {
        info: _.map(
          _.groupBy(recordsMerged, r => `${r.mid}:${r.type}`),
          group => {
            const newScore = group.find(s => s.version === version)
            const oldScore = group.find(s => s.version === version - 1)
            let scoreData = []

            // populate current version scores
            if(!newScore) scoreData = scoreData.concat([0,0,0,0,0,0,0,0,0,0,0,0])
            else scoreData = scoreData.concat([
              newScore.mid,
              newScore.type,
              newScore.score,
              newScore.exscore,
              newScore.clear,
              newScore.grade,
              0,
              0,
              newScore.buttonRate,
              newScore.longRate,
              newScore.volRate,
              newScore.volforce
            ])

            // populate previous version scores
            if(!oldScore) scoreData = scoreData.concat([0,0,0,0,0,0,0,0,0,0,0,0,0,0])
            else {              
              if(!newScore) {
                let mdbInd = mdb.map(function(x) {return x['id']; }).indexOf(oldScore.mid.toString())
                scoreData[0] = oldScore.mid
                scoreData[1] = oldScore.type
                scoreData[11] = (mdbInd >= 0) ? computeForce(6, oldScore, mdb[mdbInd]) : 0
              }

              scoreData = scoreData.concat([
                oldScore.score,
                (exScoreResetList.findIndex(r => r.id === oldScore.mid && r.type === oldScore.type) >= 0) ? 0 : oldScore.exscore,
                egClear.indexOf(oldScore.clear),
                oldScore.grade,
                0,
                0,
                // konaste score (score/clear/grade)
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ])
            }

            return {
              param: K.ARRAY('u32', scoreData),
            }
          }
        )
      },
    });
  }
};

export const saveScore: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).attr().dataid);
  if (!refid) return send.deny();

  const version = getVersion(info);
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));

  if (version === 1) {
    try {
      const mid = parseInt($(data).attr().music_id);
      const type = parseInt($(data).attr().music_type);

      if (_.isNil(mid) || _.isNil(type)) return send.deny();

      const record = (await DB.FindOne<MusicRecord>(refid, {
        collection: 'music',
        version,
        mid,
        type,
      })) || {
        collection: 'music',
        version,
        mid,
        type,
        score: 0,
        clear: 0,
        grade: 0,
        buttonRate: 0,
        longRate: 0,
        volRate: 0,
        playCount: 0
      };

      const score = $(data).attr().score ? parseInt($(data).attr().score) : 0;
      const clear = $(data).attr().clear_type ? parseInt($(data).attr().clear_type) : 0;
      const grade = $(data).attr().score_grade ? parseInt($(data).attr().score_grade) : 0;
      if (score > record.score) {
        record.score = score;
      }

      record.clear = Math.max(clear, record.clear);
      record.grade = Math.max(grade, record.grade);
      record.playCount = record.playCount + 1

      await DB.Upsert<MusicRecord>(
        refid,
        { collection: 'music', version, mid, type },
        record,
      );

      return send.success();
    } catch {
      return send.deny();
    }
  }

  if ([2,3,4,5].includes(version)) {
    try {
      const mid = $(data).number('music_id');
      const type = $(data).number('music_type');

      if (_.isNil(mid) || _.isNil(type)) return send.deny();

      // Save AUTOMATION PARADISE record instead
      if(mid === 1259) {
        const mixid = $(data).number('mix_id')
        const like = $(data).bool('mix_like')
        const score = $(data).number('score') ? $(data).number('score') : 0;
        const clear = $(data).number('clear_type') ? $(data).number('clear_type') : 0;
        const grade = $(data).number('score_grade') ? $(data).number('score_grade') : 0;
      
        const record = (await DB.FindOne<AutomaRecord>(refid, {
          collection: 'automa',
          version,
          id: mixid,
        })) || {
          collection: 'automa',
          version,
          id: mixid,
          score: 0,
          clear: 0,
          grade: 0,
          like: like
        }

        record.clear = Math.max(clear, record.clear);
        record.grade = Math.max(grade, record.grade);
        record.score = Math.max(score, record.score);

        if(like) {
          record.like = true
          const mix = await DB.FindOne(null, {collection: 'mix', version, id: mixid})
          await DB.Upsert<Mix>(mix['__refid'], {collection: 'mix', version, id: mixid}, {$inc: {likes: 1}})
        }

        await DB.Upsert<AutomaRecord>(
          refid,
          { collection: 'automa', version, id: mixid },
          record,
        );

        return send.success();
      }

      const record = (await DB.FindOne<MusicRecord>(refid, {
        collection: 'music',
        version,
        mid,
        type,
      })) || {
        collection: 'music',
        version,
        mid,
        type,
        score: 0,
        clear: 0,
        grade: 0,
        maxChain: 0,
        critical: 0,
        near: 0,
        error: 0,
        effectiveRate: 0,
        buttonRate: 0,
        longRate: 0,
        volRate: 0,
        mode: 0,
        gaugeType: 0,
        playCount: 0
      };

      const score = $(data).number('score') ? $(data).number('score') : 0;
      const clear = $(data).number('clear_type') ? $(data).number('clear_type') : 0;
      const grade = $(data).number('score_grade') ? $(data).number('score_grade') : 0;
      const maxChain = $(data).number('max_chain') ? $(data).number('max_chain') : 0;
      const effectiveRate = $(data).number('effective_rate') ? $(data).number('effective_rate') : 0;
      const mode = $(data).number('mode') ? $(data).number('mode') : 0;
      const gaugeType = $(data).number('gaugeType') ? $(data).number('gaugeType') : 0;

      if (score > record.score) {
        record.score = score;
        record.buttonRate = $(data).number('btn_rate', 0);
        record.longRate = $(data).number('long_rate', 0);
        record.volRate = $(data).number('vol_rate', 0);
        record.critical = $(data).number('critical', 0);
        record.near = $(data).number('near', 0);
        record.error = $(data).number('error', 0);
      }

      if (maxChain > record.maxChain) {
        record.maxChain = maxChain
      }

      if (effectiveRate > record.effectiveRate) {
        record.effectiveRate = effectiveRate
      }

      record.clear = Math.max(clear, record.clear);
      record.grade = Math.max(grade, record.grade);
      record.mode = Math.max(mode, record.mode);
      record.gaugeType = Math.max(gaugeType, record.gaugeType);

      record.playCount = record.playCount + 1

      await DB.Upsert<MusicRecord>(
        refid,
        { collection: 'music', version, mid, type },
        record,
      );

      return send.success();
    } catch {
      return send.deny();
    }
  }

  if (Math.abs(version) === 6 || version === 7) { // Using alternate scoring system after 20210831
    const tracks = $(data).elements('track');
    try {
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
          dbver: DB_VER,
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
        record.dbver = DB_VER

        await DB.Upsert<MusicRecord>(
          refid,
          { collection: 'music', mid, type, version: Math.abs(version) },
          record
        );
      }
      return send.success();
    } catch {
      return send.deny();
    }
  }
};

export const saveCourse: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).str('dataid'));
  if (!refid) return send.deny();

  const version = Math.abs(getVersion(info));
  if (version === 0) return send.deny();

  const sid = $(data).number('ssnid');
  const cid = $(data).number('crsid');

  if (_.isNil(sid) || _.isNil(cid)) return send.deny();

  if([3,4].includes(version)) {
    let courses
    switch(version){
      case 3:
        courses = COURSES3
        break
      case 4:
        courses = COURSES4
        break
      case 5:
        courses = COURSES5
        break
    }

    const skill = await DB.FindOne<Skill>(refid, {collection: 'skill', version}) || { base: 0, name: -1, level: -1 }
    const courseData = courses.find(c => c.id === sid).courses.find(c => c.id === cid)
    await DB.Upsert<Skill>(refid, {collection: 'skill', version}, {
      $set: {
        level: Math.max(courseData.level, skill.level)
      }
    })
  }

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

  if (version === 1) {
    await DB.Update<Profile>(
      refid,
      { collection: 'profile', version },
      {
        $set: {
          headphone: $(data).number('headphone'),
          hiSpeed: $(data).number('hispeed'),
          appeal: $(data).number('appeal_id'),
          boothFrame: [$(data).number('frame0'), $(data).number('frame1'), $(data).number('frame2'), $(data).number('frame3'), $(data).number('frame4')],
          musicID: parseInt($(data).attr("last").music_id),
          musicType: parseInt($(data).attr("last").music_type),
          sortType: parseInt($(data).attr("last").sort_type),
          mUserCnt: $(data).number('m_user_cnt'),
          haveItem: $(data).numbers('have_item'),
          haveNote: $(data).numbers('have_note')
        },
        $inc: {
          expPoint: $(data).number('gain_exp'),
          packets: $(data).number('earned_gamecoin_packet'),
          blocks: $(data).number('earned_gamecoin_block'),
        },
      }
    );
    return send.success();
  }

  if ([2,3].includes(version)) {
    await DB.Update<Profile>(
      refid,
      { collection: 'profile', version },
      {
        $set: {
          headphone: $(data).number('headphone'),
          hiSpeed: $(data).number('hispeed'),
          appeal: $(data).number('appeal_id'),
          musicID: $(data).number('music_id'),
          musicType: $(data).number('music_type'),
          sortType: $(data).number('sort_type'),
          narrowDown: $(data).number('narrow_down'),
          gaugeOption: $(data).number('gauge_option'),
          blasterCount: $(data).number('blaster_count')
        },
        $inc: {
          packets: $(data).number('earned_gamecoin_packet'),
          blocks: $(data).number('earned_gamecoin_block'),
          blasterEnergy: $(data).number('earned_blaster_energy'),
          playCount: 1
        },
      }
    );

    if(version === 3) {
      await DB.Upsert<Param>(
        refid, 
        {collection: 'param', version, type: 1, id: 1},
        {
          $set: {
            param: $(data).numbers('hidden_param')
          }
        }
      )
      
      const apcard = $(data).elements('appealcard.info');
      for (const c of apcard) {
        const id = c.number('id');
        const count = c.number('count');

        if (_.isNil(id) || _.isNil(count)) continue;

        await DB.Upsert<Item>(
          refid,
          { collection: 'item', type: 1, id, version },
          { $set: { param: count, dbver: DB_VER } }
        );
      }

      const storyProgress = $(data).elements('story.info');
      for (const story of storyProgress) {
        const storyId = story.number('story_id');
        const progressId = story.number('progress_id');
        const progressParam = story.number('progress_param');
        const clearCnt = story.number('clear_cnt');
        const routeFlg = story.number('route_flg');

        if(logging) console.log(`Saving story: ${storyId} | ${progressId} | ${progressParam} | ${clearCnt} | ${routeFlg}`)
        await DB.Upsert<GWStory>(
          refid,
          { collection: 'story', storyId, version },
          { 
            $set: { 
              progressId,
              progressParam,
              clearCnt,
              routeFlg
            } 
          }
        );
      }
      
      await DB.Upsert<Skill>(refid, {collection: 'skill', version}, {
        $set: {
          base: $(data).number('skill_base_id', 0),
          name: $(data).number('skill_name_id', 0)
        }
      })
    }

    const items = $(data).elements('item.info');
    for (const item of items) {
      const type = item.number('type');
      const id = item.number('id');
      const param = item.number('param');

      if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

      if(logging) console.log(`Saving item: ${type} | ${id} | ${param}`)
      await DB.Upsert<Item>(
        refid,
        { collection: 'item', type, id, version },
        { $set: { param, dbver: DB_VER } }
      );
    }

    const params = $(data).elements('param.info');
    for (const p of params) {
      const type = p.number('type');
      const id = p.number('id');
      const param = p.numbers('param');

      if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

      if (logging) console.log(`Saving param: ${type} | ${id} | [${param}]`)
      await DB.Upsert<Param>(
        refid,
        { collection: 'param', type, id, version },
        { $set: { param, dbver: DB_VER } }
      );
    }

    return send.success()
  }

  // Save Profile
  if ([4,5,6,7].includes(version)) {
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

    if (logging) console.log("Saving item: " + type + " | " + id + " | " + param)
    await DB.Upsert<Item>(
      refid,
      { collection: 'item', type, id, version },
      { $set: { param, dbver: DB_VER } }
    );
  }

  // Save Param
  const params = $(data).elements('param.info');
  for (const p of params) {
    const type = p.number('type');
    const id = p.number('id');
    const param = p.numbers('param');

    if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

    if (logging) console.log("Saving param: " + type + " | " + id + " | [" + param + "]")
    await DB.Upsert<Param>(
      refid,
      { collection: 'param', type, id, version },
      { $set: { param, dbver: DB_VER } }
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
        dbver: DB_VER
      },
    }
  );

  const volfes = $(data).element('festival')
  if(volfes) {
    const earnedLE = volfes.number('earned_live_energy');
    let history = []
    for(const hist of $(data).elements('history')) {
      history.push({
        energyType: hist.number('energy_type'),
        liveEnergy: hist.number('live_energy')
      })
    }

    await DB.Upsert<Volfes>(refid, {collection: 'volfes', version, id: VOLFES.id}, {
      $inc: {
        liveEnergy: earnedLE
      },
      $set: {
        bonus: history
      }
    })
  }

  // Save Arena Data
  const arena_data = $(data).elements('arena');
  for (const are of arena_data) {
    const szn = are.number('season');
    const earnedRP = are.number('earned_rank_point');
    const earnedSP = are.number('earned_shop_point');
    const earnedUR = are.number('earned_ultimate_rate');
    const earnedMR = are.number('earned_megamix_rate');
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
          rankCount: rankPlay,
          ultimateCount: ultimatePlay
        },
        $set: {
          dbver: DB_VER
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
  let date = new Date()
  const refid = $(data).str('refid', $(data).attr().dataid);
  if (!refid) return send.deny();
  const pluginSettings = await DB.FindOne<PluginSettings>({collection: 'settings'})

  const version = Math.abs(getVersion(info));
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));
  console.log("Got version: " + version);
  console.log("DataID: " + refid);
  if (version === 0) return send.deny();

  let profile = await DB.FindOne<Profile>(refid, {
    collection: 'profile', version
  });

  let presents = []
  const populatePresents = async (version, refid, date) => {
    if(IO.Exists('webui/asset/config/events.json')) {
      let bufEventData = await IO.ReadFile('webui/asset/json/events.json')
      let bufEventConfig = await IO.ReadFile('webui/asset/config/events.json')
      let eventData = JSON.parse(bufEventData.toString())
      let eventConfig = JSON.parse(bufEventConfig.toString())
      let eventItems
      switch (version) {
        case 4:
          eventItems = EVENT_ITEMS4
          break;
        case 5:
          eventItems = EVENT_ITEMS5
          break;
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
            if(eventConfig[eData.id].toggle && checkVerStart(dVersion, eData.version, eData.start, date)) {
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
              if(parseInt(toggleKeys) >= eData.start.length) continue;
              if(eventConfig[eData['id']]['toggle'][Object.keys(eventConfig[eData.id].toggle)[toggleKeys]] && checkVerStart(dVersion, eData.version[toggleKeys], eData.start[toggleKeys], date)) {
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
  }

  if (!profile) {
    if(version > 1 && await DB.Count<Profile>(refid, {collection: 'profile', version: version - 1}) === 1) {
      profile = await DB.FindOne<Profile>(refid, {collection: 'profile', version: version - 1});
      return send.object({result: K.ITEM('u8', 2), name: K.ITEM('str', profile.name)})
    }
    else if(version === 1) return send.object(K.ATTR({none: "1"}));
    else return send.object({ result: K.ITEM('u8', 1) });
  } else {
    if(!('datecode' in profile) || dVersion > profile.datecode) {
      await DB.Upsert<Profile>(refid, {collection: 'profile', version: version}, {$set: {datecode: dVersion}})
    }
  }

  if (version === 1) {
    return send.object({
      name: K.ITEM('str', profile.name),
      code: K.ITEM('str', IDToCode(profile.id)),
      gamecoin_packet: K.ITEM('u32', profile.packets),
      gamecoin_block: K.ITEM('u32', profile.blocks),
      exp_point: K.ITEM('u32', profile.expPoint),
      m_user_cnt: K.ITEM('u32', profile.mUserCnt),
      have_item: K.ARRAY('bool', profile.haveItem.map((val, ind) => U.GetConfig('unlock_all_appeal_cards') && ind >= 37 && ind <= 213 ? 1 : val)),
      have_note: K.ARRAY('bool', profile.haveNote),
      last: K.ATTR({
        music_id: profile.musicID.toString(),
        music_type: profile.musicType.toString(),
        sort_type: profile.sortType.toString(),
        headphone: profile.headphone.toString(),
        hispeed: profile.hiSpeed.toString(),
        appeal_id: profile.appeal.toString(),
        frame1: profile.boothFrame[0].toString(),
        frame2: profile.boothFrame[1].toString(),
        frame3: profile.boothFrame[2].toString(),
        frame4: profile.boothFrame[3].toString(),
        frame5: profile.boothFrame[4].toString()
      }, {})
    })
  }

  let skill = (await DB.FindOne<Skill>(refid, {
    collection: 'skill',
    version,
  })) || { base: 0, name: 0, level: 0 };

  if ([2, 3, 4, 5].includes(version)) {
    let policyBreak
    switch(version) {
      case 2:
        policyBreak = POLICY_BREAK2
        break
      case 3:
        policyBreak = POLICY_BREAK3
        break
      case 4:
        policyBreak = POLICY_BREAK4
        break
      case 5:
        policyBreak = POLICY_BREAK5
        break
    }

    let pbFin, pbEnergy
    if(policyBreak) {
      // let policyBreak = (version === 2) ? POLICY_BREAK2 : POLICY_BREAK3
      policyBreak = (dVersion === 20151116) ? policyBreak.slice(0, 17) : policyBreak
      let pb = await DB.Find<PolicyBreak>(refid, {collection: 'pb', version, ...(dVersion === 20151116 && {id: {$lte: 17}})})
      pb = (version === 2) ? pb.filter(p => p.exp < 24000).sort((a, b) => a.id - b.id).slice(0,2) : pb
      pbFin = pb.map(p => ({
        id: p.id,
        title: policyBreak[p.id - 1].titleJ,
        title_eng: policyBreak[p.id - 1].titleE,
        start: policyBreak[p.id - 1]['start'],
        end: policyBreak[p.id - 1]['end'],
        ...(version === 2 && {
          before: p.exp,
          after: p.exp + 3000
        }),
        ...(version >= 3 && {
          target_id: policyBreak[p.id - 1].tgt,
          exp: p.exp,
          music: [
            {
              no: 0,
              point: policyBreak[p.id - 1].rwrd.point,
              music_id: policyBreak[p.id - 1].rwrd.id
            }
          ]
        })
      }))
      pbEnergy = (version >= 3) ? pbFin.map(energy => ({
        target_id: energy.target_id,
        energy: 3000
      })) : []
    }


    let items = await DB.Find<Item>(refid, {collection: 'item', version})
    let params
    // ii/gw
    if(version === 2 || version === 3) params = (await DB.FindOne<Param>(refid, {collection: 'param', version, id: 1})) || {type: 1, id: 1, param: new Array(20).fill(0)}
    // hh/vw param data
    else params = await DB.Find<Param>(refid, {collection: 'param', version})
    let courses = await DB.Find<CourseRecord>(refid, {collection: 'course', version})
    let story = await DB.Find<GWStory>(refid, {collection: 'story', version})

    var tempItem = U.GetConfig('unlock_all_navigators') && version >= 3 ? unlockNavigators(items, version) : items;
    tempItem = U.GetConfig('unlock_all_appeal_cards') ? unlockAppealCards(tempItem, version) : tempItem;
    
    // Unlock AUTOMATION PARADISE songs. 
    // Might switch to song item auto-unlock for songs in the future.
    if(U.GetConfig('unlock_all_songs')) {
      tempItem = tempItem.concat([94,97,98,109,115,253,255,257,313,369,499,500,517,518,597,708,717,823,842,907,6,39,44,75,245,290,307,437,581,607].map(id => ({
        type: 15, id, param: 1
      })))

      tempItem = tempItem.concat([1490, 1491].map(id => ({
        type: 15, id, param: 2
      })))
    }

    const gwMissionSkipMatch = (pluginSettings?.gwMissionSkipMatch !== undefined) ? pluginSettings.gwMissionSkipMatch : false
    if(version === 3 && gwMissionSkipMatch) {
      const skipIds = [9, 10, 173, 174]
      let storyProgress = items.findIndex(str => str.type === 5 && str.id === 6)
      if(storyProgress >= 0 && skipIds.includes(items[storyProgress].param)) {
        const storyIds = {'9': [1, 2], '10': [1, 1], '173': [17, 2], '174': [17, 1]}
        const advStoryInd = story.findIndex(str => str.storyId === storyIds[String(items[storyProgress].param)][0])
        console.log("Skipping progress id " + items[storyProgress].param + " (story id " + story[advStoryInd].storyId + ")")
        story[advStoryInd].progressId += storyIds[String(items[storyProgress].param)][1]
        items[storyProgress].param += storyIds[String(items[storyProgress].param)][1]
      }
    }

    let mixes = []
    let volfes
    if(version >= 4) {
      await populatePresents(version, refid, date)

      let mixHist = params.find(p => p.type === 8 && p.id === 3)?.param ?? []
      let mixSlot = params.find(p => p.type === 0 && p.id === 3)?.param ?? []
      let mixRes = await DB.Find<Mix>(refid, {collection: 'mix', version, id: {$in: [...new Set([...mixHist, ...mixSlot])]}})
      let automaRecord = await DB.Find<AutomaRecord>(refid, {collection: 'automa', version})
      for(const m of mixRes) {
        let mixDate = getYMDDate(new Date(m['createdAt']))
        mixes.push({...m, ...{createDate: mixDate, like: automaRecord.find(r => r.id === m.id)?.like ?? 0}})
      }
    }

    if(version === 5) {
      volfes = await DB.FindOne<Volfes>(refid, {collection: 'volfes', id: VOLFES.id})
    }

    let result = 0

    return send.pugFile('templates/load.pug', {
      version,
      result,
      code: IDToCode(profile.id),
      skill,
      items: tempItem,
      courses,
      params,
      present: presents,
      pbFin,
      pbEnergy,
      story,
      mixes,
      volfes,
      ...profile,
    });
  }

  if (version >= 6) {
    let currentDate = date.toLocaleDateString()
    let currentYMDDate = parseInt([date.getFullYear(), ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1), (date.getDate() > 9 ? '' : '0') + date.getDate()].join(''));
    await populatePresents(version, refid, date)

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
    let arenaOpen = ((pluginSettings?.nblArenaNoEnd !== undefined) ? pluginSettings.nblArenaNoEnd : false) || BigInt(date) < currentArena.time_end

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

    const creatorItem = profile.creatorItem ? profile.creatorItem : 0;
    const bplPro = (profile.bplSupport > 10) ? true : false
    profile.bplSupport = profile.bplSupport ? profile.bplSupport % 10 : 0;

    let blasterpass = U.GetConfig('use_blasterpass') ? 1 : 0;

    var tempItem = U.GetConfig('unlock_all_navigators') ? unlockNavigators(items, version) : items;
    tempItem = U.GetConfig('unlock_all_appeal_cards') ? unlockAppealCards(tempItem, version) : tempItem;
    tempItem = removeStampItems(tempItem)
    tempItem = (version >= 7 && U.GetConfig('unlock_all_valk_items')) ? unlockAppealParts(tempItem) : tempItem;

    let result = 0
    if (version > profile.version) result = 2

    return send.pugFile('templates/load.pug', {
      version,
      result,
      courses,
      items: tempItem,
      present: presents,
      params,
      skill,
      currentTime,
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
  }
};

export const create: EPR = async (info, data, send) => {
  console.log("Creating profile");
  const version = Math.abs(getVersion(info))
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));
  const refid = $(data).str('refid', $(data).attr().refid);
  if (!refid) return send.deny();
  console.log("DataID " + refid);
  const name = $(data).str('name', $(data).attr().name ? $(data).attr().name : 'GUEST');

  if(version === 2) {
    for(let i = 1; i <= POLICY_BREAK2.length; i++) {
      await DB.Upsert(refid, {collection: 'pb', version, id: i}, {$set: {exp: 0}})
    }
    if(await DB.Count<Profile>(refid, {collection: 'profile', version: 1}) > 0) {
      await iiMigrate(refid, name)
      return send.object({
        result: K.ITEM('u8', 0)
      })
    }
  }
  else if(version === 3) {
    for(let i = 1; i <= POLICY_BREAK3.length; i++) {
      if(await DB.Count<PolicyBreak>(refid, {collection: 'pb', version, id: i}) === 0)
        await DB.Upsert<PolicyBreak>(refid, {collection: 'pb', version, id: i}, {$set: {exp: 0}})
    }
    await DB.Upsert<Skill>(refid, {collection: 'skill', version}, {$set: {base: 0, name: -1, level: -1}})
    if(await DB.Count<Profile>(refid, {collection: 'profile', version: 2}) > 0) {
      await iiiMigrate(refid, name)
      return send.object({
        result: K.ITEM('u8', 0)
      })
    }
  }
  else if(version === 4) {
    for(let i = 1; i <= POLICY_BREAK4.length; i++) {
      if(await DB.Count<PolicyBreak>(refid, {collection: 'pb', version, id: i}) === 0)
        await DB.Upsert<PolicyBreak>(refid, {collection: 'pb', version, id: i}, {$set: {exp: 0}})
    }
    await DB.Upsert<Skill>(refid, {collection: 'skill', version}, {$set: {base: 0, name: 0, level: 0}})
    if(await DB.Count<Profile>(refid, {collection: 'profile', version: 3}) > 0) {
      await ivMigrate(refid, name)
      return send.object({
        result: K.ITEM('u8', 0)
      })
    }
  }
  else if(version === 5) {
    for(let i = 1; i <= POLICY_BREAK5.length; i++) {
      if(await DB.Count<PolicyBreak>(refid, {collection: 'pb', version, id: i}) === 0)
        await DB.Upsert<PolicyBreak>(refid, {collection: 'pb', version, id: i}, {$set: {exp: 0}})
    }
    await DB.Upsert<Skill>(refid, {collection: 'skill', version}, {$set: {base: 0, name: 0, level: 0}})
    if(await DB.Count<Profile>(refid, {collection: 'profile', version: 4}) > 0) {
      await vMigrate(refid, name)
      return send.object({
        result: K.ITEM('u8', 0)
      })
    }
  }
  else if(version === 6) {
    await DB.Upsert<Skill>(refid, {collection: 'skill', version}, {$set: {base: 0, name: 0, level: 0}})
    if(await DB.Count<Profile>(refid, {collection: 'profile', version: 5}) > 0) {
      await viMigrate(refid, name)
      return send.object({
        result: K.ITEM('u8', 0)
      })
    }
  }
  else if(version === 7) {
    await DB.Upsert<Skill>(refid, {collection: 'skill', version}, {$set: {base: 0, name: 0, level: 0}})
    if(await DB.Count<Profile>(refid, {collection: 'profile', version: 6}) > 0) {
      await viiMigrate(refid, name)
      return send.object({
        result: K.ITEM('u8', 0)
      })
    }
  }

  let id = _.random(0, 99999999);
  while (await DB.FindOne<Profile>(null, { collection: 'profile', id })) {
    id = _.random(0, 99999999);
  }

  const profile: Profile = {
    collection: 'profile',
    version: version,
    dbver: DB_VER,
    datecode: dVersion,

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
    blasterCount: 0,

    headphone: 0,
    musicID: 0,
    musicType: 0,
    sortType: 0,
    expPoint: 0,
    mUserCnt: 0,
    boothFrame: [0, 0, 0, 0, 0],
    haveItem: [],
    haveNote: [],

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

  await DB.Upsert(refid, { collection: 'profile', version}, profile);
  return send.object({ result: K.ITEM('u8', 0) });
};

export const buy: EPR = async (info, data, send) => {
  const version = Math.abs(getVersion(info))
  const refid = (version === 1) ? $(data).attr().refid : $(data).str('refid');
  if (!refid) return send.deny();

  const growth = {
    blocks: $(data).number('earned_gamecoin_block', 0),
    packets: $(data).number('earned_gamecoin_packet', 0),
  };

  const currency = $(data).bool('currency_type') ? 'blocks' : 'packets';

  const cost = (version < 3) ? $(data).number('price') : _.sum($(data).numbers('item.price', []));
  const balanceChange = growth[currency] - cost;

  await DB.Update<Profile>(
    refid,
    { collection: 'profile', version, [currency]: { $gte: -balanceChange } },
    { $inc: { [currency]: balanceChange } }
  );

  let profile = await DB.FindOne<Profile>(refid, {collection: 'profile', version})
  if (version === 1) {
    const index = $(data).number('open_index')
    await DB.Upsert<Profile>(refid, {collection: 'profile', version}, {
      $set: {
        [`haveItem.${index}`]: 1
      }
    })
  } else if (version === 2) {
    const item = {
      type: $(data).number('item_type'),
      id: $(data).number('item_id'),
      param: $(data).number('param')
    }
    await DB.Upsert<Item>(
      refid,
      { collection: 'item', version, type: item.type, id: item.id },
      { $set: { param: item.param, dbver: DB_VER } }
    );
  } else {
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
        { $set: { param: item.param, dbver: DB_VER } }
      );
    }
  }
  return send.object({
    gamecoin_packet: K.ITEM('u32', profile.packets),
    gamecoin_block: K.ITEM('u32', profile.blocks),
  });
};

export const print: EPR = async (info, data, send) => {
  const refid = $(data).str('refid')
  const version = Math.abs(getVersion(info))
  const genesisCards = $(data).elements('genesis_card')
  var genCards = []
  var afterTkt = []
  var afterPower = []
  let newPrintId = 1
  for (const g of genesisCards) {
    let genId = g.number('generator_id');
    let genPwr = g.number('generator_power');
    let ticketId = g.number('ticket_id');
    let status = g.number('status');
    let gPrintId = g.number('print_id') === 0 ? newPrintId++ : g.number('print_id');
    if(status === 1) {
      genCards.push({
        index: g.number('index'),
        printId: gPrintId
      })
      if(g.number('print_id') === 0) {
        await DB.Upsert<Item>(refid, {collection: 'item', version, type: 7, id: genId}, {
          $inc: {
            param: genPwr
          }
        })
        if(ticketId > 0) {
          let ticket = await DB.FindOne<Item>(refid, {collection: 'item', version, type: 6, id: ticketId})
          afterTkt.push({
            id: genId,
            tkid: ticketId,
            param: ticket.param - 1
          })
        }
      }
    }
    else if(status === 3) {
      afterPower.push({
        id: genId,
        pwr: genPwr
      });
    }
  }

  return send.object({
    result: K.ITEM('s8', 0),
    genesis_card: genCards.map(r => ({
      index: K.ITEM('s32', r.index),
      print_id: K.ITEM('s32', r.printId)
    })),
    after_ticket: afterTkt.map(r => ({
        ticket_id: K.ITEM('s32', r.tkid),
        param: K.ITEM('s32', r.param ),
    })),
    after_power: afterPower.map(r => ({
      generator_id: K.ITEM('s32', r.id),
      param: K.ITEM('s32', r.pwr),
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

  for(let i of itemsToAdd) {
    let id = i.id
    let type = i.type
    let param = i.param
    console.log("Saving (" + type + " | " + id + " | " + param + ")")
    if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

    await DB.Upsert<Item>(
      refid,
      { collection: 'item', type, id, version },
      { $set: { param, dbver: DB_VER } }
    );
    if(version === 7 && id <= 18) {
      await DB.Upsert<Item>(
        refid,
        { collection: 'item', type, id, version: 6 },
        { $set: { param, dbver: DB_VER } }
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
  let valgeneTicket = await DB.FindOne<ValgeneTicket>(refid, { collection: 'valgene_ticket', version })
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

  if(version < 6) return send.success()

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
            name: profile.name,
            dbver: DB_VER
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

export const savePb: EPR = async (info, data, send) => {
  const refid = $(data).str('refid');
  const version = Math.abs(getVersion(info));
  let policyBreak
  switch(version) {
    case 2:
      policyBreak = POLICY_BREAK2
      break
    case 3:
      policyBreak = POLICY_BREAK3
      break
    case 4:
      policyBreak = POLICY_BREAK4
      break
    case 5:
      policyBreak = POLICY_BREAK5
      break
  }
  if(version === 2) {
    await DB.Upsert<PolicyBreak>(refid, {collection: 'pb', version, id: $(data).number('id')}, {
      $set: {
        exp: $(data).number('exp')
      }
    })

    let pb = await DB.FindOne<PolicyBreak>(refid, {collection: 'pb', version, id: $(data).number('id')})
    if(pb.exp >= 24000) {
      let rwrd = POLICY_BREAK2[$(data).number('id') - 1].rwrd[0]
      await DB.Upsert<Item>(refid, {collection: 'item', version, type: rwrd.type, id: rwrd.id}, {
        $set: {
          param: rwrd.param
        }
      })
    }
    
    return send.object({
      exp: K.ITEM('s32', $(data).number('exp')),
      result: K.ITEM('bool', true)
    })
  }

  let pb = await DB.FindOne<PolicyBreak>(refid, {collection: 'pb', version, id: $(data).number('id')})
  let energy = pb.exp + $(data).number('energy')
  let rwrd = policyBreak.find(p => p.id === $(data).number('id')).rwrd
  let maxE = rwrd.point
  if(energy >= maxE) {
    energy = maxE
    await DB.Upsert<Item>(refid, {collection: 'item', version, type: rwrd.type, id: rwrd.id}, {
      $set: {
        param: rwrd.param
      }
    })
  }
  await DB.Upsert<PolicyBreak>(refid, {collection: 'pb', version, id: $(data).number('id')}, {
    $set: {
      exp: energy
    }
  })

  return send.object({
    after: K.ITEM('s32', energy),
    result: K.ITEM('bool', true)
  })
}
