'use strict';

(function () {
  const filterData = function (adsData) {
    let housingValue;
    // let adsArr = adsData;

    const housingType = window.pins.map.querySelector(`#housing-type`);
    // const housingType = window.pins.map.querySelector(`#housing-price`);
    // const housingType = window.pins.map.querySelector(`#housing-rooms`);
    // const housingType = window.pins.map.querySelector(`#housing-guests`);

    // const getRank = function (adsArr) {
    //   let rank = 0;

    //   if (wizard.colorCoat === coatColor) {
    //     rank += 1;
    //   }
    //   if (wizard.colorEyes === eyesColor) {
    //     rank += 1;
    //   }

    //   return rank;
    // }

    const housingTypeFilter = function (ads) {
      const sameHousingType = ads.filter(function (ad) {
        return ad.offer.type === housingValue;
      });

      return sameHousingType;
    };

    housingType.addEventListener(`change`, function () {
      window.card.deleteCard();

      housingValue = housingType.value;
      let ads = adsData;

      if (housingValue !== `any`) {
        ads = housingTypeFilter(ads);
      }

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
