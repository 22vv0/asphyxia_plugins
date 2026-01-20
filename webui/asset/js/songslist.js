function getInfDifficulty(inf_ver) {
    switch (inf_ver) {
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
}

function populateSongsList(music_data) {
    $('#songslist').DataTable({
        data: music_data,
        columns: [
            { data: 'mid' },
            { data: 'songname' },
            { data: 'releasedate' },
            { data: 'nov', },
            { data: 'adv' },
            { data: 'exh' },
            { data: 'mxm' },
            { data: 'oth' },
            { data: 'ult' }
        ],
        columnDefs: [

        ],
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

$(document).ready(function() {
    $.getJSON("static/asset/json/music_db.json", function(json) {
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
        music_db = json;
        var music_data = [];
        for (let mdata in music_db.mdb.music) {
            var temp_data = {};
            temp_data.mid = music_db.mdb.music[mdata]['id'];
            temp_data.songname = music_db.mdb.music[mdata]['info']['title_name'];
            temp_data.songname = temp_data.songname.replace(/[龕釁驩曦齷骭齶彜罇雋鬻鬥鬆曩驫齲騫趁鬮盥隍頽餮黻蔕闃饌煢鑷墸鹹瀑疉鑒]/g, m => translate_table[m]);
            if('distribution_date' in music_db.mdb.music[mdata]['info']) {
                temp_data.releasedate = music_db.mdb.music[mdata]['info']['distribution_date'];
            } else {
                temp_data.releasedate = 'Unknown'
            }
            temp_data.nov = "-";
            temp_data.adv = "-";
            temp_data.exh = "-";
            temp_data.mxm = "-";
            temp_data.oth = "-";
            temp_data.ult = "-";
            if (music_db.mdb.music[mdata]['difficulty']['novice'] != 0) {
                temp_data.nov = music_db.mdb.music[mdata]['difficulty']['novice']
            }
            if (music_db.mdb.music[mdata]['difficulty']['advanced'] != 0) {
                temp_data.adv = music_db.mdb.music[mdata]['difficulty']['advanced']
            }
            if (music_db.mdb.music[mdata]['difficulty']['exhaust'] != 0) {
                temp_data.exh = music_db.mdb.music[mdata]['difficulty']['exhaust'] 
            }
            if (music_db.mdb.music[mdata]['info']['inf_ver'] != 0) {
                temp_data.oth = music_db.mdb.music[mdata]['difficulty']['infinite'] + ' | ' + getInfDifficulty(music_db.mdb.music[mdata]['info']['inf_ver'])
            }
            if ("maximum" in music_db.mdb.music[mdata]['difficulty']) {
                if (music_db.mdb.music[mdata]['difficulty']['maximum'] != 0) {
                    temp_data.mxm = music_db.mdb.music[mdata]['difficulty']['maximum']
                } 
            }
            if ("ultimate" in music_db.mdb.music[mdata]['difficulty']) {
                if (music_db.mdb.music[mdata]['difficulty']['ultimate'] != 0) {
                    temp_data.ult = music_db.mdb.music[mdata]['difficulty']['ultimate'] 
                } 
            }
            music_data.push(temp_data);
        }

        populateSongsList(music_data);
    });


})