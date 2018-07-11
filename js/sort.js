'use strict';


(function () {
  var NEW_PHOTOS_COUNT = 10;


  var showNewPhotos = function (container, photos) {
    var newPhotos = window.util.getUniqueItems(photos, NEW_PHOTOS_COUNT);

    window.renderPhotos(container, newPhotos);
  };


  var getDiscussionRank = function (left, right) {
    return right.comments.length - left.comments.length;
  };

  var showDiscussedPhotos = function (container, photos) {
    var discussedPhotos = photos.slice().sort(getDiscussionRank);

    window.renderPhotos(container, discussedPhotos);
  };


  window.sort = {
    showPopularPhotos: window.renderPhotos,
    showNewPhotos: showNewPhotos,
    showDiscussedPhotos: showDiscussedPhotos
  };
})();
