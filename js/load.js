'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
  const STATUS_CODE = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.download = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.addEventListener(`error`, function () {
      onError();
    });

    xhr.addEventListener(`timeout`, function () {
      onError();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };
})();
