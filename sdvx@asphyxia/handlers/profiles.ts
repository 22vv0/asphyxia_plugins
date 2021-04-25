import {Skill} from '../models/skill';
import {SDVX_AUTOMATION_SONGS} from '../data/vvw';
import {Item} from '../models/item';
import {Param} from '../models/param';
import {MusicRecord} from '../models/music_record';
import {CourseRecord} from '../models/course_record';
import {Profile} from '../models/profile';
import {getVersion, IDToCode} from '../utils';
import {Mix} from '../models/mix';

async function getAutomationMixes(params: Param[]) {
  const mixids = params
    .filter(p => p.id == 3)
    .reduce((res, p) => _.union(res, p.param), []);
  return await DB.Find<Mix>({ collection: 'mix', id: { $in: mixids } });
}

function unlockNavigators(items: Partial<Item>[]) {
  for (let i = 0; i < 300; ++i) items.push({ type: 11, id: i, param: 15 });

  // 10 genesis card for MITSURU's voice
  items.push({ type: 4, id: 599, param: 10 });
  return items;
}

export const loadScore: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).attr().dataid);
  if (!refid) return send.deny();

  const records = await DB.Find<MusicRecord>(refid, { collection: 'music' });

  const version = getVersion(info);

  if (version === 1) {
    return send.object({
      music: records.map(r => (K.ATTR({ music_id: String(r.mid) }, {
        type: (() => {
          const records = [];

          for (let i = 1; i <= 3; i++) {
            if (r.type != i) continue;
            records.push(K.ATTR({
              type_id: String(i),
              score: String(r.score),
              clear_type: String(r.clear),
              score_grade: String(r.grade),
              cnt: "0"
            }));
          }

          return records;
        })()
      })))
    });
  }

  return send.object({
    music: {
      info: records.map(r => ({
        param: K.ARRAY('u32', [
          r.mid,
          r.type,
          r.score,
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
        ]),
      })),
    },
  });
};

export const saveScore: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).attr().dataid);
  if (!refid) return send.deny();

  const version = getVersion(info);

  // Booth - Save score
  if (version === 1) {
    try {
      const mid = parseInt($(data).attr().music_id);
      const type = parseInt($(data).attr().music_type);

      if (_.isNil(mid) || _.isNil(type)) return send.deny();

      const record = (await DB.FindOne<MusicRecord>(refid, {
        collection: 'music',
        mid,
        type,
      })) || {
        collection: 'music',
        mid,
        type,
        score: 0,
        clear: 0,
        grade: 0,
        buttonRate: 0,
        longRate: 0,
        volRate: 0,
      };

      const score = $(data).attr().score ? parseInt($(data).attr().score) : 0;
      const clear = $(data).attr().clear_type ? parseInt($(data).attr().clear_type) : 0;
      const grade = $(data).attr().score_grade ? parseInt($(data).attr().score_grade) : 0;
      if (score > record.score) {
        record.score = score;
      }

      record.clear = Math.max(clear, record.clear);
      record.grade = Math.max(grade, record.grade);

      await DB.Upsert<MusicRecord>(
        refid,
        { collection: 'music', mid, type },
        record
      );

      return send.success();
    } catch {
      return send.deny();
    }
  }

  const mid = $(data).number('music_id');
  const type = $(data).number('music_type');

  if (_.isNil(mid) || _.isNil(type)) return send.deny();

  const record = (await DB.FindOne<MusicRecord>(refid, {
    collection: 'music',
    mid,
    type,
  })) || {
    collection: 'music',
    mid,
    type,
    score: 0,
    clear: 0,
    grade: 0,
    buttonRate: 0,
    longRate: 0,
    volRate: 0,
  };

  const score = $(data).number('score', 0);
  if (score > record.score) {
    record.score = score;
    record.buttonRate = $(data).number('btn_rate', 0);
    record.longRate = $(data).number('long_rate', 0);
    record.volRate = $(data).number('vol_rate', 0);
  }

  record.clear = Math.max($(data).number('clear_type', 0), record.clear);
  record.grade = Math.max($(data).number('score_grade', 0), record.grade);

  await DB.Upsert<MusicRecord>(
    refid,
    { collection: 'music', mid, type },
    record
  );

  return send.success();
};

