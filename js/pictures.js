'use strict';


var KeyCodes = {
  ENTER: 13,
  ESC: 27
};

var ResizeValues = {
  INITIAL: 100,
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var HastagsValidity = {
  MAX_QUANTITY: 5,
  MAX_LENGTH: 20
};

var PhotosProperties = {
  QUANTITY: 25,
  LIKES: {
    MIN: 15,
    MAX: 200
  },
  COMMENTS: {
    MAX: 5,
    LIST: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ]
  },
  DESCRIPTIONS: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ]
};

var AVATARS_COUNT = 6;


var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getRandomItem = function (arr) {
  return arr[getRandomNum(0, arr.length - 1)];
};


// генерация комментариев и фотографий


var generateComments = function (phrasesList, max) {
  var comments = [];
  var possiblePhrases = phrasesList.slice();

  for (var i = 0; i < getRandomNum(1, max); i++) {
    var index = getRandomNum(0, possiblePhrases.length - 1);

    if (index >= 0) {
      var newComment = {
        avatarUrl: 'img/avatar-' + getRandomNum(1, AVATARS_COUNT) + '.svg',
        text: possiblePhrases[index]
      };
      comments.push(newComment);
      possiblePhrases.splice(index, 1);
    }
  }

  return comments;
};

var generatePhotos = function (properties) {
  var photos = [];

  for (var i = 0; i < properties.QUANTITY; i++) {
    photos.push({
      index: i,
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNum(properties.LIKES.MIN, properties.LIKES.MAX),
      comments: generateComments(properties.COMMENTS.LIST, properties.COMMENTS.MAX),
      description: getRandomItem(properties.DESCRIPTIONS)
    });
  }

  return photos;
};


// выгрузка фотографий на страницу


var pageBody = document.querySelector('body');
var photosContainer = pageBody.querySelector('.pictures');

var bigPhotoContainer = pageBody.querySelector('.big-picture');
var bigPhotoCloseBtn = bigPhotoContainer.querySelector('.big-picture__cancel');


var createAnotherPhoto = function (template, photo) {
  var anotherPhoto = template.cloneNode(true);

  anotherPhoto.querySelector('.picture__img').src = photo.url;
  anotherPhoto.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  anotherPhoto.querySelector('.picture__stat--likes').textContent = photo.likes;
  anotherPhoto.dataset.id = photo.index;

  return anotherPhoto;
};

var getPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createAnotherPhoto(photoTemplate, photos[i]));
  }

  return fragment;
};

var renderPhotos = function (photos) {
  var photosToRender = getPhotos(photos);

  photosContainer.appendChild(photosToRender);
};


var photos = generatePhotos(PhotosProperties);
renderPhotos(photos);


// выгрузка комментариев в попап


var createAnotherComment = function (template, comment) {
  var anotherComment = template.cloneNode(true);

  anotherComment.querySelector('.social__picture').src = comment.avatarUrl;
  var text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.text;
  anotherComment.appendChild(text);

  return anotherComment;
};

var getComments = function (comments) {
  var fragment = document.createDocumentFragment();
  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createAnotherComment(commentTemplate, comments[i]));
  }

  return fragment;
};

var renderComments = function (comments) {
  var commentsToRender = getComments(comments);

  var commentsContainer = bigPhotoContainer.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.appendChild(commentsToRender);
};


// открытие/закрытие попапа


var renderPopup = function (photo) {
  renderComments(photo.comments);

  bigPhotoContainer.querySelector('.big-picture__img img').src = photo.url;

  var bigPhotoSocial = bigPhotoContainer.querySelector('.big-picture__social');
  bigPhotoSocial.querySelector('.social__caption').textContent = photo.description;
  bigPhotoSocial.querySelector('.likes-count').textContent = photo.likes;
  bigPhotoSocial.querySelector('.comments-count').textContent = photo.comments.length;

  bigPhotoSocial.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPhotoSocial.querySelector('.social__loadmore').classList.add('visually-hidden');
};


var onPopupEscPress = function (evt) {
  if (evt.keyCode === KeyCodes.ESC) {
    closePopup();
  }
};

var openPopup = function (photo) {
  renderPopup(photo);

  bigPhotoContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  pageBody.classList.remove('modal-open');
  bigPhotoContainer.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

var onPhotoClick = function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    openPopup(photos[evt.target.parentElement.dataset.id]);
  }
};

var onPhotoEnterPress = function (evt) {
  if (evt.keyCode === KeyCodes.ENTER && document.activeElement.classList.contains('picture__link')) {
    evt.preventDefault();
    openPopup(photos[document.activeElement.dataset.id]);
  }
};


photosContainer.addEventListener('click', onPhotoClick);

