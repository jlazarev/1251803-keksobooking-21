'use strict';

(function () {
  const OFFSET_OF_PIN = 22;
  const START_COORD = {
    x: 570,
    y: 374
  };

  const adForm = document.querySelector(`.ad-form`);
  const adFormfieldsets = adForm.querySelectorAll(`.ad-form fieldset`);
  const address = adForm.querySelector(`#address`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);

  const filtersForm = window.pins.map.querySelector(`.map__filters`);
  const mapFilters = filtersForm.querySelectorAll(`.map__filter`);
  const mapFeatures = filtersForm.querySelector(`.map__features`);

  const pinMain = window.pins.map.querySelector(`.map__pin--main`);

  const disabledForm = function () {
    adForm.classList.add(`ad-form--disabled`);

    for (const fieldset of adFormfieldsets) {
      fieldset.setAttribute(`disabled`, `disabled`);
    }

    for (const filter of mapFilters) {
      filter.setAttribute(`disabled`, `disabled`);
    }

    mapFeatures.setAttribute(`disabled`, `disabled`);

    pinMain.style.left = `${START_COORD.x}px`;
    pinMain.style.top = `${START_COORD.y}px`;

    address.value = `${parseInt(pinMain.style.left, 10) + Math.floor(pinMain.offsetWidth / 2)}, ${parseInt(pinMain.style.top, 10) + Math.floor(pinMain.offsetHeight / 2)}`;
  };

  disabledForm();

  const getCoordsStr = function (pin) {
    return `${parseInt(pin.style.left, 10) + Math.floor(pin.offsetWidth / 2)}, ${parseInt(pin.style.top, 10) + Math.floor(pin.offsetHeight + OFFSET_OF_PIN)}`;
  };

  const showForm = function () {
    adForm.classList.remove(`ad-form--disabled`);

    for (const fieldset of adFormfieldsets) {
      fieldset.removeAttribute(`disabled`);
    }

    address.value = getCoordsStr(pinMain);
  };

  const showFilter = function () {
    for (const filter of mapFilters) {
      filter.removeAttribute(`disabled`);
    }

    mapFeatures.removeAttribute(`disabled`);
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successElement = successTemplate.cloneNode(true);
  const main = document.querySelector(`main`);

  const addModal = function (messageElement) {
    const onModalEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();

        deleteModal();
      }
    };

    const deleteModal = function () {
      main.removeChild(messageElement);

      main.removeEventListener(`click`, deleteModal);
      document.removeEventListener(`keydown`, onModalEscPress);
    };

    const showModal = function () {
      main.appendChild(messageElement);

      main.addEventListener(`click`, deleteModal);
      document.addEventListener(`keydown`, onModalEscPress);
    };

    showModal();
  };

  const resetPage = function () {
    adForm.reset();
    filtersForm.reset();
    disabledForm();

    window.pins.map.classList.add(`map--faded`);

    const oldPins = window.card.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (const oldPin of oldPins) {
      oldPin.parentElement.removeChild(oldPin);
    }

    window.card.closeCard();
  };

  resetButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();

    resetPage();
  });

  const successHandler = function () {
    resetPage();

    addModal(successElement);
  };

  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorElement = errorTemplate.cloneNode(true);

  const errorHandler = function () {
    addModal(errorElement);
  };

  const submitHandler = function (evt) {
    window.upload(new FormData(adForm), successHandler, errorHandler);

    evt.preventDefault();
  };

  adForm.addEventListener(`submit`, submitHandler);

  window.form = {
    pinMain,
    adForm,
    address,
    offsetPin: OFFSET_OF_PIN,
    showForm,
    showFilter,
    getCoordsStr
  };
})();
