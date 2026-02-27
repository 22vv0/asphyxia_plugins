import { Profile } from '../models/profile';
import { MusicRecord } from '../models/music_record';
import { Matchmaker } from '../models/matchmaker';
import { getVersion, IDToCode, GetCounter } from '../utils';
import { Rival } from '../models/rival';

var matchRooms = []

export const hiscore: EPR = async (info, data, send) => {
  const version = Math.abs(getVersion(info));

  const records = await DB.Find<MusicRecord>(null, { collection: 'music', version, migrated: {$exists: false} });

  const profiles = _.groupBy(
    await DB.Find<Profile>(null, { collection: 'profile', version }),
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
  const version = Math.abs(getVersion(info));
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));
  if (!refid) return send.deny();

  const rivals = (
    await DB.Find<Rival>(refid, { collection: 'rival', mutual: true, version })
  ).filter(p => p.refid != refid);

  return send.object({
    rival: await Promise.all(
      rivals.map(async (p, index) => {
        return {
          no: K.ITEM('s16', index),
          seq: K.ITEM('str', IDToCode(p.sdvxID)),
          name: K.ITEM('str', p.name),
          music: (
            await DB.Find<MusicRecord>(p.refid, { collection: 'music', version })
          ).map(r => ({
            // Version 2023042500 added exscore to rival data.
            param: K.ARRAY('u32', dVersion < 20230425 ? [r.mid, r.type, r.score, r.clear, r.grade] : [r.mid, r.type, r.score, r.exscore, r.clear, r.grade]),
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
  const version = Math.abs(getVersion(info));

  let entryData = {
    c_ver: $(data).number('c_ver'),
    p_num: $(data).number('p_num'),
    p_rest: $(data).number('p_rest'),
    filter: $(data).number('filter'),
    mid: $(data).number('mid'),
    sec: $(data).number('sec'),
    claim: $(data).number('claim'),
    entry_id: $(data).number('entry_id'),
    port: $(data).number('port'),
    gip: $(data).numbers('gip'),
    lip: $(data).numbers('lip'),
  }

  let loggip = entryData.gip.join(".")
  let loglip = entryData.lip.join(".")

  // console.log("====================================")
  // console.log("   c_ver: " + entryData.c_ver)
  // console.log("   p_num: " + entryData.p_num) // current match player count
  // console.log("  p_rest: " + entryData.p_rest) // remaining player spaces
  // console.log("  filter: " + entryData.filter) // game mode matchmaking filter
  // console.log("     mid: " + entryData.mid)
  // console.log("     sec: " + entryData.sec) // remaining seconds
  // console.log("    port: " + entryData.port)
  // console.log("     gip: " + loggip)
  // console.log("     lip: " + loglip)
  // console.log("   claim: " + entryData.claim)
  // console.log("entry_id: " + entryData.entry_id)

  let fRooms = matchRooms.filter(room => room.version === version && room.c_ver === entryData.c_ver && room.filter === entryData.filter && room.mid === entryData.mid)
  if(fRooms.length === 0) {
    // create room if not exists
    console.log("[" + loglip + " | " + loggip + "] Creating new room: " + entryData.c_ver + " - " + entryData.filter + " - " + entryData.mid)
    matchRooms.push({
      version: version,
      c_ver: entryData.c_ver,
      filter: entryData.filter,
      mid: entryData.mid,
      p_rest: entryData.p_rest,
      p_num: entryData.p_num,
      players: [
        {
          gip: entryData.gip,
          lip: entryData.lip,
          port: entryData.port
        }
      ]
    })

    // delete room after sec * 100
    setTimeout(function () {
      console.log("[" + loglip + " | " + loggip + "] Deleting expired room: " + entryData.c_ver + " - " + entryData.filter +  -  + entryData.mid)
      const search = (element) => element.players[0].lip.join('.') === entryData.lip.join('.')
      const index = matchRooms.findIndex(search)
      matchRooms.splice(index, 1)
    }, (entryData.sec * 100) * 1000);

    // new room, waiting for opponents
    let opponents = {
      entry_id: K.ITEM('u32', entryData.entry_id),
    }   
    return send.object(opponents)
  } else {
    // if there are rooms
    let inRoom = false
    let roomInd = -1

    // check if lip already in a room
    for(const [ind, room] of fRooms.entries()) {
      let playInd = room.players.findIndex(p => p.lip.join('.') === entryData.lip.join('.'))
      if (playInd != -1) {
        inRoom = true
        roomInd = ind
      }
    }

    // if not in room, find room with slot, add ip to players arr, get otherplayer data
    let otherPlayers = []
    if(!inRoom) {
      console.log("[" + loglip + " | " + loggip + "] Looking for match room.")
      let dataAdded = false
      for(const room of fRooms) {
        if(room.players.length < room.p_rest + room.p_num) {
          room.players.push({
            gip: entryData.gip,
            lip: entryData.lip,
            port: entryData.port
          })
          dataAdded = true
          otherPlayers = [...room.players]
          otherPlayers.splice(room.players.length-1, 1)

          let opponents = {
            entry_id: K.ITEM('u32', entryData.entry_id),
            entry: otherPlayers.map(e => ({
              port: K.ITEM('u16', e.port),
              gip: K.ITEM('4u8', e.gip),
              lip: K.ITEM('4u8', e.lip)
            }))
          }
          console.log("[" + loglip + " | " + loggip + "] Added data to player list. Sending opponents.")

          return send.object(opponents)
        }
      }

      // if no rooms with slot, create new
      if(!dataAdded) {
        matchRooms.push({
          version: version,
          c_ver: entryData.c_ver,
          filter: entryData.filter,
          mid: entryData.mid,
          p_rest: entryData.p_rest,
          p_num: entryData.p_num,
          players: [
            {
              gip: entryData.gip,
              lip: entryData.lip,
              port: entryData.port
            }
          ]
        })
        console.log("[" + loglip + " | " + loggip + "] Rooms with same filter full, creating new.")
        // delete room after sec
        setTimeout(function () {
          const search = (element) => element.players[0].lip.join('.') === entryData.lip.join('.')
          const index = matchRooms.findIndex(search)
          console.log("[" + loglip + " | " + loggip + "] Room expired, deleting.")
          matchRooms.splice(index, 1)
        }, (entryData.sec * 100) * 1000);
        let opponents = {
          entry_id: K.ITEM('u32', entryData.entry_id),
        }
        return send.object(opponents)
      }
    }

    // if in room, use index to find room
    else {
      let room = fRooms[roomInd]
      let playInd = room.players.findIndex(p => p.lip.join('.') === entryData.lip.join('.'))
      otherPlayers = [...room.players]
      otherPlayers.splice(playInd, 1)
      let opponents = {
        entry_id: K.ITEM('u32', entryData.entry_id),
        entry: otherPlayers.map(e => ({
          port: K.ITEM('u16', e.port),
          gip: K.ITEM('4u8', e.gip),
          lip: K.ITEM('4u8', e.lip)
        }))
      }
      console.log("[" + loglip + " | " + loggip + "] Already in room, re-sending opponents")
      return send.object(opponents)
    }
  }
}

export const lounge: EPR = async (info, data, send) => {
  const version = Math.abs(getVersion(info));
  let filter = $(data).number('filter')
  let matches = matchRooms.filter(room => room.filter === filter)
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
