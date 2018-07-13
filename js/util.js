'use strict';


(function () {
  window.util = {
    KeyCode: {
      ENTER: 13,
      ESC: 27
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === this.KeyCode.ESC) {
        action();
      }
    },

    getRandomNum: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    },

    getRandomItem: function (arr) {
      return arr[this.getRandomNum(0, arr.length - 1)];
    },

    getUniqueItems: function (arr, quantity) {
      var uniqueItems = [];
      var buffer = arr.slice();

      for (var i = 0; i < quantity; i++) {
        var index = this.getRandomNum(0, buffer.length - 1);

        if (index >= 0) {
          uniqueItems.push(buffer[index]);
          buffer.splice(index, 1);
        }
      }

      return uniqueItems;
    },

    showError: function (errorMessage) {
      var errorContainer = document.createElement('div');

      var hideError = function () {
        errorContainer.classList.add('hidden');
      };

      errorContainer.textContent = errorMessage;
      errorContainer.classList.add('error__message');
      document.body.appendChild(errorContainer);

      setTimeout(hideError, 5000);
    }
  };
})();
