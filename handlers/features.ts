import { Profile } from '../models/profile';
import { MusicRecord } from '../models/music_record';
import { Serial } from '../models/param';
import { Matchmaker } from '../models/matchmaker';
import { getVersion, IDToCode, GetCounter, checkVerStart } from '../utils';
import { Rival } from '../models/rival';
import { Item } from '../models/item';
import { SERIAL3 } from '../data/gw';

var matchRooms = []

export const hiscore: EPR = async (info, data, send) => {
  const version = Math.abs(getVersion(info));
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));

  const records = await DB.Find<MusicRecord>(null, { collection: 'music', version });

  const profiles = _.groupBy(
    await DB.Find<Profile>(null, { collection: 'profile', version }),
    '__refid'
  );

  if (version === 1) {
    return send.object({
      hiscore: K.ATTR({ type: "1" }, {
        music: _.map(
          _.groupBy(records, r => `${r.mid}:${r.type}`),
          r => _.maxBy(r, 'score')
        ).map(r => (
          K.ATTR({ id: r.mid.toString() }, {
          note: K.ATTR({ type: r.type.toString() }, {
            name: K.ITEM('str', profiles[r.__refid][0].name),
            score: K.ITEM('u32', r.score)
          })
        }))),
      })
    })
  }

  if (version === 2 || (version === 3 && dVersion === 20151116)) {
    let profCnt = await DB.Count<Profile>(null, {collection: 'profile', version})
    return send.object({
      hiscore_allover: {
        info: _.map(
          _.groupBy(records, r => `${r.mid}:${r.type}`),
          r => _.maxBy(r, 'score')
        ).map(r => ({
          id: K.ITEM('u32', r.mid),
          type: K.ITEM('u32', r.type),
          seq: K.ITEM('str', IDToCode(profiles[r.__refid][0].id)),
          name: K.ITEM('str', profiles[r.__refid][0].name),
          score: K.ITEM('u32', r.score)
        }))
      },
      hiscore_location: {
        info: _.map(
          _.groupBy(records, r => `${r.mid}:${r.type}`),
          r => _.maxBy(r, 'score')
        ).map(r => ({
          id: K.ITEM('u32', r.mid),
          type: K.ITEM('u32', r.type),
          seq: K.ITEM('str', IDToCode(profiles[r.__refid][0].id)),
          name: K.ITEM('str', profiles[r.__refid][0].name),
          score: K.ITEM('u32', r.score)
        }))
      },
      clear_rate: {
        d: _.map(
          _.groupBy(records, r => `${r.mid}:${r.type}`),
          group => {
            const filt = _.filter(group, g => g.clear > 1).length

            return {
              id: K.ITEM('u32', group[0].mid),
              type: K.ITEM('u32', group[0].type),
              cr: K.ITEM('s16', Math.ceil((filt / profCnt) * 10000))
            }
          }
        )
      }
    })
  }

  return send.object({
    sc: {
      d: _.map(
        _.groupBy(records, r => `${r.mid}:${r.type}`),
        group => {
          const rScore = _.maxBy(group, 'score')
          const rExscore = _.maxBy(group, 'exscore')
          
          return {
            id: K.ITEM('u32', rScore.mid),
            ty: K.ITEM('u32', rScore.type),
            a_sq: K.ITEM('str', IDToCode(profiles[rScore.__refid][0].id)),
            a_nm: K.ITEM('str', profiles[rScore.__refid][0].name),
            a_sc: K.ITEM('u32', rScore.score),
            l_sq: K.ITEM('str', IDToCode(profiles[rScore.__refid][0].id)),
            l_nm: K.ITEM('str', profiles[rScore.__refid][0].name),
            l_sc: K.ITEM('u32', rScore.score),
            ...(version >= 6 && {
              ax_sq: K.ITEM('str', IDToCode(profiles[rExscore.__refid][0].id)),
              ax_nm: K.ITEM('str', profiles[rExscore.__refid][0].name),
              ax_sc: K.ITEM('u32', rExscore.exscore),
              lx_sq: K.ITEM('str', IDToCode(profiles[rExscore.__refid][0].id)),
              lx_nm: K.ITEM('str', profiles[rExscore.__refid][0].name),
              lx_sc: K.ITEM('u32', rExscore.exscore),
            })
          }
        }
      )
    }
  });
};

