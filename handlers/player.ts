import { Option, Config, Score, Profile, CharaParam, Customize } from "../models/models"

export const pnew: EPR = async (info, data, send) => {
    console.log('player24.new')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    let refid = $(data).str('ref_id')
    let profileId = String(_.random(0, 999999999999)).padStart(12, '0');
    while (await DB.FindOne<Profile>(null, { collection: 'profile', profileId: profileId })) {
        profileId = String(_.random(0, 999999999999)).padStart(12, '0');
    }

    // cleanup later
    await DB.Upsert(refid, {collection: 'profile'}, {$set: {
        profileId: profileId,
        name: $(data).str('name'),
        tutorial: 0,
        areaId: 0,
        useNavi: 0,
        readNews: 0,
        staff: 0,
        itemType: 0,
        itemId: 0,
        isConv: 0,
        activeFriends: 0,
        totalPlayCount: 1,
        todayPlayCount: 1,
        consecutiveDays: 1,
        totalDays: 1,
        intervalDay: 0,
        myBest: 0,
        latestMusic: [0],
        nice: [0],
        favoriteChara: [0],
        specialArea: [0],
        chocolateCharalist: [0],
        chocolateSPChara: 0,
        chocolatePassCnt: 0,
        chocolateHonCnt: 0,
        chocolateGiriCnt: 0,
        chocolateKokyuCnt: 0,
        teacherSetting: [0],
        licenseData: [0],
        welcomePack: false,
        rankingNode: 0,
        charaRankingKindId: 0,
        naviEvolutionFlg: 0,
        rankingNewsLastNo: 0,
        powerPoint: 0,
        playerPoint: 0,
        powerPointList: [0],
        spRiddlesId: 0,
        optionTuto: false,
        extraPlay: 0
    }})

    send.object({
        account: {
            g_pm_id: K.ITEM('str', profileId),
            name: K.ITEM('str', $(data).str('name')),
            tutorial: K.ITEM('s16', 0),
            area_id: K.ITEM('s16', 0),
            use_navi: K.ITEM('s16', 0),
            read_news: K.ITEM('s16', 0),
            staff: K.ITEM('s8', 0),
            item_type: K.ITEM('s16', 0),
            item_id: K.ITEM('s16', 0),
            is_conv: K.ITEM('s8', 0),
            active_fr_num: K.ITEM('u8', 0),
            total_play_cnt: K.ITEM('s16', 0),
            today_play_cnt: K.ITEM('s16', 0),
            consecutive_days: K.ITEM('s16', 0),
            total_days: K.ITEM('s16', 0),
            interval_day: K.ITEM('s16', 0),
            my_best: K.ITEM('s16', 0),
            latest_music: K.ARRAY('s16', [0]),
            nice: K.ARRAY('s16', [0]),
            favorite_chara: K.ARRAY('s16', [0]),
            special_area: K.ARRAY('s16', [0]),
            chocolate_charalist: K.ARRAY('s16', [0]),
            chocolate_sp_chara: K.ITEM('s32', 0),
            chocolate_pass_cnt: K.ITEM('s32', 0),
            chocolate_hon_cnt: K.ITEM('s32', 0),
            chocolate_giri_cnt: K.ITEM('s32', 0),
            chocolate_kokyu_cnt: K.ITEM('s32', 0),
            teacher_setting: K.ARRAY('s16', [0]),
            license_data: K.ARRAY('s16', [0]),
            welcom_pack: K.ITEM('bool', false),
            ranking_node: K.ITEM('s32', 0),
            chara_ranking_kind_id: K.ITEM('s32', 0),
            navi_evolution_flg: K.ITEM('s8', 0),
            ranking_news_last_no: K.ITEM('s32', 0),
            power_point: K.ITEM('s32', 0),
            player_point: K.ITEM('s32', 0),
            power_point_list: K.ARRAY('s32', [0]),
            sp_riddles_id: K.ITEM('s16', 0),
            option_tuto: K.ITEM('bool', false)
        },
        eaappli: {
            relation: K.ITEM('s8', -1),
        },
        info: {
            ep: K.ITEM('u16', 0)
        },
        config: {
            mode: K.ITEM('u8', 0),
            chara: K.ITEM('s16', 0),
            music: K.ITEM('s16', 0),
            sheet: K.ITEM('u8', 0),
            category: K.ITEM('s8', 0),
            sub_category: K.ITEM('s8', 0),
            chara_category: K.ITEM('s8', 0),
            course_id: K.ITEM('s16', 0),
            course_folder: K.ITEM('s8', 0),
            ms_banner_disp: K.ITEM('s8', 0),
            ms_down_info: K.ITEM('s8', 0),
            ms_side_info: K.ITEM('s8', 0),
            ms_raise_type: K.ITEM('s8', 0),
            ms_rnd_type: K.ITEM('s8', 0),
            banner_sort: K.ITEM('s8', 0),
        },
        option: {
            hispeed: K.ITEM('s16', 0),
            popkun: K.ITEM('u8', 0),
            hidden: K.ITEM('bool', false),
            hidden_rate: K.ITEM('s16', 0),
            sudden: K.ITEM('bool', false),
            sudden_rate: K.ITEM('s16', 0),
            randmir: K.ITEM('s8', 0),
            gauge_type: K.ITEM('s8', 0),
            ojama_0: K.ITEM('u8', 0),
            ojama_1: K.ITEM('u8', 0),
            forever_0: K.ITEM('bool', false),
            forever_1: K.ITEM('bool', false),
            full_setting: K.ITEM('bool', false),
            guide_se: K.ITEM('s8', 0),
            judge: K.ITEM('u8', 0),
            lift: K.ITEM('bool', false),
            lift_rate: K.ITEM('s16', 0),
        },
        custom_cate: {
            valid: K.ITEM('s8', 0),
            lv_min: K.ITEM('s8', -1),
            lv_max: K.ITEM('s8', -1),
            medal_min: K.ITEM('s8', -1),
            medal_max: K.ITEM('s8', -1),
            friend_no: K.ITEM('s8', -1),
            score_flg: K.ITEM('s8', -1),
            chara_ranking: K.ITEM('s8', -1),
            area: K.ITEM('s8', -1),
        },
        item: [],
        music: [],
        netvs: {
            set_recommend: K.ARRAY('s8', [0])
        },
    })
};

