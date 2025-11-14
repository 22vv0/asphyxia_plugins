import { COURSES6 } from "../data/exg"
import { VariantPower } from "../models/variant"

export const DB_VER = 1

export async function dataUpdate() {
	await updateSkillCourseIds()
	await updateDB()
}

async function updateSkillCourseIds() {
	let skillData 
	let course = await DB.Find(null, {collection: 'course'})
	course.forEach(async c => {
		skillData = COURSES6.find(sd => sd.id === c['sid'])
		if(skillData && 'courses' in skillData) {
			if(skillData['courses'].findIndex(cd => cd.id === c['cid']) === -1) {
				console.log("(" + c['__refid'] + ") updating cid " + c['cid'] + " -> " + c['sid'].toString() + c['cid'].toString())
				await DB.Upsert(c['__refid'], {collection: 'course', sid: c['sid'], cid: c['cid']}, {
					$set: {
						cid: parseInt('' + c['sid'] + c['cid'])
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
}