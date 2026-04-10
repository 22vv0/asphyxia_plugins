var music_db;
var urlParams;
var currentVersion;
var currentProfile;
var versionText = ['', 'BOOTH', 'INFINTE INFECTION', 'GRAVITY WARS', 'HEAVENLY HAVEN', 'VIVIDWAVE', 'EXCEED GEAR', '∇']

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function getSongName(musicid) {
    var ind = music_db["mdb"]["music"].findIndex(object => object["id"] == musicid);
    if (ind === -1) {
        ind = music_db["omni"]["music"].findIndex(object => object["id"] == musicid);
        if (ind > -1) return music_db["omni"]["music"][ind]["info"]["title_name"]
        return "Custom Song";
    }
    return music_db["mdb"]["music"][ind]["info"]["title_name"]
}

function getDifficulty(musicid, type) {
    let result
    var ind = music_db["mdb"]["music"].findIndex(object => object["id"] == musicid);
    if (ind === -1) {
        ind = music_db["omni"]["music"].findIndex(object => object["id"] == musicid);
        if(ind === -1) return "Unknown";
        result = music_db["omni"]["music"][ind]
    } else result = music_db["mdb"]["music"][ind]

    var inf_ver = result["info"]["inf_ver"] ? result["info"]["inf_ver"] : 5;
    switch (type) {
        case 0:
            return "NOV";
        case 1:
            return "ADV";
        case 2:
            return "EXH";
        case 3:
            {
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
                }
            }
        case 4:
            return "MXM";
        case 5:
            return "ULT";
    }
}

function getGrade(grade) {
    switch (grade) {
        case 0:
            return "No Grade";
        case 1:
            return "D";
        case 2:
            return "C";
        case 3:
            return "B";
        case 4:
            return "A";
        case 5:
            return currentVersion >= 4 ? "A+" : "AA";
        case 6:
            return currentVersion >= 4 ? "AAA" : "AA";
        case 7:
            return "AA+";
        case 8:
            return "AAA";
        case 9:
            return "AAA+";
        case 10:
            return "S";
    }
}

function getMedal(clear, version) {
    switch (clear) {
        case 0:
            return "No Data";
        case 1:
            return "PLAYED";
        case 2:
            return currentVersion >= 4 ? "EFFECTIVE CLEAR" : "CLEAR";
        case 3:
            return currentVersion >= 4 ? "EXCESSIVE CLEAR" : "UC";
        case 4:
            return currentVersion >= 6 ? ((version === 6) ? "UC" : "MAXXIVE CLEAR") : "PUC";
        case 5:
            return (version === 6) ? "PUC" : "UC";
        case 6:
            return (version === 6) ? "MAXXIVE CLEAR" : "PUC"
    }
}


function difficultySort(d) {
    switch (d) {
        case "NOV":
            return 1;
        case "ADV":
            return 2;
        case "EXH":
            return 3;
        case "INF":
            return 4;
        case "GRV":
            return 5;
        case "HVN":
            return 6;
        case "VVD":
            return 7;
        case "XCD":
            return 8;
        case "MXM":
            return 9;
        case "ULT":
            return 10;
    }
    return 0;
};

function markSort(d) {
    switch (d) {
        case "No Data":
            return 0;
        case "PLAYED":
            return 1;
        case "EFFECTIVE CLEAR":
            return 2;
        case "EXCESSIVE CLEAR":
            return 3;
        case "MAXXIVE CLEAR":
            return 4;
        case "UC":
            return 5;
        case "PUC":
            return 6;
    }
    return 0;
};

function gradeSort(d) {
    switch (d) {
        case "No Grade":
            return 0;
        case "D":
            return 1;
        case "C":
            return 2;
        case "B":
            return 3;
        case "A":
            return 4;
        case "A+":
            return 5;
        case "AA":
            return 6;
        case "AA+":
            return 7;
        case "AAA":
            return 8;
        case "AAA+":
            return 9;
        case "S":
            return 10;
    }
    return 0;
};

$('#version_select').change(function() {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('version', $('#version_select').val());
    location.search = urlParams;
});

$(document).ready(function() {
    jQuery.fn.dataTableExt.oSort['diff-asc'] = function(a, b) {
        var x = difficultySort(a);
        var y = difficultySort(b);

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    };

    jQuery.fn.dataTableExt.oSort['diff-desc'] = function(a, b) {
        var x = difficultySort(a);
        var y = difficultySort(b);

        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    };

    jQuery.fn.dataTableExt.oSort['grade-asc'] = function(a, b) {
        var x = gradeSort(a);
        var y = gradeSort(b);

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    };

    jQuery.fn.dataTableExt.oSort['grade-desc'] = function(a, b) {
        var x = gradeSort(a);
        var y = gradeSort(b);

        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    };

    jQuery.fn.dataTableExt.oSort['clear-mark-asc'] = function(a, b) {
        var x = markSort(a);
        var y = markSort(b);

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    };

    jQuery.fn.dataTableExt.oSort['clear-mark-desc'] = function(a, b) {
        var x = markSort(a);
        var y = markSort(b);

        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    };

    var profile_data = JSON.parse(document.getElementById("profile-pass").innerText);
    var score_data = JSON.parse(document.getElementById("score-pass").innerText);

    urlParams = new URLSearchParams(window.location.search);
    currentVersion = (urlParams.has('version') && urlParams.get('version') !== "") ? parseInt(urlParams.get('version')) : profile_data[profile_data.length - 1].version
    currentProfile = profile_data.find(p => p.version === currentVersion)

    for (var p of profile_data.sort((a, b) => a.version - b.version)) {
        $('#version_select').append($('<option>', {
            value: p.version,
            text: versionText[p.version],
            selected: (p.version === currentVersion)
        }));
    }

    score_data = score_data.filter(s => currentVersion === s.version).sort(function(a, b) {
        if (a.mid > b.mid) return 1;
        if (a.mid < b.mid) return -1;
        return a.type > b.type ? 1 : -1;
    });

    $.getJSON("static/asset/json/music_db.json", function(json) {
        music_db = json;
        var music_data = [];

        for (var i in score_data) {
            var temp_data = {};
            temp_data.mid = score_data[i].mid;
            temp_data.songname = getSongName(score_data[i].mid);
            temp_data.diff = getDifficulty(score_data[i].mid, score_data[i].type);
            temp_data.score = score_data[i].score;
            temp_data.exscore = ((score_data[i].exscore) ? score_data[i].exscore : 0);
            temp_data.grade = getGrade(score_data[i].grade);
            temp_data.clear = getMedal(score_data[i].clear, currentProfile.version);
            music_data.push(temp_data);
        }

        $('#music_score').DataTable({
            data: music_data,
            columns: [
                { data: 'mid' },
                { data: 'songname' },
                { data: 'diff', "type": "diff" },
                { data: 'score', },
                { data: 'exscore' },
                { data: 'grade', "type": "grade" },
                { data: 'clear', "type": "clear-mark" }
            ],
            columnDefs: [
                {
                  "targets": [4],
                  "visible": currentVersion >= 6
                }
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
