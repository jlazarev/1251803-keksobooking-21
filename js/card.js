'use strict';

(function () {
  const mapPins = window.pins.map.querySelector(`.map__pins`);

  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const typesTranslate = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const renderFeatures = function (element, cloneCard) {
    const features = element.offer.features;
    const featuresContainer = cloneCard.querySelector(`.popup__features`);
    featuresContainer.innerHTML = ``;

    for (const feature of features) {
      featuresContainer.insertAdjacentHTML(`beforeend`, `<li class="popup__feature popup__feature--${feature}"></li>`);
    }
  };

  const renderPhotos = function (element, cloneCard) {
    const popupPhotos = cloneCard.querySelector(`.popup__photos`);
    const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
    const photos = element.offer.photos;

    popupPhotos.removeChild(popupPhoto);

    for (const photo of photos) {
      const photoClone = popupPhoto.cloneNode(true);
      photoClone.src = photo;
      popupPhotos.appendChild(photoClone);
    }
  };

  const generateCard = function (cardData) {
    const card = cardTemplate.cloneNode(true);

    card.querySelector(`.popup__title`).textContent = cardData.offer.title;
    card.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
    card.querySelector(`.popup__text--price`).textContent = cardData.offer.price + `₽/ночь`;
    card.querySelector(`.popup__type`).textContent = typesTranslate[cardData.offer.type];
    card.querySelector(`.popup__text--capacity`).textContent = cardData.offer.rooms + ` комнаты для ` + cardData.offer.guests + ` гостей`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + cardData.offer.checkin + `, выезд до ` + cardData.offer.checkout;

    renderFeatures(cardData, card);

    card.querySelector(`.popup__description`).textContent = cardData.offer.description;

    renderPhotos(cardData, card);

    card.querySelector(`.popup__avatar`).src = cardData.author.avatar;

    return card;
  };

  const renderCard = function (element) {
    const mapFiltersContainer = window.pins.map.querySelector(`.map__filters-container`);

    window.pins.map.insertBefore(generateCard(element), mapFiltersContainer);
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };

  const openCard = function (ad, pin) {
    const oldCard = window.pins.map.querySelector(`.map__card`);

    if (oldCard !== null) {
      oldCard.parentElement.removeChild(oldCard);
    }

    renderCard(ad);

    document.addEventListener(`keydown`, onPopupEscPress);

    const popupClose = window.pins.map.querySelector(`.popup__close`);

    popupClose.addEventListener(`click`, closeCard);

    pin.classList.add(`map__pin--active`);
  };

  const closeCard = function () {
    const card = window.pins.map.querySelector(`.map__card`);

    if (card) {
      card.parentElement.removeChild(card);

      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  const addCard = function (ads) {
    const pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < pins.length; i++) {
      pins[i].addEventListener(`click`, function () {
        for (const pin of pins) {
          pin.classList.remove(`map__pin--active`);
        }
        openCard(ads[i], pins[i]);
      });
    }
  };

  window.card = {
    mapPins,
    addCard,
    closeCard
  };
})();
