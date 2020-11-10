// file pin-main.js
'use strict';

(function () {
  const showMapAndForm = function () {
    window.map.showMap();
    window.form.showForm();
  };

  window.form.pinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      showMapAndForm();
    }
  });

  window.form.pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      showMapAndForm();
    }
  });
})();

// точка входа???
