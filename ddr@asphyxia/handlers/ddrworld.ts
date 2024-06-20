import { Profile } from "../models/profile";
import { ProfileWorld, ScoreWorld, EventWorld, GhostWorld } from "../models/ddrworld";
import { SONGS_WORLD, EVENTS_WORLD } from "../data/world";

async function saveScores(refid: string, songId: number, style: number, difficulty: number, rank: number, clearKind: number, score: number, exScore: number, maxCombo: number, flareForce: number, ghostSize: number, ghost: string) {
  let stepScore = await DB.Find<ScoreWorld>(refid, {collection: "score3", songId: songId, style: style, difficulty: difficulty})
  if(stepScore.length > 0) {
    rank = (rank < stepScore[0].rank) ? rank : stepScore[0].rank;
    clearKind = (clearKind != 6 && clearKind > stepScore[0].clearKind) ? clearKind : stepScore[0].clearKind;
    score = (score > stepScore[0].score) ? score : stepScore[0].score;
    exScore = (exScore > stepScore[0].exScore) ? exScore : stepScore[0].exScore;
    maxCombo = (maxCombo > stepScore[0].maxCombo) ? maxCombo : stepScore[0].maxCombo;
    flareForce = (flareForce > stepScore[0].flareForce) ? flareForce : stepScore[0].flareForce;
  }

  await DB.Upsert<ScoreWorld>(refid, {
    collection: "score3",
    songId,
    style,
    difficulty
    }, {
      $set: {
        rank,
        clearKind,
        score,
        exScore,
        maxCombo,
        flareForce
      }
  });

  await DB.Upsert<GhostWorld>(refid, {
    collection: "ghost3",
    songId,
    difficulty
    }, {
      $set: {
        ghostSize,
        ghost
      }
  });
}

export const playerdatanew: EPR = async (info, data, send) => {
  const refid = $(data).str("data.refid");
  console.log('playerdatanew')
  console.log("----------------------")
  let ddrCode = _.random(1, 99999999)
  await DB.Upsert<ProfileWorld>(refid, { collection: "profile3" }, {
    collection: "profile3",
    ddrCode: ddrCode
  })
  return send.object({
    result: K.ITEM("s32", 0),
    refid: K.ITEM("str", refid),
    ddrcode: K.ITEM("s32", ddrCode),
    istakeover: K.ITEM('bool', false)
  })
}

