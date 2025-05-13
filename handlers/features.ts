import { Profile } from '../models/profile';
import { MusicRecord } from '../models/music_record';
import { Matchmaker } from '../models/matchmaker';
import { getVersion, IDToCode, GetCounter } from '../utils';
import { Rival } from '../models/rival';

export const hiscore: EPR = async (info, data, send) => {
  const records = await DB.Find<MusicRecord>(null, { collection: 'music' });

  const version = getVersion(info);

  const profiles = _.groupBy(
    await DB.Find<Profile>(null, { collection: 'profile' }),
    '__refid'
  );

  return send.object({
    sc: {
      d: _.map(
        _.groupBy(records, r => {
          return `${r.mid}:${r.type}`;
        }),
        r => _.maxBy(r, 'score')
      ).map(r => ({
        id: K.ITEM('u32', r.mid),
        ty: K.ITEM('u32', r.type),
        a_sq: K.ITEM('str', IDToCode(profiles[r.__refid][0].id)),
        a_nm: K.ITEM('str', profiles[r.__refid][0].name),
        a_sc: K.ITEM('u32', r.score),
        l_sq: K.ITEM('str', IDToCode(profiles[r.__refid][0].id)),
        l_nm: K.ITEM('str', profiles[r.__refid][0].name),
        l_sc: K.ITEM('u32', r.score),
      })),
    },
  });
};

export const rival: EPR = async (info, data, send) => {
  const refid = $(data).str('refid');
  const version = parseInt(info.model.split(":")[4]);
  if (!refid) return send.deny();

  const rivals = (
    await DB.Find<Rival>(refid, { collection: 'rival', mutual: true })
  ).filter(p => p.refid != refid);

  return send.object({
    rival: await Promise.all(
      rivals.map(async (p, index) => {
        return {
          no: K.ITEM('s16', index),
          seq: K.ITEM('str', IDToCode(p.sdvxID)),
          name: K.ITEM('str', p.name),
          music: (
            await DB.Find<MusicRecord>(p.refid, { collection: 'music' })
          ).map(r => ({
            // Version 2023042500 added exscore to rival data.
            param: K.ARRAY('u32', version < 2023042500 ? [r.mid, r.type, r.score, r.clear, r.grade] : [r.mid, r.type, r.score, r.exscore, r.clear, r.grade]),
          })),
        };
      })
    ),
  });
};

export const entryE: EPR = async (info, data, send) => {
  console.log("entry_e id: " + $(data).number('eid'))
  send.success()
}

export const globalMatch: EPR = async (info, data, send) => {  
  let entryData: Matchmaker = {
    collection: 'matchmaker',
    timestamp: Date.now(),
    c_ver: $(data).number('c_ver'),
    p_num: $(data).number('p_num'),
    p_rest: $(data).number('p_rest'),
    filter: $(data).number('filter'),
    mid: $(data).number('mid'),
    sec: $(data).number('sec'),
    port: $(data).number('port'),
    gip: $(data).numbers('gip'),
    lip: $(data).numbers('lip'),
    claim: $(data).number('claim'),
    entry_id: $(data).number('entry_id')
  }

  let loggip = entryData.gip.join(".")
  let loglip = entryData.lip.join(".")

  console.log("====================================")
  // console.log("   c_ver: " + entryData.c_ver)
  // console.log("   p_num: " + entryData.p_num) // current match player count
  // console.log("  p_rest: " + entryData.p_rest) // remaining player spaces
  // console.log("  filter: " + entryData.filter) // game mode matchmaking filter
  // console.log("     mid: " + entryData.mid)
  // console.log("     sec: " + entryData.sec) // remaining seconds
  // console.log("    port: " + entryData.port)
  // console.log("     gip: " + entryData.gip)
  // console.log("     lip: " + entryData.lip)
  // console.log("   claim: " + entryData.claim)
  // console.log("entry_id: " + entryData.entry_id)
  console.log("[" + loglip + " | " + loggip + "] Searching for online match opponents")
  let expCnt = await DB.Remove({collection: 'matchmaker', timestamp: {$lt: Date.now() - 100000}})
  console.log("[" + loglip + " | " + loggip + "] Removed " + expCnt + " expired match data.")

  if(await DB.Count({collection: 'matchmaker', gip: entryData.gip}) === 0) {
    console.log("[" + loglip + " | " + loggip + "] Adding your info.")
    await DB.Upsert<Matchmaker>(
      { collection: 'matchmaker', gip: entryData.gip, lip: entryData.lip},
      entryData
    )
  } else {
    console.log("[" + loglip + " | " + loggip + "] Updating info.")
    await DB.Upsert<Matchmaker>(
      { collection: 'matchmaker', gip: entryData.gip, lip: entryData.lip},
      { $set: {
          c_ver: entryData.c_ver,
          p_num: entryData.p_num,
          p_rest: entryData.p_rest,
          filter: entryData.filter,
          mid: entryData.mid,
          sec: entryData.sec,
          claim: entryData.claim
        }
      }
    )
  }
  
  if(entryData.p_rest < 1) {
    console.log("[" + loglip + " | " + loggip + "] Room is full. Halting.")
    return send.deny();
  }

  console.log("[" + loglip + " | " + loggip + "] Searching...")

  let opData = await DB.Find<Matchmaker>({collection: 'matchmaker', c_ver: entryData.c_ver, filter: entryData.filter, mid: entryData.mid, claim: entryData.claim, entry_id: entryData.entry_id, $not: {lip: entryData.lip}})
  let opponents = {
    entry_id: K.ITEM('u32', entryData.entry_id),
    entry: opData.map(e => ({
      port: K.ITEM('u16', e.port),
      gip: K.ITEM('4u8', e.gip),
      lip: K.ITEM('4u8', e.lip)
    }))
  }
  console.log("[" + loglip + " | " + loggip + "] Opponents: " + opponents.entry.length)
  if(opponents.entry.length === 0) send.deny()
  else send.object(opponents)
}

export const lounge: EPR = async (info, data, send) => {
  let filter = $(data).number('filter')
  await DB.Remove({collection: 'matchmaker', timestamp: {$lt: Date.now() - 100000}})
  let matches = await DB.Find<Matchmaker>({collection: 'matchmaker', filter: filter})
  if(matches.length < 1) {
    send.object({
      interval: K.ITEM('u32', 5)
    })
  } else {
    let longestWait = Math.max(...matches.map(m => m.sec))
    send.object({
      interval: K.ITEM('u32', 10),
      wait: K.ITEM('u32', longestWait)
    })
  }
}
