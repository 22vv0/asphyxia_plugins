function generateEventToggles(eventInfo, eventConfig) {
    let cardContent = $('<div class="card-content">')
    cardContent.append('<div class="field is-horizontal"').append(
        $("<h5>" + eventInfo['key'] + "</h5>")
    ).append(
        $("<p style='font-size: 15px;'>" + eventInfo['explain'] + "</p>")
    )
    
    cardContent.append(
        $('<div class="field is-horizontal">').append(
            $('<div class="field-label is-normal"><label class="label" for="' + eventInfo['id'] + '">Enable</label></div>')
        ).append(
            $('<div class="field-body"><div class="field"><div class="control"><label class="switch is-rounded"><input type="checkbox" ' + (eventConfig['toggle'] ? 'checked' : '') + ' name="' + eventInfo['id'] + '"><span class="check"></span></label></div><p class="help"></p></div></div>')
        )
    )
    return cardContent
}

async function generateNewFlagsConfigFile(eventData) {
    let flagConfig = {}
    for(const flagIter in eventData['flags']) {
        flagConfig[eventData['flags'][flagIter]['id']] = {
            'toggle': true,
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

$(document).ready(async function() {
    let eventData = await readEventsJsonFile()
    let flagConfig = await readFlagsConfigFile(eventData)
    for(const flagIter in eventData['flags']) {
        if(flagConfig[eventData['flags'][flagIter]['id']] === undefined) flagConfig[eventData['flags'][flagIter]['id']] = {
            'toggle': true
        }
        $('.card').append(
            generateEventToggles(eventData['flags'][flagIter], flagConfig[eventData['flags'][flagIter]['id']])
        )
    }
    console.log(flagConfig)

    $('#flags-submit').on('click', async function() {
        $.each($('span.check'), function(index, value) {
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
})
