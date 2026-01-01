var currentVersion, currentProfile
var versionText = ['', 'BOOTH', 'INFINTE INFECTION', 'GRAVITY WARS', 'HEAVENLY HAVEN', 'VIVIDWAVE', 'EXCEED GEAR', '∇']

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function getImageFileFormat(assetType, id) {
    // if(assetType == 0) {
    //     if (id >= 103) return '.png' 
    //     return '.jpg'
    // }
    return '.png'
}

(function($) {
    $.preload = function() {
        var imgs = Object.prototype.toString.call(arguments[0]) === '[object Array]' ?
            arguments[0] : arguments;

        var tmp = [];
        var i = imgs.length;

        // reverse loop run faster
        for (; i--;) tmp.push($('<img />').attr('src', imgs[i]));
    };
})(jQuery);

$('#nemsys_select').change(function() {
    $('#nemsys_pre').fadeOut(200, () => {
        if ($('#nemsys_select').val() != 30) {
            $('#nemsys_pre').attr("src", "static/asset/nemsys/nemsys_" + zeroPad($('#nemsys_select').val(), 4) + ".png");
        } else {
            $('#nemsys_pre').attr("src", "static/asset/nemsys/nemsys_aprilfool.png");
        }

    });
    $('#nemsys_pre').fadeIn(200);
});

$('[name="subbg"]').change(async function() {
    let subbgType = database['subbg'].filter((e => e.value === parseInt($('[name="subbg"]').val())))[0]['type']
    let isSubbgSlideshow = (subbgType === 'slideshow')
    $('#sub_pre').fadeOut(200)
    $('#sub_pre_vid').fadeOut(200)
    if(subbgType === 'video') {
        $('#sub_pre_vid_src').attr('src', "static/asset/submonitor_bg/subbg_" + zeroPad($('[name="subbg"]').val(), 4) + '.mp4')
        document.getElementById('sub_pre_vid').load()
        $('#sub_pre_vid').fadeIn(200)
    } else {
        $('#sub_pre').fadeOut(200, () => { $('#sub_pre').attr("src", isSubbgSlideshow ? "static/asset/submonitor_bg/subbg_" + zeroPad($('[name="subbg"]').val(), 4) + "_0" + (Math.floor(Math.random() * 3) + 1) + getImageFileFormat(0, parseInt(zeroPad($('[name="subbg"]').val(), 4))) : "static/asset/submonitor_bg/subbg_" + zeroPad($('[name="subbg"]').val(), 4) + getImageFileFormat(0, parseInt(zeroPad($('[name="subbg"]').val(), 4)) )); });
        $('#sub_pre').fadeIn(200);
    }
});

$('[name="bgm"]').change(function() {
    $('#custom_0').attr("src", "static/asset/audio/custom_" + zeroPad($('[name="bgm"]').val(), 2) + "/0.mp3");
    $('#custom_1').attr("src", "static/asset/audio/custom_" + zeroPad($('[name="bgm"]').val(), 2) + "/1.mp3");
    if ($('[name="bgm"]').val() == 99) {
        $('#custom_0').attr("src", "static/asset/audio/special_00/0.mp3");
        $('#custom_1').attr("src", "static/asset/audio/custom_00/1.mp3");
    }
    $('#custom_0').prop("volume", 0.5);
    $('#custom_1').prop("volume", 0.2);

    $('#play_sel').animate({ 'opacity': 0 }, 200, function() {
        $(this).text('Play').animate({ 'opacity': 1 }, 200);
    });
    play_sel = false;

    $('#play_bgm').animate({ 'opacity': 0 }, 200, function() {
        $(this).text('Play').animate({ 'opacity': 1 }, 200);
    });

    play_bgm = false;
});

var testcurrent = 2.8;

