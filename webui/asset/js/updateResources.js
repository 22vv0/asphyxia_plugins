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
        document.getElementById("logtextarea").textContent = ''
        
        document.getElementById("logtextarea").textContent += 'NOTE:\n- For converting s3p files to mp3, check guide in the notes section above.\n'
        document.getElementById("logtextarea").textContent += '- When running asphyxia in dev mode, you should see copy logs and/or errors on the console in realtime.\n\n'

        document.getElementById("logtextarea").textContent += 'Running....\n\n'
        await emit("copyResourcesFromGame").then(
            function(response){                    
                if(response['data']['errors'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[Errors]" + '\n'
                    $.each(response['data']['errors'], function(key, val) {
                        document.getElementById("logtextarea").textContent += val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\nIf you\'re getting "error reading" logs, check if you\'ve configured "Exceed Gear Data Directory" properly in the plugin settings.\n'
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['course']) {
                    document.getElementById("logtextarea").textContent += "[Skill Analyzer courses]" + '\n'
                    document.getElementById("logtextarea").textContent += "Updated course_data.json from data/exg.ts!"
                }
                document.getElementById("logtextarea").textContent += '\n\n\n'

                if(response['data']['jsonSongs'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[Songs]" + '\n'
                    $.each(response['data']['jsonSongs'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val[1] + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['xcdSongs'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[XCD charts]" + '\n'
                    $.each(response['data']['xcdSongs'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val[1] + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['nemsys'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[NEMSYS]" + '\n'
                    $.each(response['data']['nemsys'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " + val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['bgm'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[BGM]" + '\n'
                    $.each(response['data']['bgm'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['apCard'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[Appeal cards]" + '\n'
                    $.each(response['data']['apCard'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['subbg'].length > 0) {                        
                    document.getElementById("logtextarea").textContent += "[Submonitor BGs]" + '\n'
                    $.each(response['data']['subbg'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }


                if(response['data']['chatStamp'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[Appeal Stamps]" + '\n'
                    $.each(response['data']['chatStamp'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }


                if(response['data']['valgeneItemFiles'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[valgene_item]" + '\n'
                    $.each(response['data']['valgeneItemFiles'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['akaname'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[Appeal titles]" + '\n'
                    $.each(response['data']['akaname'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }

                if(response['data']['ifs'].length > 0) {
                    document.getElementById("logtextarea").textContent += "[IFS textures]" + '\n'
                    $.each(response['data']['ifs'], function(key, val) {
                        document.getElementById("logtextarea").textContent += "- " +  val + '\n'
                    })
                    document.getElementById("logtextarea").textContent += '\n\n'
                }
            }
        )
    });
})