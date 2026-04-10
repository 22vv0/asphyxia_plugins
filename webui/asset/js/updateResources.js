// data\graphics\game_nemsys -- nemsys
// data\graphics\ap_card -- appeal card
// data\graphics\submonitor_bg -- subbg
$(document).ready(async function() {
    const logArea = document.getElementById("logtextarea")
    const detailToggle = document.getElementById("detailToggle")
    let summaryBuffer = ''
    let detailBuffer = ''

    function renderLog() {
        logArea.textContent = detailToggle.checked ? detailBuffer : summaryBuffer
    }

    function appendSummary(line = '') {
        summaryBuffer += line + '\n'
        if(!detailToggle.checked) renderLog()
    }

    function appendDetail(line = '') {
        detailBuffer += line + '\n'
        if(detailToggle.checked) renderLog()
    }

    function appendSection(title, values, formatter) {
        if(!Array.isArray(values) || values.length === 0) return
        appendSummary("[" + title + "]")
        $.each(values, function(key, val) {
            appendSummary((formatter ? formatter(val) : val))
        })
        appendSummary()
    }

    $('#detailToggle').change(function() {
        renderLog()
    })

    $('.collapse').click(function(){
        console.log($('.collapsible-card').css('display'))
        if($('.collapsible-card').css('display') == 'none') {
            $('.collapsible-card').css('display', 'block')
        } else $('.collapsible-card').css('display', 'none')
    })
    
    $( "#updateResources" ).click(async function() {
        summaryBuffer = ''
        detailBuffer = ''
        renderLog()
        
        appendSummary('NOTE:')
        appendSummary('- For converting s3p files to mp3, check guide in the notes section above.')
        appendSummary('- Enable the "More Detail" switch to show backend logs.')
        appendSummary()
        appendSummary('Running....')
        appendSummary()

        appendDetail('Running....')
        appendDetail()
        try {
            const response = await emit("copyResourcesFromGame")
            const data = response && response['data'] ? response['data'] : {}

            appendSummary(data.status === 'error' ? 'Finished with errors.' : 'Done.')
            appendSummary()

            if(Array.isArray(data.logs) && data.logs.length > 0) {
                $.each(data.logs, function(key, val) {
                    appendDetail(val)
                })
                appendDetail()
            }

            if(Array.isArray(data.errors) && data.errors.length > 0) {
                appendSummary("[Errors]")
                $.each(data.errors, function(key, val) {
                    appendSummary(val)
                    appendDetail('[ERROR] ' + val)
                })
                appendSummary()
                appendSummary('If you\'re getting "error reading" logs, check if you\'ve configured "Game Data Directory" properly in the plugin settings.')
                appendSummary()
                appendDetail()
            }

            if(data.course) {
                appendSummary("[Skill Analyzer courses]")
                appendSummary("Updated course_data.json!")
                appendSummary()
            }

            appendSection("Songs", data.jsonSongs, function(val) { return "- " + val[1] })
            appendSection("INF charts", data.infSongs, function(val) { return "- " + val[1] })
            appendSection("ULT charts", data.ultSongs, function(val) { return "- " + val[1] })
            appendSection("NEMSYS", data.nemsys, function(val) { return "- " + val })
            appendSection("BGM", data.bgm, function(val) { return "- " + val })
            appendSection("Appeal cards", data.apCard, function(val) { return "- " + val })
            appendSection("Submonitor BGs", data.subbg, function(val) { return "- " + val })
            appendSection("Appeal Stamps", data.chatStamp, function(val) { return "- " + val })
            appendSection("valgene_item", data.valgeneItemFiles, function(val) { return "- " + val })
            appendSection("Appeal titles", data.akaname, function(val) { return "- " + val })
            appendSection("IFS textures", data.ifs, function(val) { return "- " + val })
        } catch(error) {
            const message = error && error.message ? error.message : String(error)
            appendSummary('Finished with errors.')
            appendSummary()
            appendSummary('[Errors]')
            appendSummary(message)

            appendDetail('[ERROR]')
            appendDetail(message)
        }
    });
})