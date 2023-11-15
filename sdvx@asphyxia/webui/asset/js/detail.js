var music_db, course_db, score_db, data_db, appeal_db, skill_title_db;
var volforceArray = [];
var profile_data, skill_data, course_data;
var baseTBodyCMpD, baseTBodyCMpL, baseTBodyGpD, baseTBodyGpL, baseTBodyASpL;
var notFirst = false;
var versionText = ['', 'BOOTH', 'INFINTE INFECTION', 'GRAVITY WARS', 'HEAVENLY HAVEN', 'VIVIDWAVE', 'EXCEED GEAR']

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
    if(skill_data.length <= 0 || skill_data[0].name === (undefined || 0)) return ''
    return skill_title_db.filter(e => e.id === skill_data[0].name)[0].name
}

function getGrade(grade) {
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

function getMedal(clear) {
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
            return 1.05;
        case 5:
            return 1.10;
    }
}

function getAppealCard(appeal) {

    var result = appeal_db["appeal_card_data"]["card"].filter(object => object["@id"] == appeal);
    return "static/asset/ap_card/" + ((result.length > 0) ? result[0]["info"]["texture"] : 'ap_06_0001') + ".jpg"
}

function getSongLevel(musicid, type) {
    //console.log(music_db["mdb"]["music"])
    // console.log(musicid + " " + type);
    // console.log(musicid)
    var result = music_db["mdb"]["music"].filter(object => object["@id"] == musicid);
    // console.log(result[0]["difficulty"]["novice"]["difnum"]["#text"])
    if (result.length == 0) {
        return "1"
    }

    var diffnum = 0;

    switch (type) {
        case 0:
            if (!(result[0]["difficulty"]["novice"] === undefined))
                diffnum = result[0]["difficulty"]["novice"]["difnum"]["#text"]
                // return result[0]["difficulty"]["novice"]["difnum"]["#text"]
            break;
        case 1:
            if (!(result[0]["difficulty"]["advanced"] === undefined))
                diffnum = result[0]["difficulty"]["advanced"]["difnum"]["#text"]
                // return result[0]["difficulty"]["advanced"]["difnum"]["#text"]
            break;
        case 2:
            if (!(result[0]["difficulty"]["exhaust"] === undefined))
                diffnum = result[0]["difficulty"]["exhaust"]["difnum"]["#text"]
                // return result[0]["difficulty"]["exhaust"]["difnum"]["#text"]
            break;
        case 3:
            if (!(result[0]["difficulty"]["infinite"] === undefined))
                diffnum = result[0]["difficulty"]["infinite"]["difnum"]["#text"]
                // return result[0]["difficulty"]["infinite"]["difnum"]["#text"]
            break;
        case 4:
            if (!(result[0]["difficulty"]["maximum"] === undefined))
                diffnum = result[0]["difficulty"]["maximum"]["difnum"]["#text"]
                // return result[0]["difficulty"]["maximum"]["difnum"]["#text"]
            break;
    }
    // console.log(diffnum)
    if (diffnum == 0) {
        diffnum = 1;
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
    // console.log(level);
    var tempVF = parseInt(level) * (parseInt(score.score) / 10000000) * getGrade(score.grade) * getMedal(score.clear) * 2;
    // console.log(tempVF);
    return tempVF;
}

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function calculateVolforce() {
    for (var i in score_db) {
        var temp = singleScoreVolforce(score_db[i]);
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
    VF /= 100;
    // console.log(toFixed(VF, 3));
    return toFixed(VF, 3);
}

var diffName = ["NOV", "ADV", "EXH", "INF\nGRV\nHVN\nVVD\nXCD", "MXM"];

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
                    "Clear"
                )
            ).append(
                $('<th>').append(
                    "Hard Clear"
                )
            ).append(
                $('<th>').append(
                    "UC"
                )
            ).append(
                $('<th>').append(
                    "PUC"
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
                    "A+"
                )
            ).append(
                $('<th>').append(
                    "AA"
                )
            ).append(
                $('<th>').append(
                    "AA+"
                )
            ).append(
                $('<th>').append(
                    "AAA"
                )
            ).append(
                $('<th>').append(
                    "AAA+"
                )
            ).append(
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


function setUpStatistics() {
    baseTBodyCMpD = $('<tbody>');
    baseTBodyCMpL = $('<tbody>');
    baseTBodyGpL = $('<tbody>');
    baseTBodyGpD = $('<tbody>');
    baseTBodyASpL = $('<tbody>');

    var CMpDArray = createArray(5, 5);
    var CMpLArray = createArray(20, 5);
    var GpDArray = createArray(5, 10);
    var GpLArray = createArray(20, 10);
    var ASpLArray = createArray(20, 2);

    score_db.forEach(function(currentValue, index, array) {
        //console.log(currentValue);
        CMpDArray[currentValue.type][currentValue.clear - 1] += 1;
        CMpLArray[parseInt(getSongLevel(currentValue.mid, currentValue.type)) - 1][currentValue.clear - 1] += 1;
        GpDArray[currentValue.type][currentValue.grade - 1]++;
        GpLArray[parseInt(getSongLevel(currentValue.mid, currentValue.type)) - 1][currentValue.grade - 1] += 1;
        ASpLArray[parseInt(getSongLevel(currentValue.mid, currentValue.type)) - 1][0] += 1;
        ASpLArray[parseInt(getSongLevel(currentValue.mid, currentValue.type)) - 1][1] += currentValue.score;
    });

    // console.log(CMpDArray);
    // console.log(CMpLArray);
    // console.log(GpDArray);
    // console.log(GpLArray);
    // console.log(ASpLArray);
    for (var diff = 0; diff < 5; diff++) {
        baseTBodyCMpD.append(
            $('<tr>').append(
                $('<th>').append(
                    diffName[diff]
                )
            ).append(
                $('<td>').append(
                    CMpDArray[diff][0]
                )
            ).append(
                $('<td>').append(
                    CMpDArray[diff][1]
                )
            ).append(
                $('<td>').append(
                    CMpDArray[diff][2]
                )
            ).append(
                $('<td>').append(
                    CMpDArray[diff][3]
                )
            ).append(
                $('<td>').append(
                    CMpDArray[diff][4]
                )
            )
        )
    }
    for (var lv = 1; lv <= 20; lv++) {
        baseTBodyCMpL.append(
            $('<tr>').append(
                $('<th>').append(
                    lv
                )
            ).append(
                $('<td>').append(
                    CMpLArray[lv - 1][0]
                )
            ).append(
                $('<td>').append(
                    CMpLArray[lv - 1][1]
                )
            ).append(
                $('<td>').append(
                    CMpLArray[lv - 1][2]
                )
            ).append(
                $('<td>').append(
                    CMpLArray[lv - 1][3]
                )
            ).append(
                $('<td>').append(
                    CMpLArray[lv - 1][4]
                )
            )
        )
    }
    for (var diff = 0; diff < 5; diff++) {
        baseTBodyGpD.append(
            $('<tr>').append(
                $('<th>').append(
                    diffName[diff]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][0]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][1]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][2]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][3]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][4]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][5]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][6]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][7]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][8]
                )
            ).append(
                $('<td>').append(
                    GpDArray[diff][9]
                )
            )
        )
    }

    for (var lv = 1; lv <= 20; lv++) {
        baseTBodyGpL.append(
            $('<tr>').append(
                $('<th>').append(
                    lv
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][0]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][1]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][2]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][3]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][4]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][5]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][6]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][7]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][8]
                )
            ).append(
                $('<td>').append(
                    GpLArray[lv - 1][9]
                )
            )
        )
    }
    for (var lv = 1; lv <= 20; lv++) {
        baseTBodyASpL.append(
            $('<tr>').append(
                $('<th>').append(
                    lv
                )
            )
            .append(
                $('<td>').append(
                    getAvg(ASpLArray, lv)
                )
            )
        );
    }
}

