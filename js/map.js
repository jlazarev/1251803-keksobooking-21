'use strict';

(function () {
  const activationMap = function () {
    window.pins.map.classList.remove(`map--faded`);
    window.card.mapPins.appendChild(window.pins.pins(window.card.ads));
    window.card.addCard();
  };

  window.map = {
    showMap: activationMap
  };
})();
