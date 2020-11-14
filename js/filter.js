'use strict';

(function () {
  const filterData = function (adsData) {
    let housingValue = `palace`;

    const HousingTypeFilter = function (ads) {
      const sameHousingType = ads.filter(function (ad) {
        return ad.offer.type === housingValue;
      });

      return sameHousingType;
    }

    const housingType = document.querySelector(`#housing-type`);

    housingType.addEventListener(`change`, function () {
      housingValue = housingType.value;
      let ads = adsData;

      ads = HousingTypeFilter(ads);

      const oldPins = window.card.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      for (const oldPin of oldPins) {
        oldPin.parentElement.removeChild(oldPin);
      };

      window.card.mapPins.appendChild(window.pins.getPins(ads));
      window.card.addCard(ads);
    });
  };

  window.filter = {
    filterAds: filterData
  };
})();
