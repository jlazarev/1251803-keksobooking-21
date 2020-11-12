'use strict';

(function () {
  const OFFSET_OF_PIN = 22;

  const adFormElement = document.querySelector(`.ad-form`);
  const adFormfieldsets = adFormElement.querySelectorAll(`.ad-form fieldset`);
  const addressElement = adFormElement.querySelector(`#address`);

  const filtersForm = window.pins.map.querySelector(`.map__filters`);
  const mapFilters = filtersForm.querySelectorAll(`.map__filter`);
  const mapFeatures = filtersForm.querySelector(`.map__features`);

  const mapPinMain = window.pins.map.querySelector(`.map__pin--main`);

  const disabledForm = function () {
    adFormElement.classList.add(`ad-form--disabled`);

    for (const fieldset of adFormfieldsets) {
      fieldset.setAttribute(`disabled`, `disabled`);
    }

    for (const filter of mapFilters) {
      filter.setAttribute(`disabled`, `disabled`);
    }

    mapFeatures.setAttribute(`disabled`, `disabled`);

    addressElement.value = (parseInt(mapPinMain.style.left, 10) + Math.floor(mapPinMain.offsetWidth / 2)) + `, ` + (parseInt(mapPinMain.style.top, 10) + Math.floor(mapPinMain.offsetHeight / 2));
  };

  disabledForm();

  const getCoordsString = function (pin) {
    return (parseInt(pin.style.left, 10) + Math.floor(pin.offsetWidth / 2)) + `, ` + (parseInt(pin.style.top, 10) + Math.floor(pin.offsetHeight + OFFSET_OF_PIN));
  };

  const activationForm = function () {
    adFormElement.classList.remove(`ad-form--disabled`);

    for (const fieldset of adFormfieldsets) {
      fieldset.removeAttribute(`disabled`);
    }

    for (const filter of mapFilters) {
      filter.removeAttribute(`disabled`);
    }

    mapFeatures.removeAttribute(`disabled`);

    addressElement.value = getCoordsString(mapPinMain);
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successElement = successTemplate.cloneNode(true);
  const body = document.querySelector(`body`);

  const onSuccessEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();

      deleteSuccess();
    }
  };

  const deleteSuccess = function () {
    body.removeChild(successElement);

    body.removeEventListener(`click`, deleteSuccess);
    document.removeEventListener(`keydown`, onSuccessEscPress);
  };

  const showSuccess = function () {
    body.appendChild(successElement);

    body.addEventListener(`click`, deleteSuccess);
    document.addEventListener(`keydown`, onSuccessEscPress);
  };

  const submitHandler = function (evt) {
    window.upload(new FormData(adFormElement), function () {
      adFormElement.reset();
      disabledForm();
      showSuccess();
    });

    evt.preventDefault();
  };

  adFormElement.addEventListener(`submit`, submitHandler);

  window.form = {
    pinMain: mapPinMain,
    adForm: adFormElement,
    address: addressElement,
    offsetPin: OFFSET_OF_PIN,
    showForm: activationForm,
    getCoordsStr: getCoordsString
  };
})();
