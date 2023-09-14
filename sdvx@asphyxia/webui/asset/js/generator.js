function countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg) {
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
    if('sysbg' in geneItems.items) {
        obtained += items_sysbg.filter(sysbg => geneItems.items.sysbg.includes(sysbg['id'])).length
        total += geneItems.items['sysbg'].length
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
        return valGeneData.valgene[itemSet - 1]
    } else { 
        return valGeneData.pregene[itemSet - 1]
    }
}

async function loadItems(itemSet, gene_edition, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg) {
    let geneItems = await getGeneratorEditionItems(gene_edition, itemSet)
    let itemCounts = countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg)
    if(gene_edition === 'premium') {
        if(itemCounts[0] >= itemCounts[1]) $('#pregene-roll').attr('disabled', 'disabled')
        else $('#pregene-roll').removeAttr('disabled')
    } else if(gene_edition === 'valkyrie') {
        if([1,2,3,4,5,6,8,9,10].includes(itemSet)) { // available valgene sets in webui
            if(itemCounts[0] >= itemCounts[1]) $('#valgene-roll').attr('disabled', 'disabled')
            else $('#valgene-roll').removeAttr('disabled')
        } else $('#valgene-roll').attr('disabled', 'disabled')
    }
    

    $('.count').text('Unlocked items: ' + itemCounts[0] + "/" + itemCounts[1])
    if(itemSet === 1) {
        $('.setinfo').append('<p class="jpn-excl" style="padding:5px">These items are only usable in Japan. Change region to Japan in the ea3-config.xml file.</p>')
    } else {
        $('.jpn-excl').remove()
    }

    if('crew' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Nemsys Crew</h3></div>')
        $('.item_banners').append('<div class=crew-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['crew'].sort(function(a, b) { 
            if(a.id < b.id) { return -1; }
            if(a.id > b.id) { return 1; }
            return 0;
        }), 'crew', items_crew)
    }

    if('stamp' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Appeal Stamp</h3></div>')
        $('.item_banners').append('<div class=stamp-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['stamp'].sort(function(a, b) { 
            if(a.id < b.id) { return -1; }
            if(a.id > b.id) { return 1; }
            return 0;
        }), 'stamp', items_stamp)
    }

    if('subbg' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Submonitor BG</h3></div>')
        $('.item_banners').append('<div class=bg-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['subbg'].sort(function(a, b) { 
            if(a.id < b.id) { return -1; }
            if(a.id > b.id) { return 1; }
            return 0;
        }), 'bg', items_subbg)
    }

    if('bgm' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>BGM</h3></div>')
        $('.item_banners').append('<div class=bgm-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['bgm'].sort(function(a, b) { 
            if(a.id < b.id) { return -1; }
            if(a.id > b.id) { return 1; }
            return 0;
        }), 'bgm', items_bgm)
    }

    if('nemsys' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>Nemsys</h3></div>')
        $('.item_banners').append('<div class=nemsys-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['nemsys'].sort(function(a, b) { 
            if(a.id < b.id) { return -1; }
            if(a.id > b.id) { return 1; }
            return 0;
        }), 'nemsys', items_nemsys)
    }

    if('sysbg' in geneItems.items) {
        $('.item_banners').append('<div style="padding: 5px"><h3>System BG</h3></div>')
        $('.item_banners').append('<div class=sysbg-items style="text-align: center; background-color: #3a3a3a; padding: 20px; border-radius: 6px;"></div><br>')
        loadImages(geneItems.items['sysbg'].sort(function(a, b) { 
            if(a.id < b.id) { return -1; }
            if(a.id > b.id) { return 1; }
            return 0;
        }), 'sysbg', items_sysbg)
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
    let urlParams = new URLSearchParams(window.location.search);
    return (urlParams.has('set') && urlParams.get('set') !== "") ? urlParams.get('set') : $("#set_select option").length
}

function redirectAfterRoll() {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('set', $('#set_select').val());
    location.search = urlParams;
}

$(document).ready(async function() {
    if(document.getElementById("data-pass-unlock-all").innerText === 'true') {
        $('.card-content').text("The \"Unlock All Valkyrie and Premium Items\" option is enabled. You wouldn't need this.")
        $('#pregene-roll').attr('disabled')
        return 0;
    }

    $('html').keypress(function(e){
        if([13, 27, 32].includes(e.keyCode) && $('.modal.is-active').length > 0) {
            redirectAfterRoll()
        }
    })
    
    $('.input').hide()
    $('.button').addClass('is-link')
    let refid = document.getElementsByName("refid")[0].value
    let items_crew = JSON.parse(document.getElementById("data-pass-crew").innerText);
    let items_stamp = JSON.parse(document.getElementById("data-pass-stamp").innerText);
    let items_subbg = JSON.parse(document.getElementById("data-pass-subbg").innerText);
    let items_bgm = JSON.parse(document.getElementById("data-pass-bgm").innerText);
    let items_nemsys = JSON.parse(document.getElementById("data-pass-nemsys").innerText);
    let items_sysbg = JSON.parse(document.getElementById("data-pass-sysbg").innerText);
    let gene_edition = document.getElementById("generator-edition").innerText;
    let currentSet = await loadValgeneData(gene_edition)
    $('#set_select').val(currentSet)
    loadItems(currentSet, gene_edition, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg)
    
    $('#set_select').change(function() {
        $('.count').text('')
        $('.item_banners').empty()
        loadItems(parseInt($('#set_select').val()), gene_edition, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg)
    })

    $('#pregene-roll, #valgene-roll').on('click', async function() {
        console.log('cliucked')
        $('#pregene-roll, #valgene-roll').attr('disabled', 'disabled')
        if(gene_edition === 'premium' && window.location.search.match(/(premium)/g) != undefined) {
            let geneItems = await getGeneratorEditionItems(gene_edition, parseInt($('#set_select').val()))
            if(countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg)[0] >= countGeneItems(geneItems, items_crew, items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg)[1]) {
                alert("All items have been unlocked already.")
            } else {
                emit('preGeneRoll', {
                    set: parseInt(document.getElementById('set_select').value),
                    refid: refid, 
                    geneEdition: gene_edition,
                    items: items_crew.concat(items_stamp, items_subbg, items_bgm, items_nemsys, items_sysbg)
                }).then(
                function(response) {
                    $('.modal-card-head').append('<p class="modal-card-title">Rolled item!</p>')
                    $('.modal-card-body').append('<img style="width: 400px; padding: 10px;" src="static/asset/valgene_item/item_' + response['data'].type + '_' + response['data'].id + '.png">')
                    $('.modal-card-foot').append('<button onclick=redirectAfterRoll(); class="button is-primary">Close</button>')
                    $('.modal').addClass('is-active')
                })
            }
        } else {
            alert("Not premium generator: a precaution")
        }
    })
})
