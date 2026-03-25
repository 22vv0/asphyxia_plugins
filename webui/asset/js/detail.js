var music_db, course_db, score_db, data_db, appeal_db, skill_title_db, skill_title_db_inf;
var volforceArray = [];
var profile_data, skill_data, course_data;
var baseTBodyCMpD, baseTBodyCMpL, baseTBodyGpD, baseTBodyGpL, baseTBodyASpL;
var notFirst = false;
var versionText = ['', 'BOOTH', 'INFINTE INFECTION', 'GRAVITY WARS', 'HEAVENLY HAVEN', 'VIVIDWAVE', 'EXCEED GEAR', '∇']
var currentProfile
var currentVersion
var egLevelDiffOverride = [
    {'mid': 1, 'type': 1, 'lvl': 10},
    {'mid': 18, 'type': 1, 'lvl': 8},
    {'mid': 18, 'type': 2, 'lvl': 10},
    {'mid': 73, 'type': 2, 'lvl': 17},
    {'mid': 48, 'type': 1, 'lvl': 8},
    {'mid': 75, 'type': 2, 'lvl': 12},
    {'mid': 124, 'type': 2, 'lvl': 16},
    {'mid': 65, 'type': 1, 'lvl': 7},
    {'mid': 66, 'type': 1, 'lvl': 8},
    {'mid': 27, 'type': 1, 'lvl': 7},
    {'mid': 27, 'type': 2, 'lvl': 12},
    {'mid': 68, 'type': 1, 'lvl': 9},
    {'mid': 6, 'type': 1, 'lvl': 7},
    {'mid': 6, 'type': 2, 'lvl': 12},
    {'mid': 16, 'type': 1, 'lvl': 7},
    {'mid': 2, 'type': 1, 'lvl': 10},
    {'mid': 60, 'type': 3, 'lvl': 17},
    {'mid': 5, 'type': 2, 'lvl': 13},
    {'mid': 128, 'type': 2, 'lvl': 13},
    {'mid': 9, 'type': 2, 'lvl': 1},
    {'mid': 340, 'type': 2, 'lvl': 13},
    {'mid': 247, 'type': 3, 'lvl': 18},
    {'mid': 282, 'type': 2, 'lvl': 17},
    {'mid': 288, 'type': 2, 'lvl': 13},
    {'mid': 699, 'type': 3, 'lvl': 18},
    {'mid': 595, 'type': 2, 'lvl': 17},
    {'mid': 507, 'type': 2, 'lvl': 17},
    {'mid': 1044, 'type': 2, 'lvl': 16},
    {'mid': 948, 'type': 4, 'lvl': 16},
    {'mid': 1115, 'type': 4, 'lvl': 16},
    {'mid': 1215, 'type': 2, 'lvl': 15},
    {'mid': 1152, 'type': 2, 'lvl': 15},
    {'mid': 1282, 'type': 3, 'lvl': 18},
    {'mid': 1343, 'type': 2, 'lvl': 16},
    {'mid': 1300, 'type': 3, 'lvl': 18},
    {'mid': 1938, 'type': 2, 'lvl': 18}
]

var boothRank = [
    {'exp': 0, 'title': '名も無き草'},
    {'exp': 30, 'title': '若芽'},
    {'exp': 100, 'title': '樹葉'},
    {'exp': 180, 'title': '新緑'},
    {'exp': 300, 'title': '桜花'},
    {'exp': 450, 'title': '睡蓮'},
    {'exp': 700, 'title': '桔梗'},
    {'exp': 950, 'title': '雪月花'},
    {'exp': 1200, 'title': '小雨'},
    {'exp': 1600, 'title': '霧雨'},
    {'exp': 2100, 'title': '村雨'},
    {'exp': 2700, 'title': '時雨'},
    {'exp': 3250, 'title': '彩雲'},
    {'exp': 3800, 'title': '紫雲'},
    {'exp': 4350, 'title': '暁雲'},
    {'exp': 4900, 'title': '金剛雲'},
    {'exp': 5250, 'title': '蒼空'},
    {'exp': 5600, 'title': '天空'},
    {'exp': 6000, 'title': '絶空'},
    {'exp': 6500, 'title': '虚空'}
]

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;
    arr.fill(0);
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}


function getSkillAsset(skill) {
    return "static/asset/skill_lv/skill_" + ((skill === -1) ? 'none' : zeroPad(skill, 2)) + ".png";
}

function getSkillFrameAsset(frame) {
    return "static/asset/skill_lv/skill_frame_" + frame + ".png";
}

function getSkillTitle() {
    let sk = skill_data.filter(sk => sk.version === currentVersion)
    let titles = (currentVersion === 2) ? skill_title_db_inf : skill_title_db
    if(sk.length <= 0 || sk[0].name === (undefined || (currentVersion === 2 ? -1 : 0))) return ''
    return titles.filter(e => e.id === sk[0].name)[0].name
}

