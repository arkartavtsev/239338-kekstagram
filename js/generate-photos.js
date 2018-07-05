'use strict';


(function () {
  var AVATARS_COUNT = 6;

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


  var generatePhotos = function () {
    var photos = [];

    for (var i = 0; i < PhotosProperties.QUANTITY; i++) {
      photos.push({
        index: i,
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomNum(PhotosProperties.LIKES.MIN, PhotosProperties.LIKES.MAX),
        comments: generateComments(PhotosProperties.COMMENTS.LIST, PhotosProperties.COMMENTS.MAX),
        description: getRandomItem(PhotosProperties.DESCRIPTIONS)
      });
    }

    return photos;
  };


  window.generatePhotos = generatePhotos;
})();