export const rival: EPR = async (info, data, send) => {
  const version = Math.abs(getVersion(info));
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));
  let refid = $(data).str('refid', ((version === 2 || version === 3) ? $(data).str('dataid') : $(data).attr().dataid));
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

  if(matchRooms.length === 0) {
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

    // delete room after sec
    setTimeout(function () {
      console.log("[" + loglip + " | " + loggip + "] Deleting expired room: " + entryData.c_ver + " - " + entryData.filter +  -  + entryData.mid)
      const search = (element) => element.players[0].lip.join('.') === entryData.lip.join('.')
      const index = matchRooms.findIndex(search)
      matchRooms.splice(index, 1)
    }, entryData.sec * 1000);

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
    for(const [ind, room] of matchRooms.entries()) {
      if(room.version === version && room.c_ver === entryData.c_ver && room.filter === entryData.filter && room.mid === entryData.mid) {
        let playInd = room.players.findIndex(p => p.lip.join('.') === entryData.lip.join('.'))
        if (playInd != -1) {
          inRoom = true
          roomInd = ind
        }
      }
    }

    // if not in room, find room with slot, add ip to players arr, get otherplayer data
    let otherPlayers = []
    if(!inRoom) {
      console.log("[" + loglip + " | " + loggip + "] Looking for match room.")
      let dataAdded = false
      for(const [ind, room] of matchRooms.entries()) {
        if(room.version === version && room.c_ver === entryData.c_ver && room.filter === entryData.filter && room.mid === entryData.mid) {
          if(room.players.length < room.p_rest + room.p_num) {
            matchRooms[ind].players.push({
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
            console.log("[" + loglip + " | " + loggip + "] Added data to player list. Sending opponent data.")

            return send.object(opponents)
          }
        }
      }

      // if no rooms with slot, create new
      if(!dataAdded) {
        console.log("[" + loglip + " | " + loggip + "] No available rooms, creating new room.")
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
        // delete room after sec
        setTimeout(function () {
          const search = (element) => element.players[0].lip.join('.') === entryData.lip.join('.')
          const index = matchRooms.findIndex(search)
          console.log("[" + loglip + " | " + loggip + "] Deleting expired room: " + entryData.c_ver + " - " + entryData.filter +  -  + entryData.mid)
          matchRooms.splice(index, 1)
        }, entryData.sec * 1000);
        let opponents = {
          entry_id: K.ITEM('u32', entryData.entry_id),
        }
        return send.object(opponents)
      }
    }

    // if in room, use index to find room, get otherplayer data
    else {
      let room = matchRooms[roomInd]
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
      console.log("[" + loglip + " | " + loggip + "] Already in room, re-sending opponent data.")
      return send.object(opponents)
    }
  }
}

export const lounge: EPR = async (info, data, send) => {
  const version = Math.abs(getVersion(info));
  let filter = $(data).number('filter')
  let matches = matchRooms.filter(room => room.version === version && room.filter === filter)
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

export const serial: EPR = async (info, data, send) => {
  const version = Math.abs(getVersion(info));
  const dVersion = parseInt(info.model.split(":")[4].slice(0, -2));
  if(version !== 3) return send.deny()
  let date = new Date()
  let refid = $(data).str('refid')
  let serial = SERIAL3.filter(s => checkVerStart(dVersion, s.version, 1, date))

  const code = parseInt($(data).str('code'))
  let used = await DB.FindOne<Serial>(refid, {collection: 'serial', version})
  let usedInd = used ? used.list.findIndex(l => l === code) : -1
  let found = serial.find(s => s.code === code)
  let result = 0
  if(!found) result = 2
  else if(usedInd >= 0 && found.onetime) result = 3 

  let finItems = []
  if(result === 0) {
    for(const item of found.items) {
      await DB.Upsert<Item>(refid, {collection: 'item', version, type: item.type, id: item.id}, {
        $inc: {
          param: item.param
        }
      })
      finItems.push({item: await DB.FindOne<Item>(refid, {collection: 'item', version, type: item.type, id: item.id}), param: item.param})
    }

    if(usedInd < 0) {
      await DB.Upsert<Serial>(refid, {collection: 'serial', version}, {
        $push: {
          list: code
        }
      })
    } 

  } else {
    return send.object({
      result: K.ITEM('s8', result),
      serial_name: K.ITEM('str', "__"),
      gamecoin_packet: K.ITEM('u32', 0),
      gamecoin_block: K.ITEM('u32', 0),
      blaster_energy: K.ITEM('u32', 0),
    })
  }

  return send.object({
    //success, congest, invalid, used
    result: K.ITEM('s8', result), 
    serial_name: K.ITEM('str', "__"),
    item: finItems.map(i => ({
      type: K.ITEM('u32', i.item.type === 6 ? 3 : i.type),
      id: K.ITEM('u32', i.item.id),
      param: K.ITEM('u32', i.param),
      param_after: K.ITEM('u32', i.item.param),
    })),
    gamecoin_packet: K.ITEM('u32', found.pc),
    gamecoin_block: K.ITEM('u32', found.blc),
    blaster_energy: K.ITEM('u32', found.energy),
  })

  // return send.object({
  //   result: K.ITEM('s8', 0),
  //   serial_name: K.ITEM('str', "THis are an test"),
  //   item: [
  //     {
  //       type: K.ITEM('u32', 3),
  //       id: K.ITEM('u32', 1),
  //       param: K.ITEM('u32', 30),
  //       param_after: K.ITEM('u32', 35),
  //     }
  //   ],
  //   gamecoin_packet: K.ITEM('u32', 1000),
  //   gamecoin_block: K.ITEM('u32', 100),
  //   blaster_energy: K.ITEM('u32', 69),
  // })
}
