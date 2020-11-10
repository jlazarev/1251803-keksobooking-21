// file pin-main.js
'use strict';

(function () {
  const showMapAndForm = function () {
    window.map.showMap();
    window.form.showForm();
  };

  let firstTime = true;

  window.form.pinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();

      if (firstTime) {
        showMapAndForm();

        firstTime = false;
      }

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        const newCoords = {
          x: window.form.pinMain.offsetLeft - shift.x,
          y: window.form.pinMain.offsetTop - shift.y
        };

        window.form.pinMain.style.top = (newCoords.y) + `px`;
        window.form.pinMain.style.left = (newCoords.x) + `px`;

        const borderY = {
          top: window.adsData.rangeY.min - (window.form.pinMain.offsetHeight + window.form.offsetPin),
          bottom: window.adsData.rangeY.max - (window.form.pinMain.offsetHeight + window.form.offsetPin)
        };

        if (newCoords.y <= borderY.top) {
          window.form.pinMain.style.top = borderY.top + `px`;
        } else if (newCoords.y >= borderY.bottom) {
          window.form.pinMain.style.top = borderY.bottom + `px`;
        }

        const borderX = {
          left: window.adsData.rangeX.min - (window.form.pinMain.offsetWidth / 2),
          right: window.adsData.rangeX.max - (window.form.pinMain.offsetWidth / 2)
        };

        if (newCoords.x <= borderX.left) {
          window.form.pinMain.style.left = borderX.left + `px`;
        } else if (newCoords.x >= borderX.right) {
          window.form.pinMain.style.left = borderX.right + `px`;
        }

        window.form.address.value = window.form.getCoordsStr(window.form.pinMain);
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.pins.map.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      window.pins.map.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

  window.form.pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      showMapAndForm();
    }
  });
})();
