import { Profile } from "../models/profile";
import { ProfileWorld, ScoreWorld, EventWorld, GhostWorld, RivalWorld, HiScoreWorld, LeagueWorld, CustomizeWorld } from "../models/ddrworld";
import { SONGS_WORLD, SONGS_OVERRIDE_WORLD, EVENTS_WORLD, LEAGUE_WORLD, LOCKED_SONGS } from "../data/world";

function getLastGhostId(ghost: any) {
  let ghostFiltered = ghost.filter(a => (a.ghostId !== undefined))
  if(ghostFiltered.length > 0) return ghostFiltered.sort((a, b) => b.ghostId - a.ghostId)[0].ghostId
  else return 0
}

async function saveScores(refid: string, hiScoreInfo: any, songId: number, style: number, difficulty: number, rank: number, clearKind: number, score: number, exScore: number, maxCombo: number, flareForce: number, ghostSize: number, ghost: string) {
  let stepScore = await DB.FindOne<ScoreWorld>(refid, {collection: "score3", songId: songId, style: style, difficulty: difficulty})
  let ghostData = await DB.Find<GhostWorld>(null, {collection: "ghost3"})
  let lastGhostId = getLastGhostId(ghostData)
  let hiScoreCheck = score
  let ghostId = 0
  if(lastGhostId === 0) {
    ghostId = 1
  } else ghostId = lastGhostId += 1
  /*
    Ghost data gets created when there is no existing data and it gets updated when getting a higher or the same score
    Side effect of this is when you have set a high score prior to this update, the ghost data wouldn't be updated unless you break or match that high score.
    Unfortunately I could not find a way to match the old scores to their respective ghost data, since the old ghost data only stored the song id and difficulty, and not the style (single/double.) Stupid me.
    Still needs more work.
  */
  if(stepScore) {
    ghostId = (stepScore.ghostId) ? stepScore.ghostId : ghostId
    let stepGhost = await DB.FindOne<GhostWorld>(null, {collection: "ghost3", ghostId: ghostId })
    
    if(stepGhost) {
      ghostSize = (score >= stepScore.score) ? ghostSize : stepGhost.ghostSize
      ghost = (score >= stepScore.score) ? ghost : stepGhost.ghost
    }

    rank = (rank < stepScore.rank) ? rank : stepScore.rank;
    clearKind = (clearKind > stepScore.clearKind) ? clearKind : stepScore.clearKind;
    score = (score > stepScore.score) ? score : stepScore.score;
    exScore = (exScore > stepScore.exScore) ? exScore : stepScore.exScore;
    maxCombo = (maxCombo > stepScore.maxCombo) ? maxCombo : stepScore.maxCombo;
    flareForce = (flareForce > stepScore.flareForce) ? flareForce : stepScore.flareForce;

  }

  await DB.Upsert<ScoreWorld>(refid, {
    collection: "score3",
    songId,
    style,
    difficulty
    }, {
      $set: {
        ghostId,
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
    ghostId,
    }, {
      $set: {
        ghostSize,
        ghost
      }
  });

  let slot = 0
  let country = hiScoreInfo.country
  let region = hiScoreInfo.region
  let customerCode = hiScoreInfo.customerCode
  let companyCode = hiScoreInfo.companyCode
  let locationId = hiScoreInfo.locationId
  let pcbid = hiScoreInfo.pcbid
  let dancerName = hiScoreInfo.dancerName

  let worldBreak = false
  let areaBreak = false
  let machineBreak = false

  // Hiscore stuff
  let hiScoreWorld1 = await DB.FindOne<HiScoreWorld>(null, {collection: 'hiscore3', slot: 1, songId: songId, style: style, difficulty: difficulty})
  ghostData = await DB.Find<GhostWorld>(null, {collection: "ghost3"})
  lastGhostId = getLastGhostId(ghostData)
  ghostId = 0
  if(lastGhostId === 0) ghostId = 1
  else ghostId = lastGhostId += 1

  if(hiScoreWorld1) {
    if(hiScoreCheck >= hiScoreWorld1.score) {
      worldBreak = true
      ghostId = (hiScoreWorld1.ghostId) ? hiScoreWorld1.ghostId : ghostId
      await DB.Upsert<GhostWorld>(refid, {collection: "ghost3", ghostId }, {$set: { ghostSize, ghost }});
    }
  } else {
    worldBreak = true
    await DB.Upsert<GhostWorld>(refid, {collection: "ghost3", ghostId }, {$set: { ghostSize, ghost }});
  }
  slot = 1
  if(worldBreak) {
    await DB.Upsert<HiScoreWorld>(refid, {collection: "hiscore3", slot, songId, style, difficulty}, { $set: { country, region, customerCode, companyCode, locationId, pcbid, dancerName, score: hiScoreCheck, ghostId }});
  }

  let hiScoreArea1 = await DB.FindOne<HiScoreWorld>(null, {collection: 'hiscore3', slot: 2, locationId: locationId, songId: songId, style: style, difficulty: difficulty})
  ghostData = await DB.Find<GhostWorld>(null, {collection: "ghost3"})
  lastGhostId = getLastGhostId(ghostData)
  ghostId = 0
  if(lastGhostId === 0) ghostId = 1
  else ghostId = lastGhostId += 1

  if(hiScoreArea1) {
    if(hiScoreCheck >= hiScoreArea1.score) {
      areaBreak = true
      ghostId = (hiScoreArea1.ghostId) ? hiScoreArea1.ghostId : ghostId
      await DB.Upsert<GhostWorld>(refid, {collection: "ghost3", ghostId }, {$set: { ghostSize, ghost }});
    }
  } else {
    areaBreak = true
    await DB.Upsert<GhostWorld>(refid, {collection: "ghost3", ghostId }, {$set: { ghostSize, ghost }});
  }
  slot = 2
  if(areaBreak) {
    await DB.Upsert<HiScoreWorld>(refid, {collection: "hiscore3", slot, locationId, songId, style, difficulty}, { $set: { country, region, customerCode, companyCode, pcbid, dancerName, score: hiScoreCheck, ghostId }});
  }


  let hiScoreMachine1 = await DB.FindOne<HiScoreWorld>(null, {collection: 'hiscore3', slot: 3, locationId: locationId, pcbid: pcbid, songId: songId, style: style, difficulty: difficulty})
  ghostData = await DB.Find<GhostWorld>(null, {collection: "ghost3"})
  lastGhostId = getLastGhostId(ghostData)
  ghostId = 0
  if(lastGhostId === 0) ghostId = 1
  else ghostId = lastGhostId += 1

  if(hiScoreMachine1) {
    if(hiScoreCheck >= hiScoreMachine1.score) {
      machineBreak = true
      ghostId = (hiScoreMachine1.ghostId) ? hiScoreMachine1.ghostId : ghostId
      await DB.Upsert<GhostWorld>(refid, {collection: "ghost3", ghostId }, {$set: { ghostSize, ghost }});
    }
  } else {
    machineBreak = true
    await DB.Upsert<GhostWorld>(refid, {collection: "ghost3", ghostId }, {$set: { ghostSize, ghost }});
  }
  slot = 3
  if(machineBreak) {
    await DB.Upsert<HiScoreWorld>(refid, {collection: "hiscore3", slot, locationId, pcbid, songId, style, difficulty}, { $set: { country, region, customerCode, companyCode, dancerName, score: hiScoreCheck, ghostId }});
  }
}

export const playerdatanew: EPR = async (info, data, send) => {
  const refid = $(data).str("data.refid");
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
      let hiScoreInfo = {
        country: $(data).str("data.country"),
        region: $(data).str("data.region"),
        customerCode: $(data).str("data.customercode"),
        companyCode: $(data).str("data.companycode"),
        locationId: $(data).str("data.locationid"),
        pcbid: $(data).str("data.pcbid"),
        dancerName: $(data).str("data.common.dancername")
      }

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
      await saveScores(refid, hiScoreInfo, songId, style, difficulty, rank, clearKind, score, exScore, maxCombo, flareForce, ghostSize, ghost)
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
          let ctime = e.number('comptime')
          let sdata = e.number('savedata')

          await DB.Upsert<EventWorld>(refid, { collection: "event3", eventId: eid, eventNo: eno, eventType: etype }, {
            collection: "event3", 
            eventId: eid, 
            eventNo: eno, 
            eventType: etype, 
            compTime: ctime, 
            saveData: sdata 
          })
        }
      }

      let leagueData = $(data).element('data.league.current')
      if(leagueData) {
        let leagueId = leagueData.number("league_id")
        let score = leagueData.number("score")
        let playCount = leagueData.number("playcount")
        let leagueExist = await DB.FindOne<LeagueWorld>(refid, {collection: 'league3', id: leagueId})
         
        await DB.Upsert<LeagueWorld>(refid, { collection: "league3", id: leagueId }, {
          $set: {
            class: ((leagueExist.class === 0) ? 1 : leagueExist.class),
            score: score,
            playCount: playCount
          }
        })
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

  if (!profile || !profile.dancerName || refid.startsWith("X000"))  {
    return send.object({
      result: K.ITEM("s32", 0),
      refid: K.ITEM("str", refid),
      gamesession: K.ITEM('s64', BigInt(1)),
      servertime: K.ITEM("u64", BigInt(getDate())),
      is_locked: K.ITEM('bool', false),
      common: {
        ddrcode: K.ITEM("s32", profile ? profile.ddrCode : 0),
        dancername: K.ITEM("str", ''),
        is_new: K.ITEM('bool', (!profile || refid.startsWith("X000")) ? true : false),
        is_registering: K.ITEM('bool', (profile && !profile.dancerName) ? true : false),
        is_takeover: K.ITEM('bool', false),
        area: K.ITEM("s32", 0),
        extrastar: K.ITEM("s32", 0),
        playcount: K.ITEM("s32", 0),
        weight: K.ITEM("s32", 0),
        today_cal: K.ITEM("u64", BigInt(0)),
        is_disp_weight: K.ITEM("bool", false),
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
    // await addGhostId(refid)
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
            difficulty,idk,grade,clearkind,score,ghostid,flaredisp,flarepoints,idk
            needs more work, 9 vals
          */
          scr[(scoreData.style === 0) ? 'score_single' : 'score_double'] = [
            {
              score_str: K.ITEM('str', scoreData.difficulty + ',1,' + scoreData.rank + ',' + scoreData.clearKind + ',' + scoreData.score + ',' + scoreData.ghostId + ',' + scoreData.flareForce + ',' + scoreData.flareForce)
            }
          ]
          scoreFin.push(scr)
          
        } else {
          scoreFin[mcodeIndex][(scoreData.style === 0) ? 'score_single' : 'score_double'].push({
            score_str: K.ITEM('str', scoreData.difficulty + ',1,' + scoreData.rank + ',' + scoreData.clearKind + ',' + scoreData.score + ',' + scoreData.ghostId + ',' + scoreData.flareForce + ',' + scoreData.flareForce)
          })
        }
      }
    }

    let eventFin = []
    let eventData = await DB.Find<EventWorld>(refid, { collection: "event3"});
    for(const event of EVENTS_WORLD) {
      let eData = eventData.find(e => e.eventId === event.id)
      let condmet = true
      let compTime = 0
      if(event.dep) {
        event.dep.forEach(dep => {
          let eData = eventData.find(e => e.eventId === dep)
          if(eData === undefined) condmet = false
          else if(eData.compTime === 0) condmet = false
        })
      }
      // id,type,no,condition,reward,comptime,savedata
      if(condmet) {
        if([17, 43].includes(event.type)) {
          if (eData) eData.compTime = eData.compTime ? 0 : 1 
          compTime = event.comp ? 0 : 1
        }
        eventFin.push({
          event_str: K.ITEM('str', event.id + ',' + event.type + ',' + event.no + ',' + event.cond + ',' + event.rwrd + ',' + (eData ? BigInt(eData.compTime) : compTime) + ',' + ((eData) ? eData.saveData : ((event.save !== undefined) ? event.save : '0')))
        })  
      }
    }

    let leagueData = {}
    let curLeague = LEAGUE_WORLD[1]
    let league = await DB.FindOne(refid, {collection: 'league3', id: curLeague.id})
    if(!league) {
      let leagueClass = 0
      let prevLeague = await DB.FindOne(refid, {collection: 'league3', id: curLeague.id - 1})
      if(prevLeague) leagueClass = prevLeague['class']
      await DB.Upsert<LeagueWorld>(refid, { collection: "league3", id: curLeague.id }, {
        collection: "league3",

        id: curLeague.id,
        class: leagueClass,
        score: 0,
        playCount: 0,
        ended: false,
      })
    }
    league = await DB.FindOne(refid, {collection: 'league3', id: curLeague.id})
    if(league) {
      let leagueAll = await DB.Find(null, {collection: 'league3', id: curLeague.id, class: league['class']})
      let joinNum = leagueAll.length
      let resultClass = league['class']
      let promoteScore = 0
      let promoteRank = 0
      let demoteScore = 0
      let demoteRank = 0
      let leagueStatus = 0
      let leagueScores = leagueAll.map(a => a['score']).sort((a, b) => b - a)
      if(leagueScores[0] > 0) {
        if(league['class'] === 1) {
          promoteScore = Math.round(leagueScores[0] / 2)
          leagueScores = leagueScores.concat([promoteScore]).sort((a, b) => b - a)
          promoteRank = leagueScores.findIndex(s => s === promoteScore) + 1
          joinNum += ((joinNum < 2) ? 2 : 1)
        } else if(league['class'] === 2) {
          promoteScore = Math.round(leagueScores[0] - (leagueScores[0] - (35 / 100 * leagueScores[0])))
          demoteScore = Math.round(leagueScores[0] - (leagueScores[0] - (85 / 100 * leagueScores[0])))
          leagueScores = leagueScores.concat([promoteScore, demoteScore]).sort((a, b) => b - a)
          promoteRank = leagueScores.findIndex(s => s === promoteScore) + 1
          demoteScore = leagueScores.findIndex(s => s === demoteScore) + 1
          joinNum += 2
        } else if(league['class'] === 3) {
          demoteScore = Math.round(leagueScores[0] - (leagueScores[0] - (85 / 100 * leagueScores[0])))
          leagueScores = leagueScores.concat([demoteScore]).sort((a, b) => b - a)
          demoteRank = leagueScores.findIndex(s => s === demoteScore) + 1
          joinNum += ((joinNum < 2) ? 2 : 1)
        }
      }
      let rank = leagueScores.findIndex(s => s === league['score']) + 1
      let leagueClass = (league['class'] === 0) ? 1 : league['class']

      if(leagueClass === 1 && league['score'] >= promoteScore) resultClass += 1
      else if(leagueClass === 2) {
        if(league['score'] >= promoteScore) resultClass += 1
        else if(league['score'] < demoteScore) resultClass -= 1
      }
      else if(leagueClass === 3 && league['score'] < demoteScore) resultClass -= 1

      if(BigInt(Date.now()) >= curLeague.start) leagueStatus = 1 
      if(BigInt(Date.now()) >= curLeague.end) leagueStatus = 2
      if(BigInt(Date.now()) >= curLeague.summary) {
        leagueStatus = 0
        if(!league['ended']) await DB.Upsert<LeagueWorld>(refid, {collection: 'league3', id: curLeague.id}, {$set: {ended: true, class: resultClass}})
      }
      leagueData = {
        league_class: K.ITEM("s32", (BigInt(Date.now()) >= curLeague.summary && !league['ended']) ? resultClass : league['class']),
        current: {
          league_id: K.ITEM("s32", curLeague.id),
          league_name: K.ITEM("str", Buffer.from(curLeague.name, 'utf8').toString('base64')),
          league_name_eng: K.ITEM("str", Buffer.from(curLeague.name_eng, 'utf8').toString('base64')),
          starttime: K.ITEM("u64", curLeague.start),
          endtime: K.ITEM("u64", curLeague.end),
          summarytime: K.ITEM("u64", curLeague.summary),
          league_status: K.ITEM("s32", leagueStatus),
          league_class: K.ITEM("s32", leagueClass),
          result_league_class: K.ITEM("s32", resultClass),
          rank: K.ITEM("s32", rank),
          score: K.ITEM("s32", league['score']),
          playcount: K.ITEM("s32", league['playCount']),
          advance_border: K.ITEM("s32", curLeague.advanceBorder[leagueClass - 1]),
          join_num: K.ITEM("s32", joinNum), 
          promote_rank: K.ITEM("s32", promoteRank),
          promote_score: K.ITEM("s32", promoteScore),
          demote_rank: K.ITEM("s32", demoteRank),
          demote_score: K.ITEM("s32", demoteScore),
          ranking_score: K.ITEM("s32", league['score'])
        },
        result: (BigInt(Date.now()) >= curLeague.summary && !league['ended']) ? [
          {
            league_id: K.ITEM("s32", curLeague.id),
            league_name: K.ITEM("str", Buffer.from(curLeague.name, 'utf8').toString('base64')),
            league_name_eng: K.ITEM("str", Buffer.from(curLeague.name_eng, 'utf8').toString('base64')),
            starttime: K.ITEM("u64", curLeague.start),
            endtime: K.ITEM("u64", curLeague.end),
            summarytime: K.ITEM("u64", curLeague.summary),
            league_status: K.ITEM("s32", 1),
            league_class: K.ITEM("s32", league['class']),
            result_league_class: K.ITEM("s32", resultClass),
            rank: K.ITEM("s32", rank),
            score: K.ITEM("s32", league['score']),
            playcount: K.ITEM("s32", league['playCount']),
            advance_border: K.ITEM("s32", curLeague.advanceBorder[leagueClass - 1]),
            join_num: K.ITEM("s32", joinNum), 
            promote_rank: K.ITEM("s32", promoteRank),
            promote_score: K.ITEM("s32", promoteScore),
            demote_rank: K.ITEM("s32", demoteRank),
            demote_score: K.ITEM("s32", demoteScore)
          }
        ] : []
      }
    }

    let userCustomize = []
    let customize = await DB.Find<CustomizeWorld>(refid, {collection: 'customize3'})
    customize.forEach(cus => {
      userCustomize.push({
        category: K.ITEM('s32', cus.category),
        key: K.ITEM('s32', cus.key),
        pattern: K.ITEM('s32', cus.pattern)
      })
    })

    // test
    if(IO.Exists('data/test.json')) {
      let bufTest = await IO.ReadFile('data/test.json')
      let eventTest = JSON.parse(bufTest.toString())
      for(const ex in eventTest['eventtest']) {
        eventFin.push({ event_str: K.ITEM('str', eventTest['eventtest'][ex]) })
      }
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
      event: eventFin,
      league: leagueData,
      customize: userCustomize
    });
  }
};

