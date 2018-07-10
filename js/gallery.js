'use strict';


(function () {
  // отрисовка фотографий на странице


  var gallery = document.querySelector('.pictures');
  var photos = [];


  var preparePhotos = function (array) {
    for (var i = 0; i < array.length; i++) {
      window.data.generateDescription(array[i]);
      window.data.generateAvatars(array[i]);
      array[i].id = i;
    }
  };


  var createPhotos = function (loadedPhotos) {
    photos = loadedPhotos;

    preparePhotos(photos);
    window.renderPhotos(gallery, photos);
  };

  var showError = function (errorMessage) {
    var errorContainer = document.createElement('div');

    var hideError = function () {
      errorContainer.classList.add('hidden');
    };

    errorContainer.textContent = 'Ошибка загрузки файлов. ' + errorMessage;
    errorContainer.classList.add('img-upload__message', 'img-upload__message--error');
    document.body.appendChild(errorContainer);

    setTimeout(hideError, 5000);
  };


  window.backend.load(createPhotos, showError);


  // открытие попапа с полноразмерным фото


  var onPhotoClick = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      window.photoPopup.open(photos[evt.target.parentElement.dataset.id]);
    }
  };

  var onPhotoEnterPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ENTER && document.activeElement.classList.contains('picture__link')) {
      evt.preventDefault();
      window.photoPopup.open(photos[document.activeElement.dataset.id]);
    }
  };


  gallery.addEventListener('click', onPhotoClick);
  document.addEventListener('keydown', onPhotoEnterPress);
})();
