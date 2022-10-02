// data\graphics\game_nemsys -- nemsys
// data\graphics\ap_card -- appeal card
// data\graphics\submonitor_bg -- subbg
$(document).ready(async function() {
    let sdvxDir = document.getElementById("sdvx-dir").innerText
    $( "#updateResources" ).click(async function() {
        answer = confirm("Clicking OK would mean that you have already updated the datacode in your ea3-config.xml file. Would you like to proceed?");
        if (answer == true) {
            document.getElementById("logtextarea").textContent = ''
            document.getElementById("logtextarea").textContent = 'Running....\n'
            await emit("copyResourcesFromGame").then(
                function(response){
                    $.getJSON( "static/asset/logs/copyResourcesFromGame.json", function( data ) {
                        if(data['nemsys'].length > 0) {
                            document.getElementById("logtextarea").textContent += 'New nemsys: \n'
                            $.each(data['nemsys'], function(key, val) {
                                document.getElementById("logtextarea").textContent += "- " + val + '\n'
                            })
                            document.getElementById("logtextarea").textContent += '\n\n'
                        }

                        if(data['apCard'].length > 0) {
                            document.getElementById("logtextarea").textContent += 'New appeal cards: \n'
                            $.each(data['apCard'], function(key, val) {
                                document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                            })
                            document.getElementById("logtextarea").textContent += '\n\n'
                        }

                        if(data['subbg'].length > 0) {                        
                            document.getElementById("logtextarea").textContent += 'New submonitor backgrounds: \n'
                            $.each(data['subbg'], function(key, val) {
                                document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                            })
                            document.getElementById("logtextarea").textContent += '\n\n'
                        }

                        if(data['bgm'].length > 0) {
                            document.getElementById("logtextarea").textContent += 'New bgm: \n'
                            $.each(data['bgm'], function(key, val) {
                                document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                            })
                            document.getElementById("logtextarea").textContent += '\n\n'
                        }

                        if(data['versionSongs'].length > 0) {
                            document.getElementById("logtextarea").textContent += 'New songs in latest data: \n'
                            $.each(data['versionSongs'], function(key, val) {
                                document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                            })
                            document.getElementById("logtextarea").textContent += '\n\n'
                        }

                        if(data['jsonSongs'].length > 0) {
                            document.getElementById("logtextarea").textContent += 'New songs added to mdb asset: \n'
                            $.each(data['jsonSongs'], function(key, val) {
                                document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                            })
                            document.getElementById("logtextarea").textContent += '\n\n'
                        }
                    })
                },
                function(error){
                    console.log(error);
                }
            )
        }
    });
})