function getGrade(name, grade) {
    if(name) { 
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
    switch (grade) {
        case 0:
            return 0;
        case 1:
            return 0.80;
        case 2:
            return 0.82;
        case 3:
            return 0.85;
        case 4:
            return 0.88;
        case 5:
            return 0.91;
        case 6:
            return 0.94;
        case 7:
            return 0.97;
        case 8:
            return 1.00;
        case 9:
            return 1.02;
        case 10:
            return 1.05;
    }
}

function getMedal(name, clear, version) {
    if(name) {
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
    switch (clear) {
        case 0:
            return 0;
        case 1:
            return 0.5;
        case 2:
            return 1.0;
        case 3:
            return 1.02;
        case 4:
            return (version === 6) ? 1.05 : 1.04;
        case 5:
            return (version === 6) ? 1.10 : 1.06;
        case 6:
            return (version === 6) ? 1.04 : 1.10;
    }
}

function getDifficulty(musicid, type) {
    var result = music_db.filter(object => object["id"] == musicid);
    if (result.length == 0) {
        return "Unknown";
    }
    var inf_ver = result[0]["info"]["inf_ver"] ? result[0]["info"]["inf_ver"] : 5;
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
                        return "XCD"
                }
            }
        case 4:
            return "MXM";
        case 5:
            return "ULT";
    }
}

function getDifficultyNum(musicid, type) {
    let diffLbl = ['novice', 'advanced', 'exhaust', 'infinite', 'maximum', 'ultimate']
    var result = music_db.filter(object => object["id"] == musicid);
    if(Object.keys(result[0]['difficulty'][currentVersion]).includes(diffLbl[type])) {
        return result[0]['difficulty'][currentVersion][diffLbl[type]]
    } else if(Object.keys(result[0]['difficulty'][0]).includes(diffLbl[type])) {
        return result[0]['difficulty'][0][diffLbl[type]]
    } else return 0
}

function getAppealCard(appeal, version) {
    var result = appeal_db["appeal_card_data"]["card"].filter(object => object["@id"] == appeal);
    return "static/asset/ap_card/" + ((result.length > 0) ? result[0]["info"]["texture"] : 'ap' + (version > 1 ? '_' + zeroPad(version, 2) : '') + '_0001') + ".png"
}

function getSongLevel(musicid, type) {
    //console.log(music_db["mdb"]["music"])
    // console.log(musicid + " " + type);
    // console.log(musicid)
    var result = music_db.filter(object => object["id"] == musicid);
    // console.log(result[0]["difficulty"]["novice"]["difnum"])
    if (result.length == 0) {
        return "1"
    }

    var diffnum = getDifficultyNum(musicid, type);

    if (diffnum == 0) {
        diffnum = 1;
    }
    if (currentVersion < 7) {
        diffnum = parseInt(diffnum).toString()
        let egLvlInd = egLevelDiffOverride.findIndex(l => l.mid === musicid && l.type === type)
        if (egLvlInd >= 0) diffnum = egLevelDiffOverride[egLvlInd]['lvl']
    }

    // console.log(diffnum)
    return diffnum;
    // return result[0]["info"]["title_name"]
    //console.log(result);
}

function getVFLevel(VF) {
    // console.log(VF);
    switch (true) {
        case VF < 10:
            return zeroPad(1, 2);
        case VF < 12:
            return zeroPad(2, 2);
        case VF < 14:
            return zeroPad(3, 2);
        case VF < 15:
            return zeroPad(4, 2);
        case VF < 16:
            return zeroPad(5, 2);
        case VF < 17:
            return zeroPad(6, 2);
        case VF < 18:
            return zeroPad(7, 2);
        case VF < 19:
            return zeroPad(8, 2);
        case VF < 20:
            return zeroPad(9, 2);
        case VF >= 20:
            return zeroPad(10, 2);
    }
}

function getSongInfo(mid) {
    let mss = music_db.find(m => parseInt(m['id']) === mid)
    
    if(mss === undefined) {
        return {
            'id': mid,
            'name': 'Unknown Song'
        }
    }
    return {
        'id': mss['id'],
        'name': mss.info.title_name
    }
}

function getAkaname(akaname) {
    //var result = music_db["mdb"]["music"].filter(object => object["@id"] == musicid);
    var result = data_db["akaname"].filter(obj => obj["value"] == akaname)[0];
    // console.log(result);
    return result["name"];
}

function getVFAsset(vf) {
    var floatVF = parseFloat(vf);
    return "static/asset/force/em6_" + getVFLevel(floatVF) + "_i_eab.png"
}

function singleScoreVolforce(score) {
    // lv * (score / 10000000) * gradeattr * clearmedalattr * 2
    var level = getSongLevel(score.mid, score.type);
    var tempVF = parseInt(level) * (parseInt(score.score) / 10000000) * getGrade(false, score.grade) * getMedal(false, score.clear, score.version) * 2;
    // console.log(tempVF);
    if(currentVersion === 7 && 'volforce' in score) tempVF = score.volforce;
    return tempVF;
}

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function calculateVolforce() {
    for (var sc of score_db.filter(s => s.version === currentVersion)) {
        var temp = singleScoreVolforce(sc);
        temp = parseFloat(toFixed(temp, 1));
        volforceArray.push(temp);
    }
    volforceArray.sort(function(a, b) { return b - a });
    // console.log(volforceArray);
    var VF = 0;
    if (volforceArray.length > 50) {
        for (var i = 0; i < 50; i++) {
            VF += volforceArray[i];
        }
    } else {
        for (var i = 0; i < volforceArray.length; i++) {
            VF += volforceArray[i];
        }
    }
    VF /= (currentVersion === 7) ? 1000 : 100;
    // console.log(toFixed(VF, 3));
    return toFixed(VF, 3);
}

