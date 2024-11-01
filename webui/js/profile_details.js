$(document).ready(async function() {
	// classic 1-13 white 14-17 gold 18-21
	let profile = JSON.parse(document.getElementById("profile3-pass").innerText)
	let scores = JSON.parse(document.getElementById("score-pass").innerText)

	$("#area").append(
		$("<td>").append(area[profile.area])
	)

	let flareData = await getFlareInfo(scores)

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
	console.log(sgSkill + " (" + totalSgFlare + ")")

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
	console.log(dbSkill + " (" + totalDbFlare + ")")

	$("#skillrank").append(
		$("<td>").append(sgSkill)
	).append(
		$("<td>").append(dbSkill)
	)

	$("#skilltotal").append(
		$("<td>").append(totalSgFlare)
	).append(
		$("<td>").append(totalDbFlare)
	)

	$("#skillclassic").append(
		$("<td>").append(classicSgFlare + ' (' + classicSgTop30.length + ' / 30)')
	).append(
		$("<td>").append(classicDbFlare + ' (' + classicDbTop30.length + ' / 30)')
	)
	$("#skillwhite").append(
		$("<td>").append(whiteSgFlare + ' (' + whiteSgTop30.length + ' / 30)')
	).append(
		$("<td>").append(whiteDbFlare + ' (' + whiteDbTop30.length + ' / 30)')
	)
	$("#skillgold").append(
		$("<td>").append(goldSgFlare + ' (' + goldSgTop30.length + ' / 30)')
	).append(
		$("<td>").append(goldDbFlare + ' (' + goldDbTop30.length + ' / 30)')
	)
})