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


  var generateDescription = function (photo) {
    photo.description = window.util.getRandomItem(DESCRIPTIONS);
  };

  var generateAvatars = function (photo) {
    photo.commentsAvatars = [];

    for (var i = 0; i < photo.comments.length; i++) {
      photo.commentsAvatars[i] = 'img/avatar-' + window.util.getRandomNum(1, AVATARS_COUNT) + '.svg';
    }
  };


  window.data = {
    generateDescription: generateDescription,
    generateAvatars: generateAvatars
  };
})();