function getVF50() {
    if(currentVersion <= 3) {
        return $('#vf50').remove()
    }
    let top50 = []
    for (var sc of score_db.filter(sc => sc.version === currentVersion)) {
        let sinf = getSongInfo(sc.mid)
        if(sinf.name !== 'Unknown Song') {
            top50.push({
                'name': sinf.name,
                'diff': getDifficulty(sinf.id, sc.type) + " " + getDifficultyNum(sinf.id, sc.type),
                'clear': getMedal(true, sc.clear, currentVersion),
                'score': sc.score,
                'vf': parseFloat(toFixed(singleScoreVolforce(sc, currentVersion), 1))
            })
        }
    }
    top50.sort(function(a, b) { return b.vf - a.vf });
    if(top50.length > 50) top50 = top50.slice(0, 50)
    for(let i in top50) top50[i]['num'] = parseInt(i)+1 
    $('#volforce50').DataTable({
        data: top50,
        order: [],
        pageLength: 50,
        searching: false,
        lengthChange: false,
        columns: [
            { data: 'num' },
            { data: 'name' },
            { data: 'diff' },
            { data: 'clear', },
            { data: 'score' },
            { data: 'vf' },
        ]
    });
}

var diffName = ["NOV", "ADV", "EXH", "INF\nGRV\nHVN\nVVD\nXCD", "MXM", "ULT"];

function preSetTableMark(type) {
    $('#statistic-table').empty();
    $('#statistic-table').append(
        $('<thead>').append(
            $('<tr>').append(
                $('<th>').append(
                    type
                )
            ).append(
                $('<th>').append(
                    "Played"
                )
            ).append(
                $('<th>').append(
                    currentVersion >= 2 ? "EFFECTIVE CLEAR" : 'CLEAR'
                )
            ).append(
                $('<th>').append(
                    currentVersion >= 2 ? "EXCESSIVE CLEAR" : 'UC'
                )
            ).append(
                currentVersion < 6 ? null :
                $('<th>').append(
                    "MAXXIVE CLEAR"
                )
            ).append(
                $('<th>').append(
                    currentVersion >= 2 ? "UC" : "PUC"
                )
            ).append(
                currentVersion < 2 ? null :
                $('<th>').append(
                    currentVersion >= 2 ? "PUC" : "EXCESSIVE CLEAR"
                )
            )
        )
    )
}

function preSetTableGrade(type) {
    $('#statistic-table').empty();
    $('#statistic-table').append(
        $('<thead>').append(
            $('<tr>').append(
                $('<th>').append(
                    type
                )
            ).append(
                $('<th>').append(
                    "D"
                )
            ).append(
                $('<th>').append(
                    "C"
                )
            ).append(
                $('<th>').append(
                    "B"
                )
            ).append(
                $('<th>').append(
                    "A"
                )
            ).append(
                $('<th>').append(
                    currentVersion >= 4 ? "A+" : "AA"
                )
            ).append(
                $('<th>').append(
                    currentVersion >= 4 ? "AA" : "AAA"
                )
            ).append(
                currentVersion < 4 ? null :
                $('<th>').append(
                    "AA+"
                )
            ).append(
                currentVersion < 4 ? null :
                $('<th>').append(
                    "AAA"
                )
            ).append(
                currentVersion < 4 ? null :
                $('<th>').append(
                    "AAA+"
                )
            ).append(
                currentVersion < 4 ? null :
                $('<th>').append(
                    "S"
                )
            )
        )
    )
}

function preSetTableAvg(type) {
    $('#statistic-table').empty();
    $('#statistic-table').append(
        $('<thead>').append(
            $('<tr>')
            .append($('<th>').append(type))
            .append($('<th>').append('Average Score'))
        )
    );
}


function setCMpD() {
    if ($('[name="cmpd"]').hasClass('is-active') && notFirst) {
        return;
    }
    $('[name="cmpd"]').addClass('is-active');
    $('[name="cmpl"]').removeClass('is-active');
    $('[name="gpd"]').removeClass('is-active');
    $('[name="gpl"]').removeClass('is-active');
    $('[name="aspl"]').removeClass('is-active');
    notFirst = true;

    $('#statistic-table').fadeOut(200, function() {
        preSetTableMark("Difficulty");
        $('#statistic-table').append(baseTBodyCMpD)
            .removeClass("is-narrow")
            .css('width', '45%');
        $('#statistic-table').fadeIn(200);
    })
}

function setCMpL() {
    if ($('[name="cmpl"]').hasClass('is-active')) {
        return;
    }
    $('[name="cmpd"]').removeClass('is-active');
    $('[name="cmpl"]').addClass('is-active');
    $('[name="gpd"]').removeClass('is-active');
    $('[name="gpl"]').removeClass('is-active');
    $('[name="aspl"]').removeClass('is-active');

    $('#statistic-table').fadeOut(200, function() {
        preSetTableMark("Level");
        //var tableBody = $('#tbodyin');
        $('#statistic-table').append(baseTBodyCMpL)
            .removeClass("is-narrow")
            .css('width', '45%');
        $('#statistic-table').fadeIn(200);
    })
}

function setGpD() {
    if ($('[name="gpd"]').hasClass('is-active')) {
        return;
    }
    $('[name="cmpd"]').removeClass('is-active');
    $('[name="cmpl"]').removeClass('is-active');
    $('[name="gpd"]').addClass('is-active');
    $('[name="gpl"]').removeClass('is-active');
    $('[name="aspl"]').removeClass('is-active');

    $('#statistic-table').fadeOut(200, function() {
            preSetTableGrade("Difficulty");
            $('#statistic-table').append(baseTBodyGpD)
                .removeClass("is-narrow")
                .css('width', '45%');
            $('#statistic-table').fadeIn(200);
        })
        //$('#statistic-table').empty();
}