export const playerdatasave: EPR = async (info, data, send) => {
  const refid = $(data).str("data.refid");
  if(!refid.startsWith("X000")) {
    if($(data).number("data.savekind") === 1) {
      await DB.Upsert<ProfileWorld>(refid, { collection: "profile3" }, {
        collection: "profile3",
        
        ddrCode: $(data).number('data.common.ddrcode'),
        dancerName: $(data).str('data.common.dancername'),
        area: $(data).number('data.common.area'),
        extraStar: $(data).number('data.common.extrastar'),
        playCount: 0,
        weight: 0,
        todayCal: $(data).number('data.common.today_cal'),
        isDispWeight: true,
        prePlayableNum: 0,

        opHispeed: $(data).number('data.option.hispeed'),
        opGauge: $(data).number('data.option.gauge'),
        opFastSlow: $(data).number('data.option.fastslow'),
        opGuideline: $(data).number('data.option.guideline'),
        opStepZone: $(data).number('data.option.stepzone'),
        opTimingDisp: $(data).number('data.option.timing_disp'),
        opVisibility: $(data).number('data.option.visibility'),
        opVisibleTime: $(data).number('data.option.visible_time'),
        opLane: $(data).number('data.option.lane'),
        opLaneHiddenPos: $(data).number('data.option.lane_hiddenpos'),
        opLaneSuddenPos: $(data).number('data.option.lane_suddenpos'),
        opLaneHidSudPos: $(data).number('data.option.lane_hidsudpos'),
        opLaneFilter: $(data).number('data.option.lane_filter'),
        opScrollDirection: $(data).number('data.option.scroll_direction'),
        opScrollMoving: $(data).number('data.option.scroll_moving'),
        opArrowPriority: $(data).number('data.option.arrow_priority'),
        opArrowPlacement: $(data).number('data.option.arrow_placement'),
        opArrowColor: $(data).number('data.option.arrow_color'),
        opArrowDesign: $(data).number('data.option.arrow_design'),
        opCutTiming: $(data).number('data.option.cut_timing'),
        opCutFreeze: $(data).number('data.option.cut_freeze'),
        opCutJump: $(data).number('data.option.cut_jump'),
        
        lpMode: $(data).number('data.lastplay.mode'),
        lpFolder: $(data).number('data.lastplay.folder'),
        lpMcode: $(data).number('data.lastplay.mcode'),
        lpStyle: $(data).number('data.lastplay.style'),
        lpDifficulty: $(data).number('data.lastplay.difficulty'),
        lpWindowMain: $(data).number('data.lastplay.window_main'),
        lpWindowSub: $(data).number('data.lastplay.window_sub'),
        lpTarget: $(data).number('data.lastplay.target'),
        lpTabMain: $(data).number('data.lastplay.tab_main'),
        lpTabSub: $(data).number('data.lastplay.tab_sub'),
        
        fsTitle: $(data).number('data.filtersort.title'),
        fsVersion: $(data).number('data.filtersort.version'),
        fsGenre: $(data).number('data.filtersort.genre'),
        fsBpm: $(data).number('data.filtersort.bpm'),
        fsEvent: $(data).number('data.filtersort.event'),
        fsLevel: $(data).number('data.filtersort.level'),
        fsFlareRank: $(data).number('data.filtersort.flare_rank'),
        fsClearRank: $(data).number('data.filtersort.clear_rank'),
        fsFlareSkillTarget: $(data).number('data.filtersort.flare_skill_target'),
        fsRivalFlareSkill: $(data).number('data.filtersort.rival_flare_skill'),
        fsRivalScoreRank: $(data).number('data.filtersort.rival_score_rank'),
        fsSortType: $(data).number('data.filtersort.sort_type'),
        fsOrderType: $(data).number('data.filtersort.order_type'),
        
        cgTipsBasic: $(data).number('data.checkguide.tips_basic'),
        cgTipsOption: $(data).number('data.checkguide.tips_option'),
        cgTipsEvent: $(data).number('data.checkguide.tips_event'),
        cgTipsGimmick: $(data).number('data.checkguide.tips_gimmick'),
        cgTipsAdvance: $(data).number('data.checkguide.tips_advance'),
        cgGuideScene: $(data).number('data.checkguide.guide_scene')
      })
    }
    else if($(data).number("data.savekind") === 2) {
      let songId = $(data).number("data.result.mcode");
      let style = $(data).number("data.result.style");
      let difficulty = $(data).number("data.result.difficulty");
      let rank = $(data).number("data.result.rank");
      let clearKind = $(data).number("data.result.clearkind");
      let score = $(data).number("data.result.score");
      let exScore = $(data).number("data.result.exscore");
      let maxCombo = $(data).number("data.result.maxcombo");
      let flareForce = $(data).number("data.result.flare_force");
      let ghostSize = $(data).number("data.result.ghostsize");
      let ghost = $(data).str("data.result.ghost");
      saveScores(refid, songId, style, difficulty, rank, clearKind, score, exScore, maxCombo, flareForce, ghostSize, ghost)
    }
    else if($(data).number("data.savekind") === 3) {
      let profile = await DB.FindOne<ProfileWorld>(refid, {collection: "profile3"})
      await DB.Upsert<ProfileWorld>(refid, { collection: "profile3" }, {
        collection: "profile3",
        
        ddrCode: $(data).number('data.common.ddrcode'),
        dancerName: $(data).str('data.common.dancername'),
        area: $(data).number('data.common.area'),
        extraStar: $(data).number('data.common.extrastar'),
        playCount: profile.playCount += 1,
        weight: 0,
        todayCal: $(data).number('data.common.today_cal'),
        isDispWeight: true,
        prePlayableNum: 0,

        opHispeed: $(data).number('data.option.hispeed'),
        opGauge: $(data).number('data.option.gauge'),
        opFastSlow: $(data).number('data.option.fastslow'),
        opGuideline: $(data).number('data.option.guideline'),
        opStepZone: $(data).number('data.option.stepzone'),
        opTimingDisp: $(data).number('data.option.timing_disp'),
        opVisibility: $(data).number('data.option.visibility'),
        opVisibleTime: $(data).number('data.option.visible_time'),
        opLane: $(data).number('data.option.lane'),
        opLaneHiddenPos: $(data).number('data.option.lane_hiddenpos'),
        opLaneSuddenPos: $(data).number('data.option.lane_suddenpos'),
        opLaneHidSudPos: $(data).number('data.option.lane_hidsudpos'),
        opLaneFilter: $(data).number('data.option.lane_filter'),
        opScrollDirection: $(data).number('data.option.scroll_direction'),
        opScrollMoving: $(data).number('data.option.scroll_moving'),
        opArrowPriority: $(data).number('data.option.arrow_priority'),
        opArrowPlacement: $(data).number('data.option.arrow_placement'),
        opArrowColor: $(data).number('data.option.arrow_color'),
        opArrowDesign: $(data).number('data.option.arrow_design'),
        opCutTiming: $(data).number('data.option.cut_timing'),
        opCutFreeze: $(data).number('data.option.cut_freeze'),
        opCutJump: $(data).number('data.option.cut_jump'),
        
        lpMode: $(data).number('data.lastplay.mode'),
        lpFolder: $(data).number('data.lastplay.folder'),
        lpMcode: $(data).number('data.lastplay.mcode'),
        lpStyle: $(data).number('data.lastplay.style'),
        lpDifficulty: $(data).number('data.lastplay.difficulty'),
        lpWindowMain: $(data).number('data.lastplay.window_main'),
        lpWindowSub: $(data).number('data.lastplay.window_sub'),
        lpTarget: $(data).number('data.lastplay.target'),
        lpTabMain: $(data).number('data.lastplay.tab_main'),
        lpTabSub: $(data).number('data.lastplay.tab_sub'),
        
        fsTitle: $(data).number('data.filtersort.title'),
        fsVersion: $(data).number('data.filtersort.version'),
        fsGenre: $(data).number('data.filtersort.genre'),
        fsBpm: $(data).number('data.filtersort.bpm'),
        fsEvent: $(data).number('data.filtersort.event'),
        fsLevel: $(data).number('data.filtersort.level'),
        fsFlareRank: $(data).number('data.filtersort.flare_rank'),
        fsClearRank: $(data).number('data.filtersort.clear_rank'),
        fsFlareSkillTarget: $(data).number('data.filtersort.flare_skill_target'),
        fsRivalFlareSkill: $(data).number('data.filtersort.rival_flare_skill'),
        fsRivalScoreRank: $(data).number('data.filtersort.rival_score_rank'),
        fsSortType: $(data).number('data.filtersort.sort_type'),
        fsOrderType: $(data).number('data.filtersort.order_type'),
        
        cgTipsBasic: $(data).number('data.checkguide.tips_basic'),
        cgTipsOption: $(data).number('data.checkguide.tips_option'),
        cgTipsEvent: $(data).number('data.checkguide.tips_event'),
        cgTipsGimmick: $(data).number('data.checkguide.tips_gimmick'),
        cgTipsAdvance: $(data).number('data.checkguide.tips_advance'),
        cgGuideScene: $(data).number('data.checkguide.guide_scene')
      })

      let eventData = $(data).elements('data.event')
      if(eventData) {
        for(const e of eventData) {
          let eid = e.number('eventid')
          let eno = e.number('eventno')
          let etype = e.number('eventtype')
          let ctime = getDate()
          let sdata = e.number('savedata')

          await DB.Upsert<EventWorld>(refid, { collection: "event3", eventId: eid }, {
            collection: "event3", 
            eventId: eid, 
            eventNo: eno, 
            eventType: etype, 
            compTime: ctime, 
            saveData: sdata 
          })
        }
      }
    }

    return send.object({
      result: K.ITEM("s32", 0)
    })
  }

  return send.object({
    result: K.ITEM("s32", 1)
  })
};

