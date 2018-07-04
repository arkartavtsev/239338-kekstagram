'use strict';


(function () {
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');


  var createAnotherComment = function (template, comment) {
    var anotherComment = template.cloneNode(true);

    anotherComment.querySelector('.social__picture').src = comment.avatarUrl;

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.text;

    anotherComment.appendChild(text);

    return anotherComment;
  };


  window.renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(createAnotherComment(commentTemplate, comments[i]));
    }

    commentsList.innerHTML = '';
    commentsList.appendChild(fragment);
  };
})();
