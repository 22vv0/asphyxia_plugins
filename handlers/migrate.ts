import { COURSES6 } from "../data/exg"
import { MEGAMIX_SONGS, MEGAMIX_SONGS_2, MEGAMIX_SONGS_3, MEGAMIX_SONGS_4 } from "../data/exg"
import { VariantPower } from "../models/variant"

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
				console.log("old: (" + course['__refid'] + ") updating cid " + course['cid'] + " -> " + parseInt('' + skillData.id + skillData['courses'][courseIndex].id))
				await DB.Upsert(course['__refid'], {collection: 'course', sid: course['sid'], cid: course['cid']}, {
					$set: {
						cid: parseInt('' + skillData.id + skillData['courses'][courseIndex].id)
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

	let courseData = await DB.Find(null, {collection: 'course', dbver: {$exists: false}})
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
}