document.addEventListener('keydown', onPhotoEnterPress);


bigPhotoCloseBtn.addEventListener('click', function () {
  closePopup();
});


// загрузка новой фотографии


var uploader = pageBody.querySelector('.img-upload__form');
var uploadField = uploader.querySelector('.img-upload__input');
var uploadPopup = uploader.querySelector('.img-upload__overlay');
var uploadPopupCloseBtn = uploadPopup.querySelector('.img-upload__cancel');

var tagsField = uploadPopup.querySelector('.text__hashtags');
var descriptionField = uploadPopup.querySelector('.text__description');

var decreaseBtn = uploadPopup.querySelector('.resize__control--minus');
var increaseBtn = uploadPopup.querySelector('.resize__control--plus');
var imgSizeField = uploadPopup.querySelector('.resize__control--value');

var uploadPreview = uploadPopup.querySelector('.img-upload__preview');
var imgToUpload = uploadPreview.querySelector('img');
var filtersContainer = uploadPopup.querySelector('.effects__list');
var initialFilter = uploadPopup.querySelector('#effect-none');
var effectIntensity = uploadPopup.querySelector('.img-upload__scale');


var setPhotoSize = function (sizeValue) {
  imgSizeField.value = sizeValue + '%';
  uploadPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
};

var onPhotoScale = function (evt) {
  var currentValue = parseInt(imgSizeField.value, 10);

  if (evt.target === increaseBtn) {
    currentValue += ResizeValues.STEP;
  } else {
    currentValue -= ResizeValues.STEP;
  }

  if (currentValue >= ResizeValues.MIN && currentValue <= ResizeValues.MAX) {
    setPhotoSize(currentValue);
  }
};

var resetPreview = function () {
  uploadField.value = '';
  imgToUpload.className = '';
};


var openUploadPopup = function () {
  setPhotoSize(ResizeValues.INITIAL);
  initialFilter.checked = true;
  effectIntensity.classList.add('hidden');

  uploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', onUploadEscPress);
};

var closeUploadPopup = function () {
  resetPreview();

  uploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onUploadEscPress);
};


uploadField.addEventListener('change', function () {
  openUploadPopup();
});

uploadPopupCloseBtn.addEventListener('click', function () {
  closeUploadPopup();
});

var onUploadEscPress = function (evt) {
  if (evt.keyCode === KeyCodes.ESC && evt.target !== tagsField && evt.target !== descriptionField) {
    closeUploadPopup();
  }
};


var onFilterChange = function (evt) {
  var target = evt.target;

  if (target === filtersContainer) {
    return;
  }

  while (target.parentElement !== filtersContainer) {
    target = target.parentElement;
  }

  imgToUpload.className = '';
  imgToUpload.classList.add('effects__preview--' + target.dataset.effectName);

  if (target.dataset.effectName === 'none') {
    effectIntensity.classList.add('hidden');
  } else {
    effectIntensity.classList.remove('hidden');
  }
};


var isBadTagsSeparation = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].indexOf('#', 1) !== -1 || arr[i] === '') {
      return true;
    }
  }

  return false;
};

var isBadTagFormat = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].charAt(0) !== '#' || arr[i].length === 1) {
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

var onTagsFieldValidate = function () {
  var tags = tagsField.value.trim().toLowerCase().split(' ');

  if (isBadTagsSeparation(tags)) {
    tagsField.setCustomValidity('Хэш-теги должны разделяться одним пробелом');
  } else if (isBadTagFormat(tags)) {
    tagsField.setCustomValidity('Хэш-тег должен начинаться с символа # и не может состоять только из него');
  } else if (isTooLongTag(tags, HastagsValidity.MAX_LENGTH)) {
    tagsField.setCustomValidity('Максимальная длина одного хэш-тега ' + HastagsValidity.MAX_LENGTH + ' символов');
  } else if (isTagsRepeat(tags)) {
    tagsField.setCustomValidity('Хэш-теги не должны повторяться');
  } else if (tags.length > HastagsValidity.MAX_QUANTITY) {
    tagsField.setCustomValidity('Нельзя указывать больше ' + HastagsValidity.MAX_QUANTITY + ' хэш-тегов');
  } else {
    tagsField.setCustomValidity('');
    tagsField.classList.remove('invalid-field');
  }

  if (tagsField.value && !tagsField.validity.valid) {
    tagsField.classList.add('invalid-field');
  }
};


decreaseBtn.addEventListener('click', onPhotoScale);
increaseBtn.addEventListener('click', onPhotoScale);

filtersContainer.addEventListener('click', onFilterChange);

uploader.addEventListener('input', onTagsFieldValidate);
