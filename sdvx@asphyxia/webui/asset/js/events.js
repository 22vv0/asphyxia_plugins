let hiddenEvents = ['xrecord', 'bpl2021', 'bsb2021', 'sdvx10thstamp', 'reflecstamp', 'gmz2022', 'pcbevent', '2023appealstampevent', '11thannivappealstampevent']

function generateEventToggles(eventInfo, eventConfig) {
    let cardContent = $('<div class="card-content">')
    if(!['bpl2022', 'konasute'].includes(eventInfo['id'])) {
        cardContent.append(
            $('<div class="field is-horizontal">').append(
                $('<div class="field-label is-normal"><label class="label" for="' + eventInfo['id'] + '">Enable</label></div>')
            ).append(
                $('<div class="field-body"><div class="field"><div class="control"><label class="switch is-rounded"><input type="checkbox" ' + (eventConfig['toggle'] ? 'checked' : '') + ' name="' + eventInfo['id'] + '"><span class="check"></span></label></div><p class="help">' + eventInfo['info'] + '</p></div></div>')
            )
        )
    } else {
        for(const infoIter in eventInfo['info']) {
            cardContent.append(
                $('<div class="field is-horizontal">').append(
                    $('<div class="field-label is-normal"><label class="label" for="' + eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString() + '">Enable Set ' + (parseInt(infoIter) + 1).toString() + '</label></div>')
                ).append(
                    $('<div class="field-body"><div class="field"><div class="control"><label class="switch is-rounded"><input type="checkbox" ' + (eventConfig['toggle'][eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString()] ? 'checked' : '') + ' name="' + eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString() + '"><span class="check"></span></label></div><p class="help">' + eventInfo['info'][infoIter] + '</p></div></div>')
                )
            )
        }
    }
    return cardContent
}

async function readEventsConfigFile() {
    try {
        return await $.getJSON("static/asset/config/events.json", function(data) {
            return data
        })
    } catch {
        return await generateNewEventsConfigFile()
    }
} 

async function readEventsJsonFile() {
    return await $.getJSON("static/asset/json/events.json", function(data) {
        return data
    })
}

async function generateNewEventsConfigFile() {
    let eventConfig = {}
    let eventData = await readEventsJsonFile()
    for(const eventIter in eventData['events']) {
        let hidden = false
        let toggle = false
        if(['bpl2022', 'konasute'].includes(eventData['events'][eventIter]['id'])) {
            toggle = {}
            for(const toggleIter in eventData['events'][eventIter]['info']) {
                toggle[eventData['events'][eventIter]['id'] + '_' + (parseInt(toggleIter) + 1)] = false
            }
        }
        if(hiddenEvents.includes(eventData['events'][eventIter]['id'])) {
            hidden = true
        }
        eventConfig[eventData['events'][eventIter]['id']] = {
            'hidden': hidden,
            'toggle': toggle
        }
    }
    return eventConfig
}


$(document).ready(async function() {
    let eventData = await readEventsJsonFile()
    let eventConfig = await readEventsConfigFile()
    for(const eventIter in eventData['events']) {

        // NEEDS MORE WORK FOR EVENTS WITH MULTIPLE TOGGLES EACH
        if(!(eventData['events'][eventIter]['id'] in eventConfig)) {
            eventConfig[eventData['events'][eventIter]['id']] = {
                'hidden': hiddenEvents.includes(eventData['events'][eventIter]['id']),
                'toggle': false
            }
        }
        if(!eventConfig[eventData['events'][eventIter]['id']]['hidden']) {
            $('div.main').append(
                $('<header class="card-header"><p class="card-header-title"><span class="icon"><i class="mdi mdi-calendar-clock"></i></span>' + eventData['events'][eventIter]['name'] + '</p></header>')
            ).append(
                generateEventToggles(eventData['events'][eventIter], eventConfig[eventData['events'][eventIter]['id']])
            )
        }
    }
    $('div.main').append(
        $('<div class="field is-grouped"><div class="control is-expanded"></div><div class="control"><button class="button is-link" id="event-submit">Apply</button></div></div>')
    )

    $('#event-submit').on('click', async function() {
        $.each($('span.check'), function(index, value) {
            for(const eventIter in eventData['events']) {
                let toggle = true
                if($(value).css('background-color').includes("54, 54, 54")) {
                    toggle = false
                }

                if(eventData['events'][eventIter]['id'] === $(value).parent().children('input').attr('name')) {
                    eventConfig[eventData['events'][eventIter]['id']]['toggle'] = toggle
                } else if ($(value).parent().children('input').attr('name').includes(eventData['events'][eventIter]['id'])) {
                    eventConfig[eventData['events'][eventIter]['id']]['toggle'][[$(value).parent().children('input').attr('name')]] = toggle
                }
            }
        })

        await emit("manageEvents", {eventConfig: eventConfig}).then(
            function(response) {
                alert('saved')
            },
            function(error) {
                console.log(error)
            }
        )
    })
})