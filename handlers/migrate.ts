import { COURSES6 } from "../data/exg"

export async function dataUpdate() {
	await updateSkillCourseIds()
}

async function updateSkillCourseIds() {
	let skillData 
	let course = await DB.Find(null, {collection: 'course'})
	course.forEach(async c => {
		skillData = COURSES6.find(sd => sd.id === c['sid'])
		if(skillData['courses'].findIndex(cd => cd.id === c['cid']) === -1) {
			console.log("(" + c['__refid'] + ") updating cid " + c['cid'] + " -> " + parseInt(c['sid'].toString() + c['cid'].toString()))
			await DB.Upsert(c['__refid'], {collection: 'course', sid: c['sid'], cid: c['cid']}, {
				$set: {
					cid: parseInt(c['sid'].toString() + c['cid'].toString())
				}
			})
		}
	})
}