$('[name="stampA"]').change(function() {
    $('#a_pre').fadeOut(200, () => {
        var stamp = $('[name="stampA"]').val();
        if (stamp == 0) {
            $('#a_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#a_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#a_pre').fadeIn(200);
});

$('[name="stampB"]').change(function() {
    $('#b_pre').fadeOut(200, () => {
        var stamp = $('[name="stampB"]').val();
        if (stamp == 0) {
            $('#b_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#b_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#b_pre').fadeIn(200);
});

$('[name="stampC"]').change(function() {
    $('#c_pre').fadeOut(200, () => {
        var stamp = $('[name="stampC"]').val();
        if (stamp == 0) {
            $('#c_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#c_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#c_pre').fadeIn(200);
});

$('[name="stampD"]').change(function() {
    $('#d_pre').fadeOut(200, () => {
        var stamp = $('[name="stampD"]').val();
        if (stamp == 0) {
            $('#d_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#d_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#d_pre').fadeIn(200);
});

$('[name="stampRA"]').change(function() {
    $('#ra_pre').fadeOut(200, () => {
        var stamp = $('[name="stampRA"]').val();
        if (stamp == 0) {
            $('#ra_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#ra_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#ra_pre').fadeIn(200);
});

$('[name="stampRB"]').change(function() {
    $('#rb_pre').fadeOut(200, () => {
        var stamp = $('[name="stampRB"]').val();
        if (stamp == 0) {
            $('#rb_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#rb_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#rb_pre').fadeIn(200);
});

$('[name="stampRC"]').change(function() {
    $('#rc_pre').fadeOut(200, () => {
        var stamp = $('[name="stampRC"]').val();
        if (stamp == 0) {
            $('#rc_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#rc_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#rc_pre').fadeIn(200);
});

$('[name="stampRD"]').change(function() {
    $('#rd_pre').fadeOut(200, () => {
        var stamp = $('[name="stampRD"]').val();
        if (stamp == 0) {
            $('#rd_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#rd_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#rd_pre').fadeIn(200);
});
var profile_data, database;
var play_bgm = false;
var play_sel = false;
$(document).ready(function() {
    profile_data = JSON.parse(document.getElementById("data-pass").innerText);
    let urlParams = new URLSearchParams(window.location.search);
    currentVersion = (urlParams.has('version') && urlParams.get('version') !== "") ? parseInt(urlParams.get('version')) : profile_data[profile_data.length - 1].version
    currentProfile = profile_data.find(p => p.version === currentVersion)
    $('[name="version"]').val(currentVersion)

    items_crew = JSON.parse(document.getElementById("data-pass-crew").innerText);
    items_stamp = JSON.parse(document.getElementById("data-pass-stamp").innerText).filter(i => i.version === currentVersion);
    items_subbg = JSON.parse(document.getElementById("data-pass-subbg").innerText).filter(i => i.version === currentVersion);
    items_bgm = JSON.parse(document.getElementById("data-pass-bgm").innerText).filter(i => i.version === currentVersion);
    items_nemsys = JSON.parse(document.getElementById("data-pass-nemsys").innerText).filter(i => i.version === currentVersion);
    items_sysbg = JSON.parse(document.getElementById("data-pass-sysbg").innerText).filter(i => i.version === currentVersion);
    valgene_ticket = JSON.parse(document.getElementById("data-pass-valgeneticket").innerText);
    courses = JSON.parse(document.getElementById("data-pass-courses").innerText).filter(i => i.version === currentVersion);
    skill = JSON.parse(document.getElementById("data-pass-skill").innerText).filter(i => i.version === currentVersion);
    unlock_all = (document.getElementById("data-pass-unlock-all").innerText === 'true');

    for (var p of profile_data) {
        $('#version_select').append($('<option>', {
            value: p.version,
            text: versionText[p.version],
            selected: (p.version === currentVersion)
        }));
    }

    $.getJSON("static/asset/json/customize_data_ext.json", function(json) {
        database = json;

        let name = currentProfile.name
        $('[name="name').attr('placeholder', currentProfile.name)

        let ap = currentProfile.appeal
        $('[name="appeal').attr('placeholder', currentProfile.appeal)

        for (var i in json["supportTeams"]) {
            $('[name="bplSupport"]').append($('<option>', {
                value: json["supportTeams"][i].id,
                text: json["supportTeams"][i].name,
            }));
        }
        let bplSupport = currentProfile["bplSupport"] ? currentProfile["bplSupport"] % 10 : 0
        $('[name="bplSupport"]').val(bplSupport);

        if(currentProfile["bplSupport"] >= 10) $('[name="bplPro"]').attr('checked', true);

        for (var i in json["sysbg"]) {
            if(unlock_all || (items_sysbg.find(x => x.id === json["sysbg"][i].id) || json["sysbg"][i].id === 0)) {
                $('[name="sysBG"]').append($('<option>', {
                    value: json["sysbg"][i].id,
                    text: json["sysbg"][i].name,
                }));
            }
        }
        $('[name="sysBG"]').val(currentProfile["sysBG"] ? currentProfile["sysBG"] : 0);

        for (var i in json["skilltitle"]) {
            let foundCourses = courses.filter(c => c.cid === json["skilltitle"][i].id && c.clear >= 2)
            if(foundCourses.length > 0) {
                $('[name="skilltitle"]').append($('<option>', {
                    value: json["skilltitle"][i].id,
                    text: json["skilltitle"][i].name + ' (' + json["skilltitle"][i].info + ')',
                }));
            }
        }
        if(skill.length > 1) $('[name="skilltitle"]').val(skill[0]["name"]);
        else $('[name="skilltitle"]').attr('disabled', 'disabled')

        for (var i in json["appeal_frame"]) {
            $('[name="creatorItem"]').append($('<option>', {
                value: json["appeal_frame"][i].id,
                text: json["appeal_frame"][i].name,
            }));
        }
        $('[name="creatorItem"]').val(currentProfile["creatorItem"] ? currentProfile["creatorItem"] : 1);
    });

    $.getJSON("static/asset/json/data.json", function(json) {
        database = json;

        //console.log(json); // this will show the info it in firebug console
        //console.log(profile_data);

        for (var i in json["nemsys"]) {
            if(![8, 9, 10, 11, 47].includes(json["nemsys"][i].value) && (unlock_all || (json["nemsys"][i].value === 0 || items_nemsys.find(x => x.id === json["nemsys"][i].value)))) {
                $('#nemsys_select').append($('<option>', {
                    value: json["nemsys"][i].value,
                    text: json["nemsys"][i].name + ((json["nemsys"][i].value == '0') ? (currentVersion === 7 ? 'NABLA' : 'EXCEED') : ''),
                }));
                var image = new Image();
                if (json["nemsys"][i].value != 30) {
                    let nem = (currentProfile['version'] === 7 && json["nemsys"][i].value === 0) ? 47 : json["nemsys"][i].value
                    image.src = "static/asset/nemsys/nemsys_" + zeroPad(nem, 4) + ".png";
                } else {
                    image.src = "static/asset/nemsys/nemsys_aprilfool.png";
                }
                //console.log(profile_data["nemsys"])
            }
                
        }
        $('#nemsys_select').val(currentProfile["nemsys"]);

        for (var i in json["subbg"]) {
            
            if(unlock_all || (json["subbg"][i].value === 0 || items_subbg.find(x => x.id === json["subbg"][i].value))) {
                $('[name="subbg"]').append($('<option>', {
                    value: json["subbg"][i].value,
                    type: json["subbg"][i].type,
                    text: json["subbg"][i].name,
                }));
                var image = new Image();
                if (json["subbg"][i].type === 'slideshow') {
                    image.src = "static/asset/submonitor_bg/subbg_" + zeroPad(json["subbg"][i].value, 4) + "_0" + (Math.floor(Math.random() * 3) + 1) + getImageFileFormat(0, parseInt(zeroPad(json["subbg"][i].value, 4)));
                } else if (json["subbg"][i].type === 'normal') {
                    image.src = "static/asset/submonitor_bg/subbg_" + zeroPad(json["subbg"][i].value, 4) + getImageFileFormat(0, parseInt(zeroPad(json["subbg"][i].value, 4)));
                }
                // console.log(image);
                //console.log(profile_data["subbg"])
            }
        }
        $('[name="subbg"]').val(currentProfile["subbg"]);

        for (var i in json["bgm"]) {
            if(unlock_all || (json["bgm"][i].value === 0 || items_bgm.find(x => parseInt(x.id) === parseInt(json["bgm"][i].value)))) {
                $('[name="bgm"]').append($('<option>', {
                    value: json["bgm"][i].value,
                    text: json["bgm"][i].name,
                }));
                var audio = new Audio();
                var audio1 = new Audio();
                if (json["bgm"][i].value == 99) {
                    audio.src = "static/asset/audio/special_00/0.mp3"
                } else {
                    audio.src = "static/asset/audio/custom_" + zeroPad(json["bgm"][i].value, 2) + "/0.mp3"
                    audio1.src = "static/asset/audio/custom_" + zeroPad(json["bgm"][i].value, 2) + "/1.mp3"
                }

                //console.log(profile_data["bgm"])
            }
        }
        $('[name="bgm"]').val(currentProfile["bgm"]);

        for (var i in json["akaname"]) {
            $('[name="akaname"]').append($('<option>', {
                value: json["akaname"][i].value,
                text: json["akaname"][i].value + " - " + json["akaname"][i].name,
            }));
            //console.log(profile_data["akaname"])
        }
        $('[name="akaname"]').val(currentProfile["akaname"]);

        let ticketNum = (valgene_ticket !== null) ? valgene_ticket.ticketNum : 0
        $('[name="valgeneTicket"]').val(ticketNum)

        for (var i in json["stamp"]) {
            if(unlock_all || (json["stamp"][i].value === 0 || items_stamp.find(x => x.id === json["stamp"][i].value))) {
                $('[name="stampA"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampA"]').val(currentProfile["stampA"]);

                $('[name="stampB"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampB"]').val(currentProfile["stampB"]);

                $('[name="stampC"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampC"]').val(currentProfile["stampC"]);

                $('[name="stampD"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampD"]').val(currentProfile["stampD"]);

                $('[name="stampRA"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampRA"]').val(currentProfile["stampRA"]);

                $('[name="stampRB"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampRB"]').val(currentProfile["stampRB"]);

                $('[name="stampRC"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampRC"]').val(currentProfile["stampRC"]);

                $('[name="stampRD"]').append($('<option>', {
                    value: json["stamp"][i].value,
                    text: json["stamp"][i].name,
                }));
                $('[name="stampRD"]').val(currentProfile["stampRD"]);

                var group = Math.trunc((json["stamp"][i].value - 1) / 4 + 1);
                var item = json["stamp"][i].value % 4;
                if (item == 0) item = 4;
                var image = new Image();

                image.src = "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png";
            }
        }
    });


    if (currentProfile["nemsys"] != 30) {
        $('#nemsys_pre').attr("src", "static/asset/nemsys/nemsys_" + zeroPad(currentVersion === 7 && currentProfile["nemsys"] === 0 ? 47 : currentProfile["nemsys"], 4) + ".png");
    } else {
        $('#nemsys_pre').attr("src", "static/asset/nemsys/nemsys_aprilfool.png");
    }

    $('#sub_pre').fadeOut(200)
    $('#sub_pre_vid').fadeOut(200)

    $.getJSON("static/asset/json/data.json", function(json) {
        database = json
        let subbgType = database['subbg'].filter((e => e.value === parseInt(currentProfile["subbg"])))[0]['type']
        let isSubbgSlideshow = (subbgType === 'slideshow')

        if(subbgType === 'video') {
            $('#sub_pre_vid').empty().append(
                $("<source id='sub_pre_vid_src' src='static/asset/submonitor_bg/subbg_" + zeroPad(currentProfile["subbg"], 4) + ".mp4'>")
            )
            $('#sub_pre_vid').fadeIn(200)
        } else {
            $('#sub_pre').attr("src", isSubbgSlideshow ? "static/asset/submonitor_bg/subbg_" + zeroPad(currentProfile["subbg"], 4) + "_0" + (Math.floor(Math.random() * 3) + 1) + getImageFileFormat(0, parseInt(zeroPad($('[name="subbg"]').val(), 4))) : "static/asset/submonitor_bg/subbg_" + zeroPad(currentProfile["subbg"], 4) + getImageFileFormat(0, parseInt(zeroPad(currentProfile["subbg"], 4))));
            $('#sub_pre').fadeIn(200)
        }
    })
    // console.log(database)
    $('#custom_0').attr("src", "static/asset/audio/custom_" + zeroPad(currentProfile["bgm"], 2) + "/0.mp3");
    $('#custom_1').attr("src", "static/asset/audio/custom_" + zeroPad(currentProfile["bgm"], 2) + "/1.mp3");
    $('#custom_0').prop("volume", 0.5);
    $('#custom_1').prop("volume", 0.2);

    var stamp = currentProfile["stampA"];
    if (stamp == 0 || stamp == null) {
        $('#a_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#a_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }
    stamp = currentProfile["stampB"];
    if (stamp == 0 || stamp == null) {
        $('#b_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#b_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }
    stamp = currentProfile["stampC"];
    if (stamp == 0 || stamp == null) {
        $('#c_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#c_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }
    stamp = currentProfile["stampD"];
    if (stamp == 0 || stamp == null) {
        $('#d_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#d_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }

    stamp = currentProfile["stampRA"];
    if (stamp == 0 || stamp == null) {
        $('#ra_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#ra_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }
    stamp = currentProfile["stampRB"];
    if (stamp == 0 || stamp == null) {
        $('#rb_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#rb_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }
    stamp = currentProfile["stampRC"];
    if (stamp == 0 || stamp == null) {
        $('#rc_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#rc_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }
    stamp = currentProfile["stampRD"];
    if (stamp == 0 || stamp == null) {
        $('#rd_pre').attr("src", "static/asset/nostamp.png");
    } else {
        var group = Math.trunc((stamp - 1) / 4 + 1);
        var item = stamp % 4;
        if (item == 0) item = 4;
        $('#rd_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
    }

    $('#bgm_pre').append(
        $('<div class="buttons">').append(
            $('<button class="button is-primary" type="button" id="play_bgm">')
            .append("Play")
            .click(function() {
                if (play_bgm) {
                    $('#custom_0').trigger('pause');
                    $('#play_bgm').animate({ 'opacity': 0 }, 200, function() {
                        $(this).text('Play').animate({ 'opacity': 1 }, 200);
                    });
                    play_bgm = false;
                } else {
                    $('#custom_0').trigger('play');

                    $('#play_bgm').animate({ 'opacity': 0 }, 200, function() {
                        $(this).text('Pause').animate({ 'opacity': 1 }, 200);
                    });
                    play_bgm = true;
                }
            })
        )
    )

    $('#sel_pre').append(
        $('<div class="buttons">').append(
            $('<button class="button is-primary" type="button" id="play_sel">')
            .append("Play")
            .click(function() {
                if (play_sel) {
                    $('#custom_1').trigger('pause');
                    $('#play_sel').animate({ 'opacity': 0 }, 200, function() {
                        $(this).text('Play').animate({ 'opacity': 1 }, 200);
                    });
                    play_sel = false;
                } else {
                    $('#custom_1').trigger('play');

                    $('#play_sel').animate({ 'opacity': 0 }, 200, function() {
                        $(this).text('Pause').animate({ 'opacity': 1 }, 200);
                    });
                    play_sel = true;
                }
            })
        )
    )

    $('#custom_0').on('ended', function() {
        $('#custom_0').currentTime = 0;
        $('#play_bgm').animate({ 'opacity': 0 }, 200, function() {
            $(this).text('Play').animate({ 'opacity': 1 }, 200);
        });

        play_bgm = false;
    });

    $('#custom_1').on('ended', function() {
        $('#custom_1').currentTime = 0;
        $('#play_sel').animate({ 'opacity': 0 }, 200, function() {
            $(this).text('Play').animate({ 'opacity': 1 }, 200);
        });
        play_sel = false;
    });

    $('#custom_0').on('timeupdate', function() {
        var currentTime = parseInt($('#custom_0').prop('currentTime'));
        var duration = parseInt($('#custom_0').prop('duration'));
        var percent = currentTime / duration * 100;

    });

    $('#custom_1').on('timeupdate', function() {
        var currentTime = parseInt($('#custom_1').prop('currentTime'));
        var duration = parseInt($('#custom_1').prop('duration'));
        var percent = currentTime / duration * 100;


    $('#version_select').change(function() {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('version', $('#version_select').val());
        location.search = urlParams;
    });

    });
})