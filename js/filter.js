'use strict';

(function () {
  const MAX_FILTERED = 5;
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

        return JSON.stringify(intersection) === JSON.stringify(val2);
      default:
        return val1 === val2;
    }
  };

  const getValue = (obj, key) => {
    const keyParts = key.split(`.`);
    let value = obj[keyParts[0]];
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

  const getObjType = function (type) {
    let obj = {};

    if (type.value !== `any`) {
      obj = {
        op: `=`,
        value: type.value
      };
    } else {
      obj = undefined;
    }

    return obj;
  };

  const getObjPrice = function (price) {
    let obj = {};

    if (price.value === `low`) {
      obj = {
        op: `<`,
        value: 10000
      };
    } else if (price.value === `middle`) {
      obj = {
        op: `between`,
        value: [10000, 50000]
      };
    } else if (price.value === `high`) {
      obj = {
        op: `>`,
        value: 50000
      };
    } else {
      obj = undefined;
    }

    return obj;
  };

  const getObjValue = function (unit) {
    let obj = {};

    if (unit.value !== `any`) {
      obj = {
        op: `=`,
        value: parseInt(unit.value, 10)
      };
    } else {
      obj = undefined;
    }

    return obj;
  };

  const getArrFeatures = function (features) {
    const arr = [];
    let obj = {};

    features.forEach((feature) => {
      arr.push(feature.value);
    });

    obj = {
      op: `in`,
      value: arr
    };

    return obj;
  };

  const getFilterObj = function (type, price, rooms, guests, features) {
    const obj = {
      'offer.type': getObjType(type),
      'offer.price': getObjPrice(price),
      'offer.rooms': getObjValue(rooms),
      'offer.guests': getObjValue(guests),
      'offer.features': getArrFeatures(features)
    };

    return obj;
  };

  const filterAds = function (adsData) {

    filterForm.addEventListener(`change`, function () {
      window.card.closeCard();

      const housingFeatures = window.pins.map.querySelectorAll(`.map__checkbox:checked`);

      let ads = adsData;
      const filter = getFilterObj(housingType, housingPrice, housingRooms, housingGuests, housingFeatures);

      ads = filterFunction(ads, filter, MAX_FILTERED);

      const oldPins = window.card.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      for (const oldPin of oldPins) {
        oldPin.parentElement.removeChild(oldPin);
      }

      window.card.mapPins.appendChild(window.pins.renderPins(ads));
      window.card.addCard(ads);
    });
  };

  window.filter = {
    filterAds
  };
})();
