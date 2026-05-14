const songLimit = [-1, 187, 554, -1, -1, -1, 2342, -1]
var version = 6
var music_data = []

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
            return "XCD";
        case "7":
            return "NBL";
    }
}

function populateSongsList() {
    $('#songslist').DataTable().clear().destroy()
    $('#songslist').DataTable({
        data: music_data,
        columns: [
            { data: 'mid' },
            { data: 'songname' },
            { data: 'omni' },
            { data: 'releasedate' },
            { data: 'nov' },
            { data: 'adv' },
            { data: 'exh' },
            { data: 'mxm' },
            { data: 'oth' },
            { data: 'ult' }
        ],
        columnDefs: [
            {
              "targets": [2],
              "visible": version >= 6
            },
            {
              "targets": [7],
              "visible": version >= 4
            },
            {
              "targets": [8],
              "visible": version >= 2
            },
            {
              "targets": [9],
              "visible": version >= 6
            },
            
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

function mdbLoad() {
    music_data = [];
    for (const mdata of music_db.mdb.music) {
        if(mdata['info']['version'] <= version.toString()) {
            if(Object.keys(mdata['difficulty'][version]).length > 0 || Object.keys(mdata['difficulty'][0]).length > 0) {
                var temp_data = {};
                temp_data.mid = mdata['id'];
                temp_data.songname = mdata['info']['title_name'];
                temp_data.omni = 'omnimix' in mdata['info'] ? 'Yes' : 'No'
                if('distribution_date' in mdata['info']) {
                    temp_data.releasedate = mdata['info']['distribution_date'];
                } else {
                    temp_data.releasedate = 'Unknown'
                }
                temp_data.nov = "-";
                temp_data.adv = "-";
                temp_data.exh = "-";
                temp_data.mxm = "-";
                temp_data.oth = "-";
                temp_data.ult = "-";
                if (mdata['difficulty'][version]['novice'] != '0') {
                    temp_data.nov = mdata['difficulty'][version]['novice'] || mdata['difficulty'][0]['novice']
                }
                if (mdata['difficulty'][version]['advanced'] != '0') {
                    temp_data.adv = mdata['difficulty'][version]['advanced'] || mdata['difficulty'][0]['advanced']
                }
                if (mdata['difficulty'][version]['exhaust'] != '0') {
                    temp_data.exh = mdata['difficulty'][version]['exhaust'] || mdata['difficulty'][0]['exhaust']
                }
                if (mdata['info']['inf_ver'] != '0' && mdata['difficulty'][version]['infinite'] != '0' && version >= parseInt(mdata['info']['inf_ver'])) {
                    temp_data.oth = (mdata['difficulty'][version]['infinite']  || mdata['difficulty'][0]['infinite']) + ' | ' + getInfDifficulty(mdata['info']['inf_ver'])
                }
                if ("maximum" in mdata['difficulty'][version]) {
                    if (mdata['difficulty'][version]['maximum'] != '0') {
                        temp_data.mxm = mdata['difficulty'][version]['maximum']
                    } 
                } else if ("maximum" in mdata['difficulty'][0]) {
                    if (mdata['difficulty'][0]['maximum'] != '0') {
                        temp_data.mxm = mdata['difficulty'][0]['maximum']
                    } 
                }
                if ("ultimate" in mdata['difficulty'][version]) {
                    if (mdata['difficulty'][version]['ultimate'] != '0') {
                        temp_data.ult = mdata['difficulty'][version]['ultimate'] || mdata['difficulty'][0]['ultimate']
                    } 
                }
                music_data.push(temp_data);
            }
        }
    }
}

$(document).ready(async function() {
    await $.getJSON("static/asset/json/music_db.json", function(json) {
        music_db = json;
    });

    mdbLoad()
    populateSongsList(music_data)

    $('#version_select').change(function() {
        version = parseInt($('#version_select').val())
        console.log(version)
        mdbLoad()
        populateSongsList(music_data)
    })

})