/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//fake data
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1696823131606
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1696909531606
  }
];

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
          <div>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
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

$(document).ready(function() {
  renderTweets(data);

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const queryString = $(this).serialize();

    $.ajax({
      url: `/tweets`,
      method: 'POST',
      data: queryString
    }).done(function(data) {
      console.log('done', data);
    }).fail(function(error){
      console.log('error', error);
    });
  });
});