function getInfDifficulty(inf_ver) {
    switch (inf_ver) {
        case "2":
            return "INF";
        case "3":
            return "GRV";
        case "4":
            return "HVN";
        case "5":
            return "VVD";
        case "6":
            return "XCD"
    }
}
$(document).ready(function() {
    courseData = musicDB = []
    versionCourseData = []
    courseLevels = []
    specificCourse = []
    selectedVersion = selectedCourseLevel = selectedSpecificCourse = null
    $.getJSON('static/asset/json/course_data.json', function(json) {
        courseData = json;
    })
    $.getJSON("static/asset/json/music_db.json", function(json) {
        musicDB = json;
    });

    $('#savebutton').click(function(){

    })

    $('#sdvx-version').change(function(){
        $('#skill-course').find('option').not(':first').remove();
        $('#skill-course-level').find('option').not(':first').remove();
        $('.track-name').val('');
        $('.track-id').val('');
        $('.track-difficulty').val('');
        if(this.value != '-- Select --'){
            selectedVersion = parseInt(this.value);
            selectedCourseLevel = null;
            selectedSpecificCourse = null;
            versionCourseData = courseData.courseData.find(data => parseInt(data['version']) === selectedVersion).info;
            courseLevels = []
            specificCourse = []
            versionCourseData.forEach(function(item, index){
                item.courses.forEach(function(item2, index2) {
                    if(!courseLevels.some(course => course.includes(item2['name']))) courseLevels.push([item2['name'], item2['id']]);
                })
            });

            $.each(courseLevels, function() {
                $('#skill-course').append("<option value=" + this[1] + ">" + this[0] + "</>");
            });
        }
    })

    $('#skill-course').change(function(){
        $('#skill-course-level').find('option').not(':first').remove();
        $('.track-name').val('');
        $('.track-id').val('');
        $('.track-difficulty').val('');
        if(this.value != '-- Select --'){
            selectedCourseLevel = parseInt(this.value);
            selectedSpecificCourse = null;
            specificCourse = []
            versionCourseData.forEach(function(item, index){
                item.courses.forEach(function(item2, index2) {
                    if(!specificCourse.some(course => course.includes(item['name'])) && item2['id'] == selectedCourseLevel){
                        console.log(item['name'] + " included in " + selectedCourseLevel + " in " + selectedVersion)
                        specificCourse.push([item['name'], item['id']])
                    } 
                })
            });
            $.each(specificCourse, function() {
                console.log(specificCourse)
                $('#skill-course-level').append("<option value=" + this[1] + ">" + this[0] + "</>");
            });
        }
    })

    $('#skill-course-level').change(function(){
        if(this.value != '-- Select --'){
            selectedSpecificCourse = parseInt(this.value);
            theCourse = versionCourseData.find(data => data.id === selectedSpecificCourse).courses
                .find(data => data.id === selectedCourseLevel).tracks;
            trackIndex = 0;
            difficultyLabels = ['Novice', 'Advanced', 'Exhaust', 'Inf/Grv/Hvn/Vvd/Xcd', 'Maximum']
            infLabel = ['0', '1', 'Infinite', 'Gravity', 'Heavenly', 'Vivid', 'Exceed']
            musicDBDifficultyLabel = ['novice', 'advanced', 'exhaust', 'infinite', 'maximum']
            theCourse.forEach(function(courseTrack){
                track = musicDB.mdb.music.find(data => parseInt(courseTrack.mid) === parseInt(data['@id']))
                // console.log(courseTrack.mty)
                if(courseTrack.mty == 3) {
                    difficultyLabel = infLabel[parseInt(track.info.inf_ver['#text'])]
                } else {
                    difficultyLabel = difficultyLabels[courseTrack.mty]
                }
                console.log(courseTrack.mid)
                $(".track-id").eq(trackIndex).val(track['@id'])
                $(".track-name").eq(trackIndex).val(track.info.title_name)
                $(".track-name").eq(trackIndex).attr('track-id', track['@id'])
                $('.track-difficulty').eq(trackIndex).find('option').not(':first').remove();
                $(".track-difficulty").eq(trackIndex).append("<option value=" + 0 + ">" + difficultyLabels[0] + ' (' + track.difficulty['novice'].difnum['#text'] + ")</option>")
                $(".track-difficulty").eq(trackIndex).append("<option value=" + 1 + ">" + difficultyLabels[1] + ' (' + track.difficulty['advanced'].difnum['#text'] + ")</option>")
                $(".track-difficulty").eq(trackIndex).append("<option value=" + 2 + ">" + difficultyLabels[2] + ' (' + track.difficulty['exhaust'].difnum['#text'] + ")</option>")
                if(track.difficulty['maximum'].difnum['#text'] != '0' || track.difficulty['infinite'].difnum['#text'] != '0'){
                    $(".track-difficulty").eq(trackIndex).append("<option value=" + ((courseTrack.mty == 3) ? 3 : 4) + ">" + (track.difficulty['infinite'].difnum['#text'] != '0' ? infLabel[parseInt(track.info.inf_ver['#text'])] : difficultyLabels[4]) + ' (' + (track.difficulty['infinite'].difnum['#text'] != '0' ? track.difficulty['infinite'].difnum['#text'] : track.difficulty['maximum'].difnum['#text']) + ")</option>")
                }
                $(".track-difficulty").eq(trackIndex).val(courseTrack.mty)
                $(".track-difficulty").eq(trackIndex).attr('diff-id', courseTrack.mty)
                trackIndex++;
            })
        }
    })

    $('.track-id').on('input', function(){
        searchTrackID = parseInt(this.value);
        var that_ = this;
        var currentIndex = $('.track-id').index(that_);
        difficultyLabels = ['Novice', 'Advanced', 'Exhaust', 'Inf/Grv/Hvn/Vvd/Xcd', 'Maximum']
        infLabel = ['0', '1', 'Infinite', 'Gravity', 'Heavenly', 'Vivid', 'Exceed']
        musicDBDifficultyLabel = ['novice', 'advanced', 'exhaust', 'infinite', 'maximum']
        track = musicDB.mdb.music.find(data => searchTrackID === parseInt(data['@id']))
        if(track){
            $(".track-name").eq(currentIndex).val(track.info.title_name)
            $(".track-name").eq(currentIndex).attr('track-id', track['@id'])
            $('.track-difficulty').eq(currentIndex).find('option').not(':first').remove();
            $(".track-difficulty").eq(currentIndex).append("<option value=" + 0 + ">" + difficultyLabels[0] + ' (' + track.difficulty['novice'].difnum['#text'] + ")</option>")
            $(".track-difficulty").eq(currentIndex).append("<option value=" + 1 + ">" + difficultyLabels[1] + ' (' + track.difficulty['advanced'].difnum['#text'] + ")</option>")
            $(".track-difficulty").eq(currentIndex).append("<option value=" + 2 + ">" + difficultyLabels[2] + ' (' + track.difficulty['exhaust'].difnum['#text'] + ")</option>")
            if(track.difficulty['maximum'].difnum['#text'] != '0' || track.difficulty['infinite'].difnum['#text'] != '0'){
                $(".track-difficulty").eq(currentIndex).append("<option value=" + ((parseInt(track.info.inf_ver['#text']) != 0) ? 3 : 4) + ">" + (track.difficulty['infinite'].difnum['#text'] != '0' ? infLabel[parseInt(track.info.inf_ver['#text'])] : difficultyLabels[4]) + ' (' + (track.difficulty['infinite'].difnum['#text'] != '0' ? track.difficulty['infinite'].difnum['#text'] : track.difficulty['maximum'].difnum['#text']) + ")</option>")
            }
            $(".track-difficulty").eq(currentIndex).val('-- Select --')
            $(".track-difficulty").eq(currentIndex).attr('diff-id', 0)
        } else {
            $(".track-name").eq(currentIndex).val('')
            $(".track-name").eq(currentIndex).attr('track-id', 0)
            $('.track-difficulty').eq(currentIndex).find('option').not(':first').remove();
        }
    })
})