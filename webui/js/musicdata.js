let clearRank = ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E']
let clearKind = ['-', 'Fail', 'Assisted Clear', 'Clear', 'Life4 Clear (1)', 'Life4 Clear (2)', 'Life4 Clear', 'FC', 'GFC', 'PFC', 'MFC']
let flareRank = ['None', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'EX']

async function populateScoreTable(scores, style, info) {

	let scoreTableData = []
	let scoreIndex = 0
	let mdbData = []
	await emit('getMDB', {}).then(
		function(response) {
			mdbData = response.data.mdb
		}
	)
	scores.forEach(score => {
		let scoreIndex = scoreTableData.findIndex(scoreData => scoreData.songId === score.songId)
		if(scoreIndex < 0 && style === score.style && score.songId !== 38707) {
			let m = mdbData.find(m => m.mcode === score.songId)
			scoreTableData.push({
				'songId': score.songId,
				'songTitle': m.title,
				'0': '-',
				'1': '-',
				'2': '-',
				'3': '-',
				'4': '-'
			})
		}
		scoreIndex = scoreTableData.findIndex(scoreData => scoreData.songId === score.songId && style === score.style)
		if(scoreIndex > -1) {
			if(info === 0) scoreTableData[scoreIndex][score.difficulty] = score.score
			if(info === 1) scoreTableData[scoreIndex][score.difficulty] = clearRank[score.rank]
			if(info === 2) scoreTableData[scoreIndex][score.difficulty] = clearKind[score.clearKind]
			if(info === 3) scoreTableData[scoreIndex][score.difficulty] = (score.flareForce > -1) ? flareRank[score.flareForce] : '-' 
		}
	})

	$('#musicdata').DataTable().clear().destroy()
    $('#musicdata').DataTable({
        data: scoreTableData,
        columns: [
            { data: 'songTitle' },
            { data: '0' },
            { data: '1' },
            { data: '2' },
            { data: '3' },
            { data: '4' }
        ],
        pageLength: 100,
        columnDefs: [
        	{
        		targets: 0,
        		width: "1px"
        	}
        ],
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function(row) {
                        var data = row.data();
                        return 'Scores for song: ' + data.songId;
                    }
                })
            }
        }
    });
}
$(document).ready(async function() {
	let scores = JSON.parse(document.getElementById("score-pass").innerText)
	populateScoreTable(scores, parseInt($('#style_select').val()), parseInt($('#info_select').val()))

	$('#style_select,#info_select').change(async function() {
    	await populateScoreTable(scores, parseInt($('#style_select').val()), parseInt($('#info_select').val()));
    })
})