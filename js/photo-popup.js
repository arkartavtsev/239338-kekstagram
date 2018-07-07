'use strict';


(function () {
  var pageBody = document.querySelector('body');
  var photoPopup = pageBody.querySelector('.big-picture');
  var closeBtn = photoPopup.querySelector('.big-picture__cancel');

  var picture = photoPopup.querySelector('.big-picture__img img');
  var description = photoPopup.querySelector('.social__caption');
  var likesCount = photoPopup.querySelector('.likes-count');

  var commentsCounter = photoPopup.querySelector('.social__comment-count');
  var commentsQuantity = commentsCounter.querySelector('.comments-count');
  var commentsList = photoPopup.querySelector('.social__comments');

  var loadMoreBtn = photoPopup.querySelector('.social__loadmore');


  var comments = [];
  var avatars = [];


  var renderPopupContent = function (photo) {
    window.renderComments(comments, avatars);

    picture.src = photo.url;
    description.textContent = photo.description;
    likesCount.textContent = photo.likes;
    commentsQuantity.textContent = photo.comments.length;
  };


  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, onPopupClose);
  };


  var openPopup = function (photo) {
    comments = photo.comments.slice();
    avatars = photo.commentsAvatarsUrls.slice();

    commentsList.innerHTML = '';
    loadMoreBtn.classList.remove('hidden');
    renderPopupContent(photo);

    photoPopup.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscPress);
    closeBtn.addEventListener('click', onPopupClose);
  };

  var onPopupClose = function () {
    pageBody.classList.remove('modal-open');
    photoPopup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    closeBtn.removeEventListener('click', onPopupClose);
  };


  window.photoPopup = {
    open: openPopup,
    close: onPopupClose
  };


  loadMoreBtn.addEventListener('click', function () {
    window.renderComments(comments, avatars);
  });
})();
