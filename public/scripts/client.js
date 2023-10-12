/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  const date = new Date(tweet.created_at);
  return $(`
    <article class="tweet">
        <header>
          <div><img src="${tweet.user.avatars}"> ${tweet.user.name}</div>
          <div class="dim">${tweet.user.handle}</div>
        </header>
        <p>${tweet.content.text}</p>
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
      renderTweets(tweets.reverse());
      console.log('successfully rendered tweets');
    },
    error: function(error){
      console.log('error:', error);
    }
  })
}

$(document).ready(function() {
  loadTweets();

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const queryString = $(this).serialize();

    $.ajax({
      url: `/tweets`,
      method: 'POST',
      data: queryString
    }).done(function(data) {
      console.log('done', data);
      $('.new-tweet form').trigger('reset');
      loadTweets();
    }).fail(function(error){
      console.log('error', error);
    });
  });
});