'use strict';


(function () {
  var uploader = document.querySelector('.img-upload__form');
  var uploadField = uploader.querySelector('.img-upload__input');

  var uploadPopup = uploader.querySelector('.img-upload__overlay');
  var uploadBtn = uploadPopup.querySelector('.img-upload__submit');
  var closeBtn = uploadPopup.querySelector('.img-upload__cancel');

  var uploadPreview = uploadPopup.querySelector('.img-upload__preview');
  var imgToUpload = uploadPreview.querySelector('img');
  var effectIntensityScale = uploadPopup.querySelector('.img-upload__scale');

  var tagsField = uploadPopup.querySelector('.text__hashtags');
  var descriptionField = uploadPopup.querySelector('.text__description');


  var resetPreview = function () {
    uploadField.value = '';
    uploader.reset();
    uploadPreview.style = '';
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


  var sendForm = function () {
    closeUploadPopup();
    uploadBtn.disabled = false;
  };

  var showError = function (errorMessage) {
    var errorContainer = document.querySelector('.img-upload__message--error');
    var errorText = errorContainer.querySelector('.error__message');
    var tryAgainBtn = errorContainer.querySelector('.try-again-link');
    var loadNewBtn = errorContainer.querySelector('.new-file-link');

    var onTryAgainBtnClick = function (evt) {
      evt.preventDefault();

      uploadBtn.disabled = false;

      tryAgainBtn.removeEventListener('click', onTryAgainBtnClick);
      loadNewBtn.removeEventListener('click', onLoadNewBtnClick);

      errorContainer.classList.add('hidden');
    };

    var onLoadNewBtnClick = function (evt) {
      evt.preventDefault();

      closeUploadPopup();
      uploadBtn.disabled = false;

      tryAgainBtn.removeEventListener('click', onTryAgainBtnClick);
      loadNewBtn.removeEventListener('click', onLoadNewBtnClick);

      errorContainer.classList.add('hidden');
    };

    errorText.textContent = 'Ошибка загрузки файла. ' + errorMessage;

    tryAgainBtn.addEventListener('click', onTryAgainBtnClick);
    loadNewBtn.addEventListener('click', onLoadNewBtnClick);

    errorContainer.classList.remove('hidden');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    uploadBtn.disabled = true;

    window.backend.save(new FormData(uploader), sendForm, showError);
  };


  uploadField.addEventListener('change', function () {
    openUploadPopup();
  });

  closeBtn.addEventListener('click', function () {
    closeUploadPopup();
  });

  uploader.addEventListener('submit', onFormSubmit);
})();
