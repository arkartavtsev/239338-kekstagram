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
    }
  };
})();
