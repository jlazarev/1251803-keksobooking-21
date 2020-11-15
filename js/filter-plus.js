'use strict';

(function () {
  const MAX_FILTERED = 5;
  const filterForm = window.pins.map.querySelector(`.map__filters`);
  const housingPrice = window.pins.map.querySelector(`#housing-price`);
  const housingType = window.pins.map.querySelector(`#housing-type`);

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

  // собираем обьект

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

  const getFilterObj = function (type, price) {
    const obj = {
      'offer.type': getObjType(type),
      'offer.price': getObjPrice(price)
    };

    return obj;
  };

  const filterData = function (adsData) {

    filterForm.addEventListener(`change`, function () {
      window.card.deleteCard();

      let ads = adsData;
      const filter = getFilterObj(housingType, housingPrice);

      ads = filterFunction(ads, filter, MAX_FILTERED);

      const oldPins = window.card.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      for (const oldPin of oldPins) {
        oldPin.parentElement.removeChild(oldPin);
      }

      window.card.mapPins.appendChild(window.pins.getPins(ads));
      window.card.addCard(ads);
    });
  };

  window.filterPlus = {
    filterAds: filterData
  };
})();
