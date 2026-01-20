var urlParams;
var currentVersion;
var currentProfile;
var versionText = ['', 'BOOTH', 'INFINTE INFECTION', 'GRAVITY WARS', 'HEAVENLY HAVEN', 'VIVIDWAVE', 'EXCEED GEAR', '∇']

function getDifficulty(songData, difficultyNum) {
    switch(difficultyNum) {
        case 0:
            return 'NOV'
        case 1:
            return 'ADV'
        case 2:
            return 'EXH'
        case 3:
            switch(songData['info']['inf_ver']) {
                case "2":
                    return "INF";
                case "3":
                    return "GRV";
                case "4":
                    return "HVN";
                case "5":
                    return "VVD";
                case "6":
                    return "XCD"
            }
        case 4:
            return 'MXM'
    }
}

function populateTable(yourScore, rivalScore, music_db) {
    const translate_table = {
          '龕': '€',
          '釁': '🍄',
          '驩': 'Ø',
          '曦': 'à',
          '齷': 'é',
          '骭': 'ü',
          '齶': '♡',
          '彜': 'ū',
          '罇': 'ê',
          '雋': 'Ǜ',
          '鬻': '♃',
          '鬥': 'Ã',
          '鬆': 'Ý',
          '曩': 'è',
          '驫': 'ā',
          '齲': '♥',
          '騫': 'á',
          '趁': 'Ǣ',
          '鬮': '¡',
          '盥': '⚙︎',
          '隍': '︎Ü',
          '頽': 'ä',
          '餮': 'Ƶ',
          '黻': '*',
          '蔕': 'ũ',
          '闃': 'Ā',
          '饌': '²',
          '煢': 'ø',
          '鑷': 'ゔ',
          '墸': '͟͟͞ ',
          '鹹': 'Ĥ',
          '瀑': 'À',
          '疉': 'Ö',
          '鑒': '₩'
    }
    let table_data = []
    for(let ind in yourScore) {
        let songData = music_db['mdb']['music'].filter((m => parseInt(m['id']) === yourScore[ind].mid))[0]
        let songName = songData['info']['title_name']
        let difficulty = getDifficulty(songData, yourScore[ind].type)
        let rivalIndivScore = rivalScore.filter((s => s.mid === yourScore[ind].mid && s.type === yourScore[ind].type))
        if(rivalIndivScore.length > 0) {
            table_data.push({
                mid: yourScore[ind].mid,
                songname: songName.replace(/[龕釁驩曦齷骭齶彜罇雋鬻鬥鬆曩驫齲騫趁鬮盥隍頽餮黻蔕闃饌煢鑷墸鹹瀑疉鑒]/g, m => translate_table[m]),
                difficulty: difficulty,
                yourScore: yourScore[ind].score,
                rivalScore: rivalIndivScore[0].score,
                time: Date.parse(yourScore[ind]['updatedAt'])
            })
        }
    }

    $('#scorecompare').DataTable({
        searching: false,
        data: table_data,
        columns: [
            { data: 'mid' },
            { data: 'songname' },
            { data: 'difficulty' },
            { data: 'yourScore', },
            { data: 'rivalScore' },
            { data: 'time' },
        ],
        columnDefs: [
            {
                targets: [0,1,2,3,4,5],
                orderable: false
            },
            {
                targets: [5],
                visible: false
            },

        ],
        order: [[5, 'desc']],
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function(row) {
                        var data = row.data();
                        return 'Details for ' + data.songname;
                    }
                })
            }
        },
    });
}

$(document).ready(async function() {
    var music_db
    $.getJSON("static/asset/json/music_db.json", function(json) {
        music_db = json;
    })

    rivals_data = JSON.parse(document.getElementById("rivals-pass").innerText);
    profiles_data = JSON.parse(document.getElementById("profiles-pass").innerText);

    your_profile_data = JSON.parse(document.getElementById("profile-pass").innerText);
    urlParams = new URLSearchParams(window.location.search);
    currentVersion = (urlParams.has('version') && urlParams.get('version') !== "") ? parseInt(urlParams.get('version')) : your_profile_data[your_profile_data.length - 1].version
    currentProfile = your_profile_data.find(p => p.version === currentVersion)

    profiles_data_filtered = profiles_data.filter((p => p.__refid !== refid && rivals_data.filter((r => refid === p.__refid && r.version === currentVersion)).length === 0))
    for (var p of your_profile_data) {
        $('#version_select').append($('<option>', {
            value: p.version,
            text: versionText[p.version],
            selected: (p.version === currentVersion)
        }));
    }

    for(let ind in profiles_data_filtered) {
        if(profiles_data_filtered[ind].__refid !== refid) {
            $('#profilelist').append($('<option>', {
                value: profiles_data_filtered[ind].__refid,
                text: profiles_data_filtered[ind].name,
            }));
        }
    }

    for(let ind in rivals_data) {
        $('#rivallist').append($('<option>', {
            value: rivals_data[ind].refid,
            text: profiles_data.filter((p => p.__refid === rivals_data[ind].refid))[0].name,
        }));
    }

    $('#profilelist').change(async function() {
        console.log($('#profilelist').val())
        if(rivals_data.filter((p => p.refid === $('#profilelist').val() && p.version === currentVersion)).length > 0) {
            $('#rival-button').text('Delete Rival')
        } else {
            $('#rival-button').text('Add Rival')
        }
    })

    $('#rivallist').change(async function() {
        $('#scorecompare').DataTable().clear().destroy()
        if($('#rivallist').val() !== "0") {
            await emit('getRivalScores', {rivalId: $('#rivallist').val(), refid: refid, version: currentVersion}).then(
                function(response){
                    populateTable(response.data.yourScores, response.data.rivalScores, music_db)
                }
            )
        }
    })

    $('#addrival').click(async function() {
        if($('#profilelist').val() !== '0') {
            await emit('addRival', {rivalId: $('#profilelist').val(), refid: refid, version: currentVersion}).then(
                function(response){
                    alert(response.data.msg)
                    location.reload()
                }
            )
        }
    })

    $('#version_select').change(function() {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('version', $('#version_select').val());
        location.search = urlParams;
    });
})