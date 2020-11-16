'use strict';

(function () {
  const MIN_PRICE = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const HOUSING_TYPE = {
    bungalow: `bungalow`,
    flat: `flat`,
    house: `house`,
    palace: `palace`
  };

  const roomNumber = window.form.adForm.querySelector(`#room_number`);
  const capacity = window.form.adForm.querySelector(`#capacity`);

  const checkingGuests = function () {
    if (roomNumber.value === `1` && capacity.value !== `1`) {
      capacity.setCustomValidity(`Только для одного.`);
    } else if (roomNumber.value === `2` && capacity.value !== `1` && capacity.value !== `2`) {
      capacity.setCustomValidity(`1 или 2 гостя.`);
    } else if (roomNumber.value === `3` && capacity.value === `0`) {
      capacity.setCustomValidity(`Добавьте гостей`);
    } else if (roomNumber.value === `100` && capacity.value !== `0`) {
      capacity.setCustomValidity(`Уберите гостей`);
    } else {
      capacity.setCustomValidity(``);
    }
  };

  checkingGuests();

  capacity.addEventListener(`change`, checkingGuests);

  roomNumber.addEventListener(`change`, checkingGuests);

  const typeHousing = window.form.adForm.querySelector(`#type`);
  const price = window.form.adForm.querySelector(`#price`);

  const comparisonPrice = (typeForCheck, priceForCheck) => {
    return (typeHousing.value === typeForCheck && parseInt(price.value, 10) < priceForCheck);
  };

  const checkingPrice = function () {
    if (
      comparisonPrice(HOUSING_TYPE.bungalow, MIN_PRICE.bungalow) ||
      comparisonPrice(HOUSING_TYPE.flat, MIN_PRICE.flat) ||
      comparisonPrice(HOUSING_TYPE.house, MIN_PRICE.house) ||
      comparisonPrice(HOUSING_TYPE.palace, MIN_PRICE.palace)
    ) {
      price.setCustomValidity(`Маловато`);
    } else {
      price.setCustomValidity(``);
    }
  };

  const changePlaceHolder = function () {
    if (typeHousing.value === HOUSING_TYPE.bungalow) {
      price.placeholder = MIN_PRICE.bungalow;
    } else if (typeHousing.value === HOUSING_TYPE.flat) {
      price.placeholder = MIN_PRICE.flat;
    } else if (typeHousing.value === HOUSING_TYPE.house) {
      price.placeholder = MIN_PRICE.house;
    } else if (typeHousing.value === HOUSING_TYPE.palace) {
      price.placeholder = MIN_PRICE.palace;
    }
  };

  typeHousing.addEventListener(`change`, function () {
    checkingPrice();
    changePlaceHolder();
  });

  price.addEventListener(`input`, checkingPrice);

  const timein = window.form.adForm.querySelector(`#timein`);
  const timeout = window.form.adForm.querySelector(`#timeout`);

  timein.addEventListener(`change`, function () {
    const oldSelect = timeout.querySelector(`option[selected]`);
    const newSelect = timeout.querySelector(`option[value="${timein.value}"]`);

    oldSelect.removeAttribute(`selected`);
    newSelect.setAttribute(`selected`, `selected`);

    timeout.value = timein.value;
  });

  timeout.addEventListener(`change`, function () {
    const oldSelect = timein.querySelector(`option[selected]`);
    const newSelect = timein.querySelector(`option[value="${timeout.value}"]`);

    oldSelect.removeAttribute(`selected`);
    newSelect.setAttribute(`selected`, `selected`);

    timein.value = timeout.value;
  });
})();
