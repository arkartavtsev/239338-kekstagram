'use strict';


(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');


  var createAnotherPhoto = function (template, photo) {
    var anotherPhoto = template.cloneNode(true);

    anotherPhoto.querySelector('.picture__img').src = photo.url;
    anotherPhoto.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    anotherPhoto.querySelector('.picture__stat--likes').textContent = photo.likes;
    anotherPhoto.dataset.id = photo.id;

    return anotherPhoto;
  };

  var renderPhotos = function (container, photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createAnotherPhoto(photoTemplate, photos[i]));
    }

    container.appendChild(fragment);
  };


  window.renderPhotos = renderPhotos;
})();
