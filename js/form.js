'use strict';

(function () {
  const OFFSET_OF_PIN = 22;

  const adFormElement = document.querySelector(`.ad-form`);
  const adFormfieldsets = adFormElement.querySelectorAll(`.ad-form fieldset`);
  const addressElement = adFormElement.querySelector(`#address`);

  for (const fieldset of adFormfieldsets) {
    fieldset.setAttribute(`disabled`, `disabled`);
  }

  const filtersForm = window.pins.map.querySelector(`.map__filters`);
  const mapFilters = filtersForm.querySelectorAll(`.map__filter`);
  const mapFeatures = filtersForm.querySelector(`.map__features`);

  for (const filter of mapFilters) {
    filter.setAttribute(`disabled`, `disabled`);
  }

  mapFeatures.setAttribute(`disabled`, `disabled`);

  const mapPinMain = window.pins.map.querySelector(`.map__pin--main`);

  const getCoordsString = function (pin) {
    return (parseInt(pin.style.left, 10) + Math.floor(pin.offsetWidth / 2)) + `, ` + (parseInt(pin.style.top, 10) + Math.floor(pin.offsetHeight + OFFSET_OF_PIN));
  };

  addressElement.value = (parseInt(mapPinMain.style.left, 10) + Math.floor(mapPinMain.offsetWidth / 2)) + `, ` + (parseInt(mapPinMain.style.top, 10) + Math.floor(mapPinMain.offsetHeight / 2));

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

  window.form = {
    pinMain: mapPinMain,
    adForm: adFormElement,
    address: addressElement,
    offsetPin: OFFSET_OF_PIN,
    showForm: activationForm,
    getCoordsStr: getCoordsString
  };
})();
