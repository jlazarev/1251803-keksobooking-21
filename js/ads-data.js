'use strict';

(function () {
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

  window.adsData = {
    ads: generateAds
  };
})();
