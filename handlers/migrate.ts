import { HAVE_NOTE } from "../data/ii"
import { COURSES6, MEGAMIX_SONGS, MEGAMIX_SONGS_2, MEGAMIX_SONGS_3, MEGAMIX_SONGS_4 } from "../data/exg"
import { VariantPower } from "../models/variant"
import { Profile } from "../models/profile"
import { Arena } from "../models/arena"
import { MusicRecord } from "../models/music_record"
import { CourseRecord } from "../models/course_record"
import { computeForce } from "../utils"
import { Item } from '../models/item'
import { Param } from '../models/param'
import { Rival } from '../models/rival'
import { Skill } from '../models/skill'
import { WeeklyMusicScore } from '../models/weeklymusic'

export const DB_VER = 1
const dev = false

export async function dataUpdate() {
	if(dev) {
		console.log(MEGAMIX_SONGS.join(',').length + " " + MEGAMIX_SONGS_2.join(',').length + " " + MEGAMIX_SONGS_3.join(',').length + " " + MEGAMIX_SONGS_4.join(',').length)
		let mergeMega = MEGAMIX_SONGS.concat(MEGAMIX_SONGS_2, MEGAMIX_SONGS_3, MEGAMIX_SONGS_4)
		let newSongs = []
		let megamixFiles = (await IO.ReadDir(U.GetConfig('sdvx_eg_root_dir') + "/data/sound/automa/waves/")).filter(file => file.name.includes("wave_info_megamix")).filter(file => file.name.includes('.xml'))
		for (const file of megamixFiles) {
			let megamixSongs = U.parseXML(U.DecodeString(await IO.ReadFile(U.GetConfig('sdvx_eg_root_dir') + "/data/sound/automa/waves/" + file.name), "shift_jis"), false)
			for (const m of megamixSongs.wave_info.mdb.music) {
				let mid = parseInt(m.meta.music_id['@content'])
				if(!mergeMega.includes(mid) && !newSongs.includes(mid)) {
					console.log(file.name + ": new song - " + mid)
					newSongs.push(mid)
				}
			}
		}
	}

	await updateSkillCourseIds()
	await updateDB()
}

async function updateSkillCourseIds() {
	// old skill analyzer migrate code
	let courseData = await DB.Find(null, {collection: 'course', dbver: {$exists: false}})
	let skillData 
	courseData.forEach(async course => {
		skillData = COURSES6.find(sd => sd.id === course['sid'])
		if(skillData && 'courses' in skillData) {
			let courseIndex = skillData['courses'].findIndex(cd => parseInt('' + skillData.id + cd.id) === course['cid'])
			if(courseIndex === -1) {
				console.log("old: (" + course['__refid'] + ") updating cid " + course['cid'] + " -> " + parseInt('' + skillData.id + course['cid']))
				await DB.Upsert(course['__refid'], {collection: 'course', sid: course['sid'], cid: course['cid']}, {
					$set: {
						cid: parseInt('' + skillData.id + course['cid'])
					}
				})
			}
		}
	})
}

