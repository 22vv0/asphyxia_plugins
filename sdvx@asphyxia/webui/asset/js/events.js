function generateEventToggles(eventInfo, eventConfig, eventEnabled) {
    let cardContent = $('<div class="card-content">')
    cardContent.append('<div class="field is-horizontal"').append(
        $("<h5>" + eventInfo['name'] + "</h5>")
        ).append(
        $("<p style='font-size: 15px;'>" + eventInfo['desc'] + "</p>")
        )
    if(typeof eventInfo['info'] === 'string') {
        cardContent.append(
            $('<div class="field is-horizontal">').append(
                $('<div class="field-label is-normal"><label class="label" for="' + eventInfo['id'] + '">Enable</label></div>')
            ).append(
                $('<div class="field-body"><div class="field"><div class="control"><label class="switch is-rounded"><input type="checkbox" ' + (eventConfig['toggle'] ? 'checked' : '') + ' name="' + eventInfo['id'] + '"><span class="check"></span></label></div><p class="help">' + eventInfo['info'] + '</p></div></div>')
            )
        )
    } else {
        for(const infoIter in eventInfo['info']) {
            if(eventInfo['info'][infoIter].includes('/hd') !== true) {
                cardContent.append(
                    $('<div class="field is-horizontal">').append(
                        $('<div class="field-label is-normal"><label class="label" for="' + eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString() + '">Enable Set ' + (parseInt(infoIter) + 1).toString() + '</label></div>')
                    ).append(
                        $('<div class="field-body"><div class="field"><div class="control"><label class="switch is-rounded"><input type="checkbox" ' + (eventConfig['toggle'][eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString()] ? 'checked' : '') + ' name="' + eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString() + '"><span class="check"></span></label></div><p class="help">' + eventInfo['info'][infoIter] + '</p></div></div>')
                    )
                )
            }
        }
    }
    return cardContent
}

async function generateNewEventsConfigFile(eventData) {
    let eventConfig = {}
    for(const eventIter in eventData['events']) {
        eventConfig[eventData['events'][eventIter]['id']] = await insertNewEventConfig(eventData, eventIter, eventData['events'][eventIter]['id'])
    }
    return eventConfig
}

async function insertNewEventConfig(eventData, eventIter, eventID) {
    let toggle = false
    if(typeof eventData['events'][eventIter]['info'] !== 'string') {
        toggle = {}
        for(const toggleIter in eventData['events'][eventIter]['info']) {
            toggle[eventData['events'][eventIter]['id'] + '_' + (parseInt(toggleIter) + 1)] = false
        }
    }
    return {
        'toggle': toggle
    }
}

async function readEventsConfigFile(eventData) {
    try {
        return await $.getJSON("static/asset/config/events.json", function(data) {
            return data
        })
    } catch {
        return await generateNewEventsConfigFile(eventData)
    }
} 

async function readEventsJsonFile() {
    return await $.getJSON("static/asset/json/events.json", function(data) {
        return data
    })
}

$(document).ready(async function() {
    let eventData = await readEventsJsonFile()
    let eventConfig = await readEventsConfigFile(eventData)
    for(const eventIter in eventData['events']) {
        if(eventConfig[eventData['events'][eventIter]['id']] === undefined) {
            eventConfig[eventData['events'][eventIter]['id']] = await insertNewEventConfig(eventData, eventIter, eventData['events'][eventIter]['id'])
        }

        if(eventData['events'][eventIter]['enabled']) {   
            if(eventData['events'][eventIter]['type'] === 'stamp') {
                $('#stampevent_select').append(
                    '<option value=' + eventData['events'][eventIter]['id'] + '>' + eventData['events'][eventIter]['name'] + '</option>'
                )
            } else if(eventData['events'][eventIter]['type'] === 'gift') {
                $('#giftevent_select').append(
                    '<option value=' + eventData['events'][eventIter]['id'] + '>' + eventData['events'][eventIter]['name'] + '</option>'
                )
            } else if(eventData['events'][eventIter]['type'] === 'cross_online') {
                $('#crossevent_select').append(
                    '<option value=' + eventData['events'][eventIter]['id'] + '>' + eventData['events'][eventIter]['name'] + '</option>'
                )
            }
        }
    }

    $('#event-submit').on('click', async function() {
        $.each($('span.check'), function(index, value) {
            for(const eventIter in eventData['events']) {
                let toggle = true
                if($(value).css('background-color').includes("54, 54, 54")) {
                    toggle = false
                }

                if(eventData['events'][eventIter]['id'] === $(value).parent().children('input').attr('name')) {
                    eventConfig[eventData['events'][eventIter]['id']]['toggle'] = toggle
                } else if ($(value).parent().children('input').attr('name').includes(eventData['events'][eventIter]['id'] + "_")) {
                    if(eventConfig[eventData['events'][eventIter]['id']]['toggle'] !== undefined && typeof eventConfig[eventData['events'][eventIter]['id']]['toggle'] === 'boolean') eventConfig[eventData['events'][eventIter]['id']]['toggle'] = {}
                    eventConfig[eventData['events'][eventIter]['id']]['toggle'][[$(value).parent().children('input').attr('name')]] = toggle
                }
            }
        })

        await emit("manageEvents", {eventConfig: eventConfig}).then(
            function(response) {
                alert('Saved.')
            },
            function(error) {
                console.log(error)
            }
        )
    })

    $('select').change(async function(event) {
        let selectClass = '#' + $(this).attr('id')
        let listClasses = {'#stampevent_select': 'stamp', '#giftevent_select': 'gift', '#crossevent_select': 'cross'}
        $('.' + listClasses[selectClass] + '.list').empty()
        for(const eventIter in eventData['events']) {
            if(eventData['events'][eventIter]['id'] === $(selectClass).val()) {
                $('.' + listClasses[selectClass] + '.list').append(
                    generateEventToggles(eventData['events'][eventIter], eventConfig[eventData['events'][eventIter]['id']], eventData['events'][eventIter]['enabled'])
                )
                $('div.main').append(
                    $('<div class="field is-grouped"><div class="control is-expanded"></div><div class="control"><button class="button is-link" id="event-submit">Apply</button></div></div>')
                )
            }
        }
    })


})
