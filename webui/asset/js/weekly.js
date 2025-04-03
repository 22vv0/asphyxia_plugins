function populateRankList(rankings) {
    $('#ranking').DataTable().clear().destroy()
    $('#ranking').DataTable({
        data: rankings,
        columns: [
            { data: 'rank' },
            { data: 'name' },
            { data: 'exscore' },
            { data: 'date' }
        ],
        columnDefs: [],
        responsive: {},
        paging: false,
        searching: false,
        ordering: false,
    });
}

function populateWeeklySongsList(weekly, mdb) {
    let compltWeekCtr = 0
    for(let songCtr = weekly.length - 1; songCtr >= 0; songCtr--) {
        let now = new Date()
        let start = new Date(Number(weekly[songCtr]['start']))
        let end = new Date(Number(weekly[songCtr]['end']))
        let startFormat = start.getFullYear() + '-' + String(start.getMonth() + 1).padStart(2, "0") + '-' + String(start.getDate()).padStart(2, "0") + ' ' + String(start.getHours()).padStart(2, "0") + ":" + String(start.getMinutes()).padStart(2, "0")
        let endFormat = end.getFullYear() + '-' + String(end.getMonth() + 1).padStart(2, "0") + '-' + String(end.getDate()).padStart(2, "0") + ' ' + String(end.getHours()).padStart(2, "0") + ":" + String(end.getMinutes()).padStart(2, "0")
        let songInfo = mdb.mdb.music.find(m => m['@id'] === weekly[songCtr]['musicId'].toString())
        let infdiff = ['inf', 'grv', 'hvn', 'vvd', 'xcd']
        compltWeekCtr = (now >= end) ? compltWeekCtr += 1 : compltWeekCtr
        if(now < end || compltWeekCtr <= 3) {
            $('#wsongs tbody').append(
                '<tr>'
            ).append(
                '<td>'+ songInfo.info.title_name + '</td>'
            ).append(
                '<td>'+ startFormat + ' ~ ' + endFormat + '</td>'
            ).append(
                '<td style="text-align:center;">' + (Number(now) > Number(weekly[songCtr]['start']) ? ((songInfo.difficulty.novice.difnum['#text'] !== '0') ? '<img id="difRank" week=' + weekly[songCtr]['weekId'] + ' mid=' + weekly[songCtr]['musicId'] + ' mtype=0 src="static/asset/difficulty/level_small_nov.png">' : "-") : "-") + "</td>"
            ).append(
                '<td style="text-align:center;">' + (Number(now) > Number(weekly[songCtr]['start']) ? ((songInfo.difficulty.advanced.difnum['#text'] !== '0') ? '<img id="difRank" week=' + weekly[songCtr]['weekId'] + ' mid=' + weekly[songCtr]['musicId'] + ' mtype=1 src="static/asset/difficulty/level_small_adv.png">' : "-") : "-") + "</td>"
            ).append(
                '<td style="text-align:center;">' + (Number(now) > Number(weekly[songCtr]['start']) ? ((songInfo.difficulty.exhaust.difnum['#text'] !== '0') ? '<img id="difRank" week=' + weekly[songCtr]['weekId'] + ' mid=' + weekly[songCtr]['musicId'] + ' mtype=2 src="static/asset/difficulty/level_small_exh.png">' : "-")  : "-") + "</td>"
            ).append(
                '<td style="text-align:center;">' + (Number(now) > Number(weekly[songCtr]['start']) ? ((songInfo.difficulty.maximum.difnum['#text'] !== '0') ? '<img id="difRank" week=' + weekly[songCtr]['weekId'] + ' mid=' + weekly[songCtr]['musicId'] + ' mtype=4 src="static/asset/difficulty/level_small_mxm.png">' : "-")  : "-") + "</td>"
            ).append(
                '<td style="text-align:center;">' + (Number(now) > Number(weekly[songCtr]['start']) ? ((songInfo.info.inf_ver['#text'] !== '0') ? '<img id="difRank" week=' + weekly[songCtr]['weekId'] + ' mid=' + weekly[songCtr]['musicId'] + ' mtype=3 src="static/asset/difficulty/level_small_'+ infdiff[parseInt(songInfo.info.inf_ver['#text']) - 2] +'.png">' : "-")  : "-") + "</td>"
            )
        }
    }
}

$(document).ready(async function() {
    let mdb = []
    let weekly = []
    await $.getJSON("static/asset/json/music_db.json", async function(mjson) {
        mdb = mjson
        await $.getJSON("static/asset/config/weeklymusic.json", async function(wjson) {
            weekly = wjson
            populateWeeklySongsList(weekly, mdb);
        })
    });

    $('#weekly-submit').click(async function() {
        let songIndex = mdb.mdb.music.findIndex(m => m['@id'] === $('#mid').val().toString())
        if(songIndex < 0) alert("Invalid song ID: " + $('#mid').val())
        else {
            await emit("addWeekly", {mid: parseInt($('#mid').val())}).then(
                function(response) {
                    location.reload()
                },
                function(error) {
                    console.log(error)
                }
            )
        }
    })

    $(document).on("click", "#difRank", async function() {
        let difLabels = ['NOV', 'ADV', 'EXH', ['INF', 'GRV', 'HVN', 'VVD', 'XCD'], 'MXM']
        let week = parseInt($(this).attr('week'))
        let mid = parseInt($(this).attr('mid'))
        let mtype = parseInt($(this).attr('mtype'))
        let songIndex = mdb.mdb.music.findIndex(m => m['@id'] === mid.toString())
        await emit("getWeekRankList", {week: week, mid: mid, mtype: mtype}).then(
            function(response) {
                populateRankList(response.data.results)
                $('.songnamedif').remove()
                $('.song-info').append(
                    "<h3 class='songnamedif'>" + mdb.mdb.music[songIndex]['info']['title_name'] + " (" + ((mtype === 3) ? difLabels[mtype][parseInt(mdb.mdb.music[songIndex]['info']['inf_ver']['#text']) - 2] : difLabels[mtype]) + ")</h3>"
                )
            },
            function(error) {
                console.log("error")
            }
        )
    })
})
