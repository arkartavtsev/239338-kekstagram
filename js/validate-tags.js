'use strict';


(function () {
  var TagsConstraints = {
    QUANTITY: 5,
    LENGTH: 20
  };

  var tagsField = document.querySelector('.text__hashtags');


  var isBadTagsSeparation = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== '' && arr[i].indexOf('#', 1) !== -1) {
        return true;
      }
    }

    return false;
  };

  var isBadTagFormat = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== '' && (arr[i].charAt(0) !== '#' || arr[i].length === 1)) {
        return true;
      }
    }

    return false;
  };

  var isTooLongTag = function (arr, maxLength) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > maxLength) {
        return true;
      }
    }

    return false;
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


  var validateTags = function () {
    var tags = tagsField.value.trim().toLowerCase().split(' ');

    if (isBadTagsSeparation(tags)) {
      tagsField.setCustomValidity('Хэш-теги должны разделяться одним пробелом');
    } else if (isBadTagFormat(tags)) {
      tagsField.setCustomValidity('Хэш-тег должен начинаться с символа # и не может состоять только из него');
    } else if (isTooLongTag(tags, TagsConstraints.LENGTH)) {
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


  window.validateTags = validateTags;
})();