// $('cmpd').on('click', function(e) {
//     //setCMpD();
//     $('cmpdli').addClass('is-active');
// })

// $('cmpl').on('click', function(e) {
//     //setCMpD();
//     $('cmplli').addClass('is-active');
// })
// $('gpd').on('click', function(e) {
//     //setCMpD();
//     $('gpdli').addClass('is-active');
// })
// $('gpl').on('click', function(e) {
//     //setCMpD();
//     $('gplli').addClass('is-active');
// })

$('#version_select').change(function() {
    $('#skillLV').fadeOut(200, () => {
        console.log("change version select");
        $('#skillLV').attr('src', getSkillAsset(getPlayerSkill($('#version_select').val())[0]))
    });
    $('#skillLV').fadeIn(200);
});

function getPlayerSkill(version) {
    // console.log(getPlayerMaxVersion())
    if (skill_data.length == 0) return [-1, 0];
    var k = skill_data.filter(e => e.version == version)
    let courseDataFil = course_data.filter(e => ![6,7,12,13,15,16].includes(e.sid) && e.cid === k[0].level && ((k[0].type !== undefined) ? k[0].type : 0) === ((e.stype !== undefined) ? e.stype : 0))
    return [(courseDataFil.length > 0) ? k[0].level : -1, (k[0].type !== undefined) ? k[0].type : 0];
}

