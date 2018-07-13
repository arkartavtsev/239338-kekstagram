'use strict';


(function () {
  var ERROR_SHOW_TIMEOUT = 5000;

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };


  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomItem = function (array) {
    return array[getRandomNum(0, array.length - 1)];
  };

  var getUniqueItems = function (array, quantity) {
    var uniqueItems = [];
    var buffer = array.slice();

    for (var i = 0; i < quantity; i++) {
      var index = getRandomNum(0, buffer.length - 1);

      if (index >= 0) {
        uniqueItems.push(buffer[index]);
        buffer.splice(index, 1);
      }
    }

    return uniqueItems;
  };

  var showError = function (errorMessage) {
    var errorContainer = document.createElement('div');

    var hideError = function () {
      document.body.removeChild(errorContainer);
    };

    errorContainer.textContent = errorMessage;
    errorContainer.classList.add('error__popup');
    document.body.appendChild(errorContainer);

    setTimeout(hideError, ERROR_SHOW_TIMEOUT);
  };


  window.util = {
    keyCode: KeyCode,
    isEscEvent: isEscEvent,
    getRandomNum: getRandomNum,
    getRandomItem: getRandomItem,
    getUniqueItems: getUniqueItems,
    showError: showError
  };
})();