function setGpL() {
    if ($('[name="gpl"]').hasClass('is-active')) {
        return;
    }
    $('[name="cmpd"]').removeClass('is-active');
    $('[name="cmpl"]').removeClass('is-active');
    $('[name="gpd"]').removeClass('is-active');
    $('[name="gpl"]').addClass('is-active');
    $('[name="aspl"]').removeClass('is-active');
    $('#statistic-table').fadeOut(200, function() {
            preSetTableGrade("Level");
            $('#statistic-table').append(baseTBodyGpL)
                .removeClass("is-narrow")
                .css('width', '45%');
            $('#statistic-table').fadeIn(200);
        })
        //$('#statistic-table').empty();
}

function setASpL() {
    if ($('[name="aspl"]').hasClass('is-active')) {
        return;
    }
    $('[name="cmpd"]').removeClass('is-active');
    $('[name="cmpl"]').removeClass('is-active');
    $('[name="gpd"]').removeClass('is-active');
    $('[name="gpl"]').removeClass('is-active');
    $('[name="aspl"]').addClass('is-active');
    $('#statistic-table').fadeOut(200, function() {
            preSetTableAvg('Level');
            $('#statistic-table').append(baseTBodyASpL)
                .addClass("is-narrow")
                .css('width', '30%');
            $('#statistic-table').fadeIn(200);
        })
        //$('#statistic-table').empty();
}


function getAvg(array, lv) {
    if (array[lv - 1][0] == 0) {
        return 0;
    } else {
        return parseInt(array[lv - 1][1] / array[lv - 1][0]);
    }
}


