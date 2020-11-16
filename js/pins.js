'use strict';

(function () {
  const OFFSET_X = 25;
  const OFFSET_Y = 70;
  const MAX_PINS_COUNT = 5;

  const map = document.querySelector(`.map`);

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
    let countPins = MAX_PINS_COUNT;

    if (pins.length < MAX_PINS_COUNT) {
      countPins = pins.length;
    }

    for (let i = 0; i < countPins; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    return fragment;
  };

  window.pins = {
    map,
    renderPins
  };
})();
