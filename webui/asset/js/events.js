var currentVersion = 7;
var urlParams;
var versionText = ['', 'BOOTH', 'INFINTE INFECTION', 'GRAVITY WARS', 'HEAVENLY HAVEN', 'VIVIDWAVE', 'EXCEED GEAR', '∇']
let date = new Date();
let musicDb;

$.getJSON("static/asset/json/music_db.json", function(json) {
    musicDb = json;
})


function formatStartDate(startDate) {
    return startDate.toString().slice(0,4) + '-' + startDate.toString().slice(4,6) + '-' + startDate.toString().slice(6,8)
}

function checkStart(startDate) {
    if(startDate === 0) return true
    let start = formatStartDate(startDate)
    let checkStartUTC = new Date(start +'T00:00:00Z')

    if (date.getTime() >= checkStartUTC.getTime()) return false
    return true
}

function substituteString(str, start) {
    let mid = str.match(/\[mid:\d+\]/g);
    if(!mid) return str
    mid = mid[0].slice(5,9)
    let musicData = musicDb.mdb.music.find(m => m.id === mid)
    let title = ''
    if(checkStart(start)) title = '????'
    else if(!musicData) title = '[TITLE NOT FOUND]'
    else title = musicData['info']['title_name']

    return str.replace(/\[mid:\d+\]/g, title)
}

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
                $('<div class="field-body"><div class="field"><div class="control"><label class="switch is-rounded"><input type="checkbox" ' + (eventConfig['toggle'] ? 'checked' : '') + ' name="' + eventInfo['id'] + '"><span class="check"></span></label></div><p class="help">' + (checkStart(eventInfo['start'], date) ? substituteString(eventInfo['info'], eventInfo['start']) + ' (disabled until ' + formatStartDate(eventInfo['start']) +'  00:00 UTC)' : substituteString(eventInfo['info'], eventInfo['start'])) + '</p></div></div>')
            )
        )
        if(eventInfo['settings'] !== undefined) {
            for(let set of eventInfo['settings']){
                cardContent.append(
                    $('<div class="field is-horizontal">').append(
                        $('<div class="field-label is-normal">').append(
                            $('<label class="label" for="' + set['id'] + '">' + set['title'] + '</label>')
                        )
                    ).append(
                        $('<div class="field-body">').append(
                            $('<div class="field">').append(
                                $('<div class="control">').append(
                                    $('<div class="select">').append(
                                        $('<select name="' + set['id'] + '">').append(
                                            set['val'].map(s => 
                                                $('<option>', {
                                                    value: s[0], 
                                                    text: s[1],
                                                    selected: s[0] === parseInt(eventConfig['settings'][set['id']])
                                                })
                                            )
                                        )
                                    )
                                )
                            ).append('<p class="help">' + set['desc'] + '</p>')
                        )
                    )
                )
            }
        }    
    }

    if(Array.isArray(eventInfo['info'])) {
        for(const infoIter in eventInfo['info']) {
            if(eventInfo['info'][infoIter].includes('/hd') !== true) {
                cardContent.append(
                    $('<div class="field is-horizontal">').append(
                        $('<div class="field-label is-normal"><label class="label" for="' + eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString() + '">Enable Set ' + (parseInt(infoIter) + 1).toString() + '</label></div>')
                    ).append(
                        $('<div class="field-body"><div class="field"><div class="control"><label class="switch is-rounded"><input type="checkbox" ' + (eventConfig['toggle'][eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString()] ? 'checked' : '') + ' name="' + (eventInfo['id'] + '_' + (parseInt(infoIter) + 1).toString()) + '"><span class="check"></span></label></div><p class="help">' + substituteString(eventInfo['info'][infoIter], eventInfo['start'][infoIter]) + (checkStart(eventInfo['start'][infoIter], date) ? " (disabled until " + formatStartDate(eventInfo['start'][infoIter]) + " 00:00 UTC)" : '') + '</p></div></div>')
                    )
                )
            }
        }
    }
    return cardContent
}

async function generateNewEventsConfigFile(eventData, eventConfig) {
    for(const eventIter in eventData['events6']) {
        eventConfig[eventData['events6'][eventIter]['id']] = await insertNewEventConfig(eventData, eventIter, eventData['events6'][eventIter]['id'], 6)
    }
    for(const eventIter in eventData['events7']) {
        eventConfig[eventData['events7'][eventIter]['id']] = await insertNewEventConfig(eventData, eventIter, eventData['events7'][eventIter]['id'], 7)
    }
    return eventConfig
}

