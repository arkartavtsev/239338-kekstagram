'use strict';


(function () {
  var COMMENTS_PER_PAGE = 5;

  var renderedCommentsCount = 0;

  var fragment = document.createDocumentFragment();

  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
  var commentsCurrentCount = document.querySelector('.comments-current');
  var commentsList = document.querySelector('.social__comments');
  var loadMoreBtn = document.querySelector('.social__loadmore');


  var createAnotherComment = function (template, commentText, avatarUrl) {
    var anotherComment = template.cloneNode(true);

    anotherComment.querySelector('.social__picture').src = avatarUrl;

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = commentText;

    anotherComment.appendChild(text);

    fragment.appendChild(anotherComment);
  };


  var renderComments = function (attributes, isInitial) {
    var lastIndex = COMMENTS_PER_PAGE;

    if (attributes.comments.length < COMMENTS_PER_PAGE) {
      lastIndex = attributes.comments.length;
    }

    if (isInitial) {
      renderedCommentsCount = 0;
    }

    renderedCommentsCount += lastIndex;
    commentsCurrentCount.textContent = renderedCommentsCount;

    for (var i = 0; i < lastIndex; i++) {
      createAnotherComment(commentTemplate, attributes.comments[i], attributes.avatars[i]);
    }

    attributes.comments.splice(0, lastIndex);
    attributes.avatars.splice(0, lastIndex);

    commentsList.appendChild(fragment);

    if (!attributes.comments.length) {
      loadMoreBtn.classList.add('hidden');
    }
  };


  window.renderComments = renderComments;
})();
