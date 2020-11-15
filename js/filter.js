'use strict';

(function () {
  const filterData = function (adsData) {
    // let housingValue;
    // let priceValue;

    const housingType = window.pins.map.querySelector(`#housing-type`);
    const housingPrice = window.pins.map.querySelector(`#housing-price`);

    const housingTypeFilter = function (ads) {
      if (housingType.value === `any`) {
        return ads;
      }

      const sameHousingType = ads.filter(function (ad) {
        return ad.offer.type === housingType.value;
      });

      return sameHousingType;
    };

    const housingPriceFilter = function (ads) {
      if (housingPrice.value === `any`) {
        return ads;
      }

      const sameHousingPrice = ads.filter(function (ad) {

        if (housingPrice.value === `low`) {
          return ad.offer.price < 10000;
        } else if (housingPrice.value === `middle`) {
          return (ad.offer.price >= 10000 && ad.offer.price <= 50000);
        } else {
          return ad.offer.price > 50000;
        }
      });

      return sameHousingPrice;
    };

    const filterAll = function (ads) {
      let adsFilter = ads;

      adsFilter = housingTypeFilter(adsFilter);
      adsFilter = housingPriceFilter(adsFilter);

      return adsFilter;
    };

    housingType.addEventListener(`change`, function () {
      window.card.deleteCard();

      // housingValue = housingType.value;
      let ads = adsData;

      // if (housingValue !== `any`) {
      //   ads = housingTypeFilter(ads);
      // }

      ads = filterAll(ads);

      const oldPins = window.card.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      for (const oldPin of oldPins) {
        oldPin.parentElement.removeChild(oldPin);
      }

      window.card.mapPins.appendChild(window.pins.getPins(ads));
      window.card.addCard(ads);
    });

    housingPrice.addEventListener(`change`, function () {
      window.card.deleteCard();

      // priceValue = housingPrice.value;
      let ads = adsData;

      // if (priceValue !== `any`) {
      //   ads = housingPriceFilter(ads);
      // }

      ads = filterAll(ads);

      const oldPins = window.card.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      for (const oldPin of oldPins) {
        oldPin.parentElement.removeChild(oldPin);
      }

      window.card.mapPins.appendChild(window.pins.getPins(ads));
      window.card.addCard(ads);
    });
  };

  window.filter = {
    filterAds: filterData
  };
})();