async function updateDB() {
	// update collections

	// dbver 1
	let varPower = await DB.Find<VariantPower>(null, {collection: 'variantpower', $or: [{dbver: 1}, {dbver: {$exists: false}}]})
	varPower.forEach(async vp => {
		await DB.Upsert<VariantPower>(vp['__refid'], {collection: 'variantpower'}, {
			$set: {
				overRadar: (!vp['overRadar']) ? [] : vp['overRadar'],
				dbver: 1
			}
		})
	})

	let profiles = await DB.Find<Profile>(null, {collection: 'profile', dbver: {$exists: false}})
	profiles.forEach(async profile => {
		await DB.Update<Profile>(profile['__refid'], {collection: 'profile'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<Arena>(profile['__refid'], {collection: 'arena'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<MusicRecord>(profile['__refid'], {collection: 'music'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<CourseRecord>(profile['__refid'], {collection: 'course'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<Item>(profile['__refid'], {collection: 'item'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<Param>(profile['__refid'], {collection: 'param'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<Rival>(profile['__refid'], {collection: 'rival'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<Skill>(profile['__refid'], {collection: 'skill'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<VariantPower>(profile['__refid'], {collection: 'variantpower'}, { $set: { version: 6, dbver: 1 }})
		await DB.Update<WeeklyMusicScore>(profile['__refid'], {collection: 'weeklymusicscore'}, { $set: { version: 6, dbver: 1 }})
	})

	let courseData = await DB.Find<CourseRecord>(null, {collection: 'course', version: 6, dbver: {$exists: false}})
	let skillData
	courseData.forEach(async course => {
		skillData = COURSES6.find(sd => sd.id === course['sid'])
		if(skillData && 'courses' in skillData) {
			let courseIndex = skillData['courses'].findIndex(cd => parseInt('' + skillData.id + cd.id) === course['cid'])
			if(courseIndex !== -1) {
				console.log("new - (" + course['__refid'] + ") updating cid " + course['cid'] + " -> " + course['cid'].toString().slice(skillData.id.toString().length) + " (sid " + course['sid'] + ")")
				await DB.Upsert(course['__refid'], {collection: 'course', sid: course['sid'], cid: parseInt('' + skillData.id + skillData['courses'][courseIndex].id)}, {
					$set: {
						cid: parseInt(course['cid'].toString().slice(skillData.id.toString().length)),
						dbver: 1
					}
				})
			}
		}
	})

	// move customization settings to param
	profiles = await DB.Find<Profile>(null, {collection: 'profile', bgm: {$exists: true}})
	profiles.forEach(async profile => {
		let customParam = await DB.FindOne<Param>(profile['__refid'], {collection: 'param', type: 2, id: 2, version: profile['version']})
		let customize = (!customParam) ? [0, 0, (profile['version'] === 7 ? 47 : 0), 0, 0, 0, 0, 0, 0, 0, 0, 0] : customParam.param
		const custMig = [profile['bgm'], profile['subbg'], (profile['version'] === 7 && profile['nemsys'] === 0 ? 47 : profile['nemsys'] ), profile['stampA'], profile['stampB'], profile['stampC'], profile['stampD'], profile['stampRA'], profile['stampRB'], profile['stampRC'], profile['stampRD'], profile['sysBG']]
		custMig.forEach((c, ind) => {
			customize[ind] = c
		})
		await DB.Upsert<Param>(profile['__refid'], {collection: 'param', type: 2, id: 2, version: profile['version']}, {$set: {param: customize}})
		await DB.Update<Profile>(profile['__refid'], {collection: 'profile', version: profile['version']}, {$unset: {bgm: true, subbg: true, nemsys: true, stampA: true, stampB: true, stampC: true, stampD: true, stampRA: true, stampRB: true, stampRC: true, stampRD: true, sysBG: true}})
	})
}

export async function iiMigrate(refid) {
	console.log("Migrating profile from BOOTH to ii")
	let profileData = await DB.FindOne<Profile>(refid, {collection: 'profile', version: 1})
	await DB.Upsert<Profile>(refid, {collection: 'profile', version: 2}, {
		$set: {
			pluginVer: 1,
			dbver: DB_VER,

			collection: 'profile',
			id: profileData.id,
			name: profileData.name,
			appeal: 0,
			akaname: 0,
			blocks: 0,
			packets: 0,
			arsOption: 0,
			drawAdjust: 0,
			earlyLateDisp: 0,
			effCLeft: 0,
			effCRight: 0,
			gaugeOption: 0,
			hiSpeed: profileData.hiSpeed,
			laneSpeed: profileData.laneSpeed,
			narrowDown: 0,
			notesOption: 0,
			blasterEnergy: 0,

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
			creatorItem: 0
		}
	})

	
	let haveItem = profileData.haveItem
	for(let apId = 37; apId <= 256; apId++) {
		if(haveItem[apId]) await DB.Upsert<Item>(refid, {collection: 'item', version: 2, type: 1, id: apId - 36}, {
			$set: {
				param: 0,
				dbver: DB_VER
			}
		})
	}

	for(const [ind, have] of HAVE_NOTE.entries()) {
		if(Boolean(profileData.haveNote[ind])) await DB.Upsert(refid, {collection: 'item', version: 2, type: 0, id: have.id}, {
			$set: {
				param: have.param
			}
		})
	}
}

export async function viiMigrate(refid) {
	console.log("Migrating profile from EG to ∇")
	let profileData = await DB.FindOne<Profile>(refid, {collection: 'profile', version: 6})
	await DB.Upsert<Profile>(refid, {collection: 'profile', version: 7}, {
		$set: {
			pluginVer: 1,
			dbver: DB_VER,

			collection: 'profile',
			id: profileData.id,
			name: profileData.name,
			appeal: 0,
			akaname: 0,
			blocks: 0,
			packets: 0,
			arsOption: 0,
			drawAdjust: 0,
			earlyLateDisp: 0,
			effCLeft: profileData.effCLeft,
			effCRight: profileData.effCRight,
			gaugeOption: 0,
			hiSpeed: profileData.hiSpeed,
			laneSpeed: profileData.laneSpeed,
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

			playCount: 0,
			dayCount: 0,
			todayCount: 0,
			playchain: 0,
			maxPlayChain: 0,
			weekCount: 0,
			weekPlayCount: 0,
			weekChain: 0,
			maxWeekChain: 0,

			bplSupport: profileData.bplSupport,
			creatorItem: profileData.creatorItem
		}
	})

	let itemData = await DB.Find<Item>(refid, {collection: 'item', version: 6})
	console.log("Migrating item data")
	itemData.forEach(async item => {
		await DB.Upsert<Item>(refid, {collection: 'item', version: 7, type: item.type, id: item.id}, {
			$set: {
				param: item.param,
				dbver: DB_VER
			}
		})
	})

	let paramData = await DB.Find<Param>(refid, {collection: 'param', version: 6})
	console.log("Migrating param data")
	paramData.forEach(async param => {
		if(param.type === 2 && param.id === 1) param.param[24] = 0
		await DB.Upsert<Param>(refid, {collection: 'param', version: 7, type: param.type, id: param.id}, {
			$set: {
				param: param.param,
				dbver: DB_VER
			}
		})
	})

	let exScoreResetList = [
		{ id: 360, type: 3 }, { id: 580, type: 2 }, { id: 1121, type: 4 }, { id: 1185, type: 2 },
		{ id: 1199, type: 4 }, { id: 1738, type: 4 }, { id: 2242, type: 0 }
	]
	// add EG force value
	let levelDifOverride = [
		{ mid: 1, type: 1, lvl: 10 }, { mid: 18, type: 1, lvl: 8 }, { mid: 18, type: 2, lvl: 10 },
		{ mid: 73, type: 2, lvl: 17 }, { mid: 48, type: 1, lvl: 8 }, { mid: 75, type: 2, lvl: 12 },
		{ mid: 124, type: 2, lvl: 16 }, { mid: 65, type: 1, lvl: 7 }, { mid: 66, type: 1, lvl: 8 },
		{ mid: 27, type: 1, lvl: 7 }, { mid: 27, type: 2, lvl: 12 }, { mid: 68, type: 1, lvl: 9 },
		{ mid: 6, type: 1, lvl: 7 }, { mid: 6, type: 2, lvl: 12 }, { mid: 16, type: 1, lvl: 7 },
		{ mid: 2, type: 1, lvl: 10 }, { mid: 60, type: 3, lvl: 17 }, { mid: 5, type: 2, lvl: 13 },
		{ mid: 128, type: 2, lvl: 13 }, { mid: 9, type: 2, lvl: 1 }, { mid: 340, type: 2, lvl: 13 },
		{ mid: 247, type: 3, lvl: 18 }, { mid: 282, type: 2, lvl: 17 }, { mid: 288, type: 2, lvl: 13 },
		{ mid: 699, type: 3, lvl: 18 }, { mid: 595, type: 2, lvl: 17 }, { mid: 507, type: 2, lvl: 17 }, 
		{ mid: 1044, type: 2, lvl: 16 }, { mid: 948, type: 4, lvl: 16 }, { mid: 1115, type: 4, lvl: 16 },
		{ mid: 1215, type: 2, lvl: 15 }, { mid: 1152, type: 2, lvl: 15 }, { mid: 1282, type: 3, lvl: 17.5 },
		{ mid: 1343, type: 2, lvl: 16 }, { mid: 1300, type: 3, lvl: 17.5 }, { mid: 1938, type: 2, lvl: 18 }
	]

	let music_db = await IO.ReadFile('webui/asset/json/music_db.json')
	let mdb = JSON.parse(music_db.toString());
	let diffName = ['novice', 'advanced', 'exhaust', 'infinite', 'maximum', 'ultimate']
	let migRecs = await DB.Find<MusicRecord>(refid, {collection: 'music', version: 6})
	migRecs.forEach(async rec => {
		let nblClearLamp = [0, 1, 2, 3, 5, 6, 4]
		var foundSongIndex = mdb.mdb.music.map(function(x) {return x['id']; }).indexOf(rec.mid.toString());
		let diffLevel = 0
		let lvOverride = 0
		let exscoreOverride = 0
		if(foundSongIndex !== -1) {
			var songData = mdb.mdb.music[foundSongIndex];
			diffLevel = parseInt(songData['difficulty'][6][diffName[rec.type]])
			lvOverride = levelDifOverride.findIndex(d => d.mid === rec.mid && d.type === rec.type)
			if(lvOverride >= 0) diffLevel = levelDifOverride[lvOverride].lvl
			exscoreOverride = exScoreResetList.findIndex(d => d.id === rec.mid && d.type === rec.type)
			if(exscoreOverride >= 0) rec.exscore = 0
			await DB.Upsert(refid, {collection: 'music', mid: rec.mid, type: rec.type, version: 7}, {
				$set: {
					score: rec.score,
					exscore: rec.exscore,
					volforce: computeForce(diffLevel, rec.score, nblClearLamp[rec.clear], rec.grade),
					clear: nblClearLamp[rec.clear],
					grade: rec.grade,
					buttonRate: rec.buttonRate,
					longRate: rec.longRate,
					volRate: rec.volRate,
					dbver: DB_VER
				}
			})
		}
	})
}