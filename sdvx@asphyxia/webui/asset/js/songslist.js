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
$(document).ready(function() {
    $.getJSON("static/asset/json/music_db.json", function(json) {
        music_db = json;
        var music_data = [];
        for (let mdata in music_db.mdb.music) {
            var temp_data = {};
            temp_data.mid = music_db.mdb.music[mdata]['@id'];
            temp_data.songname = music_db.mdb.music[mdata]['info']['title_name'];
            if('distribution_date' in music_db.mdb.music[mdata]['info']) {
                temp_data.releasedate = music_db.mdb.music[mdata]['info']['distribution_date']['#text'];
            } else {
                temp_data.releasedate = ''
            }
            temp_data.nov = "";
            temp_data.adv = "";
            temp_data.exh = "";
            temp_data.mxm = "";
            temp_data.oth = "";
            if (music_db.mdb.music[mdata]['difficulty']['novice']['difnum']['#text'] != 0) {
                temp_data.nov = music_db.mdb.music[mdata]['difficulty']['novice']['difnum']['#text'] 
            }
            if (music_db.mdb.music[mdata]['difficulty']['advanced']['difnum']['#text'] != 0) {
                temp_data.adv = music_db.mdb.music[mdata]['difficulty']['advanced']['difnum']['#text'] 
            }
            if (music_db.mdb.music[mdata]['difficulty']['exhaust']['difnum']['#text'] != 0) {
                temp_data.exh = music_db.mdb.music[mdata]['difficulty']['exhaust']['difnum']['#text'] 
            }
            if (music_db.mdb.music[mdata]['info']['inf_ver']['#text'] != 0) {
                temp_data.oth = music_db.mdb.music[mdata]['difficulty']['infinite']['difnum']['#text'] + ' | ' + getInfDifficulty(music_db.mdb.music[mdata]['info']['inf_ver']['#text'])
            }
            if ("maximum" in music_db.mdb.music[mdata]['difficulty']) {
                if (music_db.mdb.music[mdata]['difficulty']['maximum']['difnum']['#text'] != 0) {
                    temp_data.mxm = music_db.mdb.music[mdata]['difficulty']['maximum']['difnum']['#text'] 
                } 
            }
            music_data.push(temp_data);
        }

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
                { data: 'oth' }
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


    });


})