export const read: EPR = async (info, data, send) => {
    console.log('player24.read')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    let refid = $(data).str('ref_id')
    let profile = await DB.FindOne<Profile>(refid, {collection: 'profile'})
    let config = await DB.FindOne<Config>(refid, {collection: 'config'})
    let option = await DB.FindOne<Option>(refid, {collection: 'option', musicNum: 0, sheetNum: 0})
    let charaParam = await DB.Find<CharaParam>(refid, {collection: 'charaparam'})
    let customize = await DB.FindOne<Customize>(refid, {collection: 'customize'})

    send.object({
        account: {
            g_pm_id: K.ITEM('str', profile.profileId),
            name: K.ITEM('str', profile.name),
            tutorial: K.ITEM('s16', profile.tutorial),
            area_id: K.ITEM('s16', profile.areaId),
            use_navi: K.ITEM('s16', profile.useNavi),
            read_news: K.ITEM('s16', profile.readNews),
            staff: K.ITEM('s8', profile.staff),
            item_type: K.ITEM('s16', profile.itemType),
            item_id: K.ITEM('s16', profile.itemId),
            is_conv: K.ITEM('s8', profile.isConv),
            active_fr_num: K.ITEM('u8', profile.activeFriends),
            total_play_cnt: K.ITEM('s16', profile.totalPlayCount),
            today_play_cnt: K.ITEM('s16', profile.todayPlayCount),
            consecutive_days: K.ITEM('s16', profile.consecutiveDays),
            total_days: K.ITEM('s16', profile.totalDays),
            interval_day: K.ITEM('s16', profile.intervalDay),
            my_best: K.ITEM('s16', profile.myBest),
            latest_music: K.ARRAY('s16', profile.latestMusic),
            nice: K.ARRAY('s16', profile.nice),
            favorite_chara: K.ARRAY('s16', profile.favoriteChara),
            special_area: K.ARRAY('s16', profile.specialArea),
            chocolate_charalist: K.ARRAY('s16', profile.chocolateCharalist),
            chocolate_sp_chara: K.ITEM('s32', profile.chocolateSPChara),
            chocolate_pass_cnt: K.ITEM('s32', profile.chocolatePassCnt),
            chocolate_hon_cnt: K.ITEM('s32', profile.chocolateHonCnt),
            chocolate_giri_cnt: K.ITEM('s32', profile.chocolateGiriCnt),
            chocolate_kokyu_cnt: K.ITEM('s32', profile.chocolateKokyuCnt),
            teacher_setting: K.ARRAY('s16', profile.teacherSetting),
            license_data: K.ARRAY('s16', profile.licenseData),
            welcom_pack: K.ITEM('bool', profile.welcomePack),
            ranking_node: K.ITEM('s32', profile.rankingNode),
            chara_ranking_kind_id: K.ITEM('s32', profile.charaRankingKindId),
            navi_evolution_flg: K.ITEM('s8', profile.naviEvolutionFlg),
            ranking_news_last_no: K.ITEM('s32', profile.rankingNewsLastNo),
            power_point: K.ITEM('s32', profile.powerPoint),
            player_point: K.ITEM('s32', profile.playerPoint),
            power_point_list: K.ARRAY('s32', profile.powerPointList),
            sp_riddles_id: K.ITEM('s16', profile.spRiddlesId),
            option_tuto: K.ITEM('bool', profile.optionTuto)
        },
        eaappli: {
            relation: K.ITEM('s8', -1),
        },
        info: {
            ep: K.ITEM('u16', 5)
        },
        config: {
            mode: K.ITEM('u8', config.mode),
            chara: K.ITEM('s16', config.chara),
            music: K.ITEM('s16', config.music),
            sheet: K.ITEM('u8', config.sheet),
            category: K.ITEM('s8', config.category),
            sub_category: K.ITEM('s8', config.subCategory),
            chara_category: K.ITEM('s8', config.charaCategory),
            course_id: K.ITEM('s16', config.courseId),
            course_folder: K.ITEM('s8', config.courseFolder),
            ms_banner_disp: K.ITEM('s8', config.msBannerDisp),
            ms_down_info: K.ITEM('s8', config.msDownInfo),
            ms_side_info: K.ITEM('s8', config.msSideInfo),
            ms_raise_type: K.ITEM('s8', config.msRaiseType),
            ms_rnd_type: K.ITEM('s8', config.msRndType),
            banner_sort: K.ITEM('s8', config.bannerSort),
        },
        option: {
            hispeed: K.ITEM('s16', option.hispeed),
            popkun: K.ITEM('u8', option.popkun),
            hidden: K.ITEM('bool', option.hidden),
            hidden_rate: K.ITEM('s16', option.hiddenRate),
            sudden: K.ITEM('bool', option.sudden),
            sudden_rate: K.ITEM('s16', option.suddenRate),
            randmir: K.ITEM('s8', option.randMir),
            gauge_type: K.ITEM('s8', option.gaugeType),
            ojama_0: K.ITEM('u8', option.ojama1),
            ojama_1: K.ITEM('u8', option.ojama2),
            forever_0: K.ITEM('bool', option.forever1),
            forever_1: K.ITEM('bool', option.forever2),
            full_setting: K.ITEM('bool', option.fullSetting),
            guide_se: K.ITEM('s8', option.guideSE),
            judge: K.ITEM('u8', option.judge),
            lift: K.ITEM('bool', option.lift),
            lift_rate: K.ITEM('s16', option.liftRate),
        },
        custom_cate: {
            valid: K.ITEM('s8', 0),
            lv_min: K.ITEM('s8', -1),
            lv_max: K.ITEM('s8', -1),
            medal_min: K.ITEM('s8', -1),
            medal_max: K.ITEM('s8', -1),
            friend_no: K.ITEM('s8', -1),
            score_flg: K.ITEM('s8', -1),
            chara_ranking: K.ITEM('s8', -1),
            area: K.ITEM('s8', -1),
        },
        // item: [
        //     {
        //         type: K.ITEM('u8', 1),
        //         id: K.ITEM('u16', 1),
        //         param: K.ITEM('u16', 0),
        //         is_new: K.ITEM('bool', false),
        //         get_time: K.ITEM('u64', BigInt(Date.parse('09 Jun 2025 23:59:59 GMT')))
        //     }
        // ],
        chara_param: charaParam.map(ch => ({
            chara_id: K.ITEM('u16', ch.charaId),
            friendship: K.ITEM('u16', ch.friendship)
        })),
        customize: {
            effect_left: K.ITEM('u16', customize.effectLeft),
            effect_center: K.ITEM('u16', customize.effectCenter),
            effect_right: K.ITEM('u16', customize.effectRight),
            hukidashi: K.ITEM('u16', customize.hukidashi),
            comment_1: K.ITEM('u16', customize.comment1),
            comment_2: K.ITEM('u16', customize.comment2)
        },
        netvs: {
            set_recommend: K.ARRAY('s8', [0])
        },
    })
}

