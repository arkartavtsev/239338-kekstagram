'use strict';


(function () {
  var Resize = {
    INITIAL: 100,
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var Scale = {
    MIN: 0,
    MAX: 100
  };


  var uploader = document.querySelector('.img-upload__form');
  var uploadField = uploader.querySelector('.img-upload__input');
  var uploadPopup = uploader.querySelector('.img-upload__overlay');
  var closeBtn = uploadPopup.querySelector('.img-upload__cancel');

  var tagsField = uploadPopup.querySelector('.text__hashtags');
  var descriptionField = uploadPopup.querySelector('.text__description');

  var decreaseBtn = uploadPopup.querySelector('.resize__control--minus');
  var increaseBtn = uploadPopup.querySelector('.resize__control--plus');
  var resizeField = uploadPopup.querySelector('.resize__control--value');

  var uploadPreview = uploadPopup.querySelector('.img-upload__preview');
  var imgToUpload = uploadPreview.querySelector('img');

  var filtersContainer = uploadPopup.querySelector('.effects__list');
  var initialFilter = uploadPopup.querySelector('#effect-none');

  var effectIntensity = uploadPopup.querySelector('.img-upload__scale');
  var effectIntensityField = effectIntensity.querySelector('.scale__value');
  var effectIntensityLine = effectIntensity.querySelector('.scale__line');
  var effectIntensityPin = effectIntensity.querySelector('.scale__pin');
  var effectIntensityLevel = effectIntensity.querySelector('.scale__level');


  var setPhotoSize = function (sizeValue) {
    resizeField.value = sizeValue + '%';
    uploadPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
  };

  var onPhotoScale = function (evt) {
    var currentValue = parseInt(resizeField.value, 10);

    if (evt.target === increaseBtn) {
      currentValue += Resize.STEP;
    } else {
      currentValue -= Resize.STEP;
    }

    if (currentValue >= Resize.MIN && currentValue <= Resize.MAX) {
      setPhotoSize(currentValue);
    }
  };


  var changeFilterIntensity = function (value) {
    var effectNameToStyle = {
      'chrome': 'filter: grayscale(' + value / 100 + ');',
      'sepia': 'filter: sepia(' + value / 100 + ');',
      'marvin': 'filter: invert(' + value + '%);',
      'phobos': 'filter: blur(' + value * 0.03 + 'px);',
      'heat': 'filter: brightness(' + value * 0.03 + ');'
    };

    imgToUpload.style = effectNameToStyle[imgToUpload.dataset.currentEffect] || '';
  };

  var changeFilterScale = function (value) {
    effectIntensityPin.style.left = value + '%';
    effectIntensityLevel.style.width = value + '%';
    effectIntensityField.value = value;

    changeFilterIntensity(value);
  };


  var onFilterPinMouseDown = function (downEvt) {
    var cursorPosition = downEvt.clientX;

    var onFilterPinMouseMove = function (moveEvt) {
      var scaleCoords = {
        left: effectIntensityLine.getBoundingClientRect().left,
        right: effectIntensityLine.getBoundingClientRect().right
      };

      var pinPosition;

      cursorPosition = moveEvt.clientX;

      if (cursorPosition < scaleCoords.left) {
        pinPosition = Scale.MIN;
      } else if (cursorPosition > scaleCoords.right) {
        pinPosition = Scale.MAX;
      } else {
        pinPosition = Math.round((cursorPosition - scaleCoords.left) / effectIntensityLine.offsetWidth * 100);
      }
      changeFilterScale(pinPosition);
    };

    var onFilterPinMouseUp = function () {
      document.removeEventListener('mousemove', onFilterPinMouseMove);
      document.removeEventListener('mouseup', onFilterPinMouseUp);
    };

    document.addEventListener('mousemove', onFilterPinMouseMove);
    document.addEventListener('mouseup', onFilterPinMouseUp);
  };

  var onFilterChange = function (evt) {
    var target = evt.target;

    if (target === filtersContainer) {
      return;
    }
    while (target.parentElement !== filtersContainer) {
      target = target.parentElement;
    }

    var currentFilter = imgToUpload.dataset.currentEffect;
    imgToUpload.className = 'effects__preview--' + target.dataset.effectName;
    imgToUpload.dataset.currentEffect = target.dataset.effectName;

    if (target.dataset.effectName === 'none') {
      effectIntensity.classList.add('hidden');
      changeFilterScale(Scale.MIN);
    } else if (currentFilter !== imgToUpload.dataset.currentEffect) {
      effectIntensity.classList.remove('hidden');
      changeFilterScale(Scale.MAX);
    }
  };


  var resetPreview = function () {
    uploadField.value = '';
    imgToUpload.className = '';
    imgToUpload.style = '';
  };

  var onUploadEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC && evt.target !== tagsField && evt.target !== descriptionField) {
      closeUploadPopup();
    }
  };

  var addPopupListeners = function () {
    document.addEventListener('keydown', onUploadEscPress);
    decreaseBtn.addEventListener('click', onPhotoScale);
    increaseBtn.addEventListener('click', onPhotoScale);
    filtersContainer.addEventListener('click', onFilterChange);
    effectIntensityPin.addEventListener('mousedown', onFilterPinMouseDown);
  };

  var removePopupListeners = function () {
    document.removeEventListener('keydown', onUploadEscPress);
    decreaseBtn.removeEventListener('click', onPhotoScale);
    increaseBtn.removeEventListener('click', onPhotoScale);
    filtersContainer.removeEventListener('click', onFilterChange);
    effectIntensityPin.removeEventListener('mousedown', onFilterPinMouseDown);
  };


  var openUploadPopup = function () {
    setPhotoSize(Resize.INITIAL);
    initialFilter.checked = true;
    effectIntensity.classList.add('hidden');

    uploadPopup.classList.remove('hidden');

    addPopupListeners();
  };

  var closeUploadPopup = function () {
    resetPreview();

    uploadPopup.classList.add('hidden');

    removePopupListeners();
  };


  uploadField.addEventListener('change', function () {
    openUploadPopup();
  });

  closeBtn.addEventListener('click', function () {
    closeUploadPopup();
  });

  uploader.addEventListener('input', function () {
    window.validateTags();
  });
})();
