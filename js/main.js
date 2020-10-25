'use strict';

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const TITLES = [`Заголовок 1`, `Заголовок 2`, `Заголовок 3`, `Заголовок 4`, `Заголовок 5`, `Заголовок 6`, `Заголовок 7`, `Заголовок 8`];
const DESCRIPTIONS = [`Описание 1`, `Описание 2`, `Описание 3`, `Описание 4`, `Описание 5`, `Описание 6`, `Описание 7`, `Описание 8`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const COUNT_ADS = 8;
const COUNT_ROOMS = 3;
const COUNT_GUESTS = 5;
const OFFSET_X = 25;
const OFFSET_Y = 70;

const PRICE_RANGE = {
  min: 15000,
  max: 25000
};

const LOCATION_RANGE_Y = {
  min: 130,
  max: 630
};

const LOCATION_RANGE_X = {
  min: 25,
  max: 1175
};

const generateFeatures = function () {
  let sourceFeatures = FEATURES.slice();
  const features = [];

  const countFeatures = Math.floor(Math.random() * (sourceFeatures.length + 1));

  for (let i = 0; i < countFeatures; i++) {
    const randomIndex = Math.floor(Math.random() * sourceFeatures.length);

    features.push(sourceFeatures[randomIndex]);
    sourceFeatures.splice(randomIndex, 1);
  }

  return features;
};

const generatePhotos = function () {
  let sourcePhotos = PHOTOS.slice();
  const photos = [];

  const countPhotos = Math.floor(Math.random() * (sourcePhotos.length + 1));

  for (let i = 0; i < countPhotos; i++) {
    photos.push(sourcePhotos[i]);
  }

  return photos;
};

const generateAd = function (index) {
  const locationValue = {
    x: Math.floor(LOCATION_RANGE_X.min + Math.random() * (LOCATION_RANGE_X.max - LOCATION_RANGE_X.min + 1)),
    y: Math.floor(LOCATION_RANGE_Y.min + Math.random() * (LOCATION_RANGE_Y.max - LOCATION_RANGE_Y.min + 1))
  };

  const offerValue = {
    title: TITLES[Math.floor(Math.random() * TITLES.length)],
    address: locationValue.x + `, ` + locationValue.y,
    price: Math.floor(PRICE_RANGE.min + Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)),
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    rooms: 1 + Math.floor(Math.random() * COUNT_ROOMS),
    guests: 1 + Math.floor(Math.random() * COUNT_GUESTS),
    checkin: TIMES[Math.floor(Math.random() * TIMES.length)],
    checkout: TIMES[Math.floor(Math.random() * TIMES.length)],
    features: generateFeatures(),
    description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
    photos: generatePhotos()
  };

  const ad = {
    author: {
      avatar: `img/avatars/user0` + (index + 1) + `.png`
    },
    offer: offerValue,
    location: locationValue
  };

  return ad;
};

const generateAds = function () {
  const ads = [];

  for (let i = 0; i < COUNT_ADS; i++) {
    ads.push(generateAd(i));
  }

  return ads;
};

const map = document.querySelector(`.map`);

const showMap = function () {
  map.classList.remove(`map--faded`);
};

showMap();

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

  for (let i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }

  return fragment;
};

const mapPins = map.querySelector(`.map__pins`);
mapPins.appendChild(renderPins(generateAds()));

// вторая часть

const firstElement = generateAds()[0];

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const typesTranslate = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const renderFeatures = function (element, cloneCard) {
  const features = element.offer.features;
  const featuresCollection = cloneCard.querySelectorAll(`.popup__feature`);

  for (let i = 0; i < featuresCollection.length; i++) {
    let featureIncluded = false;

    for (let j = 0; j < features.length; j++) {
      if (featuresCollection[i].classList.contains(`popup__feature--` + features[j])) {
        featureIncluded = true;
      }
    }

    if (featureIncluded === false) {
      featuresCollection[i].parentElement.removeChild(featuresCollection[i]);
    }
  }
};

const renderPhotos = function (element, cloneCard) {
  const popupPhotos = cloneCard.querySelector(`.popup__photos`);
  const popupPhoto = popupPhotos.querySelector(`.popup__photo`);
  const photos = element.offer.photos;

  popupPhotos.removeChild(popupPhoto);

  for (let i = 0; i < photos.length; i++) {
    const photo = popupPhoto.cloneNode(true);
    photo.src = photos[i];
    popupPhotos.appendChild(photo);
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
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);

  map.insertBefore(generateCard(element), mapFiltersContainer);
};

renderCard(firstElement);