export const start: EPR = async (info, data, send) => {
    console.log('player24.start')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    send.success()
}

export const readOption: EPR = async (info, data, send) => {
    console.log('player24.read_option')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    let refid = $(data).str('ref_id')
    let musicNum = $(data).number('music_num')
    let sheetNum = $(data).number('sheet_num')
    let option = await DB.FindOne<Option>(refid, {collection: 'option', musicNum: musicNum, sheetNum: sheetNum})

    if(option === null) return send.success()

    send.object({
        option: {
            hispeed: K.ITEM('s16', option.hispeed),
            popkun: K.ITEM('u8', option.popkun),
            hidden: K.ITEM('bool', option.hidden),
            hidden_rate: K.ITEM('s16', option.hiddenRate),
            sudden: K.ITEM('bool', option.sudden),
            sudden_rate: K.ITEM('s16', option.suddenRate), 
            randmir: K.ITEM('s8', option.randMir),
            gauge_type: K.ITEM('s8', option.gaugeType), 
            ojama_0: K.ITEM('u8', option.ojama1), 
            ojama_1: K.ITEM('u8', option.ojama2), 
            forever_0: K.ITEM('bool', option.forever1),
            forever_1: K.ITEM('bool', option.forever2),
            full_setting: K.ITEM('bool', option.fullSetting),
            judge: K.ITEM('u8', option.judge),
            guide_se: K.ITEM('s8', option.guideSE),
            guide_se_vol: K.ITEM('u8', option.guideSEVolume), 
            lift: K.ITEM('bool', option.lift),
            lift_rate: K.ITEM('s16', option.liftRate)
        }
    })
}

