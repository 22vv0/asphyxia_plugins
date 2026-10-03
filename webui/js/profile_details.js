$(document).ready(async function() {
	// classic 1-13 white 14-17 gold 18-21
	let profile = JSON.parse(document.getElementById("profile3-pass").innerText)
	let scores = JSON.parse(document.getElementById("score-pass").innerText)

	$("#area").append(
		$("<td>").append(area[profile.area])
	)

	let flareData = await getFlareInfo(scores.filter(sc => !isMcodeCourse(sc.songId)))

	let totalSgFlare = flareData.totalSgFlare
	let totalDbFlare = flareData.totalDbFlare

	let classicSgTop30 = flareData.classicSgTop30
	let classicSgFlare = flareData.classicSgFlare
	let classicDbTop30 = flareData.classicDbTop30
	let classicDbFlare = flareData.classicDbFlare

	let whiteSgTop30 = flareData.whiteSgTop30
	let whiteSgFlare = flareData.whiteSgFlare
	let whiteDbTop30 = flareData.whiteDbTop30
	let whiteDbFlare = flareData.whiteDbFlare

	let goldSgTop30 = flareData.goldSgTop30
	let goldSgFlare = flareData.goldSgFlare
	let goldDbTop30 = flareData.goldDbTop30
	let goldDbFlare = flareData.goldDbFlare

	let skillGet = false
	let sgSkill = ''
	let dbSkill = ''
	let skillPlus = '+++'
	flareSkill.forEach(fs => {
		if(!skillGet) {
			for(let sctr = 1; sctr < fs.length; sctr++) {
				if(totalSgFlare >= fs[sctr]) {
					sgSkill = fs[0]
					if(sctr > 1) sgSkill = sgSkill + skillPlus.substring(0, sctr - 1) 
				}
				else skillGet = true
			}
		}
	})

	skillGet = false
	flareSkill.forEach(fs => {
		if(!skillGet) {
			for(let sctr = 1; sctr < fs.length; sctr++) {
				if(totalDbFlare >= fs[sctr]) {
					dbSkill = fs[0]
					if(sctr > 1) dbSkill = dbSkill + skillPlus.substring(0, sctr - 1) 
				}
				else skillGet = true
			}
		}
	})

	$('#srs').text(sgSkill)
	$('#srd').text(dbSkill)
	$('#sts').text(totalSgFlare)
	$('#std').text(totalDbFlare)
	$('#scs').text(`${classicSgFlare} (${classicSgTop30.length} / 30)`)
	$('#scd').text(`${classicDbFlare} (${classicDbTop30.length} / 30)`)
	$('#sws').text(`${whiteSgFlare} (${whiteSgTop30.length} / 30)`)
	$('#swd').text(`${whiteDbFlare} (${whiteDbTop30.length} / 30)`)
	$('#sgs').text(`${goldSgFlare} (${goldSgTop30.length} / 30)`)
	$('#sgd').text(`${goldDbFlare} (${goldDbTop30.length} / 30)`)

	let danRank = await getDanRank(scores.filter(sc => isMcodeCourse(sc.songId)))

	$('.singlerank').text(courseLabel[danRank[0]])
	$('.doublerank').text(courseLabel[danRank[1]])
})