function countPreGeneItems(preGeneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys) {
    let totalItemsGot = 0
    totalItemsGot += items_crew.filter(crew => preGeneItems['crew'].includes(crew['id'])).length
    totalItemsGot += items_stamp.filter(stamp => preGeneItems['stamp'].includes(stamp['id'])).length
    totalItemsGot += items_subbg.filter(subbg => preGeneItems['subbg'].includes(subbg['id'])).length
    return totalItemsGot
}

function loadImages(itemList, itemType, userItems) {
    let preGeneImageFetchURL = 'https://eacache.s.konaminet.jp/game/sdvx/common/images/pregene_item/'
    itemList.forEach(item => {
        let itemBrightness = userItems.find(userItem => userItem.id == item) != undefined ? 1 : 0.5
        let imageUrl = 'static/asset/pregene_item/item_' + itemType + '_' + item + '.png'
        $.get(imageUrl, function(data, textStatus) {
            if (textStatus == "success") {
                $('.' + itemType + '-items').append('<img style="width: 350px; padding: 10px; filter: brightness(' + itemBrightness + ')" src=' + imageUrl + '>')
            }
        }).fail(function(){
            imageUrl = preGeneImageFetchURL + itemType + '/item_' + itemType + '_' + item + '.png'
            $('.' + itemType + '-items').append('<img style="width: 350px; padding: 10px; filter: brightness(' + itemBrightness + ')" src=' + imageUrl + '>')
        });
    })
}

$(document).ready(function() {
    if(document.getElementById("data-pass-unlock-all").innerText === 'true') {
        $('.card-content').text("The \"Unlock All Valkyrie and Premium Items\" option is enabled. You wouldn't need this.")
        $('#pregene-roll').attr('disabled')
        return 0;
    }

    $('.input').hide()
    $('.button').addClass('is-link')
    let items_crew = JSON.parse(document.getElementById("data-pass-crew").innerText);
    let items_stamp = JSON.parse(document.getElementById("data-pass-stamp").innerText);
    let items_subbg = JSON.parse(document.getElementById("data-pass-subbg").innerText);
    let items_bgm = JSON.parse(document.getElementById("data-pass-bgm").innerText);
    let items_nemsys = JSON.parse(document.getElementById("data-pass-nemsys").innerText);
    let preGeneItems = {
        'crew': [131],
        'stamp': [69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
        'subbg': [166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185]
    }

    $('.count').text('Unlocked items: ' + countPreGeneItems(preGeneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys) + "/" + (preGeneItems['crew'].length + preGeneItems['stamp'].length + preGeneItems['subbg'].length))
    $('.item_banners').append('<div style="padding: 5px"><h3>Nemsys Crew</h3></div>')
    $('.item_banners').append('<div class=crew-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
    loadImages(preGeneItems['crew'], 'crew', items_crew)

    console.log('stamp')
    $('.item_banners').append('<div style="padding: 5px"><h3>Appeal Stamp</h3></div>')
    $('.item_banners').append('<div class=stamp-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
    loadImages(preGeneItems['stamp'], 'stamp', items_stamp)

    console.log('subbg')
    $('.item_banners').append('<div style="padding: 5px"><h3>Submonitor BG</h3></div>')
    $('.item_banners').append('<div class=bg-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
    loadImages(preGeneItems['subbg'], 'bg', items_subbg)


    $('#pregene-roll').on('click', function() {
        console.log('clique')
    })
})