function setUpStatistics(profileVer) {
    baseTBodyCMpD = $('<tbody>');
    baseTBodyCMpL = $('<tbody>');
    baseTBodyGpL = $('<tbody>');
    baseTBodyGpD = $('<tbody>');
    baseTBodyASpL = $('<tbody>');

    let matLen = {
        cmpd: [[3,4], [4,5], [4,5], [6,6], [6,6], [6,6], [6,6]][currentVersion-1],
        cmpl: [[15,4], [16,5], [16,5], [20,6], [20,6], [20,6], [48,6]][currentVersion-1],
        gpd: [[3,6], [4,6], [4,6], [6,10], [6,10], [6,10], [6,10]][currentVersion-1],
        gpl: [[15,6], [16,6], [16,6], [20,10], [20,10], [20,10], [48,10]][currentVersion-1],
        aspl: [[15,2], [16,2], [16,2], [20,2], [20,2], [20,2], [48,2]][currentVersion-1]
    }

    var CMpDArray = createArray(matLen['cmpd'][0], matLen['cmpd'][1]);
    var CMpLArray = createArray(matLen['cmpl'][0], matLen['cmpl'][1]);
    var GpDArray = createArray(matLen['gpd'][0], matLen['gpd'][1]);
    var GpLArray = createArray(matLen['gpl'][0], matLen['gpl'][1]);
    var ASpLArray = createArray(matLen['aspl'][0], matLen['aspl'][1]);

    let diffLvArr = (currentVersion < 7) ? [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,17.5,18.0,18.1,18.2,18.3,18.4,18.5,18.6,18.7,18.8,18.9,19.0,19.1,19.2,19.3,19.4,19.5,19.6,19.7,19.8,19.9,20.0,20.1,20.2,20.3,20.4,20.5,20.6,20.7,20.8,20.9]

    score_db.filter(sc => sc.version === profileVer).forEach(function(currentValue, index, array) {
        let egClear = [0, 1, 2, 3, 5, 6, 4]
        let clearMark = (profileVer === 6) ? egClear[currentValue.clear] : currentValue.clear
        // console.log(currentValue);
        CMpDArray[currentValue.type][clearMark - 1] += 1;
        CMpLArray[diffLvArr.findIndex(lv => lv === parseFloat(getSongLevel(currentValue.mid, currentValue.type)))][clearMark - 1] += 1;
        GpDArray[currentValue.type][currentValue.grade - 1]++;
        GpLArray[diffLvArr.findIndex(lv => lv === parseFloat(getSongLevel(currentValue.mid, currentValue.type)))][currentValue.grade - 1] += 1;
        ASpLArray[diffLvArr.findIndex(lv => lv === parseFloat(getSongLevel(currentValue.mid, currentValue.type)))][0] += 1;
        ASpLArray[diffLvArr.findIndex(lv => lv === parseFloat(getSongLevel(currentValue.mid, currentValue.type)))][1] += currentValue.score;
    });

    // console.log(CMpDArray);
    // console.log(CMpLArray);
    // console.log(GpDArray);
    // console.log(GpLArray);
    // console.log(ASpLArray);
    for (var diff = 0; diff < matLen['cmpd'][0]; diff++) {
        baseTBodyCMpD.append(
            $('<tr>').append(
                $('<th>').append(
                    diffName[diff]
                )
            ).append(
                (0 >= matLen['cmpd'][1]) ? null :
                $('<td>').append(
                    CMpDArray[diff][0]
                )
            ).append(
                (1 >= matLen['cmpd'][1]) ? null :
                $('<td>').append(
                    CMpDArray[diff][1]
                )
            ).append(
                (2 >= matLen['cmpd'][1]) ? null :
                $('<td>').append(
                    currentVersion === 2 ? CMpDArray[diff][4] : CMpDArray[diff][2]
                )
            ).append(
                (3 >= matLen['cmpd'][1]) ? null :
                $('<td>').append(
                    currentVersion === 2 ? CMpDArray[diff][2] : CMpDArray[diff][3]
                )
            ).append(
                (4 >= matLen['cmpd'][1]) ? null :
                $('<td>').append(
                    currentVersion === 2 ? CMpDArray[diff][3] : CMpDArray[diff][4]
                )
            ).append(
                (5 >= matLen['cmpd'][1]) ? null :
                $('<td>').append(
                    CMpDArray[diff][5]
                )
            )
        )
    }
    for (var lv = 0; lv < matLen['cmpl'][0]; lv++) {
        baseTBodyCMpL.append(
            $('<tr>').append(
                $('<th>').append(
                    diffLvArr[lv]
                )
            ).append(
                (0 >= matLen['cmpl'][1]) ? null :
                $('<td>').append(
                    CMpLArray[lv][0]
                )
            ).append(
                (1 >= matLen['cmpl'][1]) ? null :
                $('<td>').append(
                    CMpLArray[lv][1]
                )
            ).append(
                (2 >= matLen['cmpl'][1]) ? null :
                $('<td>').append(
                    currentVersion === 2 ? CMpLArray[lv][4] : CMpLArray[lv][2]
                )
            ).append(
                (3 >= matLen['cmpl'][1]) ? null :
                $('<td>').append(
                    currentVersion === 2 ? CMpLArray[lv][2] : CMpLArray[lv][3]
                )
            ).append(
                (4 >= matLen['cmpl'][1]) ? null :
                $('<td>').append(
                    currentVersion === 2 ? CMpLArray[lv][3] : CMpLArray[lv][4]
                )
            ).append(
                (5 >= matLen['cmpl'][1]) ? null :
                $('<td>').append(
                    CMpLArray[lv][5]
                )
            )
        )
    }
    for (var diff = 0; diff < matLen['gpd'][0]; diff++) {
        baseTBodyGpD.append(
            $('<tr>').append(
                $('<th>').append(
                    diffName[diff]
                )
            ).append(
                (0 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][0]
                )
            ).append(
                (1 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][1]
                )
            ).append(
                (2 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][2]
                )
            ).append(
                (3 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][3]
                )
            ).append(
                (4 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][4]
                )
            ).append(
                (5 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][5]
                )
            ).append(
                (6 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][6]
                )
            ).append(
                (7 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][7]
                )
            ).append(
                (8 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][8]
                )
            ).append(
                (9 >= matLen['gpd'][1]) ? null :
                $('<td>').append(
                    GpDArray[diff][9]
                )
            )
        )
    }

    for (var lv = 0; lv < matLen['gpl'][0]; lv++) {
        baseTBodyGpL.append(
            $('<tr>').append(
                $('<th>').append(
                    diffLvArr[lv]
                )
            ).append(
                (0 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][0]
                )
            ).append(
                (1 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][1]
                )
            ).append(
                (2 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][2]
                )
            ).append(
                (3 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][3]
                )
            ).append(
                (4 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][4]
                )
            ).append(
                (5 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][5]
                )
            ).append(
                (6 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][6]
                )
            ).append(
                (7 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][7]
                )
            ).append(
                (8 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][8]
                )
            ).append(
                (9 >= matLen['gpl'][1]) ? null :
                $('<td>').append(
                    GpLArray[lv][9]
                )
            )
        )
    }
    for (var lv = 0; lv < matLen['aspl'][0]; lv++) {
        baseTBodyASpL.append(
            $('<tr>').append(
                $('<th>').append(
                    diffLvArr[lv]
                )
            )
            .append(
                $('<td>').append(
                    getAvg(ASpLArray, lv+1)
                )
            )
        );
    }
}

$('#version_select').change(function() {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('version', $('#version_select').val());
    location.search = urlParams;
});

function getPlayerSkill() {
    // console.log(getPlayerMaxVersion())
    var k = skill_data.filter(e => e.version === currentVersion)
    console.log(k)
    if (k.length === 0) return currentVersion === 2 ? [-1, 0] : [0, 0];
    if (k[0].version === 2) {
        let cData = course_data.filter(c => c.version === currentVersion && ![15,16,17].includes(c.sid))
        let frameV = cData.length > 0 ? Math.max(...cData.map(c => c.cid)) : -1;
        return [frameV, k[0].name + 1]
    }
    if(k.length < 1) return [-1, 0]
    let courseDataFil = course_data.filter(e => e.version == currentVersion && ![6,7,12,13,15,16].includes(e.sid) && e.cid === k[0].level && ((k[0].type !== undefined) ? k[0].type : 0) === ((e.stype !== undefined) ? e.stype : 0))
    return [(courseDataFil.length > 0) ? k[0].level : -1, (k[0].type !== undefined) ? k[0].type : 0];
}

