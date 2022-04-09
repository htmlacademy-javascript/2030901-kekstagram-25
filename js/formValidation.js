import {checkLengthString, isEscapeKey} from './util.js';

const uploadPhoto = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const regularExpression = /^#[a-zа-яё0-9]{1,19}$/;

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

function openForm() {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeForm() {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPhotoForm.reset();
  pristine.reset();
}

function checkEscapeDown()
{
  uploadPhoto.addEventListener('change', openForm);
  document.querySelector('.img-upload__cancel').addEventListener('click', closeForm);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeForm();
    }
  });
  document.querySelector('.img-upload__text input').addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  document.querySelector('.img-upload__text textarea').addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
}

function validateComment (value) {
  return value.length <= 140;
}

function validateHashTags (value) {
  if(value.length === 0){
    return true;
  }
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());
  if (hashTags.length > 5) {
    return false;
  }
  for (let i = 0; i < hashTags.length; i++) {
    if(!regularExpression.test(hashTags[i])){
      return false;
    }
  }
  const hashTagsWithoutDuplicates = [...new Set(hashTags)];
  return hashTags.length === hashTagsWithoutDuplicates.length;
}

function getErrorMessageForHashTags (value) {
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());
  if (hashTags.length > 5) {
    return 'Допускается не больше 5 хештегов.';
  }
  for (let i = 0; i < hashTags.length; i++) {
    if(!regularExpression.test(hashTags[i])){
      if(hashTags[i].length > 19){
        return 'В хэштеге должно быть не больше 19 символов.';
      }else{
        return `(${hashTags[i]}) не хэштег.`;
      }
    }
  }
  const hashTagsWithoutDuplicates = [...new Set(hashTags)];
  if(hashTags.length === hashTagsWithoutDuplicates.length){
    return true;
  }else{
    return 'Нельзя использовать одинаковые хэштеги.';
  }
}

function photoFormValidation() {
  pristine.addValidator(
    uploadPhotoForm.querySelector('.text__description'),
    validateComment,
    'Длинна комментария не может быть больше 140 символов.'
  );
  pristine.addValidator(
    uploadPhotoForm.querySelector('.text__hashtags'),
    validateHashTags,
    getErrorMessageForHashTags
  );
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      uploadPhotoForm.submit();
    }
  });
}

export {checkEscapeDown, photoFormValidation};
