'use strict';


(function () {
  var Resize = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var Scale = {
    MIN: 0,
    MAX: 100
  };


  var uploadPopup = document.querySelector('.img-upload__overlay');

  var sizeDecreaseBtn = uploadPopup.querySelector('.resize__control--minus');
  var sizeIncreaseBtn = uploadPopup.querySelector('.resize__control--plus');
  var currentSizeField = uploadPopup.querySelector('.resize__control--value');

  var uploadPreview = uploadPopup.querySelector('.img-upload__preview');
  var imgToUpload = uploadPreview.querySelector('img');

  var effectSelectors = uploadPopup.querySelector('.effects__list');
  var effectIntensityScale = uploadPopup.querySelector('.img-upload__scale');
  var effectIntensityField = effectIntensityScale.querySelector('.scale__value');
  var effectIntensityLine = effectIntensityScale.querySelector('.scale__line');
  var effectIntensityPin = effectIntensityScale.querySelector('.scale__pin');
  var effectIntensityLevel = effectIntensityScale.querySelector('.scale__level');


  // изменение размера изображения


  var setPhotoSize = function (value) {
    currentSizeField.value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var onPhotoScale = function (evt) {
    var currentValue = parseInt(currentSizeField.value, 10);

    if (evt.target === sizeIncreaseBtn) {
      currentValue += Resize.STEP;
    } else {
      currentValue -= Resize.STEP;
    }

    if (currentValue >= Resize.MIN && currentValue <= Resize.MAX) {
      setPhotoSize(currentValue);
    }
  };


  // изменение насыщенности накладываемого эффекта


  var applyEffect = function (value) {
    var effectNameToStyle = {
      'chrome': 'filter: grayscale(' + value / 100 + ');',
      'sepia': 'filter: sepia(' + value / 100 + ');',
      'marvin': 'filter: invert(' + value + '%);',
      'phobos': 'filter: blur(' + value * 0.03 + 'px);',
      'heat': 'filter: brightness(' + value * 0.03 + ');'
    };

    imgToUpload.style = effectNameToStyle[imgToUpload.dataset.currentEffect] || '';
  };

  var changeIntensityScale = function (value) {
    effectIntensityPin.style.left = value + '%';
    effectIntensityLevel.style.width = value + '%';
  };

  var changeEffectIntensity = function (value) {
    effectIntensityField.value = value;
    changeIntensityScale(value);
    applyEffect(value);
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
      changeEffectIntensity(pinPosition);
    };

    var onFilterPinMouseUp = function () {
      document.removeEventListener('mousemove', onFilterPinMouseMove);
      document.removeEventListener('mouseup', onFilterPinMouseUp);
    };

    document.addEventListener('mousemove', onFilterPinMouseMove);
    document.addEventListener('mouseup', onFilterPinMouseUp);
  };


  // наложение эффекта


  var onFilterChange = function (evt) {
    var target = evt.target;

    if (target === effectSelectors) {
      return;
    }
    while (target.parentElement !== effectSelectors) {
      target = target.parentElement;
    }

    var currentFilter = imgToUpload.dataset.currentEffect;
    imgToUpload.className = 'effects__preview--' + target.dataset.effectName;
    imgToUpload.dataset.currentEffect = target.dataset.effectName;

    if (target.dataset.effectName === 'none') {
      effectIntensityScale.classList.add('hidden');
      changeEffectIntensity(Scale.MIN);
    } else if (currentFilter !== imgToUpload.dataset.currentEffect) {
      effectIntensityScale.classList.remove('hidden');
      changeEffectIntensity(Scale.MAX);
    }
  };


  // добаление/удаление обработчиков


  var addEditorHandlers = function () {
    sizeDecreaseBtn.addEventListener('click', onPhotoScale);
    sizeIncreaseBtn.addEventListener('click', onPhotoScale);
    effectSelectors.addEventListener('click', onFilterChange);
    effectIntensityPin.addEventListener('mousedown', onFilterPinMouseDown);
  };

  var removeEditorHandlers = function () {
    sizeDecreaseBtn.removeEventListener('click', onPhotoScale);
    sizeIncreaseBtn.removeEventListener('click', onPhotoScale);
    effectSelectors.removeEventListener('click', onFilterChange);
    effectIntensityPin.removeEventListener('mousedown', onFilterPinMouseDown);
  };


  window.photoEditor = {
    addHandlers: addEditorHandlers,
    removeHandlers: removeEditorHandlers
  };
})();
