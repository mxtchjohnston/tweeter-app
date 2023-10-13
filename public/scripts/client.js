
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const _escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const date = new Date(tweet.created_at);
  return $(`
    <article class="tweet">
        <header>
          <div class="profile"><img src="${tweet.user.avatars}">
          ${tweet.user.name}</div>
          <div class="dim">${tweet.user.handle}</div>
        </header>
        <p>${_escape(tweet.content.text)}</p>
        <footer>
          <div>${timeago.format(date)}</div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
  `);
};

const renderTweets = function(tweets) {
  const $container = $('#tweet-container');
  for (const tweet of tweets) {
    $container.append(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  $('#tweet-container').empty();
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: function(tweets) {
      renderTweets(tweets);
      console.log('successfully rendered tweets');
    },
    error: function(error) {
      console.log('error:', error);
    }
  });
};

const alert = function(message) {
  const $alert = $('.alert');
  $alert.text(message);
  $alert.slideDown({
    duration: 400
  });
};

const writeTweetButton = function() {
  $('span.write').on('click', function() {
    $('.new-tweet').slideDown({
      duration: 400
    });
    
    $('#tweet-text').focus();
  });
};

const handleSubmit = function() {
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const $tweet = $('#tweet-text').val();

    if ($tweet === '') {
      alert('The tweet body is empty!');
      return;
    }

    if ($tweet.length > 140) {
      alert('Character limit exceeded!');
      return;
    }
    
    $('.alert').hide();

    const queryString = $(this).serialize();

    $.ajax({
      url: `/tweets`,
      method: 'POST',
      data: queryString
    }).done(function(data) {
      console.log('done', data);
      $('.new-tweet form').trigger('reset');
      loadTweets();
      $('#counter').html(maximum);
      $tweet.focus();
    }).fail(function(error) {
      console.log('error', error);
    });
  });
};

$(document).ready(function() {
  loadTweets();
  writeTweetButton();
  handleSubmit();
  updateCounter();
});