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
    }
  };
})();