function getPlayerCourse(version, playerSkill) {
    if(version === 0) return 'none'
    let skillFrame = ['normal', 'god']
    let skillThrsh = [[130, 150, 160, 170], [150, 160, 170, 180]]
    let skillThrshVal = (playerSkill[0] <= 9) ? 0 : playerSkill[0] - 9
    var k = course_db.courseData.filter(e => e.version == version)[0].info
    let sidCourses = []
    k.forEach(kd => {
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
    if (skill_data.length == 0) return [];
    var versionDATA = [];
    for (var i = 0; i < skill_data.length; i++) {
        versionDATA.push(parseInt(skill_data[i].version));
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
                    // $('<h1 style="font-size:100px">' + ((rankInfo[0] === 'none') ? 'n/a' : rankInfo[0].toUpperCase()) + "</h1>")
                )
            )
        ).append(
            $('<div class="tile is-parent is-5" style="position:relative">').append(
                $('<article class="tile is-child arena-details-child-right">').append(
                    $('<p class="title" style="font-family: testfont">Arena Power</p>').append(
                        $('<div class="content">' + sznData.shopPoint + ' AP </div>')
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
                $('<h5 style="font-family: testfont">' + sznData.rankPoint + ' pts (' + (rankInfo[2].point - sznData.rankPoint) + ' pts to ' + rankInfo[2].rank.toUpperCase() + ')</h5>')
            ).append(
                (sznData.megamixRate !== (0 || undefined)) ? $('<h5 style="font-family: testfont">Megamix rate: ' + sznData.megamixRate + ' <img style="width:20px" src="static/asset/arena_rank/mixstar.png"></p></div></h5>') : $('<h5>')
            )
        } else if(rankInfo[0] !== 'none'){
            $('.arena-details-child-left').append(
                (sznData.megamixRate !== (0 || undefined)) ? $('<h5 style="font-family: testfont">Megamix rate: ' + sznData.megamixRate + ' <img style="width:20px" src="static/asset/arena_rank/mixstar.png"></p></div></h5>') : $('<h5 style="font-family:testfont">Ultimate rate: ' + sznData.ultimateRate + '</h5>')
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
    // console.log(score_db);

    // $('#test').append(
    //     $('<div>').append(
    //         profile_data["name"]
    //     ).css('font-family', "testfont")
    //     .css('font-size', "35px")
    // )

    $.when(
        $.getJSON("static/asset/json/music_db.json", function(json) {
            music_db = json;
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
        }),
    ).then(function() {
        var currentVF = calculateVolforce();
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
                console.log(versionInfo[i])
                $('#version_select').append(
                    $('<option>', {
                        value: versionInfo[i],
                        text: versionText[versionInfo[i]],
                    })
                )
            }
        }

        $('#test').append(
            $('<div class="card is-inlineblocked" style="padding-bottom:30px">').append(
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
                                $('<img>').attr('src', getAppealCard(profile_data.appeal))
                                .css('width', '150px')
                            ).css('vertical-align', 'middle')
                        )
                    ).append(
                        $('<div class="tile is-parent is-6">').append(
                            $('<article class="tile is-child">').append(
                                $('<div>').append(
                                    $('<div>').append("Player Name:").css('font-size', '15').append($('<br>'))
                                ).append(
                                    $('<div>').append(profile_data["name"]).css('font-size', "35px")
                                ).append(
                                    $('<div>').append("Akaname:").css('font-size', '15')
                                ).append(
                                    $('<div>').append(getAkaname(profile_data["akaname"])).css('font-size', "35px")
                                )
                                .css('font-family', "testfont,ffff")
                            )
                        )
                    ).append(
                        $('<div class="tile is-parent is-3">').append(
                            $('<article class="tile is-child is-centered">').append(
                                $('<div>').append(
                                    $('<img>').attr('src', getVFAsset(currentVF)).css('width', '7em')
                                    .css('margin', '0 auto')
                                ).append(
                                    $('<div>').append(
                                        currentVF
                                    ).css('font-family', "testfont")
                                    .css('font-size', "35px")
                                    .css('text-align', 'center')
                                )
                                .css('vertical-align', 'middle')
                                .css('min-height', '100%')
                                .css('height', '100%')
                            )
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
                                $('<div class="content" style="position: relative;display: flex;justify-content: center;align-items: center;">').append(
                                    $('<img id="skillLV">').attr('src', getSkillAsset(getPlayerSkill(maxVer)[0]))
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
                                    "PCB"
                                ).append(
                                    $('<div class="content">').append(
                                        profile_data.blocks
                                    )
                                ).css('font-family', "testfont") 
                            )
                        )
                    ).css('vertical-align', 'middle')
                )
            )
        ).append(
            $('<div class="card  is-inlineblocked">').append(
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

        arena_data = arena_data.sort(function(a,b) { return a['season'] - b['season'] } )
        if(arena_data.length <= 0) {
            $('#arena-szn-sel').append(
                $('<option>', {
                    value: 0,
                    text: 'No available arena data.',
                })
            )
            $('#arena-szn-sel').attr('disabled', 'disabled')
        } else {
            arena_data.forEach(are => {
                $('#arena-szn-sel').append(
                    $('<option>', {
                        value: are['season'],
                        text: 'Season: ' + are['season'],
                    })
                )
            })
        }

        $('#arena-szn-sel').change(function() {
            $('.arena-details').empty()
            displayArenaSeasonData($('#arena-szn-sel').val())
        });

        let skillFrame = getPlayerCourse(maxVer, getPlayerSkill(maxVer))
        if(skillFrame !== 'none') $('#skillFrame').attr('src', getSkillFrameAsset(skillFrame))
        $('#skillTitle').text(getSkillTitle())
        $('#skillTitle').attr('style', 'font-size:25px; color:black; font-weight:bold;color:' + (getPlayerSkill(maxVer)[0] === 11 ? '#FFC100' : ((getPlayerSkill(maxVer)[0] === 12) ? '#FFE000' : "black")))

        setUpStatistics();
        setCMpD();
        displayArenaSeasonData($('#arena-szn-sel').val())

        $('.dots').fadeOut(400, function() {

        })
        $('#test').fadeIn(1000);
    })



})