export const musicdataload: EPR = async (info, data, send) => {
  // I personally use the last A3 db for this, will check for missing songs
  let musicList = []
  let mdbLimName = U.GetConfig('mdb_limited')
  if(mdbLimName !== '') {
    if(IO.Exists('data/' + mdbLimName)) { 
      let mdb = U.parseXML(U.DecodeString(await IO.ReadFile('data/' + mdbLimName), "shift_jis"), false)
      for(const music of mdb['mdb']['music']) {
        let difficultyArr = $(music).numbers('diffLv')
        let limited = ($(music).number('limited')) ? $(music).number('limited') : 0
        let limitedCha = ($(music).number('limited_cha')) ? $(music).number('limited_cha') : 0
        let limitedAry = ($(music).numbers('limited_ary')) ? $(music).numbers('limited_ary') : []

        let overrideIndex = SONGS_OVERRIDE_WORLD.findIndex(s => s.mcode === $(music).number('mcode'))
        if(overrideIndex > -1) {
          limitedAry = (SONGS_OVERRIDE_WORLD[overrideIndex]['limited_ary'] !== [] ? SONGS_OVERRIDE_WORLD[overrideIndex]['limited_ary'] : limitedAry)
          difficultyArr = SONGS_OVERRIDE_WORLD[overrideIndex]['diffLv']
        }
        
        for(const [index, diff] of difficultyArr.entries()) {
          limited = ((index % 5 === 4) && limitedCha) ? limitedCha : limited
          limited = (limitedAry.length > 0) ? limitedAry[index] : limited
          
          if($(music).number('series') === 20 && overrideIndex === -1) {
            limited = 0
            for(const ls in LOCKED_SONGS) {
              if(index % 5 < 4) {
                if(LOCKED_SONGS[ls].ids.includes($(music).number('mcode')) && BigInt(Date.now()) < LOCKED_SONGS[ls].unlock_date) {
                  limited = 1
                  break
                }
              } else if(index % 5 === 4) {
                if(LOCKED_SONGS[ls].ids_cha.includes($(music).number('mcode')) && BigInt(Date.now()) < LOCKED_SONGS[ls].unlock_date) {
                  limited = 1
                  break
                }
              }
            }
          }
          
          musicList.push({
            music_str: K.ITEM('str', $(music).number('mcode') + ',' + ((index > 4) ? '1,' : '0,') + (index % 5) + ',' + (U.GetConfig('song_unlock') && limited != -1 ? '0' : limited) + ',' + diff)
          })
        }
      }
    }
  }

  for(const music of SONGS_WORLD) {
    for(const [index, diff] of music.diffLv.entries()) {
      if(music.limited_ary[index] != -1) {
        musicList.push({
          music_str: K.ITEM('str', music.mcode + ',' + ((index > 4) ? '1,' : '0,') + (index % 5) + ',' + (U.GetConfig('song_unlock') && music.limited_ary[index] != -1 ? '0' : music.limited_ary[index]) + ',' + diff)
        })
      }
    }
  }
  // test
  if(IO.Exists('data/test.json')) {
    let bufTest = await IO.ReadFile('data/test.json')
    let eventTest = JSON.parse(bufTest.toString())
    for(const ex in eventTest['songstest']) {
      for(const [index, diff] of eventTest['songstest'][ex].diffLv.entries()) {
        if(eventTest['songstest'][ex].limited_ary[index] != -1) {
          musicList.push({
            music_str: K.ITEM('str', eventTest['songstest'][ex].mcode + ',' + ((index > 4) ? '1,' : '0,') + (index % 5) + ',' + eventTest['songstest'][ex].limited_ary[index] + ',' + diff)
          })
        }
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
  const ddrCode = $(data).number("data.ddrcode");
  const loadKind = $(data).number("data.loadkind");
  const country = $(data).str("data.country");
  const region = $(data).str("data.region");
  const customerCode = $(data).str("data.customercode");
  const companyCode = $(data).str("data.companycode");
  const locationId = $(data).str("data.locationid");
  const pcbid = $(data).str("data.pcbid");

  // song id, style, difficulty, idk, dancername, idk, idk, scoredisp, score, ghost
  let record = []
  let hiscore: any
  if(ddrCode === 0) {
    if(loadKind === 1) {
      hiscore = await DB.Find<HiScoreWorld>(null, {collection: 'hiscore3', slot: loadKind})
    } else if(loadKind === 2) {
      hiscore = await DB.Find<HiScoreWorld>(null, {collection: 'hiscore3', slot: loadKind, locationId: locationId})
    } else if(loadKind === 3) {
      hiscore = await DB.Find<HiScoreWorld>(null, {collection: 'hiscore3', slot: loadKind, locationId: locationId, pcbid: pcbid})
    }
    for(const hsi in hiscore) {
      record.push({
        record_str: K.ITEM('str', hiscore[hsi].songId + ',' + hiscore[hsi].style + ',' + hiscore[hsi].difficulty + ',0,' + hiscore[hsi].dancerName + ',0,0,1,' + hiscore[hsi].score + ',' + hiscore[hsi].ghostId)
      })
    }
  }
  return send.object({
    result: K.ITEM("s32", 0),
    record: record
  })
};

export const ghostdataload: EPR = async (info, data, send) => {
  const refid = $(data).str("data.refid");
  const ghostId = $(data).number("data.ghostid");
  let ghostData = await DB.FindOne<GhostWorld>(null, {collection: 'ghost3', ghostId: ghostId})
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
  return send.object({ result: K.ITEM('s32', 0) })
};

function getDate(): number {
  let time = new Date();
  let tempDate = time.getDate();
  const currentTime = parseInt((time.getTime()/100000) as unknown as string)*100;
  return currentTime
}
