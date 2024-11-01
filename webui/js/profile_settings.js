$('#change-name').on('click', () => {
  const name = $('#dancer_name').val().toUpperCase();

  emit('updateName', { refid, name }).then(() => location.reload());
});

$('#change-weight').on('click', () => {
  const weight = $('#weight_1').val();

  emit('updateWeight', { refid, weight }).then(() => location.reload());
});

$('#reset-today-cal').on('click', () => {
  if (confirm('Are you sure you want to reset today\'s calories?')) {
    emit('resetTodayCal', { refid }).then(() => location.reload());
  }
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
