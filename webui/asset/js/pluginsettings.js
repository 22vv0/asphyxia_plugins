function generateEventToggles(eventInfo, eventConfig) {
    let cardContent = $('<div class="card-content">')
    cardContent.append(`
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label" for="${eventInfo.id}">${eventInfo.key}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="switch is-rounded">
                            <input type="checkbox" ${eventConfig['toggle'] ? 'checked' : ''} name="${eventInfo['id']}">
                            <span class="check"></span>
                        </label>
                    </div>
                    <p class="help">${eventInfo.explain}</p>
                </div>
            </div>
        </div>
    `)
    return cardContent
}

async function generateNewFlagsConfigFile(eventData) {
    let flagConfig = {}
    for(const flagIter in eventData['flags']) {
        flagConfig[eventData['flags'][flagIter]['id']] = {
            'toggle': false,
            'str': eventData['flags'][flagIter]['str']
        }
    }
    return flagConfig
}

async function readFlagsConfigFile(eventData) {
    try {
        return await $.getJSON("static/asset/config/flags.json", function(data) {
            return data
        })
    } catch {
        return await generateNewFlagsConfigFile(eventData)
    }
} 

async function readEventsJsonFile() {
    return await $.getJSON("static/asset/json/events.json", function(data) {
        return data
    })
}

async function readSettingsFile() {
    return await $.getJSON("static/asset/json/settings.json", function(data) {
        return data
    })
}

async function getMorePluginSettings() {
    return await emit("getMorePluginSettings").then(
        function(response) {
            if(response.data.pluginSettings === null) return {}
            return response.data.pluginSettings
        }
    )
}

function populatePluginSet(setList, pluginSettings) {
    for(const set of setList) {
        $('#pluginset').append(
        `
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label" for="${set.id}">${set.name}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        ${set.html}
                        <p class="help">${set.desc}</p>
                    </div>
                </div>
            </div>
        `)

        if(typeof pluginSettings[set.id] === 'boolean' && pluginSettings[set.id]) {
            $(`[name="${set.id}"]`).attr('checked', 'checked')
        } else {
            $(`[name="${set.id}"]`).val(pluginSettings[set.id])
        }
        
    }


    if(pluginSettings.akanames) {
        let akanames = pluginSettings.akanames.join('\n')
        $('#akanameText').val(akanames)
    }
}

$(document).ready(async function() {
    var setList = await readSettingsFile()
    var pluginSettings = await getMorePluginSettings()
    let eventData = await readEventsJsonFile()
    let flagConfig = await readFlagsConfigFile(eventData)
    for(const flagIter in eventData['flags']) {
        if(flagConfig[eventData['flags'][flagIter]['id']] === undefined) flagConfig[eventData['flags'][flagIter]['id']] = {
            'toggle': false
        }
        $('.card#flags').append(
            generateEventToggles(eventData['flags'][flagIter], flagConfig[eventData['flags'][flagIter]['id']])
        )
    }

    populatePluginSet(setList.pluginSet, pluginSettings)

    $('#flags-submit').on('click', async function() {
        $.each($('#flags span.check'), function(index, value) {
            for(const flagIter in eventData['flags']) {
                let toggle = true
                if($(value).css('background-color').includes("54, 54, 54")) {
                    toggle = false
                }
                if(eventData['flags'][flagIter]['id'] === $(value).parent().children('input').attr('name')) {
                    flagConfig[eventData['flags'][flagIter]['id']] = {
                        'toggle': toggle,
                        'str': eventData['flags'][flagIter]['str']
                    }
                }
            }
        })

        await emit("manageStartupFlags", {flagConfig: flagConfig}).then(
            function(response) {
                alert('Saved.')
            },
            function(error) {
                console.log(error)
            }
        )
    })

    $('#akaname-submit').on('click', async function() {
        let akanames = $('#akanameText').val() === '' ? [] : $('#akanameText').val().split('\n').slice(0,100)
        await emit("saveCustomAkanames", {akanames}).then(
            function(response) {
                alert('List saved.')
            },
            function(error) {
                console.log(error)
            }
        )
    })

    $('#pluginset-submit').on('click', async function() {
        let gwScoreAdjTime = $('[name="gwScoreAdjTime"]').val()
        if(gwScoreAdjTime === '') gwScoreAdjTime = 0
        else if(parseInt(gwScoreAdjTime) > 20) gwScoreAdjTime = 20
        else if(parseInt(gwScoreAdjTime) < -20) gwScoreAdjTime = -20
        else gwScoreAdjTime = parseInt(gwScoreAdjTime)

        let settings = {
            gwScoreAdjTime,
            nblArenaStation: $('[name="nblArenaStation"]').val(),
        }

        $.each($('#more-settings span.check'), function(index, value) {
            settings[$(value).parent().children('input').attr('name')] = !$(value).css('background-color').includes("54, 54, 54")
        })

        await emit("saveMorePluginSettings", {settings}).then(
            function(response) {
                alert('Settings saved.')
            },
            function(error) {
                console.log(error)
            }
        )
    })

    /*
    <div class=\"control is-expanded\"><input class=\"input\" type=\"text\" name=\"test3\"></div>
    */
})
