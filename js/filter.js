'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  const MAX_FILTERED = 5;
  const PRICE_STEP = {
    step1: 10000,
    step2: 50000
  };
  const filterForm = window.pins.map.querySelector(`.map__filters`);
  const housingPrice = window.pins.map.querySelector(`#housing-price`);
  const housingType = window.pins.map.querySelector(`#housing-type`);
  const housingRooms = window.pins.map.querySelector(`#housing-rooms`);
  const housingGuests = window.pins.map.querySelector(`#housing-guests`);

  const equal = (val1, val2, op) => {

    switch (op) {
      case `=`:
        return val1 === val2;
      case `!=`:
        return val1 !== val2;
      case `>`:
        return val1 > val2;
      case `>=`:
        return val1 >= val2;
      case `<`:
        return val1 < val2;
      case `<=`:
        return val1 <= val2;
      case `between`:
        return equal(val1, val2[0], `>=`) && equal(val1, val2[1], `<=`);
      case `in`:
        const intersection = val1.filter((x) => val2.includes(x));
        return intersection.length === val2.length;
      default:
        return val1 === val2;
    }
  };

  const getValue = (item, key) => {
    const keyParts = key.split(`.`);
    let value = item[keyParts[0]];
    keyParts.shift();
    for (const keyPart of keyParts) {
      if (value === null || value === undefined) {
        break;
      }
      value = value[keyPart];
    }

    return value;
  };

  const filterFunction = (items, itemsFilter, total) => {
    total = total || items.length;
    const filters = Object.keys(itemsFilter).filter((key) => itemsFilter[key] !== null && itemsFilter[key] !== undefined).map((key) => Object.assign({}, {key}, itemsFilter[key]));
    if (filters.length === 0) {
      return items.slice(0, total);
    }
    const filtered = [];
    for (const item of items.slice(0)) {
      let match = true;
      for (const filter of filters) {
        const {
          key,
          op,
          value
        } = filter;
        const itemValue = getValue(item, key);
        if (!equal(itemValue, value, op)) {
          match = false;
          break;
        }
      }
      if (match) {
        filtered.push(item);
        if (filtered.length >= total) {
          break;
        }
      }
    }

    return filtered;
  };

  const getTypeCondition = function (type) {
    let typeOption = {};

    if (type.value !== `any`) {
      typeOption = {
        op: `=`,
        value: type.value
      };
    } else {
      typeOption = undefined;
    }

    return typeOption;
  };

  const getPriceCondition = function (price) {
    let priceOption = {};

    if (price.value === `low`) {
      priceOption = {
        op: `<`,
        value: PRICE_STEP.step1
      };
    } else if (price.value === `middle`) {
      priceOption = {
        op: `between`,
        value: [PRICE_STEP.step1, PRICE_STEP.step2]
      };
    } else if (price.value === `high`) {
      priceOption = {
        op: `>`,
        value: PRICE_STEP.step2
      };
    } else {
      priceOption = undefined;
    }

    return priceOption;
  };

  const getValueCondition = function (unit) {
    let valueOption = {};

    if (unit.value !== `any`) {
      valueOption = {
        op: `=`,
        value: parseInt(unit.value, 10)
      };
    } else {
      valueOption = undefined;
    }

    return valueOption;
  };

  const getFeatures = function (features) {
    const dataFeatures = [];
    let featuresOption = {};

    features.forEach((feature) => {
      dataFeatures.push(feature.value);
    });

    featuresOption = {
      op: `in`,
      value: dataFeatures
    };

    return featuresOption;
  };

  const getFilter = function (type, price, rooms, guests, features) {
    const filter = {
      'offer.type': getTypeCondition(type),
      'offer.price': getPriceCondition(price),
      'offer.rooms': getValueCondition(rooms),
      'offer.guests': getValueCondition(guests),
      'offer.features': getFeatures(features)
    };

    return filter;
  };

  let lastTimeout;

  const filterAds = function (adsData) {

    const onFilterChange = function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        window.card.closeCard();

        const housingFeatures = window.pins.map.querySelectorAll(`.map__checkbox:checked`);

        let ads = adsData;
        const filter = getFilter(housingType, housingPrice, housingRooms, housingGuests, housingFeatures);

        ads = filterFunction(ads, filter, MAX_FILTERED);

        const oldPins = window.card.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

        for (const oldPin of oldPins) {
          oldPin.parentElement.removeChild(oldPin);
        }

        window.card.mapPins.appendChild(window.pins.renderPins(ads));
        window.card.addCard(ads);
      }, DEBOUNCE_INTERVAL);
    };

    filterForm.addEventListener(`change`, onFilterChange);
  };

  window.filter = {
    filterAds
  };
})();