export const readScore: EPR = async (info, data, send) => {
    console.log('player24.read_score')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    let refid = $(data).str('ref_id')
    let scores = await DB.Find<Score>(refid, {collection: 'score'})
    let musicScores = []
    for(let s of scores) {
        musicScores.push({
            music_num: K.ITEM('s16', s.musicNum),
            sheet_num: K.ITEM('u8', s.sheetNum),
            score: K.ITEM('s32', s.score),
            clear_type: K.ITEM('u8', s.clearType),
            clear_rank: K.ITEM('u8', s.clearRank),
            cnt: K.ITEM('s16', 1),
        })
    }
    send.object({
        music: musicScores,
    })
}

export const writeMusic: EPR = async (info, data, send) => {
    let refid = $(data).str('ref_id')
    let saveOption = $(data).bool('is_option_save')
    let musicNum = $(data).number('music_num')
    let sheetNum = $(data).number('sheet_num')
    let recordScore = await DB.FindOne<Score>(refid, {collection: 'score', musicNum: musicNum, sheetNum: sheetNum})
    let scoreData = {
        clearType: (recordScore === null || $(data).number('clear_type') >= recordScore.clearType) ? $(data).number('clear_type') : recordScore.clearRank,
        clearRank: (recordScore === null || $(data).number('clear_rank') >= recordScore.clearRank) ? $(data).number('clear_rank') : recordScore.clearRank,
        score: (recordScore === null || $(data).number('score') >= recordScore.score) ? $(data).number('score') : recordScore.score
        // cool: $(data).number('cool'),
        // great: $(data).number('great'),
        // good: $(data).number('good'),
        // bad: $(data).number('bad'),
        // combo: $(data).number('combo'),
        // gauge: $(data).number('gauge'),
    }
    let optionData = {
        hispeed: $(data).number('hispeed'),
        popkun: $(data).number('popkun'),
        hidden: $(data).bool('hidden'),
        hiddenRate: $(data).number('hidden_rate'),
        sudden: $(data).bool('sudden'),
        suddenRate: $(data).number('sudden_rate'),
        randMir: $(data).number('randmir'),
        gaugeType: $(data).number('gauge_type'),
        ojama1: $(data).number('ojama_0'),
        ojama2: $(data).number('ojama_1'),
        forever1: $(data).bool('forever_0'),
        forever2: $(data).bool('forever_1'),
        fullSetting: $(data).bool('full_setting'),
        judge: $(data).number('judge'),
        guideSE: $(data).number('guide_se'),
        guideSEVolume: $(data).number('guide_se_vol'),
        lift: $(data).bool('lift'),
        liftRate: $(data).number('lift_rate')
    }

    if(saveOption) {
        await DB.Upsert(refid, {collection: 'option', musicNum: musicNum, sheetNum: sheetNum}, {$set: optionData})
    }
    await DB.Upsert(refid, {collection: 'score', musicNum: musicNum, sheetNum: sheetNum}, {$set: scoreData})
    send.success()
}

