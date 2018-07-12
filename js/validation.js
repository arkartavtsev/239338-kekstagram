'use strict';


(function () {
  var TagsConstraints = {
    QUANTITY: 5,
    LENGTH: 20
  };

  var uploader = document.querySelector('.img-upload__form');
  var tagsField = uploader.querySelector('.text__hashtags');


  var isBadTagsSeparation = function (tag) {
    return tag !== '' && tag.indexOf('#', 1) !== -1;
  };

  var isBadTagFormat = function (tag) {
    return tag !== '' && (tag[0] !== '#' || tag.length === 1);
  };

  var isTooLongTag = function (tag) {
    return tag.length > TagsConstraints.LENGTH;
  };

  var isTagsRepeat = function (arr) {
    var existingElements = {};

    for (var i = 0; i < arr.length; i++) {
      if (existingElements[arr[i]]) {
        return true;
      }

      existingElements[arr[i]] = true;
    }

    return false;
  };


  var onTagsFieldInput = function () {
    var tags = tagsField.value.trim().toLowerCase().split(' ');

    if (tags.some(isBadTagsSeparation)) {
      tagsField.setCustomValidity('Хэш-теги должны разделяться одним пробелом');
    } else if (tags.some(isBadTagFormat)) {
      tagsField.setCustomValidity('Хэш-тег должен начинаться с символа # и не может состоять только из него');
    } else if (tags.some(isTooLongTag)) {
      tagsField.setCustomValidity('Максимальная длина одного хэш-тега ' + TagsConstraints.LENGTH + ' символов');
    } else if (isTagsRepeat(tags)) {
      tagsField.setCustomValidity('Хэш-теги не должны повторяться');
    } else if (tags.length > TagsConstraints.QUANTITY) {
      tagsField.setCustomValidity('Нельзя указывать больше ' + TagsConstraints.QUANTITY + ' хэш-тегов');
    } else {
      tagsField.setCustomValidity('');
      tagsField.classList.remove('invalid-field');
    }

    if (tagsField.value && !tagsField.validity.valid) {
      tagsField.classList.add('invalid-field');
    }
  };


  uploader.addEventListener('input', onTagsFieldInput);
})();