async function insertNewEventConfig(eventData, eventIter, eventID, version) {

    let toggle = false
    if(typeof eventData['events' + version][eventIter]['info'] !== 'string') {
        toggle = {}
        for(const toggleIter in eventData['events' + version][eventIter]['info']) {
            toggle[eventData['events' + version][eventIter]['id'] + '_' + (parseInt(toggleIter) + 1)] = false
        }
    }
    if(eventData['events' + version][eventIter]['settings'] !== undefined) {
        let settings = {}
        for(const set of eventData['events' + version][eventIter]['settings']) {
            settings[set['id']] = ''
        }
        return {
            'toggle': toggle,
            'settings': settings
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
        return await generateNewEventsConfigFile(eventData, {})
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

    urlParams = new URLSearchParams(window.location.search);
    currentVersion = (urlParams.has('version') && urlParams.get('version') !== "") ? parseInt(urlParams.get('version')) : currentVersion

    let versions = [
        ["6", "EXCEED GEAR"],
        ["7", "∇"]
    ]
    for (var i = 0; i < versions.length; i++) {
        $('#version_select').append(
            $('<option>', {
                value: versions[i][0],
                text: versions[i][1],
                selected: (parseInt(versions[i][0]) === currentVersion)
            })
        )
    }

    $('select#version_select').change(async function(event) {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('version', $('#version_select').val());
        location.search = urlParams;
    })

    for(const eventIter in eventData['events' + currentVersion]) {
        if(eventConfig[eventData['events' + currentVersion][eventIter]['id']] === undefined) {
            eventConfig[eventData['events' + currentVersion][eventIter]['id']] = await insertNewEventConfig(eventData, eventIter, eventData['events' + currentVersion][eventIter]['id'], currentVersion)
        }

        if(eventData['events' + currentVersion][eventIter]['enabled']) {   
            if(/tama|variant|achmissions/.test(eventData['events' + currentVersion][eventIter]['type'])) {
                $('#specevent_select').append(
                    '<option value=' + eventData['events' + currentVersion][eventIter]['id'] + '>' + eventData['events' + currentVersion][eventIter]['name'] + '</option>'
                )
            }
            else if(/stamp|completestamp/.test(eventData['events' + currentVersion][eventIter]['type'])) {
                $('#stampevent_select').append(
                    '<option value=' + eventData['events' + currentVersion][eventIter]['id'] + '>' + eventData['events' + currentVersion][eventIter]['name'] + '</option>'
                )
            } else if(/gift/.test(eventData['events' + currentVersion][eventIter]['type'])) {
                $('#giftevent_select').append(
                    '<option value=' + eventData['events' + currentVersion][eventIter]['id'] + '>' + eventData['events' + currentVersion][eventIter]['name'] + '</option>'
                )
            } else if(/cross_online/.test(eventData['events' + currentVersion][eventIter]['type'])) {
                $('#crossevent_select').append(
                    '<option value=' + eventData['events' + currentVersion][eventIter]['id'] + '>' + eventData['events' + currentVersion][eventIter]['name'] + '</option>'
                )
            }
        }
    }

    $('#event-submit').on('click', async function() {
        $.each($('span.check'), function(index, value) {
            for(const eventIter in eventData['events' + currentVersion]) {
                let toggle = true
                if($(value).css('background-color').includes("54, 54, 54")) {
                    toggle = false
                }

                if(eventData['events' + currentVersion][eventIter]['id'] === $(value).parent().children('input').attr('name')) {
                    eventConfig[eventData['events' + currentVersion][eventIter]['id']]['toggle'] = toggle
                } else if ($(value).parent().children('input').attr('name').includes(eventData['events' + currentVersion][eventIter]['id'] + "_")) {
                    if(eventConfig[eventData['events' + currentVersion][eventIter]['id']]['toggle'] !== undefined && typeof eventConfig[eventData['events' + currentVersion][eventIter]['id']]['toggle'] === 'boolean') eventConfig[eventData['events' + currentVersion][eventIter]['id']]['toggle'] = {}
                    eventConfig[eventData['events' + currentVersion][eventIter]['id']]['toggle'][[$(value).parent().children('input').attr('name')]] = toggle
                }
            }
        })

        $.each($('select'), function(index, value) {
            for(const eventIter in eventData['events' + currentVersion]) {
                if(eventData['events' + currentVersion][eventIter]['settings'] !== undefined) {
                    for(const set of eventData['events' + currentVersion][eventIter]['settings']) {
                        if(eventData['events' + currentVersion][eventIter]['id'] === $('#specevent_select').val() && set['id'] === $(value).parent().children('select').attr('name')) {
                            eventConfig[eventData['events' + currentVersion][eventIter]['id']]['settings'][set['id']] = $(value).parent().children('select').val()
                        }
                    }
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
        let listClasses = {'#specevent_select': 'spec', '#stampevent_select': 'stamp', '#giftevent_select': 'gift', '#crossevent_select': 'cross'}
        if(selectClass in listClasses) {
            $('.' + listClasses[selectClass] + '.list').empty()
            for(const eventIter in eventData['events' + currentVersion]) {
                if(eventData['events' + currentVersion][eventIter]['id'] === $(selectClass).val()) {
                    $('.' + listClasses[selectClass] + '.list').append(
                        generateEventToggles(eventData['events' + currentVersion][eventIter], eventConfig[eventData['events' + currentVersion][eventIter]['id']], eventData['events' + currentVersion][eventIter]['enabled'])
                    )
                    $('div.main').append(
                        $('<div class="field is-grouped"><div class="control is-expanded"></div><div class="control"><button class="button is-link" id="event-submit">Apply</button></div></div>')
                    )
                }
            }
        }
    })


})
