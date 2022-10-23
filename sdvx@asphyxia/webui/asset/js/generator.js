function countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys) {
    let obtained = 0, total = 0;
    if('crew' in geneItems.items) {
        obtained += items_crew.filter(crew => geneItems.items.crew.includes(crew['id'])).length
        total += geneItems.items['crew'].length
    }
    if('stamp' in geneItems.items) {
        obtained += items_stamp.filter(stamp => geneItems.items.stamp.includes(stamp['id'] / 4)).length
        total += geneItems.items['stamp'].length
    }
    if('subbg' in geneItems.items) {
        obtained += items_subbg.filter(subbg => geneItems.items.subbg.includes(subbg['id'])).length
        total += geneItems.items['subbg'].length
    }
    if('bgm' in geneItems.items) {
        obtained += items_bgm.filter(bgm => geneItems.items.bgm.includes(bgm['id'])).length
        total += geneItems.items['bgm'].length
    }
    if('nemsys' in geneItems.items) {
        obtained += items_nemsys.filter(nemsys => geneItems.items.nemsys.includes(nemsys['id'])).length
        total += geneItems.items['nemsys'].length
    }

    return [obtained, total]
}

function loadImages(itemList, itemType, userItems) {
    itemList.forEach(item => {
        let itemBrightness = userItems.find(userItem => userItem.id == ((itemType !== 'stamp') ? item : (item * 4))) != undefined ? 1 : 0.25
        let imageUrl = 'static/asset/valgene_item/item_' + itemType + '_' + item + '.png'
        $.get(imageUrl, function(data, textStatus) {
            if (textStatus == "success") {
                $('.' + itemType + '-items').append('<img style="width: 350px; padding: 10px; filter: brightness(' + itemBrightness + ')" src=' + imageUrl + '>')
            }
        })
    })
}

async function getGeneratorEditionItems(gene_edition, itemSet) {
    let valGeneData = await $.getJSON( "static/asset/json/valgene_data.json", function(data) {
        return data
    })
    if(gene_edition === 'valkyrie') {
        return valGeneData.valgene.find(valgene => valgene.id === itemSet)
    } else { 
        return valGeneData.pregene.find(pregene => pregene.id === itemSet)
    }
}

async function loadItems(itemSet, gene_edition, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys) {
    let geneItems = await getGeneratorEditionItems(gene_edition, itemSet)
    let itemCounts = countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys)
    if(itemCounts[0] >= itemCounts[1]) $('#pregene-roll').attr('disabled', 'disabled')

    $('.count').text('Unlocked items: ' + itemCounts[0] + "/" + itemCounts[1])

    if('crew' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Nemsys Crew</h3></div>')
        $('.item_banners').append('<div class=crew-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['crew'], 'crew', items_crew)
    }

    if('stamp' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Appeal Stamp</h3></div>')
        $('.item_banners').append('<div class=stamp-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['stamp'], 'stamp', items_stamp)
    }

    if('subbg' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Submonitor BG</h3></div>')
        $('.item_banners').append('<div class=bg-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['subbg'], 'bg', items_subbg)
    }

    if('bgm' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>BGM</h3></div>')
        $('.item_banners').append('<div class=bgm-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['bgm'], 'bgm', items_bgm)
    }

    if('nemsys' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Nemsys</h3></div>')
        $('.item_banners').append('<div class=nemsys-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['nemsys'], 'nemsys', items_nemsys)
    }
}

async function loadValgeneData(gene_edition) {
    let valGeneData = await $.getJSON( "static/asset/json/valgene_data.json", function(data) {
        return data
    })
    if(gene_edition === 'valkyrie') {
        for(const valGeneDataIndex in valGeneData.valgene) {
            $('#set_select').append('<option value=' + valGeneData.valgene[valGeneDataIndex].id + '>' + valGeneData.valgene[valGeneDataIndex].name + '</option>')
        }
    } else { 
        for(const pregeneDataIndex in valGeneData.pregene) {
            $('#set_select').append('<option value=' + valGeneData.pregene[pregeneDataIndex].id + '>' + valGeneData.pregene[pregeneDataIndex].name + '</option>')
        }
    }
    
}

$(document).ready(function() {
    if(document.getElementById("data-pass-unlock-all").innerText === 'true') {
        $('.card-content').text("The \"Unlock All Valkyrie and Premium Items\" option is enabled. You wouldn't need this.")
        $('#pregene-roll').attr('disabled')
        return 0;
    }

    
    $('.input').hide()
    $('.button').addClass('is-link')
    let refid = document.getElementsByName("refid")[0].value
    let items_crew = JSON.parse(document.getElementById("data-pass-crew").innerText);
    let items_stamp = JSON.parse(document.getElementById("data-pass-stamp").innerText);
    let items_subbg = JSON.parse(document.getElementById("data-pass-subbg").innerText);
    let items_bgm = JSON.parse(document.getElementById("data-pass-bgm").innerText);
    let items_nemsys = JSON.parse(document.getElementById("data-pass-nemsys").innerText);
    let gene_edition = document.getElementById("generator-edition").innerText;
    loadValgeneData(gene_edition)
    loadItems(1, gene_edition, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys)

    $('#set_select').change(function() {
        $('.count').text('')
        $('.item_banners').empty()
        loadItems(parseInt($('#set_select').val()), gene_edition, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys)
    })

    $('#roll-result').on('click', function(){location.reload()})

    $('#pregene-roll').on('click', async function() {
        $('#pregene-roll').attr('disabled', 'disabled')
        if(gene_edition === 'premium' && window.location.search.match(/(premium)/g) != undefined) {
            let geneItems = await getGeneratorEditionItems(gene_edition, parseInt($('#set_select').val()))
            console.log(geneItems)
            if(countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys)[0] >= countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys)[1]) {
                alert("All items have been unlocked already.")
            } else {
                emit('preGeneRoll', {
                    set: parseInt(document.getElementById('set_select').value),
                    refid: refid, 
                    items: items_crew.concat(items_stamp, items_subbg, items_bgm, items_nemsys)
                }).then(
                function() {
                    $.getJSON("static/asset/logs/preGeneRollResult.json", function(data) {
                        $('.modal-card-head').append('<p class="modal-card-title">Rolled item!</p>')
                        $('.modal-card-body').append('<img style="width: 400px; padding: 10px;" src="static/asset/valgene_item/item_' + data.type + '_' + data.id + '.png">')
                        $('.modal-card-foot').append('<button onclick=location.reload(); class="button is-primary">Close</button>')
                        $('.modal').addClass('is-active')
                    })
                })
            }
        } else {
            alert("Not premium generator: a precaution")
        }
    })
})