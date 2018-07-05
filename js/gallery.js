'use strict';


// отрисовка фотографий на странице


var gallery = document.querySelector('.pictures');
var photos = window.generatePhotos();

window.renderPhotos(gallery, photos);


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