export const write: EPR = async (info, data, send) => {
    console.log('player24.write')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    let refid = $(data).str('ref_id')
    let profile = await DB.FindOne<Profile>(refid, {collection: 'profile'})    
    let date = new Date()
    let currentDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    let profileDate = [profile['updatedAt'].getFullYear(), profile['updatedAt'].getMonth() + 1, profile['updatedAt'].getDate()]
    
    let account = {
        tutorial: $(data).number('account.tutorial'),
        readNews: $(data).number('account.read_news'),
        areaId: $(data).number('account.area_id'),
        useNavi: $(data).number('account.use_navi'),
        nice: $(data).numbers('account.nice'),
        favoriteChara: $(data).numbers('account.favorite_chara'),
        chocolateCharalist: $(data).numbers('account.chocolate_charalist'),
        chocolatePassCnt: $(data).number('account.chocolate_pass_cnt'),
        chocolateSPChara: $(data).number('account.chocolate_sp_chara'),
        chocolateHonCnt: $(data).number('account.chocolate_hon_cnt'),
        chocolateGiriCnt: $(data).number('account.chocolate_giri_cnt'),
        chocolateKokyuCnt: $(data).number('account.chocolate_kokyu_cnt'),
        naviEvolutionFlg: $(data).number('account.navi_evolution_flg'),
        rankingNewsLastNo: $(data).number('account.ranking_news_last_no'),
        powerPoint: $(data).number('account.power_point'),
        playerPoint: $(data).number('account.player_point'),
        powerPointList: $(data).numbers('account.power_point_list'),
        spRiddlesId: $(data).number('account.sp_riddles_id'),
        extraPlay: $(data).number('info.ep')
    }

    let sameYear = profileDate[0] === currentDate[0]
    let sameMonth = sameYear && profileDate[1] === currentDate[1]
    let sameDay = sameYear && sameMonth && profileDate[2] === currentDate [2]
    let previousDay = profile.consecutiveDays === 0 || (sameYear && sameMonth && profileDate[2] === currentDate[2] - 1)
    let differentDay = profile.totalDays === 0 || (sameYear && sameMonth && profileDate[2] !== currentDate[2])
    let accountPlayCount = {
        totalPlayCount: 1,
        todayPlayCount: (sameDay) ? 1 : -(profile.todayPlayCount) + 1,
        consecutiveDays: (previousDay) ? 1 : (sameDay) ? 0 : -(profile.consecutiveDays) + 1,
        totalDays: (differentDay) ? 1 : 0,
        intervalDay: Number(BigInt(-(profile.intervalDay)) + (BigInt(date) - BigInt(profile['updatedAt'])) / (24n * 60n * 60n * 1000n))
    }
    await DB.Upsert(refid, {collection: 'profile'}, {$set: account})
    await DB.Upsert(refid, {collection: 'profile'}, {$inc: accountPlayCount})

    let config = {
        mode: $(data).number('config.mode'),
        chara: $(data).number('config.chara'),
        music: $(data).number('config.music'),
        sheet: $(data).number('config.sheet'),
        category: $(data).number('config.category'),
        subCategory: $(data).number('config.sub_category'),
        charaCategory: $(data).number('config.chara_category'),
        courseId: $(data).number('config.course_id'),
        courseFolder: $(data).number('config.course_folder'),
        msBannerDisp: $(data).number('config.ms_banner_disp'),
        msDownInfo: $(data).number('config.ms_down_info'),
        msSideInfo: $(data).number('config.ms_side_info'),
        msRaiseType: $(data).number('config.ms_raise_type'),
        msRndType: $(data).number('config.ms_rnd_type'),
        bannerSort: $(data).number('config.banner_sort')
    }
    await DB.Upsert(refid, {collection: 'config'}, {$set: config})

    let option = {
        hispeed: $(data).number('option.hispeed'),
        popkun: $(data).number('option.popkun'),
        hidden: $(data).bool('option.hidden'),
        hiddenRate: $(data).number('option.hidden_rate'),
        sudden: $(data).bool('option.sudden'),
        suddenRate: $(data).number('option.sudden_rate'),
        randMir: $(data).number('option.randmir'),
        gaugeType: $(data).number('option.gauge_type'),
        ojama1: $(data).number('option.ojama_0'),
        ojama2: $(data).number('option.ojama_1'),
        forever1: $(data).bool('option.forever_0'),
        forever2: $(data).bool('option.forever_1'),
        fullSetting: $(data).bool('option.full_setting'),
        judge: $(data).number('option.judge'),
        guideSE: $(data).number('option.guide_se'),
        guideSEVolume: $(data).number('option.guide_se_vol'),
        lift: $(data).bool('option.lift'),
        liftRate: $(data).number('option.lift_rate')
    }
    await DB.Upsert(refid, {collection: 'option', musicNum: 0, sheetNum: 0}, {$set: option})

    let charaParam = $(data).elements('chara_param')
    for(let ch of charaParam) {
        await DB.Upsert(refid, {collection: 'charaparam', charaId: ch.number('chara_id')}, {$set: {friendship: ch.number('friendship')}})
    }

    let customize = {
        effectLeft: $(data).number('customize.effect_left'),
        effectCenter: $(data).number('customize.effect_center'),
        effectRight: $(data).number('customize.effect_right'),
        hukidashi: $(data).number('customize.hukidashi'),
        comment1: $(data).number('customize.comment_1'),
        comment2: $(data).number('customize.comment_2')
    }
    await DB.Upsert(refid, {collection: 'customize'}, {$set: customize})

    send.success()
}

export const logout: EPR = async (info, data, send) => {
    console.log('player24.logout')
    console.log(JSON.stringify($(info)))
    console.log(JSON.stringify($(data)))
    console.log('')
    send.success()
}
