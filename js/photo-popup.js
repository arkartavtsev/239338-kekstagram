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

  var loadMoreBtn = photoPopup.querySelector('.social__loadmore');


  var renderPopupContent = function (photo) {
    window.renderComments(photo.comments);

    picture.src = photo.url;
    description.textContent = photo.description;
    likesCount.textContent = photo.likes;
    commentsQuantity.textContent = photo.comments.length;

    commentsCounter.classList.add('visually-hidden');
    loadMoreBtn.classList.add('visually-hidden');
  };


  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, onPopupClose);
  };


  var openPopup = function (photo) {
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
})();