function getPlayerCourse(playerSkill) {
    if(currentVersion === 0) return 'none'
    let skillFrame = ['normal', 'god']
    let skillThrsh = [[130, 150, 160, 170], [150, 160, 170, 180]]
    let skillThrshVal = (playerSkill[0] <= 9) ? 0 : playerSkill[0] - 9
    var k = course_db.courseData.filter(e => e.version == currentVersion)[0]
    if(!k) return 'none'
    let sidCourses = []
    k.info.forEach(kd => {
        kd.courses.forEach(kdc => {
            kdc['sid'] = kd.id
            kdc['isNew'] = kd.isNew
            sidCourses.push(kdc)
        })
    })
    sidCourses = sidCourses.filter(e => ![6,7,12,13,15,16].includes(e.sid) && e.level === playerSkill[0])
    let newCourses = sidCourses.filter(e => e.isNew === 1).map(a => a.sid)
    let foundCourses = course_data.filter(e => e.cid === playerSkill[0] && ((e.stype !== undefined) ? e.stype : 0) === playerSkill[1] && e.clear >= 2)
    let newCompleteCourses = foundCourses.filter(e => newCourses.includes(e.sid))
    let thrshCourses = foundCourses.filter(e => Math.floor(e.rate/100) >= skillThrsh[playerSkill[1]][skillThrshVal])

    if(sidCourses.length > 0 && thrshCourses.length === sidCourses.length) return skillFrame[playerSkill[1]] + '_sp'
    if(sidCourses.length > 0 && foundCourses.length === sidCourses.length) return skillFrame[playerSkill[1]] + '_gold'
    if(newCompleteCourses.length > 1) return skillFrame[playerSkill[1]] + '_silver'
    if(foundCourses.length > 1 && playerSkill[1] === 1) return skillFrame[playerSkill[1]] + '_sp_none'
    return 'none'
}


function getVersionSelect() {
    if (profile_data.length == 0) return [];
    var versionDATA = [];
    for (var i = 0; i < profile_data.length; i++) {
        versionDATA.push(parseInt(profile_data[i].version));
    }
    return versionDATA;
}

function displayArenaSeasonData(season) {
    let sznData = arena_data.find(e => e.season === parseInt(season))
    if(sznData !== undefined) {
        let rankInfo = getArenaRank(sznData.rankPoint)
        $('.arena-details').append(
            $('<div class="tile is-parent is-7">').append(
                $('<article class="tile is-child arena-details-child-left">').append(
                    $('<img>', {
                        src: 'static/asset/arena_rank/' + rankInfo[0] + ".png"
                    })
                )
            )
        ).append(
            $('<div class="tile is-parent is-5" style="position:relative">').append(
                $('<article class="tile is-child arena-details-child-right">').append(
                    $('<p class="title" style="font-family: testfont">Arena Power</p>').append(
                        $('<div class="content">' + sznData.shopPoint + ' AP </div>')
                    )
                ).append(
                    (sznData.megamixRate !== (0 || undefined)) ? $('<p class="title" style="font-family: testfont">Ultimate Rate</p>').append(
                        $('<div class="content">' + sznData.ultimateRate + ' </div>')
                    ) : $('<p class="title" style="font-family: testfont">Megamix Rate</p>').append(
                        $('<div class="content">' + sznData.megamixRate + ' <img style="width:20px" src="static/asset/arena_rank/mixstar.png"></p></div>')
                    )
                )
            )
        )

        if(sznData.rankPoint >= 23600) {
            $('.arena-details-child-right').append(
                $('<p class="title" style="font-family: testfont">Rank Point</p>').append(
                    $('<div class="content">' + sznData.rankPoint + ' points</div>')
                )
            )
        }

        if(sznData.rankPoint !== 0 && sznData.rankPoint < 27800) {
            $('.arena-details-child-left').append(
                $('<meter id="rank-point-mtr" style="width:80%" min="' + rankInfo[1] + '"max="' + ((rankInfo[2] !== undefined) ? rankInfo[2].point : rankInfo[1]) + '" value="' + sznData.rankPoint + '"></meter>')
            ).append(
                    $('<h5 style="font-family: testfont">' + sznData.rankPoint + ' points <br>(' + (rankInfo[2].point - sznData.rankPoint) + ' points to ' + rankInfo[2].rank.toUpperCase() + ')</h5>')
                )
        }
    }
}

function getArenaRank(rp) {
    let arenaRanksList = [
        { rank: 'none', point: 0 },
        { rank: 'd4', point: 1 },
        { rank: 'd3', point: 600 },
        { rank: 'd2', point: 1600 },
        { rank: 'd1', point: 2600 },
        { rank: 'c4', point: 3600 },
        { rank: 'c3', point: 4700 },
        { rank: 'c2', point: 5800 },
        { rank: 'c1', point: 6900 },
        { rank: 'b4', point: 8000 },
        { rank: 'b3', point: 9200 },
        { rank: 'b2', point: 10400 },
        { rank: 'b1', point: 11600 },
        { rank: 'a4', point: 12800 },
        { rank: 'a3', point: 14100 },
        { rank: 'a2', point: 15400 },
        { rank: 'a1', point: 16700 },
        { rank: 's4', point: 18000 },
        { rank: 's3', point: 19400 },
        { rank: 's2', point: 20800 },
        { rank: 's1', point: 22200 },
        { rank: 'u4', point: 23600 },
        { rank: 'u3', point: 25000 },
        { rank: 'u2', point: 26400 },
        { rank: 'u1', point: 27800 }
    ]

    let prevRank = ''
    let rankIndex = 0
    let rankPointMin = 0
    let rankPointNext = 0
    arenaRanksList.forEach(rank => {
        if(rp >= rank.point) {
            prevRank = rank.rank
            rankPointMin = rank.point
            rankNext = arenaRanksList[rankIndex + 1]
        }
        rankIndex++;
    })
    return [prevRank, rankPointMin, rankNext]
}

