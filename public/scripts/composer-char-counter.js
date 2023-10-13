const maximum = 140;//Number($count.html());

const updateCounter = function() {
  const $count = $('#counter');

  $('#tweet-text').on('keyup', function() {
    const length = $(this).val().length;
    const charactersLeft = maximum - length;
    $count.removeClass('negative');
    
    if (charactersLeft < 0) {
      $count.addClass('negative');
    }

    $count.html(charactersLeft);
  });
};