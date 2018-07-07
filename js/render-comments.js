'use strict';


(function () {
  var COMMENTS_PER_PAGE = 5;


  var commentsCurrentCount = document.querySelector('.comments-current');
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
  var loadMoreBtn = document.querySelector('.social__loadmore');


  var renderedCommentsCount = 0;


  var createAnotherComment = function (template, comment, avatarUrl) {
    var anotherComment = template.cloneNode(true);

    anotherComment.querySelector('.social__picture').src = avatarUrl;

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment;

    anotherComment.appendChild(text);

    return anotherComment;
  };


  var renderComments = function (comments, avatarUrls) {
    var fragment = document.createDocumentFragment();

    var lastIndex = COMMENTS_PER_PAGE;
    if (comments.length < COMMENTS_PER_PAGE) {
      lastIndex = comments.length;
    }

    renderedCommentsCount += lastIndex;

    for (var i = 0; i < lastIndex; i++) {
      fragment.appendChild(createAnotherComment(commentTemplate, comments[i], avatarUrls[i]));
    }

    comments.splice(0, lastIndex);
    avatarUrls.splice(0, lastIndex);

    commentsList.appendChild(fragment);
    commentsCurrentCount.textContent = renderedCommentsCount;

    if (!comments.length) {
      loadMoreBtn.classList.add('hidden');
      renderedCommentsCount = 0;
    }
  };


  window.renderComments = renderComments;
})();
