var currentVersion, currentProfile, currentCustom
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
        let nemId = parseInt($('#nemsys_select').val())
        $('#nemsys_pre').attr("src", "static/asset/nemsys/nemsys_" + zeroPad(nemId, 4) + ".png");

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

$('[name="stampLA"]').change(function() {
    $('#a_pre').fadeOut(200, () => {
        var stamp = $('[name="stampLA"]').val();
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

$('[name="stampLB"]').change(function() {
    $('#b_pre').fadeOut(200, () => {
        var stamp = $('[name="stampLB"]').val();
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

$('[name="stampLC"]').change(function() {
    $('#c_pre').fadeOut(200, () => {
        var stamp = $('[name="stampLC"]').val();
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

$('[name="stampLD"]').change(function() {
    $('#d_pre').fadeOut(200, () => {
        var stamp = $('[name="stampLD"]').val();
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
var profile_data, database, databaseext;
var play_bgm = false;
var play_sel = false;
$(document).ready(async function() {
    profile_data = JSON.parse(document.getElementById("data-pass").innerText);
    customize_data = JSON.parse(document.getElementById("data-pass-custom").innerText);
    let urlParams = new URLSearchParams(window.location.search);
    currentVersion = (urlParams.has('version') && urlParams.get('version') !== "") ? parseInt(urlParams.get('version')) : profile_data[profile_data.length - 1].version
    currentProfile = profile_data.find(p => p.version === currentVersion)
    currentCustom = customize_data.find(p => p.version === currentVersion)
    if(!currentCustom) currentCustom = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    else currentCustom = currentCustom['param']
    if(currentCustom.length < 12) currentCustom = Array.from({ length: 12 }, (_, i) => currentCustom[i] || 0);
    $('[name="version"]').val(currentVersion)

    items_crew = JSON.parse(document.getElementById("data-pass-crew").innerText);
    items_stamp = JSON.parse(document.getElementById("data-pass-stamp").innerText).filter(i => i.version === currentVersion);
    items_apcard = JSON.parse(document.getElementById("data-pass-apcard").innerText).filter(i => i.version === currentVersion);
    items_subbg = JSON.parse(document.getElementById("data-pass-subbg").innerText).filter(i => i.version === currentVersion);
    items_bgm = JSON.parse(document.getElementById("data-pass-bgm").innerText).filter(i => i.version === currentVersion);
    items_nemsys = JSON.parse(document.getElementById("data-pass-nemsys").innerText).filter(i => i.version === currentVersion);
    items_sysbg = JSON.parse(document.getElementById("data-pass-sysbg").innerText).filter(i => i.version === currentVersion);
    valgene_ticket = JSON.parse(document.getElementById("data-pass-valgeneticket").innerText);
    courses = JSON.parse(document.getElementById("data-pass-courses").innerText).filter(i => i.version === currentVersion);
    skill = JSON.parse(document.getElementById("data-pass-skill").innerText).filter(i => i.version === currentVersion);
    unlock_all = (document.getElementById("data-pass-unlock-all").innerText === 'true');
    let datecode = await emit("getDateCode").then(
        function(response) {
            if(currentVersion === 6 && response.data.datecode > 20251209) return 20251209
            return response.data.datecode
        }
    )

    // akaname, apcard, nemsys, subbg, bgm, stamp, crew, sysbg
    let finalLim = [0, 0, 0, 0, 0, 0, 0, 0]
    const finDateCode = (datecode !== (false || undefined || null || "") && datecode >= currentProfile.datecode) ? datecode : (currentProfile.datecode || ((currentVersion === 6) ? 20251209 : 20251226))
    
    const datecodeLimit = [
        [20251209, 40287, 5553, 46, 762, 92, 2136, 176, 19],
        [20251224, 40301, 6001, 47, 781, 92, 2176, 178, 0],
        [20251226, 0, 6501, 0, 0, 0, 0, 0, 0],
        [20260113, 0, 6502, 0, 0, 0, 0, 0, 0],
        [20260203, 40302, 6504, 47, 795, 92, 2216, 179, 0],
        [20260303, 0, 6507, 48, 815, 101, 0, 181, 0],
        [20260324, 0, 0, 0, 842, 0, 2256, 182, 31],
        [20260421, 40305, 6508, 0, 861, 0, 2296, 183, 0]
    ].filter(lim => lim[0] <= finDateCode).forEach(lim => {
        lim.forEach((l, ind) => {
            if(l !== 0) finalLim[ind] = l
        })
    })

    
    if (currentVersion === 1) {
        $('#apica').attr('hidden', 'true')
        $('#apicaframe').attr('hidden', 'true')
        $('#skillt').attr('hidden', 'true')
        $('#aptitle').attr('hidden', 'true')
        $('#bplsupport').attr('hidden', 'true')
        $('#bplpro').attr('hidden', 'true')
        $('#valgene').attr('hidden', 'true')
        $('#customize').attr('hidden', 'true')
    } else if (currentVersion === 2) {
        $('#apicaframe').attr('hidden', 'true')
        $('#skillt').attr('hidden', 'true')
        $('#aptitle').attr('hidden', 'true')
        $('#bplsupport').attr('hidden', 'true')
        $('#bplpro').attr('hidden', 'true')
        $('#valgene').attr('hidden', 'true')
        $('#customize').attr('hidden', 'true')
    }

    for (var p of profile_data.sort((a,b) => a.version - b.version)) {
        $('#version_select').append($('<option>', {
            value: p.version,
            text: versionText[p.version],
            selected: (p.version === currentVersion)
        }));
    }

    let name = currentProfile.name
    $('[name="name').attr('placeholder', currentProfile.name)

    $.getJSON("static/asset/json/customize_data_ext.json", function(json) {
        databaseext = json;
        let skt = databaseext['skilltitle' + currentVersion]

        for (var i in databaseext["supportTeams"]) {
            $('[name="bplSupport"]').append($('<option>', {
                value: databaseext["supportTeams"][i].id,
                text: databaseext["supportTeams"][i].name,
            }));
        }
        let bplSupport = currentProfile["bplSupport"] ? currentProfile["bplSupport"] % 10 : 0
        $('[name="bplSupport"]').val(bplSupport);

        if(currentProfile["bplSupport"] >= 10) $('[name="bplPro"]').attr('checked', true);

        for (var i in skt) {
            let foundCourses = courses.filter(c => c.cid === skt[i].id && c.clear >= 2)
            if(foundCourses.length > 0) {
                $('[name="skilltitle"]').append($('<option>', {
                    value: skt[i].id,
                    text: skt[i].name + ' (' + skt[i].info + ')',
                }));
            }
        }
        if(skill.length > 1) $('[name="skilltitle"]').val(skill[0]["name"]);
        else $('[name="skilltitle"]').attr('disabled', 'disabled')

        for (var i in databaseext["appeal_frame"]) {
            $('[name="creatorItem"]').append($('<option>', {
                value: databaseext["appeal_frame"][i].id,
                text: databaseext["appeal_frame"][i].name,
            }));
        }
        $('[name="creatorItem"]').val(currentProfile["creatorItem"] ? currentProfile["creatorItem"] : 1);
    });

    $.getJSON("static/asset/json/appeal.json", function(json) {
        let aphtml = ''
        let apList = json['appeal_card_data']['card']
        for (var i in apList.filter(ap => parseInt(ap['@id']) <= finalLim[2])) {
            if(unlock_all || (parseInt(apList[i]['@id']) === 0 || items_apcard.find(x => x.id === parseInt(apList[i]['@id'])))) {
                aphtml  += '<option value=' + parseInt(apList[i]['@id']) + '>'+ apList[i]['@id'] + " - " + apList[i].info.title + '</option>'
            }
        }
        $('[name="appeal').html(aphtml)
        $('[name="appeal').val((items_apcard.find(x => x.id === currentProfile['appeal'])) ? currentProfile['appeal'] : 1)
    })

    $.getJSON("static/asset/json/data.json", function(json) {
        database = json;
        
        let akahtml = ''
        for (var i in database["akaname"].filter(aka => aka.value <= finalLim[1])) {
            akahtml += '<option value=' + database['akaname'][i].value + '>' + database["akaname"][i].value + " - " + database["akaname"][i].name + '</option>'
        }
        $('[name="akaname"]').html(akahtml);
        $('[name="akaname"]').val(currentProfile["akaname"] === 0 ? 10001 : currentProfile['akaname']);

        let bgmhtml = ''
        let bgmId = (items_bgm.find(x => parseInt(x.id) === currentCustom[0]) || unlock_all) ? currentCustom[0] : 0
        for (var i in json["bgm"].filter(bgm => bgm.value <= finalLim[5])) {
            if(unlock_all || (database["bgm"][i].value === 0 || items_bgm.find(x => parseInt(x.id) === parseInt(database["bgm"][i].value)))) {
                bgmhtml += '<option value=' + database['bgm'][i].value + '>' + database['bgm'][i].name + '</option>'
            }
        }
        $('[name="bgm"]').html(bgmhtml);
        $('[name="bgm"]').val(bgmId);
        $('#custom_0').attr("src", "static/asset/audio/custom_" + zeroPad(bgmId, 2) + "/0.mp3");
        $('#custom_1').attr("src", "static/asset/audio/custom_" + zeroPad(bgmId, 2) + "/1.mp3");
        $('#custom_0').prop("volume", 0.5);
        $('#custom_1').prop("volume", 0.2);

        let subbghtml = ''
        let subbgId = (items_subbg.find(x => x.id === currentCustom[1]) || unlock_all) ? currentCustom[1] : 0
        for (var i in database["subbg"].filter(subbg => subbg.value <= finalLim[4])) {
            if(unlock_all || (database["subbg"][i].value === 0 || items_subbg.find(x => x.id === database["subbg"][i].value))) {
                subbghtml  += '<option value=' + json['subbg'][i].value + ' type="' + database['subbg'][i].type + '">'+ database['subbg'][i].name + '</option>'
            }
        }
        $('[name="subbg"]').html(subbghtml);
        $('[name="subbg"]').val(subbgId);

        $('#sub_pre').fadeOut(200)
        $('#sub_pre_vid').fadeOut(200)

        let subbgType = database['subbg'].filter((e => e.value === currentCustom[1]))[0]['type']
        let isSubbgSlideshow = (subbgType === 'slideshow')

        if(subbgId !== currentCustom[1]) subbgType = 'normal'
        if(subbgType === 'video') {
            $('#sub_pre_vid').empty().append(
                $("<source id='sub_pre_vid_src' src='static/asset/submonitor_bg/subbg_" + zeroPad(subbgId, 4) + ".mp4'>")
            )
            $('#sub_pre_vid').fadeIn(200)
        } else {
            $('#sub_pre').attr("src", isSubbgSlideshow ? "static/asset/submonitor_bg/subbg_" + zeroPad(subbgId, 4) + "_0" + (Math.floor(Math.random() * 3) + 1) + getImageFileFormat(0, parseInt(zeroPad(subbgId, 4))) : "static/asset/submonitor_bg/subbg_" + zeroPad(subbgId, 4) + getImageFileFormat(0, parseInt(zeroPad(subbgId, 4))));
            $('#sub_pre').fadeIn(200)
        }

        let nemsyshtml = ''
        let nemId = (items_nemsys.find(x => x.id === currentCustom[2]) || unlock_all) ? currentCustom[2] : (currentVersion === 7 ? 47 : 0)
        for (var i in database["nemsys"].filter(nemsys => nemsys.value <= finalLim[3])) {
            let defaultNem = (currentVersion === 7) ? 47 : 0
            if(![8, 9, 10, 11].includes(database["nemsys"][i].value) && (unlock_all || (defaultNem === database["nemsys"][i].value || items_nemsys.find(x => x.id === database["nemsys"][i].value)))) {
                nemsyshtml  += '<option value=' + database['nemsys'][i].value + '>'+ database["nemsys"][i].name + '</option>'
            }   
        }
        $('#nemsys_select').html(nemsyshtml);
        $('#nemsys_select').val(nemId);
        $('#nemsys_pre').attr("src", "static/asset/nemsys/nemsys_" + zeroPad(nemId, 4) + ".png");

        let vgInd = valgene_ticket.findIndex(v => v.version === currentVersion)
        let ticketNum = (vgInd >= 0) ? valgene_ticket[vgInd].ticketNum : 0
        $('[name="valgeneTicket"]').val(ticketNum)

        let stamphtml = ''
        let stampId = [
            (items_stamp.find(x => x.id === currentCustom[3]) || unlock_all) ? currentCustom[3] : 0,
            (items_stamp.find(x => x.id === currentCustom[4]) || unlock_all) ? currentCustom[4] : 0,
            (items_stamp.find(x => x.id === currentCustom[5]) || unlock_all) ? currentCustom[5] : 0,
            (items_stamp.find(x => x.id === currentCustom[6]) || unlock_all) ? currentCustom[6] : 0,
            (items_stamp.find(x => x.id === currentCustom[7]) || unlock_all) ? currentCustom[7] : 0,
            (items_stamp.find(x => x.id === currentCustom[8]) || unlock_all) ? currentCustom[8] : 0,
            (items_stamp.find(x => x.id === currentCustom[9]) || unlock_all) ? currentCustom[9] : 0,
            (items_stamp.find(x => x.id === currentCustom[10]) || unlock_all) ? currentCustom[10] : 0,
            
        ]
        for (var i in database["stamp"].filter(stamp => stamp.value <= finalLim[6])) {
            if(unlock_all || (database["stamp"][i].value === 0 || items_stamp.find(x => x.id === database["stamp"][i].value))) {
                stamphtml += '<option value=' + database['stamp'][i].value + '>'+ json['stamp'][i].name + '</option>'
            }
        }
        $('[name="stampLA"]').html(stamphtml);
        $('[name="stampLB"]').html(stamphtml);
        $('[name="stampLC"]').html(stamphtml);
        $('[name="stampLD"]').html(stamphtml);
        $('[name="stampRA"]').html(stamphtml);
        $('[name="stampRB"]').html(stamphtml);
        $('[name="stampRC"]').html(stamphtml);
        $('[name="stampRD"]').html(stamphtml);

        $('[name="stampLA"]').val(stampId[0]);
        $('[name="stampLB"]').val(stampId[1]);
        $('[name="stampLC"]').val(stampId[2]);
        $('[name="stampLD"]').val(stampId[3]);
        $('[name="stampRA"]').val(stampId[4]);
        $('[name="stampRB"]').val(stampId[5]);
        $('[name="stampRC"]').val(stampId[6]);
        $('[name="stampRD"]').val(stampId[7]);

        var stamp = stampId[0];
        if (stamp == 0 || stamp == null) {
            $('#a_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#a_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
        stamp = stampId[1];
        if (stamp == 0 || stamp == null) {
            $('#b_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#b_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
        stamp = stampId[2];
        if (stamp == 0 || stamp == null) {
            $('#c_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#c_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
        stamp = stampId[3];
        if (stamp == 0 || stamp == null) {
            $('#d_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#d_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }

        stamp = stampId[4];
        if (stamp == 0 || stamp == null) {
            $('#ra_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#ra_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
        stamp = stampId[5];
        if (stamp == 0 || stamp == null) {
            $('#rb_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#rb_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
        stamp = stampId[6];
        if (stamp == 0 || stamp == null) {
            $('#rc_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#rc_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
        stamp = stampId[7];
        if (stamp == 0 || stamp == null) {
            $('#rd_pre').attr("src", "static/asset/nostamp.png");
        } else {
            var group = Math.trunc((stamp - 1) / 4 + 1);
            var item = stamp % 4;
            if (item == 0) item = 4;
            $('#rd_pre').attr("src", "static/asset/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }

        let sysbghtml = ''
        let sysbgId = (items_sysbg.find(x => x.id === currentCustom[11]) || unlock_all) ? currentCustom[11] : 0
        for (var i in database["sysbg"].filter(sbg => sbg.id <= finalLim[8])) {
            if(unlock_all || (items_sysbg.find(x => x.id === database["sysbg"][i].id) || database["sysbg"][i].id === 0)) {
                sysbghtml += '<option value=' + database['sysbg'][i].id + '>'+ json['sysbg'][i].name + '</option>'
            }
        }
        $('[name="sysBG"]').html(sysbghtml);
        $('[name="sysBG"]').val(sysbgId);        
    })
    

    

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
    });


    $('#version_select').change(function() {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('version', $('#version_select').val());
        location.search = urlParams;
    });

})