export const playerdataload: EPR = async (info, data, send) => {
  const refid = $(data).str("data.refid");
  const profile = await DB.FindOne<ProfileWorld>(refid, { collection: "profile3" });

  if (!profile || refid.startsWith("X000"))  {
    return send.object({
      result: K.ITEM("s32", 0),
      refid: K.ITEM("str", refid),
      gamesession: K.ITEM('s64', BigInt(1)),
      servertime: K.ITEM("u64", BigInt(getDate())),
      is_locked: K.ITEM('bool', false),
      common: {
        ddrcode: K.ITEM("s32", 0),
        dancername: K.ITEM("str", ''),
        is_new: K.ITEM('bool', true),
        is_registering: K.ITEM('bool', false),
        area: K.ITEM("s32", 0),
        extrastar: K.ITEM("s32", 0),
        playcount: K.ITEM("s32", 0),
        weight: K.ITEM("s32", 0),
        today_cal: K.ITEM("u64", BigInt(0)),
        is_disp_weight: K.ITEM("bool", false),
        is_takeover: K.ITEM('bool', false),
        pre_playable_num: K.ITEM("s32", 0)
      },
      option: {
        hispeed: K.ITEM("s32", 0),
        gauge: K.ITEM("s32", 0),
        fastslow: K.ITEM("s32", 0),
        guideline: K.ITEM("s32", 0),
        stepzone: K.ITEM("s32", 0),
        timing_disp: K.ITEM("s32", 0),
        visibility: K.ITEM("s32", 0),
        visible_time: K.ITEM("s32", 0),
        lane: K.ITEM("s32", 0),
        lane_hiddenpos: K.ITEM("s32", 0),
        lane_suddenpos: K.ITEM("s32", 0),
        lane_hidsudpos: K.ITEM("s32", 0),
        lane_filter: K.ITEM("s32", 0),
        scroll_direction: K.ITEM("s32", 0),
        scroll_moving: K.ITEM("s32", 0),
        arrow_priority: K.ITEM("s32", 0),
        arrow_placement: K.ITEM("s32", 0),
        arrow_color: K.ITEM("s32", 0),
        arrow_design: K.ITEM("s32", 0),
        cut_timing: K.ITEM("s32", 0),
        cut_freeze: K.ITEM("s32", 0),
        cut_jump: K.ITEM("s32", 0)
      },
      lastplay: {
        mode: K.ITEM("s32", 0),
        folder: K.ITEM("s32", 0),
        mcode: K.ITEM("s32", 0),
        style: K.ITEM("s32", 0),
        difficulty: K.ITEM("s32", 0),
        window_main: K.ITEM("s32", 0),
        window_sub: K.ITEM("s32", 0),
        target: K.ITEM("s32", 0),
        tab_main: K.ITEM("s32", 0),
        tab_sub: K.ITEM("s32", 0)
      },
      filtersort: {
        title: K.ITEM("u64", BigInt(0)),
        version: K.ITEM("u64", BigInt(0)),
        genre: K.ITEM("u64", BigInt(0)),
        bpm: K.ITEM("u64", BigInt(0)),
        event: K.ITEM("u64", BigInt(0)),
        level: K.ITEM("u64", BigInt(0)),
        flare_rank: K.ITEM("u64", BigInt(0)),
        clear_rank: K.ITEM("u64", BigInt(0)),
        flare_skill_target: K.ITEM("u64", BigInt(0)),
        rival_flare_skill: K.ITEM("u64", BigInt(0)),
        rival_score_rank: K.ITEM("u64", BigInt(0)),
        sort_type: K.ITEM("u64", BigInt(0)),
        order_type: K.ITEM("s32", 0),
      },
      checkguide: {
        tips_basic: K.ITEM("u64", BigInt(0)),
        tips_option: K.ITEM("u64", BigInt(0)),
        tips_event: K.ITEM("u64", BigInt(0)),
        tips_gimmick: K.ITEM("u64", BigInt(0)),
        tips_advance: K.ITEM("u64", BigInt(0)),
        guide_scene: K.ITEM("u64", BigInt(0)),
      },
      rival: [
        {
          slot: K.ITEM("s32", 0),
          rivalcode: K.ITEM("s32", 0)
        }
      ],
      score: [
        {
          mcode: K.ITEM("s32", 0),
          score_single: {
            score_str: K.ITEM("str", "")
          },
          score_double: {
            score_str: K.ITEM("str", "")
          }
        }
      ],
      event: {
        event_str: K.ITEM("str", "")
      }
    })
  }
  else {
    const scores = await DB.Find<ScoreWorld>(refid, { collection: "score3" });

    let scoreFin = []
    if(scores) {
      for(const scoreData of scores) {
        let mcodeIndex = scoreFin.findIndex(x => $(x).number('mcode') === scoreData.songId)
        if(mcodeIndex < 0) {
          let scr = {}
          scr['mcode'] = K.ITEM('s32', scoreData.songId)
          scr['score_single'] = []
          scr['score_double'] = []
          /*
            difficulty,idk,grade,clearkind,score,idk either,flaredisp,flarepoints
            needs more work, 9 vals
          */
          scr[(scoreData.style === 0) ? 'score_single' : 'score_double'] = [
            {
              score_str: K.ITEM('str', scoreData.difficulty + ',1,' + scoreData.rank + ',' + scoreData.clearKind + ',' + scoreData.score + ',' + scoreData.exScore + ',' + scoreData.flareForce + ',' + scoreData.flareForce)
            }
          ]
          scoreFin.push(scr)
          
        } else {
          scoreFin[mcodeIndex][(scoreData.style === 0) ? 'score_single' : 'score_double'].push({
            score_str: K.ITEM('str', scoreData.difficulty + ',1,' + scoreData.rank + ',' + scoreData.clearKind + ',' + scoreData.score + ',' + scoreData.exScore + ',' + scoreData.flareForce + ',' + scoreData.flareForce)
          })
        }
      }
    }

    let eventFin = []
    for(const event of EVENTS_WORLD) {
      let eventData = await DB.FindOne<EventWorld>(refid, { collection: "event3", eventId: event.id, eventNo: event.no });
      eventFin.push({
        event_str: K.ITEM('str', event.id + ',' + event.type + ',' + event.no + ',0,' + event.sid + ',' + ((eventData) ? BigInt(eventData.compTime) : '0') + ',' + ((eventData) ? eventData.saveData : '0'))
      })  
    }

    return send.object({
      result: K.ITEM("s32", 0),
      refid: K.ITEM("str", refid),
      gamesession: K.ITEM('s64', BigInt(1)),
      servertime: K.ITEM("u64", BigInt(getDate())),
      is_locked: K.ITEM('bool', false),
      common: {
        ddrcode: K.ITEM("s32", profile.ddrCode),
        dancername: K.ITEM("str", profile.dancerName),
        is_new: K.ITEM('bool', false),
        is_registering: K.ITEM('bool', false),
        is_takeover: K.ITEM('bool', false),
        area: K.ITEM("s32", profile.area),
        extrastar: K.ITEM("s32", profile.extraStar),
        playcount: K.ITEM("s32", profile.playCount),
        weight: K.ITEM("s32", profile.weight),
        today_cal: K.ITEM("u64", BigInt(profile.todayCal)),
        is_disp_weight: K.ITEM("bool", profile.isDispWeight),
        pre_playable_num: K.ITEM("s32", profile.prePlayableNum)
      },
      option: {
        hispeed: K.ITEM("s32", profile.opHispeed),
        gauge: K.ITEM("s32", profile.opGauge),
        fastslow: K.ITEM("s32", profile.opFastSlow),
        guideline: K.ITEM("s32", profile.opGuideline),
        stepzone: K.ITEM("s32", profile.opStepZone),
        timing_disp: K.ITEM("s32", profile.opTimingDisp),
        visibility: K.ITEM("s32", profile.opVisibility),
        visible_time: K.ITEM("s32", profile.opVisibleTime),
        lane: K.ITEM("s32", profile.opLane),
        lane_hiddenpos: K.ITEM("s32", profile.opLaneHiddenPos),
        lane_suddenpos: K.ITEM("s32", profile.opLaneSuddenPos),
        lane_hidsudpos: K.ITEM("s32", profile.opLaneHidSudPos),
        lane_filter: K.ITEM("s32", profile.opLaneFilter),
        scroll_direction: K.ITEM("s32", profile.opScrollDirection),
        scroll_moving: K.ITEM("s32", profile.opScrollMoving),
        arrow_priority: K.ITEM("s32", profile.opArrowPriority),
        arrow_placement: K.ITEM("s32", profile.opArrowPlacement),
        arrow_color: K.ITEM("s32", profile.opArrowColor),
        arrow_design: K.ITEM("s32", profile.opArrowDesign),
        cut_timing: K.ITEM("s32", profile.opCutTiming),
        cut_freeze: K.ITEM("s32", profile.opCutFreeze),
        cut_jump: K.ITEM("s32", profile.opCutJump)
      },
      lastplay: {
        mode: K.ITEM("s32", profile.lpMode),
        folder: K.ITEM("s32", profile.lpFolder),
        mcode: K.ITEM("s32", profile.lpMcode),
        style: K.ITEM("s32", profile.lpStyle),
        difficulty: K.ITEM("s32", profile.lpDifficulty),
        window_main: K.ITEM("s32", profile.lpWindowMain),
        window_sub: K.ITEM("s32", profile.lpWindowSub),
        target: K.ITEM("s32", profile.lpTarget),
        tab_main: K.ITEM("s32", profile.lpTabMain),
        tab_sub: K.ITEM("s32", profile.lpTabSub)
      },
      filtersort: {
        title: K.ITEM("u64", BigInt(profile.fsTitle)),
        version: K.ITEM("u64", BigInt(profile.fsVersion)),
        genre: K.ITEM("u64", BigInt(profile.fsGenre)),
        bpm: K.ITEM("u64", BigInt(profile.fsBpm)),
        event: K.ITEM("u64", BigInt(profile.fsEvent)),
        level: K.ITEM("u64", BigInt(profile.fsLevel)),
        flare_rank: K.ITEM("u64", BigInt(profile.fsFlareRank)),
        clear_rank: K.ITEM("u64", BigInt(profile.fsClearRank)),
        flare_skill_target: K.ITEM("u64", BigInt(profile.fsFlareSkillTarget)),
        rival_flare_skill: K.ITEM("u64", BigInt(profile.fsRivalFlareSkill)),
        rival_score_rank: K.ITEM("u64", BigInt(profile.fsRivalScoreRank)),
        sort_type: K.ITEM("u64", BigInt(profile.fsSortType)),
        order_type: K.ITEM("s32", profile.fsOrderType),
      },
      checkguide: {
        tips_basic: K.ITEM("u64", BigInt(profile.cgTipsBasic)),
        tips_option: K.ITEM("u64", BigInt(profile.cgTipsOption)),
        tips_event: K.ITEM("u64", BigInt(profile.cgTipsEvent)),
        tips_gimmick: K.ITEM("u64", BigInt(profile.cgTipsGimmick)),
        tips_advance: K.ITEM("u64", BigInt(profile.cgTipsAdvance)),
        guide_scene: K.ITEM("u64", BigInt(profile.cgGuideScene)),
      },
      rival: [],
      score: scoreFin,
      event: eventFin
    });
  }
};

