'use strict';

(function () {
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

  const checkingPrice = function () {
    if (typeHousing.value === `bungalow` && parseInt(price.value, 10) < 0) {
      price.setCustomValidity(`Маловато`);
    } else if (typeHousing.value === `flat` && parseInt(price.value, 10) < 1000) {
      price.setCustomValidity(`Маловато`);
    } else if (typeHousing.value === `house` && parseInt(price.value, 10) < 5000) {
      price.setCustomValidity(`Маловато`);
    } else if (typeHousing.value === `palace` && parseInt(price.value, 10) < 10000) {
      price.setCustomValidity(`Маловато`);
    } else {
      price.setCustomValidity(``);
    }
  };

  typeHousing.addEventListener(`change`, checkingPrice);

  price.addEventListener(`input`, checkingPrice);

  const timein = window.form.adForm.querySelector(`#timein`);
  const timeout = window.form.adForm.querySelector(`#timeout`);

  timein.addEventListener(`change`, function () {
    const oldselect = timeout.querySelector(`option[selected]`);
    const newselect = timeout.querySelector(`option[value="` + timein.value + `"]`);

    oldselect.removeAttribute(`selected`);
    newselect.setAttribute(`selected`, `selected`);

    timeout.value = timein.value;
  });

  timeout.addEventListener(`change`, function () {
    const oldselect = timein.querySelector(`option[selected]`);
    const newselect = timein.querySelector(`option[value="` + timeout.value + `"]`);

    oldselect.removeAttribute(`selected`);
    newselect.setAttribute(`selected`, `selected`);

    timein.value = timeout.value;
  });
})();
