$(document).ready(function() {
  const $count = $('#counter');

  const maximum = Number($count.html());

  $('#tweet-text').on('keyup', function() {
    const length = $(this).val().length;
    const charactersLeft = maximum - length; 
    $count.removeClass('negative');
    
    if (charactersLeft < 0) {
      $count.addClass('negative')
    }

    $count.html(charactersLeft);
  });  
});