export const musicdataload: EPR = async (info, data, send) => {
  let musicList = []
  if(IO.Exists('data/musicdb.xml')) { 
    let mdb = U.parseXML(U.DecodeString(await IO.ReadFile('data/musicdb.xml'), "shift_jis"), false)
    for(const music of mdb['mdb']['music']) {
      let difficultyArr = $(music).numbers('diffLv')
      let limited = ($(music).number('limited')) ? $(music).number('limited') : 0
      for(const [index, diff] of difficultyArr.entries()) {
        limited = ($(music).numbers('limited_ary')) ? $(music).numbers('limited_ary')[index] : limited
        limited = ((index % 5 === 4) && $(music).number('limited_cha')) ? $(music).number('limited_cha') : limited
        musicList.push({
          music_str: K.ITEM('str', $(music).number('mcode') + ',' + ((index > 4) ? '1,' : '0,') + (index % 5) + ',' + limited + ',' + diff)
        })
      }
    }
  }

  for(const music of SONGS_WORLD) {
    for(const [index, diff] of music.diffLv.entries()) {
      if(music.limited_ary[index] != -1) {
        musicList.push({
          music_str: K.ITEM('str', music.mcode + ',' + ((index > 4) ? '1,' : '0,') + (index % 5) + ',' + music.limited_ary[index] + ',' + diff)
        })
      }
    }
  }

  return send.object({
    result: K.ITEM("s32", 0),
    servertime: K.ITEM("u64", BigInt(getDate())),
    music: musicList
  });
};

