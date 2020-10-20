'use strict';

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const TITLES = [`Заголовок 1`, `Заголовок 2`, `Заголовок 3`, `Заголовок 4`, `Заголовок 5`, `Заголовок 6`, `Заголовок 7`, `Заголовок 8`];
const DISCRIPTIONS = [`Описание 1`, `Описание 2`, `Описание 3`, `Описание 4`, `Описание 5`, `Описание 6`, `Описание 7`, `Описание 8`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const COUNT_ADS = 8;
const COUNT_ROOMS = 3;
const COUNT_GUESTS = 5;

const PRICE_RANGE = {
  min: 15000,
  max: 25000
};

const LOCATION_RANGE_Y = {
  min: 130,
  max: 630
};

const LOCATION_RANGE_X = {
  min: 0,
  max: 1150
};

const generationFeatures = function () {
  let sourceArr = FEATURES;
  const arr = [];

  const countFeatures = Math.floor(Math.random() * (sourceArr.length + 1));

  for (let i = 0; i < countFeatures; i++) {
    const randomIndex = Math.floor(Math.random() * sourceArr.length);
    arr.push(sourceArr[randomIndex]);
    sourceArr = sourceArr.splice(randomIndex, 1);
  }

  return arr;
};

const generationPhotos = function () {
  let sourceArr = PHOTOS;
  const arr = [];

  const countPhotos = Math.floor(Math.random() * (sourceArr.length + 1));

  for (let i = 0; i < countPhotos; i++) {
    arr.push(sourceArr[i]);
  }

  return arr;
};

const generationAd = function (index) {
  const locationObj = {
    x: Math.floor(LOCATION_RANGE_X.min + Math.random() * (LOCATION_RANGE_X.max - LOCATION_RANGE_X.min + 1)),
    y: Math.floor(LOCATION_RANGE_Y.min + Math.random() * (LOCATION_RANGE_Y.max - LOCATION_RANGE_Y.min + 1))
  };

  const offerObj = {
    title: TITLES[Math.floor(Math.random() * TITLES.length)],
    address: locationObj.x + `, ` + locationObj.y,
    price: Math.floor(PRICE_RANGE.min + Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)),
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    rooms: 1 + Math.floor(Math.random() * COUNT_ROOMS),
    guests: 1 + Math.floor(Math.random() * COUNT_GUESTS),
    checkin: TIMES[Math.floor(Math.random() * TIMES.length)],
    checkout: TIMES[Math.floor(Math.random() * TIMES.length)],
    features: generationFeatures(),
    discription: DISCRIPTIONS[Math.floor(Math.random() * DISCRIPTIONS.length)],
    photos: generationPhotos()
  };

  const obj = {
    author: {
      avatar: `img/avatars/user0` + (index + 1) + `.png`
    },
    offer: offerObj,
    location: locationObj
  };

  return obj;
};

const generationAds = function () {
  const arr = [];

  for (let i = 0; i < COUNT_ADS; i++) {
    arr.push(generationAd(i));
  }

  return arr;
};

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPin = function (pinObj) {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pinObj.location.x + `px`;
  pinElement.style.top = pinObj.location.y + `px`;
  pinElement.querySelector(`img`).src = pinObj.author.avatar;
  pinElement.querySelector(`img`).alt = pinObj.offer.title;

  return pinElement;
};

const renderPins = function (pinsArr) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pinsArr.length; i++) {
    fragment.appendChild(renderPin(pinsArr[i]));
  }

  return fragment;
};

mapPins.appendChild(renderPins(generationAds()));
