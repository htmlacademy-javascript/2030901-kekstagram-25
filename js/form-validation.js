import {isEscapeKey} from './util.js';
import {resetEffects} from './slider.js';
import {sendData} from './api.js';

const uploadPhoto = document.querySelector('#upload-file');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const overlayForm = document.querySelector('.img-upload__overlay');
const submitButton = uploadPhotoForm.querySelector('.img-upload__submit');
const effectNone = document.getElementById('effect-none');
const closeButton = document.querySelector('.img-upload__cancel');
const formHashTagsInput = uploadPhotoForm.querySelector('.text__hashtags');
const formDescriptionInput = uploadPhotoForm.querySelector('.text__description');
let messageType;
let messageAlert;
let buttonMessageAlert;

const REGULAR_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/;
const FILE_TYPES = ['png','jpg','jpeg'];
const HASHTAGS_LIMIT = 5;
const COMMENT_LENGTH_LIMIT = 140;

const checkLengthComment = (value) => value.length <= COMMENT_LENGTH_LIMIT;

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const onClickButtonMessageAlert = ()=>{
  closeMessage();
};

const onEscKeydownAlert =(evt)=>{
  if (isEscapeKey(evt)) {
    closeMessage();
  }
};

const onClickMessageAlert=(evt)=>{
  if (!evt.composedPath().includes(messageAlert)) {
    closeMessage();
  }
};

function closeMessage(){
  buttonMessageAlert.removeEventListener('click', onClickButtonMessageAlert);
  document.removeEventListener('keydown', onEscKeydownAlert);
  document.removeEventListener('click', onClickMessageAlert);
  messageType.remove();
}

const showMessage = (type) => {
  messageType = document.querySelector(`#${type}`).content.querySelector(`.${type}`).cloneNode(true);
  messageAlert = messageType.querySelector(`.${type}__inner`);
  buttonMessageAlert = messageAlert.querySelector(`.${type}__button`);
  buttonMessageAlert.addEventListener('click', onClickButtonMessageAlert);
  document.addEventListener('keydown', onEscKeydownAlert);
  document.addEventListener('click', onClickMessageAlert);
  document.body.appendChild(messageType);
};


const onCheckInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onCloseForm = () => {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPhotoForm.reset();
  pristine.reset();
  effectNone.checked = true;
  resetEffects();
  document.querySelector('.img-upload__preview img').src = '';
  closeButton.removeEventListener('click', onCloseForm);
  formHashTagsInput.removeEventListener('keydown', onCheckInputEscKeydown);
  formDescriptionInput.removeEventListener('keydown', onCheckInputEscKeydown);
  document.removeEventListener('keydown', onCheckFormEscKeydown);
};

const uploadFileImage = (image) => {
  const preview = document.querySelector('.img-upload__preview img');
  const file = image.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

function onOpenForm() {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadFileImage(this);
  closeButton.addEventListener('click', onCloseForm);
  formHashTagsInput.addEventListener('keydown', onCheckInputEscKeydown);
  formDescriptionInput.addEventListener('keydown', onCheckInputEscKeydown);
  document.addEventListener('keydown', onCheckFormEscKeydown);
}

function onCheckFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    onCloseForm();
  }
}

const initialUploadPhoto = () => {
  uploadPhoto.addEventListener('change', onOpenForm);
};

const validateComment = (value) => checkLengthComment(value);

const validateHashTags = (value) => {
  if(value.length === 0){
    return true;
  }
  value = value.replace(/\s+/g, ' ').trim();
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());
  if (hashTags.length > 5) {
    return false;
  }
  for (let i = 0; i < hashTags.length; i++) {
    if(!REGULAR_EXPRESSION.test(hashTags[i])){
      return false;
    }
  }
  const hashTagsWithoutDuplicates = [...new Set(hashTags)];
  return hashTags.length === hashTagsWithoutDuplicates.length;
};

const getErrorMessageForHashTags = (value) => {
  value = value.replace(/\s+/g, ' ').trim();
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());
  if (hashTags.length > HASHTAGS_LIMIT) {
    return 'Допускается не больше 5 хештегов.';
  }
  for (let i = 0; i < hashTags.length; i++) {
    if(!REGULAR_EXPRESSION.test(hashTags[i])){
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
};

const photoFormValidation = () => {
  pristine.addValidator(
    formDescriptionInput,
    validateComment,
    'Длинна комментария не может быть больше 140 символов.'
  );
  pristine.addValidator(
    formHashTagsInput,
    validateHashTags,
    getErrorMessageForHashTags
  );
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      submitButton.disabled = true;
      sendData(
        () => {
          showMessage('success');
        },
        () => {
          showMessage('error');
        },
        new FormData(evt.target),
      );
      submitButton.disabled = false;
      onCloseForm();
    }
  });
};

export {initialUploadPhoto, photoFormValidation, onCloseForm};
