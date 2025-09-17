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
		if('courses' in skillData) {
			if(skillData['courses'].findIndex(cd => cd.id === c['cid']) === -1) {
				console.log("(" + c['__refid'] + ") updating cid " + c['cid'] + " -> " + parseInt(c['sid'].toString() + c['cid'].toString()))
				await DB.Upsert(c['__refid'], {collection: 'course', sid: c['sid'], cid: c['cid']}, {
					$set: {
						cid: parseInt(c['sid'].toString() + c['cid'].toString())
					}
				})
			}
		}
	})
}

async function updateDB() {
	let varPower = await DB.Find<VariantPower>(null, {collection: 'variantpower', dbver: {$exists: false}})
	varPower.forEach(async vp => {
		await DB.Upsert<VariantPower>(vp['__refid'], {collection: 'variantpower'}, {
			$set: {
				overRadar: [],
				dbver: 1
			}
		})
	})
}