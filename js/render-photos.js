'use strict';


(function () {
  var fragment = document.createDocumentFragment();
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');


  var removePhoto = function (item) {
    item.remove();
  };

  var clearGallery = function () {
    var existingPhotos = document.querySelectorAll('.picture__link');

    existingPhotos.forEach(removePhoto);
  };

  var addToFragment = function (photo) {
    var anotherPhoto = photoTemplate.cloneNode(true);

    anotherPhoto.querySelector('.picture__img').src = photo.url;
    anotherPhoto.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    anotherPhoto.querySelector('.picture__stat--likes').textContent = photo.likes;
    anotherPhoto.dataset.id = photo.id;

    fragment.appendChild(anotherPhoto);
  };


  var renderPhotos = function (container, photos) {
    photos.forEach(addToFragment);

    clearGallery();
    container.appendChild(fragment);
  };


  window.renderPhotos = renderPhotos;
})();
