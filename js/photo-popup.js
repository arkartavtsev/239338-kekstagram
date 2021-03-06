'use strict';


(function () {
  var photoAttributes = {};


  var pageBody = document.querySelector('body');
  var photoPopup = pageBody.querySelector('.big-picture');
  var closeBtn = photoPopup.querySelector('.big-picture__cancel');

  var picture = photoPopup.querySelector('.big-picture__img img');
  var description = photoPopup.querySelector('.social__caption');
  var likesCount = photoPopup.querySelector('.likes-count');

  var commentsQuantity = photoPopup.querySelector('.comments-count');
  var commentsList = photoPopup.querySelector('.social__comments');
  var loadMoreBtn = photoPopup.querySelector('.social__loadmore');


  var renderPopupContent = function (photo) {
    commentsList.innerHTML = '';
    window.renderComments(photoAttributes, true);

    picture.src = photo.url;
    description.textContent = photo.description;
    likesCount.textContent = photo.likes;
    commentsQuantity.textContent = photo.comments.length;
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };


  var openPopup = function (photo) {
    photoAttributes.comments = photo.comments.slice();
    photoAttributes.avatars = photo.commentsAvatars.slice();

    renderPopupContent(photo);

    photoPopup.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscPress);
    closeBtn.addEventListener('click', closePopup);
  };

  var closePopup = function () {
    pageBody.classList.remove('modal-open');
    photoPopup.classList.add('hidden');
    loadMoreBtn.classList.remove('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    closeBtn.removeEventListener('click', closePopup);
  };


  window.photoPopup = {
    open: openPopup,
    close: closePopup
  };


  loadMoreBtn.addEventListener('click', function () {
    window.renderComments(photoAttributes);
  });
})();
