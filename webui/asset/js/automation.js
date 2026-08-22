var mdb = []

function getSongString(music) {
    const diffName = [['NOV', 'novice'], ['ADV', 'advanced'], ['EXH', 'exhaust'], ['INF', 'infinite'], ['MXM', 'maximum']]
    const infName = ['', 'INF', 'GRV', 'HVN', 'VVD']
    let res = "Unknown"
    let search = mdb.find(m => parseInt(m.id) === music.id)
    if(search) {
        let inf = music.grade === 3
        res = search.info.title_name + ' (' + ((inf) ? infName[parseInt(search.info.inf_ver) - 1] : diffName[music.grade][0]) + ' ' + search.difficulty[5][diffName[music.grade][1]] + ')'
    }
    return res
}

async function loadMdb() {
    await $.getJSON("static/asset/json/music_db.json", function(json) {
        mdb = json.mdb.music;
    });
}

function mixList(mixes) {
    for(const ind in mixes) {
        const date = new Date(mixes[ind]['createdAt'])
        let musicList = JSON.parse(mixes[ind].param).musics
        let songString = ''
        let code = mixes[ind]['code']
        for(const [ind, m] of musicList.entries()) {
            songString += getSongString(m)
            if(ind < musicList.length - 1) songString += '\n'
        }
        mixes[ind]['songs'] = songString
        mixes[ind]['code'] = `${code.slice(0,4)}-${code.slice(4,8)}-${code.slice(8)}`
        mixes[ind]['createDate'] = new Intl.DateTimeFormat('en-US').format(date);
    }


    $('#mixlist').DataTable().clear().destroy()
    $('#mixlist').DataTable({
        data: mixes,
        columns: [
            { data: 'code' },
            { data: 'name' },
            { data: 'creator' },
            { data: 'createDate' },
            { 
                data: 'songs',
                render: function(data, type, row) {
                    return `${data.split('\n').map(m => `<li>${m}</li>`).join('\n')}`;
                }
            },
            { data: 'likes' }
        ],
        columnDefs: [
            { width: '12%', targets: [0] },
            { width: '25%', targets: [1] },
            { width: '10%', targets: [2, 3]},
            { width: '25%', targets: [4] },
            { width: '5%', targets: [5]}       
        ]
    });
}

$(document).ready(async function() {
    var mixes = JSON.parse(document.getElementById("mixes").innerText);
    await loadMdb()

    if(window.location.pathname.includes('automation')) {
        mixList(mixes)
    } else {
        for(const mix of mixes) {
            let musics = JSON.parse(mix.param).musics.map(m=>`<li>${getSongString(m)}</li>`).join('\n')
            $(`#mix-songs-${mix.id}`).html(`<ul>${musics}</ul>`)
        }
    }
})
