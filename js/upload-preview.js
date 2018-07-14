'use strict';


(function () {
  var ACCEPTABLE_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadField = document.querySelector('.img-upload__input');
  var imgToUpload = document.querySelector('img');
  var effectsPreviews = document.querySelectorAll('.effects__preview');


  var loadPreview = function (file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      imgToUpload.src = reader.result;
      effectsPreviews.forEach(function (preview) {
        preview.style.backgroundImage = 'url("' + reader.result + '")';
      });
    });

    reader.readAsDataURL(file);
  };


  var onUploadFieldChange = function () {
    var file = uploadField.files[0];
    var fileName = file.name.toLowerCase();

    var acceptableType = ACCEPTABLE_FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (acceptableType) {
      loadPreview(file);
      window.uploadPopup.open();
    } else {
      var errorText = 'Неправильный формат файла. Допустимые форматы файлов: *.' + ACCEPTABLE_FILE_TYPES.join(', *.') + '.';

      window.util.showError(errorText);
      uploadField.value = '';
    }
  };


  uploadField.addEventListener('change', onUploadFieldChange);
})();
