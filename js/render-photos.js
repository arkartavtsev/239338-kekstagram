'use strict';


(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');


  var removePhoto = function (item) {
    item.remove();
  };

  var clearGallery = function () {
    var existingPhotos = document.querySelectorAll('.picture__link');

    existingPhotos.forEach(removePhoto);
  };


  var createAnotherPhoto = function (template, photo) {
    var anotherPhoto = photoTemplate.cloneNode(true);

    anotherPhoto.querySelector('.picture__img').src = photo.url;
    anotherPhoto.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    anotherPhoto.querySelector('.picture__stat--likes').textContent = photo.likes;
    anotherPhoto.dataset.id = photo.id;

    return anotherPhoto;
  };


  var renderPhotos = function (container, photos) {
    var addToFragment = function (fragment, photo) {
      fragment.appendChild(createAnotherPhoto(photoTemplate, photo));
      return fragment;
    };

    var photosToRender = photos.reduce(addToFragment, document.createDocumentFragment());

    clearGallery();
    container.appendChild(photosToRender);
  };


  window.renderPhotos = renderPhotos;
})();
