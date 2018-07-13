'use strict';


(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var submitBtn = uploadForm.querySelector('.img-upload__submit');


  var sendForm = function () {
    window.uploadPopup.close();
    submitBtn.disabled = false;
  };

  var showError = function (errorMessage) {
    var errorContainer = document.querySelector('.img-upload__message--error');
    var errorText = errorContainer.querySelector('.error__message');
    var tryAgainBtn = errorContainer.querySelector('.try-again-link');
    var loadNewBtn = errorContainer.querySelector('.new-file-link');

    var onTryAgainBtnClick = function (evt) {
      evt.preventDefault();

      submitBtn.disabled = false;

      tryAgainBtn.removeEventListener('click', onTryAgainBtnClick);
      loadNewBtn.removeEventListener('click', onLoadNewBtnClick);

      errorContainer.classList.add('hidden');
    };

    var onLoadNewBtnClick = function (evt) {
      evt.preventDefault();

      window.uploadPopup.close();
      submitBtn.disabled = false;

      tryAgainBtn.removeEventListener('click', onTryAgainBtnClick);
      loadNewBtn.removeEventListener('click', onLoadNewBtnClick);

      errorContainer.classList.add('hidden');
    };

    errorText.textContent = 'Ошибка загрузки файла. ' + errorMessage + '.';

    tryAgainBtn.addEventListener('click', onTryAgainBtnClick);
    loadNewBtn.addEventListener('click', onLoadNewBtnClick);

    errorContainer.classList.remove('hidden');
  };


  var onFormSubmit = function (evt) {
    evt.preventDefault();
    submitBtn.disabled = true;

    window.backend.save(new FormData(uploadForm), sendForm, showError);
  };


  uploadForm.addEventListener('submit', onFormSubmit);
})();
