'use strict';

(function () {
  const activationMap = function () {
    window.pins.map.classList.remove(`map--faded`);

    const successHandler = function (ads) {
      window.card.mapPins.appendChild(window.pins.pins(ads));
      window.card.addCard(ads);
    };

    const errorHandler = function (errorMessage) {
      const node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;

      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    };

    window.load(successHandler, errorHandler);

  };

  window.map = {
    showMap: activationMap
  };
})();