$(document).ready(function() {
    profile_data = JSON.parse(document.getElementById("data-pass").innerText);
    score_db = JSON.parse(document.getElementById("score-pass").innerText);
    skill_data = JSON.parse(document.getElementById("skill-pass").innerText);
    course_data = JSON.parse(document.getElementById("course-pass").innerText);
    arena_data = JSON.parse(document.getElementById("arena-pass").innerText);

    skill_data.sort(function(a, b) {
        return b.version - a.version;
    })

    profile_data = profile_data.sort((a, b) => a.version - b.version)

    let urlParams = new URLSearchParams(window.location.search);
    currentVersion = (urlParams.has('version') && urlParams.get('version') !== "") ? parseInt(urlParams.get('version')) : profile_data[profile_data.length - 1].version
    currentProfile = profile_data.find(p => p.version === currentVersion)


    $.when(
        $.getJSON("static/asset/json/music_db.json", function(json) {
            music_db = json.mdb.music;
            // console.log(music_db);
        }),
        $.getJSON("static/asset/json/course_data.json", function(json) {
            course_db = json;
        }),
        $.getJSON("static/asset/json/data.json", function(json) {
            data_db = json;
        }),
        $.getJSON("static/asset/json/appeal.json", function(json) {
            appeal_db = json;
            //console.log(appeal_db);
        }),
        $.getJSON("static/asset/json/customize_data_ext.json", function(json) {
            skill_title_db = json.skilltitle;
            skill_title_db_inf = json.skilltitle2;
        }),
    ).then(function() {
        var currentVF = calculateVolforce();
        getVF50()
        var maxVer = skill_data.length > 0 ? parseInt(skill_data[0]["version"]) : 0

        var versionInfo = getVersionSelect();
        if(versionInfo.length <= 0) {
            $('#version_select').append(
                $('<option>', {
                    value: 0,
                    text: 'No data found',
                })
            )
            $('#version_select').attr('disabled', 'disabled')
        } else {
            for (var i = 0; i < versionInfo.length; i++) {
                $('#version_select').append(
                    $('<option>', {
                        value: versionInfo[i],
                        text: versionText[versionInfo[i]],
                        selected: (versionInfo[i] === currentVersion)
                    })
                )
            }
        }

        // console.log(currentProfile)
        $('#test').append(
            $('<div class="card" style="padding-bottom:30px">').append(
                $('<div class="card-header">').append(
                    $('<p class="card-header-title">').append(
                        $('<span class="icon">').append(
                            $('<i class="mdi mdi-account-edit">')
                        )
                    ).append("Basic Data")
                )
            ).append(
                $('<div class="card-content">').append(
                    $('<div class="tile is-ancestor is-centered">').append(
                        $('<div class="tile is-parent is-3">').append(
                            $('<article class="tile is-child">').append(
                                $('<img>').attr('src', getAppealCard(currentProfile.appeal, currentProfile.version))
                                .css('width', '150px')
                            ).css('vertical-align', 'middle')
                        )
                    ).append(
                        $('<div class="tile is-parent is-6">').append(
                            $('<article class="tile is-child">').append(
                                $('<div>').append(
                                    $('<div>').append("Player Name:").css('font-size', '20px').append($('<br>'))
                                ).append(
                                    $('<div>').append(currentProfile["name"]).css('font-size', "35px")
                                ).append(
                                    currentVersion <= 3 ? null : $('<div>').append("Appeal Title:").css('font-size', '20px')
                                ).append(
                                    currentVersion <= 3 ? null : $('<div>').append(getAkaname(currentProfile["akaname"])).css('font-size', "35px")
                                )
                                .css('font-family', "testfont,ffff")
                            )
                        )
                    ).append(
                        $('<div class="tile is-parent is-3">').append(
                            $('<article class="tile is-child is-centered">').append(
                                $('<div>').append(
                                    (currentVersion === 1) ? "Rank:" :
                                    (currentVersion >= 5) ? $('<img>').attr('src', getVFAsset(currentVF)).css('width', '7em')
                                    .css('margin', '0 auto') :
                                    null
                                ).css('font-size', '20px').append(
                                    $('<div>').append(
                                        (currentVersion === 1) ? boothRank[boothRank.findIndex((val, ind, arr) => ind < arr.length - 1 && currentProfile.expPoint >= val.exp && currentProfile.expPoint <= arr[ind + 1].exp)].title : 
                                        (currentVersion >= 5) ? currentVF :
                                        null
                                    ).css('font-family', "testfont")
                                    .css('font-size', "35px")
                                    .css('text-align', 'center')
                                )
                                .css('vertical-align', 'middle')
                                .css('min-height', '100%')
                                .css('height', '100%')
                            ).css('font-family', "testfont,ffff")
                        )
                    )
                ).append(
                    $('<div>').append(
                        
                    ).append(
                        
                    ).append(
                        
                    ).css("display", "table")
                    .css('width', '100%')
                    .css('text-align', 'left')
                ).css('width', '100%')
            ).css('vertical-align', 'top')
            .css('max-width', '100%')
            .append(
                $('<div class="card-content">').append(
                    $('<div class="tile is-ancestor">').append(
                        $('<div class="tile is-parent is-7">').append(
                            $('<article class="tile is-child">').append(
                                currentVersion === 1 ? null :
                                $('<div class="content" style="position: relative;display: flex;justify-content: center;align-items: center;">').append(
                                    $('<img id="skillLV">').attr('src', getSkillAsset(getPlayerSkill()[0]))
                                ).append(
                                    $('<div style="position:absolute;width:100%;height:100%display: flex;justify-content: center;align-items: center;">').append(
                                        $('<img id="skillFrame" style="height:100%">')
                                    )
                                ).append(
                                    $('<div style="position:absolute;padding-left:20px;width:100%;height:100%;display: flex;justify-content: center;align-items: center;">').append(
                                        $('<p id="skillTitle"></p>')
                                    )
                                )
                            )
                        )
                    ).append(
                        $('<div class="tile is-parent is-5">').append(
                            $('<article class="tile is-child">').append(
                                $('<p class="title">').append(
                                    (currentProfile.version === 6) ? "PCB" : "BLC / PC"
                                ).append(
                                    $('<div class="content">').append(
                                        (currentProfile.version === 6) ? currentProfile.blocks : currentProfile.blocks + " / " + currentProfile.packets
                                    )
                                ).css('font-family', "testfont") 
                            )
                        )
                    ).css('vertical-align', 'middle')
                )
            )
        ).append(
            currentVersion !== 6 ? null :
            $('<div class="card">').append(
                $('<div class="card-header">').append(
                    $('<p class="card-header-title">').append(
                        $('<span class="icon">').append(
                            $('<i class="mdi mdi-pulse">')
                        )
                    ).append("Arena Stats")
                )
            ).append(
                $('<div class="card-content">').append(
                    $('<div class="tile is-ancestor">').append(
                        $('<div class="tile is-parent">').append(
                            $('<div class="tile is-child field">').append(
                                $('<div class="control">').append(
                                    $('<div class="select">').append(
                                        $('<select id="arena-szn-sel">')
                                    )
                                )
                            )
                        )
                    ).css('vertical-align', 'middle')
                ).append(
                    $('<div class="tile is-ancestor is-centered">').append(
                        $('<div class="tile is-parent arena-details">')
                    )
                )
            )

        )
        .append(
            $('<div class="card">').append(
                $('<div class="card-header">').append(
                    $('<p class="card-header-title">').append(
                        $('<span class="icon">').append(
                            $('<i class="mdi mdi-pulse">')
                        )
                    ).append("Statistics")
                )
            ).append(
                $('<div class="card-content">').append(
                    $('<div class="tabs is-toggle is-paddingless is-centered is-fullwidth">').append(
                        $('<ul class="is-marginless">').append(
                            $('<li class="is-active" name="cmpd">').append(
                                $('<a onclick="setCMpD()">').append(
                                    "Clear Mark per Difficulty"
                                )
                            )
                        ).append(
                            $('<li name="cmpl">').append(
                                $('<a onclick="setCMpL()">').append(
                                    "Clear Mark per Level"
                                )
                            )
                        ).append(
                            $('<li name="gpd">').append(
                                $('<a onclick="setGpD()">').append(
                                    "Grade per Difficulty"
                                )
                            )
                        ).append(
                            $('<li name="gpl">').append(
                                $('<a onclick="setGpL()">').append(
                                    "Grade per Level"
                                )
                            )
                        ).append(
                            $('<li name="aspl">').append(
                                $('<a onclick="setASpL()">').append(
                                    'Average Score per Level'
                                )
                            )
                        )
                    )
                ).append(
                    $('<hr>')
                ).append(
                    $('<div class="tile is-ancestor">').append(
                        $('<div class="tile is-parent">').append(
                            $('<article class="tile is-child">').append(
                                // $('<div class="table-container">').append(
                                    $('<table class="table mx-auto is-fullwidth is-hoverable" id="statistic-table">')
                                    .css('margin-left', 'auto')
                                    .css('margin-right', 'auto')
                                    // .css('width', '100%')
                                // )
                            )//.css('text-align', 'center')
                             .css('overflow-x', 'auto')
                        )
                    )
                    
                )
            )
        )

        arena_data = arena_data.filter(are => are.version === currentVersion).sort(function(a,b) { return a['season'] - b['season'] } )
        if(arena_data.length <= 0) {
            $('#arena-szn-sel').append(
                $('<option>', {
                    value: 0,
                    text: 'No available arena data.',
                })
            )
            $('#arena-szn-sel').attr('disabled', 'disabled')
        } else {
            arena_data.sort((a,b) => b.season - a.season).forEach(are => {
                $('#arena-szn-sel').append(
                    $('<option>', {
                        value: are['season'],
                        text: 'Season ' + are['season'],
                    })
                )
            })
        }

        $('#arena-szn-sel').change(function() {
            $('.arena-details').empty()
            displayArenaSeasonData($('#arena-szn-sel').val())
        });

        if(currentVersion >= 2) {
            let skillFrame = getPlayerCourse(getPlayerSkill())
            if(skillFrame !== 'none') $('#skillFrame').attr('src', getSkillFrameAsset(skillFrame))
            $('#skillTitle').text(getSkillTitle())
            $('#skillTitle').attr('style', 'font-size:25px; color:black; font-weight:bold;color:' + (getPlayerSkill()[0] === 11 ? '#FFC100' : ((getPlayerSkill()[0] === 12) ? '#FFE000' : "black")))
        }

        setUpStatistics(currentProfile.version);
        setCMpD();
        displayArenaSeasonData($('#arena-szn-sel').val())

        $('.dots').fadeOut(400, function() {

        })
        $('#test').fadeIn(1000);
    })



})