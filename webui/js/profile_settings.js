$('#change-name').on('click', () => {
  const name = $('#dancer_name').val().toUpperCase();

  emit('updateName', { refid, name }).then(() => location.reload());
});

$('#change-weight').on('click', () => {
  const weight1 = $('#weight_1').val();
  const weight2 = $('#weight_2').val();
  const weight = weight1 + '.' + weight2;

  emit('updateWeight', { refid, weight }).then(() => location.reload());
});

$('#change-display-calories').on('click', () => {
  const selected = $('#display_calories option:selected').val();

  emit('updateDisplayCalories', { refid, selected }).then(() => location.reload());
});

$('#change-arrow-skin').on('click', () => {
  const selected = $('#arrow_skin option:selected').val();

  emit('updateArrowSkin', { refid, selected }).then(() => location.reload());
});

$('#change-guideline').on('click', () => {
  const selected = $('#guideline option:selected').val();

  emit('updateGuideline', { refid, selected }).then(() => location.reload());
});

$('#change-filter').on('click', () => {
  const selected = $('#filter option:selected').val();

  emit('updateFilter', { refid, selected }).then(() => location.reload());
});

$('#change-judgment-priority').on('click', () => {
  const selected = $('#judgment_priority option:selected').val();

  emit('updateJudgmentPriority', { refid, selected }).then(() => location.reload());
});

$('#change-display-timing').on('click', () => {
  const selected = $('#display_timing option:selected').val();

  emit('updateDisplayTiming', { refid, selected }).then(() => location.reload());
});


$('#change-name3').on('click', () => {
  const name = $('#name3').val().toUpperCase();

  emit('updateName3', { refid, name }).then(() => location.reload());
});

$('#change-weight3').on('click', () => {
  const weight1 = $('#weight31').val();
  const weight2 = $('#weight32').val();
  const weight = parseInt(weight1 + '.' + weight2);

  emit('updateWeight3', { refid, weight }).then(() => location.reload());
});

$('#change-display-calories3').on('click', () => {
  const selected = parseInt($('#display_calories3 option:selected').val()) !== 0

  emit('updateDisplayCalories3', { refid, selected }).then(() => location.reload());
});

$('#change-platinum').on('click', () => {
  const selected = parseInt($('#platinum option:selected').val()) !== 0
  let currentSub = document.getElementById("platinum-data").innerText === "true"

  emit('updatePlatinum', { refid, selected, currentSub }).then(() => location.reload());
});

$('#customsave').on('click', () => {
  let selected = [
    [1, parseInt($('#appeal option:selected').val()), 1],
    [2, parseInt($('#character-left option:selected').val()), 1],
    [2, parseInt($('#character-right option:selected').val()), 2],
    [3, parseInt($('#bg-system option:selected').val()), 1],
    [3, parseInt($('#bg-play option:selected').val()), 2],
    [4, parseInt($('#lanebg-s option:selected').val()), 1],
    [5, parseInt($('#lanebg-d option:selected').val()), 1],
    [6, parseInt($('#lanecv-s option:selected').val()), 1],
    [7, parseInt($('#lanecv-d option:selected').val()), 1],
    [8, parseInt($('#bg-vid option:selected').val()), 1],
  ]

  emit('playerCustomize', { refid, selected }).then(() => location.reload());
});

var customJson
var customizeData = document.getElementById("customize-data") !== null ? JSON.parse(document.getElementById("customize-data").innerText) : [];

$(document).ready(function(){
  $.when(
    $.getJSON("static/json/customize.json", function(json) {
      customJson = json;
    }),
  ).then(function() {
    let custInd, custInd2
    custInd = customizeData.findIndex(c => c.category === 1)
    for(const ap of customJson['appealBoard']) {
      $('#appeal').append('<optgroup label="' + customJson['optgroup'][ap['optgroup']] + '">')
      for(const item of ap['items'])
        $('#appeal').append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
    }

    custInd = customizeData.findIndex(c => c.category === 2 && c.pattern === 1)
    custInd2 = customizeData.findIndex(c => c.category === 2 && c.pattern === 2)
    for(const ch of customJson['character']) {
      $('#character-left').append('<optgroup label="' + customJson['optgroup'][ch['optgroup']] + '">')
      for(const item of ch['items'])
        $('#character-left').append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
      
      $('#character-right').append('<optgroup label="' + customJson['optgroup'][ch['optgroup']] + '">')
      for(const item of ch['items'])
        $('#character-right').append('<option value=' + item.id + ((custInd2 >= 0 && item.id === customizeData[custInd2].key) ? " selected" : " ") + ">" + item.name + "</option>")
    }

    custInd = customizeData.findIndex(c => c.category === 3 && c.pattern === 1)
    custInd2 = customizeData.findIndex(c => c.category === 3 && c.pattern === 2)
    for(const bg of customJson['gameBG']) {
      $('#bg-system').append('<optgroup label="' + customJson['optgroup'][bg['optgroup']] + '">')
      for(const item of bg['items'])
        $('#bg-system').append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
      
      $('#bg-play').append('<optgroup label="' + customJson['optgroup'][bg['optgroup']] + '">')
      for(const item of bg['items'])
        $('#bg-play').append('<option value=' + item.id + ((custInd2 >= 0 && item.id === customizeData[custInd2].key) ? " selected" : " ") + ">" + item.name + "</option>")
    }

    custInd = customizeData.findIndex(c => c.category === 4)
    for(const lbg of customJson['laneBgSingle']) {
      $('#lanebg-s').append('<optgroup label="' + customJson['optgroup'][lbg['optgroup']] + '">')
      for(const item of lbg['items'])
        $('#lanebg-s').append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
    }

    custInd = customizeData.findIndex(c => c.category === 5)
    for(const lbg of customJson['laneBgDouble']) {
      $('#lanebg-d').append('<optgroup label="' + customJson['optgroup'][lbg['optgroup']] + '">')
      for(const item of lbg['items'])
        $('#lanebg-d').append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
    }

    custInd = customizeData.findIndex(c => c.category === 6)
    for(const lcv of customJson['laneCoverSingle']) {
      $('#lanecv-s').append('<optgroup label="' + customJson['optgroup'][lcv['optgroup']] + '">')
      for(const item of lcv['items'])
        $('#lanecv-s').append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
    }
    
    custInd = customizeData.findIndex(c => c.category === 7)
    for(const lcv of customJson['laneCoverDouble']) {
      $('#lanecv-d').append('<optgroup label="' + customJson['optgroup'][lcv['optgroup']] + '">')
      for(const item of lcv['items'])
        $('#lanecv-d').append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
    }

    custInd = customizeData.findIndex(c => c.category === 8)
    for(const bg of customJson['songVid']) {
      $('#bg-vid').append('<option value=' + bg.id + ((custInd >= 0 && bg.id === customizeData[custInd].key) ? " selected" : " ") + ">" + bg.name + "</option>")
    }
  })
})