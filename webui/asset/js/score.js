var music_db;

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function getSongName(musicid) {
    var result = music_db["mdb"]["music"].filter(object => object["@id"] == musicid);
    if (result.length == 0) {
        return "Custom Song";
    }
    return result[0]["info"]["title_name"]
}

function getDifficulty(musicid, type) {
    var result = music_db["mdb"]["music"].filter(object => object["@id"] == musicid);
    if (result.length == 0) {
        return "NOV";
    }
    var inf_ver = result[0]["info"]["inf_ver"]["#text"] ? result[0]["info"]["inf_ver"]["#text"] : 5;
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
            return "A+";
        case 6:
            return "AA";
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

function getMedal(clear) {
    switch (clear) {
        case 0:
            return "No Data";
        case 1:
            return "PLAYED";
        case 2:
            return "EFFECTIVE CLEAR";
        case 3:
            return "EXCESSIVE CLEAR";
        case 6:
            return "MAXXIVE CLEAR";
        case 4:
            return "UC";
        case 5:
            return "PUC";
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
    var profile_data = JSON.parse(document.getElementById("data-pass").innerText);
    profile_data = profile_data.sort(function(a, b) {
        if (a.mid > b.mid) return 1;
        if (a.mid < b.mid) return -1;
        return a.type > b.type ? 1 : -1;
    });

    //console.log(profile_data);
    //$('#music_score').DataTable();

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
            '闃': 'Ā'
        }
        music_db = json;
        var music_data = [];


        for (var i in profile_data) {
            var temp_data = {};
            temp_data.mid = profile_data[i].mid;
            temp_data.songname = getSongName(profile_data[i].mid);
            temp_data.songname = temp_data.songname.replace(/[龕釁驩曦齷骭齶彜罇雋鬻鬥鬆曩驫齲騫趁鬮盥隍頽餮黻蔕闃]/g, m => translate_table[m]);
            temp_data.diff = getDifficulty(profile_data[i].mid, profile_data[i].type);
            temp_data.score = profile_data[i].score;
            temp_data.exscore = ((profile_data[i].exscore) ? profile_data[i].exscore : 0);
            temp_data.grade = getGrade(profile_data[i].grade);
            temp_data.clear = getMedal(profile_data[i].clear);
            music_data.push(temp_data);

            // $("#music_score>tbody").append($('<tr>')
            // .append($('<td>').append(getSongName(profile_data[i].mid)))
            // .append($('<td>').append(getDifficulty(profile_data[i].mid,profile_data[i].type)))
            // .append($('<td>').append(profile_data[i].score))
            // .append($('<td>').append((profile_data[i].exscore)? profile_data[i].exscore:0))
            // .append($('<td>').append(getGrade(profile_data[i].grade)))
            // .append($('<td>').append(getMedal(profile_data[i].clear)))
            // );
            // getSongName(1);
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
