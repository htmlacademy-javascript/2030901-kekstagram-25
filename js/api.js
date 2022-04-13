import {showAlert} from './util.js';

const GET_DATA = 'https://25.javascript.pages.academy/kekstagram/data';
const SEND_DATA = 'https://25.javascript.pages.academy/kekstagram/';

function sendData(successRequest, failRequest, body){
  fetch(SEND_DATA,
    {
      method: 'POST',
      body
    })
    .then((response) => {
      if (response.ok) {
        successRequest();
      } else {
        failRequest();
      }
    })
    .catch(() => {
      failRequest();
    });
}

function getData (successRequest){
  fetch(GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((posts) => {
      successRequest(posts);
    })
    .catch(() => {
      showAlert('Невозможно получить фотографии с сервера.');
    });
}

export {sendData, getData};
