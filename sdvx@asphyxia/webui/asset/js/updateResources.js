// data\graphics\game_nemsys -- nemsys
// data\graphics\ap_card -- appeal card
// data\graphics\submonitor_bg -- subbg
$(document).ready(async function() {
    $('.collapse').click(function(){
        console.log($('.collapsible-card').css('display'))
        if($('.collapsible-card').css('display') == 'none') {
            $('.collapsible-card').css('display', 'block')
        } else $('.collapsible-card').css('display', 'none')
    })
    
    $( "#updateResources" ).click(async function() {
        answer = confirm("Clicking OK would mean that you have already updated the datacode in your ea3-config.xml file. Would you like to proceed?");
        if (answer == true) {
            document.getElementById("logtextarea").textContent = ''
            document.getElementById("logtextarea").textContent = 'Running....\n'
            await emit("copyResourcesFromGame").then(
                function(response){
                    document.getElementById("logtextarea").textContent = 'Done.\n\n'
                    document.getElementById("logtextarea").textContent += 'NOTE:\n- labels for these new files (nemsys, bgm, submonitor bg, chat stamps) in the asset/json/data.json file needs to be updated.\n'
                    document.getElementById("logtextarea").textContent += '- for converting s3p files to mp3, check guide in the notes section above.\n\n\n\n'

                    if(response['data']['errors'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'Errors: \n'
                        $.each(response['data']['errors'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " + val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }

                    if(response['data']['versionSongs'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New songs in latest version data: \n'
                        $.each(response['data']['versionSongs'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val[1] + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }


                    if(response['data']['jsonSongs'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New songs added to mdb asset: \n'
                        $.each(response['data']['jsonSongs'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val[1] + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }

                    if(response['data']['xcdSongs'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'XCD songs: \n'
                        $.each(response['data']['xcdSongs'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val[1] + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }

                    if(response['data']['nemsys'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New nemsys: \n'
                        $.each(response['data']['nemsys'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " + val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }

                    if(response['data']['bgm'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New bgm: \n'
                        $.each(response['data']['bgm'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }

                    if(response['data']['apCard'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New appeal cards: \n'
                        $.each(response['data']['apCard'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }

                    if(response['data']['subbg'].length > 0) {                        
                        document.getElementById("logtextarea").textContent += 'New submonitor backgrounds: \n'
                        $.each(response['data']['subbg'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }


                    if(response['data']['chatStamp'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New chat stamps: \n'
                        $.each(response['data']['chatStamp'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }


                    if(response['data']['valgeneItemFiles'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New valgene_item files: \n'
                        $.each(response['data']['valgeneItemFiles'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }

                    // console.log(JSON.stringify(data))
                    if(response['data']['akaname'].length > 0) {
                        document.getElementById("logtextarea").textContent += 'New akanames: \n'
                        $.each(response['data']['akaname'], function(key, val) {
                            document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                        })
                        document.getElementById("logtextarea").textContent += '\n\n'
                    }
                }
            )
        }
    });
})