export const rivaldataload: EPR = async (info, data, send) => {
  return send.object({
    result: K.ITEM("s32", 0),
    record: []
  });
};

export const ghostdataload: EPR = async (info, data, send) => {
  // i quite frankly dk what this is for lol i don't play ddr
  const refid = $(data).str("data.refid");
  const ghostId = $(data).number("data.ghostid");
  let ghostData = await DB.FindOne<GhostWorld>(refid, {collection: 'ghost3', songId: ghostId})
  if(ghostData) {
    return send.object({
      result: K.ITEM("s32", 0),
      ghostsize: K.ITEM("s32", ghostData.ghostSize),
      ghost: K.ITEM("str", ghostData.ghost)
    });
  }
  return send.object({ result: K.ITEM("s32", 0) });
};

export const taboowordcheck: EPR = async (info, data, send) => {
  // Automatically accept word
  return send.object({
    result: K.ITEM("s32", 0),
    is_taboo: K.ITEM("bool", false)
  });
};

export const minidump: EPR = async (info, data, send) => {
  console.log($(data).str('minidump'))
  return send.object({ result: K.ITEM('s32', 0) })
};

function getDate(): number {
  let time = new Date();
  let tempDate = time.getDate();
  const currentTime = parseInt((time.getTime()/100000) as unknown as string)*100;
  return currentTime
}
