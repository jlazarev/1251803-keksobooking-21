'use strict';

(function () {
  const OFFSET_X = 25;
  const OFFSET_Y = 70;

  const mapElement = document.querySelector(`.map`);

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const renderPin = function (pinData) {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (pinData.location.x - OFFSET_X) + `px`;
    pinElement.style.top = (pinData.location.y - OFFSET_Y) + `px`;
    pinElement.querySelector(`img`).src = pinData.author.avatar;
    pinElement.querySelector(`img`).alt = pinData.offer.title;

    return pinElement;
  };

  const renderPins = function (pins) {
    const fragment = document.createDocumentFragment();

    for (const pin of pins) {
      fragment.appendChild(renderPin(pin));
    }

    return fragment;
  };

  window.pins = {
    map: mapElement,
    pins: renderPins
  };
})();