export const saveCourse: EPR = async (info, data, send) => {
  const refid = $(data).str('refid');
  if (!refid) return send.deny();

  const version = getVersion(info);
  if (version == 0) return send.deny();

  const sid = $(data).number('ssnid');
  const cid = $(data).number('crsid');

  if (_.isNil(sid) || _.isNil(cid)) return send.deny();

  await DB.Upsert<CourseRecord>(
    refid,
    { collection: 'course', sid, cid, version },
    {
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

  const version = getVersion(info);
  if (version == 0) return send.deny();

  if (version === 1) {
    try {
      // Save Profile
      await DB.Update<Profile>(
        refid,
        { collection: 'profile' },
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
          },
          $inc: {
            expPoint: $(data).number('gain_exp'),
            packets: $(data).number('earned_gamecoin_packet'),
            blocks: $(data).number('earned_gamecoin_block'),
          },
        }
      );

      return send.success();
    } catch {
      return send.deny();
    }
  }

  // Save Profile
  await DB.Update<Profile>(
    refid,
    { collection: 'profile' },
    {
      $set: {
        appeal: $(data).number('appeal_id'),

        musicID: $(data).number('music_id'),
        musicType: $(data).number('music_type'),
        sortType: $(data).number('sort_type'),
        headphone: $(data).number('headphone'),
        blasterCount: $(data).number('blaster_count'),

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
      },
    }
  );

  // Save Items
  const items = $(data).elements('item.info');

  for (const i of items) {
    const type = i.number('type');
    const id = i.number('id');
    const param = i.number('param');

    if (_.isNil(type) || _.isNil(id) || _.isNil(param)) continue;

    await DB.Upsert<Item>(
      refid,
      { collection: 'item', type, id },
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
      { collection: 'param', type, id },
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
      },
    }
  );

  return send.success();
};

export const load: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).attr().dataid);
  if (!refid) return send.deny();

  const version = getVersion(info);
  if (version == 0) return send.deny();

  const profile = await DB.FindOne<Profile>(refid, {
    collection: 'profile',
  });

  if (!profile) {
    if (version === 1) return send.object(K.ATTR({ none: "1" }));
    return send.object({ result: K.ITEM('u8', 1) });
  }

  let skill = (await DB.FindOne<Skill>(refid, {
    collection: 'skill',
    version,
  })) || { base: 0, name: 0, level: 0 };

  const courses = await DB.Find<CourseRecord>(refid, { collection: 'course' });
  const items = await DB.Find<Item>(refid, { collection: 'item' });
  const params = await DB.Find<Param>(refid, { collection: 'param' });
  let time = new Date();
  let tempHour = time.getHours();
  let tempDate = time.getDate();
  tempHour += 12;
  tempDate += 1;
  time.setDate(tempDate);
  time.setHours(tempHour);
  const currentTime = time.getTime();
  const mixes = version == 5 ? await getAutomationMixes(params) : [];

  if (version === 1) {
    return send.pugFile('templates/booth/load.pug', { code: IDToCode(profile.id), ...profile });
  }

  return send.pugFile('templates/load.pug', {
    courses,
    items: U.GetConfig('unlock_all_navigators')
      ? unlockNavigators(items)
      : items,
    params,
    skill,
    currentTime,
    mixes,
    automation: version == 5 ? SDVX_AUTOMATION_SONGS : [],
    code: IDToCode(profile.id),
    ...profile,
  });
};

export const create: EPR = async (info, data, send) => {
  const refid = $(data).str('refid', $(data).attr().refid);
  if (!refid) return send.deny();

  const name = $(data).str('name', $(data).attr().name ? $(data).attr().name : 'GUEST');
  let id = _.random(0, 99999999);
  while (await DB.FindOne<Profile>(null, { collecttion: 'profile', id })) {
    id = _.random(0, 99999999);
  }

  const profile: Profile = {
    pluginVer: 1,

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
    blasterCount: 0,
    blasterEnergy: 0,
    headphone: 0,
    musicID: 0,
    musicType: 0,
    sortType: 0,
    expPoint: 0,
    mUserCnt: 0,
    boothFrame: [0, 0, 0, 0, 0]
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
