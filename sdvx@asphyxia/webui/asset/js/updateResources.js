// data\graphics\game_nemsys -- nemsys
// data\graphics\ap_card -- appeal card
// data\graphics\submonitor_bg -- subbg
$(document).ready(async function() {
    let sdvxDir = document.getElementById("sdvx-dir").innerText
    $( "#updateResources" ).click(async function() {
        answer = confirm("Clicking OK would mean that you have already updated the datecode in your ea3-config.xml file. Would you like to proceed?");
        if (answer == true) {
            document.getElementById("logtextarea").textContent = ''
            document.getElementById("logtextarea").textContent = 'Updating music_db.json file....\n'
            await emit("generateLatestMusicDBFile").then(
                function(response) {
                    $.getJSON( "static/asset/json/music_db.json", function( data ) {
                        document.getElementById("logtextarea").textContent += "New songs found in version " + data['mdb']['version'] + ": \n";
                        $.each( data['mdb']['music'], function( key, val ) {
                            if(parseInt(val.info.distribution_date['#text']) >= parseInt(data['mdb']['version'].substring(0,8))){
                                document.getElementById("logtextarea").textContent += val.info.distribution_date['#text'] + " - " + val.info.title_name + "\n";
                            }
                        });
                        document.getElementById("logtextarea").textContent += '\n\n'
                    });
                },
                function(error) {
                    document.getElementById("logtextarea").textContent += error + "\n";
                    document.getElementById("logtextarea").textContent += "Please check if 'Exceed Gear Data Directory' is configured properly." + "\n";
                }
            );

            await emit("copyResourcesFromGame").then(
                function(response){
                    $.getJSON( "static/asset/logs/copyResourcesFromGame.json", function( data ) {
                        document.getElementById("logtextarea").textContent += 'New nemsys: \n'
                        $.each(data['nemsys'], function(key, val) {
                            document.getElementById("logtextarea").textContent += val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                        document.getElementById("logtextarea").textContent += 'New appeal cards: \n'
                        $.each(data['apCard'], function(key, val) {
                            document.getElementById("logtextarea").textContent += val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                        document.getElementById("logtextarea").textContent += 'New submonitor backgrounds: \n'
                        $.each(data['subbg'], function(key, val) {
                            document.getElementById("logtextarea").textContent += val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    })
                },
                function(error){
                    console.log(error);
                }
            )
        }
    });
})