const clearRank = ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', '']
const clearKind = ['Not Attempted', 'Attempted', 'Assisted Clear', 'Passed', 'Life4 Clear (1)', 'Life4 Clear (2)', 'Life4 Clear', 'Passed — FC', 'Passed — GFC', 'Passed — PFC', 'Passed — MFC']
const flareRank = ['-', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'EX']
const diffName = ['Beginner', 'Basic', 'Difficult', 'Expert', 'Challenge']

async function populateCourseData(courses) {
	let scoreTableData = []
	let scoreIndex = 0
	let cdbData = []
	await emit('getCDB', {}).then(
		function(response) {
			cdbData = response.data.cdbData
		}
	)

	let medalData = {
		single: [],
		double: []
	}
	for(const c of cdbData) {
		const style = Number(c.mcode > 2000) ? 'double' : 'single'
		const crs = courses.find(cr => cr.songId === c.mcode)
		const medal = {mcode: c.mcode, obtain: 0, high: 0}
		if(crs && crs.flareForce > 0) {
			medal.obtain = crs.flareForce
			medal.high = crs.flareForce
			for(const ind in medalData[style]) {
				if(crs.flareForce > medalData[style][ind].high) medalData[style][ind].high = crs.flareForce
			}
		}
		medalData[style].push(medal)
	}

	const populateMedals = function(mcode, flareForce, style) {
		let medalCount = 0
		const med = medalData[style ? 'double' : 'single'].find(m => m.mcode === mcode)
		let domApp = ''
		for(let x=0; x<10; x++) {
			if(x < med.obtain) { domApp += '<span class="dot g"></span>'; medalCount++ }
			else if(x < med.high) { domApp += '<span class="dot y"></span>'; medalCount++ }
			else domApp += '<span class="dot none"></span>'
		}
		return [medalCount, domApp]
	}

	const sCnt = cdbData.filter(c => c.mcode < 2000).length
	const dCnt = cdbData.filter(c => c.mcode > 2000).length
	let medalCount = [0, 0]
	for(const c of cdbData) {
		const style = c.mcode > 2000
		const cnt = style ? dCnt : sCnt
		const divSel = style ? 'dc' : 'sc'
		const crs = courses.find(crs => c.mcode === crs.songId)
		const medalPop = populateMedals(c.mcode, crs?.flareForce ?? 0, style)
		medalCount[Number(style)] += medalPop[0]
		$(`.${divSel}`).append(`
			<div class="${c.basename} columns is-vcentered">
				<div class="column ${c.basename}-details">
					<b style="font-size: 1.15em;">${courseLabel[c.grade]}</b> &nbspLv.${c.diffLv}<br><br>
					- <b>${c.music[0].title}</b> [${diffName[c.music[0].difficulty]}]<br>
					- <b>${c.music[1].title}</b> [${diffName[c.music[1].difficulty]}]<br>
					- <b>${c.music[2].title}</b> [${diffName[c.music[2].difficulty]}]<br>
				</div>
				<div class="crs-div"></div>
				<div class="column ${c.basename}-data">
					<span style="font-size: 1.15em;">${(crs?.clearKind ?? 0 > 0) ? clearKind[crs.clearKind] : clearKind[0]}</span><br>
					${medalPop[1]}<br><br>
					Score: ${(crs?.clearKind ?? 0 > 0) ? crs.score.toLocaleString() + ' (' + clearRank[crs?.rank ?? 0] + ')' : '0'}<br>
					Ex-score: ${crs?.exScore.toLocaleString() ?? 0}<br>
					Flare Gauge: ${flareRank[(crs?.flareForce ?? 0) >= 0 ? (crs?.flareForce ?? 0) : 0]}
				</div>
			</div>
		`).append(c.grade < cnt ? '<hr>' : null)
	}
	$('.sctitle').append(` — Medals: ${medalCount[0]}`)
	$('.dctitle').append(` — Medals: ${medalCount[1]}`)

}

$(document).ready(async function() {
	let courses = JSON.parse(document.getElementById("score-pass").innerText)
	populateCourseData(courses)
})