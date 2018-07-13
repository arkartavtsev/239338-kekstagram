'use strict';


(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadField = uploadForm.querySelector('.img-upload__input');

  var uploadPopup = uploadForm.querySelector('.img-upload__overlay');
  var closeBtn = uploadPopup.querySelector('.img-upload__cancel');

  var uploadPreview = uploadPopup.querySelector('.img-upload__preview');
  var imgToUpload = uploadPreview.querySelector('img');
  var effectIntensityScale = uploadPopup.querySelector('.img-upload__scale');

  var tagsField = uploadPopup.querySelector('.text__hashtags');
  var descriptionField = uploadPopup.querySelector('.text__description');


  var resetPreview = function () {
    uploadForm.reset();
    uploadField.value = '';

    uploadPreview.style = '';

    imgToUpload.src = '';
    imgToUpload.className = '';
    imgToUpload.dataset.currentEffect = '';
    imgToUpload.style = '';
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC && evt.target !== tagsField && evt.target !== descriptionField) {
      closeUploadPopup();
    }
  };


  var openUploadPopup = function () {
    document.addEventListener('keydown', onPopupEscPress);
    window.photoEditor.addHandlers();

    effectIntensityScale.classList.add('hidden');
    uploadPopup.classList.remove('hidden');
  };

  var closeUploadPopup = function () {
    document.removeEventListener('keydown', onPopupEscPress);
    window.photoEditor.removeHandlers();

    resetPreview();
    uploadPopup.classList.add('hidden');
  };


  window.uploadPopup = {
    open: openUploadPopup,
    close: closeUploadPopup
  };


  closeBtn.addEventListener('click', function () {
    closeUploadPopup();
  });
})();
