var achobt = []
var achdata = []
var aptitlelist = []
$(document).ready(async function() {
	achobt = JSON.parse(document.getElementById("data-pass").innerText);
	achobt.sort(function(a, b){return a['id'] - b['id']});
	achdata = await $.getJSON( "static/asset/json/achievements.json", function(data) {
        return data
    })
    aptitlelist = await $.getJSON( "static/asset/json/data.json", function(data) {
        return data
    })
    aptitlelist = aptitlelist['akaname']

    await populateAch(1);

    $('#ach-filter').change(async function() {
    	// $('.ach-list').empty()
    	await populateAch(parseInt($('#ach-filter').val()));
    })

	
})

async function populateAch(listType) {
	let achListFinal = []
	achdata['achievements'].forEach(ach => {
		let achFound = achobt.find(obt => ach['id'] === obt['id'])
		let reward = ''
		if(ach['rid'] !== -1) {
			if(ach['rtype'] === 'pcb') {
				reward = ach['rid'] + " PCB"
			} else if(ach['rtype'] === 'aptitle') {
				let aptitle = aptitlelist.find(e => parseInt(e['value']) === ach['rid'])
				if (aptitle !== undefined) {
					reward = "Appeal Title \"" + aptitle['name'] + "\""
				} else {
					reward = "Unknown Appeal Title"
				}
			}
		} else {
			reward = '-----'
		}

		if(listType === 1) {
			if(achFound !== undefined) {
				achListFinal.push(
					{
						'id': ach['id'],
						'title': ach['title'],
						'reward': reward
					}
				)
			}
		} else if(listType === 2) {
			if(achFound === undefined) {
				achListFinal.push(
					{
						'id': ach['id'],
						'title': ach['title'],
						'reward': reward
					}
				)
			}
		} else if(listType === 3) {
			achListFinal.push(
				{
					'id': ach['id'],
					'title': ach['title'],
					'reward': reward,
					'comp': (achFound === undefined) ? 'Incomplete' : 'Complete'
				}
			)
		}
	})
	
	$('#achlist').DataTable().clear().destroy()
    $('#achlist').DataTable({
        data: achListFinal,
        columns: (listType === 3) ? [
            { data: 'id' },
            { data: 'title' },
            { data: 'comp' },
            { data: 'reward' }
        ] : [
        	{ data: 'id' },
            { data: 'title' },
            { data: 'reward' }
        ],
        pageLength: 100,
        columnDefs: [
        	{
        		targets: 0,
        		width: "10px"
        	}
        ],
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function(row) {
                        var data = row.data();
                        return 'Details for achievement #' + data.id;
                    }
                })
            }
        }
    });

    if(listType === 3) $($('thead tr').children()[2]).show()
	else $($('thead tr').children()[2]).hide()
}
