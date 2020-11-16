'use strict';

(function () {
  let ads = [];

  const showMap = function () {
    window.pins.map.classList.remove(`map--faded`);

    const successHandler = function (data) {
      ads = data;
      window.filter.filterAds(ads);
      window.card.mapPins.appendChild(window.pins.renderPins(ads));
      window.card.addCard(ads);
      window.form.showFilter();
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

    window.download(successHandler, errorHandler);
  };

  window.map = {
    showMap
  };
})();
