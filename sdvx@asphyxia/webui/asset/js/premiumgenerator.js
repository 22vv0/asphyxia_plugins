function countPreGeneItems(preGeneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys) {
    let totalItemsGot = 0
    console.log(totalItemsGot)
    totalItemsGot += items_crew.filter(crew => preGeneItems['crew'].includes(crew['id'])).length
    console.log(totalItemsGot)
    totalItemsGot += items_stamp.filter(stamp => preGeneItems['stamp'].includes(stamp['id'])).length
    console.log(totalItemsGot)
    totalItemsGot += items_subbg.filter(subbg => preGeneItems['subbg'].includes(subbg['id'])).length
    console.log(totalItemsGot)
    return totalItemsGot
}

$(document).ready(function() {
    // let profile_data = JSON.parse(document.getElementById("data-pass").innerText);
    let preGeneImageFetchURL = 'https://eacache.s.konaminet.jp/game/sdvx/common/images/pregene_item/'
    let items_crew = JSON.parse(document.getElementById("data-pass-crew").innerText);
    let items_stamp = JSON.parse(document.getElementById("data-pass-stamp").innerText);
    let items_subbg = JSON.parse(document.getElementById("data-pass-subbg").innerText);
    let items_bgm = JSON.parse(document.getElementById("data-pass-bgm").innerText);
    let items_nemsys = JSON.parse(document.getElementById("data-pass-nemsys").innerText);
    let unlock_all = (document.getElementById("data-pass-unlock-all").innerText === 'true');
    let preGeneItems = {
        'crew': [131],
        'stamp': [69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
        'subbg': [166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185]
    }

    console.log('crew')
    $('.item_banners').append('<div class=crew-items style="background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
    preGeneItems['crew'].forEach(crew => {
        let itemBrightness = items_crew.find(item => item.id == subbg) != undefined ? 1 : 0.5
        $.get('/static/asset/pregene_item/crew/item_crew_' + crew + '.png', function(data, textStatus) {
            if (textStatus == "success") {
                console.log(crew + " loaded");
            }
        }).fail(function(){
            console.log(crew + " not loaded. file not exist")
            $('.crew-items').append('<img style="width: 350px; padding: 10px; filter: brightness(' + itemBrightness + ')" src=' + preGeneImageFetchURL + 'crew/item_crew_' + crew + '.png>')
        });
    })

    console.log('stamp')
    $('.item_banners').append('<div class=stamp-items style="background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
    preGeneItems['stamp'].forEach(stamp => {
        let itemBrightness = items_stamp.find(item => item.id == stamp) != undefined ? 1 : 0.5
        $.get('/static/asset/pregene_item/stamp/item_stamp_' + stamp + '.png', function(data, textStatus) {
            if (textStatus == "success") {
                console.log(stamp + " loaded");
            }
        }).fail(function(){
            console.log(stamp + " not loaded. file not exist")
            $('.stamp-items').append('<img style="width: 350px; padding: 10px; filter: brightness(' + itemBrightness + ')" src=' + preGeneImageFetchURL + 'stamp/item_stamp_' + stamp + '.png>')
        });
    })

    console.log('subbg')
    $('.item_banners').append('<div class=subbg-items style="background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
    preGeneItems['subbg'].forEach(subbg => {
        let itemBrightness = items_subbg.find(item => item.id == subbg) != undefined ? 1 : 0.5
        $.get('/static/asset/pregene_item/bg/item_bg_' + subbg + '.png', function(data, textStatus) {
            if (textStatus == "success") {
                console.log(subbg + " loaded");
            }
        }).fail(function(){
            console.log(subbg + " not loaded. file not exist")
            $('.subbg-items').append('<img style="width: 350px; padding: 10px; filter: brightness(' + itemBrightness + ')" src=' + preGeneImageFetchURL + 'bg/item_bg_' + subbg + '.png>')
        });
    })

    if(!unlock_all) {
        $('.count').text(countPreGeneItems(preGeneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys) + "/" + (preGeneItems['crew'].length + preGeneItems['stamp'].length + preGeneItems['subbg'].length))
    } else {
        $('.card-content').text("Unlock all enabled.")
        $('#pregene-roll').attr('disabled')
    }

    $('#pregene-roll').on('click', function() {
        console.log('clique')
    })
})