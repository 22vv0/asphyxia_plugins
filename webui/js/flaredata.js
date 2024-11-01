let flareData = {}
let totalFlare = 0
let classicTop30 = []
let classicFlare = []
let whiteTop30 = []
let whiteFlare = []
let goldTop30 = []
let goldFlare = []

async function populateTables() {
    if(parseInt($('#style_select').val()) === 0) {
		totalFlare = flareData.totalSgFlare
		classicTop30 = flareData.classicSgTop30
		classicFlare = flareData.classicSgFlare
		whiteTop30 = flareData.whiteSgTop30
		whiteFlare = flareData.whiteSgFlare
		goldTop30 = flareData.goldSgTop30
		goldFlare = flareData.goldSgFlare
	} else {
		totalFlare = flareData.totalDbFlare
		classicTop30 = flareData.classicDbTop30
		classicFlare = flareData.classicDbFlare
		whiteTop30 = flareData.whiteDbTop30
		whiteFlare = flareData.whiteDbFlare
		goldTop30 = flareData.goldDbTop30
		goldFlare = flareData.goldDbFlare
	}

	if(classicTop30.length === 0) $("tbody#classic_flare").append($("<tr>").append($("<td colspan='4' style='text-align: center'>").append('No qualified scores.')))
	if(whiteTop30.length === 0) $("tbody#white_flare").append($("<tr>").append($("<td colspan='4' style='text-align: center'>").append('No qualified scores.')))
	if(goldTop30.length === 0) $("tbody#gold_flare").append($("<tr>").append($("<td colspan='4' style='text-align: center'>").append('No qualified scores.')))

	for(const index in classicTop30) {
		$("tbody#classic_flare").append(
			$("<tr>").append(
				$("<td>").append(parseInt(index) + 1)
			).append(
				$("<td>").append(classicTop30[index].title)
			).append(
				$("<td>").append(classicTop30[index].difficulty)
			).append(
				$("<td>").append(classicTop30[index].flare)
			)
		)
	}
	for(const index in whiteTop30) {
		$("tbody#white_flare").append(
			$("<tr>").append(
				$("<td>").append(parseInt(index) + 1)
			).append(
				$("<td>").append(whiteTop30[index].title)
			).append(
				$("<td>").append(whiteTop30[index].difficulty)
			).append(
				$("<td>").append(whiteTop30[index].flare)
			)
		)
	}
	for(const index in goldTop30) {
		$("tbody#gold_flare").append(
			$("<tr>").append(
				$("<td>").append(parseInt(index) + 1)
			).append(
				$("<td>").append(goldTop30[index].title)
			).append(
				$("<td>").append(goldTop30[index].difficulty)
			).append(
				$("<td>").append(goldTop30[index].flare)
			)
		)
	}
}

$(document).ready(async function() {
	let scores = JSON.parse(document.getElementById("score-pass").innerText)
	flareData = await getFlareInfo(scores);
	await populateTables()
	
	$('#style_select').change(async function() {
		$("#classic_flare tr").remove()
		$("#white_flare tr").remove()
		$("#gold_flare tr").remove()
		console.log("Removed")
		await populateTables()
    })
})