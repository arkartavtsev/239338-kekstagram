'use strict';


(function () {
  var AVATARS_COUNT = 6;

  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];


  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomItem = function (arr) {
    return arr[getRandomNum(0, arr.length - 1)];
  };


  var generateDescription = function (photo) {
    photo.description = getRandomItem(DESCRIPTIONS);
  };

  var generateAvatarsUrls = function (photo) {
    photo.commentsAvatarsUrls = [];

    for (var i = 0; i < photo.comments.length; i++) {
      photo.commentsAvatarsUrls[i] = 'img/avatar-' + getRandomNum(1, AVATARS_COUNT) + '.svg';
    }
  };


  window.data = {
    generateDescription: generateDescription,
    generateAvatarsUrls: generateAvatarsUrls
  };
})();
