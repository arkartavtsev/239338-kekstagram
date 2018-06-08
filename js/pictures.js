'use strict';


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


var generateComments = function (phrasesList, max) {
  var comments = [];
  var possiblePhrases = phrasesList.slice();

  for (var i = 0; i < getRandomNum(1, max); i++) {
    var index = getRandomNum(0, possiblePhrases.length - 1);

    comments.push(possiblePhrases[index]);
    possiblePhrases.splice(index, 1);
  }

  return comments;
};

var generatePhotos = function (properties) {
  var photos = [];

  for (var i = 0; i < properties.QUANTITY; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNum(properties.LIKES.MIN, properties.LIKES.MAX),
      comments: generateComments(properties.COMMENTS.LIST, properties.COMMENTS.MAX),
      description: getRandomItem(properties.DESCRIPTIONS)
    });
  }

  return photos;
};

var createAnotherPhoto = function (template, photo) {
  var anotherPhoto = template.cloneNode(true);

  anotherPhoto.querySelector('.picture__img').src = photo.url;
  anotherPhoto.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  anotherPhoto.querySelector('.picture__stat--likes').textContent = photo.likes;

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

  var photosContainer = document.querySelector('.pictures');
  photosContainer.appendChild(photosToRender);
};


var createAnotherComment = function (template, comment) {
  var anotherComment = template.cloneNode(true);

  anotherComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomNum(1, AVATARS_COUNT) + '.svg';
  var text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment;
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

  var commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.appendChild(commentsToRender);
};

var showPopup = function (photo) {
  renderComments(photo.comments);

  var photoContainer = document.querySelector('.big-picture');
  photoContainer.querySelector('.big-picture__img img').src = photo.url;

  var photoSocial = photoContainer.querySelector('.big-picture__social');
  photoSocial.querySelector('.social__caption').textContent = photo.description;
  photoSocial.querySelector('.likes-count').textContent = photo.likes;
  photoSocial.querySelector('.comments-count').textContent = photo.comments.length;
  photoSocial.querySelector('.social__comment-count').classList.add('visually-hidden');
  photoSocial.querySelector('.social__loadmore').classList.add('visually-hidden');

  photoContainer.classList.remove('hidden');
};


var showPhotos = function () {
  var photos = generatePhotos(PhotosProperties);

  renderPhotos(photos);
  showPopup(photos[0]);
};


showPhotos();
