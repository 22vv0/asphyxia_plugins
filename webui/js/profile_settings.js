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
  let selected = []
  let ranSel = []
  
  for(const elem of customList) {
    if(parseInt($(`#${elem[0]} option:selected`).val()) === 9999) {
      ranSel = $(`.${elem[0]}-ran input[type=checkbox]:checked`).map(function() { return parseInt(this.value); }).get()
    }
    selected.push([elem[1], parseInt($(`#${elem[0]} option:selected`).val()), elem[2], ranSel])
    ranSel = []
  }
  console.log(selected)

  emit('playerCustomize', { refid, selected }).then(() => location.reload());
});

var customJson
var customizeData = document.getElementById("customize-data") !== null ? JSON.parse(document.getElementById("customize-data").innerText) : [];
const customList = [
  ['appeal', 1, 1, 'appealBoard'],
  ['character-left', 2, 1, 'character'],
  ['character-right', 2, 2, 'character'],
  ['bg-system', 3, 1, 'gameBG'],
  ['bg-play', 3, 2, 'gameBG'],
  ['lanebg-s', 4, 1, 'laneBgSingle'],
  ['lanebg-d', 5, 1, 'laneBgDouble'],
  ['lanecv-s', 6, 1, 'laneCoverSingle'],
  ['lanecv-d', 7, 1, 'laneCoverDouble'],
  ['bg-vid', 8, 1, 'songVid']
]

$(document).ready(function(){
  $.when(
    $.getJSON("static/json/customize.json", function(json) {
      customJson = json;
    }),
  ).then(function() {
    let custInd

    for(const cust of customList) {
      custInd = customizeData.findIndex(c => c.category === cust[1] && c.pattern === cust[2])
      if(cust[1] === 8) {
        for(const item of customJson[cust[3]])
          $(`#${cust[0]}`).append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
      } else {
        for(const ap of customJson[cust[3]]) {
          $(`#${cust[0]}`).append('<optgroup label="' + customJson['optgroup'][ap['optgroup']] + '">')
          for(const item of ap['items'])
            $(`#${cust[0]}`).append('<option value=' + item.id + ((custInd >= 0 && item.id === customizeData[custInd].key) ? " selected" : " ") + ">" + item.name + "</option>")
        }
        if(customizeData[custInd].key === 9999) {
          populateRandomSelect(cust)
        }
      }
    }
  })

  $('#appeal, #character-left, #character-right, #bg-system, #bg-play, #lanebg-s, #lanebg-d, #lanecv-s, #lanecv-d').on('change', function() {
    if(parseInt($(`#${this.id} option:selected`).val()) === 9999) {
      const elem = customList.find(c => c[0] === this.id)
      populateRandomSelect(elem)
    } else {
      $(`.${this.id}-div`).attr('style', 'display: none')
      $(`.${this.id}-ran`).empty()
    }
  })
})

function populateRandomSelect(elem) {
  let list = customJson[elem[3]].flatMap(item => item.items.filter(i => i.id !== 9999) || [])
  $(`.${elem[0]}-div`).removeAttr('style')
  for(const item of list) {
    const plyCust = customizeData.find(c => c.category === elem[1] && c.pattern === elem[2])
    $(`.${elem[0]}-ran`).append(
      `
        <div class="column is-4 form-check form-check-inline">
          <input class="form-check-input" type="checkbox" ${(plyCust.random?.includes(item.id)) ? 'checked' : ''} id="ran${elem[0]}${item.id}" value="${item.id}">
          <label class="form-check-label" for="ran${elem[0]}${item.id}">${item.name}</label>
        </div>
      `
    )
  }
  $(`.${elem[0]}-ran`).append('<br><br><br>')
}