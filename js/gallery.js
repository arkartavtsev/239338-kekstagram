'use strict';


// отрисовка фотографий на странице


var gallery = document.querySelector('.pictures');
var photos = [];


var preparePosts = function (posts) {
  for (var i = 0; i < posts.length; i++) {
    window.data.generateDescription(posts[i]);
    window.data.generateAvatarsUrls(posts[i]);
    posts[i].id = i;
  }
};


var onPhotoLoadSuccess = function (loadedPhotos) {
  photos = loadedPhotos;

  preparePosts(photos);
  window.renderPhotos(gallery, photos);
};

var onPhotoLoadError = function (errorMessage) {
  var errorContainer = document.createElement('div');

  var hideError = function () {
    errorContainer.classList.add('hidden');
  };

  errorContainer.textContent = 'Ошибка загрузки файлов. ' + errorMessage;
  errorContainer.classList.add('img-upload__message', 'img-upload__message--error');
  document.body.appendChild(errorContainer);

  setTimeout(hideError, 5000);
};


window.backend.load(onPhotoLoadSuccess, onPhotoLoadError);


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
